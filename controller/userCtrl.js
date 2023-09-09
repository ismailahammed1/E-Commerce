const asyncHandler = require("express-async-handler");
const user = require("../models/UserModels");
const { generateToken } = require("../config/jwtTokten");
const validateMongoDbId = require("../utils/validateMongoDbId");
const { generateRefreshToken } = require("../config/refreshToken");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../controller/emailCtrl");
const { log } = require("console");

const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const findUser = await user.findOne({ email: email });
  if (!findUser) {
    //create a new user
    const newUser = user.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("user already exists");
  }
});

const loginUserctrl = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt with email:", email);

  const findUser = await user.findOne({ email });

  if (findUser && (await findUser.isPasswordMatched(password))) {
    //mongooes id verify and refreshToken
    const refreshToken = await generateRefreshToken(findUser?._id);
    const updateuser = await user.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshToken,
      },
      { new: true }
    );
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstName: findUser?.firstName,
      lastName: findUser?.lastName,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    console.log("Invalid credentials");
    throw new Error("Invalid credentials");
  }
});
// handle refresh token
const handleRefreshToken = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in cookies");
  const refreshToken = cookie.refreshToken;
  const userToken = await user.findOne({ refreshToken });
  if (!userToken)
    throw new Error("NO Refresh Token Present in db or not matched");
  jwt.verify(refreshToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err || userToken.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(userToken?._id);
    console.log(accessToken);
    res.json(accessToken);
  });
});
// handle logout
const logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.refreshToken) throw new Error("No Refresh Token in cookies");
  const refreshToken = cookie.refreshToken;
  const userToken = await user.findOne({ refreshToken });
  if (!userToken) {
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.sendStatus(401); //forbidden
  }
  await user.findOneAndUpdate(
    { refreshToken: refreshToken }, // Update refreshToken field
    { new: true }
  );
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
  });
  res.sendStatus(204);
});

/// get all users
const getallUsers = asyncHandler(async (req, res) => {
  try {
    const getUsers = await user.find();
    res.json(getUsers);
  } catch (error) {
    throw new Error(error);
  }
});
/// get a users
const getOneUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getUser = await user.findById(id);
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});
/// delete a users
const deleteaUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletetUser = await user.findByIdAndDelete(id);
    res.json(deletetUser);
  } catch (error) {
    throw new Error(error);
  }
});
/// update a users
const updatedUser = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  validateMongoDbId(_id);
  try {
    const updateUser = await user.findByIdAndUpdate(
      _id,
      {
        firstName: req?.body?.firstName,
        lastName: req?.body?.lastName,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
      },
      { new: true }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

const blockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const block = await user.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "user Blocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});
const unblockUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const unblock = await user.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      message: "user unBlocked",
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updatedPassword = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const newPassword = req.body.password; // Use newPassword instead of password
  validateMongoDbId(_id);
  const userDocument = await user.findById(_id); // Use userDocument instead of user
  if (newPassword) {
    userDocument.password = newPassword;
    const updatedUser = await userDocument.save(); // Save the updated user document
    res.json(updatedUser);
  } else {
    res.json(userDocument);
  }
});

const forgotPasswordToken = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const userFind = await user.findOne({ email });

  if (!userFind) {
    throw new Error("User not found with this email");
  }

  try {
    const resetToken = await user.createPasswordResetToken(); // Use the static method
    userFind.passwordResetToken = resetToken;
    userFind.passwordResetExpires = Date.now() + 30 * 60 * 1000;
    await userFind.save();

    const resetURL = `http://localhost:4000/api/user/reset-password/${resetToken}`;
    const data = {
      to: email,
      text: "Hey User",
      subject: "Forget Password Link",
      html: `Hi, please follow this link to reset your password. This link is valid for the next 10 minutes. <a href="${resetURL}">Click here</a>`,
    };

    sendEmail(data); // Using the sendEmail function here
    res.json({ resetToken }); // Corrected response
  } catch (error) {
    throw new Error(error);
  }
});


const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const userResetPassword = await user.findOneAndUpdate(
      {
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      },
      {
        password,
        passwordResetToken: undefined,
        passwordResetExpires: undefined,
      },
      { new: true }
    );

    if (!userResetPassword) {
      throw new Error('Token Expired, Please try again later');
    }

    // Generate a new password reset token and set the expiration date
    const newResetToken = crypto.randomBytes(20).toString('hex');
    const resetExpires = Date.now() + 3600000; // Token expires in 1 hour

    userResetPassword.passwordResetToken = crypto
      .createHash("sha256")
      .update(newResetToken)
      .digest("hex");
    userResetPassword.passwordResetExpires = resetExpires;

    await userResetPassword.save();

    res.json(userResetPassword);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});



module.exports = {
  createUser,
  loginUserctrl,
  getallUsers,
  getOneUser,
  deleteaUser,
  updatedUser,
  unblockUser,
  blockUser,
  handleRefreshToken,
  logout,
  updatedPassword,
  forgotPasswordToken,
  resetPassword,
};

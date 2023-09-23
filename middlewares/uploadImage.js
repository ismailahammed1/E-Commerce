const multer = require("multer");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const upload = multer({ storage: multer.memoryStorage() });


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/images/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ".jpeg"); // Use .jpeg instead of "jpeg"
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image"))  {
    cb(null, true);
  } else {
    cb({ massage: "unsupported file formate" }, false);
  }
};


const uploadPhoto = multer({
  storage: storage,
  fileFilter: multerFilter,
  limits: { fileSize: 2000000 },
});


const productImgResize = async (req, res, next) => {
  try {
    if (!req.files) return next();
  await Promise.all(
    
   await req.files.map(async (file) => {
      const productImagePath = `public/images/products/${file.filename}`;
     await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(productImagePath);
        fs.unlinkSync(productImagePath);       
    })
  );
  next();
  } catch (error) {
    console.error('Error writing file:', error);
  }
};

const blogImgResize = async (req, res, next) => {
  if (!req.files) return next();
  await Promise.all(
    req.files.map(async (file) => {
      const productImagePath = `public/images/blogs/${file.filename}`;
      sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(productImagePath);

        if (fs.existsSync(productImagePath)) {
          fs.unlinkSync(productImagePath);
        } else {
          console.error(`File does not exist: ${productImagePath}`);
        }
    })
  );
  next();
};
module.exports =  {uploadPhoto, productImgResize, blogImgResize };
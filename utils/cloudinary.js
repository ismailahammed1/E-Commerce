const cloudinary = require("cloudinary").v2;
require("dotenv").config();

cloudinary.config({
  cloud_name: "dfn1s2ysa",
  api_key: "614615446951297",
  api_secret: "V5qS2_pyAomgxQlwdEcWDsQ4p8w",
});

const cloudinaryUploading = (fileUploads) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(fileUploads, (error, result) => {
      if (error) {
        console.error('Cloudinary upload error:', error);
        reject(error);
      } else if (result && result.secure_url) {
        resolve({
          url: result.secure_url,
        });
      } else {
        console.error('Invalid Cloudinary upload response:', result);
        reject(new Error('Cloudinary upload response is invalid'));
      }
    });
  });
};


const cloudinaryDeleteImg = async (fileDelete) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(fileDelete, (error, result) => {
      if (error) {
        reject(error); // Handle the error and reject the promise
      } else if (result && result.secure_url) {
        resolve(
          {
            url: result.secure_url,
            asset_id: result.asset_id,
            public_id: result.public_id,
          },
          {
            resource_type: "auto",
          }
        );
      } else {
        reject(new Error("Cloudinary delete response is invalid")); // Handle invalid response
      }
    });
  });
};

module.exports = { cloudinaryUploading, cloudinaryDeleteImg };

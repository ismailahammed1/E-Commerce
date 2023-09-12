const couldinary= require('cloudinary');
couldinary.config({
    cloud_name:process.env.api.CLOUD_NAME,
    api_key:process.env.API_KEY,
    api_secret:process.env.SECRET_KEY,
})
const cloudinaryUploading=async(fileUploads)=>{
    return new promise((resolve)=>{
        couldinary.uplodser.upload(fileUploads,(result)=>{
            resolve({
                url:result.secure_url,
                asset_id:result.secure_asset_id,
                public_id:result.secure_public_id,
            },
            {
                resource_type:'auto',
            }
            );
        });
    });
};
const cloudinaryDeleteImg=async(fileDelete)=>{
    return new promise((resolve)=>{
        couldinary.uplodser.destroy(fileDelete,(result)=>{
            resolve({
                url:result.secure_url,
                asset_id:result.secure_asset_id,
                public_id:result.secure_public_id,
            },
            {
                resource_type:'auto',
            }
            );
        });
    });
};
module.exports={cloudinaryDeleteImg,cloudinaryUploading}
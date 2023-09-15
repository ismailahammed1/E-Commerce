const multer=require("multer");
const sharp=require("sharp");
const fs=require("fs");
const path=require("path");

const storage=multer.diskStorage({destination:function (req, file, cb) {
    cb(null,path.join(__dirname,"../public/image/"));
},
    filename:function (req, file, cb) {
        const uniqueSuffix=Date.now() + "-" + Math.round(Math.random()*le9);
        cb(null, file.filename+"-"+uniqueSuffix + "jpeg");
    },
})
const multerFilter=(req,file,cb)=>{
    if (file.mimetype.startWith("image")){
        cb(null, true);
    }else{
        cb({massage:"unsupported file formate"},false)
    }
};
const uploadPhoto=multer({
    storage:storage,
    fileFilter:multerFilter,
    limits:{fileSize:1000000},
});
const productImgResize=async(req, res, next)=>{
if (!req.files) return next() 
await Promise.all(
    req.files.map(async(file)=>{
        sharp(file.path)
        .resize(300,300)
        .toFormat("jpeg")
        .jpeg({quality:90})
        .toFile(`public/images/products/${file.filename}`);

    fs.unlinkSync(`public/images/products/${file.filename}`)
    })
)
next();
}

const blogImgResize=async(req, res, next)=>{
    if (!req.files) return next() 
    await Promise.all(
        req.files.map(async(file)=>{
            sharp(file.path)
            .resize(300,300)
            .toFormat("jpeg")
            .jpeg({quality:90})
            .toFile(`public/images/blogs/${file.filename}`);
    
        fs.unlinkSync(`public/images/blogs/${file.filename}`)
        })
    )
    next();
    }
    module.exports={uploadPhoto,productImgResize,blogImgResize}
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dbtlgaii3',
    api_key: '219816337589839',
    api_secret: 'I6r4bFjU1QXNhpbcDkUcOGOegyA',
});

const uploadImage = async (req, res, next) => {
    // cloudinary.v2.uploader.upload("dog.mp4",function(error, result) {console.log(result, error)});   //*** ตัวอย่าง syntax

    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'Gift',
            use_filename: true,
        });

        res.status(201).json({ url: uploadResponse.url });
    } catch (err) {
        next(err);
    }
};

const uploadImagePost = async (req, res, next) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            folder: 'Beetalk',
            use_filename: true,
        });
        res.status(201).json({ url: uploadResponse.url });
    } catch (err) {
        next(err);
    }
};

module.exports = {
    uploadImage,
    uploadImagePost,
};

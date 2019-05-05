var cloudinary = require('cloudinary').v2;

async function uploadImageToCloudinary(file) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload('uploads/'+file.originalname, function(error, result) {
            if(error) {
                reject(error);
            } else {
                resolve(result)
            }
        });
    });
}

module.exports = {
    uploadImageToCloudinary
};
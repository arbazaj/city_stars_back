var cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

async function uploadImageToCloudinary(file) {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload('uploads/'+file.originalname, function(error, result) {
            clearUploadsDirectory();
            if(error) {
                reject(error);
            } else {
                resolve(result)
            }
        });
    });
}

function clearUploadsDirectory() {
    fs.readdir('uploads', (err, files) => {
        if (err) {
            console.log(err)
        } else {
            for (const file of files) {
                fs.unlink(path.join('uploads', file), err => {
                    if (err) {
                        console.log(err)  
                    };
                });
            }
        }
    });
}

module.exports = {
    uploadImageToCloudinary
};
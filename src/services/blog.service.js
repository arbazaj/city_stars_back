const cloudinaryHelper = require('../helpers/cloudinary')

async function uploadImage(file) {
    let cloudinaryFile =  await cloudinaryHelper.uploadImageToCloudinary(file);
    return cloudinaryFile.secure_url
}

module.exports = {
    uploadImage
};
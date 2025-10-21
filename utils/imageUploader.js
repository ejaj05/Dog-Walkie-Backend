const cloudinary = require("cloudinary").v2

const uploadImageToCloudinary = async (file, folder, height, quality) => {
    try {
        const base64 = file.toString("base64");
        const dataUri = `data:image/jpeg;base64,${base64}`;
        const option = { folder }

        if (height) option.height = height
        if (quality) option.quality = quality;

        option.resource_type = 'auto';
        return await cloudinary.uploader.upload(dataUri, option);
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    uploadImageToCloudinary
}

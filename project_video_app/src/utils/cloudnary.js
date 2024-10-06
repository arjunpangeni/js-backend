import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Note: Corrected typo (API_SECRET)
});

const uploadOnCloudinary = async (localFilePath) => {
    // Configuration


    try {
        if (!localFilePath) throw new Error('Could not find the file path');

        // Upload an image
        const uploadResult = await cloudinary.uploader.upload(localFilePath, {
            resource_type: 'auto'
        });

        console.log('Upload successful:', uploadResult);

        // Get the public ID from the upload result
        const publicId = uploadResult.public_id;

        // Optimize delivery by resizing and applying auto-format and auto-quality
        const optimizeUrl = cloudinary.url(publicId, {
            fetch_format: 'auto',
            quality: 'auto'
        });

        console.log('Optimized URL:', optimizeUrl);

        // Transform the image: auto-crop to square aspect ratio
        const autoCropUrl = cloudinary.url(publicId, {
            crop: 'auto',
            gravity: 'auto',
            width: 500,
            height: 500
        });

        console.log('Auto-cropped URL:', autoCropUrl);

        // Optionally, you can delete the local file if the upload was successful
        fs.unlinkSync(localFilePath);

        return uploadResult

    } catch (error) {
        console.error('Error during upload or transformation:', error);
        fs.unlinkSync(localFilePath); // Remove locally saved temp file as the upload operation failed
        return null
            ;
    }
};

export { uploadOnCloudinary };

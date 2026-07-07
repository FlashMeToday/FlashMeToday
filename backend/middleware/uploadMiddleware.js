const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Multer Storage for Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'flashmetoday/join-requests',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp', 'svg'],
    transformation: [{ width: 1000, height: 1000, crop: 'limit' }] // Optional compression
  }
});

const upload = multer({ storage: storage });

const getPublicIdFromUrl = (url) => {
  if (!url) return null;
  const splitUrl = url.split('/');
  const versionIndex = splitUrl.findIndex(part => part.startsWith('v') && !isNaN(part.substring(1)));
  if (versionIndex !== -1) {
    const publicIdWithExt = splitUrl.slice(versionIndex + 1).join('/');
    const lastDotIndex = publicIdWithExt.lastIndexOf('.');
    return lastDotIndex !== -1 ? publicIdWithExt.substring(0, lastDotIndex) : publicIdWithExt;
  }
  return null;
};

module.exports = { upload, cloudinary, getPublicIdFromUrl };

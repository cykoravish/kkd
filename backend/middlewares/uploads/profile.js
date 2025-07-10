import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../helpers/cloudinary/cloudinary.js";

// Create Cloudinary storage engine for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "kkd/profiles", // 👈 your Cloudinary folder name
    allowed_formats: ["jpg", "jpeg", "png", "webp", "avif"],
    transformation: [{ quality: "auto" }], // optional: auto-optimize
  },
});

// Multer middleware with storage config
const uploadProfile = multer({ storage });

export default uploadProfile;

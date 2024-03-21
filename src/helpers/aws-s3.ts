import { Request } from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const s3client = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_ACCESS_SECRET,
    },
    region: process.env.S3_BUCKET_REGION
});

const s3Storage = multerS3({
    s3: s3client,
    bucket: process.env.S3_BUCKET_NAME,
    // acl: "public-read", // storage access type
    metadata: (req: Request, file: Express.Multer.File, callback) => {
        callback(null, {fieldname: file.fieldname})
    },
    key: (req: Request, file: Express.Multer.File, callback) => {
        const extArray = file.mimetype.split("/");
        const extension = extArray[extArray.length - 1];
        const fileName = file.fieldname + '/' + req.params.user + '_' + Math.round(Date.now() / 1000) + "." + extension;
        callback(null, fileName);
    }
});

function sanitizeFile(file: Express.Multer.File, extensions: string[], mime: string, callback: multer.FileFilterCallback) {
    // Check allowed extensions
    const isAllowedExt = extensions.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith(mime + "/");

    if (isAllowedExt && isAllowedMimeType) {
        return callback(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        callback(new Error("Error: " + mime + "File type not allowed!"));
    }
}

export const uploadS3Image = multer({
    storage: s3Storage,
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, [".png", ".jpg", ".jpeg", ".gif"], "image", callback)
    },
    limits: {
        fileSize: 1024 * 1024 * 2 // 2mb file size
    }
});

export const uploadS3Video = multer({
    storage: s3Storage,
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, [".mp4", ".avi", ".mov"], "video", callback)
    },
    limits: {
        fileSize: 1024 * 1024 * 20 // 20mb file size
    }
});


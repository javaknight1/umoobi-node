import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import path from 'path';

const s3client = new S3Client({
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY,
        secretAccessKey: process.env.S3_SECRET_SECRET,
    },
    region: process.env.S3_BUCKET_REGION
});

const s3Storage = multerS3({
    s3: s3client,
    bucket: process.env.S3_BUCKET_NAME,
    acl: "public-read", // storage access type
    metadata: (req: express.Request, file: Express.Multer.File, callback) => {
        callback(null, {fieldname: file.fieldname})
    },
    key: (req: express.Request, file: Express.Multer.File, callback) => {
        const fileName = Date.now() + "_" + file.fieldname + "_" + file.originalname;
        callback(null, fileName);
    }
});

function sanitizeFile(file: Express.Multer.File, callback: multer.FileFilterCallback) {
    // Define the allowed extension
    const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return callback(null, true); // no errors
    } else {
        // pass error msg to callback, which can be displaye in frontend
        callback(new Error("Error: File type not allowed!"));
    }
}

export const uploadS3 = multer({
    storage: s3Storage,
    fileFilter: (req, file, callback) => {
        sanitizeFile(file, callback)
    },
    limits: {
        fileSize: 1024 * 1024 * 2 // 2mb file size
    }
});
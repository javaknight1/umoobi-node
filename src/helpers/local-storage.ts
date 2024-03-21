import multer from "multer";

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
  
    filename: function(req, file, callback) {
        const extArray = file.mimetype.split("/");
        const extension = extArray[extArray.length - 1];
        const fileName = file.fieldname + '/' + req.params.user + '_' + Math.round(Date.now() / 1000) + "." + extension;
        callback(null, fileName);
    }
});
  
export const upload = multer({ storage: storage });
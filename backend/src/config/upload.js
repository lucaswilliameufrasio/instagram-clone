const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination(req, file, cb) {
            const folderPath = path.resolve(__dirname, '..', '..', 'uploads');

            cb(null, folderPath);
        },
        filename(req, file, cb) {
            cb(null, file.originalname);
        },
    }),
};

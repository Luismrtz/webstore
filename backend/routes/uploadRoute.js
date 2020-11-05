import express from 'express';
import multer from 'multer';
import { isAuth} from '../util'

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}.jpg`);
    },
});

const upload = multer({ storage });

const router = express.Router();

router.post('/', upload.single('image'), isAuth, (req, res) => {
    //* res.send(`/${req.file.path}`);  Removed '/'
    res.send(`${req.file.path}`);
});


export default router;
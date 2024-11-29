import { Router } from "express";
import { testPublication, savePublication, showPublication, deletePublication, publicationsUser, uploadMedia, showMedia, feed } from "../controllers/publication.js";
import { ensureAuth } from '../middlewares/auth.js';
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import pkg from 'cloudinary';
const { v2: cloudinary } = pkg;

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'publications',
    allowedFormats: ['jpg', 'png', 'jpeg', 'gif'],  
    public_id: (req, file) => 'publication-' + Date.now()
  }
});

const uploads = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 } 
});

const router = Router();

router.get('/test-publication', ensureAuth, testPublication );
router.post('/new-publication', ensureAuth, savePublication);
router.get('/show-publication/:id', ensureAuth, showPublication);
router.delete('/delete-publication/:id', ensureAuth, deletePublication);
router.get('/publications-user/:id/:page?', ensureAuth, publicationsUser);
router.post('/upload-media/:id', [ensureAuth, uploads.single("file0")], uploadMedia);
router.get('/media/:id', showMedia);
router.get('/feed/:page?', ensureAuth, feed);

//Exportar el Router
export default router;
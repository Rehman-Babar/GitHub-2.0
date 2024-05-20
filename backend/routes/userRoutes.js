import express from 'express'
import { getUserProfileAndRepos, getlikes, likeProfile } from '../controller/user.controller.js';
import { ensureAuthenticated } from '../middleware/ensureAuthenticated.js';

const router = express.Router();

router.get("/profile/:username", getUserProfileAndRepos)
router.get("/likes", ensureAuthenticated, getlikes)
router.post("/like/:username",ensureAuthenticated, likeProfile)


export default router
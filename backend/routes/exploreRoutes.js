import express from 'express'
import { exploreRepos } from '../controller/explore.controller.js';


const router = express.Router();

router.get("/repos/:language", exploreRepos)

export default router
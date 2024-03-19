import express from 'express';
const router=express.Router();
import {
    authUser,
    registerUser,
    logoutUser,
    getUsers,
} from '../controllers/userController.js';
import {protect,admin} from "../middleware/authMiddleware.js"

router.route('/').post(registerUser).get(protect,admin,getUsers);
router.post('/logout',logoutUser);
router.post('/login',authUser);

export default router;
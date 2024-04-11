import express from 'express'
import { authUser,
    registerUser,
    logoutUser,
    getUserProfile,
    UpdateUserProfile
 } from '../Controllers/userController.js';
 import { protect } from '../Middleware/AuthMiddleware.js';

const router=express.Router();

router.post('/',registerUser);
router.post('/auth',authUser);
router.post('/logout',logoutUser);
router.route('/profile').get(protect,getUserProfile).put(protect,UpdateUserProfile);



export  default router; 
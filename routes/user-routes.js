//Author - Megh Khaire

const express = require('express');
const router = express.Router();
const userController = require('../controllers/user-controller')

//Import Statement to load Middleware
const authController = require('../middleware/auth')

//API Calls
router.post('/user', userController.create); //Api to register user
router.post('/user/login', userController.login); //Api to log into an existing account
router.patch('/user/forgot-password',userController.forgotPassword); //Api for forgot password
router.patch('/user/verification', authController.emailAuth, userController.verifyEmail); //Api to verify users email
router.patch('/user/reset-password',authController.resetAuth, userController.resetPassword); //Api to reset password
router.patch('/user/email', userController.sendVerificationEmail); //Api to send verification email

router.use(authController.auth); //AUTHORIZATION MIDDLEWARE

router.patch('/user/logout', userController.logout); //Api to logout of current account
router.patch('/user/logoutAll', userController.logoutAll); //Api to logout of all accounts
router.patch('/user/change-password',userController.changePassword); //Api to change password
router.get('/user',userController.profile); //Api to get profile info
router.put('/user',userController.update); //Api to update profile
router.delete('/user', userController.delete); //Api to delete profile

module.exports = router;
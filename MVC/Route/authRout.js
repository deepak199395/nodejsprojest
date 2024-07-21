import express from "express";
import { 
  createUser, 
  deleteUserController, 
  getSingleUserController, 
  getUsersController, 
  patchUserController, 
  userUpdateController, 
  userLoginController, // Import the login controller
  testController,
  forgotPasswordController,
  resetPasswordController
} from "../Controllers/authController.js";
import { requireSignIn } from "../../Helper/middleware/authMiddleware.js";
const router = express.Router();

// Routes for API
router.post("/register",requireSignIn, createUser);
router.get("/userDetails", getUsersController); 
router.get('/getSingle-user/:id', getSingleUserController);
router.put('/update-user/:id', userUpdateController);
router.delete('/delete-user/:id', deleteUserController);
router.patch('/patchUser/:id', patchUserController);
router.post('/login', userLoginController); 
router.get('/test',requireSignIn,testController)
router.post('/forgot-password',forgotPasswordController)
router.post('/reset-password',resetPasswordController)
export default router;

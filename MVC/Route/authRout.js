import express from "express";
import { 
  createUser, 
  deleteUserController, 
  getSingleUserController, 
  getUsersController, 
  patchUserController, 
  userUpdateController, 
  userLoginController // Import the login controller
} from "../Controllers/authController.js";

const router = express.Router();

// Routes for API
router.post("/register", createUser);
router.get("/userDetails", getUsersController); 
router.get('/getSingle-user/:id', getSingleUserController);
router.put('/update-user/:id', userUpdateController);
router.delete('/delete-user/:id', deleteUserController);
router.patch('/patchUser/:id', patchUserController);
router.post('/login', userLoginController); // Add the login route

export default router;

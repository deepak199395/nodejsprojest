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
import { getProductByIdController, getProductsController, productController } from "../Controllers/ProcutController.js";
import formidable from "express-formidable"
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



// product api
 router.post("/create-product",formidable(),productController)
 router.get("/get-product",getProductsController)
 router.get("/get-productbyID",getProductByIdController)
export default router;

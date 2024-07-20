import userModel from "../Model/userModel.js";
import jwt from "jsonwebtoken";
import upload from "../../Helper/Image.js"; // Path to multer configuration
import { hashPassword, comparePassword } from "../../Helper/authHelper.js"; // Assuming comparePassword is a function to compare passwords

// JWT Secret Key
const JWT_SECRET = "gvggcfcfxxxxfgggfxfgx"; // Replace with your actual secret

export const createUser = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).send(err);
      } else {
        const { name, lastname, email, phone, password } = req.body;
        let image = req.file ? req.file.path : null;

        // Validation
        if (!name) return res.status(400).send("Name is required");
        if (!lastname) return res.status(400).send("Lastname is required");
        if (!email) return res.status(400).send("Email is required");
        if (!phone) return res.status(400).send("Phone is required");
        if (!password) return res.status(400).send("Password is required");

        // Existing user validation
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
          return res.status(400).send("User already exists");
        }

        // Create a new user
        const hashedPassword = await hashPassword(password);
        const newUser = await userModel.create({
          name,
          lastname,
          email,
          phone,
          password: hashedPassword,
          image
        });

        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: "1h" });

        res.status(201).send({
          status: "success",
          message: "User registered successfully",
          user: newUser,
          token
        });
      }
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send("Internal server error");
  }
};

export const getUsersController = async (req, res) => {
  try {
    const getuser = await userModel.find({});
    if (!getuser || getuser.length === 0) {
      return res.status(404).send('No user found');
    }
    res.status(200).send({
      status: 'success',
      message: 'Get all users details successfully',
      getuser,
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send('Internal server error');
  }
};

export const userUpdateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, phone, password } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (email && email !== user.email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send("Email already in use");
      }
    }

    if (name) user.name = name;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password) user.password = await hashPassword(password);

    const updatedUser = await user.save();

    res.status(200).send({
      status: "success",
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send("Internal server error");
  }
};

export const deleteUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    await userModel.findByIdAndDelete(id);

    res.status(200).send({
      status: "success",
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send("Internal server error");
  }
};

export const patchUserController = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastname, email, phone, password } = req.body;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    if (email && email !== user.email) {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res.status(400).send("Email already in use");
      }
    }

    if (name) user.name = name;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (password) user.password = await hashPassword(password);

    const updatedUser = await user.save();

    res.status(200).send({
      status: "success",
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send("Internal server error");
  }
};

export const getSingleUserController = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send({
      status: "success",
      message: "User details fetched successfully",
      user,
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send("Internal server error");
  }
};

// User login controller
export const userLoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send("Email and password are required");
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }

    // Check if password matches
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(400).send("Invalid credentials");
    }

    // Generate token
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).send({
      status: "success",
      message: "User logged in successfully",
      user,
      token
    });
  } catch (error) {
    console.log(`Error in API: ${error}`);
    res.status(500).send("Internal server error");
  }
};

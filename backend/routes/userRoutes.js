const express = require("express");
const router = express.Router();
const User = require("../models/user");

//regiter route
router.post("/register", async (req, res) => {
  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    address: req.body.address,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.send("User Registered Successfully");
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email, password: password });

    if (user) {
      const temp = {
        firstName: user.firstName,
        email: user.email,
        role: user.role,
        _id: user._id,
      };
      res.send(temp);
    } else {
      return res.status(400).json({ message: "Login Failed" });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//get all users
router.get("/getallusers", async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    res.send({ users });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//get all admins
router.get("/getalladmins", async (req, res) => {
  try {
    const admins = await User.find({ role: "admin" });
    res.send({ admins });
  } catch (error) {
    res.status(400).json({ error });
  }
});

//edit
router.patch("/edituser", async (req, res) => {
  const { _id, firstName, lastName, email, phoneNumber, address } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) user.address = address;

    await user.save();

    return res.json({ message: "User details updated successfully" });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//change password
router.patch("/changepassword", async (req, res) => {
  const { _id, currentPassword, newPassword } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).send("User not found");

    if (user.password !== currentPassword) {
      return res.status(400).send("Current password does not match");
    }

    user.password = newPassword;
    await user.save();
    res.send("Password updated successfully");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error updating password");
  }
});

//create admin
router.patch("/changeadmin", async (req, res) => {
  const { _id } = req.body;

  try {
    const user = await User.findById(_id);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = "admin";
    await user.save();
    res.send("User role updated successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error updating user role");
  }
});

//delete user
router.patch("/deleteuser", async (req, res) => {
  const { _id } = req.body;

  try {
    const user = await User.findByIdAndRemove(_id);

    if (!user) return res.status(404).send("User not found");
    res.send("User deleted successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("Error deleting User");
  }
});

//count users
router.get("/count", async (req, res) => {
  try {
    const count = await User.countDocuments({ role: "user" });
    res.status(200).json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET a single user by id
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

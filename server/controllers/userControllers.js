// userControllers.js
const User = require('../models/userModel');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// Register a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password, status, role } = req.body;

    // Vérifiez que tous les champs obligatoires sont fournis
    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'Tous les champs sont obligatoires.' });
    }

  //  const imageUrl = req.file ? req.file.path : null;  // Vérifiez l'image

    const newUser = await User.create({
      username,
      email,
      password,
      status,
      role,
    });

    res.status(201).json(newUser);
    console.log('Requête reçue :', req.body);
  } catch (error) {
    res.status(400).json({ message: 'error.message' });
  }
};


const registerUser = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;
    if (!username || !password || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = new User({ username, password: hashedPassword, email, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: error.message });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    let user;

    if (username) {
      // Admin login
      user = await User.findOne({ username });
    } else if (email) {
      // Customer login
      user = await User.findOne({ email });
    } else {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await argon2.verify(user.password, password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, isAdmin: user.role === 'admin' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all users
const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, sortBy = 'createdAt', order = 'desc', ...filters } = req.query;

    // Convert page and limit to numbers
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Build the query with filters
    const query = { ...filters };

    // Execute the query with pagination and sorting
    const users = await User.find(query)
      .sort({ [sortBy]: order === 'asc' ? 1 : -1 })
      .skip((pageNumber - 1) * limitNumber)
      .limit(limitNumber);

    // Get the total count for pagination
    const totalUsers = await User.countDocuments(query);

    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limitNumber),
      currentPage: pageNumber,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get one user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update user by ID
const updateUserById = async (req, res) => {
  try {
    const { username, email, role, status, avatar, profilePic } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { username, email, role, status, avatar, profilePic },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete user by ID
const deleteUserById = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Example of a protected route
const dashboard = (req, res) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }
  res.json({ message: 'Welcome to the admin dashboard' });
};

module.exports = {
  createUser,
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  dashboard,
};

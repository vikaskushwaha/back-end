const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const userExists = async (email) => {
    const user = await User.findOne({ email: email.toLowerCase() });
    return !!user;
};


const createUser = async (userData) => {
    const { firstName, lastName, email, password } = userData;


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user in database
    return User.create({
        firstName,
        lastName,
        email: email.toLowerCase(),
        password: hashedPassword
    });
};


const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '1d' }
    );
};


const formatUserResponse = (user) => {
    return {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
    };
};

const setTokenCookie = (res, token) => {
    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'none',
        maxAge: 24 * 60 * 60 * 1000
    });
};


const authenticateUser = async (email, password) => {
    try {
        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return { success: false, message: 'Invalid credentials' };
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return { success: false, message: 'Invalid credentials' };
        }

        // Return user if authentication successful
        return { success: true, user };
    } catch (error) {
        console.error('Authentication error:', error);
        return { success: false, message: 'Authentication failed' };
    }
};

// Export it
module.exports = {
    userExists,
    createUser,
    generateToken,
    formatUserResponse,
    setTokenCookie,
    authenticateUser  // Add the new function
};
const userService = require('../../../services/signupServices')

const signup = async (req, res) => {
    try {
        const { firstName, email, password } = req.body;
        console.log(req.body);


        // Basic validation
        if (!firstName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Name, email and password are required'
            });
        }

        // Check if user already exists
        const userExists = await userService.userExists(email);
        if (userExists) {
            return res.status(409).json({
                success: false,
                message: 'Email is already registered'
            });
        }

        // Create new user
        const user = await userService.createUser({
            firstName,

            email,
            password
        });

        // Generate JWT token
        const token = userService.generateToken(user);
        console.log(token);

        // SET THE TOKEN AS A COOKIE - Add this line!
        userService.setTokenCookie(res, token);

        // Format user response
        const userResponse = userService.formatUserResponse(user);

        res.status(201).json({
            success: true,
            message: 'Account created successfully',
            token,  // You can keep this or remove it
            user: userResponse
        });
    } catch (error) {
        console.error('Signup error:', error);

        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages[0]
            });
        }

        res.status(500).json({
            success: false,
            message: 'Server error during signup'
        });
    }
};

module.exports = signup;



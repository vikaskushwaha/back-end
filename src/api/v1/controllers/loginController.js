const userService = require('../../../services/signupServices');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Basic validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email and password are required'
            });
        }

        // Authenticate user
        const result = await userService.authenticateUser(email, password);

        if (!result.success) {
            return res.status(401).json({
                success: false,
                message: result.message
            });
        }

        // Generate token
        const token = userService.generateToken(result.user);

        // Set cookie
        userService.setTokenCookie(res, token);

        // Return user data
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: userService.formatUserResponse(result.user)
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login'
        });
    }
};

module.exports = login;
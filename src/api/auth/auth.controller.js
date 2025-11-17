const authService = require('./auth.service.js');

const login = async (req, res, next) => {

    try {
        const { email, password} = req.body;
        const result = await authService.login(email,password);
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: result
        });
    }catch (error){
        next (error);
    }
};

const validateToken = async (req, res) => {
    try {
        const authHeader = req.headers.authorization;
        
        //Verify that the authorization header exists and is in valid format
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });
        }

        //Extracts the token and validates it
        const token = authHeader.substring(7);
        const decoded = await authService.validateToken(token);

        //Returns response with decoded token information
        res.status(200).json({
            success: true,
            message: 'Token is valid',
            data: decoded
        });

    } catch (error) {
        //Invalid or expired token
        res.status(401).json({
            success: false,
            message: 'Invalid token',
            error: error.message
        });
    }
};

const logout = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Logout successful'
    });
};

const searchByPhone = async (req, res) => {
    try {
        const { phone } = req.params;

        const user = await authService.getUserByPhone(phone);

        if (!user) {
        return res.status(404).json({
            success: false,
            message: 'User not found'
        });
        }

        return res.json({
        success: true,
        message: 'User found'
        });

    } catch (error) {
        console.error('Error searching by phone:', error);
        return res.status(500).json({
        success: false,
        message: 'Server error'
        });
    }
};

const resetPassword = async (req, res) => {
    try {
            const { phone, newPassword, confirmPassword } = req.body;

            if (!phone || !newPassword || !confirmPassword){
                return res.status(400).json({
                    success: false,
                    message: 'Phone number and passwords are required'
                });
            }

            const result = await authService.userResetPassword(phone, newPassword, confirmPassword);

            if (!result){
                return res.status(404).json({
                    success: false,
                    message: 'User not found'
                });
            }

            return res.json({
            success: true,
            message: 'Password updated successfully'
            });
        }catch (error) {
            console.error('Error resetting password:', error);
            return res.status(500).json({
            success: false,
            message: 'Server error'
        });
    }
}
module.exports = {
    login,
    validateToken,
    logout,
    resetPassword,
    searchByPhone
};
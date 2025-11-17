const { body, validationResult } = require('express-validator');


const { validateToken } = require('../../../shared/utils/util');

const authenticateToken = async (req, res, next) => {
    try {
        //Extract the authorization header
        const authHeader = req.headers.authorization;

        //Verify if the token exists and has the correct format
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access denied. No token provided.'
            });
        }

        //Extract the deleted token from the header
        const token = authHeader.substring(7);
        
        //Verify and decode the token
        const decoded = validateToken(token);

        //Add decoded user information to the request
        req.user = decoded;
        
        //Move to the next middleware
        next();

    } catch (error) {
        //Handling token errors (invalid/expired)
        return res.status(401).json({
            success: false,
            message: 'Invalid token',
            error: error.message
        });
    }
};

const requireAdminOrSupervisor = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }

    //Get user role in lowercase for comparison
    const position = req.user.position.name.toLowerCase();
    console.log('User position:', position);
    //Check if the role is Admin or supervisor
    if (position !== 'admin' && position !== 'supervisor') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin or Supervisor privileges required.'
        });
    }

    next();
};

const requireAdmin = (req, res, next) => {
    //Verify if the user is authenticated
    if (!req.user) {
        return res.status(401).json({
            success: false,
            message: 'Authentication required'
        });
    }

    //Check if the user's role is Admin
    if (req.user.position.name.toLowerCase() !== 'admin') {
        return res.status(403).json({
            success: false,
            message: 'Access denied. Admin privileges required.'
        });
    }

    next();
};

module.exports = { authenticateToken, requireAdmin, requireAdminOrSupervisor };

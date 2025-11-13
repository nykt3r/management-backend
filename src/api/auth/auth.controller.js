const authService = require('./auth.service.js');

const login = async (req, res, next) => {

    try {
        const { email, password} = req.body;
        const result = await authService.login(email,password);
         res.status(200).json(result); // ✅ responder al cliente
    }catch (error){
        next (error);
    }
};

module.exports = {
    login,
};
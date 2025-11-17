const userRepository = require('../users/user.repository');
const { comparePassword, generateToken, validateToken, hashPassword } = require('../../../shared/utils/util');
const { Position } = require('../../database/models');

const login = async (email, password) => {
    try{
    const user = await userRepository.findUserByEmail(email);
    if (!user){
        throw new Error('Invalid email or password');
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if(!isPasswordValid) throw new Error('Invalid email or password');

    const token = generateToken({id: user.id, email: user.email, name: user.firstName, lastName: user.lastName,
        position:{
            id:user.position.positionId,
            name:user.position.positionName
        }
    });

    const userResponse = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        position: user.position,
        token,
        success: true
    }

    return userResponse;

    }catch(error){
        throw new Error('Login failed: ' + error.message)
    }
}

const validationToken = async (token) => {
    try{
        const decoded = validateToken(token);

        const user = await userRepository.findByPk(decoded.id,{   include: [
            {
                model: Position,
                as: 'position',
                attributes: ['positionId', 'positionName', 'status']
            }
            ]
        });

        if (!user || !user.position.status) throw new Error('User not found or inactive',401);

        return decoded;
    }catch(error){
        throw new Error('Invalid token',401);
    }
}

const getUserByPhone = async (phone) =>{
    const user = await userRepository.findUserByPhone(phone);
    if (!user) throw new Error("User not found");
    return user;
}

const userResetPassword = async (phone, newPassword, confirmPassword) =>{
    const user = await userRepository.findUserByPhone(phone);

    if (!user) throw new Error("User not found");

    if (newPassword !== confirmPassword){
        throw new Error("Passwords do not match");
    }else {
    const hashedPassword = await hashPassword(newPassword);
    await userRepository.updateUser(user.id,{
        password: hashedPassword
    });
    return true;
    }
};

module.exports = {
    login,
    validationToken,
    getUserByPhone,
    userResetPassword,
}


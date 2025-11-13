const userRepository = require('../users/user.repository');
const { comparePassword,generateToken } = require('../../../shared/utils/util');

const login = async (email, password) => {
    const user = await userRepository.findUserByEmail(email);
    if (!user){
        throw new Error('Invalid email or password',401);
    }
    const isPasswordValid = await comparePassword(password, user.password);
    if(!isPasswordValid) throw new Error('Invalid email or password',401);

    const token = generateToken({id: user.id, email: user.email, role: user.role});

    return { user, token};
}

module.exports = {

    login,

}


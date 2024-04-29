const User = require('../models/User');

class userRepository {
    async criarUsuario(username, senha) {
        const user = new User({
            username,
            senha,
        });
        return await user.save();
    }
    async findUserByUsername(username){
        return await User.findOne({ username });
    }
}

module.exports = new userRepository();
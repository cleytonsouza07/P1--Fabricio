const userRepository = require('../repositories/UserRepository');

class UserController {
  async registerUser(req, res) {
    try {
      const user = await this.repository.create(req.body);
      res.status(201).send(user);
    

      const newUser = await userRepository.createUser({ username, password });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();

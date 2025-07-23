const authService = require('../services/authService');

class AuthController {
  async login(req, res) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      res.cookie('accessToken', result.token, {
        httpOnly: true,
        secure: false, // Only true in production
        sameSite: 'Lax',
        path: '/',
        domain: "localhost"
      });
      res.json(result.user);

    } catch (error) {
      res.status(401).json({ error: 
error.message });
    }
  }

  async logout(req, res) {
    try {
      const result = await authService.logout(res);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCurrentUser(req, res) {
    try {
      const result = await authService.getCurrentUser(req.user.userId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createUser(req, res) {
    try {
      const user = await authService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await authService.updateUser(req.params.id, req.body);
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      await authService.deleteUser(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const result = await authService.getAllUsers();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async setupPassword(req, res) {
    try {
      const { token, password } = req.body;
      const result = await authService.setupPassword(token, password);
      res.json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new AuthController();

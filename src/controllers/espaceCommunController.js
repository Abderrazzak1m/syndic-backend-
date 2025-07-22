const espaceCommunService = require('../services/espaceCommunService');

class EspaceCommunController {
  async getAllEspacesCommuns(req, res) {
    try {
      const espacesCommuns = await espaceCommunService.getAllEspacesCommuns();
      res.json(espacesCommuns);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getEspaceCommunById(req, res) {
    try {
      const espaceCommun = await espaceCommunService.getEspaceCommunById(req.params.id);
      if (!espaceCommun) {
        return res.status(404).json({ error: 'Espace commun not found' });
      }
      res.json(espaceCommun);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createEspaceCommun(req, res) {
    try {
      const espaceCommun = await espaceCommunService.createEspaceCommun(req.body);
      res.status(201).json(espaceCommun);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateEspaceCommun(req, res) {
    try {
      const espaceCommun = await espaceCommunService.updateEspaceCommun(req.params.id, req.body);
      res.json(espaceCommun);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteEspaceCommun(req, res) {
    try {
      await espaceCommunService.deleteEspaceCommun(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getEspacesCommunsByTrancheId(req, res) {
    try {
      const espacesCommuns = await espaceCommunService.getEspacesCommunsByTrancheId(req.params.id);
      res.json(espacesCommuns);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EspaceCommunController();

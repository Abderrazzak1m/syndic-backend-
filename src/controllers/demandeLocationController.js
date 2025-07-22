const demandeLocationService = require('../services/demandeLocationService');

class DemandeLocationController {
  async getAllDemandesLocation(req, res) {
    try {
      const demandes = await demandeLocationService.getAllDemandesLocation();
      res.json(demandes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getDemandeLocationById(req, res) {
    try {
      const demande = await demandeLocationService.getDemandeLocationById(req.params.id);
      if (!demande) {
        return res.status(404).json({ error: 'Demande not found' });
      }
      res.json(demande);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createDemandeLocation(req, res) {
    try {
      const demande = await demandeLocationService.createDemandeLocation(req.body);
      res.status(201).json(demande);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateDemandeLocationStatus(req, res) {
    try {
      const { status } = req.body;
      const demande = await demandeLocationService.updateDemandeLocationStatus(req.params.id, status);
      res.json(demande);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getDemandesByStatus(req, res) {
    try {
      const demandes = await demandeLocationService.getDemandesByStatus(req.params.status);
      res.json(demandes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new DemandeLocationController();
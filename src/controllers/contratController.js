const contratService = require('../services/contratService');

class ContratController {
  async getContratsByCoproprieteId(req, res) {
    try {
      const contrats = await contratService.getContratsByCoproprieteId(req.params.id);
      res.json(contrats);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createContrat(req, res) {
    try {
      const contrat = await contratService.createContrat(req.body);
      res.status(201).json(contrat);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateContrat(req, res) {
    try {
      const contrat = await contratService.updateContrat(req.params.id, req.body);
      res.json(contrat);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new ContratController();

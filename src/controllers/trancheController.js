const trancheService = require('../services/trancheService');

class TrancheController {
  async getAllTranches(req, res) {
    try {
      const tranches = await trancheService.getAllTranches();
      res.json(tranches);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getTrancheById(req, res) {
    try {
      const tranche = await trancheService.getTrancheById(req.params.id);
      if (!tranche) {
        return res.status(404).json({ error: 'Tranche not found' });
      }
      res.json(tranche);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createTranche(req, res) {
    try {
      const tranche = await trancheService.createTranche(req.body);
      res.status(201).json(tranche);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateTranche(req, res) {
    try {
      const tranche = await trancheService.updateTranche(req.params.id, req.body);
      res.json(tranche);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteTranche(req, res) {
    try {
      await trancheService.deleteTranche(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getImmeublesByTrancheId(req, res) {
    try {
      const immeubles = await trancheService.getImmeublesByTrancheId(req.params.id);
      res.json(immeubles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new TrancheController();
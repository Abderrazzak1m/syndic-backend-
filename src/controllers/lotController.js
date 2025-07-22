const lotService = require('../services/lotService');

class LotController {
  async getAllLots(req, res) {
    try {
      const lots = await lotService.getAllLots();
      res.json(lots);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getLotById(req, res) {
    try {
      const lot = await lotService.getLotById(req.params.id);
      if (!lot) {
        return res.status(404).json({ error: 'Lot not found' });
      }
      res.json(lot);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createLot(req, res) {
    try {
      const lot = await lotService.createLot(req.body);
      res.status(201).json(lot);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateLot(req, res) {
    try {
      const lot = await lotService.updateLot(req.params.id, req.body);
      res.json(lot);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteLot(req, res) {
    try {
      await lotService.deleteLot(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new LotController();
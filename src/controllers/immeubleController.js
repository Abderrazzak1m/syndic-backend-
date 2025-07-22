const immeubleService = require('../services/immeubleService');

class ImmeubleController {
  async getAllImmeubles(req, res) {
    try {
      const immeubles = await immeubleService.getAllImmeubles();
      res.json(immeubles);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getImmeubleById(req, res) {
    try {
      const immeuble = await immeubleService.getImmeubleById(req.params.id);
      if (!immeuble) {
        return res.status(404).json({ error: 'Immeuble not found' });
      }
      res.json(immeuble);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createImmeuble(req, res) {
    try {
      const immeuble = await immeubleService.createImmeuble(req.body);
      res.status(201).json(immeuble);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateImmeuble(req, res) {
    try {
      const immeuble = await immeubleService.updateImmeuble(req.params.id, req.body);
      res.json(immeuble);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteImmeuble(req, res) {
    try {
      await immeubleService.deleteImmeuble(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getLotsByImmeubleId(req, res) {
    try {
      const lots = await immeubleService.getLotsByImmeubleId(req.params.id);
      res.json(lots);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new ImmeubleController();
const coproprieteService = require('../services/coproprieteService');

class CoproprieteController {
  async getAllCoproprietes(req, res) {
    try {
      const coproprietes = await coproprieteService.getAllCoproprietes();
      res.json(coproprietes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCoproprieteById(req, res) {
    try {
      const copropriete = await coproprieteService.getCoproprieteById(req.params.id);
      if (!copropriete) {
        return res.status(404).json({ error: 'Copropriete not found' });
      }
      res.json(copropriete);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createCopropriete(req, res) {
    try {
      const copropriete = await coproprieteService.createCopropriete(req.body);
      res.status(201).json(copropriete);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateCopropriete(req, res) {
    try {
      const copropriete = await coproprieteService.updateCopropriete(req.params.id, req.body);
      res.json(copropriete);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteCopropriete(req, res) {
    try {
      await coproprieteService.deleteCopropriete(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getTranchesByCoproprieteId(req, res) {
    try {
      const tranches = await coproprieteService.getTranchesByCoproprieteId(req.params.id);
      res.json(tranches);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getArchivedCoproprietes(req, res) {
    try {
      const coproprietes = await coproprieteService.getArchivedCoproprietes();
      res.json(coproprietes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateCoproprieteStatus(req, res) {
    try {
      const { status } = req.body;
      const copropriete = await coproprieteService.updateCoproprieteStatus(req.params.id, status);
      res.json(copropriete);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new CoproprieteController();

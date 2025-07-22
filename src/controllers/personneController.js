const personneService = require('../services/personneService');

class PersonneController {
  async getAllPersonnes(req, res) {
    try {
      const personnes = await personneService.getAllPersonnes();
      res.json(personnes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPersonneById(req, res) {
    try {
      const personne = await personneService.getPersonneById(req.params.id);
      if (!personne) {
        return res.status(404).json({ error: 'Personne not found' });
      }
      res.json(personne);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async createPersonne(req, res) {
    try {
      const personne = await personneService.createPersonne(req.body);
      res.status(201).json(personne);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updatePersonne(req, res) {
    try {
      const personne = await personneService.updatePersonne(req.params.id, req.body);
      res.json(personne);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deletePersonne(req, res) {
    try {
      await personneService.deletePersonne(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getPersonnesByType(req, res) {
    try {
      const personnes = await personneService.getPersonnesByType(req.params.type);
      res.json(personnes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPersonnesByCopropriete(req, res) {
    try {
      const personnes = await personneService.getPersonnesByCopropriete(req.params.coproprieteId);
      res.json(personnes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getLocataires(req, res) {
    try {
      const locataires = await personneService.getPersonnesByCopropriete(req.params.coproprieteId, 'locataire');
      res.json(locataires);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getCoproprietaires(req, res) {
    try {
      const coproprietaires = await personneService.getPersonnesByCopropriete(req.params.coproprieteId, 'coproprietaire');
      res.json(coproprietaires);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new PersonneController();

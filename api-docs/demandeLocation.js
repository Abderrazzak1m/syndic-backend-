add/**
 * @swagger
 * tags:
 *   name: DemandesLocation
 *   description: Location request management endpoints
 */

/**
 * @swagger
 * /api/demandes-location:
 *   get:
 *     tags:
 *       - DemandesLocation
 *     summary: Get all demandes location
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of demandes location
 *   post:
 *     tags:
 *       - DemandesLocation
 *     summary: Create a new demande location
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cinCoproprietaire
 *               - lotId
 *               - typeDemande
 *               - procuration
 *               - infoLocataire
 *               - infoContrat
 *             properties:
 *               cinCoproprietaire:
 *                 type: string
 *                 example: "AB123456"
 *               lotId:
 *                 type: integer
 *                 example: 1
 *               typeDemande:
 *                 type: string
 *                 enum: [AJOUTER, ACCORD_PROCURATION, RESILIER, RETRAIT_PROCURATION]
 *                 example: "AJOUTER"
 *               procuration:
 *                 type: boolean
 *                 example: false
 *               infoLocataire:
 *                 type: object
 *                 properties:
 *                   nom:
 *                     type: string
 *                     example: "Tazi"
 *                   prenom:
 *                     type: string
 *                     example: "Youssef"
 *                   dateNaissance:
 *                     type: string
 *                     format: date
 *                     example: "1990-03-10"
 *                   adresse:
 *                     type: string
 *                     example: "Boulevard Zerktouni, Quartier Racine, Marrakech"
 *                   email:
 *                     type: string
 *                     example: "youssef.tazi@email.ma"
 *                   telephone:
 *                     type: string
 *                     example: "+212663456789"
 *                   sexe:
 *                     type: string
 *                     example: "M"
 *                   nationalite:
 *                     type: string
 *                     example: "Marocaine"
 *                   cin:
 *                     type: string
 *                     example: "CD789012"
 *               infoContrat:
 *                 type: object
 *                 properties:
 *                   dateCreation:
 *                     type: string
 *                     format: date
 *                     example: "2024-07-01"
 *                   dateExpiration:
 *                     type: string
 *                     format: date
 *                     example: "2025-07-01"
 *                   procuration:
 *                     type: boolean
 *                     example: false
 *           example:
 *             cinCoproprietaire: "AB123456"
 *             lotId: 1
 *             typeDemande: "AJOUTER"
 *             procuration: false
 *             infoLocataire:
 *               nom: "Tazi"
 *               prenom: "Youssef"
 *               dateNaissance: "1990-03-10"
 *               adresse: "Boulevard Zerktouni, Quartier Racine, Marrakech"
 *               email: "youssef.tazi@email.ma"
 *               telephone: "+212663456789"
 *               sexe: "Masculin"
 *               nationalite: "M"
 *               cin: "CD789012"
 *             infoContrat:
 *               dateCreation: "2024-07-01"
 *               dateExpiration: "2025-07-01"
 *               procuration: false
 *     responses:
 *       201:
 *         description: Demande location created successfully
 */

/**
 * @swagger
 * /api/demandes-location/{id}/status:
 *   put:
 *     tags:
 *       - DemandesLocation
 *     summary: Update demande status (accept/refuse)
 *     description: When accepting an AJOUTER request, automatically creates locataire and contrat
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [EN_ATTENTE, ACCEPTEE, REFUSEE]
 *     responses:
 *       200:
 *         description: Demande status updated successfully
 */

/**
 * @swagger
 * /api/demandes-location/status/{status}:
 *   get:
 *     tags:
 *       - DemandesLocation
 *     summary: Get demandes by status
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: status
 *         required: true
 *         schema:
 *           type: string
 *           enum: [EN_ATTENTE, ACCEPTEE, REFUSEE]
 *     responses:
 *       200:
 *         description: List of demandes with specified status
 */

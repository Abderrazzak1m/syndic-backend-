/**
 * @swagger
 * tags:
 *   name: Sondages
 *   description: Gestion des sondages associés aux Assemblées Générales (AG)
 */

/**
 * @swagger
 * /api/sondage:
 *   post:
 *     tags:
 *       - Sondages
 *     summary: Créer un sondage pour une Assemblée Générale
 *     requestBody:
 *       description: Données pour créer un sondage
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assembleId
 *               - optionsDate
 *             properties:
 *               assembleId:
 *                 type: integer
 *                 example: 1
 *                 description: ID de l'Assemblée Générale liée
 *               enonceSondage:
 *                 type: string
 *                 example: "Choisissez la date de l'AG"
 *                 description: Énoncé du sondage
 *               optionsDate:
 *                 type: array
 *                 description: Liste des options de date proposées
 *                 items:
 *                   type: object
 *                   required:
 *                     - dateProposee
 *                     - heureProposee
 *                   properties:
 *                     dateProposee:
 *                       type: string
 *                       format: date
 *                       example: "2025-09-25"
 *                     heureProposee:
 *                       type: string
 *                       example: "10:00"
 *               dureeHeures:
 *                 type: integer
 *                 example: 48
 *                 description: Durée du sondage en heures (optionnel, par défaut 48h)
 *     responses:
 *       201:
 *         description: Sondage créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Sondage créé avec succès"
 *                 data:
 *                   $ref: '#/components/schemas/Sondage'
 *       400:
 *         description: Données invalides ou manquantes
 *       500:
 *         description: Erreur serveur lors de la création
 */

/**
 * @swagger
 * /api/sondage/ag/{assembleId}:
 *   get:
 *     tags:
 *       - Sondages
 *     summary: Récupérer un sondage par ID d'Assemblée Générale
 *     parameters:
 *       - in: path
 *         name: assembleId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'Assemblée Générale
 *         example: 1
 *     responses:
 *       200:
 *         description: Sondage récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Sondage récupéré avec succès"
 *                 data:
 *                   $ref: '#/components/schemas/Sondage'
 *       400:
 *         description: ID invalide
 *       404:
 *         description: Sondage non trouvé
 *       500:
 *         description: Erreur serveur lors de la récupération
 */

/**
 * @swagger
 * /api/sondage/vote/{optionId}:
 *   post:
 *     tags:
 *       - Sondages
 *     summary: Voter pour une option de date dans un sondage
 *     parameters:
 *       - in: path
 *         name: optionId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de l'option de date
 *         example: 1
 *     responses:
 *       200:
 *         description: Vote enregistré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Vote enregistré avec succès"
 *                 data:
 *                   $ref: '#/components/schemas/OptionDate'
 *       400:
 *         description: ID d'option invalide
 *       500:
 *         description: Erreur serveur lors du vote
 */

/**
 * @swagger
 * /api/sondage/results/{sondageId}:
 *   get:
 *     tags:
 *       - Sondages
 *     summary: Récupérer les résultats d'un sondage
 *     parameters:
 *       - in: path
 *         name: sondageId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID du sondage
 *         example: 1
 *     responses:
 *       200:
 *         description: Résultats récupérés avec succès
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Résultats du sondage récupérés avec succès"
 *                 data:
 *                   $ref: '#/components/schemas/SondageResults'
 *       400:
 *         description: ID de sondage invalide
 *       404:
 *         description: Sondage non trouvé
 *       500:
 *         description: Erreur serveur lors de la récupération
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Sondage:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         enonceSondage:
 *           type: string
 *           example: "Choisissez la date de l'AG"
 *         dateFin:
 *           type: string
 *           format: date-time
 *           example: "2025-09-27T12:00:00Z"
 *         assembleId:
 *           type: integer
 *           example: 1
 *         statut:
 *           type: string
 *           example: "ACTIF"
 *         optionsDate:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/OptionDate'
 *     OptionDate:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         dateProposee:
 *           type: string
 *           format: date
 *           example: "2025-09-25"
 *         heureProposee:
 *           type: string
 *           example: "10:00"
 *         nbVotes:
 *           type: integer
 *           example: 5
 *     SondageResults:
 *       allOf:
 *         - $ref: '#/components/schemas/Sondage'
 *         - type: object
 *           properties:
 *             totalVotes:
 *               type: integer
 *               example: 25
 *             optionsDate:
 *               type: array
 *               items:
 *                 allOf:
 *                   - $ref: '#/components/schemas/OptionDate'
 *                   - type: object
 *                     properties:
 *                       percentage:
 *                         type: string
 *                         example: "20.00"
 *                         description: Pourcentage des votes pour cette option
 */

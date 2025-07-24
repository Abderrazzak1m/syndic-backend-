/**
 * @swagger
 * tags:
 *   name: AssembleesGenerales
 *   description: Gestion des Assemblées Générales (AG)
 */

/**
 * @swagger
 * /api/assemblee-generale:
 *   post:
 *     tags:
 *       - AssembleesGenerales
 *     summary: Créer une nouvelle Assemblée Générale
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       description: Données pour créer une AG
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - trancheId
 *               - enonce
 *             properties:
 *               trancheId:
 *                 type: integer
 *                 example: 1
 *                 description: ID de la tranche associée
 *               enonce:
 *                 type: string
 *                 example: "Énoncé de l'Assemblée Générale"
 *                 description: Titre ou énoncé de l'AG
 *               description:
 *                 type: string
 *                 example: "Description détaillée de l'AG"
 *                 description: Description optionnelle de l'AG
 *     responses:
 *       201:
 *         description: Assemblée Générale créée avec succès
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
 *                   example: "Assemblée Générale créée avec succès"
 *                 data:
 *                   $ref: '#/components/schemas/AssembleeGenerale'
 *       400:
 *         description: Champs manquants ou invalides
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Les champs trancheId et enonce sont obligatoires"
 *       500:
 *         description: Erreur serveur lors de la création
 */

/**
 * @swagger
 * /api/assemblee-generale/tranche/{trancheId}:
 *   get:
 *     tags:
 *       - AssembleesGenerales
 *     summary: Récupérer les Assemblées Générales par ID de tranche
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: trancheId
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la tranche
 *         example: 1
 *     responses:
 *       200:
 *         description: Liste des Assemblées Générales récupérée avec succès
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
 *                   example: "Liste des Assemblées Générales récupérée avec succès"
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/AssembleeGenerale'
 *       400:
 *         description: ID de tranche invalide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "ID de tranche invalide"
 *       500:
 *         description: Erreur serveur lors de la récupération
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     AssembleeGenerale:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         numAG:
 *           type: string
 *           example: "AG-2025-001"
 *           description: Numéro unique de l'AG
 *         enonce:
 *           type: string
 *           example: "Assemblée Générale Annuelle 2025"
 *         description:
 *           type: string
 *           example: "Description détaillée de l'AG"
 *         trancheId:
 *           type: integer
 *           example: 1
 *         etat:
 *           type: string
 *           example: "EN_ATTENTE"
 *           description: État actuel de l'AG
 *         tranche:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             intitulé:
 *               type: string
 *               example: "Tranche A"
 *             copropriete:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 nom:
 *                   type: string
 *                   example: "Résidence Al Andalous"
 *         sondage:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *                 example: 1
 *               optionsDate:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     dateProposee:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-09-23T10:00:00Z"
 */




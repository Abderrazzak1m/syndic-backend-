/**
 * @swagger
 * tags:
 *   name: PV
 *   description: Gestion des Procès-Verbaux (PV) des Assemblées Générales
 */

/**
 * @swagger
 * /api/pv:
 *   post:
 *     tags:
 *       - PV
 *     summary: Créer un PV pour une Assemblée Générale
 *     requestBody:
 *       description: Données pour créer un PV
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assembleeId
 *               - contenu
 *             properties:
 *               assembleeId:
 *                 type: integer
 *                 example: 1
 *               enonce:
 *                 type: string
 *                 example: "Procès-verbal de l'Assemblée Générale du 12/07/2025"
 *               contenu:
 *                 type: string
 *                 example: "Les résolutions suivantes ont été adoptées..."
 *     responses:
 *       201:
 *         description: PV créé avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PvResponse'
 *       400:
 *         description: Données invalides
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/pv/ag/{assembleeId}:
 *   get:
 *     tags:
 *       - PV
 *     summary: Récupérer un PV à partir de l'ID de l'AG
 *     parameters:
 *       - in: path
 *         name: assembleeId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *         description: ID de l'Assemblée Générale
 *     responses:
 *       200:
 *         description: PV récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PvResponse'
 *       400:
 *         description: ID invalide
 *       404:
 *         description: PV non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/pv/{id}:
 *   get:
 *     tags:
 *       - PV
 *     summary: Récupérer un PV par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *         description: ID du PV
 *     responses:
 *       200:
 *         description: PV récupéré avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PvResponse'
 *       400:
 *         description: ID invalide
 *       404:
 *         description: PV non trouvé
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/pv/{id}:
 *   put:
 *     tags:
 *       - PV
 *     summary: Mettre à jour un PV
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *         description: ID du PV à mettre à jour
 *     requestBody:
 *       description: Données à mettre à jour
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               enonce:
 *                 type: string
 *                 example: "Nouveau titre du PV"
 *               contenu:
 *                 type: string
 *                 example: "Contenu mis à jour du procès-verbal..."
 *     responses:
 *       200:
 *         description: PV mis à jour avec succès
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PvResponse'
 *       400:
 *         description: ID invalide ou données invalides
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/pv/{id}:
 *   delete:
 *     tags:
 *       - PV
 *     summary: Supprimer un PV
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 5
 *         description: ID du PV à supprimer
 *     responses:
 *       200:
 *         description: PV supprimé avec succès
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
 *                   example: PV supprimé avec succès
 *       400:
 *         description: ID invalide
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * /api/pv/tranche/{trancheId}:
 *   get:
 *     tags:
 *       - PV
 *     summary: Récupérer tous les PV d'une tranche
 *     parameters:
 *       - in: path
 *         name: trancheId
 *         required: true
 *         schema:
 *           type: integer
 *         example: 3
 *         description: ID de la tranche concernée
 *     responses:
 *       200:
 *         description: Liste des PVs récupérée avec succès
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
 *                   example: Liste des PVs récupérée avec succès
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Pv'
 *       400:
 *         description: ID invalide
 *       500:
 *         description: Erreur serveur
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Pv:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 10
 *         enonce:
 *           type: string
 *           example: "PV de l'AG: Budget 2025"
 *         contenu:
 *           type: string
 *           example: "Ordre du jour discuté et approuvé à l'unanimité."
 *         assemblee:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1
 *             numAG:
 *               type: string
 *               example: "AG-2025-01"
 *             enonce:
 *               type: string
 *               example: "Assemblée Générale Ordinaire"
 *             datePlanifiee:
 *               type: string
 *               format: date-time
 *               example: "2025-07-10T10:00:00Z"
 *             etat:
 *               type: string
 *               example: "TERMINÉE"
 *             tranche:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 intitulé:
 *                   type: string
 *                   example: "Tranche Nord"
 *                 copropriete:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nom:
 *                       type: string
 *                       example: "Résidence Soleil"
 *                     adresse:
 *                       type: string
 *                       example: "123 rue des Lilas, Paris"
 *     PvResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: PV récupéré avec succès
 *         data:
 *           $ref: '#/components/schemas/Pv'
 */

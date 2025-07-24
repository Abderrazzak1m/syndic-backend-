/**
 * @swagger
 * tags:
 *   name: Ordre du Jour
 *   description: Gestion des ordres du jour des Assemblées Générales
 */

/**
 * @swagger
 * /api/ordre-jour:
 *   post:
 *     tags:
 *       - Ordre du Jour
 *     summary: Créer un ordre du jour pour une AG
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - assembleeId
 *               - objetOrdreJour
 *               - texteOrdreJour
 *             properties:
 *               assembleeId:
 *                 type: integer
 *               objetOrdreJour:
 *                 type: string
 *               texteOrdreJour:
 *                 type: string
 *     responses:
 *       201:
 *         description: Ordre du jour créé avec succès
 */

/**
 * @swagger
 * /api/ordre-jour/ag/{assembleeId}:
 *   get:
 *     tags:
 *       - Ordre du Jour
 *     summary: Récupérer l'ordre du jour par ID d'AG
 *     parameters:
 *       - in: path
 *         name: assembleeId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ordre du jour récupéré avec succès
 *       404:
 *         description: Ordre du jour non trouvé
 */

/**
 * @swagger
 * /api/ordre-jour/{id}:
 *   get:
 *     tags:
 *       - Ordre du Jour
 *     summary: Récupérer un ordre du jour par son ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ordre du jour récupéré avec succès
 *       404:
 *         description: Ordre du jour non trouvé
 *
 *   put:
 *     tags:
 *       - Ordre du Jour
 *     summary: Mettre à jour un ordre du jour
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
 *             properties:
 *               objetOrdreJour:
 *                 type: string
 *               texteOrdreJour:
 *                 type: string
 *     responses:
 *       200:
 *         description: Ordre du jour mis à jour avec succès
 *
 *   delete:
 *     tags:
 *       - Ordre du Jour
 *     summary: Supprimer un ordre du jour
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ordre du jour supprimé avec succès
 */

/**
 * @swagger
 * /api/ordre-jour/tranche/{trancheId}:
 *   get:
 *     tags:
 *       - Ordre du Jour
 *     summary: Récupérer tous les ordres du jour d'une tranche
 *     parameters:
 *       - in: path
 *         name: trancheId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Liste des ordres du jour récupérée avec succès
 */

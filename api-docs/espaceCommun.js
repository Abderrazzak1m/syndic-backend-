/**
 * @swagger
 * tags:
 *   name: EspacesCommuns
 *   description: Common space management endpoints
 */

/**
 * @swagger
 * /api/espaces-communs:
 *   get:
 *     tags:
 *       - EspacesCommuns
 *     summary: Get all espaces communs
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of espaces communs
 *   post:
 *     tags:
 *       - EspacesCommuns
 *     summary: Create a new espace commun
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - intitulé
 *               - superficie
 *               - trancheId
 *             properties:
 *               intitulé:
 *                 type: string
 *               superficie:
 *                 type: number
 *                 description: Surface area in m²
 *               trancheId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Espace commun created successfully
 */

/**
 * @swagger
 * /api/espaces-communs/{id}:
 *   get:
 *     tags:
 *       - EspacesCommuns
 *     summary: Get espace commun by ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Espace commun details
 *   put:
 *     tags:
 *       - EspacesCommuns
 *     summary: Update espace commun
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
 *             properties:
 *               intitulé:
 *                 type: string
 *               superficie:
 *                 type: number
 *                 description: Surface area in m²
 *               trancheId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Espace commun updated successfully
 *   delete:
 *     tags:
 *       - EspacesCommuns
 *     summary: Delete espace commun
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Espace commun deleted successfully
 */

/**
 * @swagger
 * /api/espaces-communs/tranche/{id}:
 *   get:
 *     tags:
 *       - EspacesCommuns
 *     summary: Get espaces communs by tranche ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of espaces communs for the tranche
 */

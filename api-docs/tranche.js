/**
 * @swagger
 * tags:
 *   name: Tranches
 *   description: Tranche management endpoints
 */

/**
 * @swagger
 * /api/tranches:
 *   get:
 *     tags:
 *       - Tranches
 *     summary: Get all tranches
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of tranches
 *   post:
 *     tags:
 *       - Tranches
 *     summary: Create a new tranche
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
 *               - coproprieteId
 *             properties:
 *               intitulé:
 *                 type: string
 *               superficie:
 *                 type: number
 *               coproprieteId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tranche created successfully
 */

/**
 * @swagger
 * /api/tranches/{id}:
 *   get:
 *     tags:
 *       - Tranches
 *     summary: Get tranche by ID
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
 *         description: Tranche details
 *   put:
 *     tags:
 *       - Tranches
 *     summary: Update tranche
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
 *               coproprieteId:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tranche updated successfully
 *   delete:
 *     tags:
 *       - Tranches
 *     summary: Delete tranche
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
 *         description: Tranche deleted successfully
 */

/**
 * @swagger
 * /api/tranches/{id}/immeubles:
 *   get:
 *     tags:
 *       - Tranches
 *     summary: Get immeubles by tranche ID
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
 *         description: List of immeubles for the tranche
 */
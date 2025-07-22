/**
 * @swagger
 * tags:
 *   name: Immeubles
 *   description: Building management endpoints
 */

/**
 * @swagger
 * /api/immeubles:
 *   get:
 *     tags:
 *       - Immeubles
 *     summary: Get all immeubles
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of immeubles
 *   post:
 *     tags:
 *       - Immeubles
 *     summary: Create a new immeuble
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
 *               trancheId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Immeuble created successfully
 */

/**
 * @swagger
 * /api/immeubles/{id}:
 *   get:
 *     tags:
 *       - Immeubles
 *     summary: Get immeuble by ID
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
 *         description: Immeuble details
 *   put:
 *     tags:
 *       - Immeubles
 *     summary: Update immeuble
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
 *         description: Immeuble updated successfully
 *   delete:
 *     tags:
 *       - Immeubles
 *     summary: Delete immeuble
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
 *         description: Immeuble deleted successfully
 */

/**
 * @swagger
 * /api/immeubles/{id}/lots:
 *   get:
 *     tags:
 *       - Immeubles
 *     summary: Get lots by immeuble ID
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
 *         description: List of lots for the immeuble
 */
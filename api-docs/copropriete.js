/**
 * @swagger
 * tags:
 *   name: Coproprietes
 *   description: Property management endpoints
 */

/**
 * @swagger
 * /api/coproprietes:
 *   get:
 *     tags:
 *       - Coproprietes
 *     summary: Get all coproprietes
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of coproprietes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nom:
 *                     type: string
 *                   adresse:
 *                     type: string
 *                   description:
 *                     type: string
 *                   budget:
 *                     type: number
 *       401:
 *         description: Unauthorized
 *   post:
 *     tags:
 *       - Coproprietes
 *     summary: Create a new copropriete
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nom
 *               - adresse
 *               - budget
 *               - superficie
 *             properties:
 *               nom:
 *                 type: string
 *               adresse:
 *                 type: string
 *               description:
 *                 type: string
 *               budget:
 *                 type: number
 *               superficie:
 *                 type: number
 *                 description: Surface area in m²
 *     responses:
 *       201:
 *         description: Copropriete created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/coproprietes/{id}:
 *   get:
 *     tags:
 *       - Coproprietes
 *     summary: Get copropriete by ID
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
 *         description: Copropriete details
 *       404:
 *         description: Copropriete not found
 *   put:
 *     tags:
 *       - Coproprietes
 *     summary: Update copropriete
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
 *               nom:
 *                 type: string
 *               adresse:
 *                 type: string
 *               description:
 *                 type: string
 *               budget:
 *                 type: number
 *               superficie:
 *                 type: number
 *                 description: Surface area in m²
 *     responses:
 *       200:
 *         description: Copropriete updated successfully
 *   delete:
 *     tags:
 *       - Coproprietes
 *     summary: Delete copropriete
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
 *         description: Copropriete deleted successfully
 */

/**
 * @swagger
 * /api/coproprietes/{id}/tranches:
 *   get:
 *     tags:
 *       - Coproprietes
 *     summary: Get tranches by copropriete ID
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
 *         description: List of tranches for the copropriete
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   intitulé:
 *                     type: string
 *                   superficie:
 *                     type: number
 */

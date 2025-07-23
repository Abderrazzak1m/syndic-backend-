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
 *     summary: Get all active coproprietes
 *     description: Returns only coproprietes with status 'active'
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of active coproprietes
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
 *                   status:
 *                     type: string
 *                     enum: [active, archived, inactive]
 *       401:
 *         description: Unauthorized
 *   post:
 *     tags:
 *       - Coproprietes
 *     summary: Create a new copropriete
 *     description: Creates a new copropriete with status automatically set to 'active'
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
 *         description: Copropriete created successfully with status 'active'
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /api/coproprietes/archived:
 *   get:
 *     tags:
 *       - Coproprietes
 *     summary: Get all archived coproprietes
 *     description: Returns only coproprietes with status 'archived'
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of archived coproprietes
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
 *                   status:
 *                     type: string
 *                     enum: [active, archived, inactive]
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
 *     description: Update all copropriete attributes including status
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
 *               status:
 *                 type: string
 *                 enum: [active, archived, inactive]
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

/**
 * @swagger
 * tags:
 *   name: Lots
 *   description: Lot management endpoints
 */

/**
 * @swagger
 * /api/lots:
 *   get:
 *     tags:
 *       - Lots
 *     summary: Get all lots
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of lots with copropriétaire and locataire details
 *   post:
 *     tags:
 *       - Lots
 *     summary: Create a new lot
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
 *               - etage
 *               - quotePart
 *               - montantDu
 *               - immeubleId
 *             properties:
 *               intitulé:
 *                 type: string
 *               superficie:
 *                 type: number
 *               etage:
 *                 type: string
 *               quotePart:
 *                 type: number
 *               montantDu:
 *                 type: number
 *               immeubleId:
 *                 type: integer
 *               coproprietaireId:
 *                 type: integer
 *                 nullable: true
 *               locataireId:
 *                 type: integer
 *                 nullable: true
 *               numeroContratLocation:
 *                 type: string
 *                 nullable: true
 *               numeroContratAcquisition:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Lot created successfully
 */

/**
 * @swagger
 * /api/lots/{id}:
 *   get:
 *     tags:
 *       - Lots
 *     summary: Get lot by ID
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
 *         description: Lot details with copropriétaire and locataire
 *   put:
 *     tags:
 *       - Lots
 *     summary: Update lot
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
 *               etage:
 *                 type: string
 *               quotePart:
 *                 type: number
 *               montantDu:
 *                 type: number
 *               immeubleId:
 *                 type: integer
 *               coproprietaireId:
 *                 type: integer
 *                 nullable: true
 *               locataireId:
 *                 type: integer
 *                 nullable: true
 *               numeroContratLocation:
 *                 type: string
 *                 nullable: true
 *               numeroContratAcquisition:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Lot updated successfully
 *   delete:
 *     tags:
 *       - Lots
 *     summary: Delete lot
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
 *         description: Lot deleted successfully
 */

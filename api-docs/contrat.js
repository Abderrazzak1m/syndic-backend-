/**
 * @swagger
 * tags:
 *   name: Contrats
 *   description: Contract management endpoints
 */

/**
 * @swagger
 * /api/contrats/copropriete/{id}:
 *   get:
 *     tags:
 *       - Contrats
 *     summary: Get contrats by copropriete ID
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
 *         description: List of contrats for the copropriete
 */

/**
 * @swagger
 * /api/contrats/{id}:
 *   put:
 *     tags:
 *       - Contrats
 *     summary: Update contrat
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
 *               lotId:
 *                 type: integer
 *               locataireId:
 *                 type: integer
 *               coproprietaireId:
 *                 type: integer
 *               dateCreation:
 *                 type: string
 *                 format: date
 *               dateExpiration:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *               procuration:
 *                 type: boolean
 *               Statut:
 *                 type: string
 *                 enum: [Validé, Résilié]
 *     responses:
 *       200:
 *         description: Contrat updated successfully
 */

/**
 * @swagger
 * /api/contrats:
 *   post:
 *     tags:
 *       - Contrats
 *     summary: Create a new contrat
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lotId
 *               - locataireId
 *               - coproprietaireId
 *               - dateCreation
 *               - procuration
 *               - Statut
 *             properties:
 *               lotId:
 *                 type: integer
 *               locataireId:
 *                 type: integer
 *               coproprietaireId:
 *                 type: integer
 *               dateCreation:
 *                 type: string
 *                 format: date
 *               dateExpiration:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *               procuration:
 *                 type: boolean
 *               Statut:
 *                 type: string
 *                 enum: [Validé, Résilié]
 *     responses:
 *       201:
 *         description: Contrat created successfully with auto-generated numeroContratLocation
 */

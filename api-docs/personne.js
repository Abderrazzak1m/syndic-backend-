/**
 * @swagger
 * tags:
 *   name: Personnes
 *   description: Person management endpoints (locataires and copropriétaires)
 */

/**
 * @swagger
 * /api/personnes:
 *   get:
 *     tags:
 *       - Personnes
 *     summary: Get all personnes
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of personnes
 *   post:
 *     tags:
 *       - Personnes
 *     summary: Create a new personne
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
 *               - prenom
 *               - adresse
 *               - email
 *               - telephone
 *               - nationalite
 *               - cin
 *               - type
 *               - statut
 *               - coproprieteId
 *             properties:
 *               nom:
 *                 type: string
 *               prenom:
 *                 type: string
 *               dateNaissance:
 *                 type: string
 *                 format: date
 *                 nullable: true
 *               adresse:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               telephone:
 *                 type: string
 *               sexe:
 *                 type: string
 *                 nullable: true
 *               nationalite:
 *                 type: string
 *               cin:
 *                 type: string
 *               solde:
 *                 type: number
 *                 nullable: true
 *               type:
 *                 type: string
 *                 enum: [locataire, coproprietaire]
 *               statut:
 *                 type: string
 *                 enum: [active, bloqué]
 *               coproprieteId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Personne created successfully
 */

/**
 * @swagger
 * /api/personnes/{id}:
 *   get:
 *     tags:
 *       - Personnes
 *     summary: Get personne by ID
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
 *         description: Personne details with lots
 *   put:
 *     tags:
 *       - Personnes
 *     summary: Update personne
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
 *         description: Personne updated successfully
 *   delete:
 *     tags:
 *       - Personnes
 *     summary: Delete personne
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
 *         description: Personne deleted successfully
 */

/**
 * @swagger
 * /api/personnes/type/{type}:
 *   get:
 *     tags:
 *       - Personnes
 *     summary: Get personnes by type
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [locataire, coproprietaire]
 *     responses:
 *       200:
 *         description: List of personnes by type
 */

/**
 * @swagger
 * /api/personnes/copropriete/{coproprieteId}:
 *   get:
 *     tags:
 *       - Personnes
 *     summary: Get personnes by copropriete
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: coproprieteId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of personnes in the copropriete
 */

/**
 * @swagger
 * /api/personnes/locataires:
 *   get:
 *     tags:
 *       - Personnes
 *     summary: Get all locataires
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of locataires with their lots and copropriete details
 */

/**
 * @swagger
 * /api/personnes/coproprietaires:
 *   get:
 *     tags:
 *       - Personnes
 *     summary: Get all coproprietaires
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of coproprietaires with their lots and copropriete details
 */

/**
 * @swagger
 * /api/personnes/copropriete/{coproprieteId}/locataires:
 *   get:
 *     tags:
 *       - Personnes
 *     summary: Get all locataires by copropriete
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: coproprieteId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of locataires in the copropriete with their lots
 */

/**
 * @swagger
 * /api/personnes/copropriete/{coproprieteId}/coproprietaires:
 *   get:
 *     tags:
 *       - Personnes
 *     summary: Get all coproprietaires by copropriete
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: coproprieteId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: List of coproprietaires in the copropriete with their lots
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     cookieAuth:
 *       type: apiKey
 *       in: cookie
 *       name: accessToken
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: Authentication endpoints for users
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Log in a user
 *     description: Log in using email and password, returns access token in HTTP-only cookie
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "newuser@example.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "userPassword123"
 *     responses:
 *       200:
 *         description: Login successful, access token set in HTTP-only cookie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     role:
 *                       type: string
 *                       enum: [Administration, Entretien, Comptabilité, RH]
 *                       example: "Administration"
 *       401:
 *         description: Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Log out the user
 *     description: Clears the access token cookie and logs out the user
 *     responses:
 *       200:
 *         description: Logout successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Logout successful"
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get current authenticated user
 *     description: Returns user data from access token (cookie-based)
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Authenticated user info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     email:
 *                       type: string
 *                       example: "user@example.com"
 *                     role:
 *                       type: string
 *                       enum: [Administration, Entretien, Comptabilité, RH]
 *                       example: "Administration"
 *       401:
 *         description: Unauthorized - no valid token
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get all users
 *     description: Retrieve a list of all users
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: List of users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       email:
 *                         type: string
 *                         example: "user@example.com"
 *                       fullName:
 *                         type: string
 *                         example: "John Doe"
 *                       role:
 *                         type: string
 *                         enum: [Administration, Entretien, Comptabilité, RH]
 *                         example: "Administration"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         example: "2024-01-15T10:30:00Z"
 *       401:
 *         description: Unauthorized - no valid token
 *       403:
 *         description: Forbidden - invalid token
 *       500:
 *         description: Server error
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Create a new user
 *     description: Create a new user account with email, fullName, and role (password will be set later)
 *     security:
 *       - cookieAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - fullName
 *               - role
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "newuser@example.com"
 *               fullName:
 *                 type: string
 *                 example: "Jane Smith"
 *               role:
 *                 type: string
 *                 enum: [Administration, Entretien, Comptabilité, RH]
 *                 example: "Comptabilité"
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 2
 *                 email:
 *                   type: string
 *                   example: "newuser@example.com"
 *                 role:
 *                   type: string
 *                   example: "Comptabilité"
 *       400:
 *         description: Bad request or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Email already exists"
 *       401:
 *         description: Unauthorized - no valid token
 *       403:
 *         description: Forbidden - invalid token
 */

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     tags:
 *       - Authentication
 *     summary: Update an existing user
 *     description: Update user information by ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "updated@example.com"
 *               fullName:
 *                 type: string
 *                 example: "Jane Updated"
 *               role:
 *                 type: string
 *                 enum: [Administration, Entretien, Comptabilité, RH]
 *                 example: "RH"
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 email:
 *                   type: string
 *                   example: "updated@example.com"
 *                 role:
 *                   type: string
 *                   example: "RH"
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - no valid token
 *       403:
 *         description: Forbidden - invalid token
 *   delete:
 *     tags:
 *       - Authentication
 *     summary: Delete a user
 *     description: Delete user by ID
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: User ID
 *         example: 1
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized - no valid token
 *       403:
 *         description: Forbidden - invalid token
 */

/**
 * @swagger
 * /api/users/setup-password:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Set up user password
 *     description: Set password using setup token received via email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - password
 *             properties:
 *               token:
 *                 type: string
 *                 example: "abc123def456..."
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "newPassword123"
 *     responses:
 *       200:
 *         description: Password set successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password set successfully"
 *       400:
 *         description: Invalid or expired token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid or expired setup token"
 */

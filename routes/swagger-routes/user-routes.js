/**
 * @swagger
 * tags:
 *  name: User
 *  description: API's to manage Users
 */

 /**
 * @swagger
 * /user:
 *  post:
 *      tags: [User]
 *      description: Register new user
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: User
 *            description: User registration schema
 *            in: body
 *            required: true
 *            schema:
 *             type: object
 *             $ref: '#/definitions/User'
 *      responses:
 *          "200":
 *              description: User profile created!  
 */

  /**
 * @swagger
 * /user/verification:
 *   patch:
 *     tags: [User]
 *     description: API to verify email id of user
 *     produces:
 *       - application/json
 *     parameters:
 *        - name: token
 *          in: query
 *          type: string
 *          description: Email verification token
 *     responses:
 *       "200":
 *         description: Email Verified!
*/

  /**
 * @swagger
 * /user/email:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     tags: [User]
 *     description: Api to send verification email
 *     produces:
 *       - application/json
 *     responses:
 *       "200":
 *         description: Verification mail sent
*/

/**
 * @swagger
 * /user/login:
 *   post:
 *     tags: [User]
 *     description: Login API for all users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: Login
 *         description: Authorization information
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       "200":
 *         description: Auth Token
 *       "400":
 *         description: Authorization information is missing.
 *       "401":
 *         description: Authorization information is invalid.
*/

 /**
 * @swagger
 * /user:
 *  get:
 *      security:
 *          - bearerAuth: []
 *      tags: [User]
 *      description: Fetch profile info
 *      produces:
 *          - application/json
 *      responses:
 *          "200":
 *              description: User profile
 *              schema:
 *                  $ref: '#/definitions/User'  
 */

 /**
 * @swagger
 * /user:
 *  put:
 *      security:
 *          - bearerAuth: []
 *      tags: [User]
 *      description: Update user profile
 *      produces:
 *          - application/json
 *      parameters:
 *          - name: User
 *            description: User update schema
 *            in: body
 *            required: true
 *            schema:
 *             type: object
 *             $ref: '#/definitions/User-Update'
 *      responses:
 *          "200":
 *              description: User profile Updated!  
 */

 /**
 * @swagger
 * /user:
 *  delete:
 *      security:
 *          - bearerAuth: []
 *      tags: [User]
 *      description: Delete profile
 *      produces:
 *          - application/json
 *      responses:
 *          "200":
 *              description: User Deleted!  
 */

  /**
 * @swagger
 * /user/logout:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      tags: [User]
 *      description: Logout
 *      produces:
 *          - application/json
 *      responses:
 *          "200":
 *              description: Session end
 */

  /**
 * @swagger
 * /user/logoutAll:
 *  patch:
 *      security:
 *          - bearerAuth: []
 *      tags: [User]
 *      description: Logout of all accounts
 *      produces:
 *          - application/json
 *      responses:
 *          "200":
 *              description: Session ends for all devices
 */

 /**
 * @swagger
 * /user/forgot-password:
 *   patch:
 *     tags: [User]
 *     description: Forgot Password API for all users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ForgotPassword
 *         description: email id of the user
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              email_id:
 *                  type: string
 *     responses:
 *       "200":
 *         description: Password Reset Token, Sends email to reset password
*/

 /**
 * @swagger
 * /user/reset-password:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     tags: [User]
 *     description: Forgot Password API for all users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ResetPassword
 *         description: New password
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              password:
 *                  type: string
 *     responses:
 *       "200":
 *         description: Password Reset!
*/

 /**
 * @swagger
 * /user/change-password:
 *   patch:
 *     security:
 *       - bearerAuth: []
 *     tags: [User]
 *     description: Forgot Password API for all users
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: ChangePassword
 *         description: Credentials
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *              old_password:
 *                  type: string
 *              password:
 *                  type: string
 *     responses:
 *       "200":
 *         description: Password Changed!
*/
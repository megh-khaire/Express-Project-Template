/**
 * @swagger
 * securityDefinitions:
 *      bearerAuth:
 *          type: apiKey
 *          schema: bearer
 *          name: Authorization
 *          bearerFormat: JWT
 *          in: "header"
 * security:
 *        - bearerAuth: [] 
 */

/** 
 * @swagger
 * definitions:
 *      User:
 *          type: object
 *          required:
 *              - name
 *              - email_id
 *              - username
 *              - password
 *          properties:
 *              name:
 *                  type: string
 *                  description: Name of the user
 *              email_id:
 *                  type: string
 *                  description: Email id of the user                 
 *              username:
 *                  type: string
 *                  description: Username 
 *              password: 
 *                  type: string
 *                  description: Password to access account
*/

/** 
 * @swagger
 * definitions:
 *      User-Update:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *                  description: Name of the user
 *              email_id:
 *                  type: string
 *                  description: Email id of the user                 
 *              username:
 *                  type: string
 *                  description: Username 
*/
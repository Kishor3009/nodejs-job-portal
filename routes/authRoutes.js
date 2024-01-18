import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
import rateLimit from "express-rate-limit";

//ip limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

//router object
const router = express.Router();

//routes

/**
 * ## User Schema
 *
 * Represents a user in the system.
 *
 * ```json
 * {
 *   "id": "DHSASDHJDJHVAJDSVJAVSD",
 *   "name": "John",
 *   "lastName": "Doe",
 *   "email": "johndoes@gmail.com",
 *   "password": "test@123",
 *   "location": "Mumbai"
 * }
 * ```
 *
 * @typedef {object} User
 * @property {string} id - The Auto-generated id of the user collection.
 * @property {string} name - User name.
 * @property {string} lastName - User last name.
 * @property {string} email - User email address.
 * @property {string} password - User password (should be greater than 6 characters).
 * @property {string} location - User location (city or country).
 */

/**
 * ### Auth API
 *
 * Authentication APIs for registering and logging in users.
 *
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error
 */

// REGISTER || POST
router.post("/register", limiter, registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Login page
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Something went wrong
 */

// LOGIN || POST
router.post("/login", limiter, loginController);

//export
export default router;

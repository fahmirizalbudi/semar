import Fastify from "fastify";
import translationRoutes from "./interfaces/http/routes/translationRoutes.js";

/**
 * Main application entry point that initializes the Fastify server
 * and registers all routes and middlewares.
 */
const fastify = Fastify({
  logger: true
});

fastify.register(translationRoutes, { prefix: '/api/v1' });

/**
 * Root endpoint for basic API information.
 */
fastify.get('/', async () => {
  return { 
    name: 'Semar API',
    version: '1.1.0',
    description: 'Javanese Translation and Transliteration API'
  };
});

/**
 * Starts the Fastify server on port 3000.
 * In case of failure, logs the error and exits the process.
 */
const start = async () => {
  try {
    await fastify.listen({ port: 3000, host: '0.0.0.0' });
    console.log(`Server is running at http://localhost:3000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();

import Fastify from 'fastify';
import translationRoutes from './routes/translationRoutes.js';

const fastify = Fastify({
  logger: true
});

// Register routes
fastify.register(translationRoutes, { prefix: '/api/v1' });

fastify.get('/', async (request, reply) => {
  return { 
    name: 'Semar API',
    version: '1.0.0',
    description: 'Javanese Translation and Transliteration API',
    endpoints: {
      translate: 'POST /api/v1/translate',
      transliterate: 'POST /api/v1/transliterate',
      health: 'GET /api/v1/health'
    }
  };
});

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

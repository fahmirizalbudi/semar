import Fastify from 'fastify';
import translationRoutes from './interfaces/http/routes/translationRoutes.js';

const fastify = Fastify({
  logger: true
});

fastify.register(translationRoutes, { prefix: '/api/v1' });

fastify.get('/', async () => {
  return { 
    name: 'Semar API (Clean Architecture)',
    version: '1.1.0',
    description: 'Javanese Translation and Transliteration API'
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

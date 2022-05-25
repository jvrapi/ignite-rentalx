import express from 'express';
import 'reflect-metadata';
import swaggerUi from 'swagger-ui-express';
import './database';
import { routes } from './routes';
import './shared/container';
import swaggerFile from './swagger.json';

const app = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(routes);

app.listen(3333, () => console.log('Server is running'));

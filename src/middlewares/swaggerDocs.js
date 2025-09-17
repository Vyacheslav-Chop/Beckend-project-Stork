import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/path.js';
import swaggerUi from 'swagger-ui-express';
import yaml from 'yaml';

export const swaggerDocs = () => {
  try {
    // const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    const fileContent = fs.readFileSync(SWAGGER_PATH, 'utf8');
    const swaggerDoc = yaml.parse(fileContent);

    return [...swaggerUi.serve, swaggerUi.setup(swaggerDoc)];
  } catch (error) {
    console.error('Failed to load Swagger Docs:', error);
    return (req, res) =>
      res.status(500).json({
        status: 500,
        message: 'Internal Sever Error!',
        data: {
          // message: error.message,
          message: 'Failed to load Swagger documentation.',
        },
      });
  }
};

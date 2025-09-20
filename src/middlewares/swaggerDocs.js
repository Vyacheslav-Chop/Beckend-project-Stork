import fs from 'node:fs';
import { SWAGGER_PATH } from '../constants/path.js';
import swaggerUi from 'swagger-ui-express';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());

    return [
      ...swaggerUi.serve,
      swaggerUi.setup(swaggerDoc, {
        swaggerOptions: {
          url: '/swagger.json',
        },
      }),
    ];
  } catch (error) {
    return (req, res) =>
      res.status(500).json({
        status: 500,
        message: 'Internal Sever Error!',
        data: {
          message: error.message,
        },
      });
  }
};

import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const validateRequestBody = <T>(schema: z.ZodSchema<T>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          message: error.errors[0].message,
        });
      }

      return res.status(500).json({
        message: 'Internal Server Error',
      });
    }
  };
};

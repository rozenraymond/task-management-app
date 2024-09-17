import { z } from "zod";

export const validateRequestBody = (schema: z.ZodType<any, any>) => {
  return (req: any, res: any, next: any) => {
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
        message: "Internal Server Error",
      });
    }
  };
};

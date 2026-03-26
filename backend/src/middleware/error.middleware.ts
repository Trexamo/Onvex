import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error('Erro na aplicação:', error);

  const status = error.status || 500;
  const message = error.message || 'Erro interno do servidor';

  // Erros de validação do Sequelize
  if (error.name === 'SequelizeValidationError') {
    return res.status(400).json({
      success: false,
      message: 'Erro de validação',
      errors: error.errors.map((e: any) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Erros de unique constraint
  if (error.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({
      success: false,
      message: 'Registro duplicado',
      errors: error.errors.map((e: any) => ({
        field: e.path,
        message: e.message,
      })),
    });
  }

  // Erros JWT
  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json({
      success: false,
      message: 'Token inválido',
    });
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json({
      success: false,
      message: 'Token expirado',
    });
  }

  res.status(status).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
  });
};
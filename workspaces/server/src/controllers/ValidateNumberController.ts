import { Request, Response } from 'express';
import { luhnValidation } from '@/utils/luhnValidation';

export async function validateNumberController(req: Request, res: Response) {
  const cardNumber = req.body['card-number'];

  if (!cardNumber) {
    res.status(400).json({
      error: 'Body missing required parameters',
    });
  }

  const isValid = luhnValidation(cardNumber);

  res.json({
    'is-valid': isValid,
  });
}
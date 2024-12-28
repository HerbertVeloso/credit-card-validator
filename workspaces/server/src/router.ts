import express from 'express';
import { validateNumberController } from './controllers/ValidateNumberController';

export const router = express.Router();

router.post('/validate-number', validateNumberController);
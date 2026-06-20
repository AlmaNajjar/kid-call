import express from 'express';
import { addKid, getKidsOf } from './kids.js';
import { validateAddingKid, validateGetKidsOf } from './validators.js';

export const router = express.Router();

router.post('/', validateAddingKid, addKid);

router.get('/:id', validateGetKidsOf, getKidsOf);


import express from 'express';
import { addKid, getKidsOf , callKid } from './kids.js';
import { validateAddingKid, validateGetKidsOf , validateCallKid } from './validators.js';

export const router = express.Router();

router.post('/', validateAddingKid, addKid);
router.get('/call/:id', validateCallKid, callKid);

router.get('/:id', validateGetKidsOf, getKidsOf);


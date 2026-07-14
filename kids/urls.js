import express from 'express';
<<<<<<< HEAD
import { addKid, getKidsOf, getAllKids, callKid, confirmKid } from './kids.js';
import { validateAddingKid, validateGetKidsOf, validateCallKid, validateConfirmKid } from './validators.js';
=======
import { addKid, getKidsOf , callKid } from './kids.js';
import { validateAddingKid, validateGetKidsOf , validateCallKid } from './validators.js';
>>>>>>> origin/main

export const router = express.Router();

router.post('/', validateAddingKid, addKid);
<<<<<<< HEAD
router.get('/:id', validateGetKidsOf, getKidsOf);

router.post('/:id/call', validateCallKid, callKid);

router.get('/admin/all', getAllKids);

router.patch('/:id/confirm', validateConfirmKid, confirmKid);
=======
router.post("/:id/call", validateCallKid, callKid);

router.get('/:id', validateGetKidsOf, getKidsOf);


>>>>>>> origin/main

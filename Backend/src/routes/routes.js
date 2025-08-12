import express from 'express';

import { addLead, getAllLeads } from '../controllers/leads.controller.js';


const router = express.Router();


router.post("/addLead", addLead);
router.get("/getAllLeads", getAllLeads);




export default router;


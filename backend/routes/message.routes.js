import express from 'express';
import {sendMessage,getMessages} from '../controllers/message.controller.js';
import protectRoute from '../middleware/protectroute.js';

const router=express.Router();

router.get('/:userId',protectRoute,getMessages);
router.post('/send/:userId',protectRoute,sendMessage);


export default router;
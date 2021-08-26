const express = require('express');
const imagesController = require('../../controllers/images.controller');

const router = express.Router();

router.get('/',imagesController.getImages ); 
router.get('/fuck',(req,res) => res.send("fuckkkk")); 

module.exports = router;
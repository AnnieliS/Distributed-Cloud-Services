const router = require('express').Router();
const inv = require('../controller/invitationController');

router.get('/invitation/read/:id',(req,res)=>{
    inv.read(req,res);
});

router.get('/invitations/read', (req,res)=>{
    inv.readAll(req,res);
});

router.post('/invitation/create', (req,res)=>{
    inv.create(req,res);
});

router.put('/invitation/update/:id', (req,res) =>{
    inv.update(req,res);
});

router.delete('/invitation/delete/:id', (req,res)=>{
    inv.delete(req,res);
});

module.exports = router;
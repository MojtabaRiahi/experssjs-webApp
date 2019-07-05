const express = require('express');
const router = express.Router();
router.get('/chat', (req, res) => {
    res.render('chat', {
        chatTile: 'chat',
        pageId: 'chat'

    })
})
module.exports=router;
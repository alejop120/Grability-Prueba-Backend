const express = require('express');
const router = express.Router();
const purchaseCtrl = require('../../controllers/api/v1/purchase');

router.post('/v1/purchases', purchaseCtrl.index);

module.exports = router;
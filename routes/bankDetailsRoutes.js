const express = require('express');
const { addBankDetails, getAllBankDetails, updateBankDetails, deleteBankDetails } = require('../controllers/bankDetailsController');

const router = express.Router();

router.post('/add', addBankDetails);
router.get('/all', getAllBankDetails);
router.put('/update/:id', updateBankDetails);
router.delete('/delete/:id', deleteBankDetails);

module.exports = router;

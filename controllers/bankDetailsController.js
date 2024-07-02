const BankDetails = require('../models/BankDetails');

// Add Bank Details
exports.addBankDetails = async (req, res) => {
    const { institutionNumber, transitNumber, accountNumber, bankName, accountHolder } = req.body;

    try {
        const bankDetails = new BankDetails({
            institutionNumber,
            transitNumber,
            accountNumber,
            bankName,
            accountHolder
        });

        await bankDetails.save();
        res.status(201).json({ message: 'Bank details added successfully', bankDetails });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while adding the bank details' });
    }
};

// Get All Bank Details
exports.getAllBankDetails = async (req, res) => {
    try {
        const bankDetails = await BankDetails.find();
        res.status(200).json(bankDetails);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while retrieving the bank details' });
    }
};

// Update Bank Details by ID
exports.updateBankDetails = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;

    try {
        const bankDetails = await BankDetails.findByIdAndUpdate(id, updateData, { new: true });
        if (!bankDetails) {
            return res.status(404).json({ error: 'Bank details not found' });
        }
        res.status(200).json({ message: 'Bank details updated successfully', bankDetails });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while updating the bank details' });
    }
};

// Delete Bank Details by ID
exports.deleteBankDetails = async (req, res) => {
    const { id } = req.params;

    try {
        const bankDetails = await BankDetails.findByIdAndDelete(id);
        if (!bankDetails) {
            return res.status(404).json({ error: 'Bank details not found' });
        }
        res.status(200).json({ message: 'Bank details deleted successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while deleting the bank details' });
    }
};


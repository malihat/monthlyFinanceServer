const express = require('express');
const TotalRecordModel = require('../models/TotalRecordModel')

const router = express.Router();

router.get('/total', async (req, res) => {
    try {
        const total = await TotalRecordModel.find();
        console.log(total);
        res.status(200).json(total);
    } catch (error) {
        res.status(500).send({message: error.message})
    }
})

router.post('/total', async (req, res) => {
    const { total } = req.body;
    
    try {
        const existingTotal = await TotalRecordModel.findOne(); 
        if (existingTotal) {
            existingTotal.total = total; 
            await existingTotal.save();
            return res.status(201).json({total: existingTotal.total})
        } else {
            const newTotal = new newTotalModel({total});
            await newTotal.save();
            return res.status(201).json({total: newTotal.total})
        }

    } catch (error) {
        console.error('Error:', error);
        return res.status(500).send({ error: 'An error occurred while saving total' });
    }
});

// Route to delete
router.delete('/:newId', async (req, res) => {
    try {
        const {newId} = req.params;
        console.log(newId);
        const deletedItem = await FinanceRecordModel.findByIdAndDelete(newId);
        if (!deletedItem) {
            return res.status(404).json({ message: 'Record not found' });
        } else {
            return res.status(200).json({ message: 'Record deleted successfully' });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({message: error.message})
    }
})


module.exports = router;


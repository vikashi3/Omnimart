const User = require('../models/user');
const BusinessCard = require('../models/businessCard');

exports.createBusinessCard = async (req, res) => {
    try {
        const {
            category,
            subcategory,
            products
        } = req.body;
        // console.log(req.body)
        const userId = req.user.id;
        const user = await User.findById(userId);
        if (!user || user.accountType !== 'business') {
            return res.status(400).send({ error: 'Invalid user ID or user is not a business account' });
        }
        const newBusinessCard = new BusinessCard({
            user: userId,
            category,
            subcategory,
            products
        });
        await newBusinessCard.save();
        user.businessCard.push(newBusinessCard._id);
        await user.save();
        res.status(201).send(newBusinessCard);
    } catch (error) {
        console.log(error.message)
        res.status(400).send({ error: error.message });
    }
};

exports.getBusinessCardsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('businessCard');
        if (!user || user.accountType !== 'business') {
            return res.status(400).send({ error: 'Invalid user ID or user is not a business account' });
        }
        if (!user.businessCard || user.businessCard.length === 0) {
            return res.status(404).send({ error: 'No business cards found for this user' });
        }
        res.status(200).send(user.businessCard);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
};


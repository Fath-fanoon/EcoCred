const Token = require('../models/Token');
const Action = require('../models/Action');

// Simulate verification and reward
exports.rewardTokens = async (req, res) => {
    try {
        const { userId, actionId } = req.body;
        // For MVP, just reward 10 tokens per action
        const token = await Token.findOne({ user: userId });
        if (!token) return res.status(404).json({ message: 'Token account not found' });
        token.balance += 10;
        await token.save();
        res.json({ balance: token.balance });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getTokenBalance = async (req, res) => {
    try {
        const { userId } = req.params;
        const token = await Token.findOne({ user: userId });
        if (!token) return res.status(404).json({ message: 'Token account not found' });
        res.json({ balance: token.balance });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}; 
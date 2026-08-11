const Action = require('../models/Action');

exports.submitAction = async (req, res) => {
    try {
        const { userId, type, imageUrl, gps } = req.body;
        const action = new Action({ user: userId, type, imageUrl, gps });
        await action.save();
        res.status(201).json(action);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getActionsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const actions = await Action.find({ user: userId }).sort({ createdAt: -1 });
        res.json(actions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}; 
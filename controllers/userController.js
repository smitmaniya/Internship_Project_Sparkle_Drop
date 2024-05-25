const User = require('../models/user');

exports.getUser = async (req, res) => {
    try {
        // const user = await User.findById(req.user.id).select('-password');
        const user = await User.findAll();

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const { User } = require('../models/index');

const getById = async (id) => {
    const user = await User.findOne({ where: { id: id } });
    return user;
};

module.exports = { getById };

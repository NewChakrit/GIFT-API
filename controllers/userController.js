const { User, About } = require('../dbs/models/index');
const { Op } = require('sequelize');

exports.getAllUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const users = await User.findAll({
            include: [
                {
                    model: About,
                    attributes: {
                        exclude: ['createdAt'],
                    },
                },
            ],
            where: { [Op.not]: [{ id: [id] }] },
        });
        res.status(200).json({ users });
    } catch (err) {
        next(err);
    }
};

exports.getMe = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findOne({
            include: [
                {
                    model: About,
                    attributes: {
                        exclude: ['createdAt'],
                    },
                },
            ],
            where: { id: id },
        });
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};

exports.getUserByUsername = async (req, res, next) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({
            include: [
                {
                    model: About,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt'],
                    },
                },
            ],
            where: { username },
        });
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};

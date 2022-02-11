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

exports.updateProfileImg = async (req, res, next) => {
    try {
        const { profileUrl } = req.body;
        const { id } = req.params;

        const [affectedRow] = await User.update(
            {
                profileUrl,
            },
            {
                where: {
                    id,
                },
            }
        );
        if (affectedRow === 0) {
            res.status(400).json({ message: 'cannot update profile picture' });
        }

        const user = await User.findOne({
            where: { id },
        });
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};

exports.updateCoverImg = async (req, res, next) => {
    try {
        const { coverUrl } = req.body;
        const { id } = req.params;

        const [affectedRow] = await User.update(
            {
                coverUrl,
            },
            {
                where: {
                    id,
                },
            }
        );
        if (affectedRow === 0) {
            res.status(400).json({ message: 'cannot update cover picture' });
        }

        const user = await User.findOne({
            where: { id },
        });
        res.status(200).json({ user });
    } catch (err) {
        next(err);
    }
};

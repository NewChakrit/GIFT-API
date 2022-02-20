const { About } = require('../dbs/models/index');
const jwt = require('jsonwebtoken');

exports.getAboutById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const about = await About.findOne({
            where: {
                userId: id,
            },
        });

        res.status(201).json({ about });
    } catch (err) {
        next(err);
    }
};

exports.createAbout = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { gender, interest, age } = req.body;

        const about = await About.create({
            gender,
            interest,
            age,
            userId: id,
        });

        res.status(201).json({ about });
    } catch (err) {
        next(err);
    }
};

exports.updateAbout = async (req, res, next) => {
    try {
        const { caption, age, interest, birthDate } = req.body;
        const { id } = req.params;

        const [affectedRow] = await About.update(
            {
                caption,
                age,
                birthDate,
                interest,
            },
            {
                where: {
                    userId: req.user.id,
                },
            }
        );
        if (affectedRow === 0) {
            res.status(400).json({ message: 'cannot update about' });
        }

        const about = await About.findOne({
            where: { userId: id },
        });
        res.status(200).json({ about });
    } catch (err) {
        next(err);
    }
};

exports.updateLocation = async (req, res, next) => {
    try {
        const { latitude, longitude } = req.body;
        const { id } = req.params;

        const [affectedRow] = await About.update(
            {
                latitude: latitude,
                longitude: longitude,
            },
            {
                where: {
                    userId: req.user.id,
                },
            }
        );

        const about = await About.findOne({
            where: { userId: id },
        });
        res.status(200).json({ about });
    } catch (err) {
        next(err);
    }
};

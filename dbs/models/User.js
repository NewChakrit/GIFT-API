module.exports = (sequelize, Datatypes) => {
    const User = sequelize.define(
        'User',
        {
            firstName: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            lastName: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            username: {
                type: Datatypes.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: Datatypes.STRING,
                allowNull: false,
                unique: true,
                validate: {
                    isEmail: true,
                },
            },
            password: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            profileUrl: {
                type: Datatypes.STRING,
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
        },
        {
            underscored: true,
        }
    );

    User.associate = (models) => {
        User.hasOne(models.About, {
            foreignKey: {
                name: 'userId',
            },
        });

        User.hasMany(models.Post, {
            foreignKey: {
                name: 'userId',
            },
        });
        User.hasMany(models.Like, {
            foreignKey: {
                name: 'userId',
            },
        });
        User.hasMany(models.Message, {
            foreignKey: {
                name: 'userId',
            },
        });
    };

    return User;
};

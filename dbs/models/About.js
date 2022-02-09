module.exports = (sequelize, Datatypes) => {
    const About = sequelize.define(
        'About',
        {
            caption: {
                type: Datatypes.STRING,
            },
            age: {
                type: Datatypes.STRING,
            },
            gender: {
                type: Datatypes.ENUM('male', 'female', 'nonbinary'),
            },
            birthDate: {
                type: Datatypes.DATEONLY,
            },
            latitude: {
                type: Datatypes.STRING,
                defaultValue: '13.8327076',
            },
            longitude: {
                type: Datatypes.STRING,
                defaultValue: '100.501856',
            },
            interest: {
                type: Datatypes.TEXT,
            },
        },
        {
            underscored: true,
        }
    );

    About.associate = (models) => {
        About.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
            },
        });
    };

    return About;
};

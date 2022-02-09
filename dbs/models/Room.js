module.exports = (sequelize, Datatypes) => {
    const Room = sequelize.define(
        'Room',
        {
            members: {
                type: Datatypes.STRING,
            },
        },
        {
            tableName: 'rooms',
            underscored: true,
        }
    );

    Room.associate = (models) => {
        Room.hasMany(models.Message, {
            foreignKey: {
                name: 'roomId',
            },
        });
    };

    return Room;
};

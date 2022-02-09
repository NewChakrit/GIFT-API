module.exports = (sequelize, Datatypes) => {
    const Message = sequelize.define(
        'Message',
        {
            message: {
                type: Datatypes.STRING,
            },
        },
        {
            tableName: 'messages',
            underscored: true,
        }
    );

    Message.associate = (models) => {
        Message.belongsTo(models.Room, {
            foreignKey: {
                name: 'roomId',
            },
        });

        Message.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
            },
        });
    };

    return Message;
};

module.exports = (sequelize, Datatypes) => {
    const Like = sequelize.define(
        'Like',
        {},

        {
            underscored: true,
        }
    );

    Like.associate = (models) => {
        Like.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
            },
        });

        Like.belongsTo(models.Post, {
            foreignKey: {
                name: 'postId',
            },
        });
    };

    return Like;
};

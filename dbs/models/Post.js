module.exports = (sequelize, Datatypes) => {
    const Post = sequelize.define(
        'Post',
        {
            caption: {
                type: Datatypes.STRING,
            },
            pictureUrl: {
                type: Datatypes.STRING,
            },
        },
        {
            underscored: true,
        }
    );

    Post.associate = (models) => {
        Post.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
            },
        });

        Post.hasMany(models.Like, {
            foreignKey: {
                name: 'postId',
            },
        });
    };

    return Post;
};

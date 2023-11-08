import { DataTypes } from 'sequelize';

export const Post = (sequelize, Sequelize) => {
  const Post = sequelize.define("posts",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
      },
      content: {
        type: DataTypes.BLOB,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
      editedAt: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    }, {})

  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'author',
    });
    Post.hasMany(models.Comment, { foreignKey: 'postId', as: 'comments' })
  };

  return Post
};
export default Post;

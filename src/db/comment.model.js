import { DataTypes } from 'sequelize';

export const Comment = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comments",
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
    }, {}
  )

  return Comment
};
export default Comment;

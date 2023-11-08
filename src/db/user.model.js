import { DataTypes, Model } from 'sequelize';

const User = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
        },
        lastName: {
            type: DataTypes.STRING,
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
        },
        role: {
            type: DataTypes.ENUM(['ADMIN', 'USER']),
            defaultValue: 'USER',
        },
        password: {
            type: DataTypes.STRING,
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
        }
    }, {});

    User.associate = function (models) {
        User.belongsToMany(models.User, { through: 'Friends', foreignKey: 'userId', as: 'userFriends' });

        User.hasMany(models.Post, {
            foreignKey: 'userId',
            as: 'posts',
        });
        User.hasMany(models.Comment, { foreignKey: 'userId', as: 'comments' })
    };

    return User;
};

export default User;

// To create a One-To-One relationship, the hasOne and belongsTo associations are used together;
// To create a One-To-Many relationship, the hasMany and belongsTo associations are used together;
// To create a Many-To-Many relationship, two belongsToMany calls are used together

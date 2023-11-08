import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

import User from './user.model.js';
import Post from './post.model.js';
import Comment from './comment.model.js';

dotenv.config();

let db = {};

const sequelize = new Sequelize({
    dialect: 'mysql',
    host: process.env.DB_HOST,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        timestamps: false,
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

(await db).User = User(sequelize, Sequelize);
(await db).Comment = Comment(sequelize, Sequelize);
(await db).Post = Post(sequelize, Sequelize);

(await db).User.associate(db);
(await db).Post.associate(db);

export { db };
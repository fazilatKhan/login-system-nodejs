// const { DataTypes, Sequelize } = require('sequelize');
// const sequelize = require('../config/database');
// const bcrypt = require('bcrypt');
// const User = sequelize.define('User', {
//     id: {
//         type: DataTypes.UUID,
//         primaryKey: true,
//         defaultValue: DataTypes.UUIDV4,
//     },
//     // email: {
//     //     type: DataTypes.STRING,
//     //     allowNull: false,
//     //     unique: true
//     // },
//     // phone: {
//     //     type: DataTypes.STRING
//     //     // You can add additional validations as needed
//     // },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     }
// }, {
//     hooks: {
//         // Before creating or updating a user, hash the password
//         beforeCreate: async (user) => {
//             const hashedPassword = await bcrypt.hash(user.password, 10);
//             user.password = hashedPassword;
//         },
//         beforeUpdate: async (user) => {
//             if (user.changed('password')) {
//                 const hashedPassword = await bcrypt.hash(user.password, 10);
//                 user.password = hashedPassword;
//             }
//         }
//     }
// });

// module.exports = User;


//new

const { DataTypes, Sequelize } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = User;

'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');


module.exports = (sequelize, DataTypes) => {
  class User extends Model {};
  User.init({
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Insert a value for "name"'
        },
        notEmpty: {
          msg: 'First Name cannot be empty'
        },
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Insert a value for "lastName"'
        },
        notEmpty: {
          msg: 'Last Name cannot be empty'
        },
      }
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'This email already exists'
      },
      validate: {
        notNull: {
          msg: 'Insert a value for "email"'
        },
        isEmail: {
          msg: 'Provide a valid email address'
        }
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Insert a value for "password"'
        },
        notEmpty: {
          msg: 'Password cannot be empty'
        }
      }
    }, 
    confirmPassword: {
      type: DataTypes.VIRTUAL,
      allowNull: false,
      set(val) {
        if (val === this.password && this.password !== '') {
          const hashedPassword = bcrypt.hashSync(val, 10);
          this.setDataValue('password', hashedPassword);
          this.setDataValue('confirmPassword', 'hi');
        } else if (this.password === '' && val === '' || val === '') {
          this.setDataValue('confirmPassword', '');
        } 
      }, 
      validate: {
        notNull: {
          msg: 'Both passwords must match'
        },
        notEmpty: {
          msg: 'Password confirmation cannot be empty'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User'
  });

  User.associate = (models) => {
    User.hasMany(models.Course, {
      foreignKey: 'userId',
      as: 'Student',
    });
  };

  return User;
};
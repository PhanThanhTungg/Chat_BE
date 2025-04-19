import { Sequelize, DataTypes } from "sequelize";
import sequelize from "../config/connect";
import bcrypt from "bcrypt";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    unique: true,
  },
  fullName: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  avatar: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
  },
  isOnline: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  lastActive: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
  }
}, {
  tableName: "users",
  timestamps: false
});

User.beforeCreate((user)=>{
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(user["password"], salt);
  user["password"] = hashedPassword;
})

export default User;
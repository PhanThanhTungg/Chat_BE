import { DataTypes } from "sequelize";
import sequelize from "../config/connect";

const Friend = sequelize.define("Friend", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  friendId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'User',
      key: 'id'
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'accepted', 'block'),
    allowNull: false
  },
  createAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  acceptedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: "friends",
  timestamps: false
});

export default Friend;
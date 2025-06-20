import { DataTypes } from "sequelize";
import sequelize from "../config/connect";

const MessageStatus = sequelize.define("MessageStatus", {
  messageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'messages',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  isRead: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  readedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: "message_status",
  timestamps: false
});

export default MessageStatus;
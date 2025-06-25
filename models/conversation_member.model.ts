import { DataTypes } from "sequelize";
import sequelize from "../config/connect";

const ConversationMember = sequelize.define("ConversationMember", {
  conversationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {
      model: 'conversations',
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
  joinedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  role: {
    type: DataTypes.ENUM('admin', 'subadmin', 'member'),
    allowNull: true
  }
}, {
  tableName: "conversation_members",
  timestamps: false
});

export default ConversationMember;
import { DataTypes } from "sequelize";
import sequelize from "../config/connect";

const Conversation = sequelize.define("Conversation", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  isGroup: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: "conversations",
  timestamps: false
});

export default Conversation;
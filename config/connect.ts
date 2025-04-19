import { Sequelize } from "sequelize";

export const connectMysql = async():Promise<void>=>{
  const sequelize = new Sequelize('chat', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
  });
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
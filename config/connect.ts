import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DTB_NAME, process.env.DTB_USER, process.env.DTB_PASSWORD, {
  host: process.env.DTB_HOST,
  dialect: 'mysql'
});

(async ()=>{
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

export default sequelize


//modules imports
const Sequelize = require("sequelize");

//Global variables

let sequelize = null;

exports.connectToMySQL = async(env) => {
    try{
        sequelize = new Sequelize(
         env.DB_NAME,
         env.DB_USERNAME,
         env.DB_PASSWORD,
          {
            host: env.DB_HOST,
            dialect: 'mysql'
          }
        );
        await sequelize.authenticate();
        console.log("connected to mysql");
        return sequelize;
    }catch($ex){
        console.log("Error while connecting to Database");
    }
}

exports.geSequelizeObject = () => {
  return sequelize;
}
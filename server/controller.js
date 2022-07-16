
const {CONNECTION_STRING} = process.env;
const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
    dialect:"postgres", 
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});

module.exports = {
    addEntry : (req,res) =>{
let {ro,
    date,
    tech,
    inletWaterTemp,
    inletWaterFlow,
    inletWaterPressure,
    outletWaterPressure,
    outletConcentrateFlow} = req.body;
sequelize.query(`INSERT INTO entries (ro, date, tech, inlet_water_temp, inlet_water_flow, inlet_water_pressure, outlet_water_pressure,) VALUES ('${ro}', '${date}', '${tech}', '${inletWaterTemp}', '${inletWaterFlow}', '${inletWaterPressure}', '${outletWaterPressure}', '${outletConcentrateFlow}')`)
  .then(() =>
  res.status(200))
.catch(err =>console.log(err))
    }
};
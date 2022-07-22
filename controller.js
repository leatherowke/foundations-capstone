
const {CONNECTION_STRING} = process.env;
const { strictEqual } = require("assert");
const { send } = require("process");
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
sequelize.query(`INSERT INTO entries (ro, date, tech, inlet_water_temp, inlet_water_flow, inlet_water_pressure, outlet_water_pressure,  outlet_concentrate_flow) VALUES ('${ro}', '${date}', '${tech}', '${inletWaterTemp}', '${inletWaterFlow}', '${inletWaterPressure}', '${outletWaterPressure}', '${outletConcentrateFlow}')`)
  .then(() =>
  res.sendStatus(200))
.catch(err =>console.log(err))
    },
    getEntries : (req, res) =>{
        
        let {searchDate} = req.body;
        // searchDate = new Date(searchDate);
        console.log(req.body)
sequelize.query(`SELECT entries.ro, entries.date, entries.tech, entries.inlet_water_temp, entries.inlet_water_flow, entries.inlet_water_pressure, entries.outlet_water_pressure,  entries.outlet_concentrate_flow, entries.id FROM entries WHERE date = CAST ('${searchDate}' AS DATE)`)
.then((dbRes) =>{
    console.log(dbRes)
    res.status(200).send(dbRes[0]);
    console.log('delete successful')
}) 
.catch((err) =>{
    console.log(err)
})   
},

deleteEntry : (req,res) => {
    let {id} = req.params
    console.log(id)
    sequelize.query(`DELETE FROM entries WHERE id=${id}`)
    .then((dbRes) =>
        res.status(200).send(dbRes[0])
    )
    .catch(err => console.log(err, 'failed to delete'))
}
}
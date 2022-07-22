







console.log('linked successfully')



const form = document.querySelector('form');
const ro = document.querySelector('#ro');
const date = document.querySelector('#date');
const tech = document.querySelector('#tech');
const inletWaterTemp = document.querySelector('#inlet-temp');
const inletWaterFlow = document.querySelector('#inlet-flow');
const inletWaterPressure = document.querySelector('#inlet-psi');
const outletWaterPressure = document.querySelector('#outlet-psi');
const outletConcentrateFlow = document.querySelector('#outlet-flow');
const searchDate = document.querySelector('#search-date');
const searchBtn = document.querySelector('#search');
const dataInfo = document.querySelector('#entries-info');




form.addEventListener('submit',(e) =>{
e.preventDefault()
let body = {
        ro: ro.value,
        date: date.value,
        tech: tech.value,
        inletWaterTemp: inletWaterTemp.value,
        inletWaterFlow: inletWaterFlow.value,
        inletWaterPressure: inletWaterPressure.value,
        outletWaterPressure: outletWaterPressure.value,
        outletConcentrateFlow: outletConcentrateFlow.value,
    };
//  console.log(body)

 axios.post('/entry',body)
.then(()=>{
    // console.log('entry added')
    alert('entry added')
    window.location.reload();

})
 .catch((err) =>{console.log(err)})
})

searchBtn.addEventListener('click', () =>{
    let body = {searchDate: searchDate.value};
    // console.log(body)
    axios.post(`/entries`,body)
    .then(res =>{
        res.data.forEach(elem =>{
            const entriesData = document.createElement('div')
            entriesData.className = 'entries-data'
            entriesData.id = `${elem.id}`
            entriesData.innerHTML = (`
            <h2> ro: ${elem.ro}</h2>
            <h4> date: ${elem.date}
            <h4> tech: ${elem.tech}
            <h4> inlet water temp. : ${elem.inlet_water_temp}
            <h4> inlet water flow: ${elem.inlet_water_flow}
            <h4> inlet water pressure: ${elem.inlet_water_pressure}
            <h4> outlet water pressure: ${elem.outlet_water_pressure}
            <h4> outlet concentrate flow: ${elem.outlet_concentrate_flow}
            <button onclick="deleteEntry(${elem['id']})">delete</button>
            </div>
            `)
            dataInfo.appendChild(entriesData)
        })
        // document.createElement
        console.log(res.data)
    })
    .catch((err) =>{
        console.log(err)
    })

})

function deleteEntry(id){
    console.log('delete button pushed')
    axios.delete(`/entries/${id}`)
    .then(() => {
        alert('entry deleted')
        window.location.reload();
    })
    .catch((err) => console.log(err))
}
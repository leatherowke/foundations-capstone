const addEntry = () => {
    axios.post('http://localhost:4000/entry')
    .then(res => {
        const data = res.data;
        alert('entry submitted')
    })
}
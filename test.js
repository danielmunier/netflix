const axios = require("axios")


const response = axios.get("http://localhost:3000/api/current").then((res) => {
    console.log(res)
})


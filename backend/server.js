const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./config/database')

//consfig
dotenv.config({path:"backend/config/config.env"})

connectDB()

app.listen(process.env.PORT , ()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})
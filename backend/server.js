const app = require('./app')
const dotenv = require('dotenv')
const connectDB = require('./config/database')

//huandlling uncaught exception
process.on("uncaughtException", err=>{
    console.log(`Error: ${err.message}`)
    console.log("shutting down server due to uncaught rejection")
        process.exit(1)
})


//config
dotenv.config({path:"backend/config/.env"})

connectDB()

const server = app.listen(process.env.PORT , ()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`)
})  

//unhandled promise rejection
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log("shutting down server due to unhandled rejection")
    server.close(()=>{
        process.exit(1)
    })
})
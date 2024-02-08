const app = require('./app')
const connectDB = require('./data/database')

app.listen(process.env.PORT, () => {
    connectDB()
    console.log(`server is working on PORT:${process.env.PORT} in ${process.env.NODE_ENV} mode`)
    console.log(new Date())
})
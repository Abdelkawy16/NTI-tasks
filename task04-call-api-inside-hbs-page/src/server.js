const express = require('express')
const path = require('path')
const hbs = require('hbs');
const https = require('https');

const app = express()
const port = 3000

// files directory
const partialFiles = path.join(__dirname, '../design/layouts')
const staticFilesDir = path.join(__dirname, '../public')
const viewsFiles = path.join(__dirname, '../design/views')
const apiUrl = 'https://jsonplaceholder.typicode.com/comments?_limit=10'

// request data
let data
const req = https.request(apiUrl, (res) => {
    let result = ""
    res.on('data', (dataPart) => {
        result += dataPart.toString()
    })
    res.on('end', () => {
        data = JSON.parse(result)
    })
})
req.on('error', (err) => {
    console.log(err)
})
req.end()

// App configrations
app.use(express.static(staticFilesDir))
app.set('view engine', 'hbs')
app.set('views', viewsFiles)
hbs.registerPartials(partialFiles)

// routes
app.get('/', (req, res) => {
    res.render('home',{name: 'Mustafa'})
})
app.get('/comments', (req, res) => {
    res.render('comments', { data })
})
app.get('/about', (req, res) => {
    res.render('about')
})
app.get('*', (req, res)=>{
    res.render('error404')
})

//run to server
app.listen(port, () => console.log(`Server listening on port ${port}!`))
const path = require('path')
const express = require('express')
const hbs = require('hbs')

// routes
const userRoute = require('../routes/userRoutes')

const app = express()

// app configration
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../frontend/views'))
app.use(express.static(path.join(__dirname, '../public')))
app.use(express.urlencoded({extended:true}))
hbs.registerPartials(path.join(__dirname, '../frontend/layouts'))

// use routes
app.use(userRoute)

module.exports = app
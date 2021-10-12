const express = require('express')
const hbs = require('hbs')
const path = require('path')
const taskRoutes = require('../router/task.routes')

const app = express()

// app configration 
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, '../public')))
app.set("views", path.join(__dirname, "../frontend/views"))

hbs.registerPartials(path.join(__dirname, "../frontend/layouts"))

app.use(express.urlencoded({ extended: true }))

app.use(taskRoutes)

module.exports = app
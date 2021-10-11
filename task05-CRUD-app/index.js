const app = require('./src/app')
require('dotenv').config()

const port = process.env.PORT || 5000

app.get('*', (req, res)=>{
    res.render('error')
})

app.listen(port, ()=> console.log(`Server listening on port:${port}`))
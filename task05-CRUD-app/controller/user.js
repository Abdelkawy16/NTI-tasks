const fs = require('fs')
//read from file
readData = () => {
    let data
    try {
        data = JSON.parse(fs.readFileSync('model/users.json'))
        if (!Array.isArray(data)) throw new Error('data not an array')
    }
    catch (e) {
        data = []
        console.log(e.message)
    }
    return data
}
//write to file
writeData = (allUsers) => {
    try {
        fs.writeFileSync('model/users.json', JSON.stringify(allUsers))
        console.log(`data added inside file!`)
    }
    catch (e) {
        console.log(`error in write to file ${e}`)
    }
}

class userController {
    static home(req, res) {
        res.redirect('/all')
    }
    static showAll(req, res) {
        let users = readData()
        let data = {
            users,
            title: 'all users',
            userStatus: users.length > 0 ? true : false
        }
        res.render('all', data)
    }
    static showSingle(req, res) {
        let data = {
            title: 'Single user',
            user: false
        }
        let users = readData()
        let id = req.params.id
        let user = users.find(item => item.id == id)
        if (user) {
            data.user = user
        }
        res.render('single', data)
    }
    static edit(req, res) {
        let data = {
            title: 'edit',
            user: false
        }
        let id = req.params.id
        let users = readData()
        let user = users.find(item => item.id == id)
        if (user) {
            data.user = user
        }
        res.render('edit', data)
    }
    static del(req, res) {
        let users = readData()
        let id = req.params.id
        let userIndex = users.findIndex(item => item.id == id)
        if (userIndex != -1) {
            users.splice(userIndex, 1)
            writeData(users)
            res.send('deleted successfully!<br> return <a href="/">home page</a>')
        } else {
            res.send('No user to delete!<br> return <a href="/">home page</a>')
        }
    }
    static addPost(req, res) {
        let data = { title: "Add new user" }
        res.render('addPost', data)
    }
    static sendData(req, res) {
        let user = { id: Date.now(), name: req.body.userName, age: req.body.age }
        if (user.name) {
            let allUsers = readData()
            allUsers.push(user)
            writeData(allUsers)
            res.redirect('/all')
        } else {
            res.render('addPost', {
                title: 'add new user'
            })
        }
    }
    static add(req, res) {
        if (req.query.userName) {
            let user = { id: Date.now(), name: req.query.userName, age: req.query.age }
            let allUsers = readData()
            allUsers.push(user)
            writeData(allUsers)
            res.redirect('/all')
        }
        else {
            res.render('add', {
                title: 'add'
            })
        }
    }
    static save(req, res) {
        let user = { id: req.params.id, name: req.body.userName, age: req.body.age }
        if (user.name) {
            let users = readData()
            let userInd = users.findIndex(item => item.id == user.id)
            users[userInd] = user
            writeData(users)
            res.redirect('/all')
        } else {
            res.redirect(`edit/${user.id}`)
        }
    }
}

module.exports = userController
const db = require('../dbConnection/dbConnection')
const { ObjectId } = require('mongodb')

class Task {
    static showAll(req, res) {
        db((err, dbCilent) => {
            if (err) res.send('database error')
            dbCilent.collection('task').find().toArray((e, allTasks) => {
                if (e) res.send("fe error")
                res.render('all', {
                    allTasks,
                    taskStatus: allTasks.length == 0 ? false : true
                })
            })
        })
    }
    static addTask(req, res) {
        db((err, dbCilent)=>{
            if(err) res.send('database error')
            dbCilent.collection('taskTypes').find().toArray((e, allTypes)=>{
                if(e) res.send("fe error")
                res.render('add', {
                    allTypes
                })
            })
        })
    }
    static sendData(req, res) {
        db((err, dbCilent) => {
            if (err) res.send('database error')
            // res.send(req.body)
            dbCilent.collection('task').insertOne(req.body)
                .then(() => res.redirect('/all'))
                .catch(() => res.send('error'))
        })
    }
    static delete(req, res) {
        try {
            let id = new ObjectId(req.params.id)
            db((err, dbCilent)=>{
                if(err) res.send('database error')
                dbCilent.collection('task').deleteOne({_id: id}, (err, data)=>{
                    if(err) return res.send('error404')
                    res.redirect('/all')
                })
            })
        } catch (error) {
            res.send('error404')
        }
    }
    static addTasktype(req, res){
        res.render('addType')
    }
    static sendTypeData(req, res){
        db((err, dbCilent) => {
            if (err) res.send('database error')
            dbCilent.collection('taskTypes').insertOne(req.body)
                .then(() => res.redirect('/add'))
                .catch(() => res.send('error'))
        })
    }
    static showSingle(req, res){
        try {
            let id = new ObjectId(req.params.id)
            db((err, dbCilent)=>{
                if(err) res.send('database error')
                dbCilent.collection('task').findOne({_id: id}, (err, data)=>{
                    if(err) return res.send('error404')
                    res.render('single',{task: data})
                })
            })
        } catch (error) {
            res.send('error404')
        }
    }
    static editTask = (req,res)=>{
        try {
            let id= new ObjectId(req.params.id)
            db((err, dbCilent)=>{
                if(err) res.send('database error')
                dbCilent.collection('task').findOne({_id:id}, (err, task)=>{
                    dbCilent.collection('taskTypes').find().toArray((e, allTypes)=>{
                        if(e) res.send("fe error")
                        res.render('edit', {task, allTypes})
                    })
                })
            })
        } catch (error) {
            res.render('errorPage')
        }
    }
    static sendUpdates = (req, res)=>{
        let id= new ObjectId(req.params.id)
        let newData = req.body
        db((err, dbCilent)=>{
            if(err) res.send('database error')
            dbCilent.collection("task").updateOne(
                {_id: id},
                {$set: {taskName: newData.taskName, taskType: newData.taskType}}
            )
            .then(res.redirect('/'))
            .catch(e=>{ res.send('error in edit')})
        })
    }
}

module.exports = Task
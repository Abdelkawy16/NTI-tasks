// fs, yargs, validator
const yargs = require('yargs')
var uniqid = require('uniqid'); 

const student = require('./modules/student')
yargs.command({
    command: "getAllStudents",
    handler: function(){
        console.log(student.getAll())
    }
})

yargs.command({
    command:"addStudent",
    builder:{
        id:{
            type:"number",
            default: uniqid()
        },
        name:{
            type:"string",
            demandOption:true
        },
        age:{
            type: "number",
            demandOption:true
        },
        grade:{
            type:"number",
            default:0
        },
        email:{
            type:"string",
            demandOption:true
        } 
    },
    handler:function(argv){
        let st = {
            id: argv.id,
            name: argv.name,
            age:argv.age,
            grade:argv.grade,
            email:argv.email
        }
        student.addStudent(st)
    }
})

yargs.command({
    command: 'getStudent',
    builder: {
        id:{
            demandOption:true
        }
    },
    handler(argv){
        console.log(student.getStudent(argv.id));
    }
})
yargs.command({
    command: 'delStudent',
    builder: {
        id:{
            demandOption:true
        }
    },
    handler(argv){
        student.delStudent(argv.id);
    }
})

yargs.command({
    command:"editStudent",
    builder:{
        id:{
            demandOption:true
        },
        name:{
            type:"string"
        },
        age:{
            type: "number"
        },
        grade:{
            type:"number",
            default:0
        },
        email:{
            type:"string"
        } 
    },
    handler(argv){
        student.editStudent(argv)
    }
})

yargs.argv
const fs = require('fs')
const validator = require('validator')
// require('../c')
// read all data
const readData = () => {
    let data
    try {
        data = JSON.parse(fs.readFileSync('data.json'))
        if (!Array.isArray(data)) throw new Error()
    }
    catch (e) {
        data = []
    }
    return data
}
//write data
const writeData = (allStudents) => {
    fs.writeFileSync('data.json', JSON.stringify(allStudents))
}

class Student {
    static getAll() {
        return readData()
    }
    static addStudent(studentData) {
        // console.log(studentData)
        
        let all = readData()
        all.push(studentData)
        writeData(all)
    }
    static getStudent(id) {
        let student = readData().filter(st => st.id == id)[0]
        if (!student) return 'Not found 404!'
        return student
    }
    static delStudent(id) {
        let all = readData()
        let students = all.filter(st => st.id != id)
        if (students.length === all.length) {
            return console.log('Not found 404!')
        }
        console.log('Deleted!');
        writeData(students)
    }
    //task
    static editStudent(newData) {
        let all = readData()
        all.forEach(st => {
            if (st.id == newData.id) {
                if (!validator.isEmail(newData.email)) return console.log('invalid email')
                st.name = newData.name || st.name
                st.age = newData.age || st.age
                st.grade = newData.grade || st.grade
                st.email = newData.email || st.email
            }
        })
        writeData(all)
    }
}

module.exports = Student
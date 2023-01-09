import express, { Request, Response } from 'express'
import cors from 'cors'
import { courses, students } from './database'
import { TCourse, TStudents } from './types'

const app = express()

app.use(express.json())
app.use(cors())

app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003")
})

app.get('/ping', (req: Request, res: Response) => {
    res.send('Pong!')
})


//Requisicao Get sem Query

app.get(`/courses`,(req: Request, res: Response) => {
    res.status(200).send(courses)
})

//Requisicao Get com Query

app.get(`/courses/search`,(req: Request, res:Response)=>{
    const q = req.query.q as string

    const coursesFilter = courses.filter(
        (course)=> course.name.toLowerCase().includes(q.toLowerCase())
    )
    res.status(200).send(coursesFilter)
})

app.post(`/courses`,(req:Request, res:Response)=>{
    const id = req.body.id
    const name = req.body.name
    const lessons = req.body.lessons
    const stack = req.body.stacl

    const newCourse: TCourse ={
        id,
        name,
        lessons,
        stack
    }

    courses.push(newCourse)

    res.status(201).send("Curso criado com sucesso.")
})


// Fixacao

app.get(`/students`,(req: Request, res: Response) => {
    res.status(200).send(students)
})

app.get(`/students/search`,(req: Request, res:Response)=>{
    const q = req.query.q as string

    const studentsFilter = students.filter(
        (student)=> student.name.toLowerCase().includes(q.toLowerCase())
    )
    res.status(200).send(studentsFilter)
})

app.post(`/students`,(req:Request, res:Response)=>{
    const id = req.body.id
    const name = req.body.name
    const age = req.body.age

    const newStudent: TStudents ={
        id,
        name,
        age,
    }

    students.push(newStudent)

    res.status(201).send("Estudante criado com sucesso.")
})
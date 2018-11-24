const Student = require('../db/models/student')
const router = require('express').Router();

router.get('/', async(req, res, next) => {
    const allStudents = await Student.findAll()
    res.send(allStudents)
})

router.get('/:id', async(req, res, next) => {
    const id = req.params.id
    const oneStudent = await Student.findById(id)
    oneStudent ? 
        res.send(oneStudent) : 
        res.status(404).send('404 Not Found')
})

router.post('/', async (req, res, next) => {
    Student.create(req.body);
    res.status(201);
    res.send(req.body)
})

router.put('/:id', async (req, res, next) => {
    const id = req.params.id;
    const [numAffectedRows, student] = await Student.update(req.body,{
        where: {id},
        returning: true,
        plain: true
    });
    res.send(student)
})

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    await Student.destroy({where: {id}})
    res.status(204);
    res.send();
})


module.exports = router;

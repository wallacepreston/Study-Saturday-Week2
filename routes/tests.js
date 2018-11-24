const Test = require('../db/models/test');
const router = require('express').Router();

router.get('/', async (req, res, next) => {
    const allTests = await Test.findAll();
    res.send(allTests);
})

router.get('/:id', async (req, res, next) => {
    const instance = await Test.findById(req.params.id);
    res.send(instance)
})

router.post('/student/:studentId', async (req, res, next) => {
    let testToAdd = req.body;
    testToAdd.studentId = req.params.studentId;
    const newTest = await Test.create(testToAdd)
    res.status(201)
    res.send(newTest)
})


router.delete('/:id', async (req, res, next) => {
    const numAffectedRows = await Test.destroy({
        where: {
            id: req.params.id
        }
    })
    res.status(204)
    res.send(await Test.findById(req.params.id))
})
module.exports = router;

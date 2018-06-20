const express = require('express');
const router = express.Router();
const models = require('../models');
const moment = require('moment');

router.get('/', (req, res) => {
    res.send('index route');
});

/* GET pets listing. */
router.get('/pets', (async (req, res) => {
    try {
        const pets = models.Pet.findAll()
        res.json(pets);
    } catch (error) {
        res.send(error.message);
    }

}));

router.get('/pets/:id', ((req, res) => {
    models.Pet.findOne({
        where: {
            id: req.params.id
        }
    })
    .then(pet => {
        const { id, updatedAt } = pet;
        const dailyDifference = (moment().diff(updatedAt, 'minutes') / 1440);
        const hungerDifference = (moment().diff(updatedAt, 'minutes') / 720);
        const poop = pet.poop + (dailyDifference * 100);
        const hunger = pet.hunger + (hungerDifference * 100);
        const hygiene = pet.hygiene + (dailyDifference * 100);
        const newValues = {
            poop,
            hunger,
            hygiene,
        };
        models.Pet.update(newValues, { where : { id }, returning: true})
        .then(updatedPet => {
            res.json(...updatedPet[1])
        })
        .catch(error => res.send(error.message));
    })
    .catch(error => {
        res.send(error.message)
    });
}));

/* CREATE a pet */
router.post('/pets', async (req, res) => {
    try {
        const pet = await models.Pet.create({
            name: req.body.name,
            hygiene: 0,
            poop: 0,
            hunger: 0,
            createdAt: Date.now(),
            updatedAt: Date.now()
        })
        res.json(pet);
    } catch (error) {
        res.send(error.message);
    }
})

/* UPDATE a pet */
router.patch('/pets/:id', async (req, res) => {
    try {
        const pet = await models.Pet.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true,
        });
        res.json(...pet[1]);
    } catch (error) {
        console.log(error.message)
        res.send(error.message);
    }
})

module.exports = router;

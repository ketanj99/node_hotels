const express = require('express');
const router = express.Router();
const Person = require('./../models/Parson');

// POST route to add a person
router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the person data

        // Create a new Person Document using the Mongoose model
        const newPerson = new Person(data);

        // Save the new person 
        const response = await newPerson.save();
        console.log('Data saved');
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to fetch all persons
router.get('/', async (req, res) => {
    try {
        const data = await Person.find();
        console.log('Data fetched');
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET route to fetch persons by work type
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;  // Extract the work type from the URL parameter
        if (workType === 'chef' || workType === 'manager' || workType === 'waiter') {
            const response = await Person.find({ work: workType });
            console.log('Data fetched');
            res.status(200).json(response); // Send the fetched data as the response
        } else {
            res.status(404).json({ error: 'Invalid work type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract The id from the url parameter
        const updatedPersonData = req.body; // Updated data for the person

        const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
            new: true, // return the updated ducument
            runValidators: true, // run Mongoose validation
        })

        if(!response) {
            return res.status(404).json({error:'person not found'});   // id not found sof error responce 
        }

        console.log('data updated');
        res.status(200).json(response);
        }
            
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
} )

router.delete('/:id', async (req, res) => {
    try {
        const personId = req.params.id; // Extract The id from the url parameter

        // Assuming you have a person model
        const response = await Person.findByIdAndDelete(personId);

        if(!response) {
            return res.status(404).json({error:'person not found'});   // id not found sof error responce 
        }
        console.log('data Daleted');
        res.status(200).json({massage:'Parson Daleted Successfully'});

    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})


module.exports = router;

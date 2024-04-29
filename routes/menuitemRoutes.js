const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

  
  //POST route to add a MenuItem
  router.post('/',async(req,res) =>{
      try{
      const data = req.body // Assuming the requiest body contains the menu data
  
      // Create a new menu Document using the Mongoose model
      const newMenu = new MenuItem(data);
  
      // Save the new menu 
      const response = await newMenu.save();
      console.log('data saved');
      res.status(200).json(response);
  }
  
  catch(err){
      console.log(err);
      res.status(500).json({error: 'internal server Error'});   
  }     
  });
  
  router.get('/',async(req, res) => {
      try {
          const data = await MenuItem.find();
          console.log('data fateched');
          res.status(200).json(data);
      }
      catch(err){
          console.log(err);
          res.status(500).json({error: 'internal server Error'});   
      }
  });

  // GET route to fetch manuitem by taste type
  router.get('/:tastetype', async (req, res) => {
    try {
        const tastetype = req.params.tastetype;  // Extract the taste type from the URL parameter
        if (tastetype === 'sweet' || tastetype === 'khata' || tastetype === 'spicy' ) {
            const response = await MenuItem.find({ taste: tastetype });
            console.log('Data fetched');
            res.status(200).json(response); // Send the fetched data as the response
        } else {
            res.status(404).json({ error: 'Invalid taste type' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

 // manu item update methed
 router.put('/:id', async  (req, res) => {
    try{
        const menuItemID = req.params.id; // Extract The id from the url parameter
        updatedManuItemData = req.body;

        const response = await MenuItem.findByIdAndUpdate(menuItemID, updatedManuItemData, {
            new: true, // return the updated ducument
            runValidators: true // run Mongoose validation
        });
        if(!response) {
            return res.status(404).json({error:'manuItem not found'});   // id not found sof error responce 
        }
        console.log('data updated');
        res.status(200).json(response);
        
    }catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }

 })

 router.delete('/:id', async (req, res) => {
    try {
        const menuItemID = req.params.id; // Extract The id from the url parameter

        // Assuming you have a person model
        const response = await MenuItem.findByIdAndDelete(menuItemID);

        if(!response) {
            return res.status(404).json({error:'menuitem not found'});   // id not found sof error responce 
        }
        console.log('data Daleted');
        res.status(200).json({massage:'Menu Item Daleted Successfully'});

    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
})


  
module.exports = router; 

// comment added for testing purpuses
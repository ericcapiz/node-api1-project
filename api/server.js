// BUILD YOUR SERVER HERE
const express = require('express');
const server = express();
const User = require('./users/model');


server.use(express.json());

//GET METHODS

        //  /api/users

        server.get('/api/users', async(req,res)=>{
            try {
                const users = await User.find();
                res.json(users);
            } catch (err) {
                res.status(500).json({error: err})
            }
            res.status(200).json(users)
        })

        //  /api/users/:id

        server.get('/api/users/:id', async (req,res)=>{
            const {id} = req.params;
            try {
                const user = await User.findById(id);
                res.json(user)
            } catch (err) {
                res.status(500).json({error: err})
            }
        });

//POST METHODS

        //  /api/users
        server.post('/api/users', async(req,res)=>{
            const user = req.body;
            if(!user.name || !user.bio){
                res.status(400).json({message: 'name and bio required'})
            }else{
                try {
                    const newUser = await User.insert(user);
                    res.status(200).json(newUser);
                } catch (err) {
                    res.status(500).json({error: err})
                }
            }
        })

//PUT METHODS

        //  /api/users/:id 
        server.put('/api/users/:id', async (req,res)=>{
            const {id} = req.params;
            const user = req.body;

            try {
                const updateUser = await User.update(id,user);
                if(updateUser){
                    res.json(updateUser)
                }else{
                    res.status(404).json({message:"bad id"})
                }
            } catch (err) {
                res.status(500).json({error:err})
            }
        })  

//DELETE METHODS

        //  /api/users/:id
        server.delete('/api/users/:id', async(req,res)=>{
            const {id} = req.params;
            try {
                const user = await User.remove(id)
                if(user){
                    res.json(user)
                }else{
                    res.status(404).json({message:'bad id'})
                }
            } catch (err) {
                res.status(500).json({error:err})
            }
        })

module.exports = server; // EXPORT YOUR SERVER instead of {}

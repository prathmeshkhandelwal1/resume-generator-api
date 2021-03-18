const express = require('express')
const router =  new express.Router()

const Details = require('../models/Details')


router.post('/details', (req,res)=>{
    const details = new Details(req.body)
    details.save().then(()=>{
        res.send(details)
    }).catch(err=>{
        res.status(400).send(err)
    })
})

router.get('/details', async (req,res)=> {
    try{
        const details = await Details.find({})
        res.send(details)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router
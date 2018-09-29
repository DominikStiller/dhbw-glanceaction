const express = require('express');
var db = require('../database').db;
var util = require('util');

const router = express.Router();

// Categories
router.get('/categories', function(req, res){
    var categories = db.collection('Categories');
    categories.find().toArray(function (error, list) {
        res.json(list);
    });
});

router.post('/categories', function(req, res){
    util.log(util.format('/api/categories/ - POST - Request: %j', req.body));

    var categories = db.collection('Categories');
    categories.insert(req.body, function (error, result) {
        res.send('Successfully added');
    });
});

router.put('/categories/:name', function(req, res){
    res.send({type:'PUT'});
});

router.delete('/categories/:name', function(req, res){
    res.send({type:'DELETE'});
});

module.exports = router;
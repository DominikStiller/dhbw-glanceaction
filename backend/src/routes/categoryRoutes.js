const express = require('express');
const db = require('../database').db;
const util = require('util');
const { check, validationResult } = require('express-validator/check');
const categories = db.collection('Categories');
const transactions = db.collection('Transactions');

const router = express.Router();

function removeIdFromCategory(category) {
    let listCategory = category;
    delete listCategory._id;
    return listCategory;
}

// REST Endpoints //

router.get('/categories', function(req, res) {
    categories.find().toArray(function (error, list) {
        list.forEach(function (category, index, catArr) {
            catArr[index] = removeIdFromCategory(category);
        });
        res.json(list);
    });
});


router.post('/categories', [
        check('name')
            .not()
            .isEmpty()
            .withMessage('Name may not be empty')
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage('Name can only contain letters or numbers')
            .custom((value, {req}) => {
                return new Promise((resolve, reject) => {
                    let regex = new RegExp(["^", req.body.name, "$"].join(""), "i");
                    categories.findOne({name: regex}, function(err, category){
                        if(err) {
                            reject(new Error('Server Error'))
                        }
                        if(Boolean(category)) {
                            reject(new Error('This category name already exists'))
                        }
                        resolve(true)
                    });
                });
            }),
        check('color')
            .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
            .withMessage('Color must be a valid hexadecimal color starting with #')
    ], function (req, res) {

    util.log(util.format('/api/categories/ - POST - Request: %j', req.body));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: {name: "CategoryValidationError", message: errors.array()[0].msg} });
    }

    categories.insert(req.body, function (error, result) {
        categories.findOne(result, function (error, result) {
            res.status(201).send(removeIdFromCategory(result));
        });
    });
});


router.put('/categories/:name([a-zA-Z0-9]+)', [
        check('name')
            .not()
            .isEmpty()
            .withMessage('Name may not be empty')
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage('Name can only contain letters or numbers')
            .custom((value, {req}) => {
                return new Promise((resolve, reject) => {
                    let regex = new RegExp(["^", req.body.name, "$"].join(""), "i");
                    categories.findOne({name: regex}, function(err, category){
                        if(err) {
                            reject(new Error('Server Error'))
                        }
                        if(Boolean(category) && req.params.name !== req.body.name) {
                            reject(new Error('This category name already exists'))
                        }
                        resolve(true)
                    });
                });
            }),
        check('color')
            .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
            .withMessage('Color must be a valid hexadecimal color starting with #')
    ], function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: {name: "CategoryValidationError", message: errors.array()[0].msg} });
    }

    let newName = req.body.name;
    let newColor = req.body.color;
    let categoryName = new RegExp(["^", req.params.name, "$"].join(""), "i");

    categories.findOne({name:categoryName}, function(err, account){
        if(err) {
            return res.status(500).send();
        }
        if(!Boolean(account)) {
            return res.status(404).json({error: {name: "CategoryUndefinedError", message: "The category to be changed doesn't exist"}}); //Category doesnt exist
        } else {
            categories.update({name: categoryName}, {$set: {name: newName, color: newColor}}, function (err, account) {
                if (err) {
                    return res.status(500).send();
                }
                res.status(204).send("Success");
            });
        }
    });

});


router.delete('/categories/:name([a-zA-Z0-9]+)', function(req, res){
    let catName = new RegExp(["^", req.body.name, "$"].join(""), "i");

    categories.findOne({name:catName}, function(err, category){
        if(err) {
            return res.status(500).send();
        }
        if(!Boolean(category)) {
            return res.status(404).json({ error: {name: "CategoryUndefinedError", message: "The category to be deleted doesn't exist"}});
        } else {
            // Removing the category to be deleted from all transactions containing this category:
            transactions.update({category: catName}, {$set:{ category: ''}}, {multi: true}, function(err, resTransactions) {
                if (err) {
                    return res.status(500).send();
                }
                categories.findAndRemove({name:catName}, function(err, categoryDel){
                    if (err) {
                        return res.status(500).send();
                    }
                    res.status(204).send("Success");
                });
            });
        }
    });
});

module.exports = router;
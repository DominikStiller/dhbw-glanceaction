const express = require('express');
const db = require('../database').db;
const util = require('util');
const { check, validationResult } = require('express-validator/check');
const transactions = db.collection('Transactions');
const categories = db.collection('Categories');
const accounts = db.collection('Accounts');

const router = express.Router();

function changeIdOfTransaction(transaction) {
    let listTransaction = transaction;
    listTransaction.id = listTransaction._id;
    delete listTransaction._id;
    return listTransaction;
}

// REST Endpoints //

router.get('/transactions', function (req, res) {
    transactions.find().toArray(function (error, list) {
        list.forEach(function (transaction, index, traArr) {
            traArr[index] = changeIdOfTransaction(transaction);
        });
        res.json(list);
    });
});

router.post('/transactions', [
        check('amount')
            .not()
            .isEmpty()
            .withMessage('Amount may not be empty')
            .isFloat()
            .withMessage('Invalid amount'),
        check('category')
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage('Category name can only contain letters or numbers')
            .custom((value, {req}) => {
                return new Promise((resolve, reject) => {
                    let regex = new RegExp(["^", req.body.category, "$"].join(""), "i");
                    categories.findOne({name: regex}, function (err, category) {
                        if (err) {
                            reject(new Error('Server Error'))
                        }
                        if (!Boolean(category)) {
                            reject(new Error("Category doesn't exist"))
                        }
                        resolve(true)
                    });
                });
            }),
        check('account')
            .not()
            .isEmpty()
            .withMessage('Account may not be empty')
            .isInt()
            .withMessage('Invalid account ID')
            .custom((value, {req}) => {
                return new Promise((resolve, reject) => {
                    accounts.findOne({_id:req.body.account}, function(err, account){
                        if(err) {
                            reject(new Error('Server Error'))
                        }
                        if(!Boolean(account)) {
                            reject(new Error('Account does not exist'))
                        }
                        resolve(true)
                    });
                });
            }),
        check('timestamp')
            .not()
            .isEmpty()
            .withMessage('Timestamp may not be empty')
            .isISO8601()
            .withMessage('Timestamp must be in ISO 8601 format'),
        check('recurrence')
            .isInt({gt: -1})
            .withMessage('Recurrence must be a non negative integer')
    ], function (req, res) {
    util.log(util.format('/api/transactions/ - POST - Request: %j', req.body));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: {name: "TransactionVerificationError", message: errors.array()[0].msg} });
    }

    transactions.insert(req.body, function (error, result) {
        transactions.findOne(result, function (error, result) {
            res.status(201).send(changeIdOfTransaction(result));
        });
    });
});

router.put('/transactions/:id([0-9]+)', [
        check('amount')
            .not()
            .isEmpty()
            .withMessage('Amount may not be empty')
            .isFloat()
            .withMessage('Invalid amount'),
        check('category')
            .matches(/^[a-zA-Z0-9]+$/)
            .withMessage('Category name can only contain letters or numbers')
            .custom((value, {req}) => {
                return new Promise((resolve, reject) => {
                    let regex = new RegExp(["^", req.body.category, "$"].join(""), "i");
                    categories.findOne({name: regex}, function (err, category) {
                        if (err) {
                            reject(new Error('Server Error'))
                        }
                        if (!Boolean(category)) {
                            reject(new Error("Category doesn't exist"))
                        }
                        resolve(true)
                    });
                });
            }),
        check('account')
            .not()
            .isEmpty()
            .withMessage('Account may not be empty')
            .isInt()
            .withMessage('Invalid account ID')
            .custom((value, {req}) => {
                return new Promise((resolve, reject) => {
                    accounts.findOne({_id:req.body.account}, function(err, account){
                        if(err) {
                            reject(new Error('Server Error'))
                        }
                        if(!Boolean(account)) {
                            reject(new Error('Account does not exist'))
                        }
                        resolve(true)
                    });
                });
            }),
        check('timestamp')
            .not()
            .isEmpty()
            .withMessage('Timestamp may not be empty')
            .isISO8601()
            .withMessage('Timestamp must be in ISO 8601 format'),
        check('recurrence')
            .isInt({gt: -1})
            .withMessage('Recurrence must be a non negative integer')
    ], function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: {name: "TransactionVerificationError", message: errors.array()[0].msg} });
    }

    let newAmount = req.body.amount;
    let newCategory = req.body.category;
    let newAccount = req.body.account;
    let newTime = req.body.timestamp;
    let newRecurrence = req.body.recurrence;
    let transactionId = req.params.id;

    transactions.findOne({_id:transactionId}, function(err, transaction){
        if(err) {
            return res.status(500).send();
        }
        if(!Boolean(transaction)) {
            return res.status(404).json({ error: {name: "TransactionUndefinedError", message: "The transaction to be changed doesn't exist"}});
        } else {
            transactions.update({_id:transactionId}, {$set: {amount: newAmount, category: newCategory, account: newAccount, timestamp: newTime, recurrence: newRecurrence}}, function (err, transact) {
                if (err) {
                    return res.status(500).send();
                }
                res.status(204).send("Success");
            });
        }
    });

});

router.delete('/transactions/:id([0-9]+)', function(req, res){
    let transactionId = req.params.id;

    transactions.findOne({_id:transactionId}, function(err, transaction){
        if(err) {
            return res.status(500).send();
        }
        if(!Boolean(transaction)) {
            return res.status(404).json({ error: {name: "TransactionUndefinedError", message: "The transaction to be deleted doesn't exist"}});
        } else {
            transactions.remove({_id: transactionId}, function(err, transactionDel) {
                if (err) {
                    return res.status(500).send();
                }
                res.status(204).send("Success");
            });
        }
    });
});

module.exports = router;
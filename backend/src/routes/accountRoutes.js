const express = require('express');
const util = require('util');
const { check, validationResult } = require('express-validator/check');
const { db } = require('../database');

const accounts = db.collection('Accounts');
const transactions = db.collection('Transactions');

const router = express.Router();

function changeIdOfAccount(account) {
  const listAccount = account;
  listAccount.id = listAccount._id;
  delete listAccount._id;
  return listAccount;
}

function handleInitialBalance(newAccount) {
  const listAccount = newAccount;
  listAccount.balance = listAccount.initialBalance;
  delete listAccount.initialBalance;
  return listAccount;
}

// REST Endpoints //

router.get('/accounts', function(req, res){
    accounts.find().toArray(function (error, list) {
        list.forEach(function (account, index, accArr) {
            accArr[index] = changeIdOfAccount(account);
        });
        res.json(list);
    });
});

router.post('/accounts', [
        check('name')
            .not()
            .isEmpty()
            .withMessage('Name may not be empty')
            .matches(/^[a-zA-Z].*/)
            .withMessage('Name must start with a letter'),
        check('initialBalance')
            .not()
            .isEmpty()
            .withMessage('Initial balance may not be empty')
            .isFloat()
            .withMessage('Invalid initial balance')
    ], function (req, res) {

    util.log(util.format('/api/accounts/ - POST - Request: %j', req.body));

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: {name: "AccountValidationError", message: errors.array()[0].msg} });
    }

    handleInitialBalance(req.body);
    accounts.insert(req.body, function (error, result) {
        accounts.findOne(result, function (error, updatedResult) {
            res.status(201).send(changeIdOfAccount(updatedResult));
        });
    });
});

// TODO return result from PUT request as well
router.put('/accounts/:id([0-9]+)', [
        check('name')
            .not()
            .isEmpty()
            .withMessage('Name may not be empty')
            .matches(/^[a-zA-Z].*/)
            .withMessage('Name must start with a letter'),
        check('initialBalance')
            .not()
            .isEmpty()
            .withMessage('Initial balance may not be empty')
            .isFloat()
            .withMessage('Invalid initial balance')
    ], function (req, res) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: {name: "AccountValidationError", message: errors.array()[0].msg} });
    }

    let newName = req.body.name;
    let newBalance = req.body.initialBalance;
    let accountId = req.params.id;

    accounts.findOne({_id:accountId}, function(err, account){
        if(err) {
            return res.status(500).send();
        }
        if(!Boolean(account)) {
            return res.status(404).json({ error: {name: "AccountUndefinedError", message: "The account to be changed doesn't exist"}});
        } else {
            accounts.update({_id: accountId}, {$set: {name: newName, balance: newBalance}}, function (err, account) {
                if (err) {
                    return res.status(500).send();
                }
                res.status(204).send("Success");
            });
        }
    });

});

router.delete('/accounts/:id([0-9]+)', function(req, res){
    let accountId = req.params.id;

    // Deleting an account also deleted all transactions associated with this account. User confirmation in frontend!
    accounts.findOne({_id:accountId}, function(err, account){
        if(err) {
            return res.status(500).send();
        }
        if(!Boolean(account)) {
            return res.status(404).json({ error: {name: "AccountUndefinedError", message: "The account to be deleted doesn't exist"}});
        } else {
            transactions.remove({account: accountId}, function(err, resTransactions) {
                if (err) {
                    return res.status(500).send();
                }
                accounts.findAndRemove({_id:accountId}, function(err, accountDel){
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
const express = require('express');
const util = require('util');
const { check, validationResult } = require('express-validator/check');
const { db } = require('../database');

const accounts = db.collection('Accounts');
const transactions = db.collection('Transactions');

const router = express.Router();

// Formatting Functions //

function changeIdOfAccount(account) {
  const listAccount = account;
  listAccount.id = listAccount._id;
  delete listAccount._id;
  return listAccount;
}

// REST Endpoints //

router.get('/accounts', (req, res) => {
  accounts.find().toArray((error, list) => {
    list.forEach((account, index, accArr) => {
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
    .withMessage('Invalid initial balance'),
], (req, res) => {
  util.log(util.format('/api/accounts/ - POST - Request: %j', req.body));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: { name: 'AccountValidationError', message: errors.array()[0].msg } });
  }
  accounts.insert(req.body, (error, result) => {
    accounts.findOne(result, (innerError, updatedResult) => {
      res.status(201).send(changeIdOfAccount(updatedResult));
    });
  });
});


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
    .withMessage('Invalid initial balance'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: { name: 'AccountValidationError', message: errors.array()[0].msg } });
  }

  const newName = req.body.name;
  const newBalance = req.body.initialBalance;
  const accountId = req.params.id;

  accounts.findOne({ _id: accountId }, (err, account) => {
    if (err) {
      return res.status(500).send();
    }
    if (!account) {
      return res.status(404).json({ error: { name: 'AccountUndefinedError', message: "The account to be changed doesn't exist" } });
    }
    accounts.update({ _id: accountId }, { $set: { name: newName, initialBalance: newBalance } }, (innerErr) => {
      if (innerErr) {
        return res.status(500).send();
      }
      accounts.findOne({ _id: accountId }, (nextErr, updatedResult) => {
        res.status(201).send(changeIdOfAccount(updatedResult));
      });
    });
  });
});

router.delete('/accounts/:id([0-9]+)', (req, res) => {
  const accountId = req.params.id;

  // Deleting an account also deleted all transactions associated with this account. User confirmation in frontend!
  accounts.findOne({ _id: accountId }, (err, account) => {
    if (err) {
      return res.status(500).send();
    }
    if (!account) {
      return res.status(404).json({ error: { name: 'AccountUndefinedError', message: "The account to be deleted doesn't exist" } });
    }
    transactions.remove({ account: accountId }, (innerErr) => {
      if (innerErr) {
        return res.status(500).send();
      }
      accounts.findAndRemove({ _id: accountId }, (nextErr) => {
        if (nextErr) {
          return res.status(500).send();
        }
        res.status(204).send('Success');
      });
    });
  });
});

module.exports = router;

const express = require('express');
const util = require('util');
const { check, validationResult } = require('express-validator/check');
const { db } = require('../database');

const transactions = db.collection('Transactions');
const categories = db.collection('Categories');
const accounts = db.collection('Accounts');

const router = express.Router();

// Formatting Functions //

function changeIdOfTransaction(transaction) {
  const listTransaction = transaction;
  listTransaction.id = listTransaction._id;
  delete listTransaction._id;
  return listTransaction;
}

// REST Endpoints //

router.get('/transactions', (req, res) => {
  transactions.find().toArray((error, list) => {
    list.forEach((transaction, index, traArr) => {
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
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        const regex = new RegExp(['^', req.body.category, '$'].join(''), 'i');
        categories.findOne({ name: regex }, (err, category) => {
          if (err) {
            reject(new Error('Server Error'));
          }
          if (!category) {
            reject(new Error("Category doesn't exist"));
          }
          resolve(true);
        });
      });
    }),
  check('account')
    .not()
    .isEmpty()
    .withMessage('Account may not be empty')
    .isInt()
    .withMessage('Invalid account ID')
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        accounts.findOne({ _id: req.body.account }, (err, account) => {
          if (err) {
            reject(new Error('Server Error'));
          }
          if (!account) {
            reject(new Error('Account does not exist'));
          }
          resolve(true);
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
    .matches(/^(([1-9][0-9]*|0)|m)( )([1-9][0-9]*|0)$/)
    .withMessage('Invalid recurrence value'),
], (req, res) => {
  util.log(util.format('/api/transactions/ - POST - Request: %j', req.body));

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: { name: 'TransactionVerificationError', message: errors.array()[0].msg } });
  }

  transactions.insert(req.body, (error, result) => {
    transactions.findOne(result, (innerError, updatedResult) => {
      res.status(201).send(changeIdOfTransaction(updatedResult));
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
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        const regex = new RegExp(['^', req.body.category, '$'].join(''), 'i');
        categories.findOne({ name: regex }, (err, category) => {
          if (err) {
            reject(new Error('Server Error'));
          }
          if (!category) {
            reject(new Error("Category doesn't exist"));
          }
          resolve(true);
        });
      });
    }),
  check('account')
    .not()
    .isEmpty()
    .withMessage('Account may not be empty')
    .isInt()
    .withMessage('Invalid account ID')
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        accounts.findOne({ _id: req.body.account }, (err, account) => {
          if (err) {
            reject(new Error('Server Error'));
          }
          if (!account) {
            reject(new Error('Account does not exist'));
          }
          resolve(true);
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
    .matches(/^(([1-9][0-9]*|0)|m)( )([1-9][0-9]*|0)$/)
    .withMessage('Invalid recurrence value'),
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: { name: 'TransactionVerificationError', message: errors.array()[0].msg } });
  }

  const newAmount = req.body.amount;
  const newCategory = req.body.category;
  const newAccount = req.body.account;
  const newTime = req.body.timestamp;
  const newRecurrence = req.body.recurrence;
  const newNotes = req.body.notes;
  const transactionId = req.params.id;

  transactions.findOne({ _id: transactionId }, (err, transaction) => {
    if (err) {
      return res.status(500).send();
    }
    if (!transaction) {
      return res.status(404).json({ error: { name: 'TransactionUndefinedError', message: 'The transaction to be changed doesn\'t exist' } });
    }
    transactions.update({ _id: transactionId }, { $set: {
      amount: newAmount,
      category: newCategory,
      account: newAccount,
      timestamp: newTime,
      recurrence: newRecurrence,
      notes: newNotes,
    },
    }, (error) => {
      if (error) {
        return res.status(500).send();
      }
      transactions.findOne({ _id: transactionId }, (nextErr, updatedResult) => {
        res.status(201).send(changeIdOfTransaction(updatedResult));
      });
    });
  });
});


router.delete('/transactions/:id([0-9]+)', (req, res) => {
  const transactionId = req.params.id;

  transactions.findOne({ _id: transactionId }, (err, transaction) => {
    if (err) {
      return res.status(500).send();
    }
    if (!transaction) {
      return res.status(404).json({ error: { name: 'TransactionUndefinedError', message: 'The transaction to be deleted doesn\'t exist'}});
    }
    transactions.remove({ _id: transactionId }, (innerErr) => {
      if (innerErr) {
        return res.status(500).send();
      }
      res.status(204).send('Success');
    });
  });
});

module.exports = router;

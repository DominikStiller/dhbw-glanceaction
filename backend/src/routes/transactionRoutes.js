/* eslint-disable no-param-reassign,arrow-body-style */
const express = require('express');
const util = require('util');
const { check, validationResult } = require('express-validator/check');
const { db } = require('../database');
const { changeIdOfObject } = require('../services/responseFormatting');

const transactions = db.collection('Transactions');
const categories = db.collection('Categories');
const accounts = db.collection('Accounts');
const transactionKeys = ['name', 'amount', 'category', 'account', 'timestamp', 'notes', 'recurrence'];

const router = express.Router();

// REST Endpoints //

router.get('/transactions', (req, res) => {
  util.log(util.format('/api/transactions/ - GET-Request'));
  transactions.find().toArray((error, list) => {
    list.forEach((transaction, index, traArr) => {
      traArr[index] = changeIdOfObject(transaction);
    });
    res.json(list);
  });
});


router.post('/transactions', [
  check('amount')
    .not()
    .isEmpty()
    .withMessage('Amount may not be empty')
    .customSanitizer((value) => {
      return value.replace(/,/g, '.');
    })
    .toFloat()
    .isFloat()
    .withMessage('Invalid amount')
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        if (parseFloat(req.body.amount) === 0) {
          reject(new Error('Amount must not be 0'));
        } else {
          resolve(true);
        }
      });
    }),
  check('category')
    .toInt()
    .isInt()
    .withMessage('Category ID must be a number')
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        if (req.body.category === 0) {
          resolve(true);
        } else {
          const categoryId = parseInt(req.body.category, 10);
          categories.findOne({ _id: categoryId }, (err, category) => {
            if (err) {
              reject(new Error('Server Error'));
            }
            if (!category) {
              reject(new Error("The category to be assigned doesn't exist"));
            }
            resolve(true);
          });
        }
      });
    }),
  check('account')
    .not()
    .isEmpty()
    .withMessage('Account may not be empty')
    .toInt()
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
    .trim()
    .not()
    .isEmpty()
    .withMessage('Timestamp may not be empty')
    .isISO8601()
    .withMessage('Timestamp must be in ISO 8601 format'),
  check('recurrence')
    .trim()
    .matches(/^(([1-9][0-9]*|0)|m)( )([1-9][0-9]*|0)$/)
    .withMessage('Invalid recurrence value'),
], (req, res) => {
  util.log(util.format('/api/transactions/ - POST-Request: %j', req.body));

  const keys = Object.keys(req.body);
  for (let i = 0; i < keys.length; i += 1) {
    if (transactionKeys.indexOf(keys[i]) < 0) {
      return res.status(404).json({ error: { name: 'TransactionInvalidFieldError', message: 'The transaction may only contain the specified fields' } });
    }
  }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: { name: 'TransactionVerificationError', message: errors.array()[0].msg } });
  }

  transactions.insert(req.body, (error, result) => {
    transactions.findOne(result, (innerError, updatedResult) => {
      res.status(201).send(changeIdOfObject(updatedResult));
    });
  });
});


router.put('/transactions/:id([0-9]+)', [
  check('amount')
    .not()
    .isEmpty()
    .withMessage('Amount may not be empty')
    .customSanitizer((value) => {
      return value.replace(/,/g, '.');
    })
    .toFloat()
    .isFloat()
    .withMessage('Invalid amount')
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        if (parseFloat(req.body.amount) === 0) {
          reject(new Error('Amount must not be 0'));
        } else {
          resolve(true);
        }
      });
    }),
  check('category')
    .toInt()
    .isInt()
    .withMessage('Category ID must be a number')
    .custom((value, { req }) => {
      return new Promise((resolve, reject) => {
        if (req.body.category === 0) {
          resolve(true);
        } else {
          const categoryId = parseInt(req.body.category, 10);
          categories.findOne({ _id: categoryId }, (err, category) => {
            if (err) {
              reject(new Error('Server Error'));
            }
            if (!category) {
              reject(new Error("The category to be assigned doesn't exist"));
            }
            resolve(true);
          });
        }
      });
    }),
  check('account')
    .not()
    .isEmpty()
    .withMessage('Account may not be empty')
    .toInt()
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
    .trim()
    .not()
    .isEmpty()
    .withMessage('Timestamp may not be empty')
    .isISO8601()
    .withMessage('Timestamp must be in ISO 8601 format'),
  check('recurrence')
    .trim()
    .matches(/^(([1-9][0-9]*|0)|m)( )([1-9][0-9]*|0)$/)
    .withMessage('Invalid recurrence value'),
], (req, res) => {
  util.log(util.format('/api/transactions/%i - PUT-Request: %j', req.params.id, req.body));

  const keys = Object.keys(req.body);
  for (let i = 0; i < keys.length; i += 1) {
    if (transactionKeys.indexOf(keys[i]) < 0) {
      return res.status(404).json({ error: { name: 'TransactionInvalidFieldError', message: 'The transaction may only contain the specified fields' } });
    }
  }

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
    transactions.update({ _id: transactionId }, {
      $set: {
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
        return res.status(201).send(changeIdOfObject(updatedResult));
      });
    });
  });
});


router.delete('/transactions/:id([0-9]+)', (req, res) => {
  util.log(util.format('/api/transactions/%i - DELETE-Request', req.params.id));

  const transactionId = req.params.id;

  transactions.findOne({ _id: transactionId }, (err, transaction) => {
    if (err) {
      return res.status(500).send();
    }
    if (!transaction) {
      return res.status(404).json({ error: { name: 'TransactionUndefinedError', message: 'The transaction to be deleted doesn\'t exist' } });
    }
    transactions.remove({ _id: transactionId }, (innerErr) => {
      if (innerErr) {
        return res.status(500).send();
      }
      return res.status(204).send('Success');
    });
  });
});

module.exports = router;

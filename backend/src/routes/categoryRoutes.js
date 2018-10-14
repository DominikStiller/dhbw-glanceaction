/* eslint-disable no-param-reassign,arrow-body-style */
const express = require('express');
const util = require('util');
const { check, validationResult } = require('express-validator/check');
const { db } = require('../database');
const { changeIdOfObject } = require('../services/responseFormatting');

const categories = db.collection('Categories');
const transactions = db.collection('Transactions');
const categoryKeys = ['name', 'color'];

const router = express.Router();

// REST Endpoints //

router.get('/categories', (req, res) => {
  util.log(util.format('/api/categories/ - GET-Request'));
  categories.find().toArray((error, list) => {
    list.forEach((category, index, catArr) => {
      // For sending the JSON data in the response, the _id field is converted to id in each category object
      catArr[index] = changeIdOfObject(category);
    });
    res.json(list);
  });
});


router.post('/categories', [
  // Verification of the input data as follows:
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name may not be empty')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('Name can only contain letters, spaces or numbers'),
  check('color')
    .trim()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Color must be a valid hexadecimal color starting with #'),
], (req, res) => {
  util.log(util.format('/api/categories/ - POST-Request: %j', req.body));

  const keys = Object.keys(req.body);

  // Checking if there are no additional fields apart from the ones specified for the category model:
  for (let i = 0; i < keys.length; i += 1) {
    if (categoryKeys.indexOf(keys[i]) < 0) {
      return res.status(404).json({ error: { name: 'CategoryInvalidFieldError', message: 'The category may only contain the specified fields' } });
    }
  }

  // Checking for an error in the validation above:
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: { name: 'CategoryValidationError', message: errors.array()[0].msg } });
  }

  // After the verification, insert the new category object after setting the id field to _id:
  categories.insert(req.body, (error, result) => {
    categories.findOne(result, (innerError, updatedResult) => {
      res.status(201).send(changeIdOfObject(updatedResult));
    });
  });
});


router.put('/categories/:id([0-9]+)', [
  // Verification of the input data as follows:
  check('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('Name may not be empty')
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage('Name can only contain letters, spaces or numbers'),
  check('color')
    .trim()
    .matches(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
    .withMessage('Color must be a valid hexadecimal color starting with #'),
], (req, res) => {
  util.log(util.format('/api/categories/%i - PUT-Request: %j', req.params.id, req.body));

  // Checking if there are no additional fields apart from the ones specified for the category model:
  const keys = Object.keys(req.body);
  for (let i = 0; i < keys.length; i += 1) {
    if (categoryKeys.indexOf(keys[i]) < 0) {
      return res.status(404).json({ error: { name: 'CategoryInvalidFieldError', message: 'The category may only contain the specified fields' } });
    }
  }

  // Checking for an error in the validation above:
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: { name: 'CategoryValidationError', message: errors.array()[0].msg } });
  }

  const newName = req.body.name;
  const newColor = req.body.color;
  const categoryId = req.params.id;

  // After the verification, update the new category object after setting the id field to _id:
  categories.findOne({ _id: categoryId }, (err, category) => {
    if (err) {
      return res.status(500).send();
    }
    // Make sure the category to be changed exists:
    if (!category) {
      return res.status(404).json({ error: { name: 'CategoryUndefinedError', message: 'The category to be changed doesn\'t exist' } });
    }
    categories.update({ _id: categoryId }, { $set: { name: newName, color: newColor } }, (innerError) => {
      if (innerError) {
        return res.status(500).send();
      }
      categories.findOne({ _id: categoryId }, (nextErr, updatedResult) => {
        res.status(201).send(changeIdOfObject(updatedResult));
      });
    });
  });
});


router.delete('/categories/:id([0-9]+)', (req, res) => {
  util.log(util.format('/api/categories/%i - DELETE-Request', req.params.id));
  const categoryId = req.params.id;

  // Search for the category to be deleted and delete it if it was found:
  categories.findOne({ _id: categoryId }, (err, category) => {
    if (err) {
      return res.status(500).send();
    }
    if (!category) {
      return res.status(404).json({ error: { name: 'CategoryUndefinedError', message: 'The category to be deleted doesn\'t exist' } });
    }
    // Removing the category to be deleted from all transactions containing this category:
    transactions.update({ category: categoryId }, { $set: { category: null } }, { multi: true }, (midErr) => {
      if (midErr) {
        return res.status(500).send();
      }
      categories.findAndRemove({ _id: categoryId }, (innerErr) => {
        if (innerErr) {
          return res.status(500).send();
        }
        res.status(204).send('Success');
      });
    });
  });
});

module.exports = router;

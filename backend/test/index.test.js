/* eslint-disable arrow-body-style */
const assert = require('assert');
const request = require('supertest');
const { expect } = require('chai');
const { db } = require('../src/database');
const server = require('../src/index');

const transactions = db.collection('Transactions');
const categories = db.collection('Categories');
const accounts = db.collection('Accounts');

describe('Route Handlers and Data Validation', () => {
  let aValidAccountId;
  before(function() {
    accounts.insert({ name: '72vdasd91fhar473', initialBalance: 0.00 }, (error, newAccount) => {
      accounts.findOne({ name: '72vdasd91fhar473' }, (error, account) => {
        aValidAccountId = account._id;
      });
    });
  });
  after(function() {
    accounts.findAndRemove({ _id: aValidAccountId }, () => {
      console.log(aValidAccountId);
    });
  });
  after(function() {
    server.close();
  });
  describe('Categories POST Request', () => {
    describe('With valid data', () => {
      it('should return 201', () => {
        return request(server)
          .post('/api/categories')
          .send({ name: '72vdasd91fhar473', color: '#59ffa7' })
          .then(function(response) {
            assert.equal(response.status, 201);
          });
      });
      after(function() {
        categories.findAndRemove({ name: '72vdasd91fhar473' }, () => {
          //
        });
      });
    });
    describe('With invalid data', () => {
      it('should return 400', () => {
        return request(server)
          .post('/api/categories')
          .send({ name: '72vdasd91fhar473', color: '#ff' })
          .then(function(response) {
            assert.equal(response.status, 400);
          });
      });
    });
  });
  describe('Transactions POST Request', () => {
    describe('With valid data', () => {
      it('should return 201', () => {
        return request(server)
          .post('/api/transactions')
          .send({
            name: '72vdasd91fhar473', amount: 2.33, category: 0, recurrence: '0 0', account: aValidAccountId, timestamp: '2018-01-01', notes: 'Some notes.',
          })
          .then(function(response) {
            assert.equal(response.status, 201);
          });
      });
      after(function() {
        transactions.findAndRemove({ name: '72vdasd91fhar473' }, () => {
          //
        });
      });
    });
    describe('With invalid amount', () => {
      it('should return 400', () => {
        return request(server)
          .post('/api/transactions')
          .send({
            name: '72vdasd91fhar473', amount: 0.00, category: 0, recurrence: 'm 1', account: aValidAccountId, timestamp: '2018-01-01', notes: 'Some notes.',
          })
          .then(function(response) {
            assert.equal(response.status, 400);
          });
      });
    });
    describe('With invalid category', () => {
      it('should return 400', () => {
        return request(server)
          .post('/api/transactions')
          .send({
            name: '72vdasd91fhar473', amount: 1.00, category: -12, recurrence: 'm 1', account: aValidAccountId, timestamp: '2018-01-01', notes: 'Some notes.',
          })
          .then(function(response) {
            assert.equal(response.status, 400);
          });
      });
    });
    describe('With invalid recurrence', () => {
      it('should return 400', () => {
        return request(server)
          .post('/api/transactions')
          .send({
            name: '72vdasd91fhar473', amount: 1.00, category: 0, recurrence: 'm 01', account: aValidAccountId, timestamp: '2018-01-01', notes: 'Some notes.',
          })
          .then(function(response) {
            assert.equal(response.status, 400);
          });
      });
    });
    describe('With invalid account', () => {
      it('should return 400', () => {
        return request(server)
          .post('/api/transactions')
          .send({
            name: '72vdasd91fhar473', amount: 0.00, category: 0, recurrence: 'm 1', account: -12, timestamp: '2018-01-01', notes: 'Some notes.',
          })
          .then(function(response) {
            assert.equal(response.status, 400);
          });
      });
    });
    describe('With invalid timestamp', () => {
      it('should return 400', () => {
        return request(server)
          .post('/api/transactions')
          .send({
            name: '72vdasd91fhar473', amount: 0.00, category: 0, recurrence: 'm 1', account: aValidAccountId, timestamp: '2018.01.01', notes: 'Some notes.',
          })
          .then(function(response) {
            assert.equal(response.status, 400);
          });
      });
    });
  });
  describe('Accounts POST Request', () => {
    describe('With valid data', () => {
      it('should return 201', () => {
        return request(server)
          .post('/api/accounts')
          .send({ name: 'a72vdasd91fhar473', initialBalance: 0.00 })
          .then(function(response) {
            assert.equal(response.status, 201);
          });
      });
      after(function() {
        accounts.findAndRemove({ name: 'a72vdasd91fhar473' }, () => {
          //
        });
      });
    });
    describe('With invalid name', () => {
      it('should return 400', () => {
        return request(server)
          .post('/api/accounts')
          .send({ name: '4332', initialBalance: 'abc' })
          .then(function(response) {
            assert.equal(response.status, 400);
          });
      });
    });
    describe('With invalid initial balance', () => {
      it('should return 400', () => {
        return request(server)
          .post('/api/accounts')
          .send({ name: 'a72vdasd91fhar473', initialBalance: 'abc' })
          .then(function(response) {
            assert.equal(response.status, 400);
          });
      });
    });
  });
});

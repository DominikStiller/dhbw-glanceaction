/* eslint-disable arrow-body-style,no-undef */
const assert = require('assert');
const request = require('supertest');
const { db } = require('../src/database');
const server = require('../src/index');
const { changeIdOfObject } = require('../src/services/responseFormatting');

const transactions = db.collection('Transactions');
const categories = db.collection('Categories');
const accounts = db.collection('Accounts');

describe('Route Handlers and Data Validation', () => {
  let aValidAccountId;
  before(() => {
    accounts.insert({ name: '72vdasd91fhar473', initialBalance: 0.00 }, () => {
      accounts.findOne({ name: '72vdasd91fhar473' }, (innerError, account) => {
        aValidAccountId = account._id;
      });
    });
  });
  after(() => {
    accounts.findAndRemove({ _id: aValidAccountId }, () => {
      //
    });
  });
  after(() => {
    server.close();
  });
  describe('Categories POST Request', () => {
    describe('With valid data', () => {
      it('should return 201', () => {
        return request(server)
          .post('/api/categories')
          .send({ name: '72vdasd91fhar473', color: '#59ffa7' })
          .then((response) => {
            assert.equal(response.status, 201);
          });
      });
      after(() => {
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
          .then((response) => {
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
          .then((response) => {
            assert.equal(response.status, 201);
          });
      });
      after(() => {
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
          .then((response) => {
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
          .then((response) => {
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
          .then((response) => {
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
          .then((response) => {
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
          .then((response) => {
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
          .then((response) => {
            assert.equal(response.status, 201);
          });
      });
      after(() => {
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
          .then((response) => {
            assert.equal(response.status, 400);
          });
      });
    });
    describe('With invalid initial balance', () => {
      it('should return 400', () => {
        return request(server)
          .post('/api/accounts')
          .send({ name: 'a72vdasd91fhar473', initialBalance: 'abc' })
          .then((response) => {
            assert.equal(response.status, 400);
          });
      });
    });
  });
});
describe('JSON formatting functions', () => {
  describe('Change ID of category', () => {
    it('should return the correct JSON object', () => {
      const changedCategory = JSON.stringify(changeIdOfObject({ name: 'a72vdasd91fhar473', color: '#fff', _id: 42 }));
      const expectedCategory = JSON.stringify({ name: 'a72vdasd91fhar473', color: '#fff', id: 42 });
      assert.equal(changedCategory, expectedCategory);
    });
  });
});

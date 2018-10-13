import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTransactions() {
    return element(by.tagName('app-transaction-list'))
      .all(by.css('.transaction'));
  }

  getCreateTransactionButton() {
    return element(by.tagName('nav'))
      .all(by.tagName('div'))
      .last()
      .all(by.tagName('button'))
      .last();
  }

  getEndingBalance() {
    return element(by.css('#ending-balance')).getText();
  }

  getAmountInput() {
    return element(by.css('#input-amount'));
  }

  getNotesInput() {
    return element(by.css('#input-notes'));
  }

  getCreateSaveTransactionButton() {
    return element(by.tagName('app-create-edit-transaction'))
      .element(by.buttonText('Create'));
  }

  getDeleteTransactionButton() {
    return element(by.tagName('app-create-edit-transaction'))
      .element(by.partialButtonText('Delete'));
  }

  getTransactionsCreatedByProtractor() {
    return element.all(by.cssContainingText('app-transaction-list .transaction', 'Created by Protractor'));
  }
}

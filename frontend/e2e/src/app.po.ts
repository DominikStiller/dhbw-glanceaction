import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTransactions() {
    return element(by.tagName('app-transaction-list')).all(by.css('.transaction'));
  }

  getCreateTransactionButton() {
    return element(by.tagName('nav'))
      .all(by.tagName('div'))
      .last()
      .all(by.tagName('button'))
      .last();
  }
}

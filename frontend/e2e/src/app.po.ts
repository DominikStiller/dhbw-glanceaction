import { browser, by, element, ElementFinder, $, $$ } from 'protractor';

export class AppPage {
  navigateToRoot() {
    return browser.get('/');
  }

  // TransactionListComponent
  getTransactions() {
    return element(by.tagName('app-transaction-list'))
      .$$('.transaction');
  }

  getTransactionsCreatedByProtractor(testId: string = null) {
    let text = 'Created by Protractor';
    if (testId !== null) {
      text += ` #${testId}`;
    }
    return element.all(by.cssContainingText('app-transaction-list .transaction', text));
  }

  getCreateTransactionButton() {
    return $('nav')
      .all(by.tagName('div'))
      .last()
      .all(by.tagName('button'))
      .last();
  }

  getEndingBalance() {
    return $('#ending-balance').getText();
  }

  search(term: string) {
    $('input[type=search]').sendKeys(term);
  }

  clearSearch() {
    $('#search-reset').click();
  }

  // CreateEditTransactionComponent
  getAmountInput() {
    return $('#input-amount');
  }

  getNotesInput() {
    return $('#input-notes');
  }

  getCreateSaveTransactionButton() {
    return element(by.tagName('app-create-edit-transaction'))
      .element(by.buttonText('Create'));
  }

  getDeleteTransactionButton() {
    return element(by.tagName('app-create-edit-transaction'))
      .element(by.partialButtonText('Delete'));
  }

  createTransaction(amount: number, notes: string) {
    this.getCreateTransactionButton().click();
    this.getAmountInput().sendKeys(amount);
    this.getNotesInput().sendKeys(notes);
    this.getCreateSaveTransactionButton().click();
  }

  deleteTransaction(transaction: ElementFinder) {
    transaction.click();
    this.getDeleteTransactionButton().click();
    browser.switchTo().alert().accept();
  }
}

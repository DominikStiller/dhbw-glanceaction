import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('GlanceAction', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateTo();
  });

  it('should display list of transactions', () => {
    expect(page.getTransactions().count()).toBeGreaterThan(0);
  });

  it('should show a higher ending balance when adding a positive transaction, deleting it afterwards', async () => {
    // Part 1: Test creation
    const balanceToFloat = balanceString => Number(balanceString
        .substring(1)
        .replace(',', ''));
    const amountToAdd = 2646.15;
    const initialBalance = balanceToFloat(await page.getEndingBalance());

    // Create transaction
    page.getCreateTransactionButton().click();
    page.getAmountInput().sendKeys(amountToAdd);
    page.getNotesInput().sendKeys('Created by Protractor');
    page.getCreateSaveTransactionButton().click();

    expect(balanceToFloat(await page.getEndingBalance())).toBeCloseTo(initialBalance + amountToAdd, 2);

    // Part 2: Test deletion
    const createdByProtractor = page.getTransactionsCreatedByProtractor();
    const count = await createdByProtractor.count();

    // Delete transaction
    createdByProtractor.first().click();
    page.getDeleteTransactionButton().click();

    expect(page.getTransactionsCreatedByProtractor().count()).toEqual(count - 1);
  });
});

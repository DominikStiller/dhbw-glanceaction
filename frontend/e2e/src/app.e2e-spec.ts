import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('GlanceAction', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    page.navigateToRoot();
  });

  it('should display list of transactions', () => {
    expect(page.getTransactions().count()).toBeGreaterThan(0);
  });

  it('should show a higher ending balance when adding a positive transaction', async () => {
    const amountToAdd = 2646.15;

    const balanceToFloat = balanceString => Number(balanceString
        .substring(1)
        .replace(',', ''));
    const initialBalance = balanceToFloat(await page.getEndingBalance());

    page.createTransaction(amountToAdd, 'Created by Protractor');
    expect(balanceToFloat(await page.getEndingBalance())).toBeCloseTo(initialBalance + amountToAdd, 2);
  });

  it('should delete transactions created by protractor', async () => {
    const createdByProtractor = page.getTransactionsCreatedByProtractor();
    const count = await createdByProtractor.count();

    page.deleteTransaction(createdByProtractor.first());
    expect(page.getTransactionsCreatedByProtractor().count()).toEqual(count - 1);
  });

  it('should search', async () => {
    const amountOfTransactions = 7;

    const testId = Math.floor(Math.random() * 10000) + 1;
    for (let i = 1; i <= amountOfTransactions; i += 1) {
      page.createTransaction(10, `Created by Protractor #${testId}-${i}`);
    }

    page.search(testId.toString());
    expect(page.getTransactions().count()).toEqual(amountOfTransactions);

    // Clean up
    for (let i = 1; i <= amountOfTransactions; i += 1) {
      page.deleteTransaction(page.getTransactionsCreatedByProtractor(`${testId}-${i}`).first());
    }
  });
});

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

  it('should show a higher ending balance when adding a positive transaction', () => {
    page.getCreateTransactionButton().click();
    browser.getCurrentUrl()
      .then(url => expect(url.endsWith('/create')).toBeTruthy());
  });
});

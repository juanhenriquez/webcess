import { WebcessPage } from './app.po';

describe('webcess App', () => {
  let page: WebcessPage;

  beforeEach(() => {
    page = new WebcessPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

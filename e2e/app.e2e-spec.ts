import { Angular4GithubExplorerPage } from './app.po';

describe('angular4-github-explorer App', () => {
  let page: Angular4GithubExplorerPage;

  beforeEach(() => {
    page = new Angular4GithubExplorerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

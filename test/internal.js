import { Selector } from 'testcafe';

fixture('Load a static page')
  .page('../staticpage/page.htm');

test('static page test', async (t) => {
  const h1 = Selector('h1');

  await t
    .takeScreenshot()
    .expect(h1.withText('Example').exists).ok();
});

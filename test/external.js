import { Selector } from 'testcafe';

fixture('Load a external page')
  .page('https://devexpress.github.io/testcafe/');

test('testcafe page test', async (t) => {
  const h1 = Selector('title');

  await t
    .takeScreenshot()
    .expect(h1.textContent).eql("A node.js tool to automate end-to-end web testing | TestCafe");
});

import { test, expect, Locator } from "@playwright/test";

/*
The web page works by randomly choosing if the Gallery links renders.
When it does render the below test will use it as the locator.
When it doesn't render it will fall back to Portfolio link.
This is all made possible by Promise.race() - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race
*/

test("Click one one of the elements in the array", async ({ page }) => {
  await page.goto("https://the-internet.herokuapp.com/disappearing_elements");

  const waitForLocator = (locator: Locator): Promise<Locator> => {
    return locator.waitFor().then(() => locator);
  };

  let returnedLocator = await Promise.race([
    waitForLocator(page.getByRole("link", { name: "Gallery" })),
    waitForLocator(page.getByRole("link", { name: "Portfolio" })),
  ]);

  // console.log(await returnedLocator.innerText());
  await returnedLocator.click();

  // console.log(page.url());
  expect(page).toHaveURL(/.*gallery|.*portfolio/);
});

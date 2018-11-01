const { Builder, By, Key, until } = require('selenium-webdriver')
require('selenium-webdriver/chrome')
require('chromedriver')

const site = "http://localhost:3000/#";
const browser = new Builder().forBrowser('chrome').build()

browser.get(site)

jest.setTimeout(500000)

it('should have title Welcome to All Paws On Deck', async () => {
    return browser.getTitle().then((title) => {
        expect(title).toEqual('Welcome to All Paws On Deck')
    });
})
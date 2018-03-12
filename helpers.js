// Load dependecies
const { By, until } = require('selenium-webdriver')
const { assert } = require('chai')

module.exports = {
  signupForm: function (driver, firstName, Lastname) {
    // Fill out signup form
    driver.findElement(By.id('name')).sendKeys(firstName)
    driver.findElement(By.id('last')).sendKeys(Lastname)
    driver.findElement(By.id('username')).sendKeys(`${firstName}.${Lastname}@test.com`)
    driver.findElement(By.id('company')).sendKeys('Drone-x')
    driver.findElement(By.id('phone')).sendKeys('415-810-4783')
    driver.findElement(By.css('.select-dropdown')).click()
    var dropDownOptionElm = driver.wait(until.elementLocated(By.css('[class=input-field]>div>ul>li:nth-of-type(9)')), 5000)
    driver.wait(until.elementIsVisible(dropDownOptionElm), 5000).click()
    driver.findElement(By.xpath('//label[@for="drone_service_provider"]')).click()
    driver.findElement(By.id('password')).sendKeys('test1234')
    driver.findElement(By.id('confirm_password')).sendKeys('test1234')
    driver.findElement(By.id('submit')).click()
  },

  signupFormSubmit: function (driver, firstName, Lastname) {
    // Fill out signup form
    this.signupForm(driver, firstName, Lastname)

    // Waits for Dashboard page to fully load
    driver.wait(() => {
      return driver.executeScript('return document.readyState').then((readyState) => {
        return readyState === 'complete'
      })
    })

    // Verify user is logged in
    var homeIconBtnElm = driver.wait(until.elementLocated(By.css('[class=home-icon-text]')), 15000)
    driver.wait(until.elementIsVisible(homeIconBtnElm), 15000).getText()
    .then((text) => {
      assert.equal(text, 'Dashboard')
    })

    // Find title and assert
    driver.executeScript('return document.title').then((res) => {
      assert.equal(res, 'DroneDeploy')
    })
  },

  loginForm: function(driver, email, password) {
    var loginFieldElm = driver.wait(until.elementLocated(By.id('sign-in-email')), 5000)
    driver.wait(until.elementIsVisible(loginFieldElm), 5000).sendKeys(email)
    driver.findElement(By.id('sign-in-password')).sendKeys(password)
    driver.findElement(By.id('sign-in-dd-button')).click()
  },

  login: function(driver, email, password) {
    // Fill out login form
    this.loginForm(driver, email, password)

    // Waits for Dashboard page to fully load
    driver.wait(() => {
      return driver.executeScript('return document.readyState').then((readyState) => {
        return readyState === 'complete'
      })
    })

    // Find title and assert
    driver.executeScript('return document.title').then((res) => {
      assert.equal(res, 'DroneDeploy')
    })

    // Verify user is logged in
    var homeIconBtnElm = driver.wait(until.elementLocated(By.css('[class=home-icon-text]')), 10000)
    driver.wait(until.elementIsVisible(homeIconBtnElm), 10000).getText()
    .then((text) => {
      assert.equal(text, 'Dashboard')
    })
  },

  logout: function(driver) {
    driver.findElement(By.css('[class="icon icon-settings"]')).click()
    var acctSettingsElm = driver.wait(until.elementLocated(By.id('section-title')), 5000)
    driver.wait(until.elementIsVisible(acctSettingsElm), 5000).getText()
    .then((text) => {
      assert.equal(text, 'Account Settings')
    })
    driver.findElement(By.css('[data-e2e-id=signOutBtn]>span')).click()
    driver.findElement(By.css('[class=title]')).getText()
    .then((text) => {
      assert.equal(text, 'Password')
    })
  }
}

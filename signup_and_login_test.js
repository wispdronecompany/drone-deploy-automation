// Load dependecies
const { assert } = require('chai')
const test = require('selenium-webdriver/testing')
const webdriver = require('selenium-webdriver')
const { Builder, By, until } = require('selenium-webdriver')
const Chance = require('chance')
const helper = require('./helpers.js')

// User Signup
test.describe('Signup and login', () => {
  test.it('Signup a new user', function () {
      // Set timeout to 10 seconds
      this.timeout(60000)

      // Get driver
      var driver = new webdriver.Builder().
      withCapabilities(webdriver.Capabilities.chrome()).
      build()

      // Instantiate Chance so it can be used
      var chance = new Chance()

      // Go to URL
      driver.get('https://www.dronedeploy.com')

      // Waits for page to fully load
      driver.wait(() => {
        return driver.executeScript('return document.readyState').then((readyState) => {
          return readyState === 'complete'
        })
      })

      // Find title and assert
      driver.executeScript('return document.title').then((res) => {
        assert.equal(res, 'Powerful Drone & UAV Mapping Software | DroneDeploy')
      })

      // Click on signup link
      driver.findElement(By.xpath('//a[@class="btn btn-secondary" and contains(text(), "Sign Up")]')).click()

      // Waits for page to fully load
      driver.wait(() => {
        return driver.executeScript('return document.readyState').then((readyState) => {
          return readyState === 'complete'
        })
      })

      // Find title and assert
      driver.executeScript('return document.title').then((res) => {
        assert.equal(res, 'Signup for DroneDeploy')
      })

      // Get random first and last name from Chance
      var randomFirstName = chance.first()
      var randomLastName = chance.last()

      // Fill out signup form and submit
      helper.signupFormSubmit(driver, randomFirstName, randomLastName)

      // Logout from Dashboard
      helper.logout(driver)

      // Input user and password and logs in
      helper.login(driver, `${randomFirstName}.${randomLastName}@test.com`, 'test1234')

      // Quit webdriver
      driver.quit()
  })
})

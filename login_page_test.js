// Load dependecies
const { assert } = require('chai')
const test = require('selenium-webdriver/testing')
const webdriver = require('selenium-webdriver')
const { Builder, By, until } = require('selenium-webdriver')
const loginHelper = require('./helpers.js')

// Login Tests
test.describe('DroneDeploy Login Page', () => {
    test.it('Enter invalid email error msg', function () {
        // Set timeout to 20 seconds
        this.timeout(20000)

        // Get driver
        var driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build()

        // Go to URL
        driver.get('https://www.dronedeploy.com/app2/auth/signin')

        // Waits for page to fully load
        driver.wait(() => {
          return driver.executeScript('return document.readyState').then((readyState) => {
            return readyState === 'complete'
          })
        })

        // Find title and assert
        driver.executeScript('return document.title').then((res) => {
          assert.equal(res, 'DroneDeploy')
        })


        // Input user and password and login
        loginHelper.loginForm(driver, 'pbtest', '12345678')

        // Assert error message
        var ep = driver.findElement(By.xpath('//div[contains(text(), "Please enter a valid email")]'))
        ep.getText().then((text) => {
           assert.equal(text, 'Please enter a valid email')
        })

        // Quit webdriver
        driver.quit()
    })
    test.it('Enter invalid credentials error msg', function () {
        // Set timeout to 20 seconds
        this.timeout(20000)

        // Get driver
        var driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build()

        // Go to URL
        driver.get('https://www.dronedeploy.com/app2/auth/signin')

        // Waits for page to fully load
        driver.wait(() => {
          return driver.executeScript('return document.readyState').then((readyState) => {
            return readyState === 'complete'
          })
        })

        // Find title and assert
        driver.executeScript('return document.title').then((res) => {
          assert.equal(res, 'DroneDeploy')
        })

        // Input user and password and logs in
        loginHelper.loginForm(driver, 'pbtest@hotmail.com', '12345678')

        // Assert error message
        driver.sleep(1000)
        var ep = driver.findElement(By.css('span.error-text'))
        ep.getText().then((text) => {
          assert.equal(text, 'Unknown username and/or password')
        })

        // Quit webdriver
        driver.quit()
    })
    test.it('Login in succcessfully', function () {
        // Set timeout to 20 seconds
        this.timeout(20000)

        // Get driver
        var driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build()

        // Go to URL
        driver.get('https://www.dronedeploy.com/app2/auth/signin')

        // Waits for page to fully load
        driver.wait(() => {
          return driver.executeScript('return document.readyState').then((readyState) => {
            return readyState === 'complete'
          })
        })

        // Find title and assert
        driver.executeScript('return document.title').then((res) => {
          assert.equal(res, 'DroneDeploy')
        })

        // Input user and password and login
        loginHelper.login(driver, 'paul.buto@test.com', 'test1234')

        // Quit webdriver
        driver.quit()
    })
})

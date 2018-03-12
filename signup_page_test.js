// Load dependecies
const { assert } = require('chai')
const test = require('selenium-webdriver/testing')
const webdriver = require('selenium-webdriver')
const { Builder, By, until } = require('selenium-webdriver')
const Chance = require('chance')
const formHelper = require('./helpers.js')


// Signup Tests
test.describe('DroneDeploy Signup Page', () => {
    test.it('Verify signup page', function () {
        // Set timeout to 20 seconds
        this.timeout(20000)

        // Get driver
        var driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build()

        // Go to URL
        driver.get('https://www.dronedeploy.com/signup.html')

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

        // Verify header text on the page
        var hElem = driver.findElement(By.xpath('//h2[contains(text(), "Get started with a free account")]'))
        hElem.getText().then((text) => {
          assert.equal(text, 'Get started with a free account')
        })
        var pElem = driver.findElement(By.xpath('//p[contains(text(), "Start your 30-day trial of DroneDeploy Pro. No credit card required. Trial limited to 10 maps and models.")]'))
        pElem.getText().then((text) => {
          assert.equal(text, 'Start your 30-day trial of DroneDeploy Pro. No credit card required. Trial limited to 10 maps and models.')
        })

        // Quit webdriver
        driver.quit()
    })
    test.it('Email already exists error message', function () {
        // Set timeout to 10 seconds
        this.timeout(20000)

        // Get driver
        var driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build()

        // Go to URL
        driver.get('https://www.dronedeploy.com/signup.html')

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

        // Fill out signup form
        formHelper.signupForm(driver, 'paul', 'buto')

        // Verify header text on the page
        var usernameUsedElm = driver.wait(until.elementLocated(By.css('[id=username-used-error]>p')), 5000)
        driver.wait(until.elementIsVisible(usernameUsedElm), 5000).getText()
        .then((text) => {
          assert.equal(text, 'We could not sign you up, please check your email address and password are valid.Can we help you recover your password?')
        })

        // Quit webdriver
        driver.quit()
    })
    test.it('Signup a new user', function () {
        // Set timeout to 10 seconds
        this.timeout(30000)

        // Get driver
        var driver = new webdriver.Builder().
        withCapabilities(webdriver.Capabilities.chrome()).
        build()

        // Instantiate Chance so it can be used
        var chance = new Chance()

        // Go to URL
        driver.get('https://www.dronedeploy.com/signup.html')

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

        // Fill out signup form
        formHelper.signupFormSubmit(driver, randomFirstName, randomLastName)

        // Quit webdriver
        driver.quit()
    })
})

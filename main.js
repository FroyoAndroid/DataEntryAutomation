'use strict';

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    chromedriver = require('chromedriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();

driver.get('https://www.dealercarsearch.com/');
driver.findElement(By.name('txtUsername')).sendKeys('tempuser1');
driver.findElement(By.name('txtPassword')).sendKeys('tempuser1');
driver.findElement(By.name('txtKey')).sendKeys('Admin');
driver.findElement(By.name('btnSignIn')).click();

var title = driver.getTitle();
title.then(function (title) {
    console.log(title);
});
// driver.wait(until.titleIs('webdriver - Google Search'), 1000);

//closing the browser
// driver.quit();
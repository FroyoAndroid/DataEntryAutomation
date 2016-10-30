'use strict';

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    chromedriver = require('chromedriver'),
    By = webdriver.By,
    until = webdriver.until;

var driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
var username = '260041544',  
	password = 'koenigmls';

driver.get('http://idp.mfrmls.safemls.net/idp/Authn/UserPassword');
driver.findElement(By.name('j_username')).sendKeys(username);
driver.findElement(By.name('password')).sendKeys(password);
driver.findElement(By.name('login')).click();


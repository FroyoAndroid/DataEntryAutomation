'use strict';

var webdriver = require('selenium-webdriver'),
    chrome = require('selenium-webdriver/chrome'),
    chromedriver = require('chromedriver'),
    By = webdriver.By,
    until = webdriver.until,
    XLSX = require('xlsx'),
    workbook = XLSX.readFile('excel/test.xls');

// var driver = new webdriver.Builder()
//     .forBrowser('chrome')
//     .build();

// driver.get('https://www.dealercarsearch.com/');
// driver.findElement(By.name('txtUsername')).sendKeys('tempuser1');
// driver.findElement(By.name('txtPassword')).sendKeys('tempuser1');
// driver.findElement(By.name('txtKey')).sendKeys('Admin');
// driver.findElement(By.name('btnSignIn')).click();

//reading data from excel file
var sheet_name_list = workbook.SheetNames;
sheet_name_list.forEach(function(y) { /* iterate through sheets */
  var worksheet = workbook.Sheets[y];
  for (var z in worksheet) {
    /* all keys that do not begin with "!" correspond to cell addresses */
    if(z[0] === '!') continue;
    console.log(y + "!" + z + "=" + JSON.stringify(worksheet[z].v));
  }
});


// driver.wait(until.titleIs('webdriver - Google Search'), 1000);

//closing the browser
// driver.quit();
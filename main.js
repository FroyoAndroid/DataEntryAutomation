'use strict';

var webdriver = require('selenium-webdriver'),
  chrome = require('selenium-webdriver/chrome'),
  chromedriver = require('chromedriver'),
  fs = require('fs'),
  By = webdriver.By,
  until = webdriver.until,
  XLSX = require('xlsx'),
  workbook = XLSX.readFile('excel/test.xls');

var driver = new webdriver.Builder()
  .forBrowser('chrome')
  .build();

driver.get('https://www.dealercarsearch.com/');
driver.findElement(By.name('txtUsername')).sendKeys('tempuser1');
driver.findElement(By.name('txtPassword')).sendKeys('tempuser1');
driver.findElement(By.name('txtKey')).sendKeys('Admin');
driver.findElement(By.name('btnSignIn')).click();
// Navigating to add vehice page
driver.get('https://www.dealercarsearch.com/myaccount/addvehicle.aspx');
//reading data from excel file
var sheet_name_list = workbook.SheetNames;
var data = []; //  Data to be entered

sheet_name_list.forEach(function (y) {
  var worksheet = workbook.Sheets[y];
  var headers = {};

  for (var z in worksheet) {
    if (z[0] === '!') continue;
    //parse out the column, row, and value
    var tt = 0;
    for (var i = 0; i < z.length; i++) {
      if (!isNaN(z[i])) {
        tt = i;
        break;
      }
    };
    var col = z.substring(0, tt);
    var row = parseInt(z.substring(tt));
    var value = worksheet[z].v;

    //store header names
    if (row == 1 && value) {
      headers[col] = value;
      continue;
    }

    if (!data[row]) data[row] = {};
    data[row][headers[col]] = value;
  }
  //drop those first three rows which are empty
  data.shift();
  data.shift();
  data.shift();
  /*
    fs.writeFile("excel/test-json.json", JSON.stringify(data), function (err) {
      if (err) {
        return console.log(err);
      }
  
      console.log("The file was saved!");
    });
    */


});

var writeVIN = function (VIN) {
  // VIN entry
  return driver.findElement(By.id('ctl00_ContentPlaceHolder1_FormView1_decodeCallback_txtVIN_I')).sendKeys(VIN);
}

var decodeVIN = function () {
  var decodeVinId = 'ctl00_ContentPlaceHolder1_FormView1_decodeCallback_ASPxButton2_CD';
  driver.findElement(By.id(decodeVinId)).click();
  var test = driver.findElement(By.id(decodeVinId));
  console.log(test);
}



// Testing goes here
writeVIN('5FRYD3H43EB012831').then(function(){
  console.log('click');
  setTimeout(function() {
    decodeVIN();
  }, 300);
});


// Write operation
// data.map(function(key,value){
//   console.log('Writing entry no :', value);
//   writeVIN(key.VIN);
// });

// driver.wait(until.titleIs('webdriver - Google Search'), 1000);

//closing the browser
// driver.quit();
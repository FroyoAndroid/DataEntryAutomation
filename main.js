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
  driver.findElement(By.id('ctl00_ContentPlaceHolder1_FormView1_decodeCallback_ASPxButton2_B')).click();
}

var addSellerNote = function (sellerNotes) {
  var txtAreaID = 'ctl00_ContentPlaceHolder1_FormView1_txtSellerNotes_I';
  driver.findElement(By.id(txtAreaID)).sendKeys(sellerNotes);
}

var addVehicleDisclaimer = function (disclaimer) {
  var txtAreaID = 'ctl00_ContentPlaceHolder1_FormView1_decodeCallback_ASPxButton2_B';
  driver.findElement(By.id(txtAreaID)).sendKeys(disclaimer);
}

var addvehicleCost = function (cost) {
  var inputID = 'ctl00_ContentPlaceHolder1_FormView1_txtCost_I';
  driver.findElement(By.id(inputID)).sendKeys(cost);
}

var addWholeSalePrice = function (wholePrice) {
  var inputID = 'ctl00_ContentPlaceHolder1_FormView1_txtWholesale_I';
  var checkID = 'ctl00_ContentPlaceHolder1_FormView1_cbIncludeInWholesaleCommunity_S_D';
  driver.findElement(By.id(inputID)).sendKeys(wholePrice);
  driver.findElement(By.id(checkID)).click();
}

var addRetailPrice = function (retailrice) {
  var inputID = 'ctl00_ContentPlaceHolder1_FormView1_txtRetail_I';
  driver.findElement(By.id(inputID)).sendKeys(retailrice);
}

var addStockNo = function (stockNo) {
  var inputID = 'ctl00_ContentPlaceHolder1_FormView1_txtRetail_I';
  driver.findElement(By.id(inputID)).sendKeys(stockNo);
}

var addCylinder = function (cylinder) {
  var inputID = 'ctl00_ContentPlaceHolder1_FormView1_cboCylinders_I';
  driver.findElement(By.id(inputID)).sendKeys(cylinder);
}
var addExteriorColor = function (color) {
  var inputID = 'ctl00_ContentPlaceHolder1_FormView1_cboColor_I';
  driver.findElement(By.id(inputID)).sendKeys(color);
}
var addMileage = function (mileage) {
  var inputID = 'ctl00_ContentPlaceHolder1_FormView1_txtMileage_I';
  driver.findElement(By.id(inputID)).sendKeys(mileage);
}

// Testing goes here
/*
writeVIN('5FRYD3H43EB012831').then(function(){
  console.log('click');
  setTimeout(function() {
    decodeVIN();
  }, 8000);
});

//test adding sellerNotes
addSellerNote('Testing');
*/

var addRow = function (data) {
  writeVIN(data.VIN).then(function () {
    setTimeout(function () {
      decodeVIN();
    }, 8000);
  });

  addMileage(data.Mileage);

  addCylinder(data.Cylinder);

  addExteriorColor(data['Exterior Color']);

  addWholeSalePrice(data['Wholesale Price']);

  addvehicleCost(data['Vehicle Cost']);

  addRetailPrice(data['Retail Price']);

  addSellerNote(data['Sellers Notes']);

  addVehicleDisclaimer(data['Vehicle Disclaimer']);

  addStockNo(data['Stock #']);
}

// Write operation
data.map(function (key, value) {
  console.log('Writing entry no :', value);
  if(value === 0)
    addRow(key);

  /*writeVIN(key.VIN).then(function () {
    console.log('click');
    setTimeout(function () {
      decodeVIN();
    }, 8000);
  });*/
});

// driver.wait(until.titleIs('webdriver - Google Search'), 1000);

//closing the browser
// driver.quit();
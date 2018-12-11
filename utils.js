/* eslint-disable */
const webdriver = require('selenium-webdriver');
const logger = require('./logger');
const By = webdriver.By;

const edge = require('selenium-webdriver/edge');
const firefox = require('selenium-webdriver/firefox');
const chrome = require('selenium-webdriver/chrome');

const fs = require('fs');
console.log(edge);
var firefoxCapabilities = webdriver.Capabilities.firefox();
firefoxCapabilities.set('acceptInsecureCerts', true);


class WebTester
{
  constructor(browser, options) {
    this.browser = browser;
    if (browser === 'firefox') {
      this.driver =
      new webdriver.Builder()
        .withCapabilities(firefoxCapabilities)
        .forBrowser(browser)
        .build();
    } else if (browser === 'edge') {
      // new edge.ServiceBuilder().setPort(55555).build();
      // edge.Driver.createSession(new edge.Options(), new edge.ServiceBuilder().build());
      // new webdriver.Builder().forBrowser('edge').build();
      new webdriver.Builder().withCapabilities({'browserName' : 'edge'})
      .forBrowser(browser)
      .build();
    } else {
      this.driver =
      new webdriver.Builder()
        .forBrowser(browser)
        .build();
    }
  }

  FindByName(name) {
    return this.driver.findElement(By.css('[name="'+ name +'"]'));
  }

  FindByFor(attr) {
    return this.driver.findElement(By.css('[for="'+ attr +'"]'));
  }

  FindByCSS(css) {
    return this.driver.findElement(By.className(css));
 }

  FindByID(id) {
    return this.driver.findElement(By.id(id));
  }

  FindByLink(url) {
    return this.driver.findElement(By.css('[href="'+ url +'"]'));
  }

  GoToURL(url, idCountry, callback) {
    if (url) {
      this.driver.get(url).then(() => {

        console.log('Successfully reach ' + url);
        callback();
      })
      .catch(() => {
        console.log('Unable to  reach ' + url);
      });
    }
  }

  takeScreenshot(testName, idCountry) {
    const date = new Date();
    const imgDirectory = 'logs/' +  date.getFullYear() + '-' + date.getMonth() + date.getDate() + '/';
    const imgFile = `${imgDirectory}[${this.browser}][${testName}][${idCountry}].png`;

    if (!fs.existsSync(imgDirectory)) {
      fs.mkdirSync(imgDirectory);
    }

    this.driver.takeScreenshot().then((data) => {
      fs.writeFileSync(imgFile, data, 'base64');
    });
  }

  quitDriver(testName, countryID, logs, time) {
    this.driver.sleep(time).then(() => {
      this.takeScreenshot(testName, countryID);
      logger.ExportLog(this.browser, testName, countryID , logs.join('\r\n'));

      this.driver.quit();
    });
  }
}

// const browsers = [
//   { browserName : 'Chrome'},
//   { browserName : 'Firefox'},
// ]

module.exports = {
    webdriver,
    By,
    // FindByID,
    // FindByCSS,
    // FindByName,
    // FindByFor,
    //  GoToWebsite,
    // GetNewDriver,
    WebTester
};

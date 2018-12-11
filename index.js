/* eslint-disable */
const utils = require('./utils');

const addToCart = require('./test-addtocart');
const passwordReminder = require('./test-passwordreminder');
// const createAccount = require('./test-createAccount');
// const loginMyAccount = require('./test-login');

// const browsers = ['edge'];
// const countries = [74, 79];


addToCart('edge', 74);
passwordReminder('edge', 74);

function initBrowsers() {
  /* browsers.forEach((browser) => {

    addToCart(new utils.WebTester(browser), 74);
    passwordReminder(new utils.WebTester(browser), 74);

    /* countries.forEach((country) => {
      createAccount(new utils.WebTester(browser), country);
      loginMyAccount(new utils.WebTester(browser), country);
    }); */
  // });
}

initBrowsers();

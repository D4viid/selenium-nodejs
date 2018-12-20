/* eslint-disable */
const webdriver = require('selenium-webdriver');
const logger = require('./logger');
const chrome = require('selenium-webdriver/chrome');
const fs = require('fs');



function MyAccountLogin(driver, idCountry) {

  const webTester = driver;
  var logs = [];
  const login = 'testwawa@gmail.com';
  const password = 'william78';

  logs.push(logger.Log(1, 'Starting test : Login to MyAccount '));

  webTester.GoToURL('https://-ocms.loccitane.com/?c='+ idCountry);


  var rewardBtn = webTester.FindByID('rewardQuickLink');

    rewardBtn.click().then(() => {
      logs.push(logger.Log(1, 'Try to login with : '+ login + " / "+ password));

      var loginField = webTester.FindByID('ctl00_ContentPlaceHolder1_ctl00_SignIn_signinEmail').sendKeys(login);
      var pwdField = webTester.FindByID('ctl00_ContentPlaceHolder1_ctl00_SignIn_signinPwd').sendKeys(password);
      var signInBtn = webTester.FindByName('ctl00$ContentPlaceHolder1$ctl00$SignIn$signinBtn');


      signInBtn.click().then(() => {
          logs.push(logger.Log(1,'Acces to register page'));
          var headerBar = webTester.FindByCSS('o-account-header-customer');

        headerBar.then(() => {
          logs.push(logger.Log(1, 'Successfully logged'));
        })
        .catch(() => {
          logs.push(logger.Log(0,'Cannot log in'));

          var loginErrorMsg = webTester.FindByID('ctl00_ContentPlaceHolder1_ctl00_SignIn_SignInErrorLabel').then(() =>
          {
            logs.push(logger.Log(1, 'Login/password is incorrect'));
          })
          .catch(() => {
            // We don't have error label as we succeed to log in
          });
        })
      });
      webTester.quitDriver('MyAccountLogin', idCountry, logs, 20000);
    })
    .catch(() => {
      logs.push(logger.Log(0,'Button My Account KO'));
      webTester.quitDriver('MyAccountLogin',idCountry , logs, 20000);
    });
}



 module.exports = MyAccountLogin;


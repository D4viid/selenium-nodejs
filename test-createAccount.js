/* eslint-disable */
const utils = require('./utils');
const logger = require('./logger');
const By = utils.By;
// const webdriver = utils.webdriver;


const webTester = new utils.WebTester('chrome');

function CreateAccount(driver, idCountry) {
  const webTester = driver;
  const logs = [];
  const randomNumber = Math.floor(Math.random() * 100000);
  const login = 'fakeemail'+ randomNumber +'@loccitane.com';
  const firstName = 'john';
  const lastName = 'do';
  const adresse = '108 rue de richelieu';
  const zipCode = '75002';
  const city = 'Paris';
  const password = 'loccitanetestUI21';

  logs.push(logger.Log(1, 'Starting test : Create Account on MyAccount'));

  webTester.GoToURL('https://stage-ocms.loccitane.com/?c=' + idCountry);
  var rewardBtn = webTester.FindByID('rewardQuickLink');


  rewardBtn.click().then(() => {
    logs.push(logger.Log(1, 'Try to login with : '+ login));

    var loginField = webTester.FindByID('ctl00_ContentPlaceHolder1_ctl00_IsRegisterAvailableView_isRegisterAvailableEmailLabel').sendKeys(login);
    var createAccountBtn = webTester.FindByName('ctl00$ContentPlaceHolder1$ctl00$IsRegisterAvailableView$isRegisterAvailableBtn');

    createAccountBtn.click().then(() => {
        logs.push(logger.Log(1,'Acces to register page'));
        var selectMrs = webTester.FindByFor('ctl00_ContentPlaceHolder1_ctl00_form_title_field_0');

        selectMrs.click().then(() => {
          logs.push( logger.Log(1,'Successfully access to register page'));

          logs.push(logger.Log(1,'Trying to fill the form'));


          var firstnameField = webTester.FindByName('ctl00$ContentPlaceHolder1$ctl00$form$firstName$field').sendKeys(firstName);
          var lastNameField = webTester.FindByName('ctl00$ContentPlaceHolder1$ctl00$form$lastName$field').sendKeys(lastName);
          var adress1Field = webTester.FindByName('ctl00$ContentPlaceHolder1$ctl00$form$address$field').sendKeys(adresse);
          var zipField = webTester.FindByName('ctl00$ContentPlaceHolder1$ctl00$form$zip$field').sendKeys(zipCode);
          var cityField = webTester.FindByName('ctl00$ContentPlaceHolder1$ctl00$form$city$field').sendKeys(city);
          var passwordField = webTester.FindByName('ctl00$ContentPlaceHolder1$ctl00$form$password$field').sendKeys(password);
          var confirmPwdField = webTester.FindByName('ctl00$ContentPlaceHolder1$ctl00$form$passwordConfirm$field').sendKeys(password);

          var formConditions = webTester.FindByFor('ctl00_ContentPlaceHolder1_ctl00_form_conditions_field');

          Promise.all([firstnameField, lastNameField, adress1Field, zipField, cityField,passwordField, confirmPwdField])
          .then(() => {
              logs.push(logger.Log(1,'Successfully fill in the form'));
          })
          .catch((errorField) =>
          {
            logs.push(logger.Log(1,'Cannot fill the form correcty, one required field is missing'));
          });

          formConditions.click().then(() => {
            logs.push(logger.Log(1,'Terms Condition chekbox'));
          }).catch(() => {
            logs.push(logger.Log(0,'Terms Condition chekbox'));
          })

          var submitForm = webTester.FindByID('ctl00_ContentPlaceHolder1_ctl00_form_submit');
          submitForm.click().then(() => {
            logs.push( logger.Log(1,'Create Account'));
          });
        });
    });
    webTester.quitDriver('createAccount', idCountry, logs, 20000);
  })
  .catch(() => {
    logs.push(logger.Log(0,'Button My Account'));
    webTester.quitDriver('createAccount', idCountry, logs, 20000);
  });
}

module.exports = CreateAccount;

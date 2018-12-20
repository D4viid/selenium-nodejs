const logger = require('./logger');

const url = 'https://-ocms.loccitane.com/baume-yeux-pr%C3%A9cieux-immortelle,74,1,34008,622427.htm';

const passwordReminder = function passwordReminder(driver, idCountry) {
  const logs = [];

  function setLoginCheckout() {
    driver.FindByID('ctl00_ContentPlaceHolder1_ctl00_linkExpressCheckoutStep1_bottom').click().then(() => {
      logs.push(logger.Log(1, 'Step 1 OK'));
      driver.FindByCSS('forgot_password').click().then(() => {
        logs.push(logger.Log(1, 'Popin password OK'));
        driver.quitDriver('passwordReminder', idCountry, logs, 3000);
      })
      .catch(() => {
        logs.push(logger.Log(0, 'Popin password KO'));
        driver.quitDriver('passwordReminder', idCountry, logs, 3000);
      });
    })
    .catch(() => {
      logs.push(logger.Log(0, 'Step 1 BTN KO'));
    });
  }

  function addToCartFromProductPage() {
    driver.FindByCSS('js-addtocart').click();
    driver.FindByCSS('js-addtocart').click()
    .then(() => {
      logs.push(logger.Log(1, 'Add to Cart OK'));
      setLoginCheckout();
    }).catch(() => {
      logs.push(logger.Log(0, 'Add to Cart KO'));
    });
  }

  driver.GoToURL(url, idCountry, addToCartFromProductPage);
};

module.exports = passwordReminder;


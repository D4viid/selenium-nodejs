const logger = require('./logger');

const url = 'https://stage-ocms.loccitane.com/baume-yeux-pr%C3%A9cieux-immortelle,74,1,34008,622427.htm';

const addToCart = function addToCart(driver, idCountry) {
  const logs = [];

  function setLoginCheckout() {
    driver.FindByID('ctl00_ContentPlaceHolder1_ctl00_linkContinueCheckoutStep1_bottom').click().then(() => {
      logs.push(logger.Log(1, 'Step 1 OK'));
      driver.FindByID('ctl00_ContentPlaceHolder1_ctl00_txtCrmFieldAlready_login').sendKeys('ghromis@loccitane.com');
      driver.FindByID('ctl00_ContentPlaceHolder1_ctl00_txtCrmFieldAlready_password').sendKeys('greggreg');
      driver.FindByID('ctl00_ContentPlaceHolder1_ctl00_btnCrmField_Button').click().then(() => {
        logs.push(logger.Log(1, 'Login checkout OK'));

        driver.quitDriver('addToCart', idCountry, logs, 20000);
      })
      .catch(() => {
        logs.push(logger.Log(0, 'Login checkout KO'));
        driver.quitDriver('addToCart', idCountry, logs, 3000);
      });
    }).catch(() => {
      logs.push(logger.Log(1, 'Step 1 KO'));
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

module.exports = addToCart;


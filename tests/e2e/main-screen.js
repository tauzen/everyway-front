module.exports = {
  'Main screen visbility': function(browser) {
    browser.url('http://localhost:8080');

    browser.expect.element('body').to.be.present.before(1000);
    // header
    browser.expect.element('#main nav.navbar').to.be.visible.before(5000);
    browser.expect.element('#main nav #main-button-back').to.be.visible;
    browser.expect.element('#main nav div.main-title').to.be.visible;
    browser.expect.element('#main nav #main-button-add').to.be.visible;
    
    // map
    browser.expect.element('#main #main-map div.gm-style').to.be.visible;

    browser.end();
  }
};

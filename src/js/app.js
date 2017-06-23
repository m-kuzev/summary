import Router from './router.js';
import Header from './header.js';
import Sidebar from './sidebar.js';
import View from './view.js';

/**
 * Main application logic
 */
class App {
  constructor() {
    // Initiate router
    Router.init();

    new Header();
    new Sidebar();
    new View(Router.getParam('view'));
  }
}

new App();
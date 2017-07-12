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

    new View(Router.getParam('view'));
    new Header();
    new Sidebar();
  }
}

new App();
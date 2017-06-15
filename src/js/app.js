import Header from './header.js';
import Sidebar from './sidebar.js';
import View from './view.js';

/**
 * Main application logic
 */
class App {
  constructor() {
    new Sidebar();
    new Header();
    new View();
  }
}

new App();
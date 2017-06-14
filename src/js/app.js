import Header from './header.js';
import Sidebar from './sidebar.js';

/**
 * Main application logic
 */
class App {
  constructor() {
    new Sidebar();
    new Header();
  }
}

new App();
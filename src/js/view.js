import TableView from './tableView.js';
import Backend from './backend.js';
import CustomEvents from './customEvents.js';

/**
 * Main content view class
 */
export default class View {
  constructor(type) {
    this.selectView(type);
    this.viewEvents();
  }

  selectView(type) {
    // TODO: Remove main-content
    const performanceData = Backend.performanceCategories();

    switch (type) {
      case 'table':
        new TableView(performanceData);
        break;
      case 'chart':
        break;
      case 'file':
        break;
      default:
        break;
    }
  }

  viewEvents() {
    /** Change view */
    CustomEvents.addListener('header.changeView', (viewType) => {
      this.selectView(viewType);
    });
  }
}
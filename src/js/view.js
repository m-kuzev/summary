import TableView from './tableView.js';
import Backend from './backend.js';


/**
 * Main content view class
 */
export default class View {
  constructor() {
    const performanceData = Backend.performanceDataJson();
    this.selectView(performanceData);
  }

  selectView(performanceData) {
    new TableView(performanceData);
  }
}
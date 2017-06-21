import TableView from './tableView.js';
import Backend from './backend.js';
import Request from './request.js';


/**
 * Main content view class
 */
export default class View {
  constructor() {
    const performanceData = Backend.performanceDataJson();
    this.selectView(performanceData);
  }

  selectView(performanceData) {
    // 1) Get information about the view and data from the router
    // 2) Make data request for the current information
    new Request('GET', 'https://jsonplaceholder.typicode.com/posts', {}, (response) => {
      window.console.log(response);
    });

    new TableView(performanceData);
  }
}
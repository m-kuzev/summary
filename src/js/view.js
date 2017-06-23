import TableView from './tableView.js';
import Backend from './backend.js';
import Request from './request.js';

/**
 * Main content view class
 */
export default class View {
  constructor(type) {
    const performanceData = Backend.performanceDataJson();
    this.selectView(type, performanceData);
  }

  selectView(type, performanceData) {
    new Request('GET', 'https://jsonplaceholder.typicode.com/posts', {}, (response) => {
      // window.console.log(response);

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
    });
  }
}
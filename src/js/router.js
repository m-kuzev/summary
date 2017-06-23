import CustomEvents from './customEvents.js';

const DEFAULT_ROUTE = '/?view=table';

/**
 * Router class for url manipulation and navigation
 */
export default class Router {
  /** Navigate to new URL */
  static init() {
    // Default router
    if (!window.location.search) {
      window.history.replaceState({
        view: 'table'
      }, '', DEFAULT_ROUTE);
    }

    Router.routerEvents();
  }

  /**
   * Get URL-param
   * @param {string} name - param name
   * @return {string}
   */
  static getParam(name) {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  }

  /**
   * Set URL-param
   * @param {*} name - param name
   * @param {*} value - param value
   * @param {boolean} keepOld - should the value be replacer (default is added)
   */
  static setParam(name, value, keepOld = false) {
    if (value) {
      const params = new URLSearchParams(window.location.search);
      const prevValue = keepOld ? params.get(name) : '';
      const newValue = (prevValue ? prevValue : '') + value.toString();

      params.set(name, newValue);
      window.history.replaceState({}, '', location.pathname + '?' + params);
    }
  }

  static routerEvents() {
    // Event TRIGGERS
    CustomEvents.addListener('sidebar.addEntry', (data) => {
      const entryData = data.requestData.toString();
      Router.setParam('entries', entryData, true);
    });
  }
}
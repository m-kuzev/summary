import CustomEvents from './customEvents.js';

const DEFAULT_ROUTE = '/view/table';
const URL_ENTRIES = [];

/**
 * Router class for url manipulation and navigation
 */
export default class Router {
  /** Navigate to new URL */
  static init() {
    Router.routerEvents();

    // Default router
    if (window.location.pathname.length == 1) {
      window.history.replaceState({
        view: 'table'
      }, '', DEFAULT_ROUTE);
    } else {
      Router.initialUrlParse();
    }
  }

  static get entries() {
    return URL_ENTRIES;
  }

  /**
   * Match url parameter
   * @param {string} name - param name
   * @return {string}
   */
  static matchUrlParam(name) {
    const pathname = window.location.pathname;
    const match = pathname.match(new RegExp(name + '\\/([^/]+)'));
    if (match) {
      return match;
    }
  }

  /**
   * Get URL-param
   * @param {string} name - param name
   * @return {string}
   */
  static getParam(name) {
    const match = Router.matchUrlParam(name);
    if (match) {
      return match[1];
    }
  }

  /**
   * Delete URL-param
   * @param {string} name - url param name
   * @param {string} value - url param value
   * @param {boolean} fullDelete - should the param and value be removed together
   */
  static deleteParam(name, value, fullDelete = false) {
    let param = '';
    let newPathName = '';
    const match = Router.matchUrlParam(name);

    if (match && !fullDelete) {
      // Have param and fulldelete NOT selected - delete only value
      param = match[1];
      newPathName = window.location.pathname.replace(param, '');
    } else if (match && fullDelete) {
      // Have param but fulldelete IS selected
      param = match[0];
      newPathName = window.location.pathname.replace(param, '');
    } else {
      // Dont have param;
      newPathName = window.location.pathname.replace('/' + name + '/', '');
    }
    window.history.replaceState({}, '', newPathName);

    // Delete the whole param if there aren't any values left
    const newMatch = Router.matchUrlParam(name);
    if (!newMatch) {
      newPathName = window.location.pathname.replace('/' + name + '/', '');
      window.history.replaceState({}, '', newPathName);
    }
  }

  /**
   * Set URL-param
   * @param {*} name - param name
   * @param {*} value - param value
   * @param {boolean} keepOld - should the value be replacer (default is added)
   */
  static setParam(name, value, keepOld = false) {
    let newPathname = '';
    const currentPathname = window.location.pathname;
    const match = Router.matchUrlParam(name);

    // Add the parameter if it doesnt exist
    if (!match) {
      newPathname = currentPathname + '/' + name + '/' + value;
      window.history.replaceState({}, '', newPathname);

      return;
    }

    const param = match[1];
    // Keep the old value and add new or just replace
    if (keepOld) {
      newPathname = currentPathname.replace(param, param + ',' + value);
    } else {
      newPathname = currentPathname.replace(param, value);
    }

    window.history.replaceState({}, '', newPathname);
  }

  /**
   * Load initial url and check for previously loaded entries
   * @example
   * url https://summary.site.com/view/table/entries/[2,3,4,4]
   * Each entry consists of 4 params joined by ',' => [2,3,4,4]
   * First number (2) - PLATFORM dropdown (PLATFORM id)
   * Second number (3) - DEVICE dropdown (DEVICE id)
   * Third number (4) - GAME dropdown (GAME id)
   * Fourth number (4) - BUILD dropdown (BUILD id)
   */
  static initialUrlParse() {
    // LOAD previously added entries
    const entries = Router.getParam('entries');
    if (entries) {
      const loadedEntries = JSON.parse('[' + Router.getParam('entries') + ']');
      loadedEntries.forEach((entry) => {
        URL_ENTRIES.push(entry);
      });
    }
  }

  static routerEvents() {
    /**
     * Add entry event
     * @param {object} data - entry data containing requestData from the dropdown menus
     */
    CustomEvents.addListener('sidebar.addEntry', (data) => {
      // Check for initial entries
      if (!Router.entries.length) {
        Router.setParam('entries', data.id, true);
      }
    });

    /** Delete entry information
     * @param {object} entryId
     */
    CustomEvents.addListener('header.deleteEntry', (entryId) => {
      Router.deleteParam('entries', entryId);
    });

    /**
     * Change view
     * @param {string} viewType
     */
    CustomEvents.addListener('header.changeView', (viewType) => {
      Router.setParam('view', viewType);
    });
  }
}

window.Router = Router;
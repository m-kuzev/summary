import Template from './template.js';

/**
 * Site header manager
 */
export default class Header {
  constructor() {
    this.addHeaderEvents();
  }

  addHeaderEvents() {
    /** Add entry to HEADER event */
    window.addEventListener('sidebar.addEntry', (e) => {
      Template.load('.entry-list', 'header-entry', e.detail, true);
    });
  }
}
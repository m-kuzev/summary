import Template from './template.js';
import CustomEvents from './customEvents.js';

/**
 * Tableview (main content)
 */
export default class TableView {
  constructor(data) {
    Template.load('.main-content', 'table-view', {}, false, () => {
      this.loadDataTypes(data);
      this.addEvents();
    });
  }

  loadDataTypes(data) {
    Template.load('.table-entry-data-list.data-type', 'table-view-data-type', data, false);
  }

  addEvents() {
    // Event ORIGINS

    // Event TRIGGERS
    /** Add entry to VIEW event */
    CustomEvents.addListener('sidebar.addEntry', (data) => {
      Template.load('.table-entry-header-list', 'table-view-entry-header', data, true);
      Template.load('.table-entry-data-wrapper', 'table-view-entry-data', data, true);
    });

    /** Show/Hide entry information
     * @param {object} data - event data with the selected entry_id
     */
    CustomEvents.addListener('header.showHideEntry', (data) => {
      const entryHeader = document.querySelector('.table-entry-header[entry_id="' + data.entry_id + '"]');
      const entryData = document.querySelector('.table-entry-data-list[entry_id="' + data.entry_id + '"]');

      entryHeader.classList.toggle('hidden');
      entryData.classList.toggle('hidden');
    });

    /** Delete entry information
     * @param {object} entryId
     */
    CustomEvents.addListener('header.deleteEntry', (entryId) => {
      const entryHeader = document.querySelector('.table-entry-header[entry_id="' + entryId + '"]');
      entryHeader.parentNode.removeChild(entryHeader);
      const entryData = document.querySelector('.table-entry-data-list[entry_id="' + entryId + '"]');
      entryData.parentNode.removeChild(entryData);
    });

    /** Show hide performance data type */
    CustomEvents.addListener('sidebar.dataTypeToggle', (data) => {
      const elements = document.querySelectorAll('.data[type="' + data.type + '"]');
      elements.forEach((element) => {
        element.classList.toggle('hidden');
      });
    });
  }
}
import Template from './template.js';

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
    document.addEventListener('sidebar.addEntry', (e) => {
      Template.load('.table-entry-header-list', 'table-view-entry-header', e.detail, true);
      Template.load('.table-entry-data-wrapper', 'table-view-entry-data', e.detail, true);
    });

    /** Show/Hide entry information */
    document.addEventListener('header.showHideEntry', (e) => {
      const eventData = e.detail;
      const entryHeader = document.querySelector('.table-entry-header[entry_id="' + eventData.entry_id + '"]');
      const entryData = document.querySelector('.table-entry-data-list[entry_id="' + eventData.entry_id + '"]');

      entryHeader.classList.toggle('hidden');
      entryData.classList.toggle('hidden');
    });

    /** Show hide performance data type */
    document.addEventListener('sidebar.dataTypeToggle', (e) => {
      const elements = document.querySelectorAll('.data[type="' + e.detail.type + '"]');
      elements.forEach((element) => {
        element.classList.toggle('hidden');
      });
    });
  }

}
import Template from './template.js';
import CustomEvents from './customEvents.js';

/**
 * Site header manager
 */
export default class Header {
  constructor() {
    this.addHeaderEvents();
  }

  addHeaderEvents() {
    // Event ORIGINS
    /** Show/Hide entry  */
    document.addEventListener('click', (e) => {
      const clicked = e.target;

      // Detect clicked element
      if (clicked.classList.contains('entry-item')) {
        // Detect current state
        clicked.classList.toggle('hidden');

        CustomEvents.trigger('header.showHideEntry', {
          entry_id: clicked.getAttribute('entry_id'),
        });
      }
    });

    /** Delete entry */
    document.addEventListener('dragend', (e) => {
      const clicked = e.target;

      // Detect clicked element
      if (clicked.classList.contains('entry-item')) {
        const entryId = clicked.getAttribute('entry_id');

        if (confirm('Are you sure you want to delete this entry?')) {
          const entry = document.querySelector('.entry-item[entry_id="' + entryId + '"]');
          entry.parentNode.removeChild(entry);

          // Trigger custom event
          CustomEvents.trigger('header.deleteEntry', entryId);
        }
      }
    });

    // Event TRIGGERS
    /** Add entry to HEADER event */
    CustomEvents.addListener('sidebar.addEntry', (data) => {
      Template.load('.entry-list', 'header-entry', data, true);
    });
  }
}
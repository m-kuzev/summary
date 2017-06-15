import Template from './template.js';

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
        const eventDetails = {
          entry_id: clicked.getAttribute('entry_id'),
        };

        // Dispatch event
        const event = new CustomEvent('header.showHideEntry', {
          detail: eventDetails
        });
        document.dispatchEvent(event);
      }
    });

    /** Delete entry */
    document.addEventListener('dragend', (e) => {
      const clicked = e.target;

      // Detect clicked element
      if (clicked.classList.contains('entry-item')) {
        const entryId = clicked.getAttribute('entry_id');

        if (confirm('Are you sure you want to delete this entry?')) {
          const entryElements = document.querySelectorAll('[entry_id="' + entryId + '"]');
          entryElements.forEach((element) => {
            element.parentNode.removeChild(element);
          });
        }
      }
    });

    // Event TRIGGERS
    /** Add entry to HEADER event */
    document.addEventListener('sidebar.addEntry', (e) => {
      Template.load('.entry-list', 'header-entry', e.detail, true);
    });
  }
}
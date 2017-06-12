import Template from './template.js';
import Backend from './backend.js';

/**
 * Sidebar class handling all sidebar options and events
 */
export default class Sidebar {
  constructor() {
    this.loadDataTypes();
  }

  // Load sidebar ENTRY options
  loadOptions() {

  }

  optionEvents() {

  }

  /** Load sidebar data type options */
  loadDataTypes() {
    const performanceData = Backend.performanceDataJson();

    Template.load('.performance-data', 'sidebar-data-type', performanceData, () => {
      this.dataTypeEvents();
    });
  }

  dataTypeEvents() {
    // Data type select/deselect
    const dataTypeUl = document.getElementsByClassName('data-type-list')[0];
    dataTypeUl.addEventListener('click', function (e) {
      const liElement = e.target.parentNode;
      liElement.classList.toggle('active');

      // Trigger content event for data type enabling/disabling
      const evt = new CustomEvent('sidebar.dataTypeToggle', {
        detail: {
          id: liElement.getAttribute('id'),
          type: liElement.getAttribute('type'),
          active: liElement.classList.contains('active')
        }
      });

      window.dispatchEvent(evt);
    });
  }
}
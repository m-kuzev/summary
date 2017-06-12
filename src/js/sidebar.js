import Template from './template.js';
import Backend from './backend.js';

/**
 * Sidebar class handling all sidebar options and events
 */
export default class Sidebar {
  constructor() {
    this.loadDataTypes();
    this.loadOptions();
  }

  // Load sidebar ENTRY options
  loadOptions() {
    const globalOptions = {
      disable_search_threshold: 10,
      no_results_text: 'No results!'
    };

    this.fillSelect('#platform-select', ['-', 'html5', 'tablet', 'phone']);

    // Select types
    $('#platform-select').chosen(globalOptions);
    $('#device-select').chosen(globalOptions);
    $('#game-select').chosen(globalOptions);
    $('#build-select').chosen(globalOptions);

    this.optionEvents();
  }

  optionEvents() {
    const selectOrder = ['#platform-select', '#device-select', '#game-select', '#build-select'];

    selectOrder.forEach((element, index) => {
      // Change event
      $(element).chosen().change((e, params) => {
        const elementOrder = Number(e.target.getAttribute('order'));

        // Disable all select menus
        for (let i = elementOrder + 1; i < selectOrder.length; i++) {
          $(selectOrder[i]).prop('disabled', true);
          $(selectOrder[i]).val('-');
          $(selectOrder[i]).trigger('chosen:updated');
        }

        // Re-Enable the current changed menu
        const nextSelectInLine = selectOrder[index + 1];
        $(selectOrder[index]).prop('disabled', false);
        $(selectOrder[index]).trigger('chosen:updated');

        // If a valid value is selected fill the next select in line and apply changes
        if (params.selected.length !== 1 && selectOrder[elementOrder + 1]) {
          this.fillSelect(nextSelectInLine, ['one', 'two', 'three']);
        }
      });
    });
  }

  /**
   * Fill the select ith options based on data
   * @param {jqueryId} type - jquery id string of the select
   * @param {array} data - array with data string
   */
  fillSelect(type, data) {
    Template.generateOptionHtml(type, data, () => {
      $(type).prop('disabled', false);
      $(type).trigger('chosen:updated');
    });
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
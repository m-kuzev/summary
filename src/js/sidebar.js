import Template from './template.js';
import CustomEvents from './customEvents.js';
import Backend from './backend.js';
import Router from './router.js';

const _selectOrder = ['#platform-select', '#device-select', '#game-select', '#build-select'];

/**
 * Sidebar class handling all sidebar options and events
 */
export default class Sidebar {
  constructor() {
    this.loadDataTypes();
    this.renderOptions();
    this.loadPreviousEntries();
  }

  /**
   * Render sidebar ENTRY dropdown options
   */
  renderOptions() {
    const globalOptions = {
      disable_search_threshold: 10,
      no_results_text: 'No results!'
    };

    this.fillSelect('#platform-select', Backend.getOptions('platform'));

    // Select types
    $('#platform-select').chosen(globalOptions);
    $('#device-select').chosen(globalOptions);
    $('#game-select').chosen(globalOptions);
    $('#build-select').chosen(globalOptions);

    this.dropdownEvents();
    this.entryEvents();
  }

  /**
   * Add the entry options dropdown events
   */
  dropdownEvents() {
    // Select menus events
    _selectOrder.forEach((element, index) => {
      // Change event
      $(element).chosen().change((e, params) => {
        const elementOrder = Number(e.target.getAttribute('order'));

        // Disable all select menus
        for (let i = elementOrder + 1; i < _selectOrder.length; i++) {
          $(_selectOrder[i]).prop('disabled', true);
          $(_selectOrder[i]).val('-');
          $(_selectOrder[i]).trigger('chosen:updated');
        }

        // Re-Enable the current changed menu
        const nextSelectInLine = _selectOrder[index + 1];
        $(_selectOrder[index]).prop('disabled', false);
        $(_selectOrder[index]).trigger('chosen:updated');

        // If a valid value is selected fill the next select in line and apply changes
        if (params.selected.length !== 1 && _selectOrder[elementOrder + 1]) {
          this.fillSelect(nextSelectInLine, Backend.getOptions(_selectOrder[elementOrder + 1]));
        }
      });
    });
  }

  /**
   * Add sidebar entry related events
   */
  entryEvents() {
    /** ADD new entry */
    const addButton = document.getElementById('add-entry');
    addButton.addEventListener('click', (e) => {
      e.preventDefault();

      // Validate for missing data
      if (this.validateDropdowns()) {
        this.createEntry();
      } else {
        alert('Please select the missing options!');
      }
    });
  }

  /**
   * Load previous entries on url refresh
   */
  loadPreviousEntries() {
    if (Router.entries.length) {
      Router.entries.forEach((entryData) => {
        this.createEntry(entryData);
      });
    }
  }

  /**
   * Format entry data and send entry creation event
   * @param {array} data - entry data
   */
  createEntry(data = false) {
    // TODO: send request
    // const form = document.getElementById('new-entry-form');
    // const data = new FormData(form);
    const entryInfo = '[1,2,155,44]';

    // Data for request
    // for (const pair of data.entries()) {
    //   window.console.log(pair[0] + ', ' + pair[1]);
    // }

    // Extend the json with the necessary parameters
    const response = Backend.entryJson();
    response.id = entryInfo;

    // Dispatch event
    CustomEvents.trigger('sidebar.addEntry', response);

    this.resetForm();
  }

  /** 
   * Reset entry form after successfully adding the entry 
   */
  resetForm() {
    // Default platform select values
    this.fillSelect(_selectOrder[0], Backend.getOptions('platform'));

    _selectOrder.forEach((selectId, index) => {
      // _selectOrder[0] -> platform
      if (index !== 0) {
        this.fillSelect(selectId, ['']);
        $(selectId).prop('disabled', true).trigger('chosen:updated');
      }
    });
  }

  /**
   * Validate select fields
   * @returns {boolean} isValid
   */
  validateDropdowns() {
    let valid = true;

    const selectDropdowns = document.querySelectorAll('.specifics select');
    selectDropdowns.forEach((select) => {
      if (select.disabled) {
        valid = false;
      }
    });

    return valid;
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

  /** 
   * Load sidebar data type options 
   */
  loadDataTypes() {
    const performanceData = Backend.performanceCategories();

    Template.load('.performance-data', 'sidebar-data-type', performanceData, false, () => {
      this.dataTypeEvents();
    });
  }

  /** 
   * Event for diffferent performance data type selection/deselection
   */
  dataTypeEvents() {
    // Event ORIGINS
    // Data type select/deselect
    const dataTypeUl = document.getElementsByClassName('data-type-list')[0];
    dataTypeUl.addEventListener('click', function (e) {
      const liElement = e.target.parentNode;
      liElement.classList.toggle('active');

      // Trigger content event for data type enabling/disabling
      CustomEvents.trigger('sidebar.dataTypeToggle', {
        type: liElement.getAttribute('type'),
      });
    });
  }
}
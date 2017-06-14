/* globals
  Handlebars
*/

/**
 * Template renderer
 */
export default class Template {
  constructor() {
    this.registerHelpers();
  }

  /**
   * Load the selected html template in the selected element
   * @param {string} selector - query string for the desired element to load html in to
   * @param {string} filename - template name
   * @param {object} data - template data/context
   * @param {function} callback
   */
  static load(selector, filename, data, callback) {
    Template.getTemplate(filename).then((templateData) => {
      // Prepare html and context data
      const template = Handlebars.compile(templateData);
      const html = template(data);

      // Load the data in the selected element
      document.querySelector(selector).innerHTML = html;

      // Execute callback is such is selected
      if (callback) {
        callback();
      }
    });
  }

  /**
   * Get template string from a file
   * @param {string} filename - template name
   * @return {string} - template html
   */
  static getTemplate(filename) {
    return new Promise(function (resolve, reject) {
      const req = new XMLHttpRequest();
      req.open('GET', 'src/templates/' + filename + '.hbs', true);

      req.onreadystatechange = function () {
        if (req.readyState != 4 || req.status != 200) return;
        resolve(req.responseText);
      };

      req.onerror = function () {
        reject(Error('Network Error!'));
      };

      req.send();
    });
  }

  /**
   * Generate option tag html
   * @param {selector} select - id selector
   * @param {array} data - data array
   * @param {function} callback
   */
  static generateOptionHtml(select, data, callback) {
    const selectMenu = document.querySelector(select);
    selectMenu.innerHTML = '';
    const frag = document.createDocumentFragment();

    let opt = {};
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        opt = document.createElement('option');
        opt.value = data[i];
        opt.innerHTML = data[i];
        frag.appendChild(opt);
      }
    } else {
      for (const key in data) {
        opt = document.createElement('option');
        opt.value = data[key];
        opt.innerHTML = key;
        frag.appendChild(opt);
      }
    }
    selectMenu.appendChild(frag);

    if (callback) {
      callback();
    }
  }

  /** Register template helpers */
  registerHelpers() {
    Handlebars.registerHelper('splitAndUpperCase', function (text) {
      text = text.replace(/([A-Z])/g, ' $1');
      text = text.replace(/^./, (str) => {
        return str.toUpperCase();
      });

      return text;
    });
  }
}

new Template();
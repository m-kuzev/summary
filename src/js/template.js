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
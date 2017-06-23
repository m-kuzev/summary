/**
 * Custom events class
 */
export default class Events {
  /**
   * Create custom event
   * @param {string} name - event name
   * @param {object} eventDetails
   * @returns {event}
   */
  static create(name, eventDetails) {
    return new CustomEvent(name, {
      detail: eventDetails
    });
  }

  /**
   * Trigger custom event
   * @param {string} name - event name
   * @param {object} eventDetails
   */
  static trigger(name, eventDetails) {
    const event = Events.create(name, eventDetails);
    document.dispatchEvent(event);
  }

  /**
   * Add event listener for custom app events
   * @param {string} name - event name
   * @param {calback} callback
   */
  static addListener(name, callback) {
    document.addEventListener(name, (e) => {
      callback(e.detail);
    });
  }
}
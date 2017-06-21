/**
 * API requester
 */
export default class Request {
  /**
   * Constructor for the request
   * @param {string} type - request type
   * @param {string} url - url
   * @param {object} postData - request data (mostly for POST, PATCH)
   * @param {callback} onSuccess - success callback function
   * @param {callback} onError - error callback function
   */
  constructor(type, url, postData, onSuccess, onError) {
    switch (type) {
      case 'GET':
        return window.fetch ? this._getRequest(url, onSuccess, onError) : this._xhrGet(url, onSuccess, onError);
      case 'POST':
        return window.fetch ? this._postRequest(url, postData, onSuccess, onError) : this._xhrPost(url, postData, onSuccess, onError);
    }
  }

  /**
   * GET request
   * @param {string} url
   * @param {callback} onSuccess
   * @param {callback} onError
   */
  _getRequest(url, onSuccess, onError) {
    // Request settings
    const settings = {
      method: 'get',
      credentials: 'include'
    };

    // Make the request
    fetch(url, settings)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return Promise.resolve(response);
        } else {
          return Promise.reject(response);
        }
      })
      .then((response) => {
        // Parse response
        return response.json();
      })
      .then((data) => {
        // Success handler
        onSuccess(data);
      })
      .catch((error) => {
        // Error handler
        onError ? onError(error) : this._defaultErrorHandler(error);
      });
  }

  /**
   * POST request
   * @param {string} url
   * @param {object} postData
   * @param {callback} onSuccess
   * @param {callback} onError
   */
  _postRequest(url, postData, onSuccess, onError) {
    // Request settings
    const settings = {
      method: 'post',
      credentials: 'include',
      headers: {
        // 'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: JSON.stringify(postData)
    };

    fetch(url, settings)
      .then((response) => {
        // Parse response
        return response.json();
      })
      .then((data) => {
        // Success handler
        onSuccess(data);
      })
      .catch((error) => {
        // Error handler
        onError ? onError(error) : this._defaultErrorHandler(error);
      });
  }

  /**
   * XHR GET request
   * @param {string} url
   * @param {callback} onSuccess
   * @param {callback} onError
   */
  _xhrGet(url, onSuccess, onError) {
    // const xhr = new XMLHttpRequest();
    // xhr.onreadystatechange = () => {
    //   if (xhr.readyState == 4 && xhr.status == 200) {
    //     onSuccess(xhr.responseText);
    //   } else {
    //     onError(xhr.responseText);
    //   }
    // };

    // xhr.open('GET', url, true);
    // xhr.send(null);
  }

  /**
   * Default error hadler function
   * @param {string} error - request error text
   */
  _defaultErrorHandler(error) {
    window.console.error(error);
  }
}
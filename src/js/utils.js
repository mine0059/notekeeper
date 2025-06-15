/**
 * @copyright Emmanuel 2025
 */

'use strict';

/**
 * Add event on multiple elements
 * @param {NodeList} $elements 
 * @param {String} evenType Event type eg. "click"
 * @param {Function} callback Callback function
 */

export const addEventOnElements = function ($elemets, evenType, callback) {
    $elemets.forEach($element => $element.addEventListener(evenType, callback));
}

export const getGreetingMsg = function (currentHour) {
    const /** {String} */ greeeting = 
    currentHour < 5 ? 'Night' : 
    currentHour < 12 ? 'Morning' :
    currentHour < 15 ? 'Noon' :
    currentHour < 17 ? 'Afternoon' :
    currentHour < 20 ? 'Evening' :
    'Night';

    return `Good ${greeeting}`;
}

let /** {HTMLEkement} | underfine*/ $lastActiveNavItem;

/**
 * Activates a navigation item ny adding the 'active' class and 
 deactivating the previously active item.
 */

 export const activeNotebook = function () {
    $lastActiveNavItem?.classList.remove('active');
    this.classList.add('active'); // this: $navItem
    $lastActiveNavItem = this; // this: $navItem
 }

 /**
  * makes a Dom element aditable by setting the 'contenteditable'
  attribute to true and focusing on it.
  * @param {HTMLElement} $element The Dom element to make editable
  */
 export const makeElemEditable = function ($element) {
    $element.setAttribute('contenteditable', true);
    $element.focus();
 }

 /**
  * Generate a unique ID based on the current timestamp.
  *
  * @returns {String} A string representation of the current timestamp.
  */
 export const generateID = function () {
    return new Date().getTime().toString();
 }

 /**
  * find a new note book in the database by its ID.
  *
  * @param {Object} db - The database containing the notebooks,
  * @param {String} notebookId - The ID of the notebook to find
  * @returns {Object | undefined} The found notebook object, or undefined if not found.
  */
 export const findNoteBook = function (db, notebookId) {
    return db.notebooks.find(notebook => notebook.id === notebookId);
 }

 /**
  * find the index of a notebook in an array of notebooks based on its ID.
  * 
  * @param {Object} db - The database containing an array of notebooks,
  * @param {String} notebookId - The ID of the notebook to find
  * @returns {number} The index of the found notebook, or -1 if not found.
  */
 export const findNotebookIndex = function (db, notebookId) {
    return db.notebooks.findIndex(item => item.id === notebookId);
 }

 /**
  * Converts a timestamp in milliseconds to a human-readable relative time string.
  * 
  * @param {number} milliseconds - The timestamp in milliseconds to convert,
  * @returns {String} A string representing the relative time (e.g,
   "just now," "5 min ago," "3 hours ago," "2 days ago").
  */
 export const getRelativeTime = function (milliseconds) {
   const /** {Number} */ currentTime = new Date().getTime();

   let /** {Number} */ minute = Math.floor((currentTime - milliseconds) / 1000 / 60);
   const /** {Number} */ hour = Math.floor(minute / 60);
   const /** {Number} */ day = Math.floor(hour / 24);

   return minute < 1 ? 'just now' 
   : minute < 60 ? `${minute} min${minute === 1 ? '' : 's'} ago`
   : hour < 24 ? `${hour} hour${hour === 1 ? '' : 's'} ago` 
   : `${day} day${day === 1 ? '' : 's'} ago`;
 }
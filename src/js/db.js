/**
 * @copyright Emmanuel 2025
 */

'use strict';
/**
 * import module
 */

import { generateID, findNoteBook, findNotebookIndex } from "./utils.js";

// DB Object
let /** {Object} */ notekeeperDB = {};


/**
 * Initialize a local database if the data base exists in local storage, it is loaded;
 * otherwise, a new empty database structure is created and stored.
 */
const initDB = function () {
    const /** {JSON} | undefined*/ db = localStorage.getItem('notekeeperDB');

    if (db) {
        notekeeperDB = JSON.parse(db);
    } else {
        notekeeperDB.notebooks = [];
        localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
    }
}

initDB();

/**
 * Read and loads the localStorage data in to the global variable
 * `notekeeperDB`
 */
const readDB = function () {
    notekeeperDB = JSON.parse(localStorage.getItem('notekeeperDB'));
}

/**
 * write the current state of the global variable `notekeeperDB` to local storage
 */
const writeDB = function () {
    localStorage.setItem('notekeeperDB', JSON.stringify(notekeeperDB));
}


/**
 * Collection of function for performing CRUD (Create, Read, Update, Delete) operations on database.
 * The database state is managed using global variables and local storage
 * @namespace
 * @property {Object} get - Functions for retrieving data from the database
 * @property {Object} post - Functions for adding data from the database
 * @property {Object} update - Functions for updating data from the database
 * @property {Object} delete - Functions for deleting data from the database
 */
export const db = {
    post: {
        /**
         * Add a new notebook to the database
         * 
         *@function
         * @param {String} name - The name of the new notebook.
         * @returns {Object} The newly created notebook object
         */
        notebooks(name) {
            readDB();

            // create the new notebook object
            const /** {Object} */ notebookData = {
                id : generateID(),
                name,
                notes: []
            }

            // Add to the notebooks array
            notekeeperDB.notebooks.push(notebookData);

            writeDB();

            return notebookData;
        },

        /**
         *Adds a new note to a specific notebook in the database.
         *
         * @function
         * @param {String} notebookId - The ID of the notebook to add the note to
         * @param {Object} object - The note object to add.
         * @return {Object} The newly created note object.
         */
        note(notebookId, object) {
            readDB();

            const /** {Object} */ notebook = findNoteBook(notekeeperDB, notebookId);

            const /** {Object} */ noteData = {
                id: generateID(),
                notebookId,
                ...object,
                postedOn: new Date().getTime()
            }
            
            notebook.notes.unshift(noteData);
            writeDB();

            return noteData;
        }
    },

    get: {
        /**
         * Retrieves all notebooks from database
         * 
         * @function
         * @return {Array<Object>} An array of notebook objects. 
         */
        notebook() {
            readDB();

            return notekeeperDB.notebooks;
        },
        /**
         * Retrieves all notes within a specific notebook.
         * 
         * @function
         * @param {string} notebookId - The ID of the notebook to retrieve notes from.
         * @return {Array<Object>} An array of notek objects. 
         */
        note(notebookId) {
            readDB();
            const /** {Object} */ notebook = findNoteBook(notekeeperDB, notebookId);

            return notebook.notes;
        }

    },

    update: {
        /**
         * Update the name of the notebook in the database
         * 
         * @param {string} notebookId - The ID of the notebook to update
         * @param {string} name - The new name for the notebook
         * @return {Object} The updated notebook object 
         */
        notebook(notebookId, name) {
            readDB();

            const/** {Object} */ notebook = findNoteBook(notekeeperDB, notebookId);

            notebook.name = name;

            writeDB();

            return notebook;
        }
    },

    delete: {
        /**
         * Delete a notebook from the database
         * 
         * @function
         * @param {string} notebookId - The ID of the notebook to delete
         */
        notebook(notebookId) {
            readDB();

            const /** {Number} */ notebookIndex = findNotebookIndex(notekeeperDB, notebookId);
            notekeeperDB.notebooks.splice(notebookIndex, 1);
            
            writeDB();

            return notebookIndex;
        }
    }

};
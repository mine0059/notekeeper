/**
 * @copyright Emmanuel 2025
 */

'use strict';


/**
 * Module import
 */

import { addEventOnElements, getGreetingMsg, activeNotebook, makeElemEditable } from "./utils.js";
import { Tooltip } from "./components/Tooltip.js";
import { db } from "./db.js";
import { client } from "./client.js";
import { NoteModal } from "./components/Modal.js";


/**
 * Toggle sidebat in small screen
 */

const /** {HTMLElement} */ $sidebar = document.querySelector('[data-sidebar]');
const /** {Array<HTMLElement>} */ $sidebarTogglers = document.querySelectorAll('[data-sidebar-toggler]');
const /** {HTMLElement} */ $overlay = document.querySelector('[data-sidebar-overlay]');

addEventOnElements($sidebarTogglers, 'click', function () {
    $sidebar.classList.toggle('active');
    $overlay.classList.toggle('active');
});

/**
 * initialize tooltip behavour for all Dom elements with 'data-tooltip' attribute.
 */
const /** {Array<HTMLElement>} */ $tooltipElems = document.querySelectorAll('[data-tooltip]');
$tooltipElems.forEach($elem => Tooltip($elem));



/**
 * show greeeting message on homepage
 */
const /** {HTMLElement} */ $greetElem = document.querySelector('[data-greeting]');
const /** {number} */ currentHour = new Date().getHours();

$greetElem.textContent = getGreetingMsg(currentHour);

/**
 * show the cureent data on homepage
 */
const /** {HTMLElement} */ $currentDateElem = document.querySelector('[data-current-data]');
$currentDateElem.textContent = new Date().toDateString().replace(' ', ', ');


/**
 * Notebook create field
 */
const /** {HTMLElement} */ $sidebarList = document.querySelector('[data-sidebar-list]');
const /** {HTMLElement} */ $addNotebookBtn = document.querySelector('[data-add-notebook]');

const showNoteBookField = function () {
    const /** {HTMLElement} */ $navItem = document.createElement('div');
    $navItem.classList.add('nav-item');

    $navItem.innerHTML = `
        <span class="text text-label-large" data-notebook-field></span>

        <div class="state-layer"></div>
    `
    $sidebarList.appendChild($navItem);

    const /** {HTMLElement} */ $navItemField = $navItem.querySelector('[data-notebook-field]');

    // ACTIVE new created notebook and deactivate the last one
    activeNotebook.call($navItem);

    // Make notebook field content editable and focus
    makeElemEditable($navItemField);

    // When you press 'Enter' then create notebook
    $navItemField.addEventListener('keydown', createNotebook);
}

$addNotebookBtn.addEventListener('click', showNoteBookField);


const createNotebook = function (event) {
    if (event.key === 'Enter') {
        // Store new created notebook in database
        const /**  {Object} */ notebookData =  db.post.notebooks(this.textContent || 'Untitled'); //this: $navItemField
        this.parentElement.remove();

        // Render navItem
        client.notebook.create(notebookData);
    } 
}

/**
 * Renders tje existing notebook list by retrieving data from the database and passing it to the client
 */
const renderExistingNoteBook = function () {
    const /** {Array} */ notebookList = db.get.notebook();
    client.notebook.read(notebookList);
}

renderExistingNoteBook();

/** 
 * Create new note
 * 
 * Attach event listeners to a collection of DOM elements
 representation 'Create Note" buttons,
 * When a button is clicked, it opens a modal for creating a new note and handles the submission
 *of the new note to database and client 
 */

 const /** {Array<HTMLElements>} */ $noteCreateBtn = document.querySelectorAll('[data-note-create-btn]');

 addEventOnElements($noteCreateBtn, 'click', function () {
    // create and open a new modal
    const /** {Object} */ modal = NoteModal();
    modal.open();

    // Handle the submission of the new note to the database and client
    modal.onSubmit(noteObj => {
        const /** {String} */ activeNotebookId = document.querySelector('[data-notebook].active').dataset.notebook;

        const /** {Object} */ noteData = db.post.note(activeNotebookId, noteObj);
        client.note.create(noteData);
        modal.close();
    })
 });

 /** 
 * Renders existing notes in the active notebook. Retrieves note data from the database based on the active notebooks ID and uses the client to display the notes.
 * 
 */
const renderExistingNotes = function () {
    const /** {string | undefined} */ activeNotebookId = document.querySelector('[data-notebook].active')?.dataset.notebook;

    if (activeNotebookId) {
        const /** {Array<Object>} */ noteList = db.get.note(activeNotebookId);
        client.note.read(noteList);
    }
    
}

renderExistingNotes()

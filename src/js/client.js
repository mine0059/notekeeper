/**
 * @copyright Emmanuel 2025
 */

'use strict';

/**
 * import module
 */
import { NavItem } from "./components/NavItem.js";
import { activeNotebook } from "./utils.js";
import { Card } from "./components/Card.js";

const /** {HTMLElement} */ $sidebarList = document.querySelector('[data-sidebar-list]');
const /** {HTMLElement} */ $nodePanelTitle = document.querySelector('[data-note-panel-title]');
const /** {HTMLElement} */ $nodePanel = document.querySelector('[data-note-panel]');
const /** {Array<HTMLElement>} */ $noteCreateBtns = document.querySelectorAll('[data-note-create-btn]');
const /** {HTMLElement} */ emptyNotesTemplate = `
    <div class="empty-notes">
        <span class="material-symbols-rounded" aria-hidden="true">note_stack</span>

        <div class="text-headline-small">No notes</div>
    </div>
`;

/**
 * Enable or disables "Create Note" buttons based on whether there are notebooks
 * 
 * @param {boolean} isThereAnyNotebooks - Indicates whether there are any notebooks
 */
const disableNoteCreateBtns = function (isThereAnyNotebooks) {
    $noteCreateBtns.forEach($item => {
        $item[isThereAnyNotebooks ? 'removeAttribute' : 'setAttribute']('disabled', '');
    });
}

/**
 * This clent object manages interaction witht the user interface (UI) to create, read, update and delete notebooks and notes.
 * It provides functions for performing these operations and updates the Ui accordingly
 * 
 * @namespace
 * @property {Object} notebook - Function for managing notebooks in the UI.
 * @property {Object} note - Functions for manage notes in the UI.
 */
export const client = {

    notebook: {
        /**
         *Create a new notebook in the UI, based in provided notebook data.
         *
         * @param {*} notebookData - Data representing the new notebook.
         */
        create(notebookData) {
            const /** {HTMLeLElement} */ $navItem = NavItem(notebookData.id, notebookData.name);
            $sidebarList.appendChild($navItem);
            activeNotebook.call($navItem);
            $nodePanelTitle.textContent = notebookData.name;
            $nodePanel.innerHTML = emptyNotesTemplate;
            disableNoteCreateBtns(true);
        },

        /**
         *Read and display a list of notebooks in the UI.
         *
         * @param {Array<Object>} notebookList - List of notebook data
         */
        read(notebookList) {
            disableNoteCreateBtns(notebookList.length);
            notebookList.forEach((notebookData, index) => {
                const /** {HTMLElement} */ $navItem = NavItem(notebookData.id, notebookData.name);

                if (index === 0) {
                    activeNotebook.call($navItem);
                    $nodePanelTitle.textContent = notebookData.name;
                }

                $sidebarList.appendChild($navItem);
            });
        },

        /**
         *Update the UI to reflect changes in a notebook
         *
         *@param {String} notebookId - ID of the notebook to update
         * @param {Object} notebookData - New data for the notebook.
         */
        update(notebookId, notebookData) {
            const /** {HTMLElement} */ $oldNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const /** {HTMLElement} */ $newNotebook = NavItem(notebookData.id, notebookData.name);

            $nodePanelTitle.textContent = notebookData.name;
            $sidebarList.replaceChild($newNotebook, $oldNotebook);
            activeNotebook.call($newNotebook);
        },

        /**
         *Delete a notebook from the UI
         *
         *@param {String} notebookId - ID of the notebook to delete
         */
        delete(notebookId) {
            const /** {HTMLElement} */ $deletedNotebook = document.querySelector(`[data-notebook="${notebookId}"]`);
            const /** {HTMLElement | null} */ $activeNavItem = $deletedNotebook.nextElementSibling ?? $deletedNotebook.previousElementSibling;

            if ($activeNavItem) {
                $activeNavItem.click();
            } else {
                $nodePanelTitle.innerHTML = '';
                $nodePanel.innerHTML = '';
                disableNoteCreateBtns(false);
            }

            $deletedNotebook.remove();
        },
    },

    note: {
        
        /**
         * Create a new note card in the UI based on provided note data.
         *
         * @param {Object} noteData - Data representing the new note
         */
        create(noteData) {
            // clear emptyNotesTemplate from notePanel if there is no note exists
            if (!$nodePanel.querySelector('[data-note]')) $nodePanel.innerHTML = '';

            // Append card in notePanel
            const /** {HTMLElements} */ $card = Card(noteData);
            $nodePanel.appendChild($card);
        },

        /**
         * Reads and displays a list of notes in the UI
         *
         * @param {Array<object>} noteList - List of note data to display
         */
        read(noteList) {
            if (noteList.length) {
                $nodePanel.innerHTML = '';

                noteList.forEach((notelistData) => {
                    const /** {HTMLElement} */ $card = Card(notelistData);
                    $nodePanel.appendChild($card);
                });
            } else {
                $nodePanel.innerHTML = emptyNotesTemplate;
            }
        }

    }

}
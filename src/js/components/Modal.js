/**
 * @copyright Emmanuel 2025
 */

'use strict';


const /** {HTMLElement} */ $overlay = document.createElement('div');
$overlay.classList.add('overlay', 'modal-overlay');

/**
 * 
 * @param {String} title 
 */
export const DeleteConfirmModal = function (title) {

    const $modal = document.createElement('div');
    $modal.classList.add('modal');

    $modal.innerHTML = `
        <h3 class="modal-title text-title-medium">Are you sure you want to delete <Strong>"${title}"?</h3>

        <div class="modal-footer">
            <button class="btn text" data-action-btn="false">
                <span class="text-label-large">Cancel</span>

                <div class="state-layer"></div>
            </button>
            <button class="btn fill" data-action-btn="true">
                <span class="text-label-large">Delete</span>

                <div class="state-layer"></div>
            </button>
        </div>
    `;

    /** 
     * open the delete confirmation modal by appending it to the doscument body
     */
    const open = function () {
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
    }

    /** 
     * close the delete confirmation modal by removing it from the doscument body
     */
    const close = function () {
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
    }

    const /** {Array<HTMLElement>} */ $actionBtns = $modal.querySelectorAll('[data-action-btn]');

    /**
     * Handle the submission of the delete confimation.
     *
     * @param {Function} callback - The callback function to execute with the confirmation result (true for confirmation, false for cancel).
     */
    const onSubmit = function (callback) {
        $actionBtns.forEach($btn => $btn.addEventListener('click', function () {
            const /** {Boolean} */ isConfirm = this.dataset.actionBtn === 'true' ? true : false;

            callback(isConfirm);
        }));
    }

    return { open, close, onSubmit }

}


/**
 * Create and manages the modal for adding or editing notes. The modal allows users to input a notes title and text,
 * and provides functionality to submit and save the note.
 * 
 * @param {String} [title='Untitled']
 * @param {String} [text ='Add your note...']
 * @param {String} [time ='']
 * @return {Object} - An object containing functions to open the modal, close the modal, and handle note submissions.
 */
export const NoteModal = function (title = 'Untitled', text = 'Add your note...', time = '') {

    const /** {HTMLElement} */ $modal = document.createElement('div');
    $modal.classList.add('modal');

    $modal.innerHTML = `
        <button class="icon-btn large" aria-label="Close modal" data-tooltip="Close modal" data-close-btn>
            <span class="material-symbols-rounded" aria-hidden="true">close</span>

            <div class="state-layer"></div>
        </button>

        <input type="text" placeholder="Untitled" value="${title}" class="modal-title text-title-medium" data-note-field>

        <textarea placeholder="Take a note..." class="modal-text text-body-large custom-scrollbar" data-note-field="">${text}</textarea>

        <div class="modal-footer">
            <span class="time text-label-large">${time}</span>

            <button class="btn text" data-submit-btn>
                <span class="text-label-large">Save</span>

                <div class="state-layer"></div>
            </button>
        </div>
    `;

    const /** {HTMLElement>} */ $submitBtn = $modal.querySelector('[data-submit-btn]');
    $submitBtn.disabled = true;

    const /** {HTMLElement} */ [$titleField, $textField] = $modal.querySelectorAll('[data-note-field]');

    const enableSubmit = function () {
        $submitBtn.disabled = !$titleField.value && !$textField.value;
    }

    $textField.addEventListener('keyup', enableSubmit);
    $titleField.addEventListener('keyup', enableSubmit);

    /** 
     * Opent the note modal by appending it to the document body and setting focus on the title field. 
     */

    const open = function () {
        document.body.appendChild($modal);
        document.body.appendChild($overlay);
        $titleField.focus();
    }

     /** 
     * close the note modal by removing it from the doscument body
     */
    const close = function () {
        document.body.removeChild($modal);
        document.body.removeChild($overlay);
    }

    // Attach click mouse to closeBtn, when click call the close modal function
    const /** {HTMLElement>} */ $closeBtn = $modal.querySelector('[data-close-btn]');
    $closeBtn.addEventListener('click', close);

    /**
     * Handle the submission of a note within the modal.
     *
     * @param {Function} callback - The callback function to execute with the submitted note data.
     */
    const onSubmit = function (callback) {
        $submitBtn.addEventListener('click', function () {
            const /** {Object} */ noteData = {
                title: $titleField.value,
                text: $textField.value,
            }

            callback(noteData);
        });
    }

    return { open, close, onSubmit }
}


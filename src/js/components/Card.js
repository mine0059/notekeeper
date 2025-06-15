/**
 * @copyright Emmanuel 2025
 */

'use strict';

/** 
 * Import modules
 */
import { Tooltip } from "./Tooltip.js";
import { getRelativeTime } from "../utils.js";

/**
 * Create an HTML card element representing a note based on provided note data.
 * 
 * @param {Object} noteData -Data representing the note to be displayed in the card
 * @return {HTMLElement} - The generated card element.
 */
export const Card = function (noteData) {

    const { id, title, text, postedOn, notebookId } = noteData;

    const /** {HTMLElement} */ $card = document.createElement('div');
    $card.classList.add('card');
    $card.setAttribute('data-note', id);

    $card.innerHTML = `
        <h3 class="card-title text-title-medium">${title}</h3>

        <p class="card-text text-body-large">${text}</p>

        <div class="wrapper">
            <span class="card-time text-label-large">${getRelativeTime(postedOn)}</span>

            <button class="icon-btn large" aria-label="Delete note" data-tooltip="Delete note">
                <span class="material-symbols-rounded" aria-hidden="true">delete</span>

                <div class="state-layer"></div>
            </button>
        </div>

        <div class="state-layer"></div>
    `;

    Tooltip($card.querySelector('[data-tooltip]'));

    /**
     * Note detail view & edit functionality
     * 
     * Attaches a click event listener to card element
     * When the card is clicked, it opens a modal with the notes details and allows for updating the notegit sta
     */
    $card.addEventListener('click', function () {
        console.log('clicked');
    })


    return $card;

}
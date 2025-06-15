/**
 * @copyright Emmanuel 2025
 */

'use strict';

export const Tooltip = function ($element) {
    const /** {HTMLElenent} */ $tooltip = document.createElement('span');
    $tooltip.classList.add('tooltip', 'text-body-small');

    $element.addEventListener('mouseenter', function () {
       $tooltip.textContent =  this.dataset.tooltip;

       const {
        top,
        left,
        height,
        width
       } = this.getBoundingClientRect();

       $tooltip.style.top = top + height + 4 + 'px';
       $tooltip.style.left = left + (width / 2) + 'Px';
       $tooltip.style.transform = 'translate(-50% 0)';
       document.body.appendChild($tooltip);
    });

    $element.addEventListener('mouseleave', $tooltip.remove.bind($tooltip));
}
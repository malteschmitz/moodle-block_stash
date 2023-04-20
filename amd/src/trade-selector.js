// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Add items to a trade table.
 *
 * @copyright 2023 Adrian Greeve <adriangreeve.com>
 * @license http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

import Dialogue from 'block_stash/trade-item-dialogue';
import Counselor from 'block_stash/counselor';

export const init = () => {
    registerActions();
    let warnings = '';
    let courseelement = document.querySelector('input[name="courseid"]');
    let courseid = courseelement.value;
    let title = document.querySelector('.additem[data-type="gain"]').getAttribute('title');

    let additemelements = document.getElementsByClassName('additem');
    for (let additem of additemelements) {
        additem.addEventListener('click', (e) => {
            let node = e.currentTarget;
            let dialogue = new Dialogue(courseid, node.dataset.type, title, warnings);
            e.preventDefault();
            dialogue.show(e);
            Counselor.on('item-save', () => {
                dialogue.close();
                registerActions();
            });
        });
    }
};

const registerActions = () => {
    let deleteelements = document.getElementsByClassName('block-stash-delete-item');
    for (let delement of deleteelements) {
        delement.addEventListener('click', deleteItem);
    }
};

const deleteItem = (element) => {
    let child = element.currentTarget;
    let parent = child.closest('.block-stash-trade-item');
    parent.remove();
    element.preventDefault();
};

/*  gimp-web: GIMP official website
 *  Copyright (C) 2021 Jehan
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

var buttons = document.getElementsByClassName('download-button');

for (var i = 0, len = buttons.length | 0; i < len; i= i + 1) {
    buttons[i].onclick = function(e) {
        /* Prevent default click behavior, otherwise we can't redirect.
         * Thus we must also explicitly start the download in a new tab.
         * This will still work even if javascript is disabled.
         */
        e.preventDefault();
        window.open(this.getElementsByTagName("a")[0].href);

        window.location="/downloads/thanks.html";
        window.focus();
    };
}

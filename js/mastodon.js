/*  gimp-web: GIMP official website
 *  Copyright (C) 2022 Jehan
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
"use strict";

function onMastodonLinkClick(title, link) {
  var shareForms = document.querySelectorAll('.mastodon-share-form');
  for (var i = 0, len = shareForms.length | 0; i < len; i = i + 1) {
    if (shareForms[i].style.display == 'none') {
      shareForms[i].style.display = 'block';

      shareForms[i].addEventListener('submit', function(e) {
        e.preventDefault();
        var instance = e.target['mastodon-instance'].value.trim();
        if (instance.length > 0) {
          /* window.open() opens an address without a scheme relatively to the
           * current page. Prepend with '//' to handle automatic https or http
           * scheme.
           */
          if (! instance.match(/^https?:\/\//i)) {
            instance = '//' + instance;
          }
          window.open(`${instance}/share?text=${title}%0A${link}`, `__blank`)
          e.stopPropagation();
        }
      });
    }
    else {
      shareForms[i].style.display = 'none';
    }
  }
}

/* Mastodon forms are hidden by default. */
var shareForms = document.querySelectorAll('.mastodon-share-form');
  for (var i = 0, len = shareForms.length | 0; i < len; i = i + 1) {
    shareForms[i].style.display = 'none';
}

/* Clicking mastodon links hide/show the form. */
var mastodonLinks = document.querySelectorAll('.mastodon-share-button')

for (let i = 0; i < mastodonLinks.length; i++) {
  var shareLink = mastodonLinks[i].dataset.link
  var shareTitle = mastodonLinks[i].dataset.title

  /* Replace hashtab by html code */
  shareTitle = shareTitle.replace(/#/g, '%23')

  /* Set the listener in each button */
  mastodonLinks[i].addEventListener('click', () => { onMastodonLinkClick(shareTitle, shareLink); }, true)
}

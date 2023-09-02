/**
 *
 * @source: http://www.gimp.org/js/search-embed.js
 *
 * @licstart  The following is the entire license notice for the 
 *  JavaScript code in this page.
 *
 * Copyright (C) 2016 Pat David
 *
 *
 * The JavaScript code in this page is free software: you can
 * redistribute it and/or modify it under the terms of the GNU
 * General Public License (GNU GPL) as published by the Free Software
 * Foundation, either version 3 of the License, or (at your option)
 * any later version.  The code is distributed WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE.  See the GNU GPL for more details.
 *
 * As additional permission under GNU GPL version 3 section 7, you
 * may distribute non-source (e.g., minimized or compacted) forms of
 * that code without the copy of the GNU GPL normally required by
 * section 4, provided you include this license notice and a URL
 * through which recipients can access the Corresponding Source.
 *
 * @licend  The above is the entire license notice
 * for the JavaScript code in this page.
 *
 */

/*
 * search-embed.js
 *
 * This should be included at the end of every page
 * that we want to include search functionality on.
 *
 * Pat David, 2016
 */

var searchForm = document.getElementById('search-form');
var tipue_input = document.getElementById('tipue_search_input');
while( searchForm.firstChild ){
    searchForm.removeChild( searchForm.firstChild );
}
tipue_input.placeholder = "Search GIMP.org";
searchForm.appendChild( tipue_input );
searchForm.action = "/search.html";

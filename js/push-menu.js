/**
 *
 * @source: http://www.gimp.org/js/push-menu.js
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
 * If you thought my Python was bad
 * wait until you get a load of my js
 */

var navel = document.getElementById('navel');
var page = document.getElementById('pushPage');
var menu = document.getElementById('menu');

menu.style.visibility = 'visible';

var toggle = function(e){
    e.preventDefault();

    var page = document.getElementById('pushPage');
    var menu = document.getElementById('menu');

    if( menu.className.indexOf('show') !== -1 ){
        menu.className = "hide";
        // navel.className = "initial";
        page.removeEventListener('click', toggle, false);
        page.removeEventListener('touchstart', toggle, false);
    }else{
        menu.className = "show";
        // navel.className = "bottom";
        page.addEventListener('click', toggle, false);
        page.addEventListener('touchstart', toggle, false);
    }
}

navel.addEventListener("touchstart", toggle, false);
navel.addEventListener("click", toggle, false);


/* Scroll detection for showing/hiding navigation strip
 * on mobile
 */

var didScroll = false;
var navbar = document.getElementById('navstrip');
var navHeight = navbar.offsetHeight;
var delta = 10;
var lastScrollTop = 0;

window.onscroll = doScroll;

function doScroll(){
    /*
    if( window.innerWidth >= 1024 ){
    }else{
        didScroll = true;
    }
    */
    if( window.innerWidth < 1024) didScroll = true;
}

setInterval( function() {
    if( didScroll ) {
        didScroll = false;
        var st = window.pageYOffset;

        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        //console.log( st );

        // If scroll past navbar, add class .nav-up
        if ( st > lastScrollTop && st > 30){
            //scroll down
            navbar.className = navbar.className.replace('nav-down','nav-up');
			//b.backgroundPositionY = parseInt( b.backgroundPositionY ) + 4 + '%';
        }else{
            //scroll up?
            navbar.className = navbar.className.replace('nav-up','nav-down');
			//b.backgroundPositionY = parseInt( b.backgroundPositionY ) - 4 + '%';
        }
        lastScrollTop = st;
    }
}, 250);

menu.style.display = 'block';
menu.style.zIndex = '1';

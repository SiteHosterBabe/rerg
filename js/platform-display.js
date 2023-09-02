/**
 *
 * @source: http://www.gimp.org/js/platform-display.js
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
 * platform-display.js
 *
 * Used on /downloads/ to change download display blocks
 * based on detected platform.
 *
 * Pat David, 2016
 */

/* This function is currently targetted toward Apple in order to differenciate
 * Apple Intel vs. Apple M*.
 * It doesn't return a boolean as we have 3 states: silicon, intel or unknown.
 */
function detectArch() {
  try {
    var canvas = document.createElement('canvas');
    var webgl  = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (webgl) {
      var info = webgl.getExtension('WEBGL_debug_renderer_info');
      var renderer;

      renderer = webgl.getParameter(info.UNMASKED_RENDERER_WEBGL);

      if (renderer.match(/Apple M[0-9]/i)) {
        /* On Firefox, the value is "Apple M1".
         * On Chrome, it is of the form "ANGLE (Apple, Apple M1 Pro, OpenGL 4.1)" 
         * We add some number regexp as M2 is out, and soon M3.
         */
        return 'silicon';
      }
      else if (renderer.match(/Apple GPU/i)) {
        /* We don't really know on Safari. */
        return 'unknown';
      }
    }
  } catch (e) { }

  return 'intel';
}

    document.getElementById('OS-choice').style.fontFamily = 'monospace';

    if ( platform.os.family.indexOf('Win') !== -1 && platform.os.family.indexOf('Phone') == -1 ){
        // Windows, _not_ Phone
        document.getElementById('win').style.display = 'block';
        document.getElementById('mac').style.display = 'none';
        document.getElementById('linux').style.display = 'none';
        document.getElementById('pOSTEST').innerHTML = 'Microsoft Windows';

        document.getElementById('os_win').style.fontWeight = 'bold';
    }else if ( platform.os.family.indexOf('OS X') !== -1 ){
        // OS X
        var arch;

        document.getElementById('win').style.display = 'none';
        document.getElementById('mac').style.display = 'block';
        document.getElementById('linux').style.display = 'none';
        document.getElementById('pOSTEST').innerHTML = 'macOS';

        document.getElementById('os_mac').style.fontWeight = 'bold';

        arch = detectArch();
        if (arch == 'intel') {
            document.getElementById('mac-arm64-buttons').style.display = 'none';
            document.getElementById('mac-x86_64-buttons').style.display = 'block';
        }
        else if (arch == 'silicon') {
            document.getElementById('mac-arm64-buttons').style.display = 'block';
            document.getElementById('mac-x86_64-buttons').style.display = 'none';
        }
        else {
            document.getElementById('mac-arm64-buttons').style.display = 'block';
            document.getElementById('mac-x86_64-buttons').style.display = 'block';
            document.getElementById('mac-show-x86_64').style.display = 'none';
            document.getElementById('mac-show-arm64').style.display = 'none';
        }
    }else if ( platform.os.family.indexOf('iOS') !== -1 || platform.os.family.indexOf('Android') !== -1 ){
        // iOS or Android
        document.getElementById('pOSTEST').innerHTML = platform.os.family;
        var nope = "<br/><strong>This platform is not currently supported.</strong>";
        document.getElementById('pOSTEST').innerHTML += nope;
        document.getElementById('win').style.display = 'none';
        document.getElementById('mac').style.display = 'none';
        document.getElementById('linux').style.display = 'none';
    }else {
        // Everything else (assuming *nix-type)
        document.getElementById('pOSTEST').innerHTML = platform.os.family;
        document.getElementById('win').style.display = 'none';
        document.getElementById('mac').style.display = 'none';
        document.getElementById('linux').style.display = 'block';

        document.getElementById('os_linux').style.fontWeight = 'bold';
    }

    function render( os ){
        document.getElementById('os_all').style.fontWeight = 'normal';
        document.getElementById('os_linux').style.fontWeight = 'normal';
        document.getElementById('os_win').style.fontWeight = 'normal';
        document.getElementById('os_mac').style.fontWeight = 'normal';
        switch( this.id ) {
            case 'os_linux':
                document.getElementById('linux').style.display = 'block';
                document.getElementById('win').style.display = 'none';
                document.getElementById('mac').style.display = 'none';

                document.getElementById('os_linux').style.fontWeight = 'bold';
                break;
            case 'os_win':
                document.getElementById('linux').style.display = 'none';
                document.getElementById('win').style.display = 'block';
                document.getElementById('mac').style.display = 'none';

                document.getElementById('os_win').style.fontWeight = 'bold';
                break;
            case 'os_mac':
            case 'mac-show-x86_64':
            case 'mac-show-arm64':
                document.getElementById('linux').style.display = 'none';
                document.getElementById('win').style.display = 'none';
                document.getElementById('mac').style.display = 'block';

                document.getElementById('os_mac').style.fontWeight = 'bold';
                if (this.id == 'mac-show-x86_64') {
                    document.getElementById('mac-arm64-buttons').style.display = 'none';
                    document.getElementById('mac-x86_64-buttons').style.display = 'block';
                } else if (this.id == 'mac-show-arm64') {
                    document.getElementById('mac-arm64-buttons').style.display = 'block';
                    document.getElementById('mac-x86_64-buttons').style.display = 'none';
                }
                else {
                    document.getElementById('mac-arm64-buttons').style.display = 'block';
                    document.getElementById('mac-x86_64-buttons').style.display = 'block';
                    document.getElementById('mac-show-x86_64').style.display = 'none';
                    document.getElementById('mac-show-arm64').style.display = 'none';
                }
                break;
            default:
                document.getElementById('linux').style.display = 'block';
                document.getElementById('win').style.display = 'block';
                document.getElementById('mac').style.display = 'block';

                document.getElementById('os_all').style.fontWeight = 'bold';
                break;
        }
        return false;
    }

    document.getElementById('os_all').addEventListener("click", render );
    document.getElementById('os_linux').addEventListener("click", render );
    document.getElementById('os_win').addEventListener("click", render );
    document.getElementById('os_mac').addEventListener("click", render );
    document.getElementById('mac-show-x86_64').addEventListener("click", render );
    document.getElementById('mac-show-arm64').addEventListener("click", render );

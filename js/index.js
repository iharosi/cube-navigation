(function(window, undefined){

    "use strict";

    var document = window.document,
        console = window.console || {};

    // Is this a touchable device?
    var touchable = 'createTouch' in document;

    // Mouse and touch coordinates, vectors and states
    var pointer = {
        deltaX: 0,
        originX: 0,
        on: false
    };

    // get elements from DOM
    var cube = document.getElementById('cube'),
        cubeYstate = 0;

    // regexp pattern to handle rotateY
    var pattern = /rotateY\(([0-9]+[.0-9]*)deg\)/;

    // when everything gets ready we can add event handlers
    window.addEventListener('load',function(){

        console.log( 'LOG:', 'ready' );

        if (touchable) {
            document.addEventListener('touchmove', onRotate, false);
            document.addEventListener('touchstart', onPointerDown, false);
            document.addEventListener('touchend', onPointerUp, false);
        } else {
            document.addEventListener('mousemove', onRotate, false);
            document.addEventListener('mousedown', onPointerDown, false);
            document.addEventListener('mouseup', onPointerUp, false);
        }

        console.log( 'LOG:', 'events added' );

    }, false);

    // we have to store which side of the cube is facing us
    var storeCubeState = function() {
        var match = cube.style.webkitTransform.match(pattern);
        cubeYstate = parseFloat( match ? match[1] : 0 );
        console.log( 'cubeYstate', cubeYstate );
    };

    var onPointerDown = function( e ) {
        pointer.originX = e.pageX;
        pointer.on = true;
        document.getElementById('cube').style.webkitTransition = "none";
        // cube.style.webkitTransition = "all .3s cubic-bezier( 0,1.2,.75,1.5 )";
        cube.style.webkitTransform = "translateZ(-420px) rotateY( " + cubeYstate + "deg )";
    };

    var onPointerUp = function() {
        cube.style.webkitTransition = "all .3s cubic-bezier( 0,1.2,.75,1.5 )";
        var match = cube.style.webkitTransform.match(pattern);
        if ( match !== null && match[1] > 45 ) {
            cube.style.webkitTransform = "translateZ(-320px) rotateY( " + ( cubeYstate + 90 ) + "deg )";
        } else if ( match !== null && match[1] < -45 ) {
            cube.style.webkitTransform = "translateZ(-320px) rotateY( " + ( cubeYstate - 90 ) + "deg )";
        } else {
            cube.style.webkitTransform = "translateZ(-320px) rotateY( " + cubeYstate + "deg )";
        }
        storeCubeState();
        pointer = {
            deltaX: 0,
            originX: 0,
            on: false
        };
    };

    var onRotate = function( e ) {
        if ( pointer.on === true ) {
            pointer.deltaX = e.pageX - pointer.originX;
            cube.style.webkitTransform = "translateZ(-420px) rotateY( " + ( cubeYstate + 90 / 640 * pointer.deltaX ) + "deg )";
        }
    };

})(window);

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

    // when everything gets ready we can set event handlers
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

    // stores which side of the cube is facing us
    var storeCubeState = function() {
        var pattern = /rotateY\((-?[0-9]+[.0-9]*)deg\)/; // regexp pattern to get the value of rotateY transform
        var match = cube.style.webkitTransform.match(pattern);
        cubeYstate = parseFloat( match ? match[1] : 0 );
        console.log( 'cubeYstate:', cubeYstate );
    };

    // stores the starting coords and push back the cube because it's fancy :)
    var onPointerDown = function( e ) {
        pointer.originX = e.pageX;
        pointer.on = true;
        cube.style.webkitTransform = "translateZ(-420px) rotateY( " + cubeYstate + "deg )";
        cube.style.webkitTransition = "none";
    };

    // calculating degree of the Y axis and rotating the cube
    var onRotate = function( e ) {
        if ( pointer.on === true ) {
            pointer.deltaX = e.pageX - pointer.originX;
            pointer.rotateYdeg = 90 / 640 * pointer.deltaX;
            cube.style.webkitTransform = "translateZ(-420px) rotateY( " + ( cubeYstate + pointer.rotateYdeg ) + "deg )";
        }
    };

    // after the cube has released it should be rotating back to the nearest side
    var onPointerUp = function() {
        cube.style.webkitTransition = "all .3s cubic-bezier( 0,1.2,.75,1.5 )";
        if ( pointer.rotateYdeg > 30 ) {
            cube.style.webkitTransform = "translateZ(-320px) rotateY( " + ( cubeYstate + 90 ) + "deg )";
        } else if ( pointer.rotateYdeg < -30 ) {
            cube.style.webkitTransform = "translateZ(-320px) rotateY( " + ( cubeYstate - 90 ) + "deg )";
        } else {
            cube.style.webkitTransform = "translateZ(-320px) rotateY( " + cubeYstate + "deg )";
        }
        storeCubeState();
        pointer = {
            deltaX: 0,
            originX: 0,
            rotateYdeg: 0,
            on: false
        };
    };


})(window);

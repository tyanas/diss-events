 Reveal.initialize({
                controls: false,
                center: false,
                mouseWheel: true,
                transition: 'linear'});

Reveal.addEventListener( 'slidechanged', function( event ) {
        // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    var cur = Reveal.getIndices();
    if (cur.h == 0 && cur.v == 0) {
        $('.menu').hide();
    } else {
        $('.menu').show();
    }
} );

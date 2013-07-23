 Reveal.initialize({
                controls: false,
                center: false,
                mouseWheel: true,
                transition: 'linear'});

Reveal.addEventListener( 'slidechanged', function( event ) {
        // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    var cur = Reveal.getIndices(),
        slide = Reveal.getCurrentSlide(),
        slide_id = slide.dataset.controller;
    if (!slide_id) {
        $('.menu').hide();
    } else {
        $('.menu a').removeClass('active');
        $('.menu a#' + slide_id).addClass('active');
        $('.menu').show();
    }
} );


(function($){
    $('.menu').on('click',function(event){
        var slide_data = event.target.dataset;
        if (slide_data.length) {
            // ignore clicks outside a
            Reveal.slide(slide_data.h, slide_data.v)
        }
        return false;
    });
})(jQuery);

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
        if (slide_data.h != undefined) {
            // ignore clicks outside a
            Reveal.slide(slide_data.h, slide_data.v)
        }
        return false;
    });
    var fix_height;
    if (!fix_height) {
        fix_height = $('.be-the-first').height();
    }
    $('.be-the-first').on('click', function(event){
        if (event.target.nodeName == 'INPUT') return false;
        event.stopPropagation();
        event.preventDefault();
        if ($(this).hasClass('shown')) {
            $(this).animate({'height': '30px'}, 300);
        } else {
            $(this).animate({'height': '70px'}, 700);
        }
        $(this).toggleClass('shown');
        return false;
    });
})(jQuery);

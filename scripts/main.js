Reveal.initialize({
    controls: false,
    center: false,
    mouseWheel: true,
    transition: 'linear',
    // create 100% width content 
    width: '100%',
    height: '100%',
    margin: 0,
    minScale:1,
});

Reveal.addEventListener( 'slidechanged', function( event ) {
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
    var cur = Reveal.getIndices(),
        slide = Reveal.getCurrentSlide(),
        slide_id = slide.dataset.controller;
    if (slide_id == undefined ) {
        $('.menu').hide();
        $('.be-the-first').hide();
        $('.different').show();
    } else {
        $('.menu a').removeClass('active');
        $('.menu a#' + slide_id).addClass('active');
        $('.menu').show();
        $('.be-the-first').show();
        $('.different').hide();
    }
} );

//Reveal.slide(0,1);

(function($){
    var fix_height;
    function is_valid(email) {
        if (email == undefined) return false;
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(email);
    }
    if (!fix_height) {
        fix_height = $('.be-the-first').height();
    }
    $('.menu').on('click', function(event){
        var slide_data = event.target.dataset;
        if (slide_data.h != undefined) {
            // ignore clicks outside a
            Reveal.slide(slide_data.h, slide_data.v)
        }
        return false;
    });

    $('.be-the-first form').submit(function(event) {
        var mail = $(this).find('[name=mail]').val();
        $('form .info').html('');
        if (is_valid(mail)) {
            var root = new Firebase(this.dataset.action);
            root.push({'mail': mail});

            $('<span>').text('Thanks!').prependTo($('.thanks')).fadeOut(5000);
        } else {
            $('<span class="error">').text('Error in e-mail! Try once more.')
                .prependTo($(".thanks"));
        }
        return false;
    });

    $('.different').on('click', function(event){
        event.stopPropagation();
        Reveal.slide(0,1);
    });

    $('.be-the-first').on('click', function(event){
        if (event.target.nodeName == 'INPUT' || event.target.nodeName == 'LABEL') {
            if (event.target.type == 'submit') {
                $(event.target).parents('form').submit();
            } else if (event.target.type == 'checkbox' || event.target.nodeName == 'LABEL') {
                event.stopPropagation();
                return true;
            }
            return false;
        }
        event.stopPropagation();
        event.preventDefault();
        if ($(this).hasClass('shown')) {
            $(this).animate({'height': '82px'}, 300);
            $('.keep h2').fadeOut();
        } else {
            $(this).animate({'height': '80%'}, 700);
            $('.keep h2').fadeIn();
        }
        $(this).toggleClass('shown');
        return false;
    });



})(jQuery);

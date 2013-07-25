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
        var mail = $(this).find('[name=mail]').val(),
            is_curator = $('form [name=is_curator]').is(':checked');
        $('form .info').html('');
        if (is_valid(mail)) {
            var root = new Firebase(this.dataset.action);
            root.push({'mail': mail, 'is_curator': is_curator});

            $('.thanks .correct').show();
        } else {
            $('.thanks .correct').hide();
            $('.thanks .error').show().fadeOut(4000);
        }
        return false;
    });

    $('.different').on('click', function(event){
        event.stopPropagation();
        Reveal.slide(0,1);
    });

    // click in keep on eye on is area
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
        var bethefirst= $(this);
        event.stopPropagation();
        event.preventDefault();
        if (bethefirst.hasClass('shown')) {
            bethefirst.animate({'height': '82px'}, 300);
            $('.keep h2').fadeIn();
        } else {
            bethefirst.animate({'height': '94%'}, 700);
            $('.keep h2').fadeOut();
        }
        bethefirst.toggleClass('shown');
        return false;
    });



})(jQuery);

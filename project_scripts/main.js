$(document).ready(function() {
  $('.materialboxed').materialbox();
});

$(document).ready(function(){
  $('.scrollspy').scrollSpy()
});


let Markers = {
    fn: {
        addMarkers: function() {
            const target = $('#image-wrapper');
              $('<span class="marker"/>').css({
                  top: 450,
                  left: 450
              }).appendTo(target);
        },
    },
    init: function() {
        this.fn.addMarkers();
    }
};

$(function() {
    Markers.init();

});

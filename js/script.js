// -- Get URL params
var urlParams;
(window.onpopstate = function () {
    var match,
        pl     = /\+/g,  // Regex for replacing addition symbol with a space
        search = /([^&=]+)=?([^&]*)/g,
        decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
        query  = window.location.search.substring(1);

    urlParams = {};
    while (match = search.exec(query))
        urlParams[decode(match[1])] = decode(match[2]);
})();
// --
var border;
var header;
var footer;
var body;
var legend;
var menu;
var news_items;
var popup;
var popup_content;
var popup_content_wrapper;
var portfolio_headers;
var legendOffset = 0;
var menuOffset = 0;
var footerOffset = 0;
$(document).ready(function() {
    border = $(".bordered");
    header = $("#header");
    footer = $("#footer > .container");
    body = $("body");
    popup = $("#fade_wrapper");
    popup_content = popup.find(".content");
    popup_content_wrapper = popup.find(".wrapper");
    portfolio_headers = $(".portfolio_part");

    resize();
    validation($("body"));
    sliding($("body"));

    if ($(window).height() >= 560) {
        body.addClass("active");
        footerOffset = parseInt(footer.css("top"));
        portfolio_headers.each(function () {
            var offset = $(window).height()*0.75;
            $(this).data("offset", offset);
            $(this).css({
                height: $(window).height(),
                marginTop: $(window).height()*0.75 + 100
            });
        });
        if (body.scrollTop > 0 ) {
            body.removeClass("top");
        }
        body.bind('mousewheel', function(event) {
            if ($(event.target).parents("#fade_wrapper").size() == 0 && $(event.target).parents(".map").size() == 0) {
                event.preventDefault();
                console.log(event);
                var tmpDF = event.deltaFactor > 50 ? 50 : event.deltaFactor;
                var nextScrollTop = this.scrollTop - (event.deltaY * tmpDF);
                this.scrollTop = nextScrollTop;
                console.log("nextScrollTop = " + nextScrollTop);
                scrolling(nextScrollTop);
            }
        });
        $(window).on("scroll", function(e) {
            var s = $(window).scrollTop();
            console.log("scroll = " + s);
            scrolling(s);
        });
    }

    header.find(".down_arrow a").on("click", function(e) {
        e.preventDefault();
        var offset = header.height() + header.offset().top - 90;
        body.animate({scrollTop: offset}, 700);
    });

    menu.find(".show_menu a").on("click", function(e) {
        e.preventDefault();
        menu.fadeOut(300);
        $("#fade_menu").fadeIn(300);
    });
    $("#fade_menu .close_menu a").on("click", function(e) {
        e.preventDefault();
        menu.fadeIn(300);
        $("#fade_menu").fadeOut(300);
    });

    news_items.on("click", function(e) {
        if ($(this).data("href") !== undefined) {
            e.preventDefault();
            open_popup($(this).data("href"));
        }
    });
    news_items.find(".background_image img").each(function() {
            var bg_image = $(this);
            var offset_left = bg_image.parent().offset().left;
            var offset_top = bg_image.parent().offset().top;
            var width = bg_image.parent().width();
            var height = bg_image.parent().height();
            var bg_def_width = bg_image.width() - width;
            var bg_def_height = bg_image.height() - height;
            bg_image.closest(".item").on("mousemove", function(e) {
                bg_image.css({
                    marginLeft : -(event.pageX - offset_left + 0.5) * bg_def_width / width,
                    marginTop : -(event.pageY - offset_top) * bg_def_height / height,
                    marginRight : 0,
                    marginBottom : 0
                });
            });
    });

    $(".map").each(function() {
        var map;
        var $this = $(this);
        var address = $this.data("address");
        ymaps.ready(function() {map = show_map($this, address);});
    });

    $("a.popup").on("click", function(e) {
        e.preventDefault();
        open_popup($(this).attr("href"));
    })
    popup.find(".close_button").on("click", function(e) {
        e.preventDefault();
        popup.fadeOut(500);
        body.css({overflow: "auto"});
    });


});

$(window).resize(resize);

function resize() {
    news_items = $(".news_block .item");
    legend = $(".bordered .line span");
    menu = $(".bordered nav");
    legendOffset = parseInt(legend.css("marginTop"));
    menuOffset = parseInt(menu.css("top"));
    news_items.css({height:""});
    if (body.hasClass("active")) {
        portfolio_headers.each(function () {
            var offset = $(window).height()*0.75;
            $(this).data("offset", offset);
            $(this).css({
                height: $(window).height(),
                marginTop: $(window).height()*0.75 + 100
            });
        });
    }
    setTimeout(function(){
        var max_h = 0;
        news_items.each(function() {
            if ($(this).outerHeight() > max_h) {
                max_h = $(this).outerHeight();
            }
        });
        $(".news_block .item").css({height:max_h});
    }, 500);
}

function scrolling(nextScrollTop) {
    if (nextScrollTop <= 0) {
        body.addClass("top");
        legend.css("marginTop", "" );
        menu.css("marginTop", "" );
    } else {
        body.removeClass("top");
        if (nextScrollTop < legendOffset) {
            legend.css("marginTop", legendOffset - nextScrollTop );
        } else {
            legend.css("marginTop", 0 );
        }
        if (nextScrollTop < menuOffset - 110) {
            menu.css("top", menuOffset - nextScrollTop );
            menu.removeClass("short");
        } else {
            menu.css("top", 110 );
            menu.addClass("short");
        }
        if (portfolio_headers.size() > 0) {
            portfolio_headers.each(function (a, b) {
                var header = $(this);
                var offset = parseInt(header.data("offset"));
                console.log("header " + a + " = " + (header.offset().top - offset));
                if (nextScrollTop > header.offset().top - offset) {
                    if (nextScrollTop < header.offset().top) {
                        header.find(".image").css({marginTop: nextScrollTop - header.offset().top });
                    } else {
                        header.find(".image").css({marginTop: 0});
                    }
                } else {
                    header.find(".image").css({marginTop: - offset});
                }
            })
        }
        var footerTop = footer.parent().offset().top;
        if (nextScrollTop <= footerTop) {
            footer.css("top", nextScrollTop - footerTop + 8);
        }
    }
}

function validation(jQObj) {
    var forms = jQObj.find("form");
//*  FORM VALIDATION  *//
    $(document).click(function(e) {
        if ($(e.target).parents('form').size() > 0 || e.target.tagName != 'FORM') {
            forms.find('.error').removeClass('error');
            forms.find("input[type='submit']").removeClass("disabled").removeAttr('disabled');
        }
    });
    $.validator.addMethod('rightphone', function (value, element) {
        if ((value.indexOf("(") + 1) || (value.indexOf(")") + 1) || (value.indexOf("+") + 1) || (value.indexOf("  ") + 1) ) {
            value = value.split("(").join(" ");
            value = value.split(")").join(" ");
            value = value.split("+").join(" ");
            value = value.split("  ").join(" ");
            element.value = value;
        }
        return this.optional(element) || /^[\d +]{5,20}$/.test(value);
    }, "Please enter a valid phone number");
    forms.validate({
        submitHandler: function(form) {
        },
        errorPlacement: function(error, element) { return;},
        highlight: function(element, errorClass, validClass) {
            $(element).addClass(errorClass).removeClass(validClass);
            $(element).parent().addClass(errorClass).removeClass(validClass);
            $(element).parents('form').find("input[type='submit']").addClass("disabled").attr('disabled','disabled');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass);
            $(element).parent().removeClass(errorClass);
            $(element).parents('form').find("input[type='submit']").removeClass("disabled").removeAttr('disabled');
            if (element.validity.valid) {
                $(element).addClass(validClass);
                $(element).parent().addClass(validClass);
            }
        },
        invalidHandler: function(event, validator) {},
        messages: {
            phone: {required: "", rightphone: ""}
        },
        rules: {
            phone: {
                required:true,
                rightphone: true
            }
        },
        onclick:    true,
        focusInvalid:   false,
        focusCleanup:   true,
        onfocusout: false
    });
}

function sliding(jQObj) {
    jQObj.find(".slider_wrapper .slider").each(function() {
        var slider = $(this);
        var wrapper = $(this).closest(".slider_wrapper");
        slider.find(".item").width(wrapper.width());
        var height = 0;
        var carousel = slider.carouFredSel({
            width: wrapper.width(),
            height: "auto",
            items: {
                visible: 1,
                width: wrapper.width()
            },
            auto: false,
            prev: wrapper.find(".prev"),
            next: wrapper.find(".next"),
            scroll: {
                items: 1,
                fx: "crossfade",
                onBefore: function( data ) {
                    var current = $(this).triggerHandler( 'currentPosition' );
                    wrapper.find(".pagenumber span").text( current+1 );
                }
            },
            onCreate: function( data ) {
                var current = $(this).triggerHandler( 'currentPosition' );
                wrapper.find(".pagenumber span").text( current+1 );
            }
        });
        slider.find("img").on("load", function() {
            var new_height = $(this).height();
            if (height < new_height) {
                height = new_height;
                carousel.trigger("configuration", ["height", "auto", true]);
            }
        });
    });
}

function show_map(jQobj, address) {
    var map = new ymaps.Map(jQobj[0], { center: [0, 0], zoom: 17, controls: ['zoomControl',  'fullscreenControl'] });
    map.container.fitToViewport();
    ymaps.geocode(address, { results: 1 })
        .then(function (res) {
            var firstGeoObject = res.geoObjects.get(0),
                coords = firstGeoObject.geometry.getCoordinates(),
                bounds = firstGeoObject.properties.get('boundedBy');
            firstGeoObject.options.balloonIconImageHref = "/img/pin.png";
            firstGeoObject.options.iconImageHref = "/img/pin.png";
            map.geoObjects.add(new ymaps.Placemark(coords, {
                balloonContent: 'текст <strong>точки</strong>'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'img/pin.png',
                iconImageSize: [33, 33],
                iconImageOffset: [-12, -30]
            }));
            map.setBounds(bounds, { checkZoomRange: false });
            map.setZoom(17);
        });
    return map;
}

function open_popup(href) {
    body.css({overflow: "hidden"});
    popup_content_wrapper.css({marginTop: -$(window).height()});
    popup.fadeIn(500);
    $.ajax({
        url: href,
        type: "GET",
        dataType: "html",
        success: function(data){
            console.log("Content: ", $(data).filter("#content").html());
            popup_content.html($(data).filter("#content").html());
            validation(popup_content);
            sliding(popup_content);
            popup_content_wrapper.animate({marginTop: ($(window).height() - popup_content_wrapper.height())/2}, 500);
        }
    })
}
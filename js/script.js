var border;
var header;
var body;
var legend;
var menu;
var news_items;
var portfolio_headers;
var legendOffset = 0;
var menuOffset = 0;
var jscroll_activated = false;
var fancybox_options = {
    maxWidth	: $(window).width() - 120,
    maxHeight	: $(window).height() - 50,
    type        : 'ajax',
    fitToView	: true,
    autoSize	: true,
    closeClick	: false,
    padding     : 0,
    arrows      : true,
    openEffect	: 'elastic',
    closeEffect	: 'elastic',
    openMethod	: 'changeIn',
    //closeMethod	: 'changeOut',
    helpers:  {overlay : {locked     : false}},
    afterLoad   : afterLoad,
    afterShow   : afterShow,
    beforeClose : beforeClose,
    afterClose: function() {window.location.hash = "main";}
};
var hash = window.location.hash;
$(document).ready(function() {
    border = $(".bordered");
    header = $("#header");
    body = $("#body");

    resize();
    validation($("body"));
    sliding($("body"));
    placeholded($("body"));

    // modal window
    if (hash != "" && hash != "#" && hash != "#main") {
        var href = hash.substring(1);
        $.fancybox( href, fancybox_options);
    }

    if ($("#index_portfolio").size() > 0) {
        setTimeout(function() {
            new Masonry( '#index_portfolio .row', {
                columnWidth: ".sizer",
                itemSelector: ".item_wrapper"
            });
        }, 500)
    }

    if ($(window).height() >= 560) {
        body.addClass("active");
		scrolling($(document).scrollTop());
        $(document).bind('mousewheel', function(event) {
            if ($(event.target).parents("#fade_wrapper").size() == 0 && $(event.target).parents(".map").size() == 0) {
                //console.log(event);
                var nextScrollTop = $(document).scrollTop() - (event.deltaY * event.deltaFactor);
                //console.log("nextScrollTop = " + nextScrollTop);
                scrolling(nextScrollTop);
            }
        });
        $(document).on("scroll", function(e) {
            var s = $(document).scrollTop();
            //console.log("scroll = " + s);
            scrolling(s);
        });
    }

    border.find(".down_arrow a").on("click", function(e) {
        e.preventDefault();
        var offset = header.height() + header.offset().top;
        $(document).animate({scrollTop: offset}, 700);
    });

    menu.find(".show_menu a").on("click", function(e) {
        e.preventDefault();
        menu.fadeOut(300, function () {
            $("#fade_menu").fadeIn(300);
        });
    });
    $("#fade_menu .close_menu a").on("click", function(e) {
        e.preventDefault();
        $("#fade_menu").fadeOut(300, function () {
            menu.fadeIn(300);
        });
    });

/*
    news_items.on("click", function(e) {
        if ($(this).data("href") !== undefined) {
            e.preventDefault();
            open_popup($(this).data("href"));
        }
    });
*/
    news_items.fancybox(fancybox_options);

    news_items.find(".background_image img").each(function() {
        var bg_image = $(this);
        bg_image.closest(".item").on("mousemove", function(event) {
            var offset_left = bg_image.parent().offset().left;
            var offset_top = bg_image.parent().offset().top;
            var width = bg_image.parent().width();
            var height = bg_image.parent().height();
            var bg_def_width = bg_image.width() - width;
            var bg_def_height = bg_image.height() - height;
            //console.log({left:-(event.pageX - offset_left + 0.5), offsetLeft:offset_left, eventLeft: event.pageX});
            //console.log({top:-(event.pageY - offset_top), offsetTop:offset_top, eventTop: event.pageY});
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
    });

    $("#news .more_button a").on('click', function(e) {
        e.preventDefault();
        var $this = $(this).closest(".more_button");
        var page = $(this).data('page') !== undefined ? parseInt($(this).data('page')) + 1 : 1;
        $(this).data('page', page);
        $.ajax({
            url: window.location.href,
            data: "page="+page,
            type: "html",
            success: function(data) {
                var items_wrapper = $(data).find("#news .row").addClass("page_"+page).hide();
                $this.before(items_wrapper);
                $("#news .page_" +page).slideDown(500);
                var items = $("#news .page_" +page+" .item");
                var max_h = 0;
                items.each(function() {
                    if ($(this).outerHeight() > max_h) {
                        max_h = $(this).outerHeight();
                    }
                });
                items.css({height:max_h});
                items.fancybox(fancybox_options);
                items.find(".background_image img").each(function() {
                    var bg_image = $(this);
                    bg_image.closest(".item").on("mousemove", function(event) {
                        var offset_left = bg_image.parent().offset().left;
                        var offset_top = bg_image.parent().offset().top;
                        var width = bg_image.parent().width();
                        var height = bg_image.parent().height();
                        var bg_def_width = bg_image.width() - width;
                        var bg_def_height = bg_image.height() - height;
                        bg_image.css({
                            marginLeft : -(event.pageX - offset_left + 0.5) * bg_def_width / width,
                            marginTop : -(event.pageY - offset_top) * bg_def_height / height,
                            marginRight : 0,
                            marginBottom : 0
                        });
                    });
                });
            }
        })
    });
});

$(window).resize(resize);

function resize() {
    fancybox_options.maxWidth = $(window).width() - 120;
    fancybox_options.maxHeight = $(window).height() - 120;
    news_items = $(".news_block .item");
    legend = $(".bordered .line span");
    menu = $(".bordered nav");
    portfolio_headers = $(".portfolio_part");

    legendOffset = parseInt(legend.css("marginTop"));
    //console.log("LegendOffset = ", legendOffset);
    menuOffset = $(window).height()/2;
    //console.log("MenuOffset = ", menuOffset);
    news_items.css({height:""});
    portfolio_headers.each(function () {
        var offset = $(window).height()*0.75;
        $(this).data("offset", offset);
        $(this).find(".image").css({marginTop: - offset});
        $(this).css({
            height: $(window).height(),
            marginTop: offset
        });
    });
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
        nextScrollTop = 0;
        body.addClass("top");
        legend.css("marginTop", "" );
        menu.css("top", "" );
        if (portfolio_headers.size() > 0) {
            portfolio_headers.each(function () {
                var header = $(this);
                var offset = parseInt(header.data("offset"));
                header.find(".image").css({marginTop: -offset});
            });
        }
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
            portfolio_headers.each(function () {
                var header = $(this);
                var offset = parseInt(header.data("offset"));
                var marginTop = -offset;
                //console.log("header " + a + " = " + (header.offset().top - offset));
                if ((nextScrollTop > header.offset().top - offset) && (nextScrollTop > 0)) {
                    console.log("NextScrollTop: ", nextScrollTop);
                    if (nextScrollTop < header.offset().top) {
                        marginTop = nextScrollTop - header.offset().top;
                        console.log(marginTop);
                    } else {
                        marginTop = 0;
                    }
                }
                header.find(".image").css({marginTop: marginTop});
            })
        }
    }
}

function validation(jQObj) {
    var forms = jQObj.find("form");
//*  FORM VALIDATION  *//
    $(document).click(function(e) {
        if ($(e.target).parents('form').size() > 0 || e.target.tagName != 'FORM') {
            forms.find('.error').removeClass('error');
            forms.find('.valid').removeClass('valid');
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
            $(element).removeClass(validClass).addClass(errorClass);
            $(element).parent().removeClass(validClass).addClass(errorClass);
            $(element).parents('form').find("input[type='submit']").addClass("disabled").attr('disabled','disabled');
        },
        unhighlight: function(element, errorClass, validClass) {
            $(element).removeClass(errorClass).removeClass(validClass);
            $(element).parent().removeClass(errorClass).removeClass(validClass);
            $(element).parents('form').find("input[type='submit']").removeClass("disabled").removeAttr('disabled');
            if (element.validity.valid) {
                $(element).addClass(validClass);
                $(element).parent().addClass(validClass);
            }
        },
        invalidHandler: function(event, validator) {},
        messages: {
            phone: "",
            name: ""
        },
        rules: {
            phone: {
                required:true,
                minlength: 5
            },
            name: {
                required: true,
                minlength: 4
            }
        },
        onclick:    false,
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
        slider.on("click", function() {
            carousel.trigger("next");
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

function placeholded(JQObj) {
    JQObj.find("input, textarea").each(function() {
        var $this = $(this);
        $this.addClass("blur");
        var parent = $(this).parent();
        var text = $(this).attr("placeholder");
        $(this).attr("placeholder", "").val(text);
        var placeholder = "<div class='placeholded_text'>"+ text +"</div>";
        $this.on("focus", function() {
            if ($this.val() == "" || $this.val() == text) {
                parent.append(placeholder);
                $this.addClass("focus").removeClass("blur").val("");
                setTimeout(function() {
                    parent.find(".placeholded_text").addClass("animated");
                }, 10);
            }
        }).on("blur", function() {
            if ($this.val() == "" || $this.val() == text) {
                parent.find(".placeholded_text").removeClass("animated");
                $this.removeClass("focus").addClass("blur");
                setTimeout(function() {
                    parent.find(".placeholded_text").remove();
                    $this.val(text);
                }, 300);
            }
        })
    });
}
function open_popup(href) {
    $.fancybox.close();
    $.fancybox.showLoading();
    $.fancybox( href, fancybox_options);
}

function afterShow() {
    if (!jscroll_activated) {
        $(".fancybox-inner").jScrollPane({
            showArrows: false,
            arrowScrollOnHover: true,
            autoReinitialise: true,
            animateScroll: false,
            mouseWheelSpeed: 30
        });
        //jscroll_activated = true;
    }
    $(".fancybox-inner a.popup").on("click", function(e) {
        e.preventDefault();
        open_popup($(this).attr("href"));
    });
    validation($(".fancybox-inner"));
    sliding($(".fancybox-inner"));
    placeholded($(".fancybox-inner"));
}
function afterLoad() {
    var content = $(this.content).find("#content").html();
    this.content = content;
    window.location.hash = this.href;
    //console.log("write hash", hash);
}

function beforeClose() {
    //console.log("remove hash", hash);
}
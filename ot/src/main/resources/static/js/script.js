(function ($) {

    "use strict";

    //Hide Loading Box (Preloader)
    function handlePreloader() {
        if ($('.preloader').length) {
            $('.preloader').delay(200).fadeOut(500);
        }
    }


    //Update Header Style and Scroll to Top
    function headerStyle() {
        if ($('.main-header').length) {
            var windowpos = $(window).scrollTop();
            var siteHeader = $('.main-header');
            var scrollLink = $('.scroll-to-top');
            if (windowpos >= 1) {
                siteHeader.addClass('fixed-header');
                scrollLink.fadeIn(300);
            } else {
                siteHeader.removeClass('fixed-header');
                scrollLink.fadeOut(300);
            }
        }
    }

    headerStyle();


    //Mobile Nav Hide Show
    if ($('.mobile-menu').length) {

        //$('.mobile-menu .menu-box').mCustomScrollbar();

        var mobileMenuContent = $('.main-header .nav-outer .main-menu').html();
        $('.mobile-menu .menu-box .menu-outer').append(mobileMenuContent);
        $('.sticky-header .main-menu').append(mobileMenuContent);

        //Dropdown Button
        $('.mobile-menu li.dropdown .dropdown-btn').on('click', function () {
            $(this).toggleClass('open');
            $(this).prev('ul').slideToggle(500);
        });

        //Menu Toggle Btn
        $('.mobile-nav-toggler').on('click', function () {
            $('body').addClass('mobile-menu-visible');
        });

        // Menu Toggle Btn
        $('.mobile-menu .menu-backdrop,.mobile-menu .close-btn').on('click', function () {
            $('body').removeClass('mobile-menu-visible');
        });

        // Dark Layout Button
        $('.dark-mode .dark-buttons .on').on('click', function () {
            $('.round').addClass('boll-right');
            $('body').addClass('dark-body');
            localStorage.setItem('mode', "dark");
        });

        // Dark Layout Button
        $('.dark-mode .dark-buttons .off').on('click', function () {
            $('.round').removeClass('boll-right');
            $('body').removeClass('dark-body');
            localStorage.setItem('mode', "light");
        });

        let mode = localStorage.getItem('mode');
        if (mode == 'dark') {
            $('.round').addClass('boll-right');
            $('body').addClass('dark-body');
        } else {
            $('.round').removeClass('boll-right');
            $('body').removeClass('dark-body');
            localStorage.setItem('mode', "light");
        }
    }


    //Demo js
    // $( window ).on( "load", function() {
    // 		document.onkeydown = function(e) {
    // 			if(e.keyCode == 123) {
    // 			return false;
    // 		}
    // 		if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
    // 			return false;
    // 		}
    // 		if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
    // 			return false;
    // 		}
    // 		if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
    // 			return false;
    // 		}
    //
    // 		if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)){
    // 			return false;
    // 		}
    // 	};
    //
    // 	$("html").on("contextmenu",function(){
    // 		return false;
    // 	});
    // });


    //Hidden Sidebar
    if ($('.hidden-bar').length) {
        var hiddenBar = $('.hidden-bar');
        var hiddenBarOpener = $('.hidden-bar-opener');
        var hiddenBarCloser = $('.hidden-bar-closer');
        //$('.hidden-bar-wrapper').mCustomScrollbar();
        $('.hidden-bar .side-menu ul li.dropdown').append('<div class="dropdown-btn"><span class="arrow_carrot-down"></span></div>');

        //Hide Sidebar
        hiddenBarCloser.on('click', function () {
            hiddenBar.removeClass('visible-sidebar');
            $('.hidden-bar-opener').removeClass('custom_opener');
            $('.sidenav-list').removeClass('custom_left_sidebar');
            $('.page-wrapper').removeClass('padding_left');
        });

        hiddenBarOpener.on('click', function (e) {
            if (hiddenBarOpener.hasClass('custom_opener')) {
                hiddenBar.removeClass('visible-sidebar');
                $('.hidden-bar-opener').removeClass('custom_opener');
                $('.sidenav-list').removeClass('custom_left_sidebar');
                $('.page-wrapper').removeClass('padding_left');
            } else {
                hiddenBar.addClass('visible-sidebar');
                $('.sidenav-list').addClass('custom_left_sidebar');
                $('.hidden-bar-opener').addClass('custom_opener');
                $('.page-wrapper').addClass('padding_left');
            }
        });

        $('.color-layer').on('click', function (e) {
            hiddenBar.removeClass('visible-sidebar');
            $('.hidden-bar-opener').removeClass('custom_opener');
            $('.sidenav-list').removeClass('custom_left_sidebar');
            $('.page-wrapper').removeClass('padding_left');
        })

    }


    //Parallax Scene for Icons
    if ($('.parallax-scene-1').length) {
        var scene = $('.parallax-scene-1').get(0);
        var parallaxInstance = new Parallax(scene);
    }
    if ($('.parallax-scene-2').length) {
        var scene = $('.parallax-scene-2').get(0);
        var parallaxInstance = new Parallax(scene);
    }
    if ($('.parallax-scene-3').length) {
        var scene = $('.parallax-scene-3').get(0);
        var parallaxInstance = new Parallax(scene);
    }
    if ($('.parallax-scene-4').length) {
        var scene = $('.parallax-scene-4').get(0);
        var parallaxInstance = new Parallax(scene);
    }
    if ($('.parallax-scene-5').length) {
        var scene = $('.parallax-scene-5').get(0);
        var parallaxInstance = new Parallax(scene);
    }


    // Submenu Dropdown Toggle
    if ($('.main-header li.dropdown ul').length) {
        $('.main-header li.dropdown').append('<div class="dropdown-btn"><span class="fa fa-angle-down"></span></div>');

        //Dropdown Button
        $('.main-header li.dropdown .dropdown-btn').on('click', function () {
            $(this).prev('ul').slideToggle(500);
        });

        //Disable dropdown parent link
        $('.main-header .navigation li.dropdown > a,.hidden-bar .side-menu li.dropdown > a').on('click', function (e) {
            e.preventDefault();
        });

        //Main Menu Fade Toggle
        $('.main-header .nav-toggler').on('click', function () {
            $('.main-header .main-menu').fadeToggle(300);
        });
    }


    //Custom Seclect Box

    setTimeout(() => {
        if ($('.custom-select-box').length) {
            $('.custom-select-box').selectmenu('menuWidget').addClass('overflow');
        }
    }, 500);


    //Jquery Spinner / Quantity Spinner
    if ($('.quantity-spinner').length) {
        $("input.quantity-spinner").TouchSpin({
            verticalbuttons: true
        });
    }


    //Progress Bar
    if ($('.progress-line').length) {
        $('.progress-line').appear(function () {
            var el = $(this);
            var percent = el.data('width');
            $(el).css('width', percent + '%');
        }, {accY: 0});
    }


    //Fact Counter + Text Count
    if ($('.count-box').length) {
        $('.count-box').appear(function () {

            var $t = $(this),
                n = $t.find(".count-text").attr("data-stop"),
                r = parseInt($t.find(".count-text").attr("data-speed"), 10);

            if (!$t.hasClass("counted")) {
                $t.addClass("counted");
                $({
                    countNum: $t.find(".count-text").text()
                }).animate({
                    countNum: n
                }, {
                    duration: r,
                    easing: "linear",
                    step: function () {
                        $t.find(".count-text").text(Math.floor(this.countNum));
                    },
                    complete: function () {
                        $t.find(".count-text").text(this.countNum);
                    }
                });
            }

        }, {accY: 0});
    }


    // Accordion Box
    if ($('.accordion-box').length) {
        $(".accordion-box").on('click', '.acc-btn', function () {

            var outerBox = $(this).parents('.accordion-box');
            var target = $(this).parents('.accordion');

            if ($(this).hasClass('active') !== true) {
                $(outerBox).find('.accordion .acc-btn').removeClass('active');
            }

            if ($(this).next('.acc-content').is(':visible')) {
                return false;
            } else {
                $(this).addClass('active');
                $(outerBox).children('.accordion').removeClass('active-block');
                $(outerBox).find('.accordion').children('.acc-content').slideUp(300);
                target.addClass('active-block');
                $(this).next('.acc-content').slideDown(300);
            }
        });
    }


    //Tabs Box
    if ($('.tabs-box').length) {
        $('.tabs-box .tab-buttons .tab-btn').on('click', function (e) {
            e.preventDefault();
            var target = $($(this).attr('data-tab'));

            if ($(target).is(':visible')) {
                return false;
            } else {
                target.parents('.tabs-box').find('.tab-buttons').find('.tab-btn').removeClass('active-btn');
                $(this).addClass('active-btn');
                target.parents('.tabs-box').find('.tabs-content').find('.tab').fadeOut(0);
                target.parents('.tabs-box').find('.tabs-content').find('.tab').removeClass('active-tab');
                $(target).fadeIn(300);
                $(target).addClass('active-tab');
            }
        });
    }


    // Single Item Carousel
    if ($('.single-item-carousel').length) {
        $('.single-item-carousel').owlCarousel({
            loop: true,
            margin: 0,
            nav: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1024: {
                    items: 1
                },
                1200: {
                    items: 1
                },
                1500: {
                    items: 1
                }
            }
        });
    }


    // Three Item Carousel
    if ($('.three-item-carousel').length) {
        $('.three-item-carousel').owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                800: {
                    items: 2
                },
                1024: {
                    items: 2
                },
                1200: {
                    items: 3
                },
                1500: {
                    items: 3
                }
            }
        });
    }


    // Featured Carousel
    if ($('.featured-carousel').length) {
        $('.featured-carousel').owlCarousel({
            loop: true,
            margin: 10,
            nav: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: 3
                },
                600: {
                    items: 4
                },
                800: {
                    items: 4
                },
                1024: {
                    items: 4
                },
                1200: {
                    items: 3
                },
                1500: {
                    items: 3
                }
            }
        });
    }


    // Testimonial Carousel
    if ($('.testimonial-carousel').length) {
        $('.testimonial-carousel').owlCarousel({
            loop: true,
            margin: 20,
            nav: true,
            autoHeight: true,
            smartSpeed: 500,
            autoplay: 6000,
            navText: ['<span class="fa fa-angle-left"></span>', '<span class="fa fa-angle-right"></span>'],
            responsive: {
                0: {
                    items: 1
                },
                600: {
                    items: 2
                },
                800: {
                    items: 2
                },
                1024: {
                    items: 2
                },
                1200: {
                    items: 2
                },
                1500: {
                    items: 2
                }
            }
        });
    }


    // Event Countdown Timer
    if ($('.time-countdown').length) {
        $('.time-countdown').each(function () {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function (event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><span class="count">%D</span>Days</div> ' + '<div class="counter-column"><span class="count">%H</span>Hours</div>  ' + '<div class="counter-column"><span class="count">%M</span>Minutes</div>  ' + '<div class="counter-column"><span class="count">%S</span>Seconds</div>'));
            });
        });
    }


    //Event Countdown Timer
    if ($('.time-countdown-two').length) {
        $('.time-countdown-two').each(function () {
            var $this = $(this), finalDate = $(this).data('countdown');
            $this.countdown(finalDate, function (event) {
                var $this = $(this).html(event.strftime('' + '<div class="counter-column"><span class="count">%M</span></div>  ' + '<div class="counter-column"><span class="count">%S</span></div>'));
            });
        });
    }


    //LightBox / Fancybox
    if ($('.lightbox-image').length) {
        $('.lightbox-image').fancybox({
            openEffect: 'fade',
            closeEffect: 'fade',
            helpers: {
                media: {}
            }
        });
    }


    // Scroll to a Specific Div
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function () {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1500);

        });
    }


    // Elements Animation
    if ($('.wow').length) {
        var wow = new WOW(
            {
                boxClass: 'wow',      // animated element css class (default is wow)
                animateClass: 'animated', // animation css class (default is animated)
                offset: 0,          // distance to the element when triggering the animation (default is 0)
                mobile: true,       // trigger animations on mobile devices (default is true)
                live: true       // act on asynchronously loaded content (default is true)
            }
        );
        wow.init();
    }


    /* ==========================================================================
       When document is Scrollig, do
       ========================================================================== */

    $(window).on('scroll', function () {
        headerStyle();
    });

    /* ==========================================================================
       When document is loading, do
       ========================================================================== */

    $(window).on('load', function () {
        handlePreloader();
    });

})(window.jQuery);

jQuery(document).on('click', '.btn.btn-default.dropdown-toggle', function () {
    jQuery(this).parent().toggleClass('dropdown-active');
});

var ignoreClickOnMeElement5 = document.getElementById('someElementID5');

document.addEventListener('click', function (event) {
    var isClickInsideElement5 = ignoreClickOnMeElement5.contains(event.target);

    if (!isClickInsideElement5) {
        $('.btn.btn-default.dropdown-toggle').parent().removeClass('dropdown-active');
    }
});

if (user != null) {
    let li = `                      <li><a href="/logout">Logout</a></li>
                                    <li><a href="/contact">Contact Us</a></li>`;

    $("#pages-hrefs").html(li);
} else {
    let li = `                     <li><a href="/register">Sign Up as a teacher</a></li>
                                   <li><a href="/student/register">Sign Up as a student</a></li>
                                    <li><a href="/login">Sign In</a></li>                                    
                                    <li><a href="/contact">Contact Us</a></li>`;

    $("#pages-hrefs").html(li);
}

if(user != null && user.userType == "TEACHER"){
    let li = `<li><a href="/teacherProfile">Account</a></li>`;
    $("#pages-hrefs").append(li);
}else if(user != null && user.userType == "STUDENT"){
    let li = `<li><a href="/studentProfile">Account</a></li>`;
    $("#pages-hrefs").append(li);
}


//Page data for all pages
let countryArrayList = [];
const allCounriesUrl = "/pageData/all/countries";
const allSubjectTaughtsUrl = "/pageData/all/subjectTaught";
const topSubjectTaughtUrl = "/pageData/top/subjectTaught";
const getMaxHourlyRateUrl = "/pageData/getMaxHourRate";

function sendGetRequest(method, url) {
    const headers = {
        'Content-Type': 'application/json'
    };
    return fetch(url, {
        method: method,
        headers: headers
    }).then(response => {
        if (!response.ok) {
            return response.status;
        }
        return response.json();
    });
}


function getAllCountries() {

    let wrapper = $("#multyCheck");
    wrapper.empty();
    sendGetRequest("GET", allCounriesUrl).then(
        data => data.forEach(country => {
            let div = `<div style="display: flex; align-items: center">
                                <input class="countryCheckBox" type="checkbox" id="${country.id}" value="${country.id}">
                                <label>${country.countryName}</label>
                            </div>`;
            $(wrapper).append(div);


        })
    ).catch();
}


function getAllSubjectTaughts() {
    let wrapper = $("#subjectTaughtOptions");
    let mainOption = `<option value="0">Select a course</option>`;
    wrapper.empty();
    $(wrapper).append(mainOption);
    sendGetRequest("GET", allSubjectTaughtsUrl).then(
        data => data.forEach((subjectTaught) => {
            let option = `<option value="${subjectTaught.id}">${subjectTaught.subjectTaught}</option>`;
            $(wrapper).append(option);


        })
    ).catch();
}




$(document).on("click", ".countryCheckBox", function () {
    $("#subjectTitle").css("display", "none");

    if (countryArrayList.includes($(this).next().text())) {

        for (let i = 0; i < countryArrayList.length; i++) {
            if (countryArrayList[i] === $(this).next().text()) {
                countryArrayList.splice(i, 1);
            }
        }
    } else {
        countryArrayList.push($(this).next().text());
    }

});

function getTopSubjectTaughts() {
    let ul = $("#top-subjects");
    sendGetRequest("GET", topSubjectTaughtUrl).then(
        data =>
            data.forEach(li => {
                let el = `<li><a href="/subjectTaught/${li.id}">${li.subjectTaught}</a></li>`;

                $(ul).append(el);
            })
    ).catch();
}

let wrapper = $("#by-filter");
$("#subjectTaughtOptions").change(function () {
    $("#subjectTitle").css("display", "none");
    $(wrapper).empty();
    let subjectTaught = $("#subjectTaughtOptions option:selected").text();
    let min = $("#myRangeStart").val();
    let max = $("#myRangeTo").val();
    let hasData = false;



        if (countryArrayList.length > 0) {

            $(countryArrayList).each(function (j, element) {
                let url = "/pageData/filter?subjectTaught.subjectTaught=" + subjectTaught + "&hourlyRate=" + min + "&hourlyRate=" + max + "&country.countryName=" + element;
                $(wrapper).css("display", "flex");

                sendGetRequest("GET", url).then(
                    data => {
                        if (data.length !== 0) {
                            $(data).each(function (i, e) {
                                let image = e.avatar;
                                let imageb;
                                if(image.startsWith('"')){
                                    let imagea = image.substring(0);
                                    imageb = imagea.substring(imagea.length-1, 1);
                                }else{
                                    imageb = e.avatar;
                                }


                                if(e.surname!=null){
                                    let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                                <div class="inner-box">
                                    <div class="image">
                                        <a href="/course-detail?id=${e.id}"><img src="/userImage?image=${imageb}" /></a>
                                    </div>
                                <div class="name"><a href="/course-detail?id=${e.id}">${e.name} su</a></div>
                                <div class="designation"><b>${e.subjectTaught.subjectTaught}</b></div>
                                <div class="text">${e.userDescription.substring(0,120)}...</div>
                                <div class="courses">${e.subjectTaught.count} order(s)</div></div>
                            </div>`;
                                    $(wrapper).append(div);
                                }else{
                                    let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                                <div class="inner-box">
                                    <div class="image">
                                        <a href="/course-detail?id=${e.id}"><img src="/userImage?image=${imageb}" /></a>
                                    </div>
                                <div class="name"><a href="/course-detail?id=${e.id}">${e.name}</a></div>
                                <div class="designation"><b>${e.subjectTaught.subjectTaught}</b></div>
                                <div class="text">${e.userDescription.substring(0,120)}...</div>
                                <div class="courses">${e.subjectTaught.count} order(s)</div></div>
                            </div>`;
                                    $(wrapper).append(div);
                                }
                            });
                            hasData = true;
                        } else {
                            $(wrapper).empty();
                            $(wrapper).append("<h3>No information  satisfying your request</h3>");
                        }
                    }
                ).catch();

            });

        }else{
            let url = "/pageData/filter?subjectTaught.subjectTaught=" + subjectTaught + "&hourlyRate=" + min + "&hourlyRate=" + max + "&country.countryName=";
            $(wrapper).css("display", "flex");
            sendGetRequest("GET", url).then(
                data => {
                    if (data.length !== 0) {
                         hasData = true;
                        $(data).each(function (i, e) {

                            let image = e.avatar;
                            let imageb;
                            if(image.startsWith('"')){
                                let imagea = image.substring(0);
                                imageb = imagea.substring(imagea.length-1, 1);
                            }else{
                                imageb = e.avatar;
                            }


                            let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                                <div class="inner-box">
                                    <div class="image">
                                        <a href="/course-detail?id=${e.id}"><img src="/userImage?image=${imageb}" alt="${e.name}" /></a>
                                    </div>
                                <div class="name"><a href="/course-detail?id=${e.id}">${e.name}</a></div>
                                <div class="designation"><b>${e.subjectTaught.subjectTaught}</b></div>
                                <div class="text">${e.userDescription.substring(0,120)}...</div>
                                <div class="courses">${e.subjectTaught.count} order(s)</div></div>
                            </div>`;
                            $(wrapper).append(div);
                        });

                    } else {
                        $(wrapper).empty();
                        $(wrapper).append("<h3>No information  satisfying your request</h3>");
                    }
                }
            ).catch();
        }




    // setTimeout(()=>{
    //     if($(!wrapper).children().length == 0){
    //
    //     }
    // }, 500);

});


if (window.location.pathname != "/") {

    if (!window.location.pathname.startsWith("/subjectTaught")) {
        $(".top-middle-header").css("display", "none");
    }
}

if(window.location.pathname == "/contact"){
    $(".search-box").css("display", "none");
}

if(window.location.pathname == "/course-detail"){
    $(".search-box").css("display", "none");
}

if(window.location.pathname == "/teacherProfile"){
    $(".search-box").css("display", "none");
}

if (window.location.pathname == "/studentProfile") {
    $(".search-box").css("display", "none");
}
if (window.location.pathname == "/feedback") {
    $(".search-box").css("display", "none");
}

if (window.location.pathname.substring(0,19) == "/editStudentAccount") {
    $(".search-box").css("display", "none");
}
if (window.location.pathname.substring(0,12) == "/editAccount") {
    $(".search-box").css("display", "none");
}



$("#multyCheck").change(function () {
    $(wrapper).empty();
    let subjectTaught = $("#subjectTaughtOptions option:selected").text();
    if(subjectTaught === "Select a course"){
        subjectTaught = "";
    }
    let min = $("#myRangeStart").val();
    let max = $("#myRangeTo").val();

        if (countryArrayList.length > 0) {
            $(countryArrayList).each(function (j, element) {

                let url = "/pageData/filter?subjectTaught.subjectTaught=" + subjectTaught + "&hourlyRate=" + min + "&hourlyRate=" + max +"&country.countryName=" + element;
                $(wrapper).css("display", "flex");

                sendGetRequest("GET", url).then(
                    data => {
                        if (data.length !== 0) {

                            $(data).each(function (i, e) {

                                let image = e.avatar;
                                let imageb;
                                if(image.startsWith('"')){
                                    let imagea = image.substring(0);
                                    imageb = imagea.substring(imagea.length-1, 1);
                                }else{
                                    imageb = e.avatar;
                                }


                                if(e.surname!=null){
                                    let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                                <div class="inner-box">
                                    <div class="image">
                                        <a href="/course-detail?id=${e.id}"><img src="/userImage?image=${imageb}" /></a>
                                    </div>
                                <div class="name"><a href="/course-detail?id=${e.id}">${e.name} ${e.surname}</a></div>
                                <div class="designation"><b>${e.subjectTaught.subjectTaught}</b></div>
                                <div class="text">${e.userDescription.substring(0,120)}...</div>
                                <div class="courses">${e.subjectTaught.count} order(s)</div></div>
                            </div>`;
                                    $(wrapper).append(div);
                                }else{
                                    let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                                <div class="inner-box">
                                    <div class="image">
                                        <a href="/course-detail?id=${e.id}"><img src="/userImage?image=${imageb}" /></a>
                                    </div>
                                <div class="name"><a href="/course-detail?id=${e.id}">${e.name}</a></div>
                                <div class="designation"><b>${e.subjectTaught.subjectTaught}</b></div>
                                <div class="text">${e.userDescription.substring(0,120)}...</div>
                                <div class="courses">${e.subjectTaught.count} order(s)</div></div>
                            </div>`;
                                    $(wrapper).append(div);
                                }
                            });
                            hasData = true;
                        } else {
                            $(wrapper).empty();
                            $(wrapper).append("<h3>No information  satisfying your request</h3>");
                        }
                    }
                ).catch();

            });

        }else{
            $(wrapper).empty();
            let url = "/pageData/filter?subjectTaught.subjectTaught=" + subjectTaught + "&hourlyRate=" + min + "&hourlyRate=" + max +"&country.countryName=";
            $(wrapper).css("display", "flex");
            sendGetRequest("GET", url).then(
                data => {
                    if (data.length !== 0) {
                        hasData = true;
                        $(data).each(function (i, e) {
                            let image = element.teacherAvatar;
                            let imageb;
                            if(image.startsWith('"')){
                                let imagea = image.substring(0);
                                imageb = imagea.substring(imagea.length-1, 1);
                            }else{
                                imageb = element.teacherAvatar;
                            }
                            let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                                <div class="inner-box">
                                    <div class="image">
                                        <a href="/course-detail?id=${e.id}"><img src="/userImage?image=${imageb}" /></a>
                                    </div>
                                <div class="name"><a href="/course-detail?id=${e.id}">${e.name}</a></div>
                                <div class="designation"><b>${e.subjectTaught.subjectTaught}</b></div>
                                <div class="text">${e.userDescription.substring(0,120)}...</div>
                                <div class="courses">${e.subjectTaught.count} order(s)</div></div>
                            </div>`;
                            $(wrapper).append(div);
                        });

                    }
                    else {
                        $(wrapper).empty();
                        $(wrapper).append("<h3>No information  satisfying your request</h3>");
                    }



                }
            ).catch();
       }

});


sendGetRequest("GET", getMaxHourlyRateUrl).then(
    data => {
        $("#myRangeStart").attr('max', data);
        $("#myRangeTo").attr('max', data);
        $("#myRangeTo").val(data);
        let rangeFrom = $("#myRangeStart").val();
        let rangeTo = $("#myRangeTo").val();
        $("#fromVal").text(rangeFrom);
        $("#toVal").text(rangeTo);
    }
).catch();




$("#myRangeStart").change(function () {
    $("#subjectTitle").css("display", "none");
    $(wrapper).empty();
    let subjectTaught = $("#subjectTaughtOptions option:selected").text();
    if(subjectTaught === "Select a course"){
        subjectTaught = "";
    }
    let min = $("#myRangeStart").val();
    let max = $("#myRangeTo").val();

    if (countryArrayList.length > 0) {

        $(countryArrayList).each(function (j, element) {
            let url = "/pageData/filter?subjectTaught.subjectTaught=" + subjectTaught + "&hourlyRate=" + min + "&hourlyRate=" + max +"&country.countryName=" + element;
            $(wrapper).css("display", "flex");

            sendGetRequest("GET", url).then(
                data => {
                    if (data.length !== 0) {

                        $(data).each(function (i, e) {
                            let image = e.avatar;
                            let imageb;
                            if(image.startsWith('"')){
                                let imagea = image.substring(0);
                                imageb = imagea.substring(imagea.length-1, 1);
                            }else{
                                imageb = e.avatar;
                            }
                            if(e.surname!=null){
                                let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                                <div class="inner-box">
                                    <div class="image">
                                        <a href="/course-detail?id=${e.id}"><img src="/userImage?image=${imageb}" alt="" /></a>
                                    </div>
                                <div class="name"><a href="/course-detail?id=${e.id}">${e.name} ${e.surname}</a></div>
                                <div class="designation"><b>${e.subjectTaught.subjectTaught}</b></div>
                                <div class="text">${e.userDescription.substring(0,120)}...</div>
                                <div class="courses">${e.subjectTaught.count} order(s)</div></div>
                            </div>`;
                                $(wrapper).append(div);
                            }else{
                                let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                                <div class="inner-box">
                                    <div class="image">
                                        <a href="/course-detail?id=${e.id}"><img src="/userImage?image=${imageb}" /></a>
                                    </div>
                                <div class="name"><a href="/course-detail?id=${e.id}">${e.name}</a></div>
                                <div class="designation"><b>${e.subjectTaught.subjectTaught}</b></div>
                                <div class="text">${e.userDescription.substring(0,120)}...</div>
                                <div class="courses">${e.subjectTaught.count} order(s)</div></div>
                            </div>`;
                                $(wrapper).append(div);
                            }
                        });
                        hasData = true;
                    }else{
                        $(wrapper).empty();
                        $(wrapper).append("<h3>No information  satisfying your request</h3>");
                    }
                }
            ).catch();

        });

    }else{

        $(wrapper).empty();
        let url = "/pageData/filter?subjectTaught.subjectTaught=" + subjectTaught + "&hourlyRate=" + min + "&hourlyRate=" + max +"&country.countryName=";
        $(wrapper).css("display", "flex");
        sendGetRequest("GET", url).then(
            data => {
                if (data.length !== 0) {
                    hasData = true;
                    $(data).each(function (i, e) {
                        let image = e.avatar;
                        let imageb;
                        if(image.startsWith('"')){
                            let imagea = image.substring(0);
                            imageb = imagea.substring(imagea.length-1, 1);
                        }else{
                            imageb = e.avatar;
                        }

                        let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                                <div class="inner-box">
                                    <div class="image">
                                        <a href="/course-detail?id=${e.id}"><img src="/userImage?image=${imageb}" alt="" /></a>
                                    </div>
                                <div class="name"><a href="/course-detail?id=${e.id}">${e.name}</a></div>
                                <div class="designation"><b>${e.subjectTaught.subjectTaught}</b></div>
                                <div class="text">${e.userDescription.substring(0,120)}...</div>
                                <div class="courses">${e.subjectTaught.count} order(s)</div></div>
                            </div>`;
                        $(wrapper).append(div);
                    });

                } else {
                    $(wrapper).empty();
                    $(wrapper).append("<h3>No information  satisfying your request</h3>");
                }
            }
        ).catch();
    }


    if (parseInt($("#myRangeStart").val()) >= parseInt($("#myRangeTo").val())) {
        setTimeout(()=>{
            $("#myRangeTo").val(parseInt($("#myRangeStart").val()) + 1);
        },0)
    }
    setTimeout(()=>{
        let newRangeFrom = $("#myRangeStart").val();
        $("#fromVal").text(newRangeFrom);
        let newRangeTo = $("#myRangeTo").val();
        $("#toVal").text(newRangeTo);
    },800);

    // if (parseInt($("#myRangeStart").val()) > parseInt($("#myRangeTo").val())) {
    //     setTimeout(()=>{
    //         $("#myRangeTo").val(parseInt($("#myRangeStart").val()) + 1);
    //     },0)
    // }
    // setTimeout(()=>{
    //     let newRangeTo = $("#myRangeTo").val();
    //     $("#toVal").text(newRangeTo);
    // },800);



});


$("#myRangeTo").change(function () {
    $("#subjectTitle").css("display", "none");
    $(wrapper).empty();
    let subjectTaught = $("#subjectTaughtOptions option:selected").text();
    if(subjectTaught === "Select a course"){
        subjectTaught = "";
    }
    let min = $("#myRangeStart").val();
    let max = $("#myRangeTo").val();

    if (countryArrayList.length > 0) {

        $(countryArrayList).each(function (j, element) {
            let url = "/pageData/filter?subjectTaught.subjectTaught=" + subjectTaught + "&hourlyRate=" + min + "&hourlyRate=" + max +"&country.countryName=" + element;
            $(wrapper).css("display", "flex");

            sendGetRequest("GET", url).then(
                data => {
                    if (data.length !== 0) {

                        $(data).each(function (i, e) {

                            let image = e.avatar;
                            let imageb;
                            if(image.startsWith('"')){
                                let imagea = image.substring(0);
                                imageb = imagea.substring(imagea.length-1, 1);
                            }else{
                                imageb = e.avatar;
                            }

                            if(e.surname!=null){
                                let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                                <div class="inner-box">
                                    <div class="image">
                                        <a href="/course-detail?id=${e.id}"><img src="/userImage?image=${imageb}" /></a>
                                    </div>
                                <div class="name"><a href="/course-detail?id=${e.id}">${e.name} ${e.surname}</a></div>
                                <div class="designation"><b>${e.subjectTaught.subjectTaught}</b></div>
                                <div class="text">${e.userDescription.substring(0,120)}...</div>
                                <div class="courses">${e.subjectTaught.count} order(s)</div></div>
                            </div>`;
                                $(wrapper).append(div);
                            }else{
                                let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                                <div class="inner-box">
                                    <div class="image">
                                        <a href="/course-detail?id=${e.id}"><img src="/userImage?image=${imageb}" alt="" />${e.teacherAvatar}</a>
                                    </div>
                                <div class="name"><a href="/course-detail?id=${e.id}">${e.name}</a></div>
                                <div class="designation"><b>${e.subjectTaught.subjectTaught}</b></div>
                                <div class="text">${e.userDescription.substring(0,120)}...</div>
                                <div class="courses">${e.subjectTaught.count} order(s)</div></div>
                            </div>`;
                                $(wrapper).append(div);
                            }
                        });
                        hasData = true;
                    }else{
                        $(wrapper).empty();
                        $(wrapper).append("<h3>No information  satisfying your request</h3>");
                    }
                }
            ).catch();

        });

    }else{
        $(wrapper).empty();
        let url = "/pageData/filter?subjectTaught.subjectTaught=" + subjectTaught + "&hourlyRate=" + min + "&hourlyRate=" + max +"&country.countryName=";
        $(wrapper).css("display", "flex");
        sendGetRequest("GET", url).then(
            data => {
                if (data.length !== 0) {
                    hasData = true;
                    $(data).each(function (i, e) {

                        let image = e.avatar;
                        let imageb;
                        if(image.startsWith('"')){
                            let imagea = image.substring(0);
                            imageb = imagea.substring(imagea.length-1, 1);
                        }else{
                            imageb = e.avatar;
                        }

                        let div = `<div class="team-block col-lg-3 col-md-6 col-sm-12">
                                <div class="inner-box">
                                    <div class="image">
                                        <a href="/course-detail?id=${e.id}"><img src="/userImage?image=${imageb}" /></a>
                                    </div>
                                <div class="name"><a href="/course-detail?id=${e.id}">${e.name}</a></div>
                                <div class="designation"><b>${e.subjectTaught.subjectTaught}</b></div>
                                <div class="text">${e.userDescription.substring(0,120)}...</div>
                                <div class="courses">${e.subjectTaught.count} order(s)</div></div>
                            </div>`;
                        $(wrapper).append(div);
                    });

                }else{
                    $(wrapper).empty();
                    $(wrapper).append("<h3>No information  satisfying your request</h3>");
                }
            }
        ).catch();
    }

    if (parseInt($("#myRangeStart").val()) >= parseInt($("#myRangeTo").val())) {

        setTimeout(()=>{
            $("#myRangeTo").val(parseInt($("#myRangeStart").val()) + 1);
        },0)
    }
    setTimeout(()=>{
        let newRangeFrom = $("#myRangeStart").val();
        $("#fromVal").text(newRangeFrom);
        let newRangeTo = $("#myRangeTo").val();
        $("#toVal").text(newRangeTo);
    },800);

});

if(user!=null){
    let profileWrap = $("#profile-pic");
    let image = user.avatar;
    let imageb;
    if(image.startsWith('"')){
        let imagea = image.substring(0);
        imageb = imagea.substring(imagea.length-1, 1);
    }else{
        imageb = user.avatar;
    }
    let pic = `<span class="profile-image roundImage"><img src="/userImage?image=${imageb}" alt=""/></span> <i
                                    class="arrow flaticon-down-arrow"></i>`;
    $(profileWrap).html(pic);
}else{
    let profileWrap = $("#profile-pic");
    let pic = `<span class="profile-image roundImage"><img src="/images/resource/no-user-image-icon-23.jpg" alt="noUSer"/></span> <i
                                    class="arrow flaticon-down-arrow"></i>`;
    $(profileWrap).html(pic);
}


let max = 0;


const loginQueryString = window.location.search;
if(loginQueryString === "?error"){
    $(".validation-error").empty();
    $(".validation-error").append("Wrong email or password");
    $(".validation-error").css("display", "block");
}

// var maxValues = $('#myRangeStart').map(function(){
//     max = this.max;
//     alert(max);
// }).get();


getTopSubjectTaughts();
getAllSubjectTaughts();
getAllCountries();


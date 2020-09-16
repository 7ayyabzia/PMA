'use strict';
$(function () {
    $.MyAdmin.browser.activate();
    $.MyAdmin.leftSideBar.activate();
    $.MyAdmin.rightSideBar.activate();
    $.MyAdmin.navbar.activate();
    $.MyAdmin.input.activate();
    $.MyAdmin.select.activate();
    $.MyAdmin.tooltip.activate();
    $.MyAdmin.titleSparkline.activate();
    skinChanger();
    activateNotificationAndTasksScroll();
    setSkinListHeightAndScroll(true);
    setSettingListHeightAndScroll(true);
    $(window).resize(function () {
        setSkinListHeightAndScroll(false);
        setSettingListHeightAndScroll(false);
    });
    callFullScreen();

    setTimeout(function () { $('.page-loader-wrapper').fadeOut(); }, 50);


    let currentLocation = window.location.pathname;
    let active = $('#leftsidebar li a[href="' + currentLocation + '"]')[0];
    if (active !== undefined) {
        $('#leftsidebar li').attr('class', '')
        $(active).parent().attr('class', 'active')
    }

    //Month Picker
    $(document.body).on('focus', '.month-picker', function () {
        var popup = $(this).parent().find('.month-popup');
        popup.remove();
        let content = '<div class="month-popup"> <ul> <li>01</li> <li>02</li> <li>03</li> <li>04</li> <li>05</li> ' +
            '<li>06</li> <li>07</li> <li>08</li> <li>09</li> <li>10</li> <li>11</li> <li>12</li> <li>13</li> ' +
            '<li>14</li> <li>15</li> <li>16</li> <li>17</li> <li>18</li> <li>19</li> <li>20</li> ' +
            '<li>21</li> <li>22</li> <li>23</li> <li>24</li> <li>25</li> <li>26</li>' +
            '<li>27</li> <li>28</li> <li>29</li> <li>30</li> <li>31</li> </ul> ' +
            '<input type="button" class="month-picker-close" value="Ok"/></div > ';
        $(this).parent().append(content);
        let val = $('.month-picker').val();
        let active = $('.month-popup li:contains(' + val + ')')[0];
        $(active).addClass('active');
    })
    $(document.body).on('click', '.month-picker-close', function () {
        var popup = $(this).parent();
        popup.remove();
    })
    $(document.body).on('click', '.month-popup li', function () {
        var value = $(this).html()
        $('.month-picker').val(value);

        var popup = $(this).parent().parent();
        popup.remove();
    })
    $(document.body).on('keydown', '.month-picker', function (e) {
        e.preventDefault();
        e.stopPropagation();
    })

    //Week Picker
    $(document.body).on('focus', '.week-picker', function () {
        var popup = $(this).parent().find('.week-popup');
        popup.remove();
        let content = '<div class="week-popup"> <ul> <li>MON</li> <li>TUE</li> <li>WED</li> <li>THU</li> <li>FRI</li> ' +
            '<li>SAT</li> <li>SUN</li> </ul> ' +
            '<input type="button" class="week-picker-close" value="Ok"/></div > ';
        $(this).parent().append(content);
        let val = $('.week-picker').val();
        let active = $('.week-popup li:contains(' + val + ')')[0];
        $(active).addClass('active');
    })
    $(document.body).on('click', '.week-picker-close', function () {
        var popup = $(this).parent();
        popup.remove();
    })
    $(document.body).on('click', '.week-popup li', function () {
        var value = $(this).html()
        $('.week-picker').val(value);

        var popup = $(this).parent().parent();
        popup.remove();
    })
    $(document.body).on('keydown', '.week-picker', function (e) {
        e.preventDefault();
        e.stopPropagation();
    })

    //Time Picker
    $(document.body).on('focus', '.time-picker', function () {
        let val = $(this).val();
        var popup = $(this).parent().find('.time-popup');
        popup.remove();
        let content = '<div class="time-popup">'+
            '   <p class="time-popup-value"><span class="hour"></span>:<span class="min"></span></p>' +
            '   <p class="range-field">' +
            '       <span>Hour: </span>' +
            '       <input type="range" class="time-popup-hour" min="0" max="23">' +
            '   </p>' +
            '   <p class="range-field">' +
            '       <span>Min: </span>' +
            '       <input type="range" class="time-popup-min" min="0" max="59">' +
            '   </p>' +
            '   <input type="button" class="time-picker-close" value="Ok"  />' +
            '</div>';
        $(this).parent().append(content);
        let $hour = val.split(':')[0];
        let $min = val.split(':')[1];
        $('.time-popup').find('.hour').html($hour);
        $('.time-popup').find('.time-popup-hour').val($hour);
        $('.time-popup').find('.min').html($min);
        $('.time-popup').find('.time-popup-min').val($min);
    })
    $(document.body).on('click', '.time-picker-close', function () {
        var popup = $(this).parent();
        popup.remove();
    })
    $(document.body).on('input', '.time-popup-hour', function () {
        let hour = minTwoDigits($(this).val());
        let showHour = $(this).parent().parent().find('.hour');
        showHour.html(hour);

        let input = $(this).parent().parent().prev();
        var min = input.val().split(':')[1];
        input.val(hour + ':' + min);
    })
    $(document.body).on('input', '.time-popup-min', function () {
        let min = minTwoDigits($(this).val());
        let showMin = $(this).parent().parent().find('.min');
        showMin.html(min);

        let input = $(this).parent().parent().prev();
        var hour = input.val().split(':')[0];
        input.val(hour + ':' + min);
    })
    $(document.body).on('keydown', '.time-picker', function (e) {
        e.preventDefault();
        e.stopPropagation();
    })

    function minTwoDigits(n) {
        return (n.length === 1 ? '0' : '') + n;
    }

});


if (typeof jQuery === "undefined") {
    throw new Error("jQuery plugins need to be before this file");
}

// declare variables
$.MyAdmin = {};
$.MyAdmin.options = {
    leftSideBar: {
        scrollColor: 'rgba(0,0,0,0.5)',
        scrollWidth: '4px',
        scrollAlwaysVisible: false,
        scrollBorderRadius: '0',
        scrollRailBorderRadius: '0',
        scrollActiveItemWhenPageLoad: true,
        breakpointWidth: 1170
    },
    dropdownMenu: {
        effectIn: 'pullDown',
        effectOut: 'fadeOut'
    }
}
/* Tooltip */
$.MyAdmin.tooltip = {
    activate: function () {
        $('[data-toggle="tooltip"]').tooltip({
            placement: 'top'
        });
    }
}
/* Title Sparkline chart data */
$.MyAdmin.titleSparkline = {
    activate: function () {
        $('.chart.header-bar').sparkline([6, 8, 6, 8, 10, 5, 6, 7, 9, 7], {
            type: 'bar',
            barColor: '#f17312',
            negBarColor: '#fff',
            barWidth: '4px',
            height: '40px'
        });
        $('.chart.header-bar2').sparkline([6, 8, 6, 8, 10, 3, 6, 7, 9, 7], {
            type: 'bar',
            barColor: '#1399f2',
            negBarColor: '#fff',
            barWidth: '4px',
            height: '40px'
        });

        $('.chart.header-line').sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7, 5, 6, 7, 9, 9], {
            type: 'line',
            lineColor: '#46B2A8',
            fillColor: '#badddc',
            height: '40px'
        });
    }
}
/* Left Sidebar */

$.MyAdmin.leftSideBar = {
    activate: function () {
        var _this = this;
        var $body = $('body');
        var $overlay = $('.overlay');

        //Close sidebar
        $(window).on("click", function (e) {
            var $target = $(e.target);
            if (e.target.nodeName.toLowerCase() === 'i') { $target = $(e.target).parent(); }

            if (!$target.hasClass('bars') && _this.isOpen() && $target.parents('#leftsidebar').length === 0) {
                if (!$target.hasClass('js-right-sidebar')) $overlay.fadeOut();
                $body.removeClass('overlay-open');
            }
        });

        $.each($('.menu-toggle.toggled'), function (i, val) {
            $(val).next().slideToggle(0);
        });

        //When page load
        $.each($('.menu .list li.active'), function (i, val) {
            var $activeAnchors = $(val).find('a:eq(0)');

            $activeAnchors.addClass('toggled');
            $activeAnchors.next().show();
        });

        //Collapse or Expand Menu
        $('.menu-toggle').on('click', function (e) {
            var $this = $(this);
            var $content = $this.next();

            if ($($this.parents('ul')[0]).hasClass('list')) {
                var $not = $(e.target).hasClass('menu-toggle') ? e.target : $(e.target).parents('.menu-toggle');

                $.each($('.menu-toggle.toggled').not($not).next(), function (i, val) {
                    if ($(val).is(':visible')) {
                        $(val).prev().toggleClass('toggled');
                        $(val).slideUp();
                    }
                });
            }

            $this.toggleClass('toggled');
            $content.slideToggle(320);
        });

        //Set menu height
        _this.setMenuHeight();
        _this.checkStatuForResize(true);
        $(window).resize(function () {
            _this.setMenuHeight();
            _this.checkStatuForResize(false);
        });

        //Set Waves
        Waves.attach('.menu .list a', ['waves-block']);
        Waves.init();
    },
    setMenuHeight: function (isFirstTime) {
        if (typeof $.fn.slimScroll != 'undefined') {
            var configs = $.MyAdmin.options.leftSideBar;
            //var height = ($(window).height() - ($('.legal').outerHeight() + $('.user-info').outerHeight() + $('.navbar').innerHeight()));
            var height = ($(window).height() - ($('.navbar').innerHeight()));
            var $el = $('.list');

            $el.slimscroll({
                height: height + "px",
                color: configs.scrollColor,
                size: configs.scrollWidth,
                alwaysVisible: configs.scrollAlwaysVisible,
                borderRadius: configs.scrollBorderRadius,
                railBorderRadius: configs.scrollRailBorderRadius
            });

            //Scroll active menu item when page load, if option set = true
            if ($.MyAdmin.options.leftSideBar.scrollActiveItemWhenPageLoad) {
                var activeItemOffsetTop = $('.menu .list li.active')[0].offsetTop
                if (activeItemOffsetTop > 150) $el.slimscroll({ scrollTo: activeItemOffsetTop + 'px' });
            }
        }
    },
    checkStatuForResize: function (firstTime) {
        var $body = $('body');
        var $openCloseBar = $('.navbar .navbar-header .bars');
        var width = $body.width();

        if (firstTime) {
            $body.find('.content, .sidebar').addClass('no-animate').delay(1000).queue(function () {
                $(this).removeClass('no-animate').dequeue();
            });
        }

        if (width < $.MyAdmin.options.leftSideBar.breakpointWidth) {
            $body.addClass('ls-closed');
            $openCloseBar.fadeIn();
        }
        else {
            $body.removeClass('ls-closed');
            $openCloseBar.fadeOut();
        }
    },
    isOpen: function () {
        return $('body').hasClass('overlay-open');
    }
};

/*  Left sidemenu collapse */
$('.sidemenu-collapse').on('click', function () {
    var $body = $('body');
    if ($body.hasClass('side-closed')) {
        $body.removeClass('side-closed');
        $body.removeClass('submenu-closed');
    } else {
        $body.addClass('side-closed');
        $body.addClass('submenu-closed');
    }
});
$(".content, .navbar").mouseenter(function () {
    var $body = $('body');
    $body.removeClass('side-closed-hover');
    $body.addClass('submenu-closed');
});
$(".sidebar").mouseenter(function () {
    var $body = $('body');
    $body.addClass('side-closed-hover');
    $body.removeClass('submenu-closed');
});

if (localStorage.getItem("sidebar_option")) {
    jQuery("body").addClass(localStorage.getItem("sidebar_option"));
}
if ($('body').hasClass('side-closed')) {
    $(".sidebar-user-panel").css({ "display": "none" });
} else {
    $(".sidebar-user-panel").css({ "display": "block" });
}
jQuery(document).on("click", ".sidemenu-collapse", function () {
    var sidebar_option = "";
    if ($('body').hasClass('side-closed')) {
        var sidebar_option = "side-closed submenu-closed";
        $(".sidebar-user-panel").css({ "display": "none" });
    } else {
        $(".sidebar-user-panel").css({ "display": "block" });
    }
    jQuery("body").addClass(sidebar_option);
    localStorage.setItem("sidebar_option", sidebar_option);
});


/* Right Sidebar */
$.MyAdmin.rightSideBar = {
    activate: function () {
        var _this = this;
        var $sidebar = $('#rightsidebar');
        var $overlay = $('.overlay');

        //Close sidebar
        $(window).on("click", function (e) {
            var $target = $(e.target);
            if (e.target.nodeName.toLowerCase() === 'i') { $target = $(e.target).parent(); }

            if (!$target.hasClass('js-right-sidebar') && _this.isOpen() && $target.parents('#rightsidebar').length === 0) {
                if (!$target.hasClass('bars')) $overlay.fadeOut();
                $sidebar.removeClass('open');
            }
        });
        $('.js-right-sidebar').on('click', function () {
            $sidebar.toggleClass('open');
            if (_this.isOpen()) { $overlay.fadeIn(); } else { $overlay.fadeOut(); }
        });
    },
    isOpen: function () {
        return $('.right-sidebar').hasClass('open');
    }
}

/* Navbar */
$.MyAdmin.navbar = {
    activate: function () {
        var $body = $('body');
        var $overlay = $('.overlay');

        //Open left sidebar panel
        $('.bars').on('click', function () {
            $body.toggleClass('overlay-open');
            if ($body.hasClass('overlay-open')) { $overlay.fadeIn(); } else { $overlay.fadeOut(); }
        });

        //Close collapse bar on click event
        $('.nav [data-close="true"]').on('click', function () {
            var isVisible = $('.navbar-toggle').is(':visible');
            var $navbarCollapse = $('.navbar-collapse');

            if (isVisible) {
                $navbarCollapse.slideUp(function () {
                    $navbarCollapse.removeClass('in').removeAttr('style');
                });
            }
        });
    }
}
/* Input - Function */
$.MyAdmin.input = {
    activate: function () {
        //On focus event
        $('.form-control').focus(function () {
            $(this).parent().addClass('focused');
        });

        //On focusout event
        $('.form-control').focusout(function () {
            var $this = $(this);
            if ($this.parents('.form-group').hasClass('form-float')) {
                if ($this.val() == '') { $this.parents('.form-line').removeClass('focused'); }
            }
            else {
                $this.parents('.form-line').removeClass('focused');
            }
        });

        //On label click
        $('body').on('click', '.form-float .form-line .form-label', function () {
            $(this).parent().find('input').focus();
        });

        //Not blank form
        $('.form-control').each(function () {
            if ($(this).val() !== '') {
                $(this).parents('.form-line').addClass('focused');
            }
        });
    }
}
/* Form - Select */
$.MyAdmin.select = {
    activate: function () {
        if ($.fn.selectpicker) { $('select:not(.ms)').selectpicker(); }
    }
}

/* Browser */
var edge = 'Microsoft Edge';
var ie10 = 'Internet Explorer 10';
var ie11 = 'Internet Explorer 11';
var opera = 'Opera';
var firefox = 'Mozilla Firefox';
var chrome = 'Google Chrome';
var safari = 'Safari';

$.MyAdmin.browser = {
    activate: function () {
        var _this = this;
        var className = _this.getClassName();

        if (className !== '') $('html').addClass(_this.getClassName());
    },
    getBrowser: function () {
        var userAgent = navigator.userAgent.toLowerCase();

        if (/edge/i.test(userAgent)) {
            return edge;
        } else if (/rv:11/i.test(userAgent)) {
            return ie11;
        } else if (/msie 10/i.test(userAgent)) {
            return ie10;
        } else if (/opr/i.test(userAgent)) {
            return opera;
        } else if (/chrome/i.test(userAgent)) {
            return chrome;
        } else if (/firefox/i.test(userAgent)) {
            return firefox;
        } else if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
            return safari;
        }

        return undefined;
    },
    getClassName: function () {
        var browser = this.getBrowser();

        if (browser === edge) {
            return 'edge';
        } else if (browser === ie11) {
            return 'ie11';
        } else if (browser === ie10) {
            return 'ie10';
        } else if (browser === opera) {
            return 'opera';
        } else if (browser === chrome) {
            return 'chrome';
        } else if (browser === firefox) {
            return 'firefox';
        } else if (browser === safari) {
            return 'safari';
        } else {
            return '';
        }
    }
}
//Skin changer
function skinChanger() {
    $('.right-sidebar .demo-choose-skin li').on('click', function () {
        var $body = $('body');
        var $this = $(this);

        var existTheme = $('.right-sidebar .demo-choose-skin li.actived').data('theme');
        $('.right-sidebar .demo-choose-skin li').removeClass('actived');
        $body.removeClass('theme-' + existTheme);
        $this.addClass('actived');

        $body.addClass('theme-' + $this.data('theme'));
        var choose_skin = 'theme-' + $this.data('theme');
        localStorage.setItem("choose_skin", choose_skin);
        localStorage.setItem("choose_skin_active", $this.data('theme'));
    });
}
//Full screen window
function callFullScreen() {
    $(document).on('click', '.fullscreen-btn', function (e) {
        if (!document.fullscreenElement &&    // alternative standard method
            !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }

    });
}
function setSkinListHeightAndScroll(isFirstTime) {
    var height = $(window).height() - ($('.navbar').innerHeight() + $('.right-sidebar .nav-tabs').outerHeight());
    var $el = $('.right-sidebar .demo-skin');

    if (!isFirstTime) {
        $el.slimScroll({ destroy: true }).height('auto');
        $el.parent().find('.slimScrollBar, .slimScrollRail').remove();
    }

    $el.slimscroll({
        height: height + 'px',
        color: 'rgba(0,0,0,0.5)',
        size: '6px',
        alwaysVisible: false,
        borderRadius: '0',
        railBorderRadius: '0'
    });
}

//Setting tab content set height and show scroll
function setSettingListHeightAndScroll(isFirstTime) {
    var height = $(window).height() - ($('.navbar').innerHeight() + $('.right-sidebar .nav-tabs').outerHeight());
    var $el = $('.right-sidebar .demo-settings');

    if (!isFirstTime) {
        $el.slimScroll({ destroy: true }).height('auto');
        $el.parent().find('.slimScrollBar, .slimScrollRail').remove();
    }

    $el.slimscroll({
        height: height + 'px',
        color: 'rgba(0,0,0,0.5)',
        size: '6px',
        alwaysVisible: false,
        borderRadius: '0',
        railBorderRadius: '0'
    });
}

//Activate notification and task dropdown on top right menu
function activateNotificationAndTasksScroll() {
    $('.navbar-right .dropdown-menu .body .menu').slimscroll({
        height: '254px',
        color: 'rgba(0,0,0,0.5)',
        size: '4px',
        alwaysVisible: false,
        borderRadius: '0',
        railBorderRadius: '0'
    });
}
//Dark Light Sidebar ======================================================================================
$(".rightSetting .btn-sidebar-light").on("click", function () {
    $("body").removeClass("menu_dark logo-black");
     $("body").addClass("menu_light logo-white");
    var menu_option = "menu_light";
    localStorage.setItem("choose_logoheader", "logo-white");
    localStorage.setItem("menu_option", menu_option);
}), $(".rightSetting .btn-sidebar-dark").on("click", function () {
    $("body").removeClass("menu_light logo-white");
    $("body").addClass("menu_dark logo-black");
    var menu_option = "menu_dark";
    localStorage.setItem("choose_logoheader", "logo-black");
    localStorage.setItem("menu_option", menu_option);
});

// change theme dark/light on button click
$(".rightSetting .btn-theme-light").on("click", function () {
    $("body").removeClass("dark submenu-closed menu_dark logo-black");
    $("body").addClass("light submenu-closed menu_light logo-white");
    var theme = "light";
    var menu_option = "menu_light";
    localStorage.setItem("choose_logoheader", "logo-white");
    localStorage.setItem("choose_skin", "theme-black");
    localStorage.setItem("theme", theme);
    localStorage.setItem("menu_option", menu_option);
}), $(".rightSetting .btn-theme-dark").on("click", function () {
    $("body").removeClass("light submenu-closed menu_light logo-white");
    $("body").addClass("dark submenu-closed menu_dark logo-black");

    var theme = "dark";
    var menu_option = "menu_dark";
    localStorage.setItem("choose_logoheader", "logo-black");
    localStorage.setItem("choose_skin", "theme-black");
    localStorage.setItem("theme", theme);
    localStorage.setItem("menu_option", menu_option);
});

//set theme on startup
if (localStorage.getItem("theme")) {
    $("body").removeClass("dark light");
    jQuery("body").addClass(localStorage.getItem("theme"));
}


// set dark sidebar menu on startup
if (localStorage.getItem("menu_option")) {
    jQuery("body").addClass(localStorage.getItem("menu_option"));
}
// set header color on startup
if (localStorage.getItem("choose_skin")) {
    jQuery("body").addClass(localStorage.getItem("choose_skin"));
} else {
    jQuery("body").addClass("theme-black");

}
if (localStorage.getItem("choose_skin_active")) {
    $(".right-sidebar .demo-choose-skin li").each(function (index) {
        jQuery(this).removeClass("actived");
        if (jQuery(this).attr('data-theme') == localStorage.getItem("choose_skin_active")) {
            jQuery(this).addClass("actived");
        }
    });
}
// set logo color on startup
if (localStorage.getItem("choose_logoheader")) {
    jQuery("body").addClass(localStorage.getItem("choose_logoheader"));
} else {
    jQuery("body").addClass("logo-white");
}
if (localStorage.getItem("choose_logoheader_active")) {
    $(".right-sidebar .demo-choose-logoheader li").each(function (index) {
        jQuery(this).removeClass("actived");
        if (jQuery(this).attr('data-theme') == localStorage.getItem("choose_logoheader_active")) {
            jQuery(this).addClass("actived");
        }
    });
}

$(window).on("scroll", function () {
    if ($(window).scrollTop() > 50) {
        $(".navbar").addClass("active");
    } else {
        $(".navbar").removeClass("active");
    }
});

/************* collapse button in panel***************8*/
$(document).on('click', '.card .tools .t-collapse', function () {
    var el = $(this).parents(".card").children(".card-body");
    if ($(this).hasClass("fa-chevron-down")) {
        $(this).removeClass("fa-chevron-down").addClass("fa-chevron-up");
        el.slideUp(200);
    } else {
        $(this).removeClass("fa-chevron-up").addClass("fa-chevron-down");
        el.slideDown(200);
    }
});

/**************** close button in panel *****************/
$(document).on('click', '.card .tools .t-close', function () {
    $(this).parents(".card").parent().remove();
});

/****************** refresh button in panel *****************/
$('.box-refresh').on('click', function (br) {
    br.preventDefault();
    $("<div class='refresh-block'><span class='refresh-loader'><i class='fa fa-spinner fa-spin'></i></span></div>").appendTo($(this).parents('.tools').parents('.card-head').parents('.card'));
    setTimeout(function () {
        $('.refresh-block').remove();
    }, 1000);
});

//==========================================================================================================================


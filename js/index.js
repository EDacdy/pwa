var mySwiper1 = new Swiper('.banner', {
    autoplay: true,
    loop: true,
    pagination: {
        el: '.swiper-pagination',
    },
})
var mySwiper2 = new Swiper('.gkk', {
    slidesPerView: 'auto',
    spaceBetween: 13,
    autoHeight: true,
})
var mySwiper3 = new Swiper('.hezu', {
    slidesPerView: 'auto',
    spaceBetween: 10,
    autoHeight: true,
})
var mySwiper4 = new Swiper('.teach', {
    slidesPerView: 'auto',
    spaceBetween: 13,
    autoHeight: true,
})
$(document).ready(function () {
    // console.log(window.location.pathname + " " + window.location.href);
    // 兼容Safari禁止屏幕缩放
    $('head').append('<meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />');
    document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    })
    var lastTouchEnd = 0;
    document.addEventListener('touchend', function (event) {
        var now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false)

    var kyDeadline, day, now;
    kyDeadline = Date.parse("Dec 24, 2021");
    now = new Date();
    day = Math.floor((kyDeadline - now) / 86400000);
    $(".kyDay").html(day);

    var data_show = $('.data-box');
    for (var i = 1; i <= data_show.length; i++) {
        function_name($("#dateShow" + i).data("date"), "#dateShow" + i);
    }
    // function_name('2020/02/22 23:45:24','.data-show-box');
    // function_name('2020/02/20 21:43:55','.data-show-box');
    function function_name(time, obj) {
        $.leftTime(time, function (d) {
            if (d.status) {
                var $dateShow1 = $(obj);
                // console.log($dateShow1);
                var hms = d.h + ":" + d.m + ":" + d.s;
                $dateShow1.find(".day").html(d.d);
                $dateShow1.find(".hms").html(hms);
            }
        });
    }
});
// 考研师资上下多轮播
tSpeed = 300 //切换速度300ms
var teachSlider = new Swiper('.teachSlider', {
    slidesPerView: 4,
    autoHeight: true,
    preventInteractionOnTransition: true,
    on: {
        init: function () {
            // 第一条宽度
            navSlideWidth = this.slides.eq(0).css('width');
            bar1 = this.$el.find('.bar')
            bar1.css('width', navSlideWidth)
            bar1.transition(tSpeed)
            navSum = this.slides[this.slides.length - 1].offsetLeft //最后一个slide的位置
            clientWidth = parseInt(this.$wrapperEl.css('width')) //Nav的可视宽度
            navWidth = 0
            for (i = 0; i < this.slides.length; i++) {
                navWidth += parseInt(this.slides.eq(i).css('width'))
            }
        },
        tap: function (e) {
            // console.log(e);
            clickIndex = this.clickedIndex
            clickSlide = this.slides.eq(clickIndex)
            teachSlider2.slideTo(clickIndex, 0);
            console.log(clickIndex);
            this.slides.find('span').css({ 'color': 'rgba(102,102,102,1)' });
            clickSlide.find('span').css('color', 'rgba(51, 51, 51, 1)');
        }
    },
});
teachSlider.on('tap', function (e) {
})
var teachSlider2 = new Swiper('.teachSlider2', {
    watchSlidesProgress: true,
    resistanceRatio: 0,
    autoHeight: true,
    on: {
        touchMove: function () {
            progress = this.progress
            bar1.transition(0)
            bar1.transform('translateX(' + navSum * progress + 'px)')
        },
        transitionStart: function () {
            activeIndex = this.activeIndex
            activeSlidePosition = teachSlider.slides[activeIndex].offsetLeft
            //释放时导航粉色条移动过渡
            bar1.transition(tSpeed)
            bar1.transform('translateX(' + activeSlidePosition + 'px)')
            //释放时文字变色过渡
            teachSlider.slides.eq(activeIndex).find('span').transition(tSpeed)
            teachSlider.slides.eq(activeIndex).find('span').css('color', 'rgba(51, 51, 51, 1)')
            if (activeIndex > 0) {
                teachSlider.slides.eq(activeIndex - 1).find('span').transition(tSpeed)
                teachSlider.slides.eq(activeIndex - 1).find('span').css('color', 'rgba(102,102,102,1)')
            }
            if (activeIndex < this.slides.length) {
                teachSlider.slides.eq(activeIndex + 1).find('span').transition(tSpeed)
                teachSlider.slides.eq(activeIndex + 1).find('span').css('color', 'rgba(102,102,102,1)')
            }
            //导航居中
            navActiveSlideLeft = teachSlider.slides[activeIndex].offsetLeft //activeSlide距左边的距离
            teachSlider.setTransition(tSpeed)
            if (navActiveSlideLeft < (clientWidth - parseInt(navSlideWidth)) / 2) {
                teachSlider.setTranslate(0)
            } else if (navActiveSlideLeft > navWidth - (parseInt(navSlideWidth) + clientWidth) / 2) {
                teachSlider.setTranslate(clientWidth - navWidth)
            } else {
                teachSlider.setTranslate((clientWidth - parseInt(navSlideWidth)) / 2 - navActiveSlideLeft)
            }
        },
    }
});

// 集训基地环境图片轮播
tSpeed = 300 //切换速度300ms
var imgSlider1 = new Swiper('.imgSlider1', {
    slidesPerView: 4,
    autoHeight: true,
    preventInteractionOnTransition: true,
    on: {
        init: function () {
            // 第一条宽度
            navSlideWidth = this.slides.eq(0).css('width');
            bar2 = this.$el.find('.bar')
            bar2.css('width', navSlideWidth)
            bar2.transition(tSpeed)
            navSum = this.slides[this.slides.length - 1].offsetLeft //最后一个slide的位置
            clientWidth = parseInt(this.$wrapperEl.css('width')) //Nav的可视宽度
            navWidth = 0
            for (i = 0; i < this.slides.length; i++) {
                navWidth += parseInt(this.slides.eq(i).css('width'))
            }
        },
        tap: function (e) {
            console.log(e);
        }
    },
});
imgSlider1.on('tap', function (e) {
    clickIndex = this.clickedIndex
    clickSlide = this.slides.eq(clickIndex)
    imgSlider2.slideTo(clickIndex, 0);
    this.slides.find('span').css({ 'color': 'rgba(102,102,102,1)' });
    clickSlide.find('span').css('color', 'rgba(51, 51, 51, 1)');
})
var imgSlider2 = new Swiper('.imgSlider2', {
    watchSlidesProgress: true,
    resistanceRatio: 0,
    // autoHeight: true,
    on: {
        touchMove: function () {
            progress = this.progress
            bar2.transition(0)
            bar2.transform('translateX(' + navSum * progress + 'px)')
        },
        transitionStart: function () {
            activeIndex = this.activeIndex
            activeSlidePosition = imgSlider1.slides[activeIndex].offsetLeft
            //释放时导航粉色条移动过渡
            bar2.transition(tSpeed)
            bar2.transform('translateX(' + activeSlidePosition + 'px)')
            //释放时文字变色过渡
            imgSlider1.slides.eq(activeIndex).find('span').transition(tSpeed)
            imgSlider1.slides.eq(activeIndex).find('span').css('color', 'rgba(51, 51, 51, 1)')
            if (activeIndex > 0) {
                imgSlider1.slides.eq(activeIndex - 1).find('span').transition(tSpeed)
                imgSlider1.slides.eq(activeIndex - 1).find('span').css('color', 'rgba(102,102,102,1)')
            }
            if (activeIndex < this.slides.length) {
                imgSlider1.slides.eq(activeIndex + 1).find('span').transition(tSpeed)
                imgSlider1.slides.eq(activeIndex + 1).find('span').css('color', 'rgba(102,102,102,1)')
            }
            //导航居中
            navActiveSlideLeft = imgSlider1.slides[activeIndex].offsetLeft //activeSlide距左边的距离
            imgSlider1.setTransition(tSpeed)
            if (navActiveSlideLeft < (clientWidth - parseInt(navSlideWidth)) / 2) {
                imgSlider1.setTranslate(0)
            } else if (navActiveSlideLeft > navWidth - (parseInt(navSlideWidth) + clientWidth) / 2) {
                imgSlider1.setTranslate(clientWidth - navWidth)
            } else {
                imgSlider1.setTranslate((clientWidth - parseInt(navSlideWidth)) / 2 - navActiveSlideLeft)
            }

        },
    }
});
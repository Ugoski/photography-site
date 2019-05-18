'use strict';

class Menu {
	constructor() {
        this.$menu = $('#menu');
        this.$body = $('body');
        this.$open =  $('.nav__btn-menu');
        this.$close =  $('.menu__nav__btn-menu', this.$menu);
        this.$item = $('.nav__menu a');
        this.$itemMob = $('.menu__body a');

        this.isAnimating = false;

        this.bindEvents();
    }
    
	bindEvents() {
        const that = this;

        this.$open.on('click', function() {
            that.$body.addClass('menu-active');
            that.top = window.scrollY || window.pageYOffset;
            setTimeout(() => {
                that.$body.css('position', 'fixed').css('top', `-${this.top}px`);
            }, 350);
        });

        this.$close.on('click', function() {
            that.$body.removeClass('menu-active');
            that.$body.css('position', 'relative').css('top', 0);
            window.scrollTo(0, that.top);
        });

        this.$itemMob.on('click', function(event) {
            that.$body.css('position', 'relative').css('top', 0);
            that.$body.removeClass('menu-active');
            if (that.isAnimating) {
                return false;
            } else {
                event.preventDefault();
                var hash = this.hash;
                var time = 800;
                that.isAnimating = true;

                $('html, body').animate({
                  scrollTop: $(hash).offset().top - 50
                }, time, function(){
                    that.isAnimating = false;
                });
                window.location.hash = hash;
            }
        });

        this.$item.on('click', function(event) {
            if (that.isAnimating) {
                return false;
            } else {
                event.preventDefault();
                var hash = this.hash;
                var time = 800;
                that.isAnimating = true;

                $('html, body').animate({
                  scrollTop: $(hash).offset().top - 80
                }, time, function(){
                    that.isAnimating = false;
                });
                window.location.hash = hash;
            }
        });
    }
}

export { Menu as default }

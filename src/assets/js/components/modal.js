'use strict';

class Modal {
    constructor() {
        this.$body = $('body');
        this.$modal = $('#modal');
        this.$wrapper = $('.modal__wrapper', this.$modal);
        this.$close = $('.modal__wrapper__close', this.$modal);
        this.$image = $('.modal__wrapper__image', this.$modal);

        this.top = 0;

        this.player;

        this.loadVideo();
        this.bindEvents();
    }

    open(type, data) {
        this.top = window.scrollY || window.pageYOffset;
        this.$body.addClass('modal-active');
        this.verifyModalType(type, data);
        this.$body.css('position', 'fixed').css('top', `-${this.top}px`);
    }

    verifyModalType(type, data) {
        if (type == 'video') {
            this.$image.hide();
            $('#player').show();
            this.startVideo(data);
        } else {
            $('#player').hide();
            this.$image.show();
            this.loadImage(data);
        }
    }

    close() {
        this.$body.removeClass('modal-active');
        if (this.player) this.player.stopVideo();
        this.$body.css('position', 'relative').css('top', 0);
        window.scrollTo(0, this.top);
    }

    loadVideo() {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/player_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        window.onYouTubePlayerAPIReady = () => {
            this.player = new YT.Player('player', {
                height: '506',
                width: '100%',
                videoId: 'IsJ3F2JWmeE',
                playerVars: {
                    rel: 0,
                    color: 'white'
                },
                events: {
                }
            });
        }
    }

    startVideo(id) {
        this.player.loadVideoById(id);
    }

    loadImage(image) {
        this.$image.css('background-image', `url(img/${image})`)
    }

    bindEvents() {
        const that = this;

        $('body').on('click', '.modal__wrapper__close', function () {
            that.close();
        });

        this.$modal.on('click', function (e) {
            if (!e.target.closest('.modal__wrapper')) {
                that.close();
            }
        });
    }
}

export { Modal as default }

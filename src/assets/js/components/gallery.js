'use strict';

// import data
import events from '../data/events';

class Events {
	constructor() {
        if (events.length < 3) return false;

        this.$container = $('#gallery');

        this.createContainer();
        this.createSlider();
        this.$container.show();

        this.slider.update();
	}
    
    createContainer () {
        this.template = `<div class="section-title-line"></div>
                         <div class="page-wrapper">
                            <h2>GALERIA</h2>
                         </div>
                         <div class="section-title-line mb-large"></div>
                         <div class="page-wrapper">
                            <div class="box-overflow">
                                <div class="swiper-events-container">
                                    <div class="swiper-wrapper">
                                        ${this.getSlides()}
                                    </div>
                                </div>
                                <div class="swiper-button-prev icon-chevron-down"></div>
                                <div class="swiper-button-next icon-chevron-down"></div>
                            </div>
                         </div>`;

        this.$container.html(this.template);

        this.$swiper = $('.swiper-events-container', this.$container);
    }

    getSlides () {
        let slides = '';

        events.map(event => {
            slides += `<a href="${event.link}" ${event.link != 'javascript:;' ? 'target="_blank"' : ''} class="swiper-slide">
                            <div class="outer-div" style="background-image: url(img/${event.image});">
                                <div class="event-desc">
                                    
                                </div>
                            </div>
                       </a>`;
        });
        
        return slides;
    }
    
    createSlider () {
        this.slider = new Swiper (this.$swiper, {
            // slidesPerView: 3,
            // spaceBetween: 100,
            allowTouchMove: false,

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            breakpoints: {
                768: {
                    // slidesPerView: 1,
                    allowTouchMove: true
                }
            }
        })

    }

	bindEvents () {
    }
}

export { Events as default }

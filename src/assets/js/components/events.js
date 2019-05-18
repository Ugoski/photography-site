'use strict';

// import data
import events from '../data/events';

class Events {
	constructor() {
        if (events.length < 3) return false;

        this.$container = $('#events');

        this.createContainer();
        this.createSlider();
        this.$container.show();

        this.slider.update();
	}
    
    createContainer () {
        this.template = `<div class="page-wrapper">
                            <h2>PRÓXIMOS EVENTOS</h2>
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
                                    <h3 class="event-desc__name">${event.name}</h3>
                                    <span class="event-desc__date">${event.date}</span>
                                    <span class="event-desc__city">${event.city}</span>
                                </div>
                            </div>
                       </a>`;
        });

        return slides;
    }
    
    createSlider () {
        this.slider = new Swiper (this.$swiper, {
            slidesPerView: 3,
            spaceBetween: 100,
            allowTouchMove: false,

            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },

            breakpoints: {
                768: {
                    slidesPerView: 1,
                    allowTouchMove: true
                }
            }
        })

    }

	bindEvents () {
    }
}

export { Events as default }

// Import jQuery and Plugins
import $ from 'jquery';
window.$ = window.jQuery = $;

// Components
import Menu from './components/menu';
import Modal from './components/modal';
import Events from './components/events';
import Media from './components/media';
import Swiper from 'swiper';
window.Swiper = Swiper;

window.App = {
	init() {
		this.menu = new Menu();
		this.modal = new Modal();
		this.events = new Events();
		this.media = new Media();

		$(window).on('scroll', () => {
			this.verifyNavAnimation();
		});
	},
	verifyNavAnimation() {
		let top;

		if ($(window).width() > 768) top = 800
		else top = 600

		if ($(window).scrollTop() > top) {
			$('nav').addClass('dark-bgr');
		} else {
			$('nav').removeClass('dark-bgr');
		}
	}
};

App.init();

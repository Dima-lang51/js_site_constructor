/*
new Swiper('.swiper-container', {
	loop: true,
	navigation: {
		nextEl: '.arrow',
	},
	breakpoints: {
		320: {
			slidesPerView: 1,
			spaceBetween: 20
		},
		541: {
			slidesPerView: 2,
			spaceBetween: 40
		}
	}
});

const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('.header');
menuButton.addEventListener('click', function () {
	menuButton.classList.toggle('menu-button-active');
	menu.classList.toggle('header-active');
})
*/

const getElement = (tagName, clasNames, attributes) => {
	const element = document.createElement(tagName); //создаем элемент с именем этого тэга

	if (clasNames) {
		element.classList.add(...clasNames);
	}

	if (attributes) {
		for (const attribute in attributes) {
			element[attribute] = attributes[attribute];
		}
	}
	return element;  //возвращаем и точто вернула функция попадает в то место где эта функция была вызвана "getElement"
};

const createHeader = (param) => { 
	const header = getElement('header'); //функия getElement всегда будет создавать элемент "разные"
	const container = getElement('div', ['container']);
	const wrapper = getElement('div', ['header']);

	if(param.header.logo) {
		const logo = getElement('img', ['logo'], {
			src: param.header.logo,
			alt: 'Логотип' + param.title,
		});
		wrapper.append(logo);
	}

	if (param.header.menu) {
		const nav = getElement('nav', ['menu-list']);
		const allMenuLink = param.header.menu.map(item => {
			const link = getElement('a', ['menu-link'], {
				href: item.link,
				textContent: item.title
			});
				return link;
		});
		nav.append(...allMenuLink);
		wrapper.append(nav);
	}

	if (param.header.social) {
		const socialWrapper = getElement('div', ['social']);
		const allSocial = param.header.social.map(item => {
			const socialLink = getElement('a', ['social-link']);
			socialLink.append(getElement('img', [], {
				src: item.image,
				alt: item.title,
			}));
			socialLink.href = item.link;

			return socialLink;
		});
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);

	}
	

	header.append(container);
	container.append(wrapper);

	return header; //возвращаем
};

const createMain = ({title, main: { genre, rating, description, trailer }}) => {
	const main = getElement('main');
	const container = getElement('div', ['container']);
	main.append(container);

	const wrapper = getElement('div', ['main-content']);
	container.append(wrapper);

	const content = getElement('div', ['content']);
	wrapper.append(content);

	if (genre) {
		const genreSpan = getElement('span', 
			['genre', 'animated', 'fadeInRight'],
			{textContent: genre}
	  );
		content.append(genreSpan);
	}

	if (rating) {
		const ratingBlock = getElement('div', ['rating', 'animated', 'fadeInRight']);
		const ratingStars = getElement('div', ['rating-stars']);
		const ratingNumber = getElement('div', ['rating-number'], { textContent: `${rating}/10` });

		for (let i =0; i < 10; i++) {
			const star = getElement('img', ['star'], {
				alt: i ? '' : `Рейтинг ${rating} из 10`,
				src:  i < rating ? 'img/star.svg' : 'img/star-o.svg'
			});
			ratingStars.append(star);
		}

		ratingBlock.append(ratingStars, ratingNumber);
		content.append(ratingBlock);
	}

	content.append(getElement('h1', ['main-title', 'animated', 'fadeInRight'], {
		textContent: title,
	}));

	if (description) {
		content.append(getElement('p', ['main-description', 'animated', 'fadeInRight'], {
			textContent: description
		}));
	}

	if (trailer) {
		const youtubeLink = getElement('a', ['button', 'animated', 'fadeInRight', 'youtube-modal'], {
			href: trailer,
			textContent:'Смотреть трейлер',
		});

		const youtubeImgLink = getElement('a', ['play', 'youtube-modal'], {
			href: trailer,
			ariaLable: 'Смотреть трейлер',
		});

		const iconPlay =getElement('img', ['play-img'], {
			src: 'img/play.svg',
			alt: 'Смотреть трейлер',
			ariaHidden: true,
		});

		content.append(youtubeLink);
		youtubeImgLink.append(iconPlay);
		wrapper.append(youtubeImgLink);
	}

	return main;
};

const movieConstructor = (selector, options) => { //на основе данной функций формируем всю страницу

	const app = document.querySelector(selector); //получаем элемент со страницы с селектором
	app.classList.add('body-app');

	app.style.backgroundImage = options.background ?
	`url('${options.background}')` : '';

	document.title = options.title;

	if (options.header) { //проверка на свойство header
		app.append(createHeader(options)); //положим в арр то что создаст функция createHeader
	}

	if (options.main) {
		app.append(createMain(options));
	}
};

movieConstructor('.app', {
	title: 'Ведьмак',
	background: 'witcher/background.jpg',
	header: {
		logo: 'witcher/logo.png',
		social: [
			{
				title: 'Twiter',
				link: 'htpps//twitter.com',
				image: 'witcher/social/twitter.svg',
			},
			{
				title: 'Instagram',
				link: 'htpps//instagram.com',
				image: 'witcher/social/instagram.svg',
			},
			{
				title: 'Facebook',
				link: 'htpps//facebook.com',
				image: 'witcher/social/facebook.svg',
			}
		],
		menu: [
			{
				title: 'Описание',
				link: '#',
			},
			{
				title: 'Трейлер',
				link: '#',
			},
			{
				title: 'Отзывы',
				link: '#',
			}
		],
	},
	main: {
		genre: '2019 фэнтези',
		rating: '8',
		description: 'Ведьмак Геральт, мутант и убийца чудовищ, на своей верной лошади по кличке Плотва путешествует по 		            Континенту. За тугой мешочек чеканных монет этот мужчина избавит вас от всякой настырной нечести.',
		trailer: 'https://www.youtube.com/watch?v=P0oJqfLzZzQ',
	},
});
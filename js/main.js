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
		console.log(allSocial);
		socialWrapper.append(...allSocial);
		wrapper.append(socialWrapper);

	}
	

	header.append(container);
	container.append(wrapper);

	return header; //возвращаем
};

const movieConstructor = (selector, options) => { //на основе данной функций формируем всю страницу

	const app = document.querySelector(selector); //получаем элемент со страницы с селектором
	app.classList.add('body-app');

	document.title = options.title;

	if (options.header) { //проверка на свойство header
		app.append(createHeader(options)); //положим в арр то что создаст функция createHeader
	}
};

movieConstructor('.app', {
	title: 'Ведьмак',
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
	}
});
import Axios from 'axios';

const getDatasFromApi = param => {
	return param ? getHerosDataDataFromApiForStore(param) : getHeroDataFromApi();
};

const getHeroDataFromApi = () => {
	let randomNumber = Math.floor(Math.random() * 730) + 1;
	return Axios.get(`https://www.superheroapi.com/api.php/10219454314208202/${randomNumber}`)
		.then(res => dataSelectors(res.data))
		.then(data => createHero(data))
		.catch(error => console.log(error));
};

const getHerosDataDataFromApiForStore = param => {
	const heroStore = [];
	return Axios.get(`https://www.superheroapi.com/api.php/10219454314208202/search/${param}`)
		.then(res => {
			res.data.results.map(data => heroStore.push(createHero(dataSelectors(data))));
			return heroStore;
		})
		.catch(error => {
			return [];
		});
};

const dataSelectors = data => {
	let id = data.id;
	let name = data.name;

	let intelligence = data.powerstats.intelligence;
	let strength = data.powerstats.strength;
	let speed = data.powerstats.speed;
	let durability = data.powerstats.durability;
	let power = data.powerstats.power;
	let combat = data.powerstats.combat;
	let life = data.powerstats.durability;

	let fullname = data.biography['full-name'];
	let publisher = data.biography.publisher;
	let alignment = data.biography.alignment;

	let gender = data.appearance.gender;
	let race = data.appearance.race;
	let height = data.appearance.height[1];
	let weight = data.appearance.weight[1];

	let image = data.image;

	let star;

	return {
		id,
		name,
		powerstats: {
			intelligence,
			strength,
			speed,
			durability,
			power,
			combat,
			life,
		},
		biography: { fullname, publisher, alignment },
		appearance: { gender, race, height, weight },
		image,
		star,
		loading: false,
	};
};

const createHero = data => {
	let id = data.id;
	let name = data.name;

	let intelligence = normalizePowerstats(data.powerstats.intelligence);
	let strength = normalizePowerstats(data.powerstats.strength);
	let speed = normalizePowerstats(data.powerstats.speed);
	let durability = normalizePowerstats(data.powerstats.durability);
	let power = normalizePowerstats(data.powerstats.power);
	let combat = normalizePowerstats(data.powerstats.combat);

	let fullname = normalizeInformations(data.biography.fullname);
	let publisher = normalizeInformations(data.biography.publisher);
	let alignment = normalizeInformations(data.biography.alignment);

	let gender = normalizeInformations(data.appearance.gender);
	let race = normalizeInformations(data.appearance.race);
	let height = normalizeInformations(data.appearance.height);
	let weight = normalizeInformations(data.appearance.weight);

	let image = normalizeInformations(data.image);

	let life = durability + 100;

	let star = (intelligence + strength + speed + durability * 2 + power + combat) / 100;

	return {
		id,
		name,
		powerstats: {
			intelligence,
			strength,
			speed,
			durability,
			power,
			combat,
			life,
		},
		biography: { fullname, publisher, alignment },
		appearance: { gender, race, height, weight },
		image,
		star,
		loading: false,
		asCritical: false,
		asMissed: false,
	};
};

// Normalizers
const normalizePowerstats = stats => (stats !== 'null' ? parseInt(stats) : Math.floor(Math.random() * 40) + 20);
const normalizeInformations = data =>
	data !== 'null' && data !== '0 cm' && data !== '0 kg' && data !== '' ? data : 'Unknown';
// End Normalizers

export default getDatasFromApi;

import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';
import CardHero from './CardHero/CardHero';
import getDatasFromApi from '../functions/getDatasFromApi';
import handleCombat from '../functions/handleCombat';
import Loading from './Loading.jsx';
import BackToMain from './BackToMain.jsx';

const RandomCombat = () => {
	const [hero1, setHero1] = useState({ loading: true });
	const [hero2, setHero2] = useState({ loading: true });
	const [hideButton, setHideButton] = useState(false);
	const [inCombat, setInCombat] = useState(false);
	const [hero1DealingDamage, setHero1DealingDamage] = useState(false);
	const [hero1ReceivingDamage, setHero1ReceivingDamage] = useState(false);
	const [hero2DealingDamage, setHero2DealingDamage] = useState(false);
	const [hero2ReceivingDamage, setHero2ReceivingDamage] = useState(false);
	let firstAttack;

	useEffect(() => {
		getDatasFromApi().then(hero => setHero1(hero));
		getDatasFromApi().then(hero => setHero2(hero));
	}, []);

	const winnerName = () => {
		return hero1.powerstats.life ? hero1.name : hero2.name;
	};

	const handleClickSelect = () => {
		setHideButton(false);
		setHero1({ loading: true });
		setHero2({ loading: true });
		getDatasFromApi().then(hero => setHero1(hero));
		getDatasFromApi().then(hero => setHero2(hero));
	};

	const handleClickCombat = () => {
		setInCombat(true);
		setHideButton(true);
		if (hero1.powerstats.speed > hero2.powerstats.speed) {
			firstAttack = true;
		} else {
			firstAttack = false;
		}

		combatLoop();
	};

	const combatLoop = () => {
		if (hero1.powerstats.life !== 0 && hero2.powerstats.life !== 0 && !hero2.loading) {
			let newStats = handleCombat({ hero1, hero2, firstAttack });
			setHero1(newStats.hero1);
			setHero2(newStats.hero2);

			setHero1DealingDamage(newStats.hero1DealingDamage);
			setHero1ReceivingDamage(newStats.hero1ReceivingDamage);
			setHero2DealingDamage(newStats.hero2DealingDamage);
			setHero2ReceivingDamage(newStats.hero2ReceivingDamage);
			firstAttack = newStats.firstAttack;

			setTimeout(combatLoop, 1000);
		} else {
			setInCombat(false);
			if (hero2.powerstats.life <= 0) {
				setHero1DealingDamage(false);
				setHero2DealingDamage(false);
			}
			if (hero1.powerstats.life <= 0) {
				setHero1DealingDamage(false);
				setHero2DealingDamage(false);
			}
		}
	};

	const loadingHeroes = hero => {
		return hero.loading ? <Loading /> : <CardHero props={hero} />;
	};

	let hero1Anime = '';
	let hero2Anime = '';
	if (hero1DealingDamage && hero2ReceivingDamage) {
		hero2Anime += 'shaking';
		hero1Anime += 'h1Attacking';
	}
	if (hero2DealingDamage && hero1ReceivingDamage) {
		hero1Anime += 'shaking';
		hero2Anime += 'h2Attacking';
	}

	const hideCenter = () => {
		if (hideButton) {
			return hideButton && inCombat ? (
				''
			) : (
				<div className='winner'>
					<p>Winner is :</p>
					<p>{winnerName()}</p>
					<Button onClick={handleClickSelect} className='newcombat-button' color='secondary'>
						New Combat
					</Button>
				</div>
			);
		} else {
			return (
				<div>
					{hero1.loading || hero2.loading ? (
						<div>
							<Button className='random-button' color='secondary'>
								Retriving Datas
							</Button>
							<div className='gap'> </div>
						</div>
					) : (
						<div>
							<Button onClick={handleClickSelect} className='random-button' color='secondary'>
								Randomize Hero
							</Button>
							<img
								className='vs-img animate'
								src='http://www.sclance.com/pngs/vs-png/vs_png_1474185.png'
								alt='logo vs'
							/>
							<Button onClick={handleClickCombat} className='fight-button' color='danger'>
								FIGHT
							</Button>
						</div>
					)}
				</div>
			);
		}
	};

	return (
		<div style={{ width: '96%', marginLeft: '1%' }}>
			<BackToMain />
			<Row className=' centerBand' style={{ marginTop: '5%' }}>
				<Col xs='4'>
					<div className={hero1Anime}>{loadingHeroes(hero1)}</div>
				</Col>
				<Col xs='4'>{hideCenter()}</Col>
				<Col xs='4'>
					<div className={hero2Anime}>{loadingHeroes(hero2)}</div>
				</Col>
			</Row>
		</div>
	);
};

export default RandomCombat;

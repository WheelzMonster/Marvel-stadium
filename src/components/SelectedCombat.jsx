import React, { useState, useEffect } from 'react';
import { Row, Col, Button } from 'reactstrap';
import CardHero from './CardHero/CardHero';
import getDatasFromApi from '../functions/getDatasFromApi';
import handleCombat from '../functions/handleCombat';
import customHeros from '../functions/customHeros';
import BackToMain from './BackToMain.jsx';
import ResumeCombatDamage from './ResumeCombatDamage.jsx';
import Loading from './Loading.jsx';

const SelectedCombat = () => {
	const [hero1, setHero1] = useState();
	const [hero2, setHero2] = useState();
	const [winStrike, setWinStrike] = useState(0);
	const [search, setSearch] = useState('');
	const [lastSearch, setLastSearch] = useState('');
	const [heroStore, setHeroStore] = useState([]);
	const [asLost, setAsLost] = useState(false);
	const [inCombat, setInCombat] = useState(false);
	const [heroStoreLoading, setHeroStoreLoading] = useState(false);
	const [hero1DealingDamage, setHero1DealingDamage] = useState(false);
	const [hero1ReceivingDamage, setHero1ReceivingDamage] = useState(false);
	const [hero2DealingDamage, setHero2DealingDamage] = useState(false);
	const [hero2ReceivingDamage, setHero2ReceivingDamage] = useState(false);
	const [historyArrayCombatDamage, setHistoryArrayCombatDamage] = useState([]);
	let firstAttack;

	useEffect(() => {
		setHero2({ loading: true });
		getDatasFromApi().then(hero2data => setHero2(hero2data));
		setHistoryArrayCombatDamage([]);
	}, []);

	const handleClickCombat = () => {
		if (hero1.powerstats.speed > hero2.powerstats.speed) {
			firstAttack = true;
		} else {
			firstAttack = false;
		}
		setInCombat(true);

		combatLoop();
	};

	const combatLoop = () => {
		if (hero1.powerstats.life !== 0 && hero2.powerstats.life !== 0 && !hero2.loading) {
			let newStats = handleCombat({ hero1, hero2, firstAttack });
			setHero1(newStats.hero1);
			setHero2(newStats.hero2);

			if (newStats.hero1DealingDamage) {
				historyArrayCombatDamage.push([
					newStats.hero1.name,
					newStats.hero2.name,
					newStats.damageDeal,
					newStats.hero2.asMissed,
					newStats.hero1.asCritical,
				]);
			} else {
				historyArrayCombatDamage.push([
					newStats.hero2.name,
					newStats.hero1.name,
					newStats.damageDeal,
					newStats.hero1.asMissed,
					newStats.hero2.asCritical,
				]);
			}

			setHero1DealingDamage(newStats.hero1DealingDamage);
			setHero1ReceivingDamage(newStats.hero1ReceivingDamage);

			setHero2DealingDamage(newStats.hero2DealingDamage);
			setHero2ReceivingDamage(newStats.hero2ReceivingDamage);
			firstAttack = newStats.firstAttack;

			setTimeout(combatLoop, 1000);
		} else {
			setInCombat(false);
			if (hero2.powerstats.life <= 0) {
				setWinStrike(winStrike + 1);
				setHero1DealingDamage(false);
				setHero2DealingDamage(false);
				setHero1({ ...hero1, asCritical: false, asMissed: false });
				setHero2({ ...hero2, asCritical: false, asMissed: false });
			}
			if (hero1.powerstats.life <= 0) {
				setAsLost(true);
				setHero1DealingDamage(false);
				setHero2DealingDamage(false);
				setHero1({ ...hero1, asCritical: false, asMissed: false });
				setHero2({ ...hero2, asCritical: false, asMissed: false });
			}
		}
	};

	const callHeroList = soughtWord => {
		if (soughtWord === 'Galvao') {
			setHero1(customHeros.Galvao);
		} else if (soughtWord === 'Vivier') {
			setHero1(customHeros.Vivier);
		} else {
			setLastSearch(soughtWord);
			setHeroStoreLoading(true);
			getDatasFromApi(soughtWord)
				.then(heroStoreDatas => setHeroStore(heroStoreDatas))
				.then(() => setHeroStoreLoading(false));
		}
	};

	const selectNextOppenent = () => {
		let NewLife = Math.ceil(hero1.powerstats.life + hero1.powerstats.durability / 5);
		if (NewLife >= hero1.powerstats.durability + 100) {
			NewLife = hero1.powerstats.durability + 100;
		}

		setHero1({
			...hero1,
			asCritical: false,
			asMissed: false,
			powerstats: { ...hero1.powerstats, life: NewLife },
		});
		setHero2({ ...hero2, loading: true, asCritical: false, asMissed: false });

		setInCombat(false);
		getDatasFromApi().then(hero2data => setHero2(hero2data));
	};

	const resetCombat = () => {
		setHistoryArrayCombatDamage([]);
		setHero1({
			...hero1,
			powerstats: { ...hero1.powerstats, life: hero1.powerstats.durability + 100 },
		});
		setWinStrike(0);
		setHero2({ ...hero2, loading: true });
		setAsLost(false);
		setInCombat(false);
		getDatasFromApi().then(hero2data => setHero2(hero2data));
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

	return (
		<div style={{ width: '96%', marginLeft: '0' }}>
			{inCombat ? (
				<Button className='m-1' color='primary'>
					Fight in Progress
				</Button>
			) : search ? (
				<div>
					<BackToMain />
					<Button
						className='m-1'
						name='Reset hero'
						color='info'
						style={{ fontSize: '1vw' }}
						onClick={() => {
							setHero1();
							setHero2({ loading: true });
							getDatasFromApi().then(hero2data => {
								setHero2(hero2data);
							});
							setHeroStore([]);
							setSearch('');
							setAsLost(false);
							setLastSearch('');
							setWinStrike(0);
						}}>
						{hero1 ? 'Change hero' : 'Reset Search'}
					</Button>
				</div>
			) : (
				<div>
					<BackToMain />
					<Button
						className='m-1'
						color='secondary'
						style={{ fontSize: '1vw' }}
						onClick={() => {
							getDatasFromApi().then(hero1data => {
								setHero1(hero1data);
								setHistoryArrayCombatDamage([]);
								setSearch('Random Hero');
							});
						}}>
						Random Hero
					</Button>
				</div>
			)}
			{hero1 ? (
				<Row className='ml-3'>
					<Col xs={{ size: 6, order: 1 }} sm={{ size: 4 }}>
						<div className={hero1Anime}>
							<CardHero props={hero1} />
						</div>
					</Col>
					<Col xs={{ size: 10, offset: 1, order: 3 }} sm={{ size: 4, offset: 0, order: 2 }}>
						{hero2.loading ? (
							<Loading />
						) : asLost ? (
							<div>
								<Button className='newCampaign-button' style={{ fontSize: '1vw' }} onClick={() => resetCombat()}>
									New Campaign
								</Button>
								<p
									style={{
										textAlign: 'center',
										color: 'black',
										// marginTop: '21%',
										broder: 'black 1px solid',
										background: 'rgb(255,255,255,0.8)',
										borderRadius: '10px',
										padding: '5%',
									}}>
									You won {winStrike} match
								</p>
							</div>
						) : inCombat ? (
							''
						) : hero2.powerstats.life > 0 ? (
							<Button onClick={() => handleClickCombat()} className='fight-button'>
								Start Fight
							</Button>
						) : (
							<Button onClick={() => selectNextOppenent()} className='random-button'>
								Next Oppenent
							</Button>
						)}
					</Col>
					<Col xs={{ size: 5, order: 2 }} sm={{ size: 4 }}>
						<div className={hero2Anime}>{hero2.loading ? <Loading /> : <CardHero props={hero2} />}</div>
					</Col>
					<Col xs={{ size: 12, order: 4 }}>
						<ResumeCombatDamage historyArray={[...historyArrayCombatDamage]} />
					</Col>
				</Row>
			) : (
				<div style={{ marginTop: '1%', width: '96%', marginLeft: '2%', textAlign: 'center' }}>
					{heroStoreLoading ? (
						<h1>Searching</h1>
					) : lastSearch ? (
						heroStore.length !== 0 ? (
							<div>
								<h1>Select your hero</h1>
								<h3>
									There is {heroStore.length} match for your search ({lastSearch})
								</h3>
							</div>
						) : (
							<h1>There is no match for your search ({lastSearch})</h1>
						)
					) : (
						<h1
							style={{
								textAlign: 'center',
								color: 'black',
								marginTop: '21%',
								broder: 'black 1px solid',
								background: 'rgb(255,255,255,0.8)',
								width: '50%',
								fontSize: '4vw',
								margin: '10% auto',
								padding: '1%',
								borderRadius: '10px',
							}}>
							Search your hero
						</h1>
					)}

					<form
						onSubmit={e => {
							e.preventDefault();
							if (search) {
								return callHeroList(search);
							}
						}}>
						<input
							style={{ borderRadius: '5px', border: 'blue 1px solid' }}
							type='text'
							onChange={e => setSearch(e.target.value)}
							value={search}
							name='search'
							id='search'
							autoComplete='off'
						/>
						<input
							style={{
								borderRadius: '5px',
								border: 'gold 1px solid',
								color: 'red',
								background: 'blue',
								margin: 'auto',
							}}
							className='ml-1'
							type='submit'
							value='S'
						/>
					</form>
					<Row>
						{heroStore.map(x => (
							<Col key={x.id} xs='4' onClick={() => setHero1(x)}>
								<CardHero props={x} />
							</Col>
						))}
					</Row>
				</div>
			)}
		</div>
	);
};

export default SelectedCombat;

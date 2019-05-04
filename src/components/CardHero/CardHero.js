import React from 'react';
import CardFrame from './CardFrame.jsx';
import CardHead from './CardHead.jsx';
import CardBackground from './CardBackground/CardBackground';
import CardLife from './CardLife.jsx';
import CardStatus from './CardStatus.jsx';
import PropTypes from 'prop-types';

const CardHero = ({ props }) => {
	let golden = false;
	if (props.star > 6) {
		golden = true;
	}

	let cardContainer = {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		margin: 'auto',
		width: '30vw',
		border: '1px solid black',
		borderRadius: '2vw',
		background: '#171314',
		boxSizing: 'border-box',
		padding: '0',
		maxHeigth: '15vw',
	};

	if (golden) {
		cardContainer = { ...cardContainer, border: '1px solid gold', background: 'gold' };
	}

	return (
		<div style={cardContainer} key={props.id}>
			<CardBackground image={props.image} star={props.star} backupImg={props.backupImg} />
			<CardHead name={props.name} star={props.star} golden={golden} />
			<CardStatus asCritical={props.asCritical} asMissed={props.asMissed} />
			<CardFrame
				powerstats={props.powerstats}
				biography={props.biography}
				appearance={props.appearance}
				golden={golden}
			/>

			<CardLife powerstats={props.powerstats} golden={golden} />
		</div>
	);
};

export default CardHero;

CardHero.propTypes = {
	props: PropTypes.object.isRequired,
};

import React from 'react';
import { Progress } from 'reactstrap';
import PropTypes from 'prop-types';

const CardLife = ({ powerstats, golden }) => {
	const cardLife = {
		position: 'absolute',
		marginTop: '23vw',
		marginLeft: '8vw',
		width: '10vw',
	};
	const lifeBar = {
		minHeight: '8px',
		maxHeight: '2vw',
		background: '#ccc',
		height: '2vw',
		width: '10vw',
	};

	// const displayLifeStyle = {
	// 	position: 'absolute',
	// 	color: 'black',
	// 	marginLeft: '60%',
	// 	fontSize: '1.5vw',
	// };

	let color;
	let remaningLife = (powerstats.life / (powerstats.durability + 100)) * 100;
	if (remaningLife >= 50) {
		color = 'success';
	} else if (remaningLife < 49 && remaningLife >= 25) {
		color = 'warning';
	} else {
		color = 'danger';
	}

	return (
		<div style={cardLife}>
			<Progress
				animated={golden}
				style={lifeBar}
				color={color}
				value={powerstats.life}
				max={powerstats.durability + 100}>
				{/* <div style={displayLifeStyle}>{powerstats.life}</div> */}
			</Progress>
		</div>
	);
};

export default CardLife;

CardLife.propTypes = {
	powerstats: PropTypes.object.isRequired,
	golden: PropTypes.bool,
};

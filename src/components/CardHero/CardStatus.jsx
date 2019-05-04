import React from 'react';
import PropTypes from 'prop-types';

const CardStatus = ({ asCritical, asMissed }) => {
	const CardStatus = {
		position: 'absolute',
		marginTop: '15vw',
	};

	const statusStyle = {
		width: '16vw',
		fontSize: '1.3vw',
		textAlign: 'center',
		backgroundColor: 'black',
		color: 'red',
		padding: '5px',
		textDecoration: 'bold',
		borderRadius: '2vw',
	};

	return (
		<div style={CardStatus}>
			{asCritical && <div style={statusStyle}>Critical Hit</div>}
			{asMissed && <div style={statusStyle}>Miss</div>}
		</div>
	);
};

CardStatus.propTypes = {
	asCritical: PropTypes.bool.isRequired,
	asMissed: PropTypes.bool.isRequired,
};

export default CardStatus;

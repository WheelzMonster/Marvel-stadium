import React from 'react';
import PropTypes from 'prop-types';

const CardFrame = ({ powerstats, biography, appearance }) => {
	const cardFrame = {
		color: '#2c3e50',
		width: '28vw',
		fontSize: '1.3vw',
		backgroundColor: '#bbb',
		opacity: '0.9',
		border: '2px solid black',
		position: 'absolute',
		borderRadius: '2vw',
		marginTop: '25vw',
		maxHeight: '32%',
		height: '32%',
		maxWidth: '100%',
		textAlign: 'center',
	};

	const thhead = {
		color: '#d35400',
	};

	const thbody = {
		color: 'black',
	};

	return (
		<div style={cardFrame}>
			<table style={{ width: '90%', margin: 'auto' }}>
				<thead>
					<tr style={thhead}>
						<th>INT</th>
						<th>STR</th>
						<th>SPD</th>
						<th>END</th>
						<th>POW</th>
						<th>CBT</th>
					</tr>
				</thead>
				<tbody>
					<tr style={thbody}>
						<td>{powerstats.intelligence}</td>
						<td>{powerstats.strength}</td>
						<td>{powerstats.speed}</td>
						<td>{powerstats.durability}</td>
						<td>{powerstats.power}</td>
						<td>{powerstats.combat}</td>
					</tr>
				</tbody>
			</table>
			<div>
				<div>Full-name: {biography.fullname}</div>
				<div>Alignement : {biography.alignment}</div>
				<div>
					Height : {appearance.height} - Weigth: {appearance.weight}
				</div>
				<div>Univers : {biography.publisher}</div>
			</div>
		</div>
	);
};

export default CardFrame;

CardFrame.propTypes = {
	powerstats: PropTypes.object.isRequired,
	biography: PropTypes.object.isRequired,
	appearance: PropTypes.object.isRequired,
};

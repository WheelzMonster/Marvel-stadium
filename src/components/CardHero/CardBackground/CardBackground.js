import React from 'react';
import './CardBackground.css';
import PropTypes from 'prop-types';

const CardBackground = ({ image, star }) => {
	return (
		<div className='card-background'>
			<img
				src={image.url}
				onError={e => {
					e.target.className = 'silouhette';
					e.target.onError = null;
					e.target.src =
						'https://www.ambiance-sticker.com/images/Image/silhouette-d-un-superheros-ambiance-sticker-SB_0124.png';
				}}
				alt='Pic not found'
			/>
		</div>
	);
};

export default CardBackground;

CardBackground.propTypes = {
	image: PropTypes.object.isRequired,
	star: PropTypes.number.isRequired,
};

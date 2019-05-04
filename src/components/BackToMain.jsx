import React from 'react';
import { NavLink } from 'react-router-dom';

const BackToMain = () => {
	return (
		<NavLink
			className='btn outline btn-primary m-1'
			style={{ fontSize: '1vw' }}
			activeClassName='btn-danger'
			exact
			to='/'>
			Back to Main
		</NavLink>
	);
};

export default BackToMain;

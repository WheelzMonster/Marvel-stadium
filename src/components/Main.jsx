import React from 'react';
import { NavLink } from 'react-router-dom';

const Main = () => {
	const content = {
		textAlign: 'center',
		color: 'black',
		marginTop: '21%',
		broder: 'black 1px solid',
		background: 'rgb(255,255,255,0.8)',
		width: '50%',
		margin: '10% auto',
		padding: '1%',
		borderRadius: '10px',
	};
	return (
		<div style={content}>
			<h1 style={{ fontSize: '3vw' }}>Welcome to the arena </h1>
			<p>You will see heroes fight each other</p>
			<p>Only one can stay alive</p>
			<p>Your objective : survive the longest time in the arena !</p>
			<p>May the gods be with you ...</p>
			{/* Condensed in the select hero page */}
			{/* <NavLink className='btn btn-primary m-1' activeClassName='btn-danger' to='/random'>
				Random Combat
			</NavLink> */}
			<NavLink style={{ fontSize: '1vw' }} className='btn btn-primary m-1' activeClassName='btn-danger' to='/selected'>
				Enter
			</NavLink>
		</div>
	);
};

export default Main;

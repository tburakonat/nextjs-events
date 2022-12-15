import React from 'react';
import MainHeader from './MainHeader';

export default function Layout(props) {
	return (
		<React.Fragment>
			<MainHeader />
			<main>{props.children}</main>
		</React.Fragment>
	);
}

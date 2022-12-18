import React, { useContext } from 'react';
import MainHeader from './MainHeader';
import Notification from '../notification/Notification';
import NotificationContext from '../../store/notification-context';

export default function Layout(props) {
	const notificationContext = useContext(NotificationContext);

	const activeNotification = notificationContext.notification;

	return (
		<React.Fragment>
			<MainHeader />
			<main>{props.children}</main>
			{activeNotification && (
				<Notification
					title={activeNotification.title}
					message={activeNotification.message}
					status={activeNotification.status}
				/>
			)}
		</React.Fragment>
	);
}

import { useState, useEffect, useContext } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import styles from './Comments.module.css';
import NotificationContext from '../../store/notification-context';

function Comments(props) {
	const { eventId } = props;

	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);
	const [isFetching, setIsFetching] = useState(false);

	const { showNotification } = useContext(NotificationContext);

	useEffect(() => {
		if (showComments) {
			setIsFetching(true);
			fetch(`/api/comments/${eventId}`)
				.then(res => {
					if (res.ok) {
						return res.json();
					}

					return res.json().then(data => {
						throw Error(data.message || 'Something went wrong!');
					});
				})
				.then(data => {
					setIsFetching(false);
					setComments(data.comments);
				})
				.catch(err => showNotification({ title: 'Error!', message: err.message, status: 'error' }));
		}
	}, [showComments]);

	function toggleCommentsHandler() {
		setShowComments(prevStatus => !prevStatus);
	}

	function addCommentHandler(commentData) {
		showNotification({
			title: 'Sending comment...',
			message: 'Your comment is currently being stored into a database.',
			status: 'pending',
		});
		fetch(`/api/comments/${eventId}`, {
			method: 'POST',
			body: JSON.stringify(commentData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => {
				if (res.ok) {
					return res.json();
				}

				return res.json().then(data => {
					throw Error(data.message || 'Something went wrong!');
				});
			})
			.then(() => {
				showNotification({ title: 'Success!', message: 'Your comment was saved!', status: 'success' });
			})
			.catch(err => showNotification({ title: 'Error!', message: err.message, status: 'error' }));
	}

	return (
		<section className={styles.comments}>
			<button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && comments && comments.length !== 0 && <CommentList items={comments} />}
			{showComments && isFetching && <p>Loading...</p>}
		</section>
	);
}

export default Comments;

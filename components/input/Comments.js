import { useState, useEffect } from 'react';

import CommentList from './CommentList';
import NewComment from './NewComment';
import styles from './Comments.module.css';

function Comments(props) {
	const { eventId } = props;

	const [showComments, setShowComments] = useState(false);
	const [comments, setComments] = useState([]);

	useEffect(() => {
		if (showComments) {
			fetch(`/api/comments/${eventId}`)
				.then(res => res.json())
				.then(data => {
					console.log(data);
					setComments(data.comments);
				})
				.catch(err => console.log(err.message));
		}
	}, [showComments]);

	function toggleCommentsHandler() {
		setShowComments(prevStatus => !prevStatus);
	}

	function addCommentHandler(commentData) {
		fetch(`/api/comments/${eventId}`, {
			method: 'POST',
			body: JSON.stringify(commentData),
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then(res => res.json())
			.then(data => console.log(data))
			.catch(err => console.log(err));
	}

	return (
		<section className={styles.comments}>
			<button onClick={toggleCommentsHandler}>{showComments ? 'Hide' : 'Show'} Comments</button>
			{showComments && <NewComment onAddComment={addCommentHandler} />}
			{showComments && comments && comments.length !== 0 && <CommentList items={comments} />}
		</section>
	);
}

export default Comments;

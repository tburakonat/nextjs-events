import styles from './CommentList.module.css';

function CommentList(props) {
	console.log(props.items);
	return (
		<ul className={styles.comments}>
			{props.items.map(item => {
				return (
					<li key={item._id}>
						{' '}
						<p>{item.text}</p>
						<div>
							By <address>{item.name}</address>
						</div>
					</li>
				);
			})}
		</ul>
	);
}

export default CommentList;

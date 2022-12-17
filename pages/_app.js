import Head from 'next/head';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Head>
				<title>Next Events</title>
				<meta name="decription" content="Find a lot of great events that allow you to evolve" />
				<meta name="viewport" content="initial-scale=1.0, width=device-width" />
			</Head>
			<Component {...pageProps} />
		</Layout>
	);
}

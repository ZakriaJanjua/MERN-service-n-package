import {Link} from 'react-router-dom';

const Home = () => {
	return (
		<div>
			<div style={{ textAlign: 'center' }}>
				<h1>Welcome</h1>
				<p>Navigate to Services or Packages</p>
			</div>
			<div style={{display: 'flex', justifyContent: 'center', gap: '5%'}}>
				<Link to='/service'>Service</Link>
				<Link to='/package'>Package</Link>
			</div>
		</div>
	);
};

export default Home;

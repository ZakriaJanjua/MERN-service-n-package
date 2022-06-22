/* eslint-disable react-hooks/exhaustive-deps */
import './Service.css';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
	saveName,
	saveDescription,
	savePrice,
	selectServices,
} from '../../features/serviceSlice';
import axios from 'axios';
import { useEffect, useState } from 'react';
const Service = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:5000/service')
			.then(res => setData(...data, res.data));
	}, []);

	const services = useSelector(selectServices);

	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		axios
			.post('http://localhost:5000/service', {
				name: services.name,
				description: services.description,
				price: services.price,
			})
			.then((result) => console.log(result))
			.catch((err) => console.error(err));
	};

	return (
		<div>
			<h1 className='heading'>Service</h1>
			<div className='form-container'>
				<form>
					<div className='form-element'>
						<label htmlFor='name'>Name</label>
						<br />
						<input
							id='name'
							type='text'
							onChange={(e) => dispatch(saveName(e.target.value))}
						/>
					</div>
					<div className='form-element'>
						<label htmlFor='description'>Description</label>
						<br />
						<textarea
							id='description'
							cols='30'
							rows='5'
							onChange={(e) => dispatch(saveDescription(e.target.value))}
						></textarea>
					</div>
					<div className='form-element'>
						<label htmlFor='price'>Price</label>
						<br />
						<input
							id='price'
							type='number'
							onChange={(e) => dispatch(savePrice(e.target.value))}
						/>
					</div>
					<div className='form-element'>
						<input type='submit' onClick={handleSubmit} />
					</div>
				</form>
			</div>
			<br />
			<br />
			<hr />
			{data.map(service => {
				return(
					<div key={service._id}>
						<p>
						{service.name}
						</p>
						<p>
						{service.description}
						</p>
						<p>
						{service.price}
						</p>
						<hr />
					</div>
				)
			})}
		</div>
	);
};

export default Service;

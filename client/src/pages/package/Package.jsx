/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import {
	saveDescription,
	addService,
	selectPackage,
	saveName,
} from '../../features/packageSlice';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Package = () => {
	const [data, setData] = useState([]);
	const [service, setService] = useState([]);


	useEffect(() => {
		axios
			.get('http://localhost:5000/package')
			.then((res) => setData(...data, res.data))
			.catch((err) => console.error(err));

		axios
			.get('http://localhost:5000/service')
			.then((res) => setService(...service, res.data))
			.catch((err) => console.error(err));
	}, []);

	const packages = useSelector(selectPackage);
	const [image, setImage] = useState();
	const dispatch = useDispatch();
	const handleSubmit = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', image, image.name);
		formData.append('services', JSON.stringify(packages.services));
		formData.append('name', packages.name);
		formData.append('description', packages.description);

		axios
			.post('http://localhost:5000/package', formData )
			.then(console.log)
			.catch((err) => console.log(err));
	};

	return (
		<div>
			<h1 className='heading'>Package</h1>
			<div className='form-container'>
				<form>
					<div className='form-element'>
						<label htmlFor='image'>Name</label>
						<br />
						<input
							id='image'
							type='text'
							onChange={(e) => dispatch(saveName(e.target.value))}
						/>
					</div>
					<div className='form-element'>
						<label htmlFor='image'>Upload Image</label>
						<br />
						<input
							id='image'
							type='file'
							accept='image/*'
							onChange={(e) => setImage(e.target.files[0])}
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
						<label htmlFor='service'>Service</label>
						<br />
						{service.map((item) => {
							return (
								<button
									onClick={(e) => {
										e.preventDefault();
										dispatch(addService(e.target.value));
									}}
									value={item._id}
									key={item._id}
									disabled={packages.services.includes(item._id)}
								>
									{item.name}
								</button>
							);
						})}
					</div>
					<div className='form-element'>
						<input type='submit' onClick={handleSubmit} />
					</div>
				</form>
			</div>
			<br />
			<br />
			<hr />
			{data.map((item) => {
				return (
					<div key={item._id}>
						<div>
							<img
								style={{ width: '100px', height: '100px' }}
								src={`http://localhost:5000/uploads/${item.image}`}
								alt='zac'
							/>
						</div>
						<p>{item.name}</p>
						<p>{item.description}</p>
						{item.services ? <p>Services:</p> : null}
						{item.services?.map((service) => {
							return (
								<div key={service._id}>
									<p>{service.name}</p>
									<p>{service.price}</p>
								</div>
							);
						})}
						<hr />
					</div>
				);
			})}
		</div>
	);
};

export default Package;

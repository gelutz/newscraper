import { Routes as Switch } from 'react-router'
import { Route } from 'react-router-dom';


import Home from '../pages/Home';
import Login from '../pages/Login/';

function Routes() {
	return (
		<>
			<Switch>
				<Route path="/" element={<Home />} />
				<Route path="/login" element={<Login />} />
			</Switch>
		</>
	);
}

export default Routes;

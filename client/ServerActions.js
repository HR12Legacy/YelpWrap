import axios from 'axios';

const ServerActions = {
	postRequest: (endpoint, object, callback) => {
		axios.post(endpoint, object)
		.then((response) => {
			callback(response);
		})
	},
	getRequest: (endpoint, callback) => {
		axios.get(endpoint)
		.then((response) => {
			callback(response);
		})
	}
}

export default ServerActions;;
import axios from 'axios';

export default class ServicioPeticionPublicaciones {

    // getProductsSmall() {
	// 	return axios.get('data/products-small.json').then(res => res.data.data);
	// }

	getEventos() {
		return axios.get('data/eventos.json').then(res => res.data.data);
    }

    // getProductsWithOrdersSmall() {
	// 	return axios.get('data/products-orders-small.json').then(res => res.data.data);
	// }
}

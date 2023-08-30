import { Order } from '../model/order';
const orderValidator = require('../validator/orderValidator')
const axios = require('axios');

module.exports.getOrders = async function (): Promise<Order[]> {
    try {
        const response = await axios.get('http://localhost:8080/api/orders');

        return response.data;
    } catch (e) {
        throw new Error('Could not get products')
    }
}

module.exports.createOrder = async function (order:Order) : Promise<Number> {
    const error: string = orderValidator.validateOrder(order);
    if(error){
        throw new Error(error);
    }

    try {
        const response = await axios.post('http://localhost:8080/api/orders/',order)

        return response.data
    } catch (e) {
        throw new Error('Could not Create Order')
    }
}

module.exports.getOrderById = async function (id: number): Promise<Order> {
    try {
        const response = await axios.get('http://localhost:8080/api/orders/'+ id);

        return response.data;
    } catch (e) {
        throw new Error('Could not get Order by ID')
    }
}
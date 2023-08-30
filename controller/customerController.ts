import { Customer } from '../model/customer';
import { Application, Request, Response } from "express";
const customerService = require('../service/customerService')

module.exports = function(app: Application){

    app.get('/create-order', async (req: Request, res: Response) =>{
        let data: Customer[];

        try {
            data = await customerService.getCustomers()
        } catch (e) {
            console.error(e);
            
        }

        res.render('create-order', {customers : data})
    })
    
}
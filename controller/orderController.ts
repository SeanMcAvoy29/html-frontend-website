import { Order } from '../model/order';
import { Application, Request, Response } from "express";
const orderService = require('../service/orderService')

module.exports = function(app: Application){

    app.get('/orders', async (req: Request, res: Response) =>{
        let data: Order[];

        try {
            data = await orderService.getOrders()
        } catch (e) {
            console.error(e);
            
        }

        res.render('list-orders', {orders : data})
    })
    app.get('/add-order', async(req: Request, res: Response) =>{
        res.render('create-order');
    })
    app.post('/add-order', async(req: Request, res: Response) =>{
        let data: Order = req.body
        let id: Number

        try {
            id = await orderService.createOrder(data)

            res.redirect('/order/'+id)
        } catch (e) {
            console.error(e);
            res.locals.errormessage = e.message;
            res.render('create-order',req.body)

        }
        
    })

    app.get('/order/:id', async (req: Request, res: Response) =>{
        let data:Order;

        try {
            data = await orderService.getOrderById(req.params.id)
        } catch (e) {
            console.error(e);
            
        }

        res.render('view-order', {order: data})
    })

    app.get('/add-customer-id', async (req: Request, res: Response) =>{
        if(!req.session.order){
            req.session.order = {}
        }
        res.render('add-customer-id')
    })

    app.post('/add-customer-id', async (req: Request, res: Response) =>{
        req.session.order["customerId"] = req.body.customerId
        res.redirect('/add-order-date')
    })

    app.get('/add-order-date', async (req: Request, res: Response) =>{
        res.render('add-order-date')
    })

    app.post('/add-order-date', async (req: Request, res: Response) =>{
        req.session.order["orderDate"] = req.body.orderDate
        res.redirect('/add-order-confirmation')
    })


    app.get('/add-order-confirmation', async (req: Request, res: Response) =>{
        res.render('add-order-confirmation', req.session.order)
    })

    app.post('/add-order-confirmation', async (req: Request, res: Response) => {
       let data: Order = req.session.order
       let id : Number

       try {
        id = await orderService.createOrder(data)

        req.session.order = undefined

        res.redirect('/order/'+id)
        
       } catch (e) {
        console.log(e)

        res.locals.errormessage = e.message

        res.render('add-order-confirmation', req.session.order)
       }
    })
}
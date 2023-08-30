import { Request, Response } from "express";
import { Product } from "./model/product";
import { Order } from "./model/order";

const express = require('express');
const path = require('path');
const nunjucks = require('nunjucks');
const app = express();
const session = require('express-session')

//Configure Nunjucks
const appView = path.join(__dirname,'/views/');

const nunjucksConfig = {
    autoescape: true,
    noCache: true,
    express: app
};

nunjucks.configure(appView,nunjucksConfig);

//congigure Express

app.set('view engine', 'html');

app.use('/public', express.static(path.join(__dirname,'public')));

app.use(express.json())

app.use(express.urlencoded({ extended : true}))

app.use(session({ secret: 'NOT HARDCODED SECRET', cookie:{ maxAge:6000}}));

app.listen(3000, () => {
    console.log('Server is Listening on port 3000');
});

declare module "express-session" {
    interface SessionData{
        product: Product;
        order: Order;
        token: string
    }
}

// declare module "express-session" {
//     interface SessionData{
//         order: Order
//     }
// }


//Express routes 
app.get('/', async(req: Request, res: Response) =>{
    res.render('pizza',{
        title: 'New Pizza Time!'
    });
})

require('./controller/productController')(app);
require('./controller/orderController')(app);
require('./controller/customerController')(app);
require('./controller/authController')(app);
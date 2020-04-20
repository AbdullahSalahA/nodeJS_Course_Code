const Products = require('../Models/Product.js');

exports.getProduct = (req, res, next)=>{
    Products.fetchAll((products_read_buffer) => {

        res.render('shop/product-list', {
            prods: products_read_buffer,
            docTitle: 'shop',
            path: '/shop',
            prodLen: products_read_buffer.length > 0
        });
    }); 

}

exports.getIndex= (req, res, next) => {
    Products.fetchAll((products_read_buffer) => {
        res.render('shop/index.ejs', {
            prods: products_read_buffer,
            docTitle: 'Index',
            path: '/index',
            prodLen: products_read_buffer.length > 0
        });
    }); 
    }
exports.getCart= (req, res, next) => {
    
    res.render('shop/cart.ejs', {
        docTitle: 'Cart',
        path: '/cart'
    });
}
exports.getOrders= (req, res, next) => {
    
    res.render('shop/orders.ejs', {
        docTitle: 'Orders',
        path: '/orders'
    });
}



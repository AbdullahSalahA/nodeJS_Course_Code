const Products = require('../Models/Product.js');

exports.getAddProducts = (req, res, next)=>{
    // res.sendFile(path.join(rootdir,'views','add-product.html')); this for the HTML way now i will use pug lib
    res.render('add-product.pug', {
        docTitle: 'Add product',
        path: '/admin/add-product',
        addProductIsActive: true,
        addproductstyle: true
    });
}


exports.postAddProduct =  (req, res, next)=>{
    // Products.push({title : req.body.title});
    const product_ = new Products(req.body.title);
    product_.save();
    res.redirect('/');
}

exports.getProduct = (req, res, next)=>{
   //  res.render('shop');//shop.pug
    Products.fetchAll((products_read_buffer) => {

        res.render('shop.pug', {
            prods: products_read_buffer,
            doctitle: 'shop',
            path: '/shop',
            prodLen: products_read_buffer.length > 0,
            shopIsActive: true
        });
    }); 

}
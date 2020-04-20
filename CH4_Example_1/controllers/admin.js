const Products = require('../Models/Product.js');

exports.getAddProducts = (req, res, next)=>{
    // res.sendFile(path.join(rootdir,'views','add-product.html')); this for the HTML way now i will use pug lib
    res.render('admin/add-product', {
        docTitle: 'Add product',
        path: '/admin/add-product'
    });
}


exports.postAddProduct =  (req, res, next)=>{
    const product_ = new Products(
        req.body.title,
        req.body.imageUrl,
        req.body.description,
        req.body.price        
    );
    product_.save();
    res.redirect('/');
}

exports.getAdminProduct= (req, res, next) => {

    Products.fetchAll((products_read_buffer) => {

        res.render('admin/products.ejs', {
            prods: products_read_buffer,
            docTitle: 'Admin Product',
            path: '/admin/products',
            prodLen: products_read_buffer.length > 0
        });
    }); 
}
exports.getEditProduct= (req, res, next) => {
    
    res.render('admin/products.ejs', {
        docTitle: 'Admin Product',
        path: '/admin/products'
    });
}


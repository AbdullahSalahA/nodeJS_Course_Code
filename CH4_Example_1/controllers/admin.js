const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};


exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  req.user
    .createProduct({
      title: title,
      price: price,
      imageUrl: imageUrl,
      description: description
      })
    .then(result => {
      console.log('Product Is created and saved !');
      res.redirect('/admin/products');
      })
    .catch( err => console.log( err ));
};

exports.getEditProduct = (req, res, next) => {
  const editingMode = req.query.edit;
  const prodId = req.params.productId; 
  if (!editingMode)
  {
    return res.redirect('/');
  }
  req.user
    .getProducts({ where: { id: prodId } })
    // Product.findByPk(prodId)
    .then(products => {
      const product = products[0];
      if (!product)
      {
        return res.redirect('/');
        }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: 'true',
        product: product
      });
    });
};
exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescr = req.body.description;
  const updatedPrice = req.body.price;

  Product.findByPk(prodId)
    .then(product => {
      product.title = updatedTitle;
      product.imageUrl = updatedImageUrl;
      product.price = updatedPrice;
      product.description = updatedDescr;

      return product.save();
    })
    .then(() => {
      console.log('Product is updated !');
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  // Product.destroy({ where: { id: productId } }).then().catch();
  Product.findByPk(productId)
    .then(product => {
      return product.destroy();
    })
    .then(() => {
      console.log('Product is deleted!')
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
    req.user.getProducts()
    .then(products => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
  }).catch(err => console.log(err));

};

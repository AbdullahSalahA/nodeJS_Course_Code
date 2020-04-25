const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);
const getProductsFromFile = cb => {
    fs.readFile(p, (err, fileContent) => {
      if (err) {
          cb({});
      } else {
        cb(JSON.parse(fileContent));
      }
    });
  };
module.exports = class Cart {
    static addProduct(id, productPrice) {
    //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            
            let cart = { products: [], totalPrice: 0 }
            
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            //analyze the cart => find existing product 
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //add new product / increase quantatiy 
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            else 
            {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            //a +  before the variable mean convert that string to number 
            cart.totalPrice = cart.totalPrice + +productPrice;
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
                
            });
    })
    }

    static deleteProductById(id, price, cb) {
        getProductsFromFile(cart => {
            const updatedCart = { ...cart };
            const product = updatedCart.products.find(p => p.id === id);
            if (!product)
                {
                    cb();
                }
            const quantity = product.qty;
            updatedCart.products = updatedCart.products.filter(p => p.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - (price * quantity);
            fs.writeFile(p, JSON.stringify(updatedCart), (err) => {
                console.log(err);
                cb();
            });
        })
    }

    static getCart(cb)
    {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (err) {
                cb(null);
            }
            else {
                cb(cart);
            }
        });

    }

     
}
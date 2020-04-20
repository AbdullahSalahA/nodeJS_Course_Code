const path = require('path');
const fs = require('fs');

const dataFilePath = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'product.json');

const getProductData = (cb) => {
    fs.readFile(dataFilePath, (err, fileContent) => {
        if (err) {
           return cb([]);
        }
        else
        {
          cb(JSON.parse(fileContent));
        }
    });
}
module.exports = class Product {

    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductData((products) => {
            products.push(this);
            fs.writeFile(dataFilePath, JSON.stringify(products), (err) => {
                console.log(err);
            });
        })
    }

    static fetchAll(cb) {
        getProductData(cb);
    }
}
const fs = require('fs')


const RequestHandler = (req,res) => {
    const URL_S = req.url;
    const Method_s = req.method;
    if (URL_S === '/') {
        res.write('<html>');
        res.write('<head><title> Enter a massage </title></head>');
        res.write('<body> <label> Enter your massage </label><form action= "/massage" method= "POST"><input type="text" name ="massage"><button type= "submit">Send</button></form></body>');
        res.write('</html>');

        return res.end();

    }

    if (URL_S === '/massage' && Method_s === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        })
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            let massage = parsedBody.split('=')[1];
            massage = massage.replace(/\+/g, " ");
            fs.writeFile('massage.txt', massage, () => {
                // res.statusCode = 302;
                // res.setHeader('Location', '/');
                // return res.end();
            }); 
        })
    }
    //Creating a response 
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title> My first web page</title></head>');
    res.write('<body><h1 style="background-color: blue;"> Welcome To My Frist Web Page </h1></body>');
    res.write('</html>');
    res.end();

    // process.exit();

};

module.exports = {
    handler: RequestHandler,
    someText: "Some text to testing "
};
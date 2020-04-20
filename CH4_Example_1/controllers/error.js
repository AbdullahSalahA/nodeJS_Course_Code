

exports.get404error = (req, res, next) => {
    res.status(404).render('404page.ejs', {
        docTitle: 'Error Page',
        path:'/error'
    });
}
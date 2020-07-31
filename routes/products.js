var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    const data = [
        {
            title: "Example",
            description: "This is an example product.",
            price: 2.99
        }
    ];

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(data));
});

module.exports = router;

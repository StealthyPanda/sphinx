const express = require('express');
const parser = require('body-parser');
const path = require('path');
const sph = require('./sphinx');

// const fileting = require('express-fileupload')

const mainport = 80;
const main = express();

// main.use(fileting({createParentPath:true}));
main.use(express.json());
main.use(parser.urlencoded({extended : true}));
// main.use(express.static(path.join(__dirname, 'statics')));
// main.use(express.static(path.join(__dirname, 'webapp', 'build')));

main.get('/auth', (req, res) => {
    // console.log(req.body);
    
    const result = sph.validate(req.body.cwid, req.body.fqdn, req.body.uid, req.body.pass);

    if (result)
    {
        res.json({
            "auth" : true,
            "message" : "👍User authenticated."
        });
    }
    else
    {
        res.status(422);
        res.json({
            "auth" : false,
            "message" : "🙅User not found. Authentication failed."
        });
    }
});

main.post('/auth', (req, res) => {
    if (sph.register(req.body.cwid, req.body.fqdn, req.body.uid, req.body.pass))
    {
        res.status(422);
        res.json({
            "status" : false,
            "message" : "🤷User already registered."
        });
    }
    else
    {
        res.json({
            "status" : true,
            "message" : "✅User registered successfully."
        })
    }
});





main.listen(mainport, () => {
    console.log(`Sphinx API started on port ${mainport}\nAvailable endpoints:\n-> /\n-> /auth`);
});
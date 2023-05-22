const express = require('express');
const parser = require('body-parser');
const path = require('path');
const sph = require('./sphinx');

const mainport = 80;
const main = express();

main.use(express.json({type : 'application/json'}));
main.use(parser.urlencoded({extended : true}));
main.use(express.static(path.join(__dirname, 'authwebapp', 'build')));

//-------------------------------------------------------------------------------------------------
// /auth endpoints handling (registering and validation):

main.options('/auth', (req, res) => {
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
    // console.log("Entered post handler");
    // console.log(req.body);
    // console.log(req.body.cwid, req.body.fqdn, req.body.uid, req.body.pass);
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
        res.status(200);
        res.json({
            "status" : true,
            "message" : "✅User registered successfully."
        })
    }
});
//-------------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------------------
// Serving webapp stuff

main.get('/', (_, res) => {
    res.redirect('/index.html');
})

main.get('/home', (_, res) => {
    res.redirect('/index.html');
})

main.get('/app', (_, res) => {
    res.redirect('/index.html');
})

//-------------------------------------------------------------------------------------------------






main.listen(mainport, () => {
    console.log(`Sphinx API started on port ${mainport}\nAvailable endpoints:`);
    console.log("-> / (webapp)")
    console.log("-> /auth")
    console.log("-> /home (webapp)")
    console.log("-> /app (webapp)")
});
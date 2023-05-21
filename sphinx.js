const fs = require('fs');
const path = require('path');
const { createHash } = require('crypto');

const defaulthasher = createHash('sha3-256');
exports.defaulthasher = defaulthasher;

const udataloc = path.join(__dirname, 'privates', 'udata.json');
exports.udataloc = udataloc;

// let jsondatastring = fs.readFileSync('./privates/udata.json').toString();
// let jsondata = JSON.parse(jsondatastring);

// console.log(jsondata);

// fs.writeFileSync('./privates/udata.json', JSON.stringify(jsondata, null, '\t'));


// console.log(defaulthasher.update("hea").digest('hex'));

function gethash(cwid, fqdn, uid, pass, hasher)
{
    let str = "";
    for (let i = 0; i < 16; i++) str += cwid;
    for (let i = 0; i < 11; i++) str += fqdn;
    for (let i = 0; i < 20; i++) str += uid;
    for (let i = 0; i < 02; i++) str += pass;
    return hasher.update(str).digest('hex');
}
exports.gethash = gethash;

function register(cwid, fqdn, uid, pass)
{
    const readdata = JSON.parse(fs.readFileSync(udataloc).toString());
    const hash = gethash(cwid, fqdn, uid, pass, defaulthasher);

    const newuser = {
        'cwid' : cwid,
        'hash' : hash
    };

    let flag = false;

    if (fqdn in readdata)
    {
        readdata[fqdn].forEach(element => {
            if (element.cwid === cwid)
            {
                console.log('🤷This user is already registered!');
                console.log(element);
                flag = true;
            }
        });
        if (flag) return;

        readdata[fqdn].push(newuser)
        fs.writeFileSync(udataloc, JSON.stringify(readdata, null, '\t'));
        console.log(`✅User added successfully!`);
        console.log(newuser);
        return;
    }

    readdata[fqdn] = [newuser];
    fs.writeFileSync(udataloc, JSON.stringify(readdata, null, '\t'));
    console.log(`✅User added successfully!`);
    console.log(newuser);
}
exports.register = register;

// register('sp', 'google.com', 'stealthypanda', 'pass')

function validate(cwid, fqdn, uid, pass)
{
    const readdata = JSON.parse(fs.readFileSync(udataloc).toString());
    const hash = gethash(cwid, fqdn, uid, pass, defaulthasher);

    let user = null;

    Object.entries(readdata).forEach(([key, value]) => {
        if (key === fqdn)
        {
            value.forEach(item => {
                if (item['cwid'] === cwid) user = item;
            });
        }
    });

    if (user)
    {
        return (user.hash === hash);
    }
    else
    {
        console.log("👎User not found!");
        return false;
    }
}
exports.validate = validate;

// console.log(validate('sp', 'github.com', 'stealthypanda', 'pass'));
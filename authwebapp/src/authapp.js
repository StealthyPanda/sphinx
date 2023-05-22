import './authapp.css'
import image from './logo192.png';
import {useState} from 'react';


const getjson = sp => {
    let obj = {};
    sp.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
};
const searchParams = new URLSearchParams(document.location.search);
const queryjson = getjson(searchParams);



export const Authform = () => {
    const [user, changeUser] = useState('');
    const [pass, changePass] = useState('');
    const [indicator, changeIndicator] = useState(<p></p>);
    const [fresult, changeFresult] = useState({});
    
    const formhandler = async () => {
        if ((!user) || (!pass)) return;

        const finalobj = {
            'uid' : user,
            'pass' : pass,
            ...queryjson
        };
        // console.log(finalobj);
        changeIndicator(<p>Fetching...</p>);
        
        let reqtype;
        if (finalobj['op'] === 'login')
        {
            reqtype = 'OPTIONS';
        }
        else if (finalobj['op'] === 'register')
        {
            reqtype = 'POST';
        }
        else
        {
            changeIndicator(<p>🤮BAD QUERY!</p>)
            throw TypeError("Invalid Query Type");
        }

        const newfresult = await fetch('/auth', {
            method: reqtype,
            body : JSON.stringify(finalobj),
            headers : {
                'Content-Type' : 'application/json'
            }
        });

        const newdata = await newfresult.json();
        changeFresult(newdata);
        console.log(fresult, newdata);

        // const newjson = JSON.parse(newfresult.body.getReader());

        // changeFresult(newfresult);
        // console.log(newfresult);
        // .then(res => {
        //     return res.json();
        // })
        // .then(resjson => {
        //     console.log(resjson);
        //     changeFresult(resjson);
        // })
        // .catch(err => {
        //     console.log("Got an error");
        //     console.log(err);
        // });

        if (queryjson['op'] === 'login')
        {
            if (newdata['auth'])
            {
                changeIndicator(<p>Auth Successful!<br />{newdata.message}</p>);
            }
            else
            {
                changeIndicator(<p>Auth Failed!<br />{newdata.message}</p>);
            }
        }
        else if (queryjson['op'] === 'register')
        {
            if (newdata['status'])
            {
                changeIndicator(<p>Register Successful!<br />{newdata.message}</p>);
            }
            else
            {
                changeIndicator(<p>Register Failed!<br />{newdata.message}</p>);
            }
        }
    };

    return (
        <div className='authform'>
            <img src={image} alt='placeholder' className='placeholder' />
            <h1>Sphinx Auth</h1>
            <input className='textbox' type='text' placeholder='username' onChange={
                event => {
                    changeUser(event.target.value);
                    // console.log(pass);
                }
            }></input>
            <input className='textbox' type='password' placeholder='password' onChange={
                event => {
                    changePass(event.target.value);
                    // console.log(pass);
                }
            }></input>
            <button onClick={formhandler}>Login/Register</button>
            {indicator}
        </div>
    );
};

export const Authapp = () => {
    return (
        <div className='authapp'>
            <Authform />
        </div>
    );
};
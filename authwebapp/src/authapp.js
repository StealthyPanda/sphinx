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
    
    const formhandler = () => {
        if ((!user) || (!pass)) return;

        const finalobj = {
            'uid' : user,
            'pass' : pass,
            ...queryjson
        };
        console.log(finalobj);
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
import './authapp.css'
import image from './logo192.png';

export const Textbox = () => {

    return (
        <input type = "text" className='textbox'>
        </input>
    );

};

export const Authform = () => {


    return (
        <div className='authform'>
            <img src={image} alt='placeholder' className='placeholder'/>
            <h1>Sphinx Auth</h1>
            <input className='textbox' type='text' placeholder='username'></input>
            <input className='textbox' type='password' placeholder='password'></input>
            <button>Login/Register</button>
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
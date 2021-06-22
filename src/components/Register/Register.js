import React, { useState } from 'react';


function Register(props) {
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState ('');
    //events
    const onEmailChange = (event) => {
        setEmail (event.target.value); 
    };
    const onPasswordChange = (event) => {
        setPassword (event.target.value); 
    };
    const onNameChange = (event) => {
        setName (event.target.value); 
    };

    const onSubmitRegister = () => {
        //console.log({signInemail,signInpassword});
        fetch('http://localhost:3001/register',{
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        }).then(Response => Response.json())
            .then(user => {
                if (user) {
                    props.loadUser(user);
                    props.onRouteChange('home');
                }
            }); 
    };


    //const { onRouteChange} = props;
    return (   
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l m6 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f2 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="text" 
                                name="name"  
                                id="name"
                                onChange={onNameChange}/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address"
                                onChange={onEmailChange}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                type="password" name="password"  
                                id="password" 
                                onChange={onPasswordChange}/>
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            onClick={ () =>onSubmitRegister('home')}
                            className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                            type="submit" 
                            value="Register"/>
                    </div>
                </div>
            </main>
        </article> 
    );
}

export default Register;
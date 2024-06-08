import React, { useState } from 'react'
import Validation from './LoginValidation'
import ValidationRegister from './RegisterValidation'
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer, Zoom, Flip, Bounce, Slide  } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    // For Login
    const [values, setValues] = useState({
        email: '',
        pswd: ''
    })
    const [errors, setErrors] = useState({})

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrors(Validation(values));

         // condition

         const Email = values.email
         const Password = values.pswd

         console.log(Email);
         console.log(Password);

         if ( Email === "" || Password === "") {
            // console.log("Fory eee");
            toast.error("Tous les champs doivent être remplis.");
        } else {
            axios.post("http://localhost:4321/login", {Email, Password })
            .then(res => {
                if(res.status === 200) {
                    if(res.data.status === "success") {
                        toast.success("Connexion réussie !");
                        navigate('/admin');
                    } else {
                        toast.error("Adresse email ou mot de passe incorrect.");
                    }
                } else {
                    toast.error("Erreur lors de la connexion.");
                }
            }).catch(err => {
                console.log(err);
                toast.error("Erreur lors de la connexion.");
            });
        
            
        }

    }


    // For Register
    const [valeur, setValeur] = useState({
        name: '',
        email: '',
        pswd: ''
    })
    const [erreurs, setErreurs] = useState({})

    const handleInput_2 = (event) => {
        setValeur(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }

    const handleSubmit_2 = (event) => {
        event.preventDefault();
        setErreurs(ValidationRegister(valeur));

        // condition

        const Name = valeur.name
        const Email = valeur.email
        const Password = valeur.pswd

        console.log(Name);
        console.log(Email);
        console.log(Password);

        // if (erreurs.name === "" && erreurs.email === "" && erreurs.pswd === "") {
        if (Name === "" || Email === "" || Password === "") {
            console.log("Fory eee")
            toast.error("Tous les champs doivent être remplis😥.");
        } else {
            axios.post("http://localhost:4321/register", { Name, Email, Password })
            .then(res => {
                console.log(res);
                // alert("coucou");
                navigate('/');
                toast.default("Inscription réussie !");
                // Name === "";
            }).catch(err => {
                console.log(err);
                toast.error("Erreur lors de l'inscription😥.");
                });
                
            }
    }


    return (
        <>
            <div className="container">
                <div className="main">
                    <input type="checkbox" id="chk" aria-hidden="true"></input>


                    {/* Login */}
                    <div className="login">
                        <form action="" className="form" onSubmit={handleSubmit}>
                            <label htmlFor="chk" aria-hidden="true">Se connecter</label>
                            <input className="input" type="email" name="email" placeholder="Adresse électronique" onChange={handleInput}></input>
                            {/* {errors.email && <span className='rouge'>{errors.email}</span>} */}
                            <input className="input" type="password" name="pswd" placeholder="Mot de passe" onChange={handleInput}></input>
                            {/* {errors.pswd && <span className='rouge'>{errors.pswd}</span>} */}
                            <button type='submit'>Se connecter</button>
                        </form>
                    </div>

                    <ToastContainer position='top-center' theme='dark' transition={Zoom} />
                    {/* Register */}
                    <div className="register">
                        <form action="" className="form" onSubmit={handleSubmit_2}>
                            <label htmlFor="chk" aria-hidden="true">Créer un compte</label>
                            <input className="input" type="text" name="name" placeholder="Nom" onChange={handleInput_2}></input>
                            {/* {erreurs.name && <span className='rouge'>{erreurs.name}</span>} */}
                            <input className="input" type="email" name="email" placeholder="Adresse électronique" onChange={handleInput_2}></input>
                            {/* {erreurs.email && <span className='rouge'>{erreurs.email}</span>} */}
                            <input className="input" type="password" name="pswd" placeholder="Mot de passe" onChange={handleInput_2}></input>
                            {/* {erreurs.pswd && <span className='rouge'>{erreurs.pswd}</span>} */}
                            <button type='submit'>Créer un compte</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login


import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import auth from "../../firebase/firebase.config";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
    const [registerError, setRegisterError] = useState('');
    const [success, setSuccess] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = e => {
        e.preventDefault();
        console.log('form submit')
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const accepted = e.target.terms.checked;
        console.log(email, password, accepted, name);

        // reset error
        setRegisterError('');
        setSuccess('');

        if (password.length < 6) {
            setRegisterError('Password should be at least 6 characters or longer');
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            setRegisterError('Your password should have ata least one upper case characters.')
            return;
        }
        else if (!accepted) {
            setRegisterError('Please accept our terms and conditions!')
            return;
        }

        // create user
        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                console.log(result.user)
                setSuccess('User Created Successfully');

                // update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: "https://example.com/jane-q-user/profile.jpg"
                })
                    .then(() => console.log('profile updated'))
                    .catch()

                // send verification email:
                sendEmailVerification(result.user)
                    .then(() => {
                        // alert('Please check your email and verify your account')
                        if (result.user.emailVerified) {
                            setSuccess('Login Successfully')
                        }
                        else {
                            alert('Please verify your email address')
                        }
                    })
            })
            .catch(error => {
                console.error(error);
                setRegisterError(error.message);
            })

    }



    return (
        <div className="w-2/5 p-1 bg-gray-300 shadow-2xl drop-shadow-2xl shadow-slate-900  m-8 rounded-2xl">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-8 font-bold mt-6">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className="mb-4 w-full py-2 px-4 shadow-lg drop-shadow-lg shadow-black rounded-lg" type="name" name="name" placeholder="Your Name" id="" required />
                    <br />
                    <input className="mb-4 w-full py-2 px-4 shadow-lg drop-shadow-lg shadow-black rounded-lg" type="email" name="email" placeholder="Email Address" id="" required />
                    <br />
                    <div className="relative ">
                        <input
                            className="mb-2 w-full py-2 px-4 shadow-lg drop-shadow-lg shadow-black rounded-lg"
                            type={showPassword ? "text" : "password"}
                            name="password"
                            placeholder="password"
                            id="" required />
                        <span className="absolute top-3 right-3" onClick={() => setShowPassword(!showPassword)}>

                            {
                                showPassword ? <FaEyeSlash></FaEyeSlash> : <FaEye></FaEye>
                            }


                        </span>
                    </div>
                    <br />
                    <input className="mb-4" type="checkbox" name="terms" id="" />
                    <label className="m-2" htmlFor="terms"> Accept our Terms & Contdition</label>
                    <br />
                    <input className="btn btn-secondary mb-6 w-full font-bold text-lg shadow-lg drop-shadow-lg shadow-black" type="submit" value="Register" />
                </form>
                {
                    registerError && <p className="text-red-600">{registerError} </p>
                }
                {
                    success && <p className="text-green-600"> {success} </p>

                }
                <p>Already have an account? Please <Link className="border" to="/login">Login</Link> </p>

            </div>
        </div>
    );
};

export default Register; 
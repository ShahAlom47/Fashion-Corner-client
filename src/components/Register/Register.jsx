import { Link } from "react-router-dom";




import { getAuth, updateProfile } from "firebase/auth";
import App from "../../App";
import auth from "../../../firebase.config";
import useAuth from "../../CoustomHocks/useAuth";


const Register = () => {
    
    const { user, createUser } = useAuth()
    console.log(user);


    const handelRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value
        const email = form.email.value
        const pass = form.password.value
       



        createUser(email, pass)
            .then((userCredential) => {
                const userC = userCredential.user?.metadata?.creationTime  
                const userData = { email, pass, name ,createAt:userC};
                console.log(userC,userCredential);
              
                updateProfile(auth.currentUser, {
                    displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
                }).then(() => {
                    alert('added successfully')
                    
                }).catch((error) => {
                    console.log(error);
                });

            })
            .catch((error) => {

                const errorMessage = error.message;
                console.log(errorMessage);
            });

    }

    return (
        <div className=" w-8/12 m-auto">
            <h1 className=" text-2xl text-center my-4 "> Register</h1>
            <hr />
            <div className=" w-full">
                <div className="  max-w-sm shadow-2xl bg-base-100 w-full">
                    <form onSubmit={handelRegister} className="card-body w-full border-4 p-4 m-auto">
                        <div className=" w-full">
                           
                            <input type="text" placeholder="Name" name="name" className=" p-3  border-2 w-full rounded-md mb-4" required />
                        </div>
                        <div className="form-control">
                        
                            <input type="email" name="email" placeholder="email" className=" p-3  border-2 w-full rounded-md  mb-4 " required />
                        </div>
                        <div className="form-control">
                         
                            <input type="text" placeholder="password" name="password" className=" p-3  border-2 w-full rounded-md  mb-4 " required />
                            <label className="label">
                                <p className="label-text-alt  ">Already have An Account <Link to={'/login'} className="font-semibold text-blue-700 underline">LogIn</Link> </p>
                            </label>
                        </div>
                        <div className="form-control mt-6">

                            <input className="p-3  border-2 w-full rounded-md  mb-4 bg-green-700 text-white font-semibold " type="submit" value="Register" />
                        </div>
                    </form>
                </div>


            </div>

        </div>
    );
};

export default Register;
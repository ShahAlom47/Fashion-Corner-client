
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuth from '../../CoustomHocks/useAuth';

const Login = () => {
    const { user, loginUser} = useAuth()
    const navigate = useNavigate()
    const location = useLocation();
   
   


    const handelRegister = (e) => {
        e.preventDefault();
        const form = e.target;
    
        const email = form.email.value
        const pass = form.password.value
       



        loginUser(email, pass)
            .then((userCredential) => {
                const userC = userCredential.user?.metadata?.creationTime  
                const userData = { email, pass, name ,createAt:userC};
                alert('Login Success')
                navigate(location.state)
                })
            .catch((error) => {

                const errorMessage = error.message;
                console.log(errorMessage);
            });

    }
    return (
        <div className=" w-8/12 m-auto">
        <h1 className=" text-2xl text-center my-4 "> Login</h1>
        <hr />
        <div className=" w-full">
            <div className="  max-w-sm shadow-2xl bg-base-100 w-full">
                <form onSubmit={handelRegister} className="card-body w-full border-4 p-4 m-auto">
                  
                    <div className="form-control">
                    
                        <input type="email" name="email" placeholder="email" className=" p-3  border-2 w-full rounded-md  mb-4 " required />
                    </div>
                    <div className="form-control">
                     
                        <input type="text" placeholder="password" name="password" className=" p-3  border-2 w-full rounded-md  mb-4 " required />
                        <label className="label">
                            <p className="label-text-alt  ">Create a  Account <Link to={'/register'} className="font-semibold text-blue-700 underline">Register</Link> </p>
                        </label>
                    </div>
                    <div className="form-control mt-6">

                        <input className="p-3  border-2 w-full rounded-md  mb-4 bg-green-700 text-white font-semibold " type="submit" value="Login" />
                    </div>
                </form>
            </div>


        </div>

    </div>
    );
};

export default Login;
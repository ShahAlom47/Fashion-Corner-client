import React from 'react';
import './Header.css';
import logo from '../../images/Logo.svg';
import { Link } from 'react-router-dom';
import useAuth from '../../CoustomHocks/useAuth';

const Header = () => {
    const {user,LogOutUser}=useAuth()
   

    const handelLogOUT=()=>{
        LogOutUser()
        .then(() => {
            alert('LOGOUT Successfully')
            
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <nav className='header'>
           <h1 className='text-white font-bold text-2xl '>Fashion <span className='text-yellow-500'>Corner</span></h1>
           <h1 className='text-white font-medium'>{user?.email}</h1>
            <div>
                <Link to="/">Home</Link>
                <Link to="/orders">My Orders List</Link>
             {
                user? <Link ><button  onClick={handelLogOUT} className=' text-black'>LogOut</button></Link>
                :<><Link  to="/login"><button className=' text-black'>Login</button></Link>
                <Link ><button  to="/register" className=' text-black'>Register</button></Link> </>
               
             }
                
               

            </div>
        </nav>
    );
};

export default Header;
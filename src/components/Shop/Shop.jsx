import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])

    const {totalProducts}= useLoaderData();
    const [itemsPerPage ,setItemsPerPage ]=useState(10)
    const [currentPage ,setCurrentPage]=useState(0)
    const totalPage = Math.ceil(totalProducts/itemsPerPage)
    console.log(totalPage);
   

 // const pages =[];
    // for(let i=0; i<totalPage; i++){
    //     pages.push(i)
    // }

    const pages = [...Array(totalPage).keys()];

    console.log(currentPage);



    useEffect(() => {
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, []);


    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id of the addedProduct
        for (const id in storedCart) {
            // step 2: get product from products state by using id
            const addedProduct = products.find(product => product._id === id)
            if (addedProduct) {
                // step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the added product to the saved cart
                savedCart.push(addedProduct);
            }
            // console.log('added Product', addedProduct)
        }
        // step 5: set the cart
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        // cart.push(product); '
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }


    const handelNext=()=>{
       ( totalPage-1)>currentPage &&  setCurrentPage(currentPage+1)
        // console.log(currentPage);

    }
    const handelPrev=()=>{
        
    }
    console.log(currentPage,totalPage);

    return (
        <div className='shop-container'>
           <div >
           <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>
            <div className=" flex  justify-center my-10">
            <button 
                    onClick={handelNext} 
                    className={` mx-2 bg-slate-400 `}
                >
               {'< Prev'}</button>
            {
                pages?.map(page => <button 
                    onClick={()=>setCurrentPage(page)} 
                    className={` mx-2 bg-slate-400 ${currentPage===page?'bg-green-400':''}`}
                >
                    {page}</button>)
            }
            <button 
                    onClick={ handelNext} 
                    className={` mx-2 bg-slate-400 ${currentPage===(totalPage-1)? 'hidden':''} `}
                    
                >
                {' Next >'} </button>

            <select 
            onChange={(e)=> {setItemsPerPage(e.target.value) ; setCurrentPage(0)}} 
            value={itemsPerPage}
            className='border-2 rounded-md p-3 font-medium '
            >
                <option value="5">Item 5</option>
                <option value="10">Item 10</option>
                <option value="20">Item 20</option>
                <option value="30">Item 30</option>
            </select>
            </div>
           </div>
            <div className="cart-container">
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link className='proceed-link' to="/orders">
                        <button className='btn-proceed'> Ordered Product</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
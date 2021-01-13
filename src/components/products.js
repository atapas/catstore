import React, { useState, useEffect } from 'react';
import axios from "axios";
import getStripe from "../utils/stripejs";
import { ShoppingCart, ShoppingBag } from 'react-feather';
import Image from './image';

import './products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        axios("/api/get-products").then(result => {
            if (result.status !== 200) {
              console.error("Error loading shopnotes");
              console.error(result);
              return;
            }
            setProducts(result.data);
            setLoaded(true);
        });
    }, []);

    const addToCart = sku => {
        setCart([...cart, sku]);
    }

    const buyOne = sku => {
        const skus = [];
        skus.push(sku);
        const payload = {
            skus: skus
        };
        performPurchase(payload);
    }

    const checkOut = () => {
        console.log('Checking out...');
        const payload = {
            skus: cart
        };
        performPurchase(payload);
        console.log('Check out has been done!');
    }

    const performPurchase = async payload => {
        const response = await axios.post('/api/create-checkout', payload);
        console.log('response', response);
        const stripe = await getStripe(response.data.publishableKey);

        const { error } = await stripe.redirectToCheckout({
            sessionId: response.data.sessionId,
        });
        
        if (error) {
            console.error(error);
        }
    }
    
    return (
        <>
        <div className="cart" onClick={() => checkOut()}>
            <div className="cart-icon">
            <ShoppingCart 
                className="img" 
                size={64} 
                color="#ff8c00" 
            />
            </div>
            <div className="cart-badge">{cart.length}</div>
        </div>
        
        {
            loaded ? (
                <div className="products">
                    {products.length > 0 && products.map((product, index) => (
                        <div className="product" key={`${product.sku}-image`}>
                          
                            <Image fileName={product.image.key} 
                                style={{ width: '100%' }} 
                                alt={product.name} />
                            <h2>{product.name}</h2>
                            <p className="description">{product.description}</p>
                            <p className="price">Price: <b>₹{product.amount/100}</b></p>
                            <button onClick={() => buyOne(product.sku)}>
                                <ShoppingBag size={20}></ShoppingBag>
                                <span>Buy Now</span>
                            </button>
                            {' '}
                            <button onClick={() => addToCart(product.sku)}>
                                <ShoppingCart size={20}></ShoppingCart>
                                <span>Add to Cart</span>
                            </button> 
                        </div>
                    ))
                    }
                </div>
            ) :
            (
                <h2>Loading...</h2>
            )
        }
        </>
    )
};

export default Products;
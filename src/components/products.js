import React, { useState, useEffect } from 'react';
import axios from "axios";
import getStripe from "../utils/stripejs";
import { ShoppingCart } from 'react-feather';
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
        checkOut(skus);
    }

    const checkOut = async () => {
        const payload = {
            skus: cart
        };
        const response = await axios.post('/api/create-checkout', payload);
        console.log('response', response);
        const stripe = await getStripe(response.data.publishableKey);

        const { error } = await stripe.redirectToCheckout({
            sessionId: response.data.sessionId,
        });
        
        if (error) {
            console.error(error);
        }
        setCart([...cart, []]);
    }
    
    return (
        <>
        <div className="cart">
            <div className="cart-icon">
            <ShoppingCart className="img" size={32} color="#ff8c00" onClick={checkOut}/>
            </div>
            <div className="cart-badge">{cart.length}</div>
        </div>
        
        {
            loaded ? (
                <div className="products">
                    {products.map((product, index) => (
                        <div className="product" key={`${product.sku}-image`}>
                            <img 
                                src={product.image} 
                                alt={product.name} >
                            </img>
                            <h2>{product.name}</h2>
                            <p className="description">{product.description}</p>
                            <p className="price">Price: <b>${product.amount}</b></p>
                            <button onClick={() => buyOne(product.sku)}>Buy Now</button>
                            {' '}
                            <button onClick={() => addToCart(product.sku)}>Add to Cart</button> 
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
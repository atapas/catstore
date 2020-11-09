import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useStaticQuery, graphql} from 'gatsby';
import getStripe from "../utils/stripejs";
import './products.css';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loaded, setLoaded] = useState(false);

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

    const checkOut = async sku => {
        const payload = {
            sku: sku
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
    }
    
    return (
        <>
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
                            <button onClick={() => checkOut(product.sku)}>Buy Now</button> 
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
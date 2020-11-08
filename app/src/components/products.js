import React, { useState, useEffect } from 'react';
import axios from "axios";
import {useStaticQuery, graphql} from 'gatsby';
import getStripe from "../utils/stripejs";
import './products.css';

const Products = () => {
    const [prods, setProds] = useState([]);

    useEffect(() => {
        axios("/api/get-products").then(result => {
            if (result.status !== 200) {
              console.error("Error loading shopnotes");
              console.error(result);
              return;
            }
            console.log(result);
        });
    }, []);

    const data = useStaticQuery(
        graphql`
        query CloudinaryImage {
            allCloudinaryMedia {
            edges {
                node {
                    secure_url
                    tags
                    context {
                        custom {
                            alt
                            caption
                            pid
                            amount
                        }
                    }
                    resource_type
                }
            }
            }
        }`
    );
    const products = data.allCloudinaryMedia.edges;

    const checkOut = async () => {
        const payload = {
            name: 'Test',
            description: 'Test',
            images: 'https://res.cloudinary.com/atapas/image/upload/v1604829841/cats/milada-vigerova-7E9qvMOsZEM-unsplash_etgmbe.jpg',
            amount: 2200,
            currency: 'USD',
            quantity: 2,
            sku: '001'
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
        <div className="products">
            {products.map((product, index) => (
                <div className="product" key={`${index}-image`}>
                    <img 
                        src={product.node.secure_url} 
                        alt={product.node.context.custom.caption} >
                    </img>
                    <h2>{product.node.context.custom.caption}</h2>
                    <p className="description">{product.node.context.custom.alt}</p>
                    <p className="price">${product.node.context.custom.amount}</p>
                   
                        <label htmlFor="quantity">Quantity</label>
                        <input
                            type="number"
                            id="quantity"
                            name="quantity"
                            value="1"
                            min="1"
                            max="10"
                        />
                        <input type="hidden" name="sku" value="" />
                        <button onClick={checkOut}>Buy Now</button>
                    
                </div>
                ))
            }
        </div>
    )
};

export default Products;
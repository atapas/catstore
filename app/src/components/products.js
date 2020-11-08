import React from 'react';
import {useStaticQuery, graphql} from 'gatsby';

import './products.css';

const Products = () => {
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
    return (
        <div className="products">
            {products.map((product, index) => (
                <div className="product" key={`${index}-image`}>
                    <img 
                        src={product.node.secure_url} 
                        alt={product.node.context.custom.caption} >
                    </img>
                    <h2>{product.node.context.custom.caption}</h2>
                    <p class="description">{product.node.context.custom.alt}</p>
                    <p class="price">${product.node.context.custom.amount}</p>
                    <form action="" method="post">
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
                        <button type="submit">Buy Now</button>
                    </form>
                </div>
                ))
            }
        </div>
    )
};

export default Products;
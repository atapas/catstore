import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Products from '../components/products';

const IndexPage = () => (
  <Layout>
    <SEO title="Cat Store" />
    <h1>Hey there!</h1>
    <p>Welcome to the Cat Store.</p>
    <Products />
  </Layout>
)

export default IndexPage

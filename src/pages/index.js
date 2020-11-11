import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Products from '../components/products';

const IndexPage = () => (
  <Layout>
    <SEO title="Cat Store" />
    <h1>Hey there 👋</h1>
    <p>Welcome to the Cat Store. Get a Cat 🐈 and feel awesome.</p>
    <small>
      This is in test mode. That means you can check out using <a href="https://stripe.com/docs/testing#cards" target="_blank" rel="noreferrer">any of the test card numbers.</a>
    </small>
    <Products />
  </Layout>
)

export default IndexPage

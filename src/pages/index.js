import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

import Products from '../components/products';

const IndexPage = () => (
  <Layout>
    <SEO title="Happy Paws" />
    <h1>Hey there 👋</h1>
    <p>Welcome to the Happy Paws cat store. Get a Cat 🐈 and feel awesome.</p>
    <blockquote>
      <p>
        We are in the demo mode. Please check out using any of the test card numbers mentioned <a href="https://stripe.com/docs/testing#cards" target="_blank" rel="noreferrer">here.</a>
      </p>
    </blockquote>
    <Products />
  </Layout>
)

export default IndexPage

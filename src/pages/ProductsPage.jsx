import React from 'react';
import Layout from '../components/Layout';
import Newsletter from '../components/newsLetter/NewsLetter';
import Products from '../components/products/Products';


const ProductsPage = () => {
  return (
    <Layout>
      <Products/>
      <Newsletter/>
    </Layout>
  )
}

export default ProductsPage;
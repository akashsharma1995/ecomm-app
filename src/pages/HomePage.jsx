import React from 'react';
import Categories from '../components/categories/Categories';
import Layout from '../components/Layout';
import NewsLetter from '../components/newsLetter/NewsLetter';
import Products from '../components/products/Products';
import Carousel from '../components/UI/Carousel';

const HomePage = () => {
  return (
    <Layout>
      <Carousel/>
      <Categories/>
      <Products home/>
      <NewsLetter/>
    </Layout>
  )
}

export default HomePage

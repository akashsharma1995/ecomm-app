import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Product from '../components/productDetails/ProductDetails';

const ProductDetails = () => {
  const params = useParams();
  return (
    <Layout>
      <Product/>
    </Layout>
  )
}

export default ProductDetails;

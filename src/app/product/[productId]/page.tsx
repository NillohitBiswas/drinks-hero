"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import styles from './ProductDetail.module.css';

// Define your product data (same as in products/page.tsx)
const products = [
  {
    id: 'Tower-Bridge',
    name: 'Tower Bridge Amber Ale',
    image: '/towerbridge.png',
    description: 'A delicious and hoppy IPA.',
    price: '$5.99',
  },
  {
    id: 'Covent-Garden',
    name: 'Covent Garden Golden Lager',
    image: '/covent.png',
    description: 'A wheat ale that’s a little sumpin’ different.',
    price: '$6.49',
  },
  {
    id: 'Westminster-Strong',
    name: 'Westminster Strong Ale',
    image: '/westminister.png', 
    description: 'Description for Beer A.',
    price: '$4.99',
  },
  {
    id: 'Hyde-Park',
    name: 'Hyde Park Pale Ale',
    image: '/hyde.png', 
    description: 'Description for Beer B.',
    price: '$5.49',
  },
];

const ProductDetailPage = () => {
  const params = useParams();
  const productId = params.productId;

  // Find the product with the matching ID
  const product = products.find(p => p.id === productId);

  if (!product) {
    // Handle case where product is not found (e.g., show a 404 message)
    return <div>Product not found</div>;
  }

  return (
    <div className={styles.productDetailWrapper}>
      <div className={styles.productImageContainer}>
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={450}
          className={styles.productImage}
        />
      </div>

      <div className={styles.productInfo}>
        <div className={styles.titleRow}>
          <h1 className={styles.productTitle}>{product.name}</h1>
        </div>
        <p className={styles.productDescription}>{product.description}</p>
        <p className={styles.price}>Price: {product.price}</p>
        <button className={styles.addToCart}>Add to cart</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;

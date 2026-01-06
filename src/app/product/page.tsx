import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Product.module.css';

// Define your product data
const products = [
  {
    id: 'Tower-Bridge',
    name: 'Tower Bridge Amber Ale',
    image: '/towerbridge.png',
    description: 'A delicious and hoppy IPA with notes of caramel and citrus.',
    price: '$5.99',
  },
  {
    id: 'Covent-Garden',
    name: 'Covent Garden Lager',
    image: '/covent.png',
    description: 'A crisp wheat ale that’s a little sumpin’ different.',
    price: '$6.49',
  },
  {
    id: 'Westminster-Strong',
    name: 'Westminster Strong Ale',
    image: '/westminister.png',
    description: 'A bold, complex ale brewed for longevity and depth of flavor.',
    price: '$4.99',
  },
  {
    id: 'Hyde-Park',
    name: 'Hyde Park Pale Ale',
    image: '/hyde.png',
    description: 'Refreshing pale ale with a floral nose and clean finish.',
    price: '$5.49',
  },
];

const ProductsPage = () => {
  return (
    <div className={styles.outerContainer}>
        <div className={styles.pageWrapper}>
        <header className={styles.pageHeader}>
            <h1 className={styles.pageTitle}>Our Collection</h1>
            <p className={styles.pageSubtitle}>Hand-picked craft beers, curated for the discerning palate.</p>
        </header>

        <div className={styles.productsGrid}>
            {products.map(product => (
            <article key={product.id} className={styles.productCard}>
                {/* The image link covers the whole top portion */}
                <Link href={`/product/${product.id}`} className={styles.imageContainerLink}>
                    <div className={styles.imageWrap}>
                        <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1000px) 50vw, (max-width: 1280px) 33vw, 320px"
                        className={styles.productImage}
                        priority={products.indexOf(product) < 2} // Prioritize loading first few images
                        />
                    </div>
                </Link>

                <div className={styles.cardBody}>
                    <div className={styles.cardContent}>
                        <Link href={`/product/${product.id}`} className={styles.titleLink}>
                             <h3 className={styles.productTitle}>{product.name}</h3>
                        </Link>
                        <p className={styles.productExcerpt}>{product.description}</p>
                    </div>

                    <div className={styles.cardFooter}>
                        <span className={styles.priceBadge}>{product.price}</span>
                        <Link href={`/product/${product.id}`} className={styles.viewBtn}>
                        Details
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={styles.btnIcon}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                        </Link>
                    </div>
                </div>
            </article>
            ))}
        </div>
        </div>
    </div>
  );
};

export default ProductsPage;
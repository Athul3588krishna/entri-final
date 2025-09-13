// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from './Title';
// import ProductItem from './ProductItem';

// const LatestCollection = () => {

//     const { products } = useContext(ShopContext);
//     const [latestProducts,setLatestProducts] = useState([]);

//     useEffect(()=>{
//         setLatestProducts(products.slice(0,10));
//     },[products])

//   return (
//     <div className='my-10'>
//       <div className='text-center py-8 text-3xl'>
//           <Title text1={'ettavum'} text2={'mikacha colleections'} />
//           <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
// Latest collection of different categories d  </p>
//       </div>

//       {/* Rendering Products */}
//       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//         {
//           latestProducts.map((item,index)=>(
//             <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price} />
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default LatestCollection

import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { motion, AnimatePresence } from 'framer-motion';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <section className="my-16">
      {/* Header */}
      <div className="text-center py-8">
        <h2 className="text-2xl sm:text-3xl font-semibold">
          <Title text1={"ettavum"} text2={"mikacha colleections"} />
        </h2>
        <p className="mt-2 w-11/12 sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto text-sm sm:text-base text-gray-600">
          Latest collection of different categories curated with style & quality.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 md:gap-6">
        <AnimatePresence>
          {latestProducts.map((item, index) => (
            <motion.div
              key={item._id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className="rounded-2xl bg-white shadow-sm border border-gray-100 p-2 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <ProductItem
                id={item._id}
                image={item.image}
                name={item.name}
                price={item.price}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default LatestCollection;

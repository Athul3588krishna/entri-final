// import React, { useContext, useEffect, useState } from 'react'
// import { ShopContext } from '../context/ShopContext'
// import Title from './Title';
// import ProductItem from './ProductItem';

// const BestSeller = () => {

//     const {products} = useContext(ShopContext);
//     const [bestSeller,setBestSeller] = useState([]);

//     useEffect(()=>{
//         const bestProduct = products.filter((item)=>(item.bestseller));
//         setBestSeller(bestProduct.slice(0,5))
//     },[products])

//   return (
//     <div className='my-10'>
//       <div className='text-center text-3xl py-8'>
//         <Title text1={'BEST'} text2={'SELLERS'}/>
//         <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
// ---      </p>
//       </div>

//       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
//         {
//             bestSeller.map((item,index)=>(
//                 <ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price} />
//             ))
//         }
//       </div>
//     </div>
//   )
// }

// export default BestSeller
import React, { useContext, useEffect, useMemo, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
import { motion, AnimatePresence } from "framer-motion";

/**
 * BestSeller (polished)
 * - Gradient header with small subtitle
 * - Subtle card background + hover lift
 * - Skeleton state while products load
 * - "Show more" toggle (5 → 10)
 * - Empty state if no bestseller items
 */
const BestSeller = () => {
  const { products = [] } = useContext(ShopContext);
  const [showCount, setShowCount] = useState(5);

  const bestSeller = useMemo(
    () => products.filter((p) => !!p?.bestseller),
    [products]
  );

  const visible = useMemo(
    () => bestSeller.slice(0, showCount),
    [bestSeller, showCount]
  );

  const isLoading = products.length === 0; // simple heuristic

  return (
    <section className="my-12">
      {/* Header */}
      <div className="text-center py-6">
        <div className="inline-block">
          <div className="mx-auto w-fit rounded-full px-4 py-1 text-xs font-medium tracking-wide bg-gradient-to-r from-indigo-500/10 via-fuchsia-500/10 to-rose-500/10 text-indigo-600">
            hand‑picked for you
          </div>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold mt-3">
          <Title text1={"BEST"} text2={"SELLERS"} />
        </h2>
        <p className="w-11/12 sm:w-4/5 md:w-2/3 mx-auto mt-2 text-sm md:text-base text-gray-600">
          Most‑loved picks this week. Fresh styles, trusted quality.
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {/* Loading skeletons */}
        {isLoading &&
          Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-white shadow-sm border border-gray-100 p-3"
            >
              <div className="aspect-square w-full animate-pulse rounded-xl bg-gray-200" />
              <div className="mt-3 h-3 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-gray-200" />
              <div className="mt-3 h-8 w-24 animate-pulse rounded bg-gray-200" />
            </div>
          ))}

        {/* Empty state */}
        {!isLoading && bestSeller.length === 0 && (
          <div className="col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-5">
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
              <span className="text-xl font-medium">No best sellers yet</span>
              <p className="mt-2 max-w-md text-sm text-gray-600">
                Add <code className="px-1 rounded bg-white border">bestseller: true</code> to a few
                products to showcase them here.
              </p>
            </div>
          </div>
        )}

        {/* Items */}
        <AnimatePresence>
          {!isLoading &&
            visible.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25, delay: index * 0.03 }}
                className="group rounded-2xl bg-white shadow-sm border border-gray-100 p-2 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                {/* Optional badge */}
                <div className="mb-2">
                  <span className="inline-block rounded-full bg-emerald-50 text-emerald-600 text-[10px] font-semibold px-2 py-1">
                    BEST SELLER
                  </span>
                </div>
                <ProductItem
                  id={item._id}
                  name={item.name}
                  image={item.image}
                  price={item.price}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>

      {/* Footer actions */}
      {!isLoading && bestSeller.length > 5 && (
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setShowCount((c) => (c > 5 ? 5 : 10))}
            className="rounded-2xl px-5 py-2 text-sm font-medium border bg-white hover:bg-gray-50 shadow-sm"
          >
            {showCount > 5 ? "Show less" : "Show more"}
          </button>
        </div>
      )}
    </section>
  );
};

export default BestSeller;

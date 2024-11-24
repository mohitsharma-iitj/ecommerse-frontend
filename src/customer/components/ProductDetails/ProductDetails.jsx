/*
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    theme: {
      extend: {
        gridTemplateRows: {
          '[auto,auto,1fr]': 'auto auto 1fr',
        },
      },
    },
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
'use client'

import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { Radio, RadioGroup } from '@headlessui/react'
import { Grid, Button, Rating, LinearProgress, Box } from '@mui/material'
import ProductReviewCard from './ProducReviewCard'
import { mens_kurta } from '../../../Data/mens_kurta'
import HomesectionCard from '../HomesectionCard/HomesectionCard'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { findProductsById } from '../../../State/Product/Action'
import { addItemToCart } from '../../../State/cart/Action'
// const product = {
//     name: 'Basic Tee 6-Pack',
//     price: '$192',
//     href: '#',
//     breadcrumbs: [
//         { id: 1, name: 'Men', href: '#' },
//         { id: 2, name: 'Clothing', href: '#' },
//     ],
//     images: [
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
//             alt: 'Two each of gray, white, and black shirts laying flat.',
//         },
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
//             alt: 'Model wearing plain black basic tee.',
//         },
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
//             alt: 'Model wearing plain gray basic tee.',
//         },
//         {
//             src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
//             alt: 'Model wearing plain white basic tee.',
//         },
//     ],
//     colors: [
//         { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
//         { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
//         { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
//     ],
//     sizes: [

//         { name: 'S', inStock: true },
//         { name: 'M', inStock: true },
//         { name: 'L', inStock: true },
//         { name: 'XL', inStock: true },

//     ],
//     description:
//         'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
//     highlights: [
//         'Hand cut and sewn locally',
//         'Dyed with our proprietary colors',
//         'Pre-washed & pre-shrunk',
//         'Ultra-soft 100% cotton',
//     ],
//     details:
//         'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
// }
const reviews = { href: '#', average: 4, totalCount: 117 }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ProductDetails() {


    const { product } = useSelector(store => store)
    const [selectedColor, setSelectedColor] = useState('white')
    const [selectedSize, setSelectedSize] = useState('M')
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const handleAddToCart = () => {
        const data = {ProductId:params.productId,size:selectedSize.name}
        dispatch(addItemToCart(data))
        navigate("/cart")
    }


    console.log(product)
    useEffect(() => {
        if (params.productId) {
            console.log("Fetching product details for ID:", params.productId);
            dispatch(findProductsById(params.productId));
        }
    }, [params.productId]);
    // console.log("logging")


    if (product.ProductDetails==null) {
        // Show loading spinner or placeholder when data is being fetched
        return <div>Loading...</div>;
    }

    if (product.error) {
        return <div>Error: {product.error}</div>;
    }

    return (
        <div className="bg-white lg:px-20">
            <div className="pt-6">
                <nav aria-label="Breadcrumb">
                    <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                      
                        <li className="text-sm">
                            <a href='#' aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                                {product.ProductDetails.title}
                            </a>
                        </li>
                    </ol>
                </nav>
                <section className='grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10 px-4 pt-10'>
                    {/* Image gallery */}
                    <div className="flex flex-col items-center">
                        <div className="overflow-hidden rounded-lg max-w-[30rem] max-h-[35rem]">
                            <img
                                alt={product.ProductDetails?.description}
                                src={product.ProductDetails?.imageUrl}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        {/* <div className="flex flex-wrap space-x-5 justify-center">
                            {product.images.map((item) => <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg max-w-[5rem] mx-h-[5em] mt-4">
                                <img
                                    alt={item.alt}
                                    src={item.src}
                                    className="h-full w-full object-cover object-center"
                                />
                            </div>)}


                        </div> */}

                    </div>
                    {/* Product info */}
                    <div className="lg:col-span-1 maxt-auto max-w-2xl px-4 pb-16 sm:px-6 lg:max-w-7xl lg-px-8 lg:pb-24 ">
                        <div className="lg:col-span-2 ">
                            <h1 className="text-lg lg:text-xl font-semibold text-gray-900">{product.ProductDetails?.brand} </h1>
                            <h1 className='text-lg lg:text-xl text-gray-900 opacity-60 pt-1'>{product.ProductDetails?.title} </h1>
                        </div>

                        {/* Options */}
                        <div className="mt-4 lg:row-span-3 lg:mt-0">
                            <h2 className="sr-only">Product information</h2>
                            <div className='flex space-x-5 items-center text-lg lg:text-xl text-gray-900 mt-6'>
                                <p className='font-semibold'>
                                    ${product.ProductDetails?.discountedPrice}
                                </p>
                                <p className='opacity-50 line-through'>
                                    ${product.ProductDetails?.price}
                                </p>
                                <p className='text-green-600 font-semibold'>{product.ProductDetails?.discountPersent}% off</p>
                            </div>

                            {/* Reviews */}
                            <div className="mt-6">
                                <div className='flex item-center space-x-3'>
                                    <Rating name="read-only" value={3.5} readOnly />

                                    <p className='opacity-50 text-sm'>56530 Rating</p>
                                    <p className='ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500'>4850 Review</p>
                                </div>

                            </div>

                            <form className="mt-10">

                                {/* Sizes */}
                                <div className="mt-10">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-sm font-medium text-gray-900">Size</h3>

                                    </div>

                                    <fieldset aria-label="Choose a size" className="mt-4">
                                        <RadioGroup
                                            value={selectedSize}
                                            onChange={setSelectedSize}
                                            className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4"
                                        >
                                            {product.ProductDetails?.sizes.map((size) => (
                                                <Radio
                                                    key={size.name}
                                                    value={size}
                                                    disabled={size.quantity<1}
                                                    className={classNames(
                                                        size.quantity>1
                                                            ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                                                            : 'cursor-not-allowed bg-gray-50 text-gray-200',
                                                        'group relative flex items-center justify-center rounded-md border px-4 py-3 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 sm:flex-1 sm:py-6',
                                                    )}
                                                >
                                                    <span>{size.name}</span>
                                                    {size.quantity>0 ? (
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-indigo-500"
                                                        />
                                                    ) : (
                                                        <span
                                                            aria-hidden="true"
                                                            className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                        >
                                                            <svg
                                                                stroke="currentColor"
                                                                viewBox="0 0 100 100"
                                                                preserveAspectRatio="none"
                                                                className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                            >
                                                                <line x1={0} x2={100} y1={100} y2={0} vectorEffect="non-scaling-stroke" />
                                                            </svg>
                                                        </span>
                                                    )}
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                    </fieldset>
                                </div>

                                <Button onClick={handleAddToCart} variant='contained' sx={{ px: "2rem", py: "1rem", bgcolor: "#9155fd" }}>
                                    Add to Cart</Button>
                            </form>
                        </div>

                        <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
                            {/* Description and details */}
                            <div>
                                <h3 className="sr-only">Description</h3>

                                <div className="space-y-6">
                                    <p className="text-base text-gray-900">{product.ProductDetails?.description}</p>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h3 className="text-sm font-medium text-gray-900">Highlights</h3>

                                <div className="mt-4">
                                    <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                                        {[1,1,1].map((highlight) => (
                                            <li key={highlight} className="text-gray-400">
                                                <span className="text-gray-600">lokesh</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="mt-10">
                                <h2 className="text-sm font-medium text-gray-900">Details</h2>

                                <div className="mt-4 space-y-6">
                                    <p className="text-sm text-gray-600">{product.details}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* rating and reviews */}
                <section>
                    <h1 className='font-semibold text-lg pb-2'>Recent Review & Rating</h1>
                    <div className='border p-5'>
                        <Grid container spacing={7}>
                            <Grid item xs={7}>
                                <div className='space-y-5'>

                                    {[1, 1, 1].map((item) => <ProductReviewCard />)}
                                </div>
                            </Grid>

                            <Grid item xs={5}>

                                <h1 className='text-xl font-semibold pb-1'>
                                    Product Ratings
                                </h1>

                                <div className='flex item-center space-x-3'>
                                    <Rating value={4.6} precision={.5} readOnly></Rating>
                                    <p className='opacity-60'>59495 Ratings</p>
                                </div>


                                <Box className="mt-5">

                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Excellent</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} variant='determinate' value={50} color='success' />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Very Good</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} variant='determinate' value={40} color='success' />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Good</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} variant='determinate' value={30} />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Average</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} variant='determinate' value={20} color='warning' />
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems="center" gap={2}>
                                        <Grid item xs={2}>
                                            <p>Poor</p>
                                        </Grid>
                                        <Grid item xs={7}>
                                            <LinearProgress sx={{ bgcolor: "#d0d0d0", borderRadius: 4, height: 7 }} variant='determinate' value={10} color='error' />
                                        </Grid>
                                    </Grid>



                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </section>
                {/* similer products */}
                <section>
                    <h1 className='py-5 text-xl font-bold'>Similar Products</h1>
                    <div className='flex flex-wrap space-y-5'>
                        {mens_kurta.map((item) => <HomesectionCard product={item} />)}
                    </div>
                </section>
            </div>
        </div>
    )
}

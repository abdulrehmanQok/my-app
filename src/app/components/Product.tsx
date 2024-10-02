"use client";
import React, { useEffect, useState } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    image: string;
    category: string;
    rating: number;
}

const Product = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true); // Set initial loading to true

    const fetchProducts = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products'); // Replace with your API endpoint
            const data = await response.json();
            setProducts(data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false); // Set loading to false after fetch is complete
        }
    };

    useEffect(() => {
        fetchProducts(); // Call the fetch function when component mounts
    }, []);

    return (
        <div>
            <h1 className='text-center text-3xl'>Product List</h1>
            <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {loading && <p>Loading...</p>}
                {!loading && products.length === 0 && <p>No products available.</p>}
                {products.map(item => (
                    <div key={item.id} className='p-4 border rounded shadow-md'>
                        <img src={item.image} alt={item.name} className='w-full h-64 object-cover' />
                        <h2 className='mt-2 text-xl font-bold'>{item.name}</h2>
                        <p className='mt-2 text-gray-600'>{item.description.substring(0, 100)}...</p>
                        <div className='flex items-center justify-between mt-4'>
                            <p className='text-gray-600'>${item.price}</p>
                            <button className='px-4 py-2 bg-blue-500 text-white'>Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Product;

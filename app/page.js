"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(10);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/product", {
        params: { page: currentPage, limit },
      });
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <h3 className="text-2xl font-semibold mb-6">Available Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div
              key={product._id}
              className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"
            >
              <img
                className="w-full h-48 object-cover"
                src={product.images[0]}
                alt={product.name}
              />
              <div className="p-4">
                <h4 className="text-xl font-semibold text-gray-800">
                  {product.name}
                </h4>
                <p className="text-gray-600 text-sm mt-2">
                  {product.description}
                </p>
                <div className="mt-4 flex justify-between items-center">
                  <p className="text-lg font-semibold text-gray-900">
                    ${product.price}
                  </p>
                  <span className="text-sm text-gray-500">
                    Stock: {product.stock}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>

      <div className="mt-6 flex justify-center space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-lg"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-300 rounded-lg"
        >
          Next
        </button>
      </div>
    </div>
  );
}

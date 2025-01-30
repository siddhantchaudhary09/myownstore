import dbConnect from "app/lib/dbConnect";
import Category from "models/categoryModel";
import Product from "models/productModel";

import { NextResponse } from "next/server"; // Import NextResponse for Next.js

export async function POST(req) {
  // Parse the incoming JSON data
  const { name, description, category, price, stock, images, sizeOptions } =
    await req.json();

  // Basic field validation
  if (!name || !category || !price || !stock) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  // Validate that images and sizeOptions are arrays (or provide a fallback)
  if (images && !Array.isArray(images)) {
    return NextResponse.json(
      { message: "Images must be an array of strings" },
      { status: 400 }
    );
  }

  if (sizeOptions && !Array.isArray(sizeOptions)) {
    return NextResponse.json(
      { message: "Size options must be an array of strings" },
      { status: 400 }
    );
  }

  // If images and sizeOptions are undefined, make sure they are initialized as empty arrays
  const validatedImages = images || [];
  const validatedSizeOptions = sizeOptions || [];

  try {
    // Connect to the database
    await dbConnect();

    // Create the new product
    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock,
      images: validatedImages,
      sizeOptions: validatedSizeOptions,
    });

    const categoryUpdate = await Category.findByIdAndUpdate(category, {
      $push: {
        products: {
          _id: product._id,
        },
      },
    });
    // Return the success response using NextResponse
    return NextResponse.json(
      { message: "Product created", product },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating product" },
      { status: 500 }
    );
  }
}

export async function GET() {
  await dbConnect();

  try {
    const products = await Product.find({});
    if (products.length === 0) {
      return NextResponse.json(
        { message: "No Products found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { success: true, data: products },
      { status: 200 }
    );
  } catch (error) {
    console.error("Products fetching failed: ", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

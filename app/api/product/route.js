import dbConnect from "app/lib/dbConnect";
import Category from "models/categoryModel";
import Product from "models/productModel";
import { uploadMultipleImages } from "../../lib/imageuploader";

import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const formData = await req.formData();
    const name = formData.get("name");
    const description = formData.get("description");
    const category = formData.get("category");
    const price = formData.get("price");
    const stock = formData.get("stock");
    const sizeOptions = formData.getAll("sizeOptions");
    const images = formData.getAll("images");

    if (!name || !category || !price || !stock) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const uploadedImages = await uploadMultipleImages(images, "products");

    await dbConnect();

    const product = await Product.create({
      name,
      description,
      category,
      price,
      stock,
      images: uploadedImages,
      sizeOptions: sizeOptions || [],
    });

    await Category.findByIdAndUpdate(category, {
      $push: { products: { _id: product._id } },
    });

    return NextResponse.json(
      { message: "Product created", product },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error creating product", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const page = url.searchParams.get("page");
    const limit = url.searchParams.get("limit");

    // Log the searchParams to check if they are being received correctly
    console.log("Query Parameters:", url.searchParams);

    // Check the type of page and limit before parsing
    console.log("Type of page:", typeof page);
    console.log("Type of limit:", typeof limit);

    // Trim any extra spaces and use Number() for stricter conversion
    const pageNum = Number(page?.trim()) || 1; // Default to 1 if invalid
    const limitNum = Number(limit?.trim()) || 10; // Default to 10 if invalid

    // Log the parsed page and limit
    console.log("Parsed page:", pageNum);
    console.log("Parsed limit:", limitNum);
    // Validate that page and limit are positive integers
    if (pageNum <= 0 || limitNum <= 0) {
      return NextResponse.json(
        { message: "Page and limit must be positive integers" },
        { status: 400 }
      );
    }

    const articles = await Product.aggregate([
      {
        $facet: {
          metadata: [{ $count: "totalCount" }], // Get total count
          data: [
            { $skip: (pageNum - 1) * limitNum }, // Skip based on page number
            { $limit: limitNum }, // Limit the number of products
          ],
        },
      },
    ]);

    // Calculate the total number of pages
    const totalProducts = articles[0].metadata[0]
      ? articles[0].metadata[0].totalCount
      : 0;
    const totalPages = Math.ceil(totalProducts / limitNum);

    return NextResponse.json(
      {
        products: articles[0].data,
        totalProducts,
        totalPages,
        currentPage: pageNum,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Error fetching products" },
      { status: 500 }
    );
  }
}

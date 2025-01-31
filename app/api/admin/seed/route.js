import { faker } from "@faker-js/faker";
import dbConnect from "app/lib/dbConnect";
import Category from "models/categoryModel";
import Product from "models/productModel";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const categories = await Category.find();
    if (!categories.length) {
      return NextResponse.json(
        { message: "No categories found!" },
        { status: 400 }
      );
    }

    const products = Array.from({ length: 7 }, () => ({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      category: categories[Math.floor(Math.random() * 4)]._id,
      price: faker.commerce.price({ min: 10, max: 500 }),
      stock: faker.number.int({ min: 1, max: 100 }),
      images: [
        faker.image.urlLoremFlickr({ category: "fashion" }),
        faker.image.urlLoremFlickr({ category: "clothes" }),
      ],
      sizeOptions: faker.helpers.arrayElements(["S", "M", "L", "XL"], 2),
    }));

    await Product.insertMany(products);

    return NextResponse.json(
      { message: `✅ Inserted 200 dummy products!` },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "❌ Error seeding", error: error.message },
      { status: 500 }
    );
  }
}

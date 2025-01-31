export async function POST(req) {
  const { userId, AddressId, products, totalAmount, discountedAmount } =
    await req.json();

  if (!userId || AddressId || products || totalAmount) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  await dbConnect();
  try {
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

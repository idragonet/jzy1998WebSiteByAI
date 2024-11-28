import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json");

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updatedProduct = await request.json();
    
    const data = await readFile(PRODUCTS_FILE, "utf-8");
    const products = JSON.parse(data);
    
    const updatedProducts = products.map((product: any) => {
      if (product.id === params.id) {
        return {
          ...product,
          ...updatedProduct,
          id: params.id // 保持ID不变
        };
      }
      return product;
    });

    await writeFile(PRODUCTS_FILE, JSON.stringify(updatedProducts, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await readFile(PRODUCTS_FILE, "utf-8");
    const products = JSON.parse(data);
    
    const updatedProducts = products.filter(
      (product: any) => product.id !== params.id
    );

    await writeFile(PRODUCTS_FILE, JSON.stringify(updatedProducts, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
} 
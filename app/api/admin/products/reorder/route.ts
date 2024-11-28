import { NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json");

export async function POST(request: Request) {
  try {
    const orderUpdates = await request.json();
    
    // 读取当前产品数据
    const data = await readFile(PRODUCTS_FILE, "utf-8");
    const products = JSON.parse(data);
    
    // 创建一个映射来存储新的顺序
    const orderMap = new Map(
      orderUpdates.map((update: { id: string; order: number }) => [
        update.id,
        update.order,
      ])
    );
    
    // 更新产品顺序
    const updatedProducts = products
      .map((product: any) => ({
        ...product,
        order: orderMap.get(product.id) ?? product.order ?? 0,
      }))
      .sort((a: any, b: any) => a.order - b.order);

    // 保存更新后的数据
    await writeFile(PRODUCTS_FILE, JSON.stringify(updatedProducts, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update product order" },
      { status: 500 }
    );
  }
} 
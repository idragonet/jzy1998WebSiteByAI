import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json");

// 确保data目录存在
async function ensureDataDir() {
  try {
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
  } catch (error) {
    // 忽略目录已存在的错误
  }
}

// 获取所有产品
export async function GET() {
  try {
    await ensureDataDir();
    const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    // 如果文件不存在，返回空数组
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return NextResponse.json([]);
    }
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

// 创建新产品
export async function POST(request: Request) {
  try {
    const product = await request.json();
    await ensureDataDir();
    
    let products = [];
    try {
      const data = await fs.readFile(PRODUCTS_FILE, "utf-8");
      products = JSON.parse(data);
    } catch (error) {
      // 如果文件不存在，使用空数组
    }

    const newProduct = {
      id: Date.now().toString(),
      ...product,
    };

    products.push(newProduct);
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));

    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
} 
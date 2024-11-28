import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";

const ADMIN_PASSWORD = "lz2000";
const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json");
const CONTACT_FILE = path.join(process.cwd(), "data", "contact.json");

// 初始化所有数据
async function initializeData() {
  const initialProducts = [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1585245542456-a772781e40b4?w=800&auto=format&fit=crop&q=60",
      title: "35极窄系列",
      description: "超薄框设计，让您享受更开阔的视野"
    },
    // ... 其他产品数据保持不变 ...
  ];

  try {
    // 确保目录存在
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
    
    // 检查文件是否存在
    try {
      await fs.access(PRODUCTS_FILE);
    } catch {
      // 如果文件不存在，写入初始数据
      await fs.writeFile(PRODUCTS_FILE, JSON.stringify(initialProducts, null, 2));
    }

    // 初始化联系信息
    const initialContact = {
      phones: {
        main: "0757-85571027",
        sales1: "189 0241 2737",
        sales2: "181 2566 7688",
        sales1Name: "卢生",
        sales2Name: "周",
      },
      operationCenter: "中国佛山",
      factoryAddress: "佛山市南海区大沥镇太平石步一工业区",
      wechat: "WeChat123"
    };

    try {
      await fs.access(CONTACT_FILE);
    } catch {
      await fs.writeFile(CONTACT_FILE, JSON.stringify(initialContact, null, 2));
    }
  } catch (error) {
    console.error("Error initializing products and contact:", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body.password === ADMIN_PASSWORD) {
      cookies().set("admin_session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24,
      });

      // 初始化所有数据
      await initializeData();

      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 
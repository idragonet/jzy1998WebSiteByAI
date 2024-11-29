import { NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await request.formData();
    const file = formData.get("image") as File;
    
    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    // 创建上传目录
    const uploadDir = path.join(process.cwd(), "public", "product-images");
    await mkdir(uploadDir, { recursive: true });

    // 使用简单的文件名
    const extension = file.name.split(".").pop();
    const fileName = `${params.id}.${extension}`;
    const filePath = path.join(uploadDir, fileName);

    // 读取并保存文件
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // 更新产品信息中的图片URL
    const productsPath = path.join(process.cwd(), "data", "products.json");
    const productsContent = await readFile(productsPath, "utf-8");
    const productsData = JSON.parse(productsContent);
    const products = productsData.map((product: any) => {
      if (product.id === params.id) {
        return {
          ...product,
          image: `/product-images/${fileName}`
        };
      }
      return product;
    });

    await writeFile(productsPath, JSON.stringify(products, null, 2));

    return NextResponse.json({ 
      success: true,
      imageUrl: `/product-images/${fileName}`
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    );
  }
} 
import { NextResponse } from "next/server";
import { writeFile, mkdir, readFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
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
    const uploadDir = path.join(process.cwd(), "public", "contact-images");
    await mkdir(uploadDir, { recursive: true });

    // 生成文件名
    const extension = file.name.split(".").pop();
    const fileName = `wechat-qrcode-${Date.now()}.${extension}`;
    const filePath = path.join(uploadDir, fileName);

    // 保存文件
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // 更新联系信息
    const contactPath = path.join(process.cwd(), "data", "contact.json");
    let contactData;
    try {
      const contactContent = await readFile(contactPath, 'utf-8');
      contactData = JSON.parse(contactContent);
    } catch (error) {
      console.error("Error reading contact data:", error);
      contactData = {};
    }

    const updatedContact = {
      ...contactData,
      wechatQRCode: `/contact-images/${fileName}`
    };

    await writeFile(contactPath, JSON.stringify(updatedContact, null, 2));

    return NextResponse.json({ 
      success: true,
      imageUrl: `/contact-images/${fileName}`
    });
  } catch (error) {
    console.error("Error uploading QR code:", error);
    return NextResponse.json(
      { error: "Failed to upload QR code: " + (error as Error).message },
      { status: 500 }
    );
  }
} 
import { NextResponse } from "next/server";
import { writeFile, readFile } from "fs/promises";
import path from "path";

const PASSWORD_FILE = path.join(process.cwd(), "data", "password.json");
const DEFAULT_PASSWORD = "lz2000";

// 获取当前密码
export async function GET() {
  try {
    const data = await readFile(PASSWORD_FILE, "utf-8");
    return NextResponse.json({ success: true });
  } catch (error) {
    // 如果文件不存在，创建默认密码
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      await writeFile(PASSWORD_FILE, JSON.stringify({ password: DEFAULT_PASSWORD }));
    }
    return NextResponse.json({ success: true });
  }
}

// 更新密码
export async function PUT(request: Request) {
  try {
    const { oldPassword, newPassword } = await request.json();
    
    // 读取当前密码
    let currentPassword;
    try {
      const data = await readFile(PASSWORD_FILE, "utf-8");
      currentPassword = JSON.parse(data).password;
    } catch {
      currentPassword = DEFAULT_PASSWORD;
    }

    // 验证旧密码
    if (oldPassword !== currentPassword) {
      return NextResponse.json(
        { error: "Old password is incorrect" },
        { status: 400 }
      );
    }

    // 更新密码
    await writeFile(
      PASSWORD_FILE,
      JSON.stringify({ password: newPassword }, null, 2)
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update password" },
      { status: 500 }
    );
  }
} 
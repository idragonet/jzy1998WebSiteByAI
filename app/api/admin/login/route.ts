import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = "lz2000"; // 固定密码

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("Received login request with body:", body); // 调试日志

    if (!body.password) {
      return NextResponse.json(
        { error: "Password is required" },
        { status: 400 }
      );
    }

    console.log("Comparing passwords:", {
      received: body.password,
      expected: ADMIN_PASSWORD
    }); // 调试日志

    if (body.password === ADMIN_PASSWORD) {
      console.log("Password matched, setting cookie"); // 调试日志
      
      cookies().set("admin_session", "true", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 24小时
      });

      return NextResponse.json({ success: true });
    }

    console.log("Password mismatch"); // 调试日志
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  } catch (error) {
    console.error("Login error:", error); // 调试日志
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 
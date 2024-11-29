import { NextResponse } from "next/server";

const DEFAULT_PASSWORD = "lz2000";

export async function POST(request: Request) {
  console.log("===== API: 登录请求开始 =====");
  try {
    const { password } = await request.json();
    console.log("1. 收到密码请求:", { password });

    console.log("2. 验证密码");
    if (password === DEFAULT_PASSWORD) {
      console.log("3. 密码正确");
      
      // 创建响应
      const response = NextResponse.json({ 
        success: true,
        message: "Login successful" 
      });

      // 最简单的 cookie 设置
      console.log("4. 设置cookie");
      response.cookies.set("admin_session", "true", {
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      });
      
      // 检查 cookie 是否设置成功
      const cookies = response.headers.get('set-cookie');
      console.log("5. 响应头中的 Set-Cookie:", cookies);
      
      // 添加额外的响应头以帮助调试
      response.headers.set('X-Debug-Cookie', 'true');
      response.headers.set('X-Debug-Time', new Date().toISOString());
      
      return response;
    }

    console.log("3. 密码错误");
    return NextResponse.json(
      { error: "密码错误" },
      { status: 401 }
    );
  } catch (error) {
    console.error("登录过程出错:", error);
    return NextResponse.json(
      { error: "服务器错误" },
      { status: 500 }
    );
  }
}

export const runtime = 'edge';
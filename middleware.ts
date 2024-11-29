import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  console.log("\n===== Middleware 开始 =====");
  console.log("请求URL:", request.url);
  console.log("请求路径:", request.nextUrl.pathname);
  console.log("请求方法:", request.method);
  console.log("所有 Cookies:", request.cookies.getAll());
  
  // 检查是否访问管理页面
  if (request.nextUrl.pathname.startsWith("/admin")) {
    console.log("\n访问管理页面");
    
    // 排除登录页面和登录API
    if (request.nextUrl.pathname === "/admin/login" || 
        request.nextUrl.pathname === "/api/admin/login") {
      console.log("访问登录相关页面，允许通过");
      return NextResponse.next();
    }

    // 检查管理员会话
    const session = request.cookies.get("admin_session");
    console.log("\nCookie 检查:", {
      有session: !!session,
      session值: session?.value,
      所有cookie: request.cookies.getAll()
    });

    if (!session?.value || session.value !== "true") {
      console.log("\n认证失败，重定向到登录页面");
      const url = request.nextUrl.clone();
      url.pathname = "/admin/login";
      
      const response = NextResponse.redirect(url);
      console.log("重定向到:", url.toString());
      
      return response;
    }

    console.log("\n认证成功，允许访问");
    return NextResponse.next();
  }

  console.log("\n===== Middleware 结束 =====");
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*'
  ]
}; 
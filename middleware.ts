import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // 处理 /admin 路径的重定向
  if (request.nextUrl.pathname === "/admin") {
    const session = request.cookies.get("admin_session");
    if (session) {
      // 如果已登录，重定向到产品管理页面
      return NextResponse.redirect(new URL("/admin/products", request.url));
    } else {
      // 如果未登录，重定向到登录页面
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // 检查是否访问管理页面
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // 排除登录页面
    if (request.nextUrl.pathname === "/admin/login") {
      return NextResponse.next();
    }

    // 检查管理员会话
    const session = request.cookies.get("admin_session");
    if (!session) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
}; 
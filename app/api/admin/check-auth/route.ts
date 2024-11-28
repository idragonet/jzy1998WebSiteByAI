import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const session = cookies().get("admin_session");
  
  if (session) {
    return NextResponse.json({ isAdmin: true });
  }
  
  return NextResponse.json({ isAdmin: false }, { status: 401 });
} 
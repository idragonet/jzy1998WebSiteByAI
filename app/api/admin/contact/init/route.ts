import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const CONTACT_FILE = path.join(process.cwd(), "data", "contact.json");

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

export async function GET() {
  try {
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
    
    try {
      await fs.access(CONTACT_FILE);
    } catch {
      await fs.writeFile(CONTACT_FILE, JSON.stringify(initialContact, null, 2));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to initialize contact" }, { status: 500 });
  }
} 
import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const CONTACT_FILE = path.join(process.cwd(), "data", "contact.json");

const defaultContact = {
  phones: {
    main: "",
    sales1: "",
    sales2: "",
    sales1Name: "",
    sales2Name: "",
  },
  operationCenter: "",
  factoryAddress: "",
  wechat: ""
};

export async function GET() {
  try {
    const data = await fs.readFile(CONTACT_FILE, "utf-8");
    return NextResponse.json(JSON.parse(data));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return NextResponse.json(defaultContact);
    }
    return NextResponse.json({ error: "Failed to fetch contact" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const contact = await request.json();
    await fs.writeFile(CONTACT_FILE, JSON.stringify(contact, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
} 
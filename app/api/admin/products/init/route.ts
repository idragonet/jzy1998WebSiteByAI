import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json");

const initialProducts = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1585245542456-a772781e40b4?w=800&auto=format&fit=crop&q=60",
    title: "35极窄系列",
    description: "超薄框设计，让您享受更开阔的视野"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop&q=60",
    title: "40极窄系列",
    description: "完美平衡隔音隔热与美观性能"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=800&auto=format&fit=crop&q=60",
    title: "33/40×50中窄推拉门系列",
    description: "经典推拉设计，适合各种空间需求"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&auto=format&fit=crop&q=60",
    title: "35极窄平开门系列",
    description: "极致纤薄的平开门设计"
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?w=800&auto=format&fit=crop&q=60",
    title: "40极窄平开门系列",
    description: "优质工艺，打造极致通透体验"
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=60",
    title: "33/40×50中窄平开门系列",
    description: "稳重大气的中窄框设计"
  },
  {
    id: "7",
    image: "https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?w=800&auto=format&fit=crop&q=60",
    title: "悬浮（幽灵）门系列",
    description: "创新悬浮设计，突破传统门窗形态"
  },
  {
    id: "8",
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop&q=60",
    title: "2.0重型推拉门系列",
    description: "承重能力强，适合大尺寸门窗"
  },
  {
    id: "9",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
    title: "1.8/3.0厚110-120平开窗系列",
    description: "高强度设计，卓越保温隔热性能"
  }
];

export async function GET() {
  try {
    // 确保目录存在
    await fs.mkdir(path.join(process.cwd(), "data"), { recursive: true });
    
    // 写入初始数据（总是覆盖）
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(initialProducts, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to initialize products" }, { status: 500 });
  }
} 
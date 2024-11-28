"use client";

import { Card, CardContent } from "@/components/ui/card";

const products = [
  {
    image: "https://images.unsplash.com/photo-1585245542456-a772781e40b4?w=800&auto=format&fit=crop&q=60",
    title: "35极窄系列",
    description: "超薄框设计，让您享受更开阔的视野"
  },
  {
    image: "https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800&auto=format&fit=crop&q=60",
    title: "40极窄系列",
    description: "完美平衡隔音隔热与美观性能"
  },
  {
    image: "https://images.unsplash.com/photo-1580237072617-771c3ecc4a24?w=800&auto=format&fit=crop&q=60",
    title: "33/40×50中窄推拉门系列",
    description: "经典推拉设计，适合各种空间需求"
  },
  {
    image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=800&auto=format&fit=crop&q=60",
    title: "35极窄平开门系列",
    description: "极致纤薄的平开门设计"
  },
  {
    image: "https://images.unsplash.com/photo-1615529151169-7b1ff50dc7f2?w=800&auto=format&fit=crop&q=60",
    title: "40极窄平开门系列",
    description: "优质工艺，打造极致通透体验"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=60",
    title: "33/40×50中窄平开门系列",
    description: "稳重大气的中窄框设计"
  },
  {
    image: "https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?w=800&auto=format&fit=crop&q=60",
    title: "悬浮（幽灵）门系列",
    description: "创新悬浮设计，突破传统门窗形态"
  },
  {
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop&q=60",
    title: "2.0重型推拉门系列",
    description: "承重能力强，适合大尺寸门窗"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60",
    title: "1.8/3.0厚110-120平开窗系列",
    description: "高强度设计，卓越保温隔热性能"
  }
];

export default function ProductShowcase() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">产品系列</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="aspect-video relative">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.title}</h3>
                <p className="text-muted-foreground">{product.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";

interface Product {
  id: string;
  title: string;
  image: string;
  description: string;
}

export default function ProductShowcase() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // 获取产品数据
    fetch("/api/admin/products")
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error("Error fetching products:", error));
  }, []);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">产品系列</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
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
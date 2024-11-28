"use client";

import { MapPin, MessageCircle } from "lucide-react";

export default function ContactSection() {
  return (
    <section className="py-20 bg-secondary" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">联系我们</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <MapPin className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">公司地址</h3>
              </div>
              <p className="text-muted-foreground">广东佛山市南海区大沥镇太平石步一街南极至优门窗</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">微信咨询</h3>
              </div>
              <p className="text-muted-foreground">WeChat123</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
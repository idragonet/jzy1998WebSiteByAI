"use client";

import { Phone, MapPin, Building, MessageCircle } from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <Phone className="h-6 w-6 text-primary mr-3" />
          <h3 className="text-xl font-semibold">服务热线</h3>
        </div>
        <p className="text-lg font-semibold mb-2">0757-85571027</p>
        <div className="space-y-2 text-muted-foreground">
          <p>卢生：189 0241 2737</p>
          <p>周：181 2566 7688</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <Building className="h-6 w-6 text-primary mr-3" />
            <h3 className="text-xl font-semibold">运营中心</h3>
          </div>
          <p className="text-muted-foreground">中国佛山</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-lg">
          <div className="flex items-center mb-4">
            <MapPin className="h-6 w-6 text-primary mr-3" />
            <h3 className="text-xl font-semibold">工厂地址</h3>
          </div>
          <p className="text-muted-foreground">佛山市南海区大沥镇太平石步一工业区</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex items-center mb-4">
          <MessageCircle className="h-6 w-6 text-primary mr-3" />
          <h3 className="text-xl font-semibold">微信</h3>
        </div>
        <div className="flex justify-center">
          <img 
            src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=WeChat123" 
            alt="微信二维码" 
            className="w-32 h-32"
          />
        </div>
        <p className="text-center mt-3 text-sm text-muted-foreground">扫码添加微信</p>
      </div>
    </div>
  );
}
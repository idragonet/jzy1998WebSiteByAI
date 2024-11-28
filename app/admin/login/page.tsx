"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      console.log("Attempting login with password:", password);
      
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        router.push("/admin/products");
      } else {
        toast({
          title: "登录失败",
          description: data.error || "密码错误",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      toast({
        title: "错误",
        description: "登录过程中发生错误",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold text-center">后台管理登录</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="请输入管理密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full">
            登录
          </Button>
        </form>
      </div>
    </div>
  );
} 
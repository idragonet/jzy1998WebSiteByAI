"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  // 页面加载时的日志
  useEffect(() => {
    console.log("登录页面已加载");
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("===== 登录流程开始 =====");
    console.log("1. 表单提交触发");
    setIsLoading(true);
    
    try {
      // 请求前
      console.log("2. 准备发送登录请求");
      console.log("请求URL:", "/api/admin/login");
      console.log("请求方法:", "POST");
      
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
        credentials: 'include',
      });

      // 响应状态
      console.log("3. 收到响应");
      console.log("状态码:", response.status);
      console.log("状态文本:", response.statusText);
      console.log("响应头:", Object.fromEntries(response.headers.entries()));

      const data = await response.json();
      console.log("4. 响应数据:", data);

      if (response.ok) {
        console.log("5. 登录成功");
        toast({
          title: "登录成功",
          description: "正在跳转...",
        });
        
        // 等待一段时间确保 cookie 设置完成
        console.log("6. 等待 cookie 设置");
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        console.log("7. 准备跳转");
        console.log("当前所有 cookies:", document.cookie);
        
        // 使用 replace 而不是 push
        router.replace("/admin/products");
      } else {
        console.log("5. 登录失败");
        console.log("错误信息:", data.error);
        toast({
          title: "登录失败",
          description: data.error || "密码错误",
          variant: "destructive",
        });
        setPassword("");
      }
    } catch (error) {
      console.log("发生错误:");
      console.error(error);
      toast({
        title: "错误",
        description: "登录过程中发生错误",
        variant: "destructive",
      });
      setPassword("");
    } finally {
      setIsLoading(false);
      console.log("===== 登录流程结束 =====");
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
              onChange={(e) => {
                console.log("密码输入变化");
                setPassword(e.target.value);
              }}
              disabled={isLoading}
              autoFocus
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
            onClick={() => console.log("登录按钮被点击")}
          >
            {isLoading ? "登录中..." : "登录"}
          </Button>
        </form>
      </div>
    </div>
  );
} 
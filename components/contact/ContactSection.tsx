"use client";

import { useState, useEffect } from "react";
import { Phone, Building, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface ContactInfo {
  phones: {
    main: string;
    sales1: string;
    sales2: string;
    sales1Name: string;
    sales2Name: string;
  };
  operationCenter: string;
  factoryAddress: string;
  wechatQRCode: string;
}

const defaultContact: ContactInfo = {
  phones: {
    main: "",
    sales1: "",
    sales2: "",
    sales1Name: "",
    sales2Name: "",
  },
  operationCenter: "",
  factoryAddress: "",
  wechatQRCode: "",
};

export default function ContactSection() {
  const [contact, setContact] = useState<ContactInfo>(defaultContact);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const [isQRCodeOpen, setIsQRCodeOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      try {
        // 初始化联系信息
        await fetch("/api/admin/contact/init");
        await fetchContact();
      } catch (error) {
        console.error("Error initializing contact:", error);
      }
    };
    
    init();
    checkAdmin();
  }, []);

  const checkAdmin = async () => {
    try {
      const response = await fetch("/api/admin/check-auth");
      setIsAdmin(response.ok);
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const fetchContact = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/contact");
      if (response.ok) {
        const data = await response.json();
        if (data && data.phones) {  // 确保数据有效
          setContact(data);
        }
      }
    } catch (error) {
      console.error("Error fetching contact info:", error);
      toast({
        title: "错误",
        description: "获取联系信息失败",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/admin/contact", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });

      if (response.ok) {
        setIsEditing(false);
        toast({
          title: "成功",
          description: "联系信息已更新",
        });
        await fetchContact(); // 重新获取数据
      } else {
        throw new Error("Failed to update contact");
      }
    } catch (error) {
      toast({
        title: "错误",
        description: "更新失败",
        variant: "destructive",
      });
    }
  };

  const handleQRCodeUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch("/api/admin/contact/qrcode", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload QR code");

      const data = await response.json();
      setContact(prev => ({
        ...prev,
        wechatQRCode: data.imageUrl
      }));

      toast({
        title: "成功",
        description: "微信二维码已更新",
      });
    } catch (error) {
      toast({
        title: "错误",
        description: "二维码上传失败",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <section className="py-20 bg-secondary" id="contact">
        <div className="container mx-auto px-4 flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-secondary" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">联系我们</h2>
            {isAdmin && (
              <Button
                variant="outline"
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              >
                {isEditing ? "保存" : "编辑"}
              </Button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Phone className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">服务热线</h3>
              </div>
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    value={contact.phones.main}
                    onChange={(e) => setContact({
                      ...contact,
                      phones: { ...contact.phones, main: e.target.value }
                    })}
                    placeholder="主要电话"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={contact.phones.sales1Name}
                      onChange={(e) => setContact({
                        ...contact,
                        phones: { ...contact.phones, sales1Name: e.target.value }
                      })}
                      placeholder="销售1姓名"
                    />
                    <Input
                      value={contact.phones.sales1}
                      onChange={(e) => setContact({
                        ...contact,
                        phones: { ...contact.phones, sales1: e.target.value }
                      })}
                      placeholder="销售1电话"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      value={contact.phones.sales2Name}
                      onChange={(e) => setContact({
                        ...contact,
                        phones: { ...contact.phones, sales2Name: e.target.value }
                      })}
                      placeholder="销售2姓名"
                    />
                    <Input
                      value={contact.phones.sales2}
                      onChange={(e) => setContact({
                        ...contact,
                        phones: { ...contact.phones, sales2: e.target.value }
                      })}
                      placeholder="销售2电话"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-lg font-semibold mb-2">{contact.phones.main}</p>
                  <div className="space-y-2 text-muted-foreground">
                    <p>{contact.phones.sales1Name}：{contact.phones.sales1}</p>
                    <p>{contact.phones.sales2Name}：{contact.phones.sales2}</p>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <Building className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">运营中心</h3>
                </div>
                {isEditing ? (
                  <Input
                    value={contact.operationCenter}
                    onChange={(e) => setContact({...contact, operationCenter: e.target.value})}
                  />
                ) : (
                  <p className="text-muted-foreground">{contact.operationCenter}</p>
                )}
              </div>

              <div className="bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center mb-4">
                  <MapPin className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">工厂地址</h3>
                </div>
                {isEditing ? (
                  <Input
                    value={contact.factoryAddress}
                    onChange={(e) => setContact({...contact, factoryAddress: e.target.value})}
                  />
                ) : (
                  <p className="text-muted-foreground">{contact.factoryAddress}</p>
                )}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <MessageCircle className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-xl font-semibold">微信</h3>
              </div>
              {isEditing ? (
                <div className="space-y-4">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleQRCodeUpload(file);
                    }}
                  />
                  <p className="text-sm text-muted-foreground">
                    请上传微信二维码图片
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  {contact.wechatQRCode ? (
                    <>
                      <div 
                        className="w-32 h-32 relative cursor-pointer hover:opacity-90 transition-opacity"
                        onClick={() => setIsQRCodeOpen(true)}
                      >
                        <img 
                          src={contact.wechatQRCode}
                          alt="微信二维码"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        点击二维码可放大查看
                      </p>
                    </>
                  ) : (
                    <p className="text-muted-foreground">暂无二维码</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Dialog open={isQRCodeOpen} onOpenChange={setIsQRCodeOpen}>
        <DialogContent className="sm:max-w-md flex flex-col items-center">
          <div className="w-80 h-80 relative">
            <img
              src={contact.wechatQRCode}
              alt="微信二维码"
              className="w-full h-full object-contain"
            />
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            扫描二维码添加微信
          </p>
        </DialogContent>
      </Dialog>
    </section>
  );
}
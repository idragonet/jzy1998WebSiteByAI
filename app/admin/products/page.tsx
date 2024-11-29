"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Pencil, Trash2, LogOut } from "lucide-react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Product {
  id: string;
  title: string;
  image: string;
  description: string;
  order?: number;
}

function SortableProduct({ product, isEditing, onEdit, children }: {
  product: Product;
  isEditing: boolean;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: product.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className="border rounded-lg p-4 mb-4 bg-white"
    >
      <div className="flex items-center justify-between mb-2">
        <div
          {...listeners}
          className="cursor-move p-2 hover:bg-gray-100 rounded"
        >
          ⋮⋮
        </div>
        {children}
      </div>
    </div>
  );
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast();
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/products");
      if (!response.ok) {
        if (response.status === 401) {
          router.push("/admin/login");
          return;
        }
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      toast({
        title: "错误",
        description: "获取产品类型列表失败",
        variant: "destructive",
      });
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setProducts((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const newItems = arrayMove(items, oldIndex, newIndex);
        
        // 更新服务器端顺序
        fetch("/api/admin/products/reorder", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newItems.map((item, index) => ({
            id: item.id,
            order: index,
          }))),
        }).catch(error => {
          toast({
            title: "错误",
            description: "更新顺序失败",
            variant: "destructive",
          });
        });

        return newItems;
      });
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm("确定要删除这个产品类型吗？")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/products/${productId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete product");

      setProducts(products.filter(p => p.id !== productId));
      toast({
        title: "成功",
        description: "产品类型已删除",
      });
    } catch (error) {
      toast({
        title: "错误",
        description: "删除失败",
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (file: File, productId: string) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(`/api/admin/products/${productId}/image`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      fetchProducts();
      toast({
        title: "成功",
        description: "图片上传成功",
      });
    } catch (error) {
      toast({
        title: "错误",
        description: "图片上传失败",
        variant: "destructive",
      });
    }
  };

  const handleUpdateProduct = async (product: Product) => {
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) throw new Error("Failed to update product");

      fetchProducts();
      setIsEditing(null);
      toast({
        title: "成功",
        description: "产品类型更新成功",
      });
    } catch (error) {
      toast({
        title: "错误",
        description: "产品类型更新失败",
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", {
        method: "POST",
      });
      router.push("/admin/login");
    } catch (error) {
      toast({
        title: "错误",
        description: "退出失败",
        variant: "destructive",
      });
    }
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: "错误",
        description: "两次输入的新密码不一致",
        variant: "destructive",
      });
      return;
    }

    try {
      const response = await fetch("/api/admin/password", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldPassword,
          newPassword,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to update password");
      }

      toast({
        title: "成功",
        description: "密码已更新",
      });
      setIsPasswordDialogOpen(false);
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast({
        title: "错误",
        description: error instanceof Error ? error.message : "密码更新失败",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">产品类型管理</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline"
            onClick={() => setIsPasswordDialogOpen(true)}
          >
            修改密码
          </Button>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            退出登录
          </Button>
        </div>
      </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={products}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {products.map((product) => (
              <SortableProduct
                key={product.id}
                product={product}
                isEditing={isEditing === product.id}
                onEdit={() => setIsEditing(product.id)}
              >
                {isEditing === product.id ? (
                  <div className="space-y-4">
                    <Input
                      value={product.title}
                      onChange={(e) =>
                        setProducts(products.map((p) =>
                          p.id === product.id
                            ? { ...p, title: e.target.value }
                            : p
                        ))
                      }
                      placeholder="产品类型名称"
                    />
                    <Input
                      value={product.description}
                      onChange={(e) =>
                        setProducts(products.map((p) =>
                          p.id === product.id
                            ? { ...p, description: e.target.value }
                            : p
                        ))
                      }
                      placeholder="产品类型描述"
                    />
                    <div className="flex space-x-2">
                      <Button onClick={() => handleUpdateProduct(product)}>
                        保存
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setIsEditing(null)}
                      >
                        取消
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4 w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-semibold">{product.title}</h3>
                        <p className="text-gray-600">{product.description}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setIsEditing(product.id)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="icon"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-40 h-40 object-cover rounded"
                      />
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleImageUpload(file, product.id);
                        }}
                      />
                    </div>
                  </div>
                )}
              </SortableProduct>
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>修改管理密码</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">当前密码</label>
              <Input
                type="password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">新密码</label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">确认新密码</label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsPasswordDialogOpen(false)}
            >
              取消
            </Button>
            <Button onClick={handlePasswordChange}>
              确认修改
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
} 
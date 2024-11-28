import { Building2, CheckCircle2, Shield, Wrench } from "lucide-react";

const features = [
  {
    icon: <Shield className="h-8 w-8" />,
    title: "品质保证",
    description: "采用优质原材料，严格质量控制，确保每一个产品都达到最高标准"
  },
  {
    icon: <Wrench className="h-8 w-8" />,
    title: "专业安装",
    description: "经验丰富的安装团队，确保门窗安装精准、密封性能优异"
  },
  {
    icon: <Building2 className="h-8 w-8" />,
    title: "定制服务",
    description: "根据您的需求提供个性化定制方案，满足不同空间和风格要求"
  },
  {
    icon: <CheckCircle2 className="h-8 w-8" />,
    title: "售后无忧",
    description: "提供长期质保服务，确保您的门窗始终保持最佳状态"
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">为什么选择我们</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="text-primary mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
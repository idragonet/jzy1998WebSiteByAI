"use client";

import { calculateExperienceYears } from "@/lib/utils";

export default function HeroSection() {
  const experienceYears = calculateExperienceYears(2013);

  return (
    <div className="relative min-h-[80vh] flex items-center">
      <div 
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1628592102751-ba83b0314276?q=80&w=2670&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)"
        }}
      />
      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-2xl text-white">
          <h1 className="text-6xl font-bold mb-4 tracking-tight">
            极至优门窗
          </h1>
          <p className="text-3xl mb-4">
            优质门窗定制专家
          </p>
          <p className="text-xl">
            {experienceYears}年专业制造经验，为您打造高品质的门窗解决方案
          </p>
        </div>
      </div>
    </div>
  );
}
"use client";

import { ArrowRight, Building2, CheckCircle2, Phone, Shield, Wrench } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProductShowcase from "@/components/ProductShowcase";
import HeroSection from "@/components/HeroSection";
import ContactSection from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ProductShowcase />
      <ContactSection />
    </main>
  );
}
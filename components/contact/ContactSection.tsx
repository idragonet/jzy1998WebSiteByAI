"use client";

import ContactInfo from "./ContactInfo";

export default function ContactSection() {
  return (
    <section className="py-20 bg-secondary" id="contact">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">联系我们</h2>
          <ContactInfo />
        </div>
      </div>
    </section>
  );
}
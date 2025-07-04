"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Send, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import toast, { Toaster } from "react-hot-toast";

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function Contact() {
  const contactRef = useRef<HTMLElement>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Animation code here...
    }, contactRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to send");

      toast.success("Message sent successfully!", {
        position: "bottom-center",
      });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Email send error:", error);
      toast.error("Failed to send message. Please try again.", {
        position: "bottom-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "adampratama.business@gmail.com",
      href: "mailto:adampratama.business@gmail.com",  
    },
    {
      icon: Phone,
      title: "WhatsApp",
      value: "+62 857-7539-8077",
      href: "https://wa.me/6285775398077  ",
    },
    {
      icon: MapPin,
      title: "Location",
      value: "Jakasampurna, West Bekasi",
      href: "#",
    },
  ];

  return (
    <section id="contact" ref={contactRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="contact-title text-3xl md:text-4xl font-bold text-center mb-16">
            Get In Touch
          </h2>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="contact-card">
                <h3 className="text-2xl font-semibold mb-6">
                  Let&apos;s Connect
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  I&apos;m always interested in hearing about new opportunities
                  and exciting projects. Whether you have a question or just
                  want to say hi, feel free to reach out!
                </p>

                <div className="space-y-4 mb-8">
                  {contactInfo.map((info, index) => (
                    <a
                      key={index}
                      href={info.href}
                      className="flex items-center gap-4 p-4 rounded-lg hover:bg-background transition-colors group"
                    >
                      <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium">{info.title}</div>
                        <div className="text-muted-foreground">
                          {info.value}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <Card className="contact-card">
              <CardHeader>
                <CardTitle>Send Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Input
                        name="name"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Input
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Input
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      rows={6}
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </section>
  );
}

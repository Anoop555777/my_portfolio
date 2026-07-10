import { useState } from "react";
import {
  Send,
  CheckCircle,
  AlertCircle,
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
} from "lucide-react";
import emailjs from "@emailjs/browser";
import SectionHeading from "./SectionHeading";
import Magnetic from "./Magnetic";
import ParallaxLayer from "./ParallaxLayer";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setStatusMessage("Sending your message...");

    try {
      // EmailJS configuration
      const serviceId = "YOUR_SERVICE_ID"; // Replace with your EmailJS service ID
      const templateId = "YOUR_TEMPLATE_ID"; // Replace with your EmailJS template ID
      const publicKey = "YOUR_PUBLIC_KEY"; // Replace with your EmailJS public key

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: "ajbisht99@gmail.com",
        },
        publicKey,
      );

      setStatus("success");
      setStatusMessage("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });

      setTimeout(() => {
        setStatus("idle");
        setStatusMessage("");
      }, 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setStatusMessage(
        "Failed to send message. Please try again or email me directly.",
      );

      setTimeout(() => {
        setStatus("idle");
        setStatusMessage("");
      }, 5000);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const fields = [
    {
      index: "01",
      name: "name",
      label: "What’s your name?",
      placeholder: "John Doe *",
      type: "text",
    },
    {
      index: "02",
      name: "email",
      label: "What’s your email?",
      placeholder: "john@example.com *",
      type: "email",
    },
    {
      index: "03",
      name: "message",
      label: "Tell me about your project",
      placeholder: "A portfolio, a product, a wild idea… *",
      type: "textarea",
    },
  ] as const;

  const inputClasses =
    "w-full bg-transparent rounded-none px-0 py-2 text-xl md:text-2xl font-display placeholder:text-muted/40 placeholder:font-normal focus:outline-none";

  return (
    <section
      id="contact"
      className="relative pt-28 pb-10 px-6 lg:px-12 border-t border-line overflow-hidden"
    >
      {/* Ghost word drifting behind the section */}
      <ParallaxLayer
        speed={0.7}
        className="absolute -left-10 top-1/3 pointer-events-none select-none hidden lg:block"
      >
        <span
          className="outline-text font-display font-extrabold uppercase text-[15vw] leading-none opacity-15"
          aria-hidden="true"
        >
          Contact
        </span>
      </ParallaxLayer>

      {/* Floating accent shapes at different depths */}
      <ParallaxLayer
        speed={-0.45}
        className="absolute right-[8%] top-40 pointer-events-none hidden md:block"
      >
        <div
          className="w-24 h-24 rounded-full border border-accent/25"
          aria-hidden="true"
        />
      </ParallaxLayer>
      <ParallaxLayer
        speed={-0.7}
        className="absolute left-[10%] bottom-[30%] pointer-events-none hidden md:block"
      >
        <div className="w-3 h-3 rounded-full bg-accent/50" aria-hidden="true" />
      </ParallaxLayer>
      <ParallaxLayer
        speed={-0.3}
        className="absolute right-[28%] bottom-[20%] pointer-events-none hidden md:block"
      >
        <span
          className="block font-display text-5xl text-accent/30 select-none"
          aria-hidden="true"
        >
          ✳
        </span>
      </ParallaxLayer>

      <div className="relative max-w-[90rem] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-3">
            <p className="sticky top-28 font-mono text-xs uppercase tracking-[0.3em] text-muted">
              <span className="text-accent">04</span> — Contact
            </p>
          </div>
          <div className="lg:col-span-9">
            <SectionHeading
              segments={[
                { text: "Let’s work " },
                { text: "together", accent: true },
              ]}
              className="text-5xl md:text-7xl xl:text-8xl font-display font-extrabold uppercase leading-[0.95]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: big email + meta */}
          <div className="lg:col-span-4 flex flex-col gap-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-4">
                Don’t like forms?
              </p>
              <a
                href="mailto:ajbisht99@gmail.com"
                className="link-underline inline-flex items-center gap-3 text-2xl md:text-3xl font-display font-semibold break-all hover:text-accent transition-colors duration-300"
              >
                ajbisht99@gmail.com
                <ArrowUpRight className="w-6 h-6 shrink-0" />
              </a>
            </div>

            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-muted mb-4">
                Elsewhere
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Github, href: "#", label: "GitHub" },
                  { icon: Linkedin, href: "#", label: "LinkedIn" },
                ].map((social) => (
                  <Magnetic key={social.label} strength={0.4}>
                    <a
                      href={social.href}
                      aria-label={social.label}
                      className="inline-flex w-12 h-12 items-center justify-center rounded-full border border-line hover:border-accent hover:text-accent transition-colors duration-300"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  </Magnetic>
                ))}
              </div>
            </div>

            <p className="text-muted leading-relaxed max-w-sm">
              I'm always open to discussing new projects, creative ideas, or
              opportunities to be part of your visions.
            </p>
          </div>

          {/* Right: numbered editorial form */}
          <div className="lg:col-span-7 lg:col-start-6">
            <form onSubmit={handleSubmit}>
              <div className="border-t border-line">
                {fields.map((field) => (
                  <div
                    key={field.name}
                    className="group relative border-b border-line"
                  >
                    {/* Accent underline sweeps in while the field is focused */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-0 left-0 h-px w-full bg-accent origin-left scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500 ease-out"
                    />
                    <div className="flex gap-6 py-8">
                      <span className="font-mono text-xs text-muted pt-1.5 select-none">
                        {field.index}
                      </span>
                      <div className="flex-1">
                        <label
                          htmlFor={field.name}
                          className="block font-mono text-xs uppercase tracking-[0.3em] text-muted mb-3 group-focus-within:text-accent transition-colors duration-300"
                        >
                          {field.label}
                        </label>
                        {field.type === "textarea" ? (
                          <textarea
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required
                            rows={4}
                            className={`${inputClasses} resize-none`}
                            placeholder={field.placeholder}
                          />
                        ) : (
                          <input
                            type={field.type}
                            id={field.name}
                            name={field.name}
                            value={formData[field.name]}
                            onChange={handleChange}
                            required
                            className={inputClasses}
                            placeholder={field.placeholder}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Big magnetic send button straddling the last row */}
              <div className="relative z-10 flex justify-center lg:justify-end lg:pr-16 -mt-14 md:-mt-16">
                <Magnetic strength={0.35}>
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    aria-label="Send message"
                    className={`w-32 h-32 md:w-36 md:h-36 rounded-full font-semibold text-sm uppercase tracking-wider flex flex-col items-center justify-center gap-2 transition-all duration-300 ${
                      status === "sending"
                        ? "bg-muted/30 text-muted cursor-not-allowed"
                        : "bg-accent text-ink hover:scale-110 hover:bg-paper"
                    }`}
                  >
                    <Send className="w-5 h-5" />
                    {status === "sending" ? "Sending…" : "Send it"}
                  </button>
                </Magnetic>
              </div>

              <div aria-live="polite" className="min-h-[3.5rem] mt-6">
                {statusMessage && (
                  <div
                    className={`flex items-center gap-3 font-mono text-sm ${
                      status === "success"
                        ? "text-accent"
                        : status === "error"
                          ? "text-red-400"
                          : "text-muted"
                    }`}
                  >
                    {status === "success" && (
                      <CheckCircle className="w-5 h-5 shrink-0" />
                    )}
                    {status === "error" && (
                      <AlertCircle className="w-5 h-5 shrink-0" />
                    )}
                    <span>{statusMessage}</span>
                  </div>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-28 pt-8 border-t border-line flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            © 2026 Anoop Singh — Designed & coded with obsession
          </p>

          <Magnetic strength={0.4}>
            <a
              href="#home"
              aria-label="Back to top"
              className="inline-flex w-12 h-12 items-center justify-center rounded-full border border-line hover:border-accent hover:text-accent transition-colors duration-300 group"
            >
              <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
            </a>
          </Magnetic>
        </footer>
      </div>
    </section>
  );
};

export default Contact;

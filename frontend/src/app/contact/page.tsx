import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { getProfile, getContentBlocks } from "@/lib/api";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE.name} — Full Stack Developer in Kathmandu, Nepal. Discuss your project today.`,
};

export default async function ContactPage() {
  const [profile, content] = await Promise.all([getProfile(), getContentBlocks()]);

  const email = profile?.email || SITE.email;
  const phone = profile?.phone || SITE.phone;

  const contactInfo = [
    {
      icon: MapPin,
      title: "Location",
      value: profile?.address || SITE.location,
    },
    {
      icon: Mail,
      title: "Email",
      value: email,
      href: `mailto:${email}`,
    },
    {
      icon: Phone,
      title: "Phone",
      value: phone,
      href: `tel:${phone.replace(/[^+\d]/g, "")}`,
    },
    {
      icon: Clock,
      title: "Availability",
      value: content["contact-availability"] || "Open to freelance projects",
    },
  ];

  return (
    <div className="relative overflow-hidden">
      <div className="aurora-blob left-[-12%] top-[-10%] h-[24rem] w-[24rem] animate-float bg-violet-600/25" aria-hidden />
      <div className="aurora-blob right-[-12%] bottom-[-10%] h-[20rem] w-[20rem] animate-float-slow bg-cyan-500/15" aria-hidden />

      <div className="relative mx-auto max-w-6xl px-6 py-14 sm:py-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Contact
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
            Get In <span className="text-aurora">Touch</span>
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-slate-400">
            {content["contact-intro"]}
          </p>
        </Reveal>

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-5">
            {contactInfo.map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="glass group flex items-center gap-4 rounded-2xl p-5 transition-colors duration-300 hover:border-violet-400/30">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-fuchsia-500 shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-110">
                    <item.icon className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {item.title}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-sm font-medium text-slate-200 transition-colors hover:text-violet-300"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-slate-200">{item.value}</p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}

            <Reveal delay={360}>
              <div className="glass rounded-2xl p-6 transition-colors duration-300 hover:border-violet-400/30">
                <h2 className="text-sm font-semibold text-white">Preferred Channels</h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">
                  {content["contact-channels"]}
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={150} className="lg:col-span-7">
            <div className="glass rounded-2xl p-6 sm:p-8">
              <h2 className="mb-6 text-lg font-bold text-white">Send a Message</h2>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
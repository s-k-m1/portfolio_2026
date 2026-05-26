import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Send, Terminal, AlertTriangle, CheckCircle2 } from "lucide-react";
import { supabase } from "../../supabase";

const panelVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 16 }
  }
};

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const handleServiceSelected = (e) => {
      setForm((prev) => ({
        ...prev,
        subject: `Inquiry: ${e.detail}`,
      }));

      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("serviceSelected", handleServiceSelected);
    return () => {
      window.removeEventListener("serviceSelected", handleServiceSelected);
    };
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 6000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from("contact")
        .insert([form]);

      if (error) {
        console.error(error);
        showAlert(
          "DATABASE_ERROR: Package transmission failed. Check connection parameters.",
          "error"
        );
      } else {
        showAlert(
          "SYSTEM_ALERT: Communication payload dispatched securely.",
          "success"
        );

        setForm({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      }
    } catch (error) {
      console.error(error);
      showAlert(
        "NETWORK_CRITICAL: Handshake rejected. Failed to target data tables.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="bg-[#020617] pt-0.5 pb-24 px-4 sm:px-8 lg:px-12 text-slate-100 font-sans antialiased relative overflow-hidden select-none">
      
      {/* Structural Accent Top Divider */}
      <div className="w-full h-[2px] bg-gradient-to-r from-transparent via-slate-800 to-transparent relative z-20 mb-12" />

      {/* Ambient Underlying Backlighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] sm:w-[600px] h-[400px] bg-blue-500/5 blur-[120px] pointer-events-none z-0" />

      <div className="max-w-7xl mx-auto relative z-10 space-y-12">
        
        {/* Header Block */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b-2 border-slate-900">
          <div className="max-w-3xl space-y-3 text-left">
            <div className="inline-flex items-center gap-2 bg-slate-950 border-2 border-slate-800 px-3 py-1.5 rounded-md shadow-md">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-slate-400 font-black">
                COMMUNICATION_CHANNELS
              </span>
            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white uppercase leading-none">
              Get In <span className="text-blue-500">Touch</span>
            </h2>

            <p className="text-slate-300 font-normal leading-relaxed text-base sm:text-lg max-w-2xl">
              Have a project framework blueprint in mind or need dedicated technical assistance? Let's compile something great.
            </p>
          </div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2 items-start">
          
          {/* Left Metadata Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-5 bg-slate-950/70 border-2 border-slate-800 p-6 sm:p-8 rounded-2xl flex flex-col justify-between space-y-8 shadow-xl min-h-[460px] hover:border-slate-750 transition-colors duration-300"
          >
            <div className="space-y-3">
              <h3 className="text-lg font-mono uppercase tracking-wider text-slate-200 font-black flex items-center gap-2.5">
                <Terminal size={16} className="text-blue-500" />
                CONTACT_METADATA
              </h3>
              <p className="text-slate-400 text-sm font-normal leading-relaxed">
                Direct infrastructure access routes. Verified communications protocols only.
              </p>
            </div>

            <div className="space-y-6 pt-2 grow flex flex-col justify-center">
              {[
                {
                  icon: MapPin,
                  title: "Our Location",
                  value: "Kathmandu, Nepal",
                  spec: "LOC_ZONE_01",
                },
                {
                  icon: Phone,
                  title: "Phone Number",
                  value: "+977-9807827561",
                  spec: "TEL_VOICE_STREAM",
                },
                {
                  icon: Mail,
                  title: "Email Address",
                  value: "info@saroj01.com.np",
                  spec: "SMTP_TLS_SECURE",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-5 group border-b border-slate-900/60 pb-5 last:border-none last:pb-0"
                >
                  <div className="w-12 h-12 shrink-0 bg-slate-950 border-2 border-slate-900 rounded-xl flex items-center justify-center text-slate-400 group-hover:text-blue-400 group-hover:border-slate-800 transition-all duration-300 shadow-inner">
                    <item.icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h4 className="text-sm font-extrabold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300 uppercase">
                      {item.title}
                    </h4>
                    <p className="text-slate-300 text-sm font-medium mt-0.5 select-all">
                      {item.value}
                    </p>
                    <span className="text-[9px] font-mono tracking-widest text-slate-600 block mt-1 uppercase font-bold">
                      {item.spec}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Input Fields Panel */}
          <motion.div
            variants={panelVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-7 bg-slate-950/70 border-2 border-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl hover:border-slate-750 transition-colors duration-300"
          >
            {/* Inline Alert Notification Area */}
            <AnimatePresence mode="wait">
              {alert && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className={`p-4 rounded-xl border-2 text-xs font-mono tracking-wide flex items-start gap-3 bg-slate-950 shadow-md ${
                      alert.type === "success"
                        ? "border-emerald-500/30 text-emerald-400"
                        : "border-red-500/30 text-red-400"
                    }`}
                  >
                    {alert.type === "success" ? (
                      <CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle size={18} className="text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-black tracking-wider block opacity-60">
                        {alert.type === "success" ? "SIGNAL // OK" : "SIGNAL // WARN"}
                      </span>
                      <p className="text-slate-200 font-sans text-sm font-normal leading-relaxed">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              {["name", "email", "subject"].map((field) => (
                <div key={field} className="relative w-full">
                  <input
                    type={field === "email" ? "email" : "text"}
                    name={field}
                    id={`contact-${field}`}
                    value={form[field]}
                    onChange={handleChange}
                    required={field !== "subject"}
                    autoComplete="off"
                    className="peer w-full bg-slate-950/60 border-2 border-slate-900 rounded-xl px-4 pt-6 pb-2.5 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:bg-slate-950 transition-all text-white font-normal placeholder-transparent"
                    placeholder={field}
                  />

                  <label
                    htmlFor={`contact-${field}`}
                    className="absolute left-4 top-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-blue-400 font-bold pointer-events-none"
                  >
                    {field === "email" ? "SENDER_EMAIL" : `SENDER_${field.toUpperCase()}`}
                  </label>
                </div>
              ))}

              <div className="relative w-full">
                <textarea
                  name="message"
                  id="contact-message"
                  rows="4"
                  value={form.message}
                  onChange={handleChange}
                  required
                  className="peer w-full bg-slate-950/60 border-2 border-slate-900 rounded-xl px-4 pt-6 pb-2.5 text-sm sm:text-base focus:outline-none focus:border-blue-500 focus:bg-slate-950 transition-all resize-none text-white font-normal placeholder-transparent"
                  placeholder="message"
                />

                <label
                  htmlFor="contact-message"
                  className="absolute left-4 top-2 text-[10px] font-mono uppercase tracking-widest text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-[10px] peer-focus:text-blue-400 font-bold pointer-events-none"
                >
                  TRANSMIT_PAYLOAD_BODY
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-900 border-2 border-slate-800 hover:border-slate-700 text-white font-black text-xs font-mono tracking-widest uppercase rounded-xl transition-all duration-300 hover:bg-slate-850 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed h-12 shadow-xl"
              >
                {loading ? (
                  <span className="flex items-center gap-2.5">
                    <svg
                      className="animate-spin h-4 w-4 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>EXECUTING_TRANSMISSION...</span>
                  </span>
                ) : (
                  <>
                    <span>INITIALIZE_DISPATCH</span>
                    <Send size={13} className="text-blue-500 stroke-[2.5]" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
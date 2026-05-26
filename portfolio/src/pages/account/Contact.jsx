import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Mail, Send, Terminal, AlertTriangle, CheckCircle2 } from "lucide-react";
import { supabase } from "../../supabase";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    return () => setAnimate(false);
  }, []);

  useEffect(() => {
    const handleServiceSelected = (e) => {
      setForm((prev) => ({
        ...prev,
        subject: `Inquiry: ${e.detail}`,
      }));

      const contactSection = document.getElementById("contact");

      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: "smooth",
        });
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
    <section
      id="contact"
      className="bg-[#030712] pt-4 sm:pt-6 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8 lg:px-16 text-slate-100 font-sans antialiased relative overflow-hidden"
    >
      {/* Structural Accent Top Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800/20 to-transparent relative z-20 mb-2 sm:mb-4" />

      {/* Ambient Underlying Backlighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-blue-500/5 blur-[100px] sm:blur-[140px] pointer-events-none z-0" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-10 sm:space-y-14 mt-6 sm:mt-10">
        {/* Header */}
        <div className="max-w-3xl space-y-3 sm:space-y-4 text-left mx-auto md:mx-0">
          <motion.div
            initial={{ opacity: 0, translateY: 10 }}
            animate={animate ? { opacity: 1, translateY: 0 } : {}}
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="inline-flex items-center gap-2 bg-slate-950/80 border border-slate-900 px-2.5 py-1.5 rounded-md backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 font-semibold">
              COMMUNICATION_CHANNELS
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, translateY: 15 }}
            animate={animate ? { opacity: 1, translateY: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            Get In Touch
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, translateY: 15 }}
            animate={animate ? { opacity: 1, translateY: 0 } : {}}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="text-slate-400 font-light leading-relaxed text-xs sm:text-sm md:text-base max-w-xl"
          >
            Have a project framework blueprint in mind or need dedicated technical
            assistance? Let's compile something great.
          </motion.p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 pt-2 items-start">
          {/* Left Metadata Panel */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="bg-slate-950/20 border border-slate-900/60 p-6 sm:p-8 lg:p-10 rounded-2xl backdrop-blur-sm flex flex-col justify-between space-y-8"
          >
            <div className="space-y-2">
              <h3 className="text-base sm:text-lg font-mono uppercase tracking-wider text-slate-300 font-bold flex items-center gap-2">
                <Terminal size={14} className="text-blue-500" />
                CONTACT_METADATA
              </h3>
              <p className="text-slate-400 text-xs font-light leading-relaxed">
                Direct infrastructure access routes. Verified communications
                protocols only.
              </p>
            </div>

            <div className="space-y-6 pt-2">
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
                  className="flex items-start gap-4 group border-b border-slate-900/40 pb-5 last:border-none last:pb-0"
                >
                  <div className="p-3 bg-slate-950 border border-slate-900 rounded-xl text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-colors duration-300">
                    <item.icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="text-slate-400 text-xs font-light mt-0.5 select-all">
                      {item.value}
                    </p>
                    <span className="text-[8px] font-mono tracking-widest text-slate-600 block mt-1 uppercase">
                      {item.spec}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Input Fields Panel */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.5,
              delay: 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="bg-slate-950/20 border border-slate-900/60 p-6 sm:p-8 lg:p-10 rounded-2xl backdrop-blur-sm"
          >
            {/* Inline Message System Above Form */}
            <AnimatePresence mode="wait">
              {alert && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 20 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div
                    className={`px-4 py-3 rounded-xl border text-xs font-mono tracking-wide flex items-start gap-3 bg-slate-950/60 ${
                      alert.type === "success"
                        ? "border-emerald-500/30 text-emerald-400"
                        : "border-red-500/30 text-red-400"
                    }`}
                  >
                    {alert.type === "success" ? (
                      <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    ) : (
                      <AlertTriangle size={16} className="text-red-500 shrink-0 mt-0.5" />
                    )}
                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase font-bold tracking-wider block opacity-50">
                        {alert.type === "success" ? "SIGNAL // OK" : "SIGNAL // WARN"}
                      </span>
                      <p className="text-slate-300 font-sans font-light leading-relaxed">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="peer w-full bg-slate-950/50 border border-slate-900/80 rounded-xl px-4 pt-6 pb-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500/50 focus:bg-slate-900/10 focus:ring-1 focus:ring-blue-500/20 transition-all text-white font-light placeholder-transparent"
                    placeholder={field}
                  />

                  <label
                    htmlFor={`contact-${field}`}
                    className="absolute left-4 top-2 text-[9px] font-mono uppercase tracking-widest text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-500 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-blue-400 pointer-events-none"
                  >
                    {field === "email"
                      ? "SENDER_EMAIL"
                      : `SENDER_${field.toUpperCase()}`}
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
                  className="peer w-full bg-slate-950/50 border border-slate-900/80 rounded-xl px-4 pt-6 pb-2 text-xs sm:text-sm focus:outline-none focus:border-blue-500/50 focus:bg-slate-900/10 focus:ring-1 focus:ring-blue-500/20 transition-all resize-none text-white font-light placeholder-transparent"
                  placeholder="message"
                />

                <label
                  htmlFor="contact-message"
                  className="absolute left-4 top-2 text-[9px] font-mono uppercase tracking-widest text-slate-500 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-xs peer-placeholder-shown:text-slate-500 peer-focus:top-2 peer-focus:text-[9px] peer-focus:text-blue-400 pointer-events-none"
                >
                  TRANSMIT_PAYLOAD_BODY
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-900 border border-slate-800 text-white font-medium text-[11px] font-mono tracking-widest uppercase rounded-xl transition-all duration-300 hover:bg-slate-850 hover:border-slate-700 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-40 disabled:cursor-not-allowed h-11 shadow-lg shadow-blue-950/10"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-3.5 w-3.5 text-blue-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    <span>EXECUTING_TRANSMISSION...</span>
                  </span>
                ) : (
                  <>
                    <span>INITIALIZE_DISPATCH</span>
                    <Send size={11} className="text-blue-500" />
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
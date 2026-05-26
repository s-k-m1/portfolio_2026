import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Upload,
  Download,
  ExternalLink,
  FileCode,
  Terminal,
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { supabase } from "../supabase";

export default function ClientShare() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [animate, setAnimate] = useState(false);

  const [alert, setAlert] = useState(null);

  // ================= ALERT SYSTEM =================
  const showAlert = (
    message,
    type = "success"
  ) => {
    setAlert({ message, type });

    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };

  // ================= ENTRY ANIMATION =================
  useEffect(() => {
    setAnimate(true);

    return () => setAnimate(false);
  }, []);

  // ================= CLEANUP URL =================
  useEffect(() => {
    return () => {
      files.forEach((f) =>
        URL.revokeObjectURL(f.url)
      );
    };
  }, [files]);

  // ================= FILE SELECT =================
  const handleFileChange = (e) => {
    if (!e.target.files) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "application/json",
    ];

    const maxSize = 10 * 1024 * 1024;

    const selectedFiles = [];

    Array.from(e.target.files).forEach(
      (file) => {
        if (
          !allowedTypes.includes(file.type)
        ) {
          showAlert(
            `${file.name} is not a supported format.`,
            "error"
          );
          return;
        }

        if (file.size > maxSize) {
          showAlert(
            `${file.name} exceeds 10MB limit.`,
            "error"
          );
          return;
        }

        selectedFiles.push({
          file,
          url: URL.createObjectURL(file),
          type: file.type,
          name: file.name,
        });
      }
    );

    setFiles(selectedFiles);
  };

  // ================= FILE UPLOAD =================
  const handleUpload = async () => {
    if (!files.length) return;

    setUploading(true);

    try {
      const uploadedData = [];

      for (const item of files) {
        const file = item.file;

        const uniqueFileName = `${Date.now()}-${Math.random()
          .toString(36)
          .substring(2)}-${file.name}`;

        // Upload File To Supabase Storage
        const { error: uploadError } =
          await supabase.storage
            .from("client-documents")
            .upload(uniqueFileName, file);

        if (uploadError) {
          console.error(uploadError);

          showAlert(
            `Upload failed for ${file.name}`,
            "error"
          );

          continue;
        }

        // Get Public URL
        const {
          data: { publicUrl },
        } = supabase.storage
          .from("client-documents")
          .getPublicUrl(uniqueFileName);

        // Save Metadata To Database
        const { error: dbError } =
          await supabase
            .from("clientShare")
            .insert([
              {
                file_name: file.name,
                file_url: publicUrl,
                file_type: file.type,
                file_size: file.size,
              },
            ]);

        if (dbError) {
          console.error(dbError);

          showAlert(
            `Database save failed for ${file.name}`,
            "error"
          );

          continue;
        }

        uploadedData.push({
          name: file.name,
          url: publicUrl,
          type: file.type,
        });
      }

      setUploadedFiles((prev) => [
        ...prev,
        ...uploadedData,
      ]);

      setFiles([]);

      showAlert(
        "Documents uploaded securely.",
        "success"
      );
    } catch (err) {
      console.error(err);

      showAlert(
        "Network error. Upload failed.",
        "error"
      );
    } finally {
      setUploading(false);
    }
  };

  // ================= OPEN FILE =================
  const handleOpen = (f) => {
    const url = f.url;

    if (!url) return;

    if (
      f.type === "application/pdf"
    ) {
      window.open(url, "_blank");
    } else {
      window.open(
        `https://docs.google.com/gview?url=${url}&embedded=true`,
        "_blank"
      );
    }
  };

  // ================= FILE CARD =================
  const renderFileCard = (
    f,
    index
  ) => (
    <motion.div
      key={f.url || f.name}
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
        delay: index * 0.04,
        ease: "easeOut",
      }}
      className="bg-slate-950/40 border border-slate-900/60 p-4 sm:p-5 rounded-xl flex flex-col sm:flex-row justify-between items-center gap-4 transition-all duration-300 hover:border-slate-800/80 hover:bg-slate-900/10 group relative"
    >
      <div className="flex items-center gap-4 w-full">
        <div className="p-3 bg-slate-950 border border-slate-900/80 rounded-lg text-slate-400 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-colors">
          {f.type ===
          "application/pdf" ? (
            <FileText size={20} />
          ) : (
            <FileCode size={20} />
          )}
        </div>

        <div className="overflow-hidden">
          <p className="text-slate-200 font-medium text-xs sm:text-sm truncate w-full max-w-[200px] md:max-w-xs group-hover:text-white transition-colors">
            {f.name}
          </p>

          <span className="text-[9px] font-mono uppercase tracking-widest text-slate-500 block mt-0.5">
            {f.type ===
            "application/pdf"
              ? "PDF_DOCUMENT"
              : "PROJECT_SPECIFICATION"}
          </span>
        </div>
      </div>

      <div className="flex gap-3 w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-900/40">
        <button
          onClick={() =>
            handleOpen(f)
          }
          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-slate-950 border border-slate-900 text-[10px] font-mono tracking-wider text-slate-400 hover:text-white hover:border-slate-800 px-4 py-2 rounded-lg transition-colors h-9 touch-manipulation"
        >
          <ExternalLink
            size={12}
            className="text-slate-500"
          />

          <span>OPEN</span>
        </button>

        <a
          href={f.url}
          download={f.name}
          className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] font-mono tracking-wider text-white px-4 py-2 rounded-lg transition-colors h-9 touch-manipulation"
        >
          <Download
            size={12}
            className="text-blue-500"
          />

          <span>DOWNLOAD</span>
        </a>
      </div>
    </motion.div>
  );

  return (
    <section
      id="clientshare"
      className="bg-[#030712] pt-4 sm:pt-6 pb-16 sm:pb-24 px-4 sm:px-6 md:px-8 lg:px-16 text-slate-100 font-sans antialiased relative overflow-hidden select-none min-h-screen"
    >
      {/* Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800/20 to-transparent relative z-20 mb-6 sm:mb-8" />

      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[280px] sm:w-[450px] h-[280px] sm:h-[450px] bg-blue-500/5 blur-[100px] sm:blur-[140px] pointer-events-none z-0" />

      <div className="max-w-5xl mx-auto relative z-10 space-y-10 sm:space-y-14">

        {/* HEADER */}
        <div className="max-w-3xl space-y-3 sm:space-y-4 text-left">
          <motion.div
            initial={{
              opacity: 0,
              translateY: 10,
            }}
            animate={
              animate
                ? {
                    opacity: 1,
                    translateY: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.5,
              ease: "easeOut",
            }}
            className="inline-flex items-center gap-2 bg-slate-950/80 border border-slate-900 px-2.5 py-1.5 rounded-md backdrop-blur-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />

            <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-slate-400 font-semibold">
              COLLABORATIVE_SANDBOX
            </span>
          </motion.div>

          <motion.h1
            initial={{
              opacity: 0,
              translateY: 15,
            }}
            animate={
              animate
                ? {
                    opacity: 1,
                    translateY: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: "easeOut",
            }}
            className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight"
          >
            Client Idea &{" "}
            <span className="text-blue-500">
              Document Portal
            </span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              translateY: 15,
            }}
            animate={
              animate
                ? {
                    opacity: 1,
                    translateY: 0,
                  }
                : {}
            }
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="text-slate-400 font-light leading-relaxed text-xs sm:text-sm md:text-base max-w-2xl"
          >
            Securely upload your
            documents, software
            blueprints, project
            specifications, and
            architecture workflows.
          </motion.p>
        </div>

        {/* MAIN CONTAINER */}
        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={
            animate
              ? {
                  opacity: 1,
                  y: 0,
                }
              : {}
          }
          transition={{
            duration: 0.6,
            delay: 0.3,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="bg-slate-950/20 border border-slate-900/60 p-6 sm:p-8 md:p-10 rounded-2xl backdrop-blur-sm relative space-y-8"
        >
          {/* Upload Box */}
          <div className="bg-slate-950/40 p-5 sm:p-7 rounded-xl border border-slate-900/80 relative overflow-hidden">
            <div className="flex items-center gap-2 mb-5">
              <Terminal
                className="text-blue-500"
                size={14}
              />

              <h3 className="text-xs sm:text-sm font-mono uppercase tracking-wider text-slate-300 font-bold">
                SECURE_DOCUMENT_STAGING_GATE
              </h3>
            </div>

            {/* Upload Area */}
            <div className="group relative border border-dashed border-slate-800 hover:border-slate-700/80 transition-all duration-300 rounded-xl p-8 text-center bg-slate-950/50">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.txt,.json"
                multiple
                onChange={
                  handleFileChange
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-30"
              />

              <div className="flex flex-col items-center justify-center space-y-3">
                <Upload
                  className="text-slate-600 group-hover:text-blue-500 transition-colors duration-500"
                  size={32}
                />

                <p className="text-xs sm:text-sm text-slate-400 font-light">
                  <span className="text-slate-200 font-medium group-hover:text-blue-400 transition-colors">
                    Click to upload
                  </span>{" "}
                  or drag files here
                </p>

                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  PDF, DOC, DOCX, TXT,
                  JSON — MAX 10MB
                </p>
              </div>
            </div>

            {/* Upload Button */}
            {files.length > 0 && (
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full mt-5 inline-flex items-center justify-center gap-2 px-5 py-3 bg-slate-100 hover:bg-white text-slate-950 font-bold text-[11px] font-mono tracking-widest uppercase rounded-xl transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation h-11"
              >
                <span>
                  {uploading
                    ? "TRANSMITTING_BLUEPRINTS..."
                    : `INITIALIZE_SHARE_${files.length}_OBJECTS`}
                </span>
              </button>
            )}

            {/* Preview Files */}
            {files.length > 0 && (
              <div className="mt-8 pt-6 border-t border-slate-900/60">
                <h4 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest mb-3">
                  STAGED_BUFFER_OBJECTS
                </h4>

                <div className="space-y-3">
                  {files.map(
                    (file, i) =>
                      renderFileCard(
                        file,
                        i
                      )
                  )}
                </div>
              </div>
            )}

            {/* Uploaded Files */}
            {uploadedFiles.length >
              0 && (
              <div className="mt-8 pt-6 border-t border-slate-900/60">
                <h4 className="text-[10px] font-mono font-bold text-blue-500 uppercase tracking-widest mb-3">
                  TRANSMITTED_CLIENT_DOCUMENTS
                </h4>

                <div className="space-y-3">
                  {uploadedFiles.map(
                    (file, i) =>
                      renderFileCard(
                        file,
                        i
                      )
                  )}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* ALERT TOAST */}
      {alert && (
        <div
          className={`fixed bottom-6 right-6 px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl transition-all duration-300 z-[100] max-w-sm text-xs font-mono tracking-wide ${
            alert.type ===
            "success"
              ? "bg-slate-950/90 border-emerald-500/30 text-emerald-400"
              : "bg-slate-950/90 border-red-500/30 text-red-400"
          }`}
        >
          <div className="flex items-center gap-2">
            {alert.type ===
            "success" ? (
              <CheckCircle2
                size={14}
              />
            ) : (
              <AlertTriangle
                size={14}
              />
            )}

            <p>{alert.message}</p>
          </div>
        </div>
      )}
    </section>
  );
}
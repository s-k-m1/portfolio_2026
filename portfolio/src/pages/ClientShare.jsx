import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Download,
  ExternalLink,
  FileCode,
} from "lucide-react";

import { supabase } from "../supabase";

const panelVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 16 },
  },
};

export default function ClientShare() {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = "success") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 4000);
  };

  // 🧠 cleanup blob URLs
  useEffect(() => {
    return () => {
      files.forEach((f) => {
        if (f.url?.startsWith("blob:")) URL.revokeObjectURL(f.url);
      });
    };
  }, [files]);

  const validateFiles = (fileList) => {
    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
      "application/json",
    ];

    return Array.from(fileList).filter((f) => {
      if (!allowed.includes(f.type)) {
        showAlert(`${f.name} unsupported format`, "error");
        return false;
      }
      if (f.size > 10 * 1024 * 1024) {
        showAlert(`${f.name} exceeds 10MB limit`, "error");
        return false;
      }
      return true;
    });
  };

  const handleFileChange = (e) => {
    const selected = validateFiles(e.target.files || []);
    const mapped = selected.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
      type: f.type,
      name: f.name,
    }));

    setFiles((prev) => [...prev, ...mapped]);
  };

  // 🟢 drag & drop support
  const handleDrop = (e) => {
    e.preventDefault();
    const selected = validateFiles(e.dataTransfer.files || []);
    const mapped = selected.map((f) => ({
      file: f,
      url: URL.createObjectURL(f),
      type: f.type,
      name: f.name,
    }));

    setFiles((prev) => [...prev, ...mapped]);
  };

  const handleUpload = async () => {
    if (!files.length) return;

    setUploading(true);

    try {
      const uploadedData = [];

      for (const item of files) {
        const uniqueName = `${Date.now()}-${item.name}`;

        const { error: uploadError } = await supabase.storage
          .from("client-documents")
          .upload(uniqueName, item.file);

        if (uploadError) {
          showAlert(`${item.name} upload failed`, "error");
          continue;
        }

        const { data } = supabase.storage
          .from("client-documents")
          .getPublicUrl(uniqueName);

        await supabase.from("clientShare").insert([
          {
            file_name: item.name,
            file_url: data.publicUrl,
            file_type: item.type,
          },
        ]);

        uploadedData.push({
          name: item.name,
          url: data.publicUrl,
          type: item.type,
        });
      }

      setUploadedFiles((prev) => [...prev, ...uploadedData]);
      setFiles([]);
      showAlert("Files uploaded successfully!", "success");
    } catch (err) {
      showAlert("Upload system error", "error");
    } finally {
      setUploading(false);
    }
  };

  const renderFileCard = (f) => (
    <motion.div
      key={f.url || f.name}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800 rounded-lg hover:border-slate-700"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-950 border border-slate-800 rounded text-blue-500">
          {f.type === "application/pdf" ? (
            <FileText size={16} />
          ) : (
            <FileCode size={16} />
          )}
        </div>

        <span className="text-sm text-slate-300 font-mono truncate max-w-[180px]">
          {f.name}
        </span>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => window.open(f.url, "_blank")}
          className="p-2 text-slate-500 hover:text-white"
        >
          <ExternalLink size={14} />
        </button>

        <a
          href={f.url}
          download={f.name}
          className="p-2 text-blue-400 hover:text-blue-300"
        >
          <Download size={14} />
        </a>
      </div>
    </motion.div>
  );

  return (
  <section className="bg-[#020617] pt-14 pb-16 px-4 text-slate-100 min-h-screen">
    <div className="max-w-4xl mx-auto space-y-6">

      <div>
        <h1 className="text-3xl font-bold uppercase">
          Client Document Portal
        </h1>
        <p className="text-slate-500 font-mono text-sm">
          SECURE_STAGING_GATE
        </p>
      </div>

      {/* UPLOAD BOX */}
      <motion.div
        variants={panelVariants}
        initial="hidden"
        animate="visible"
        className="bg-slate-950 border border-slate-800 p-6 rounded-2xl"
      >
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onClick={() => document.getElementById("file-input").click()}
          className="border border-dashed border-slate-800 rounded-xl p-10 text-center cursor-pointer hover:border-blue-500 transition"
        >
          <input
            id="file-input"
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />

          <Upload className="mx-auto text-slate-600 mb-4" size={32} />
          <p className="text-sm text-slate-400">
            Drag & drop or click to upload files
          </p>
        </div>

        {/* FILE LIST */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            {files.map(renderFileCard)}

            <button
              onClick={handleUpload}
              disabled={uploading}
              className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase rounded-lg"
            >
              {uploading ? "Transmitting..." : "Initialize Share"}
            </button>
          </div>
        )}
      </motion.div>

      {/* ALERT */}
      <AnimatePresence>
        {alert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`p-3 rounded border ${
              alert.type === "success"
                ? "border-green-500 text-green-400"
                : "border-red-500 text-red-400"
            }`}
          >
            {alert.message}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  </section>
);
}
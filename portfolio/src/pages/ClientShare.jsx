import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Upload,
  Download,
  ExternalLink,
  FileCode,
  Terminal,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

import { supabase } from "../supabase";

const panelVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 16 }
  }
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

  useEffect(() => {
    return () => files.forEach((f) => f.url?.startsWith("blob:") && URL.revokeObjectURL(f.url));
  }, [files]);

  const handleFileChange = (e) => {
    if (!e.target.files) return;
    const allowed = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/plain", "application/json"];
    const selected = Array.from(e.target.files).filter(f => {
        if (!allowed.includes(f.type)) { showAlert(`${f.name} format unsupported`, "error"); return false; }
        if (f.size > 10 * 1024 * 1024) { showAlert(`${f.name} too large`, "error"); return false; }
        return true;
    });
    setFiles(selected.map(f => ({ file: f, url: URL.createObjectURL(f), type: f.type, name: f.name })));
  };

  const handleUpload = async () => {
    setUploading(true);
    const uploadedData = [];
    for (const item of files) {
      const uniqueName = `${Date.now()}-${item.name}`;
      const { error: uploadError } = await supabase.storage.from("client-documents").upload(uniqueName, item.file);
      if (!uploadError) {
        const { data } = supabase.storage.from("client-documents").getPublicUrl(uniqueName);
        await supabase.from("clientShare").insert([{ file_name: item.name, file_url: data.publicUrl, file_type: item.type }]);
        uploadedData.push({ name: item.name, url: data.publicUrl, type: item.type });
      }
    }
    setUploadedFiles(prev => [...prev, ...uploadedData]);
    setFiles([]);
    setUploading(false);
    showAlert("Transmission successful.", "success");
  };

  const renderFileCard = (f, index) => (
    <motion.div
      key={f.url || f.name}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="flex items-center justify-between p-4 bg-slate-900/40 border border-slate-800 rounded-lg hover:border-slate-700 transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 bg-slate-950 border border-slate-800 rounded text-blue-500">
          {f.type === "application/pdf" ? <FileText size={16} /> : <FileCode size={16} />}
        </div>
        <span className="text-sm text-slate-300 font-mono truncate max-w-[150px]">{f.name}</span>
      </div>
      <div className="flex gap-2">
        <button onClick={() => window.open(f.url, "_blank")} className="p-2 text-slate-500 hover:text-white"><ExternalLink size={14} /></button>
        <a href={f.url} download={f.name} className="p-2 text-blue-400 hover:text-blue-300"><Download size={14} /></a>
      </div>
    </motion.div>
  );

  return (
    <section className="bg-[#020617] py-20 px-4 text-slate-100 min-h-screen">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold uppercase tracking-tight text-white">Client Document Portal</h1>
          <p className="text-slate-500 font-mono text-sm">SECURE_STAGING_GATE</p>
        </div>

        <motion.div variants={panelVariants} initial="hidden" animate="visible" className="bg-slate-950 border border-slate-800 p-6 rounded-2xl">
          <div className="border border-dashed border-slate-800 rounded-xl p-10 text-center hover:border-slate-700 transition-colors cursor-pointer group" onClick={() => document.getElementById('file-input').click()}>
            <input id="file-input" type="file" multiple className="hidden" onChange={handleFileChange} />
            <Upload className="mx-auto text-slate-600 group-hover:text-blue-500 mb-4" size={32} />
            <p className="text-sm text-slate-400">Click to upload or drag files here</p>
          </div>

          {files.length > 0 && (
            <div className="mt-6 space-y-2">
              {files.map((f, i) => renderFileCard(f, i))}
              <button onClick={handleUpload} disabled={uploading} className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase rounded-lg transition-all">
                {uploading ? "Transmitting..." : "Initialize Share"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
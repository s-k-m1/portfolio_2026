"use client";

import { useCallback, useEffect, useState } from "react";
import { Pencil, Trash2, Plus, Loader2, X } from "lucide-react";
import { adminFetch } from "@/lib/auth";
import type { ResourceDef, FieldDef } from "@/lib/adminResources";

type Row = Record<string, unknown> & { id: number };

function coerce(def: FieldDef, raw: unknown): unknown {
  if (def.type === "checkbox") return Boolean(raw);
  if (def.type === "number") {
    if (raw === "" || raw === null || raw === undefined) return null;
    return Number(raw);
  }
  if (def.type === "date") {
    if (raw === "" || raw === null || raw === undefined) return null;
    return raw;
  }
  if (raw === null || raw === undefined) return "";
  return String(raw);
}

export default function ResourceManager({
  resource,
}: {
  resource: ResourceDef;
}) {
  const [items, setItems] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Row | null | "new">(null);
  const [form, setForm] = useState<Record<string, unknown>>({});
  const [files, setFiles] = useState<Record<string, File>>({});
  const [saving, setSaving] = useState(false);

  const base = `/${resource.key}`;

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await adminFetch<{ results?: Row[]; count?: number }>(base + "/");
      const rows = Array.isArray(data) ? data : data.results ?? [];
      setItems(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [base]);

  useEffect(() => {
    // Defer to a microtask so the initial setState is not synchronous in the effect.
    const id = setTimeout(() => {
      void load();
    }, 0);
    return () => clearTimeout(id);
  }, [load]);

  function openCreate() {
    const init: Record<string, unknown> = {};
    resource.fields.forEach((f) => {
      init[f.name] = f.type === "checkbox" ? false : "";
    });
    setForm(init);
    setFiles({});
    setEditing("new");
  }

  async function openEdit(row: Row) {
    try {
      const data = await adminFetch<Row>(`${base}/${row.id}/`);
      const init: Record<string, unknown> = {};
      resource.fields.forEach((f) => {
        init[f.name] = coerce(f, (data as Record<string, unknown>)[f.name]);
      });
      setForm(init);
      setFiles({});
      setEditing(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load record");
    }
  }

  function setField(name: string, value: unknown) {
    setForm((f) => ({ ...f, [name]: value }));
  }

  function setFile(name: string, file: File | null) {
    setFiles((prev) => {
      const next = { ...prev };
      if (file) next[name] = file;
      else delete next[name];
      return next;
    });
  }

  function buildPayload(): FormData | string {
    const hasFile = resource.fields.some((f) => f.type === "file" && files[f.name]);
    if (!hasFile) {
      const json: Record<string, unknown> = {};
      resource.fields.forEach((f) => {
        if (f.type === "file") return;
        json[f.name] = form[f.name];
      });
      return JSON.stringify(json);
    }
    const fd = new FormData();
    resource.fields.forEach((f) => {
      if (f.type === "file") {
        if (files[f.name]) fd.append(f.name, files[f.name]);
        return;
      }
      const v = form[f.name];
      if (v === null || v === undefined) return;
      fd.append(f.name, f.type === "checkbox" ? (v ? "true" : "false") : String(v));
    });
    return fd;
  }

  async function save() {
    setSaving(true);
    setError(null);
    try {
      const payload = buildPayload();
      if (editing && editing !== "new") {
        await adminFetch(`${base}/${editing.id}/`, {
          method: "PATCH",
          body: payload,
        });
      } else {
        await adminFetch(base + "/", { method: "POST", body: payload });
      }
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(row: Row) {
    if (!confirm(`Delete "${String(row[resource.titleField] ?? row.id)}"?`)) return;
    setError(null);
    try {
      await adminFetch(`${base}/${row.id}/`, { method: "DELETE" });
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  function title(row: Row): string {
    const v = row[resource.titleField];
    if (v === null || v === undefined || v === "") return `#${row.id}`;
    return String(v);
  }

  return (
    <div className="min-w-0">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
            Manage
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-white">
            {resource.label}
          </h1>
        </div>
        {!resource.disableCreate && (
          <button
            onClick={openCreate}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:brightness-110"
          >
            <Plus className="h-4 w-4" /> New {resource.label.replace(/s$/, "")}
          </button>
        )}
      </div>

      {error && (
        <p className="mb-4 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
          {error}
        </p>
      )}

      {editing ? (
        <div className="glass rounded-2xl p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">
              {editing === "new" ? `New ${resource.label.replace(/s$/, "")}` : "Edit"}
            </h2>
            <button
              onClick={() => setEditing(null)}
              className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {resource.fields.map((f) => (
              <Field
                key={f.name}
                def={f}
                value={form[f.name]}
                currentUrl={
                  f.type === "file" && editing !== "new"
                    ? (editing as Row)[f.name]
                      ? String((editing as Row)[f.name])
                      : null
                    : null
                }
                onChange={(v) => setField(f.name, v)}
                onFile={(file) => setFile(f.name, file)}
              />
            ))}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={save}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 via-violet-500 to-fuchsia-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-all hover:brightness-110 disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save
            </button>
            <button
              onClick={() => setEditing(null)}
              className="rounded-xl border border-white/15 bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-200 hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : loading ? (
        <p className="text-sm text-slate-500">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-slate-500">No records yet.</p>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wider text-slate-400">
              <tr>
                <th className="px-4 py-3">{resource.titleField}</th>
                {resource.subtitleField && (
                  <th className="px-4 py-3">{resource.subtitleField}</th>
                )}
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((row) => (
                <tr key={row.id} className="border-t border-white/10">
                  <td className="px-4 py-3 font-medium text-white">{title(row)}</td>
                  {resource.subtitleField && (
                    <td className="px-4 py-3 text-slate-400">
                      {String(row[resource.subtitleField] ?? "")}
                    </td>
                  )}
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => openEdit(row)}
                        className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 hover:border-violet-400/40 hover:text-violet-300"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => remove(row)}
                        className="rounded-lg border border-white/10 bg-white/5 p-2 text-slate-300 hover:border-red-400/40 hover:text-red-300"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function Field({
  def,
  value,
  currentUrl,
  onChange,
  onFile,
}: {
  def: FieldDef;
  value: unknown;
  currentUrl: string | null;
  onChange: (v: unknown) => void;
  onFile: (file: File | null) => void;
}) {
  const wrap = def.full ? "md:col-span-2" : "";
  const inputCls =
    "w-full rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white outline-none transition-colors focus:border-violet-400/50";

  if (def.type === "file") {
    return (
      <div className={wrap}>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
          {def.label}
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          className="w-full text-sm text-slate-400 file:mr-3 file:rounded-lg file:border-0 file:bg-violet-500/20 file:px-4 file:py-2 file:text-violet-200"
        />
        {currentUrl && !currentUrl.startsWith("data:") && (
          <p className="mt-1 truncate text-xs text-slate-500">{currentUrl}</p>
        )}
        {def.help && <p className="mt-1 text-xs text-slate-500">{def.help}</p>}
      </div>
    );
  }

  if (def.type === "checkbox") {
    return (
      <div className={`flex items-center gap-3 ${wrap}`}>
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-4 w-4 accent-violet-500"
        />
        <label className="text-sm text-slate-300">{def.label}</label>
      </div>
    );
  }

  if (def.type === "textarea") {
    return (
      <div className={wrap}>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
          {def.label}
        </label>
        <textarea
          value={String(value ?? "")}
          placeholder={def.placeholder}
          rows={5}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        />
      </div>
    );
  }

  if (def.type === "select") {
    return (
      <div className={wrap}>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
          {def.label}
        </label>
        <select
          value={String(value ?? "")}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        >
          <option value="">— Select —</option>
          {def.options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className={wrap}>
      <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-slate-400">
        {def.label}
        {def.required && <span className="text-violet-400"> *</span>}
      </label>
      <input
        type={def.type === "number" ? "number" : def.type === "date" ? "date" : "text"}
        value={def.type === "number" ? (value === null || value === "" ? "" : String(value)) : String(value ?? "")}
        placeholder={def.placeholder}
        onChange={(e) =>
          onChange(def.type === "number" ? e.target.value : e.target.value)
        }
        className={inputCls}
      />
    </div>
  );
}

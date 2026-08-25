"use client";

import { useEffect, useCallback, useState } from "react";
import { Pencil, Trash2, Plus, Loader2, X, Search } from "lucide-react";
import { adminFetch } from "@/lib/auth";
import { mediaUrl } from "@/lib/media";
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
  const [query, setQuery] = useState("");

  const base = `/${resource.key}`;

  const load = useCallback(async () => {
    setError(null);
    try {
      const data = await adminFetch<{ results?: Row[]; count?: number }>(
        base + "/",
      );
      const rows = Array.isArray(data) ? data : data.results ?? [];
      setItems(rows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load");
    } finally {
      setLoading(false);
    }
  }, [base]);

  useEffect(() => {
    const id = setTimeout(() => void load(), 0);
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
    // keep the File in form state too so the preview thumbnail can show it
    setForm((prev) => ({ ...prev, [name]: file ?? "" }));
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
      fd.append(
        f.name,
        f.type === "checkbox" ? (v ? "true" : "false") : String(v),
      );
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

  const filtered = query
    ? items.filter((row) =>
        resource.fields.some((f) => {
          const v = row[f.name];
          return v != null && String(v).toLowerCase().includes(query.toLowerCase());
        }),
      )
    : items;

  return (
    <div className="min-w-0">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Manage
          </p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink-2">
            {resource.label}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          {items.length > 6 && (
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="admin-input pl-9"
              />
            </div>
          )}
          {!resource.disableCreate && (
            <button
              onClick={openCreate}
              className="admin-btn admin-btn-primary"
            >
              <Plus className="h-4 w-4" /> New {resource.label.replace(/s$/, "")}
            </button>
          )}
        </div>
      </div>

      {error && (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
          {error}
        </p>
      )}

      {editing ? (
        <div className="admin-card p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-ink-2">
              {editing === "new"
                ? `New ${resource.label.replace(/s$/, "")}`
                : "Edit"}
            </h2>
            <button
              onClick={() => setEditing(null)}
              className="rounded-lg p-2 text-muted hover:bg-canvas-soft hover:text-ink-2"
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
              className="admin-btn admin-btn-primary disabled:opacity-60"
            >
              {saving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save
            </button>
            <button
              onClick={() => setEditing(null)}
              className="admin-btn admin-btn-ghost"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-muted">No records yet.</p>
      ) : (
        <div className="admin-card overflow-hidden p-0">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-sm">
              <thead className="bg-canvas-soft text-xs uppercase tracking-wider text-muted">
                <tr>
                  <th className="px-4 py-3 font-semibold text-ink-2">
                    {resource.titleField}
                  </th>
                  {resource.subtitleField && (
                    <th className="px-4 py-3 font-semibold text-ink-2">
                      {resource.subtitleField}
                    </th>
                  )}
                  <th className="px-4 py-3 text-right font-semibold text-ink-2">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-t border-line">
                    <td className="px-4 py-3 font-medium text-ink-2">
                      {title(row)}
                    </td>
                    {resource.subtitleField && (
                      <td className="px-4 py-3 text-muted">
                        {String(row[resource.subtitleField] ?? "")}
                      </td>
                    )}
                    <td className="px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEdit(row)}
                          className="rounded-lg border border-line bg-white p-2 text-muted hover:border-accent/40 hover:text-accent-strong"
                          aria-label="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => remove(row)}
                          className="rounded-lg border border-line bg-white p-2 text-muted hover:border-rose-400/50 hover:text-rose-600"
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
  const inputCls = "admin-input";

  // Live preview for file (image) fields.
  const [preview, setPreview] = useState<string | null>(null);
  useEffect(() => {
    setPreview(null);
    if (value instanceof File) {
      const objUrl = URL.createObjectURL(value);
      setPreview(objUrl);
      return () => URL.revokeObjectURL(objUrl);
    }
    const resolved = mediaUrl(currentUrl);
    if (resolved) setPreview(resolved);
  }, [value, currentUrl]);

  if (def.type === "file") {
    return (
      <div className={wrap}>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">
          {def.label}
        </label>
        {preview && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={preview}
            alt={def.label}
            className="mb-2 h-24 w-24 rounded-lg border border-line object-cover"
          />
        )}
        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg,image/webp"
          onChange={(e) => onFile(e.target.files?.[0] ?? null)}
          className="w-full text-sm text-muted file:mr-3 file:rounded-lg file:border-0 file:bg-accent-soft file:px-4 file:py-2 file:text-accent-strong"
        />
        {currentUrl && !currentUrl.startsWith("data:") && (
          <p className="mt-1 truncate text-xs text-muted">{currentUrl}</p>
        )}
        {def.help && <p className="mt-1 text-xs text-muted">{def.help}</p>}
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
          className="h-4 w-4 accent-accent"
        />
        <label className="text-sm text-ink-2">{def.label}</label>
      </div>
    );
  }

  if (def.type === "textarea") {
    return (
      <div className={wrap}>
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">
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
        <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">
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
      <label className="mb-1 block text-xs font-medium uppercase tracking-wider text-muted">
        {def.label}
        {def.required && <span className="text-accent"> *</span>}
      </label>
      <input
        type={def.type === "number" ? "number" : def.type === "date" ? "date" : "text"}
        value={
          def.type === "number"
            ? value === null || value === ""
              ? ""
              : String(value)
            : String(value ?? "")
        }
        placeholder={def.placeholder}
        onChange={(e) => onChange(e.target.value)}
        className={inputCls}
      />
    </div>
  );
}

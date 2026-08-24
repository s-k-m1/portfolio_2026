"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ADMIN_RESOURCES } from "@/lib/adminResources";
import ResourceManager from "@/components/admin/ResourceManager";

export default function AdminResourcePage() {
  const params = useParams<{ resource: string }>();
  const def = ADMIN_RESOURCES.find((r) => r.key === params.resource);

  if (!def) {
    return (
      <div className="min-w-0">
        <p className="text-sm text-slate-400">Unknown resource.</p>
        <Link
          href="/dashboard"
          className="mt-4 inline-flex items-center gap-2 text-sm text-violet-300 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to dashboard
        </Link>
      </div>
    );
  }

  return <ResourceManager resource={def} />;
}

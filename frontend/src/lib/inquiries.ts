import { adminFetch } from "@/lib/auth";
import type { Inquiry, InquiryStatus } from "@/types";

export async function getInquiries(): Promise<Inquiry[]> {
  const data = await adminFetch<{ count: number; results: Inquiry[] }>(
    "/contact-messages/",
  );
  return data.results ?? [];
}

export async function replyToInquiry(
  id: number,
  message: string,
): Promise<Inquiry> {
  return adminFetch<Inquiry>(`/contact-messages/${id}/reply/`, {
    method: "POST",
    body: JSON.stringify({ message }),
  });
}

export async function updateInquiryStatus(
  id: number,
  status: InquiryStatus,
): Promise<Inquiry> {
  return adminFetch<Inquiry>(`/contact-messages/${id}/`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}

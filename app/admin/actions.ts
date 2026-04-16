"use server";

import { revalidatePath } from "next/cache";
import {
  createMemberWithMembership,
  renewMemberMembership,
  sendExpiredNotification,
  updateMemberProfile
} from "@/lib/dashboard";

type ActionResult = {
  ok: boolean;
  message: string;
};

export async function createMemberAction(
  _state: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const result = await createMemberWithMembership(formData);
  revalidatePath("/admin");
  return result;
}

export async function sendExpiredNotificationAction(
  _state: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const result = await sendExpiredNotification(formData);
  revalidatePath("/admin");
  return result;
}

export async function renewMemberAction(
  _state: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const result = await renewMemberMembership(formData);
  revalidatePath("/admin");
  return result;
}

export async function updateMemberProfileAction(
  _state: ActionResult,
  formData: FormData
): Promise<ActionResult> {
  const memberId = String(formData.get("memberId") ?? "");
  const result = await updateMemberProfile(formData);
  revalidatePath("/admin");
  if (memberId) {
    revalidatePath(`/admin/members/${memberId}`);
  }
  return result;
}

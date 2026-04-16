import { notFound, redirect } from "next/navigation";
import { MemberDetailView } from "@/components/member-detail";
import { getMemberDetail } from "@/lib/dashboard";
import { isSupabaseConfigured } from "@/lib/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function MemberDetailPage({
  params
}: {
  params: Promise<{ memberId: string }>;
}) {
  if (isSupabaseConfigured) {
    const supabase = await createSupabaseServerClient();
    const {
      data: { user }
    } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

    if (!user) {
      redirect("/login");
    }
  }

  const { memberId } = await params;
  const member = await getMemberDetail(memberId);

  if (!member) {
    notFound();
  }

  return <MemberDetailView member={member} />;
}

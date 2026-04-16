export type MemberStatus = "active" | "expiring" | "expired";

export type DashboardMember = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  document_id: string | null;
  registered_at: string;
  current_plan_started_at: string;
  current_plan_ends_at: string;
  plan_name: string | null;
  months_paid: number;
  status: MemberStatus;
  days_remaining: number;
  notification_sent_at: string | null;
};

export type DashboardData = {
  totalMembers: number;
  activeMembers: number;
  expiringSoon: number;
  expiredMembers: number;
  renewalsThisMonth: number;
  members: DashboardMember[];
};

export type MemberMembershipHistoryItem = {
  id: string;
  start_date: string;
  end_date: string;
  months_paid: number;
  notification_sent_at: string | null;
  created_at: string;
  plan_name: string | null;
};

export type MemberDetail = {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  document_id: string | null;
  notes: string | null;
  registered_at: string;
  status: MemberStatus;
  days_remaining: number;
  current_plan_started_at: string | null;
  current_plan_ends_at: string | null;
  current_plan_name: string | null;
  memberships: MemberMembershipHistoryItem[];
};

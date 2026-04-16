import { DashboardData, MemberDetail } from "@/lib/types";

export const demoDashboardData: DashboardData = {
  totalMembers: 18,
  activeMembers: 11,
  expiringSoon: 4,
  expiredMembers: 3,
  renewalsThisMonth: 9,
  members: [
    {
      id: "1",
      full_name: "Lucia Fernandez",
      email: "lucia@gymapp.demo",
      phone: "+54 11 5555 1111",
      document_id: "34123456",
      registered_at: "2026-03-01",
      current_plan_started_at: "2026-04-01",
      current_plan_ends_at: "2026-05-01",
      plan_name: "Plan mensual",
      months_paid: 1,
      status: "expiring",
      days_remaining: 15,
      notification_sent_at: null
    },
    {
      id: "2",
      full_name: "Matias Ruiz",
      email: "matias@gymapp.demo",
      phone: "+54 11 5555 2222",
      document_id: "29888777",
      registered_at: "2026-02-18",
      current_plan_started_at: "2026-04-10",
      current_plan_ends_at: "2026-06-10",
      plan_name: "Plan bimestral",
      months_paid: 2,
      status: "active",
      days_remaining: 55,
      notification_sent_at: null
    },
    {
      id: "3",
      full_name: "Camila Perez",
      email: "camila@gymapp.demo",
      phone: "+54 11 5555 3333",
      document_id: "37555666",
      registered_at: "2026-01-03",
      current_plan_started_at: "2026-03-03",
      current_plan_ends_at: "2026-04-03",
      plan_name: "Plan mensual",
      months_paid: 1,
      status: "expired",
      days_remaining: -13,
      notification_sent_at: "2026-04-15T18:00:00.000Z"
    },
    {
      id: "4",
      full_name: "Nicolas Herrera",
      email: "nicolas@gymapp.demo",
      phone: "+54 11 5555 4444",
      document_id: "32111999",
      registered_at: "2026-03-20",
      current_plan_started_at: "2026-04-15",
      current_plan_ends_at: "2026-07-15",
      plan_name: "Plan trimestral",
      months_paid: 3,
      status: "active",
      days_remaining: 90,
      notification_sent_at: null
    },
    {
      id: "5",
      full_name: "Sofia Benitez",
      email: "sofia@gymapp.demo",
      phone: "+54 11 5555 5555",
      document_id: "40222999",
      registered_at: "2026-03-22",
      current_plan_started_at: "2026-04-05",
      current_plan_ends_at: "2026-04-20",
      plan_name: "Plan mensual",
      months_paid: 1,
      status: "expiring",
      days_remaining: 4,
      notification_sent_at: null
    }
  ]
};

export const demoMemberDetails: Record<string, MemberDetail> = {
  "1": {
    id: "1",
    full_name: "Lucia Fernandez",
    email: "lucia@gymapp.demo",
    phone: "+54 11 5555 1111",
    document_id: "34123456",
    notes: "Asiste a funcional 3 veces por semana.",
    registered_at: "2026-03-01",
    status: "expiring",
    days_remaining: 15,
    current_plan_started_at: "2026-04-01",
    current_plan_ends_at: "2026-05-01",
    current_plan_name: "Plan mensual",
    memberships: [
      {
        id: "m-1",
        start_date: "2026-04-01",
        end_date: "2026-05-01",
        months_paid: 1,
        notification_sent_at: null,
        created_at: "2026-04-01T10:00:00.000Z",
        plan_name: "Plan mensual"
      }
    ]
  },
  "3": {
    id: "3",
    full_name: "Camila Perez",
    email: "camila@gymapp.demo",
    phone: "+54 11 5555 3333",
    document_id: "37555666",
    notes: "Quiere renovar la semana que viene.",
    registered_at: "2026-01-03",
    status: "expired",
    days_remaining: -13,
    current_plan_started_at: "2026-03-03",
    current_plan_ends_at: "2026-04-03",
    current_plan_name: "Plan mensual",
    memberships: [
      {
        id: "m-3a",
        start_date: "2026-02-03",
        end_date: "2026-03-03",
        months_paid: 1,
        notification_sent_at: null,
        created_at: "2026-02-03T09:00:00.000Z",
        plan_name: "Plan mensual"
      },
      {
        id: "m-3b",
        start_date: "2026-03-03",
        end_date: "2026-04-03",
        months_paid: 1,
        notification_sent_at: "2026-04-15T18:00:00.000Z",
        created_at: "2026-03-03T09:00:00.000Z",
        plan_name: "Plan mensual"
      }
    ]
  }
};

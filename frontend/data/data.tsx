import { FileText, ShieldAlert, UserCog } from "lucide-react";

export type CompanyStatus = "Active" | "Trial" | "Suspended" | "Churned";
export type PlanName = "Enterprise" | "Pro" | "Professional" | "Starter";

export interface Company {
  id: string;
  name: string;
  ind: string;
  plan: PlanName;
  users: number;
  emissions: string;
  status: CompanyStatus;
  joined: string;
  initial: string;
  color: string;
}

export const companies: Company[] = [
  {
    id: "CMP-1000",
    name: "Nexgen Steels Ltd.",
    ind: "Manufacturing",
    plan: "Enterprise",
    users: 42,
    emissions: "48,210",
    status: "Active",
    joined: "Mar 2023",
    initial: "N",
    color: "bg-teal-50 text-teal-600",
  },
  {
    id: "CMP-1001",
    name: "GreenFleet Co.",
    ind: "Logistics",
    plan: "Pro",
    users: 18,
    emissions: "12,340",
    status: "Active",
    joined: "Jun 2023",
    initial: "G",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "CMP-1002",
    name: "SolarEdge Pvt. Ltd.",
    ind: "Energy",
    plan: "Pro",
    users: 11,
    emissions: "3,890",
    status: "Active",
    joined: "Aug 2023",
    initial: "S",
    color: "bg-orange-50 text-orange-600",
  },
  {
    id: "CMP-1003",
    name: "RetailCore Inc.",
    ind: "Retail",
    plan: "Starter",
    users: 6,
    emissions: "2,100",
    status: "Trial",
    joined: "Jan 2026",
    initial: "R",
    color: "bg-purple-50 text-purple-600",
  },
  {
    id: "CMP-1004",
    name: "AquaTech Solutions",
    ind: "Water Mgmt",
    plan: "Enterprise",
    users: 29,
    emissions: "21,670",
    status: "Active",
    joined: "Nov 2022",
    initial: "A",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "CMP-1005",
    name: "UrbanMobility Pvt.",
    ind: "Transport",
    plan: "Pro",
    users: 15,
    emissions: "9,450",
    status: "Active",
    joined: "Sep 2023",
    initial: "U",
    color: "bg-rose-50 text-rose-600",
  },
  {
    id: "CMP-1006",
    name: "ConstructAsia Ltd.",
    ind: "Construction",
    plan: "Enterprise",
    users: 55,
    emissions: "87,340",
    status: "Active",
    joined: "Jan 2023",
    initial: "C",
    color: "bg-slate-50 text-slate-600",
  },
  {
    id: "CMP-1007",
    name: "FarmLink Agri.",
    ind: "Agriculture",
    plan: "Starter",
    users: 4,
    emissions: "5,670",
    status: "Suspended",
    joined: "Apr 2023",
    initial: "F",
    color: "bg-amber-50 text-amber-600",
  },
];

// ─────────────────────────────────────────────
//  SHARED: إجماليات المنصة (Dashboard + EmissionsAnalytics)
// ─────────────────────────────────────────────

export interface PlatformTotals {
  totalCompanies: string;
  activeCompanies: number;
  totalUsers: string;
  platformMRR: string;
  totalEmissions: string;
  emissionsTrend: string;
  year: string;
}

export const platformTotals: PlatformTotals = {
  totalCompanies: "148",
  activeCompanies: 128,
  totalUsers: "2,341",
  platformMRR: "$84,200",
  totalEmissions: "1.84M",
  emissionsTrend: "-6.7%",
  year: "2026",
};

// ─────────────────────────────────────────────
//  DASHBOARD: كاردات الإحصائيات العلوية
// ─────────────────────────────────────────────

export interface DashboardStat {
  label: string;
  val: string;
  sub: string;
  trend: string;
  color: string;
  bg: string;
  path: string;
}

export const dashboardStats: DashboardStat[] = [
  {
    label: "Total Companies",
    val: "148",
    sub: "Active on platform",
    trend: "+12 this month",
    color: "text-teal-600",
    bg: "bg-teal-50",
    path: "/companies",
  },
  {
    label: "Total Active Users",
    val: "2,341",
    sub: "Across all companies",
    trend: "+8.4% vs last month",
    color: "text-blue-600",
    bg: "bg-blue-50",
    path: "/users",
  },
  {
    label: "Platform MRR",
    val: "$84,200",
    sub: "Monthly recurring revenue",
    trend: "+14.2% vs last month",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    path: "/dashboard",
  },
  {
    label: "Total Emissions Tracked",
    val: "1.84M",
    sub: "tCO2e across platform",
    trend: "-6.7% reduction vs 2023",
    color: "text-teal-600",
    bg: "bg-orange-50",
    path: "/analytics",
  },
];

// ─────────────────────────────────────────────
//  DASHBOARD: Platform Health
// ─────────────────────────────────────────────

export interface PlatformHealthItem {
  label: string;
  val: string;
  color: string;
  w: string;
}

export const platformHealth: PlatformHealthItem[] = [
  { label: "API Uptime", val: "99.98%", color: "bg-teal-500", w: "99.98%" },
  { label: "Data Processing", val: "94%", color: "bg-blue-600", w: "94%" },
  { label: "Storage Used", val: "67%", color: "bg-orange-500", w: "67%" },
  { label: "Onboarding Rate", val: "82%", color: "bg-emerald-500", w: "82%" },
];

// ─────────────────────────────────────────────
//  DASHBOARD: Recent Activity
// ─────────────────────────────────────────────

export interface ActivityItem {
  t: string;
  s: string;
  time: string;
  color: string;
  bg: string;
}

export const recentActivity: ActivityItem[] = [
  {
    t: "New company onboarded",
    s: "Nexgen Steels joined Enterprise plan",
    time: "12 min ago",
    color: "text-teal-500",
    bg: "bg-teal-50",
  },
  {
    t: "User role changed",
    s: "Priya S. promoted to Admin at GreenFleet",
    time: "1h ago",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    t: "Trial expiring",
    s: "RetailCore Inc. trial ends in 2 days",
    time: "3h ago",
    color: "text-orange-500",
    bg: "bg-orange-50",
  },
];

// ─────────────────────────────────────────────
//  DASHBOARD: Companies by Plan + Subscription Status
// ─────────────────────────────────────────────

export interface PlanBreakdown {
  label: string;
  val: string;
  color: string;
}

export const companiesByPlan: PlanBreakdown[] = [
  { label: "Enterprise", val: "50%", color: "bg-[#2D9A8F]" },
  { label: "Pro", val: "35%", color: "bg-[#4FD1C5]" },
  { label: "Starter", val: "15%", color: "bg-[#B2E2D5]" },
];

export interface SubscriptionStatusItem {
  label: string;
  count: number;
  color: string;
  w: string;
}

export const subscriptionStatus: SubscriptionStatusItem[] = [
  { label: "Active", count: 128, color: "bg-emerald-500", w: "70%" },
  { label: "Trial", count: 14, color: "bg-amber-400", w: "15%" },
  { label: "Suspended", count: 4, color: "bg-rose-400", w: "5%" },
  { label: "Churned", count: 2, color: "bg-slate-200", w: "3%" },
];

// ─────────────────────────────────────────────
//  EMISSIONS: كاردات + Trend + Sectors + Leaders + Completeness
// ─────────────────────────────────────────────

export interface EmissionStat {
  title: string;
  sub: string;
  value: string;
  trend: string;
  vs?: string;
  color: string;
  text: string;
}

export const emissionsStats: EmissionStat[] = [
  {
    title: "Total Platform Emissions",
    sub: "tCO2e 2026",
    value: "1.84M",
    trend: "-6.7%",
    vs: "vs 2023",
    color: "bg-teal-50",
    text: "text-teal-600",
  },
  {
    title: "Scope 1",
    sub: "Direct emissions",
    value: "614K",
    trend: "-4.2%",
    color: "bg-slate-50",
    text: "text-slate-600",
  },
  {
    title: "Scope 2",
    sub: "Purchased energy",
    value: "368K",
    trend: "-9.1%",
    color: "bg-blue-50",
    text: "text-blue-600",
  },
  {
    title: "Scope 3",
    sub: "Value chain",
    value: "858K",
    trend: "-6.2%",
    color: "bg-orange-50",
    text: "text-orange-600",
  },
];

export interface TopEmitter {
  name: string;
  val: string;
  p: number;
}

export const topEmitters: TopEmitter[] = [
  { name: "ConstructAsia Ltd.", val: "87,340 tCO2e", p: 92 },
  { name: "Nexgen Steels Ltd.", val: "48,210 tCO2e", p: 68 },
  { name: "AquaTech Solutions", val: "21,670 tCO2e", p: 45 },
  { name: "UrbanMobility Pvt.", val: "9,450 tCO2e", p: 25 },
  { name: "GreenFleet Co.", val: "12,340 tCO2e", p: 35 },
];

export interface EmissionTrendYear {
  year: number;
  scope1HeightPct: number;
  scope2HeightPct: number;
  scope3HeightPct: number;
}

export const emissionsTrend: EmissionTrendYear[] = [
  { year: 2021, scope1HeightPct: 45, scope2HeightPct: 35, scope3HeightPct: 65 },
  { year: 2022, scope1HeightPct: 53, scope2HeightPct: 40, scope3HeightPct: 55 },
  { year: 2023, scope1HeightPct: 61, scope2HeightPct: 45, scope3HeightPct: 45 },
  { year: 2026, scope1HeightPct: 69, scope2HeightPct: 50, scope3HeightPct: 35 },
];

export interface SectorBreakdown {
  l: string;
  v: string;
  c: string;
}

export const emissionsBySector: SectorBreakdown[] = [
  { l: "Construction", v: "35%", c: "bg-[#008080]" },
  { l: "Manufacturing", v: "24%", c: "bg-teal-400" },
  { l: "Transport", v: "20%", c: "bg-teal-200" },
  { l: "Others", v: "21%", c: "bg-teal-50" },
];

export interface ReductionLeader {
  n: string;
  d: string;
  pos: boolean;
}

export const reductionLeaders: ReductionLeader[] = [
  { n: "SolarEdge Pvt.", d: "-18.4%", pos: true },
  { n: "GreenFleet Co.", d: "-12.1%", pos: true },
  { n: "AquaTech Ltd.", d: "-9.8%", pos: true },
  { n: "Nexgen Steels", d: "-6.2%", pos: true },
  { n: "RetailCore Inc.", d: "+3.1%", pos: false },
];

export interface DataCompletenessItem {
  l: string;
  v: string;
  c: string;
}

export const dataCompleteness: DataCompletenessItem[] = [
  { l: "Scope 1", v: "96%", c: "bg-emerald-500" },
  { l: "Scope 2", v: "88%", c: "bg-emerald-500" },
  { l: "Scope 3", v: "64%", c: "bg-rose-500" },
  { l: "ESG Metrics", v: "72%", c: "bg-orange-500" },
];

export const scope3IncompleteCount: number = 36;

// ─────────────────────────────────────────────
//  USER MANAGEMENT
// ─────────────────────────────────────────────

export type UserRole = "Super Admin" | "Admin" | "Analyst" | "Viewer";
export type UserStatus = "Active" | "Trial" | "Suspended";

export interface UserStat {
  label: string;
  value: string;
  sub: string | null;
  trend: string | null;
  trendUp: boolean | null;
}

export const userStats: UserStat[] = [
  {
    label: "Total Users",
    value: "2,341",
    sub: null,
    trend: "+94 this month",
    trendUp: true,
  },
  {
    label: "Super Admins",
    value: "3",
    sub: "Platform administrators",
    trend: null,
    trendUp: null,
  },
  {
    label: "Company Admins",
    value: "148",
    sub: "One per company min.",
    trend: null,
    trendUp: null,
  },
  {
    label: "Suspended Users",
    value: "12",
    sub: null,
    trend: "+3 this week",
    trendUp: false,
  },
];

export interface AppUser {
  id: string;
  name: string;
  email: string;
  initials: string;
  avatarColor: string;
  company: string;
  role: UserRole;
  lastActive: string;
  status: UserStatus;
  twoFA: boolean;
}

export const users: AppUser[] = [
  {
    id: "USR-001",
    name: "Arjun Sharma",
    email: "arjun@nexgen.com",
    initials: "AS",
    avatarColor: "bg-teal-500",
    company: "Nexgen Steels",
    role: "Admin",
    lastActive: "2h ago",
    status: "Active",
    twoFA: true,
  },
  {
    id: "USR-002",
    name: "Priya Sinha",
    email: "priya@greenfleet.com",
    initials: "PS",
    avatarColor: "bg-blue-500",
    company: "GreenFleet Co.",
    role: "Analyst",
    lastActive: "Yesterday",
    status: "Active",
    twoFA: true,
  },
  {
    id: "USR-003",
    name: "Rahul Gupta",
    email: "rahul@solaregde.com",
    initials: "RG",
    avatarColor: "bg-orange-500",
    company: "SolarEdge Pvt.",
    role: "Viewer",
    lastActive: "3 days ago",
    status: "Active",
    twoFA: false,
  },
  {
    id: "USR-004",
    name: "Aanya Verma",
    email: "aanya@retailcore.com",
    initials: "AV",
    avatarColor: "bg-purple-500",
    company: "RetailCore Inc.",
    role: "Admin",
    lastActive: "1 week ago",
    status: "Trial",
    twoFA: false,
  },
  {
    id: "USR-005",
    name: "Suresh Nair",
    email: "suresh@aquatech.com",
    initials: "SN",
    avatarColor: "bg-emerald-500",
    company: "AquaTech Ltd.",
    role: "Analyst",
    lastActive: "Today",
    status: "Active",
    twoFA: true,
  },
  {
    id: "USR-006",
    name: "Meera Patel",
    email: "meera@urimpact.com",
    initials: "MP",
    avatarColor: "bg-slate-700",
    company: "Platform",
    role: "Super Admin",
    lastActive: "Just now",
    status: "Active",
    twoFA: true,
  },
  {
    id: "USR-007",
    name: "Dev Khanna",
    email: "dev@urbanmob.com",
    initials: "DK",
    avatarColor: "bg-rose-500",
    company: "UrbanMobility",
    role: "Admin",
    lastActive: "4h ago",
    status: "Active",
    twoFA: true,
  },
  {
    id: "USR-008",
    name: "Kavita Joshi",
    email: "kavita@farmlink.com",
    initials: "KJ",
    avatarColor: "bg-amber-500",
    company: "FarmLink Agri.",
    role: "Viewer",
    lastActive: "2 weeks ago",
    status: "Suspended",
    twoFA: false,
  },
];

// ─────────────────────────────────────────────
//  SUBSCRIPTION MANAGEMENT
// ─────────────────────────────────────────────

export type SubscriptionStatus =
  | "Active"
  | "Expiring"
  | "Renewal Due"
  | "Suspended";

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: string;
  period: string | null;
  description: string;
  features: string[];
  activeSubscribers: number;
  highlight: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "plan-starter",
    name: "Starter",
    price: "SAR 3.500",
    period: "month",
    description: "Scope 1 & 2 Monitoring",
    features: [
      "Direct emissions (Scope 1)",
      "Energy tracking (scope 2)",
      "Facility dashboards",
      "Monthly & quarterly analytics",
      "Data export & basic reports",
      "Up to 5 users",
    ],
    activeSubscribers: 22,
    highlight: false,
  },
  {
    id: "plan-professional",
    name: "Professional",
    price: "SAR 4.200",
    period: "month",
    description: "For growing companies with active ESG programs",
    features: [
      "Full GHG (Scope 1,2,3)",
      "Up to 25 users",
      "Full ESG + Gap Analysis",
      "Decarbonisation module",
      "Priority support",
    ],
    activeSubscribers: 52,
    highlight: true,
  },
  {
    id: "plan-enterprise",
    name: "Enterprise",
    price: "SAR 5000",
    period: "month",
    description: "For large enterprises with complex reporting needs",
    features: [
      "All modules + API access",
      "Unlimited users",
      "Supply chain tracking",
      "Dedicated CSM",
      "SLA + custom integrations",
    ],
    activeSubscribers: 74,
    highlight: false,
  },
];

export interface SubscriptionRecord {
  id: string;
  company: string;
  plan: PlanName;
  startDate: string;
  renewalDate: string;
  amount: string;
  status: SubscriptionStatus;
}

export const subscriptionRecords: SubscriptionRecord[] = [
  {
    id: "SUB-001",
    company: "Nexgen Steels",
    plan: "Enterprise",
    startDate: "01 Apr 2026",
    renewalDate: "31 Mar 2025",
    amount: "$4,200/mo",
    status: "Active",
  },
  {
    id: "SUB-002",
    company: "RetailCore Inc.",
    plan: "Starter",
    startDate: "15 Jan 2026",
    renewalDate: "14 Feb 2026",
    amount: "$99/mo",
    status: "Expiring",
  },
  {
    id: "SUB-003",
    company: "GreenFleet Co.",
    plan: "Professional",
    startDate: "01 Jun 2023",
    renewalDate: "31 May 2026",
    amount: "$299/mo",
    status: "Renewal Due",
  },
  {
    id: "SUB-004",
    company: "AquaTech Ltd.",
    plan: "Enterprise",
    startDate: "01 Nov 2022",
    renewalDate: "31 Oct 2026",
    amount: "$3,800/mo",
    status: "Active",
  },
  {
    id: "SUB-005",
    company: "FarmLink Agri.",
    plan: "Starter",
    startDate: "01 Apr 2023",
    renewalDate: "31 Mar 2026",
    amount: "$99/mo",
    status: "Suspended",
  },
];

export interface PartnerStat {
  label: string;
  val: string;
  sub: string;
  trend?: string;
  iconBg: string;
}

export const partnerStats: PartnerStat[] = [
  {
    label: "Total Partners",
    val: "24",
    sub: "Active in 12 countries",
    iconBg: "bg-teal-50",
  },
  {
    label: "Companies via Partners",
    val: "89",
    sub: "60% of total base",
    trend: "^ 60%",
    iconBg: "bg-blue-50",
  },
  {
    label: "Partner Revenue",
    val: "$51K",
    sub: "+22% MoM",
    trend: "^ +22%",
    iconBg: "bg-emerald-50",
  },
  {
    label: "Avg. Commission",
    val: "18%",
    sub: "Per closed deal",
    iconBg: "bg-orange-50",
  },
];

export interface Partner {
  id: string;
  name: string;
  type: string;
  location: string;
  tier: "Gold" | "Silver" | "Bronze";
  companiesCount: number;
  revenue: string;
  initial: string;
}

export const partners: Partner[] = [
  {
    id: "P-1",
    name: "EcoConsult Group",
    type: "Consulting Partner",
    location: "India",
    tier: "Gold",
    companiesCount: 28,
    revenue: "$18,200",
    initial: "E",
  },
  {
    id: "P-2",
    name: "GreenTech Ventures",
    type: "Technology Partner",
    location: "Singapore",
    tier: "Silver",
    companiesCount: 15,
    revenue: "$9,800",
    initial: "G",
  },
  {
    id: "P-3",
    name: "SustainabilityHub",
    type: "Reseller",
    location: "USA",
    tier: "Gold",
    companiesCount: 22,
    revenue: "$14,400",
    initial: "S",
  },
  {
    id: "P-4",
    name: "ClimateEdge Asia",
    type: "Consulting Partner",
    location: "UAE",
    tier: "Bronze",
    companiesCount: 11,
    revenue: "$7,100",
    initial: "C",
  },
  {
    id: "P-5",
    name: "NetZeroPartners",
    type: "Reseller",
    location: "UK",
    tier: "Silver",
    companiesCount: 8,
    revenue: "$5,600",
    initial: "N",
  },
  {
    id: "P-6",
    name: "ESGLink Pvt.",
    type: "Technology Partner",
    location: "India",
    tier: "Bronze",
    companiesCount: 5,
    revenue: "$2,900",
    initial: "E",
  },
];

// ─────────────────────────────────────────────
// AUDIT LOGS DATA (بناءً على image_dbcbdb.png)
// ─────────────────────────────────────────────

export interface AuditStat {
  label: string;
  count: string;
  iconColor: string;
  bgColor: string;
}

export const auditStats = [
  {
    label: "Total Events",
    count: "12,483",
    icon: FileText,
    iconColor: "text-teal-600",
    bgColor: "bg-teal-50",
  },
  {
    label: "Security Alerts",
    count: "7",
    icon: ShieldAlert,
    iconColor: "text-rose-600",
    bgColor: "bg-rose-50",
  },
  {
    label: "Admin Actions",
    count: "234",
    icon: UserCog,
    iconColor: "text-orange-600",
    bgColor: "bg-orange-50",
  },
];

export interface AuditEvent {
  id: number;
  timestamp: string;
  user: string;
  action: string;
  resource: string;
  company: string;
  ipAddress: string;
  severity: "Info" | "Warning" | "Critical";
}

export const auditEvents: AuditEvent[] = [
  {
    id: 1,
    timestamp: "2026-05-12 14:32:11",
    user: "Meera Patel",
    action: "User Role Updated",
    resource: "User: Priya Sinha",
    company: "GreenFleet Co.",
    ipAddress: "192.168.1.45",
    severity: "Info",
  },
  {
    id: 2,
    timestamp: "2026-05-12 13:18:04",
    user: "System",
    action: "Subscription Expired",
    resource: "Plan: Starter",
    company: "FarmLink Agri.",
    ipAddress: "—",
    severity: "Warning",
  },
  {
    id: 3,
    timestamp: "2026-05-12 12:05:33",
    user: "Arjun Sharma",
    action: "Company Data Exported",
    resource: "Emissions Report 2023",
    company: "Nexgen Steels",
    ipAddress: "103.21.44.10",
    severity: "Info",
  },
  {
    id: 4,
    timestamp: "2026-05-12 11:44:22",
    user: "Unknown",
    action: "Failed Login (3x)",
    resource: "Admin Portal",
    company: "AquaTech Ltd.",
    ipAddress: "45.33.32.156",
    severity: "Critical",
  },
  {
    id: 5,
    timestamp: "2026-05-12 10:30:00",
    user: "Meera Patel",
    action: "New Company Added",
    resource: "Company: RetailCore",
    company: "Platform",
    ipAddress: "192.168.1.45",
    severity: "Info",
  },
  {
    id: 6,
    timestamp: "2026-05-11 17:22:10",
    user: "Dev Khanna",
    action: "2FA Disabled",
    resource: "Account Settings",
    company: "UrbanMobility",
    ipAddress: "103.44.21.88",
    severity: "Warning",
  },
  {
    id: 7,
    timestamp: "2026-05-11 16:05:55",
    user: "Suresh Nair",
    action: "Emissions Data Submitted",
    resource: "Scope 3 - Cat. 1",
    company: "AquaTech Ltd.",
    ipAddress: "203.10.45.22",
    severity: "Info",
  },
  {
    id: 8,
    timestamp: "2026-05-11 15:11:43",
    user: "System",
    action: "Automated Backup",
    resource: "Platform Database",
    company: "Platform",
    ipAddress: "Internal",
    severity: "Info",
  },
];

export type NotificationCategory =
  | "Alerts"
  | "System"
  | "Companies"
  | "Subscriptions"
  | "Users";

export type NotificationIcon =
  | "shield"
  | "trial"
  | "company"
  | "renewal"
  | "warning"
  | "partner"
  | "maintenance";

export interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  category: NotificationCategory;
  icon: NotificationIcon;
  iconBg: string;
  iconColor: string;
  unread: boolean;
}

export const notifications: Notification[] = [
  {
    id: "N-001",
    title: "Security Alert – Multiple Failed Logins",
    description:
      "3 failed login attempts detected for admin@aquatech.com from IP 45.33.32.156",
    time: "12 min ago",
    category: "Alerts",
    icon: "shield",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
    unread: true,
  },
  {
    id: "N-002",
    title: "Trial Expiring – RetailCore Inc.",
    description:
      "RetailCore Inc. trial period expires in 2 days. Revenue at risk: $99/mo",
    time: "1 hour ago",
    category: "Subscriptions",
    icon: "trial",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    unread: true,
  },
  {
    id: "N-003",
    title: "New Company Onboarded",
    description:
      "Nexgen Steels Ltd. successfully onboarded to the Enterprise plan",
    time: "3 hours ago",
    category: "Companies",
    icon: "company",
    iconBg: "bg-teal-50",
    iconColor: "text-teal-600",
    unread: true,
  },
  {
    id: "N-004",
    title: "Subscription Renewal – AquaTech Ltd.",
    description:
      "AquaTech Ltd. Enterprise subscription has been auto-renewed for $3,800/mo",
    time: "Yesterday 4:22 PM",
    category: "Subscriptions",
    icon: "renewal",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-500",
    unread: true,
  },
  {
    id: "N-005",
    title: "Data Integrity Warning",
    description:
      "FarmLink Agri. has not submitted Scope 1 data for the past 3 months",
    time: "Yesterday 2:10 PM",
    category: "Alerts",
    icon: "warning",
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    unread: true,
  },
  {
    id: "N-006",
    title: "New Partner Added",
    description:
      "EcoConsult Group has been onboarded as a Gold consulting partner",
    time: "2 days ago",
    category: "Companies",
    icon: "partner",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    unread: true,
  },
  {
    id: "N-007",
    title: "System Maintenance Complete",
    description:
      "Scheduled maintenance window completed. All services operational.",
    time: "3 days ago",
    category: "System",
    icon: "maintenance",
    iconBg: "bg-slate-100",
    iconColor: "text-slate-400",
    unread: false,
  },
];

export interface NotificationChannel {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export const notificationChannels: NotificationChannel[] = [
  {
    id: "in-app",
    label: "In-App Alerts",
    description: "Real-time browser alerts",
    enabled: true,
  },
  {
    id: "email",
    label: "Email Digest",
    description: "Daily summary email",
    enabled: true,
  },
  {
    id: "sms",
    label: "SMS Alerts",
    description: "Critical alerts only",
    enabled: false,
  },
  {
    id: "slack",
    label: "Slack Integration",
    description: "Team channel alerts",
    enabled: true,
  },
];

export interface AlertSummaryItem {
  label: string;
  count: number;
  color: string;
}

export const alertSummary: AlertSummaryItem[] = [
  { label: "Security", count: 1, color: "bg-rose-500" },
  { label: "Billing", count: 2, color: "bg-amber-400" },
  { label: "System", count: 1, color: "bg-blue-500" },
  { label: "Companies", count: 2, color: "bg-teal-500" },
  { label: "Users", count: 1, color: "bg-purple-500" },
];

// ─────────────────────────────────────────────
//  PLATFORM SETTINGS
// ─────────────────────────────────────────────

export interface GeneralSettings {
  platformName: string;
  defaultTimezone: string;
  defaultCurrency: string;
  reportingFramework: string;
}

export const generalSettings: GeneralSettings = {
  platformName: "URImpact ESG Platform",
  defaultTimezone: "Asia/Kolkata (IST)",
  defaultCurrency: "USD ($)",
  reportingFramework: "GHG Protocol",
};

export interface SecuritySetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export const securitySettings: SecuritySetting[] = [
  {
    id: "2fa",
    label: "Require 2FA for All Admins",
    description:
      "Force two-factor authentication for all administrator accounts",
    enabled: true,
  },
  {
    id: "sso",
    label: "Single Sign-On (SSO)",
    description: "Allow companies to authenticate via SAML 2.0 / OIDC",
    enabled: true,
  },
  {
    id: "session",
    label: "Session Timeout (30 min)",
    description: "Automatically log out inactive users after 30 minutes",
    enabled: true,
  },
  {
    id: "ip",
    label: "IP Allowlisting",
    description: "Restrict admin access to approved IP ranges",
    enabled: false,
  },
  {
    id: "audit",
    label: "Audit Log Retention (2 yrs)",
    description: "Keep detailed audit logs for 2 years before archival",
    enabled: true,
  },
];

export interface EmailSettings {
  smtpHost: string;
  smtpPort: string;
  senderEmail: string;
  adminAlertEmail: string;
}

export const emailSettings: EmailSettings = {
  smtpHost: "smtp.sendgrid.net",
  smtpPort: "587",
  senderEmail: "noreply@urimpact.com",
  adminAlertEmail: "alerts@urimpact.com",
};

export interface Integration {
  id: string;
  name: string;
  description: string;
  initial: string;
  connected: boolean;
}

export const integrations: Integration[] = [
  {
    id: "stripe",
    name: "Stripe",
    description: "Payment processing & billing",
    initial: "S",
    connected: true,
  },
  {
    id: "sendgrid",
    name: "SendGrid",
    description: "Transactional email delivery",
    initial: "S",
    connected: true,
  },
  {
    id: "slack",
    name: "Slack",
    description: "Team alert notifications",
    initial: "S",
    connected: false,
  },
  {
    id: "ga",
    name: "Google Analytics",
    description: "Platform usage tracking",
    initial: "G",
    connected: true,
  },
];

export const industryOptions: string[] = [
  "Manufacturing",
  "Construction",
  "Logistics",
  "Energy",
  "Retail",
  "Water Mgmt",
  "Transport",
  "Agriculture",
  "Technology",
  "Finance",
];

export const countryOptions: string[] = [
  "India",
  "United States",
  "United Kingdom",
  "Germany",
  "Singapore",
  "Australia",
  "UAE",
  "Japan",
];

export const employeeOptions: string[] = [
  "1–50",
  "51–200",
  "201–500",
  "501–1,000",
  "1,001–5,000",
  "5,000+",
];

export const revenueOptions: string[] = [
  "< $1M",
  "$1M – $10M",
  "$10M – $50M",
  "$50M – $200M",
  "$200M+",
];

export interface ModuleOption {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export const defaultModules: ModuleOption[] = [
  {
    id: "ghg",
    label: "GHG Reporting",
    description: "Scope 1, 2, 3 emissions tracking",
    enabled: true,
  },
  {
    id: "esg",
    label: "ESG Management",
    description: "Environmental, Social, Governance",
    enabled: true,
  },
  {
    id: "gap",
    label: "Gap Analysis",
    description: "Benchmarking & compliance gaps",
    enabled: true,
  },
  {
    id: "decarb",
    label: "Decarbonisation",
    description: "Net-zero roadmap & targets",
    enabled: false,
  },
  {
    id: "supply",
    label: "Supply Chain",
    description: "Upstream & downstream tracking",
    enabled: false,
  },
  {
    id: "bsm",
    label: "Business Sustainability",
    description: "BSM reporting framework",
    enabled: false,
  },
];

// ─────────────────────────────────────────────
//  COMPANY PROFILE: بيانات Nexgen Steels Ltd.
// ─────────────────────────────────────────────

export interface CompanyProfileStats {
  totalUsers: number;
  emissions: string;
  monthlyRevenue: string;
  dataCompleteness: string;
  modulesActive: string;
}

export interface ScopeBar {
  label: string;
  value: number;
  display: string;
  widthPct: number;
}

export interface CompanyProfileModule {
  id: string;
  label: string;
  enabled: boolean;
}

export interface CompanyProfileData {
  id: string;
  name: string;
  status: CompanyStatus;
  plan: PlanName;
  location: string;
  industry: string;
  adminEmail: string;
  joinedDate: string;
  initial: string;
  avatarBg: string;
  avatarText: string;
  stats: CompanyProfileStats;
  details: Record<string, string>;
  scopeSummary: ScopeBar[];
  modules: CompanyProfileModule[];
}

export const companyProfile: CompanyProfileData = {
  id: "CMP-1000",
  name: "Nexgen Steels Ltd.",
  status: "Active",
  plan: "Enterprise",
  location: "Mumbai, India",
  industry: "Manufacturing",
  adminEmail: "admin@nexgen.com",
  joinedDate: "Joined March 2023",
  initial: "N",
  avatarBg: "bg-teal-50",
  avatarText: "text-teal-600",
  stats: {
    totalUsers: 42,
    emissions: "48,210",
    monthlyRevenue: "$4,200",
    dataCompleteness: "98.2%",
    modulesActive: "4 / 6",
  },
  details: {
    "Company ID": "CMP-1000",
    "Registration No.": "U27100MH2018PTC308XXX",
    "GST/Tax ID": "27AABCN1234F1Z5",
    Website: "www.nexgensteels.com",
    Phone: "+91 22 4567 8900",
    Employees: "1,200 – 1,500",
    "Annual Revenue": "₹850 Cr",
    "Primary Contact": "Rajesh Mehta (CEO)",
  },
  scopeSummary: [
    { label: "Scope 1", value: 18200, display: "18,200 tCO₂e", widthPct: 75 },
    { label: "Scope 2", value: 12400, display: "12,400 tCO₂e", widthPct: 51 },
    { label: "Scope 3", value: 17610, display: "17,610 tCO₂e", widthPct: 73 },
  ],
  modules: [
    { id: "ghg", label: "GHG", enabled: true },
    { id: "esg", label: "ESG", enabled: true },
    { id: "gap", label: "Gap Analysis", enabled: true },
    { id: "decarb", label: "Decarbonisation", enabled: true },
    { id: "supply", label: "Supply Chain", enabled: false },
    { id: "bsm", label: "BSM", enabled: false },
  ],
};

//  Mock Organizations
const organizations = [
  {
    id: "org-001",
    name: "GreenTech Solutions",
    sector: "Technology",
    country: "GB",
    subscriptionPlan: "PROFESSIONAL",
    subscriptionStatus: "ACTIVE",
    onboardingCompletedAt: "2025-01-15T10:00:00Z",
    facilitiesCount: 3,
    employeesCount: 150,
    isActive: true,
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "org-002",
    name: "EcoManufacture Ltd",
    sector: "Manufacturing",
    country: "PK",
    subscriptionPlan: "STARTER",
    subscriptionStatus: "ACTIVE",
    onboardingCompletedAt: null,
    facilitiesCount: 1,
    employeesCount: 40,
    isActive: true,
    createdAt: "2025-02-10T00:00:00Z",
  },
  {
    id: "org-003",
    name: "FinanceCore Inc",
    sector: "Finance",
    country: "US",
    subscriptionPlan: "ENTERPRISE",
    subscriptionStatus: "SUSPENDED",
    onboardingCompletedAt: "2025-03-01T10:00:00Z",
    facilitiesCount: 5,
    employeesCount: 500,
    isActive: false,
    createdAt: "2025-03-01T00:00:00Z",
  },
];

//  Mock Users
const users = [
  {
    id: "user-001",
    email: "john@greentech.com",
    firstName: "John",
    lastName: "Smith",
    role: "SUPER_ADMIN",
    organizationId: "org-001",
    isActive: true,
    lastLoginAt: "2026-05-20T08:00:00Z",
    createdAt: "2025-01-01T00:00:00Z",
  },
  {
    id: "user-002",
    email: "sara@ecomanufacture.com",
    firstName: "Sara",
    lastName: "Khan",
    role: "ADMINISTRATOR",
    organizationId: "org-002",
    isActive: true,
    lastLoginAt: "2026-05-19T12:00:00Z",
    createdAt: "2025-02-10T00:00:00Z",
  },
  {
    id: "user-003",
    email: "mike@financecore.com",
    firstName: "Mike",
    lastName: "Johnson",
    role: "ANALYST",
    organizationId: "org-003",
    isActive: false,
    lastLoginAt: null,
    createdAt: "2025-03-01T00:00:00Z",
  },
];

//  Mock Analytics
const analytics = {
  summary: {
    totalOrgs: 3,
    activeOrgs: 2,
    totalUsers: 3,
    totalCo2eThisYear: 12500.75,
    newOrgs30d: 1,
    newUsers30d: 2,
  },
  emissions: {
    totalCo2e: 12500.75,
    byScope: {
      SCOPE1: 5000.0,
      SCOPE2: 4500.5,
      SCOPE3: 3000.25,
    },
    bySector: [
      { sector: "Technology", totalCo2e: 3000.0 },
      { sector: "Manufacturing", totalCo2e: 4500.5 },
      { sector: "Finance", totalCo2e: 5000.25 },
    ],
  },
};

//  Mock Audit Logs
const auditLogs = [
  {
    id: "log-001",
    organizationId: "org-001",
    userId: "user-001",
    action: "USER_LOGIN",
    resource: "User",
    resourceId: "user-001",
    details: null,
    timestamp: "2026-05-20T08:00:00Z",
  },
  {
    id: "log-002",
    organizationId: "org-003",
    userId: null,
    action: "ORG_SUSPENDED",
    resource: "Organisation",
    resourceId: "org-003",
    details: { reason: "Payment overdue" },
    timestamp: "2026-05-19T10:00:00Z",
  },
];

module.exports = { organizations, users, analytics, auditLogs };

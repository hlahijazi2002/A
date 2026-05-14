import { useState } from "react";
import {
  Settings,
  Shield,
  Bell,
  CreditCard,
  Plug,
  FileText,
  Lock,
  ChevronDown,
} from "lucide-react";
import {
  generalSettings,
  securitySettings,
  emailSettings,
  integrations,
} from "../../data/data";
import type {
  GeneralSettings,
  SecuritySetting,
  EmailSettings,
  Integration,
} from "../../data/data";

// ── Toggle ────────────────────────────────────────────────────

const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none shrink-0 ${
      enabled ? "bg-[#0d9488]" : "bg-slate-200"
    }`}
  >
    <span
      className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform duration-200 ${
        enabled ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

// ── Select ────────────────────────────────────────────────────

const SelectField = ({
  label,
  value,
  options,
}: {
  label: string;
  value: string;
  options: string[];
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
      {label}
    </label>
    <div className="relative">
      <select
        defaultValue={value}
        className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-teal-500 pr-9"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />
    </div>
  </div>
);

// ── Input ─────────────────────────────────────────────────────

const InputField = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
      {label}
    </label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-teal-500"
    />
  </div>
);

const SectionCard = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7 mb-5">
    <div className="mb-6">
      <h2 className="text-[15px] font-bold text-slate-800">{title}</h2>
      <p className="text-[12px] text-slate-400 font-medium mt-0.5">
        {subtitle}
      </p>
    </div>
    {children}
  </div>
);

type NavSection =
  | "General"
  | "Security"
  | "Notifications"
  | "Billing"
  | "Integrations"
  | "Audit & Logs"
  | "Data & Privacy";

const NAV_ITEMS: { label: NavSection; icon: React.ReactNode }[] = [
  { label: "General", icon: <Settings size={15} /> },
  { label: "Security", icon: <Shield size={15} /> },
  { label: "Notifications", icon: <Bell size={15} /> },
  { label: "Billing", icon: <CreditCard size={15} /> },
  { label: "Integrations", icon: <Plug size={15} /> },
  { label: "Audit & Logs", icon: <FileText size={15} /> },
  { label: "Data & Privacy", icon: <Lock size={15} /> },
];

const MySettings = () => {
  const [activeNav, setActiveNav] = useState<NavSection>("General");
  const [general, setGeneral] = useState<GeneralSettings>(generalSettings);
  const [security, setSecurity] = useState<SecuritySetting[]>(securitySettings);
  const [email, setEmail] = useState<EmailSettings>(emailSettings);
  const [integs, setIntegs] = useState<Integration[]>(integrations);

  const toggleSecurity = (id: string) => {
    setSecurity((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  };

  const toggleIntegration = (id: string) => {
    setIntegs((prev) =>
      prev.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i)),
    );
  };

  return (
    <div className="bg-slate-50/30 min-h-screen font-sans text-slate-900">
      {/* ── Header ── */}
      <div className="flex justify-between items-start mb-7">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Platform Settings
          </h1>
          <p className="text-[13px] text-slate-400 font-medium mt-1">
            Configure global platform behavior and integrations
          </p>
        </div>
        <button className="px-5 py-2.5 bg-[#0d9488] hover:bg-[#0c8379] text-white rounded-lg text-[12px] font-bold shadow-sm transition-all">
          Save Changes
        </button>
      </div>

      <div className="flex gap-6 items-start">
        {/* ── Sidebar Nav ── */}
        <nav className="w-48 shrink-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-2">
          {NAV_ITEMS.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-bold transition-all text-left ${
                activeNav === label
                  ? "bg-teal-50 text-[#0d9488]"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <span
                className={
                  activeNav === label ? "text-[#0d9488]" : "text-slate-400"
                }
              >
                {icon}
              </span>
              {label}
            </button>
          ))}
        </nav>

        {/* ── Content ── */}
        <div className="flex-1 min-w-0">
          {/* General Settings */}
          <SectionCard
            title="General Settings"
            subtitle="Core platform configuration and branding"
          >
            <div className="grid grid-cols-2 gap-5">
              <InputField
                label="Platform Name"
                value={general.platformName}
                onChange={(v) =>
                  setGeneral((prev) => ({ ...prev, platformName: v }))
                }
              />
              <SelectField
                label="Default Timezone"
                value={general.defaultTimezone}
                options={[
                  "Asia/Kolkata (IST)",
                  "UTC",
                  "America/New_York (EST)",
                  "Europe/London (GMT)",
                  "Asia/Tokyo (JST)",
                ]}
              />
              <SelectField
                label="Default Currency"
                value={general.defaultCurrency}
                options={[
                  "USD ($)",
                  "EUR (€)",
                  "GBP (£)",
                  "INR (₹)",
                  "JPY (¥)",
                ]}
              />
              <SelectField
                label="Reporting Framework"
                value={general.reportingFramework}
                options={[
                  "GHG Protocol",
                  "ISO 14064",
                  "TCFD",
                  "GRI Standards",
                  "CDP",
                ]}
              />
            </div>
          </SectionCard>

          {/* Security & Access */}
          <SectionCard
            title="Security & Access"
            subtitle="Authentication, session, and access controls"
          >
            <div className="space-y-0 divide-y divide-slate-50">
              {security.map((setting) => (
                <div
                  key={setting.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="pr-6">
                    <p className="text-[13px] font-bold text-slate-800">
                      {setting.label}
                    </p>
                    <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                      {setting.description}
                    </p>
                  </div>
                  <Toggle
                    enabled={setting.enabled}
                    onChange={() => toggleSecurity(setting.id)}
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Email & Notifications */}
          <SectionCard
            title="Email & Notifications"
            subtitle="System email configuration and alert preferences"
          >
            <div className="grid grid-cols-2 gap-5">
              <InputField
                label="SMTP Host"
                value={email.smtpHost}
                onChange={(v) => setEmail((prev) => ({ ...prev, smtpHost: v }))}
              />
              <InputField
                label="Sender Email"
                value={email.senderEmail}
                onChange={(v) =>
                  setEmail((prev) => ({ ...prev, senderEmail: v }))
                }
              />
              <InputField
                label="SMTP Port"
                value={email.smtpPort}
                onChange={(v) => setEmail((prev) => ({ ...prev, smtpPort: v }))}
              />
              <InputField
                label="Admin Alert Email"
                value={email.adminAlertEmail}
                onChange={(v) =>
                  setEmail((prev) => ({ ...prev, adminAlertEmail: v }))
                }
              />
            </div>
          </SectionCard>

          {/* Integrations */}
          <SectionCard
            title="Integrations"
            subtitle="Connected third-party services and APIs"
          >
            <div className="space-y-0 divide-y divide-slate-50">
              {integs.map((integ) => (
                <div
                  key={integ.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    {/* Initial avatar */}
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[13px] font-black text-slate-500 shrink-0">
                      {integ.initial}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-slate-800">
                        {integ.name}
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        {integ.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Status label */}
                    <span
                      className={`flex items-center gap-1.5 text-[11px] font-bold ${
                        integ.connected ? "text-emerald-600" : "text-slate-400"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          integ.connected ? "bg-emerald-500" : "bg-slate-300"
                        }`}
                      />
                      {integ.connected ? "Connected" : "Not Connected"}
                    </span>
                    <Toggle
                      enabled={integ.connected}
                      onChange={() => toggleIntegration(integ.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default MySettings;

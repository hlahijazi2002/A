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

const Toggle = ({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: () => void;
}) => (
  <button
    onClick={onChange}
    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors shrink-0 ${enabled ? "bg-teal-600" : "bg-slate-200"}`}
  >
    <span
      className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${enabled ? "translate-x-6" : "translate-x-1"}`}
    />
  </button>
);

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
        className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 pr-9"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <ChevronDown
        size={13}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
      />
    </div>
  </div>
);

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
      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500"
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
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 space-y-5">
    <div>
      <h2 className="text-[15px] font-bold text-slate-800">{title}</h2>
      <p className="text-[12px] text-slate-400 mt-0.5">{subtitle}</p>
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

  const toggleSecurity = (id: string) =>
    setSecurity((p) =>
      p.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  const toggleIntegration = (id: string) =>
    setIntegs((p) =>
      p.map((i) => (i.id === id ? { ...i, connected: !i.connected } : i)),
    );

  return (
    <div className="min-h-screen bg-slate-50/30 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap justify-between items-start gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Platform Settings
          </h1>
          <p className="text-[13px] text-slate-400 mt-1">
            Configure global platform behavior and integrations
          </p>
        </div>
        <button className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-[12px] font-bold shadow-sm transition-all">
          Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-5 items-start">
        {/* Nav */}
        <nav className="w-full lg:w-48 shrink-0 bg-white rounded-2xl border border-slate-100 shadow-sm p-2">
          {NAV_ITEMS.map(({ label, icon }) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[12px] font-bold transition-all text-left ${
                activeNav === label
                  ? "bg-teal-50 text-teal-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
              }`}
            >
              <span
                className={
                  activeNav === label ? "text-teal-600" : "text-slate-400"
                }
              >
                {icon}
              </span>
              {label}
            </button>
          ))}
        </nav>

        {/* Content */}
        <div className="flex-1 min-w-0 space-y-5">
          {/* General */}
          <SectionCard
            title="General Settings"
            subtitle="Core platform configuration and branding"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="Platform Name"
                value={general.platformName}
                onChange={(v) => setGeneral((p) => ({ ...p, platformName: v }))}
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

          {/* Security */}
          <SectionCard
            title="Security & Access"
            subtitle="Authentication, session, and access controls"
          >
            <div className="divide-y divide-slate-50">
              {security.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="pr-6">
                    <p className="text-[13px] font-bold text-slate-800">
                      {s.label}
                    </p>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      {s.description}
                    </p>
                  </div>
                  <Toggle
                    enabled={s.enabled}
                    onChange={() => toggleSecurity(s.id)}
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Email */}
          <SectionCard
            title="Email & Notifications"
            subtitle="System email configuration and alert preferences"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField
                label="SMTP Host"
                value={email.smtpHost}
                onChange={(v) => setEmail((p) => ({ ...p, smtpHost: v }))}
              />
              <InputField
                label="Sender Email"
                value={email.senderEmail}
                onChange={(v) => setEmail((p) => ({ ...p, senderEmail: v }))}
              />
              <InputField
                label="SMTP Port"
                value={email.smtpPort}
                onChange={(v) => setEmail((p) => ({ ...p, smtpPort: v }))}
              />
              <InputField
                label="Admin Alert Email"
                value={email.adminAlertEmail}
                onChange={(v) =>
                  setEmail((p) => ({ ...p, adminAlertEmail: v }))
                }
              />
            </div>
          </SectionCard>

          {/* Integrations */}
          <SectionCard
            title="Integrations"
            subtitle="Connected third-party services and APIs"
          >
            <div className="divide-y divide-slate-50">
              {integs.map((integ) => (
                <div
                  key={integ.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-[13px] font-black text-slate-500 shrink-0">
                      {integ.initial}
                    </div>
                    <div>
                      <p className="text-[13px] font-bold text-slate-800">
                        {integ.name}
                      </p>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {integ.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center gap-1.5 text-[11px] font-bold ${integ.connected ? "text-emerald-600" : "text-slate-400"}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${integ.connected ? "bg-emerald-500" : "bg-slate-300"}`}
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

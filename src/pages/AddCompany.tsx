import { useState } from "react";
import { ChevronDown, ArrowLeft, ArrowRight, Save } from "lucide-react";
import {
  industryOptions,
  countryOptions,
  employeeOptions,
  revenueOptions,
  defaultModules,
} from "../../data/data";
import type { ModuleOption } from "../../data/data";
import { Link } from "react-router-dom";

const Label = ({ text, required }: { text: string; required?: boolean }) => (
  <label className="block text-[12px] font-bold text-slate-700 mb-1.5">
    {text}
    {required && <span className="text-rose-500 ml-0.5">*</span>}
  </label>
);

const Input = ({
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) => (
  <input
    type={type}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] text-slate-700 placeholder-slate-300 font-medium focus:outline-none focus:ring-1 focus:ring-teal-500"
  />
);

const Select = ({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] text-slate-700 font-medium focus:outline-none focus:ring-1 focus:ring-teal-500 pr-8"
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
);

const Textarea = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
}) => (
  <textarea
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    rows={4}
    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] text-slate-700 placeholder-slate-300 font-medium focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
  />
);

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

// ── Stepper ────────────────────────────────────────────────────

const STEPS = [
  { n: 1, label: "Company Details" },
  { n: 2, label: "Admin User" },
  { n: 3, label: "Subscription" },
  { n: 4, label: "Review" },
];

const Stepper = ({ current }: { current: number }) => (
  <div className="flex items-center gap-0 mb-8">
    {STEPS.map((step, idx) => {
      const done = step.n < current;
      const active = step.n === current;
      const last = idx === STEPS.length - 1;

      return (
        <div key={step.n} className="flex items-center flex-1 last:flex-none">
          {/* Circle + label */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all ${
                active
                  ? "bg-[#0d9488] text-white shadow-sm shadow-teal-200"
                  : done
                    ? "bg-teal-100 text-[#0d9488]"
                    : "bg-slate-100 text-slate-400"
              }`}
            >
              {step.n}
            </div>
            <span
              className={`text-[12px] font-bold whitespace-nowrap ${
                active ? "text-[#0d9488]" : "text-slate-400"
              }`}
            >
              {step.label}
            </span>
          </div>

          {/* Connector line */}
          {!last && (
            <div className="flex-1 mx-3 h-px relative">
              <div className="absolute inset-0 bg-slate-200 rounded-full" />
              {done && (
                <div className="absolute inset-0 bg-[#0d9488] rounded-full" />
              )}
              {active && (
                <div className="absolute inset-y-0 left-0 w-1/2 bg-[#0d9488] rounded-full" />
              )}
            </div>
          )}
        </div>
      );
    })}
  </div>
);

// ── Section card ───────────────────────────────────────────────

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
    <h3 className="text-[13px] font-bold text-slate-800 mb-5">{title}</h3>
    {children}
  </div>
);

// ── Step 1 form state type ─────────────────────────────────────

interface Step1State {
  companyName: string;
  industry: string;
  country: string;
  state: string;
  city: string;
  website: string;
  description: string;
  regNo: string;
  taxId: string;
  employees: string;
  revenue: string;
  firstName: string;
  lastName: string;
  workEmail: string;
  phone: string;
  designation: string;
}

const AddCompany = () => {
  const [step, setStep] = useState<number>(1);

  const [form, setForm] = useState<Step1State>({
    companyName: "",
    industry: industryOptions[0],
    country: countryOptions[0],
    state: "",
    city: "",
    website: "",
    description: "",
    regNo: "",
    taxId: "",
    employees: employeeOptions[0],
    revenue: revenueOptions[0],
    firstName: "",
    lastName: "",
    workEmail: "",
    phone: "",
    designation: "",
  });

  const [modules, setModules] = useState<ModuleOption[]>(defaultModules);

  const set = (key: keyof Step1State) => (v: string) =>
    setForm((prev) => ({ ...prev, [key]: v }));

  const toggleModule = (id: string) =>
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)),
    );

  return (
    <div className="bg-slate-50/30 min-h-screen font-sans text-slate-900">
      {/* ── Header ── */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Add New Company
          </h1>
          <p className="text-[13px] text-slate-400 font-medium mt-1">
            Fill in company details to onboard onto the platform
          </p>
        </div>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={13} /> Cancel
        </Link>
      </div>

      <Stepper current={step} />

      {step === 1 && (
        <div className="grid grid-cols-2 gap-5">
          <div className="flex flex-col gap-5">
            <Card title="Basic Information">
              <div className="flex flex-col gap-4">
                <div>
                  <Label text="Company Name" required />
                  <Input
                    placeholder="e.g. Nexgen Steels Ltd."
                    value={form.companyName}
                    onChange={set("companyName")}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label text="Industry" required />
                    <Select
                      options={industryOptions}
                      value={form.industry}
                      onChange={set("industry")}
                    />
                  </div>
                  <div>
                    <Label text="Country" required />
                    <Select
                      options={countryOptions}
                      value={form.country}
                      onChange={set("country")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label text="State / Region" />
                    <Input
                      placeholder="Maharashtra"
                      value={form.state}
                      onChange={set("state")}
                    />
                  </div>
                  <div>
                    <Label text="City" />
                    <Input
                      placeholder="Mumbai"
                      value={form.city}
                      onChange={set("city")}
                    />
                  </div>
                </div>

                <div>
                  <Label text="Company Website" />
                  <Input
                    placeholder="https://www.company.com"
                    value={form.website}
                    onChange={set("website")}
                  />
                </div>

                <div>
                  <Label text="Description" />
                  <Textarea
                    placeholder="Brief description of the company and its operations..."
                    value={form.description}
                    onChange={set("description")}
                  />
                </div>
              </div>
            </Card>

            {/* Legal & Registration */}
            <Card title="Legal & Registration">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label text="Registration No." />
                    <Input
                      placeholder="CIN / Company No."
                      value={form.regNo}
                      onChange={set("regNo")}
                    />
                  </div>
                  <div>
                    <Label text="Tax / GST ID" />
                    <Input
                      placeholder="GSTIN / VAT No."
                      value={form.taxId}
                      onChange={set("taxId")}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label text="No. of Employees" />
                    <Select
                      options={employeeOptions}
                      value={form.employees}
                      onChange={set("employees")}
                    />
                  </div>
                  <div>
                    <Label text="Annual Revenue (USD)" />
                    <Select
                      options={revenueOptions}
                      value={form.revenue}
                      onChange={set("revenue")}
                    />
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT column */}
          <div className="flex flex-col gap-5">
            {/* Primary Contact */}
            <Card title="Primary Contact">
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label text="First Name" required />
                    <Input
                      placeholder="Rajesh"
                      value={form.firstName}
                      onChange={set("firstName")}
                    />
                  </div>
                  <div>
                    <Label text="Last Name" required />
                    <Input
                      placeholder="Mehta"
                      value={form.lastName}
                      onChange={set("lastName")}
                    />
                  </div>
                </div>

                <div>
                  <Label text="Work Email" required />
                  <Input
                    placeholder="rajesh@company.com"
                    type="email"
                    value={form.workEmail}
                    onChange={set("workEmail")}
                  />
                </div>

                <div>
                  <Label text="Phone" />
                  <Input
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={set("phone")}
                  />
                </div>

                <div>
                  <Label text="Designation" />
                  <Input
                    placeholder="CEO / Sustainability Manager"
                    value={form.designation}
                    onChange={set("designation")}
                  />
                </div>
              </div>
            </Card>

            {/* Module Access */}
            <Card title="Module Access">
              <p className="text-[11px] text-slate-400 font-medium -mt-3 mb-4">
                Select modules to enable for this company
              </p>
              <div className="space-y-0 divide-y divide-slate-50">
                {modules.map((mod) => (
                  <div
                    key={mod.id}
                    className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-[12px] font-bold text-slate-800">
                        {mod.label}
                      </p>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">
                        {mod.description}
                      </p>
                    </div>
                    <Toggle
                      enabled={mod.enabled}
                      onChange={() => toggleModule(mod.id)}
                    />
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* ── Placeholder for steps 2–4 ── */}
      {step > 1 && (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-16 text-center">
          <p className="text-slate-400 text-sm font-medium">
            Step {step} — {STEPS.find((s) => s.n === step)?.label}
          </p>
        </div>
      )}

      {/* ── Footer Actions ── */}
      <div className="flex justify-between items-center mt-6">
        <div />
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
            <Save size={14} /> Save as Draft
          </button>
          <button
            onClick={() => setStep((s) => Math.min(s + 1, 4))}
            className="flex items-center gap-2 px-6 py-2.5 bg-[#0d9488] hover:bg-[#0c8379] text-white rounded-lg text-[12px] font-bold shadow-sm transition-all"
          >
            Next: {STEPS.find((s) => s.n === step + 1)?.label ?? "Review"}{" "}
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCompany;

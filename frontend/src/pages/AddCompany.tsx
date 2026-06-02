import { ChevronDown, ArrowLeft, ArrowRight, Save } from "lucide-react";
import {
  industryOptions,
  countryOptions,
  employeeOptions,
  revenueOptions,
  defaultModules,
} from "../../data/data";
import type { ModuleOption } from "../../data/data";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Toggle from "../components/Toggle";

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
    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500"
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
      className="w-full appearance-none bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] text-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 pr-8"
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
    rows={4}
    onChange={(e) => onChange(e.target.value)}
    className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2.5 text-[13px] text-slate-700 placeholder-slate-300 focus:outline-none focus:ring-1 focus:ring-teal-500 resize-none"
  />
);

const Card = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5">
    <h3 className="text-[13px] font-bold text-slate-800 mb-4">{title}</h3>
    {children}
  </div>
);

const STEPS = [
  { n: 1, label: "Company Details" },
  { n: 2, label: "Admin User" },
  { n: 3, label: "Subscription" },
  { n: 4, label: "Review" },
];

const Stepper = ({ currentStep }: { currentStep: number }) => (
  <div className="flex items-center mb-8 overflow-x-auto">
    {STEPS.map((step, idx) => {
      const active = step.n === currentStep;
      const done = step.n < currentStep;
      const last = idx === STEPS.length - 1;
      return (
        <div
          key={step.n}
          className="flex items-center flex-1 last:flex-none min-w-0"
        >
          <div className="flex items-center gap-2 shrink-0">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black transition-all ${
                active
                  ? "bg-teal-600 text-white shadow-sm"
                  : done
                    ? "bg-teal-100 text-teal-600"
                    : "bg-slate-100 text-slate-400"
              }`}
            >
              {step.n}
            </div>
            <span
              className={`text-[12px] font-bold whitespace-nowrap hidden sm:block ${
                active
                  ? "text-teal-600"
                  : done
                    ? "text-teal-400"
                    : "text-slate-400"
              }`}
            >
              {step.label}
            </span>
          </div>
          {!last && (
            <div className="flex-1 mx-2 h-px bg-slate-200 rounded-full" />
          )}
        </div>
      );
    })}
  </div>
);

interface FormState {
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
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [modules, setModules] = useState<ModuleOption[]>(defaultModules);
  const [form, setForm] = useState<FormState>({
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

  const set = (key: keyof FormState) => (v: string) =>
    setForm((p) => ({ ...p, [key]: v }));

  const toggleModule = (id: string) =>
    setModules((p) =>
      p.map((m) => (m.id === id ? { ...m, enabled: !m.enabled } : m)),
    );

  return (
    <div className="min-h-screen bg-slate-50/30 space-y-6">
      <div className="flex flex-wrap justify-between items-start gap-3">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">
            Add New Company
          </h1>
          <p className="text-[13px] text-slate-400 mt-1">
            Fill in company details to onboard onto the platform
          </p>
        </div>
        <Link
          to="/companies"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={13} /> Cancel
        </Link>
      </div>

      <Stepper currentStep={currentStep} />

      {currentStep === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-5">
            <Card title="Basic Information">
              <div className="space-y-4">
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
                    placeholder="Brief description..."
                    value={form.description}
                    onChange={set("description")}
                  />
                </div>
              </div>
            </Card>

            <Card title="Legal & Registration">
              <div className="space-y-4">
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

          <div className="space-y-5">
            <Card title="Primary Contact">
              <div className="space-y-4">
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

            <Card title="Module Access">
              <p className="text-[11px] text-slate-400 -mt-2 mb-4">
                Select modules to enable for this company
              </p>
              <div className="divide-y divide-slate-50">
                {modules.map((mod) => (
                  <div
                    key={mod.id}
                    className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
                  >
                    <div>
                      <p className="text-[12px] font-bold text-slate-800">
                        {mod.label}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-0.5">
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

      {currentStep === 2 && (
        <Card title="Admin User">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label text="First Name" required />
                <Input
                  placeholder="Admin First Name"
                  value={form.firstName}
                  onChange={set("firstName")}
                />
              </div>
              <div>
                <Label text="Last Name" required />
                <Input
                  placeholder="Admin Last Name"
                  value={form.lastName}
                  onChange={set("lastName")}
                />
              </div>
            </div>
            <div>
              <Label text="Work Email" required />
              <Input
                placeholder="admin@company.com"
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
      )}

      {currentStep === 3 && (
        <Card title="Subscription">
          <div className="space-y-4">
            <div>
              <Label text="Subscription Plan" required />
              <Select
                options={["Starter", "Professional", "Enterprise"]}
                value="Starter"
                onChange={() => {}}
              />
            </div>
            <div>
              <Label text="Billing Cycle" />
              <Select
                options={["Monthly", "Annually"]}
                value="Monthly"
                onChange={() => {}}
              />
            </div>
          </div>
        </Card>
      )}

      {currentStep === 4 && (
        <Card title="Review">
          <div className="space-y-3">
            {[
              { label: "Company Name", value: form.companyName || "—" },
              { label: "Industry", value: form.industry },
              { label: "Country", value: form.country },
              { label: "Admin Email", value: form.workEmail || "—" },
              { label: "Employees", value: form.employees },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="flex justify-between py-2 border-b border-slate-50 last:border-0"
              >
                <span className="text-[12px] text-slate-400">{label}</span>
                <span className="text-[12px] font-bold text-slate-800">
                  {value}
                </span>
              </div>
            ))}
          </div>
        </Card>
      )}

      <div className="flex justify-end gap-3 pt-2">
        {currentStep > 1 && (
          <button
            onClick={() => setCurrentStep((s) => s - 1)}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft size={14} /> Back
          </button>
        )}
        <button className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-lg text-[12px] font-bold text-slate-600 hover:bg-slate-50 transition-colors">
          <Save size={14} /> Save as Draft
        </button>
        {currentStep < 4 ? (
          <button
            onClick={() => setCurrentStep((s) => s + 1)}
            className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-[12px] font-bold shadow-sm transition-all"
          >
            Next <ArrowRight size={14} />
          </button>
        ) : (
          <button
            onClick={() => navigate("/companies")}
            className="flex items-center gap-2 px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-[12px] font-bold shadow-sm transition-all"
          >
            Submit <ArrowRight size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AddCompany;

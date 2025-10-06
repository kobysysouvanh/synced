import { Check, Star } from "lucide-react";
import { Button } from "../ui/button";

const Pricing = () => {
  return (
    <section id="pricing">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            Simple pricing for two
          </h2>
          <p className="mt-3 text-slate-600">
            Start free. Upgrade whenever you&apos;re ready.
          </p>
          <div className="mt-4 rounded-full bg-slate-50 ring-1 ring-inset ring-slate-200 p-3 text-xs text-slate-500">
            Tip: Only one of you needs to upgrade to Pro for both to enjoy the
            benefits.
          </div>
        </div>
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors relative flex flex-col">
            <div className="absolute right-4 top-4 text-xs text-slate-500">
              Best for starters
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">
              Free
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Everything you need to sync up.
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
              $0
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700 flex-1">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" /> 5 Places • 5
                notes • 5 tasks tasks
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" /> 20 photos
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-500" /> One shared
                countdown
              </li>
            </ul>
            <Button variant={"outline"} className="hover:border-slate-300">
              Get Started
            </Button>
          </div>
          {/* Pro */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 hover:border-fuchsia-500/50 transition-colors relative flex flex-col">
            <div className="absolute -top-[10px] right-4 inline-flex items-center gap-1 rounded-full bg-indigo-600 text-white px-2 py-0.5 text-[11px] shadow-sm">
              <Star data-lucide="star" className="w-3.5 h-3.5" />
              Most popular
            </div>
            <h3 className="text-lg font-semibold tracking-tight text-slate-900">
              Pro
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              For couples who want everything.
            </p>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-slate-900">
              $6<span className="text-sm text-slate-500">/mo</span>
            </p>
            <ul className="mt-5 space-y-2 text-sm text-slate-700 flex-1">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-600" /> Unlimited photos, notes, tasks
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-600" /> Multiple
                countdowns
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-600" /> Advanced filters
                & polls
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-fuchsia-600" /> Priority support
              </li>
            </ul>
            <Button className="mt-6">Upgrade to Pro</Button>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Pricing;

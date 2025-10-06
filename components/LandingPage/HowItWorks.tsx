import { Link, Sparkle, UserPlus } from "lucide-react";

const HowItWorks = () => {
  return (
    <section id="how">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
              Set up in minutes
            </h2>
            <p className="mt-3 text-slate-600">
              No groups. No noise. Just the two of you—always in sync.
            </p>
          </div>
          <div className="lg:col-span-2 grid sm:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="h-10 w-10 rounded-xl bg-white text-slate-800 ring-1 ring-inset ring-slate-200 flex items-center justify-center">
                <UserPlus className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-slate-900">
                Create your space
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Sign up and generate a code to share.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="h-10 w-10 rounded-xl bg-white text-slate-800 ring-1 ring-inset ring-slate-200 flex items-center justify-center">
                <Link className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-slate-900">
                Invite your person
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                They input the code and hit connect—now everything is shared
                between you two.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <div className="h-10 w-10 rounded-xl bg-white text-slate-800 ring-1 ring-inset ring-slate-200 flex items-center justify-center">
                <Sparkle className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold tracking-tight text-slate-900">
                Start syncing
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Add places, notes, tasks, and memories—together.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HowItWorks;

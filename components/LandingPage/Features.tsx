import {
  Bell,
  Calendar,
  CheckSquare,
  Clock,
  Filter,
  Flag,
  HeartHandshake,
  Images,
  ListCheck,
  Lock,
  MapPin,
  NotebookText,
  PenLine,
  Scale,
  Smile,
  Sparkles,
  Star,
  ThumbsUp,
  Wallet,
} from "lucide-react";

const Features = () => {
  return (
    <section id="features" className="relative">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            A shared space that grows with you
          </h2>
          <p className="mt-3 text-slate-600">
            Plan nights out, capture memories, split tasks, and stay aligned
            without juggling different apps.
          </p>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Places to eat */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-indigo-600/15 text-indigo-600 ring-1 ring-inset ring-indigo-500/20 flex items-center justify-center">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                Places to eat
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Save restaurants, rate date spots, and sort by vibe, budget, or
              distance.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Filter className="w-4 h-4" />
              Smart filters • Shared ratings
            </div>
          </div>

          {/* Gallery */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-600/15 text-emerald-600 ring-1 ring-inset ring-emerald-500/20 flex items-center justify-center">
                <Images className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                Shared photo gallery
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Auto-sync albums and relive your memories in a private timeline.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Lock className="w-4 h-4" />
              End-to-end encryption
            </div>
          </div>

          {/* Notes */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-fuchsia-600/15 text-fuchsia-600 ring-1 ring-inset ring-fuchsia-500/20 flex items-center justify-center">
                <NotebookText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                Notes & lists
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Keep ideas, packing lists, and love notes in one place—real-time
              updates for both.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <PenLine className="w-4 h-4" />
              Rich text • Templates
            </div>
          </div>

          {/* Tasks */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-sky-600/15 text-sky-600 ring-1 ring-inset ring-sky-500/20 flex items-center justify-center">
                <CheckSquare className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                Shared tasks
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Assign tasks, set reminders, and celebrate wins together.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Bell className="w-4 h-4" />
              Reminders • Assignments
            </div>
          </div>

          {/* Calendar & Countdown */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-violet-600/15 text-violet-600 ring-1 ring-inset ring-violet-500/20 flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                Calendar & countdowns
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Never miss an anniversary or date night again—see what’s coming
              next.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Clock className="w-4 h-4" />
              Timezones handled
            </div>
          </div>

          {/* Budget */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors flex flex-col">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-600/15 text-amber-600 ring-1 ring-inset ring-amber-500/20 flex items-center justify-center">
                <Wallet className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                Budget trips
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600 flex-1">
              Plan trips together and track your savings towards it.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Sparkles className="w-4 h-4" />
              Save together
            </div>
          </div>

          {/* Bucket list */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-rose-600/15 text-rose-600 ring-1 ring-inset ring-rose-500/20 flex items-center justify-center">
                <Flag className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                Bucket list
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Dream together and check off milestones you’ll remember forever.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Star className="w-4 h-4" />
              Milestones • Progress
            </div>
          </div>

          {/* Polls */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-teal-600/15 text-teal-600 ring-1 ring-inset ring-teal-500/20 flex items-center justify-center">
                <ListCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                Quick polls
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Can’t decide? Spin up a poll for dinner, movies, or weekend plans.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <ThumbsUp className="w-4 h-4" />
              Real-time votes
            </div>
          </div>

          {/* Mood */}
          <div className="group rounded-2xl border border-slate-200 bg-white p-6 hover:border-slate-300 transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-purple-600/15 text-purple-600 ring-1 ring-inset ring-purple-500/20 flex items-center justify-center">
                <Smile className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                Mood check-ins
              </h3>
            </div>
            <p className="mt-3 text-sm text-slate-600">
              Share how you’re feeling and show up for each other more
              thoughtfully.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <HeartHandshake className="w-4 h-4" />
              Gentle prompts
            </div>
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-slate-300/80"></div>
    </section>
  );
};
export default Features;

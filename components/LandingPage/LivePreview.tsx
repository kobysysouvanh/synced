import {
  CheckCircle2,
  Circle,
  Flower2,
  Gift,
  Heart,
  Image,
  ListTodo,
  MessageCircle,
  Plane,
  Utensils,
} from "lucide-react";

const LivePreview = () => {
  return (
    <section id="preview">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900">
            What your shared space can look like
          </h2>
          <p className="mt-3 text-slate-600">
            Start simple and grow together.{" "}
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-rose-600/15 text-rose-600 ring-1 ring-rose-500/20 flex items-center justify-center">
                    <Heart className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                    Anniversaries
                  </h3>
                </div>
                <span className="text-xs text-slate-500">Oct 12</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex items-center gap-2">
                  <Gift className="w-4 h-4 text-amber-500" />
                  3-year anniversary dinner
                </li>
                <li className="flex items-center gap-2">
                  <Flower2 className="w-4 h-4 text-rose-500" />
                  Plan a surprise bouquet
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-amber-600/15 text-amber-600 ring-1 ring-amber-500/20 flex items-center justify-center">
                  <Plane className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                  Trip planner
                </h3>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                Weekend getaway: cabins, brunch spots, scenic drives.
              </p>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <img
                  src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=400&auto=format&fit=crop"
                  className="h-20 w-full rounded-lg object-cover ring-1 ring-slate-200"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?q=80&w=400&auto=format&fit=crop"
                  className="h-20 w-full rounded-lg object-cover ring-1 ring-slate-200"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1445363692815-ebcd599f7621?q=80&w=400&auto=format&fit=crop"
                  className="h-20 w-full rounded-lg object-cover ring-1 ring-slate-200"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* Middle column */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-sky-600/15 text-sky-600 ring-1 ring-sky-500/20 flex items-center justify-center">
                    <ListTodo className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                    This week
                  </h3>
                </div>
                <span className="text-xs text-slate-500">Shared</span>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Circle className="w-3.5 h-3.5 text-slate-400" />
                    Pick up picnic snacks
                  </div>
                  <span className="text-[10px] text-slate-500">Thu</span>
                </li>
                <li className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    Confirm dog sitter
                  </div>
                  <span className="text-[10px] text-slate-500">Done</span>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-indigo-600/15 text-indigo-600 ring-1 ring-indigo-500/20 flex items-center justify-center">
                  <Utensils className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                  Date ideas
                </h3>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-lg border border-slate-200 p-3">
                  <p className="text-slate-800">Sunset picnic</p>
                  <p className="text-slate-500 mt-1">Park by the lake</p>
                </div>
                <div className="rounded-lg border border-slate-200 p-3">
                  <p className="text-slate-800">Karaoke night</p>
                  <p className="text-slate-500 mt-1">Friday after 9</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-fuchsia-600/15 text-fuchsia-600 ring-1 ring-fuchsia-500/20 flex items-center justify-center">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                  Shared journal
                </h3>
              </div>
              <p className="mt-3 text-sm text-slate-700">
                “Today we tried the new ramen bar—spicy miso hits different.
                10/10.”
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 hover:border-slate-300 transition-colors">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-emerald-600/15 text-emerald-600 ring-1 ring-emerald-500/20 flex items-center justify-center">
                  <Image className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                  Photo Gallery
                </h3>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                <img
                  src="https://images.unsplash.com/photo-1617657172340-15a0fabc3605?q=80&w=400&auto=format&fit=crop"
                  className="h-20 w-full rounded-lg object-cover ring-1 ring-slate-200"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1581888227599-779811939961?q=80&w=400&auto=format&fit=crop"
                  className="h-20 w-full rounded-lg object-cover ring-1 ring-slate-200"
                  alt=""
                />
                <img
                  src="https://images.unsplash.com/photo-1482049016688-2d3e1b311543?q=80&w=400&auto=format&fit=crop"
                  className="h-20 w-full rounded-lg object-cover ring-1 ring-slate-200"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default LivePreview;

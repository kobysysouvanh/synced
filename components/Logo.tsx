const Logo = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="flex relative h-9 w-9 justify-center items-center rounded-lg ring-1 ring-inset ring-slate-200 bg-white text-slate-900">
        <span className="text-[1rem] font-semibold">S</span>
        <span className="absolute h-2.5 w-2.5 -right-1 -top-1 rounded-full bg-fuchsia-500/80 ring-2 ring-white" />
      </div>
      <span className="text-xl font-semibold tracking-tight">Synced</span>
    </div>
  );
};
export default Logo;

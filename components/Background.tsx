export default function Background({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full relative">
      {/* Lavender Blush Flow Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(315deg, #E1BEE7 0%, #F3E5F5 20%, #FCE4EC 40%, #FFF0F5 60%, #F8BBD9 80%, #E1BEE7 100%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

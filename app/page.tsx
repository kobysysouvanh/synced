import Header from "@/components/Header";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1 flex-col items-center text-center font-semibold mt-50 space-y-4">
        <h1 className="text-5xl">Love, Synced</h1>
        <p className="text-2xl text-center text-neutral-500">
          From planning your next date night to building your bucket list,
          <br />
          Synced helps you connect and create everlasting memories.
        </p>
        <Button size={"lg"} className="mt-6">
          Start Your Story
        </Button>
      </div>
    </div>
  );
}

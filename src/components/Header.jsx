import { BookOpenCheck } from "lucide-react";

export default function Header() {
  return (
    <header className="py-4 text-amber-500 font-medium tracking-wider text-sm flex items-center justify-center gap-2">
      <BookOpenCheck className="w-5 h-5" /> ЦИТАТА ДНЯ
    </header>
  );
}

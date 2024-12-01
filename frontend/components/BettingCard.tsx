import { Card, CardHeader, CardContent } from "@/components/ui/card";

interface BettingCardProps {
  title: string;
  time: string;
  team1: string;
  team1Image: string;
  team2: string;
  team2Image: string;
  odds: number[];
}

export default function BettingCard({ title, time, team1, team1Image, team2, team2Image, odds }: BettingCardProps) {
  return (
    <>
      <Card className="min-w-[250px] bg-sky-100 border border-zinc-800 rounded-2xl shadow-md cursor-pointer">
        <CardHeader className="p-3 bg-sky-100 rounded-t-2xl text-left">
          <p className="text-xs font-medium text-gray-400">{title}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </CardHeader>
        <CardContent className="p-3 text-left">
          <div className="flex flex-col items-start mb-3 gap-2">
            <div className="flex items-center space-x-4">
              <img src={team1Image} alt={team1} className="h-6 w-6 rounded-full" />
              <span className="text-sm font-semibold text-slate-800">{team1}</span>
            </div>
            <div className="flex items-center space-x-4">
              <img src={team2Image} alt={team2} className="h-6 w-6 rounded-full" />
              <span className="text-sm font-semibold text-slate-800">{team2}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-zinc-900 rounded-md">
              <p className="text-sm font-bold text-sky-600">{odds[0]}</p>
              <p className="text-xs text-gray-400">1</p>
            </div>
            <div className="p-2 bg-zinc-900 rounded-md">
              <p className="text-sm font-bold text-sky-600">{odds[1]}</p>
              <p className="text-xs text-gray-400">X</p>
            </div>
            <div className="p-2 bg-zinc-900 rounded-md">
              <p className="text-sm font-bold text-sky-600">{odds[2]}</p>
              <p className="text-xs text-gray-400">2</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

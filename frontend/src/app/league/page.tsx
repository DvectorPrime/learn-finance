'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { fetchLeagueStandings, LeagueResponse } from '@/lib/api';
import OphelosMascot from '@/components/mascot/OphelosMascot';
import { soundFx } from '@/lib/sound';
import {
  ArrowLeft,
  Trophy,
  Clock,
  Users,
} from 'lucide-react';

export default function LeagueStandingsPage() {
  const [leagueData, setLeagueData] = useState<LeagueResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeague();
  }, []);

  const loadLeague = async () => {
    try {
      setLoading(true);
      const res = await fetchLeagueStandings();
      setLeagueData(res);
    } catch (err) {
      console.error('Failed to load league standings:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !leagueData) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-9 h-9 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-medium text-zinc-400">Loading weekly league standings...</span>
        </div>
      </div>
    );
  }

  const { cohort, currentUser, standings } = leagueData;
  const isGuest = currentUser.rank === 0;
  const isLeader = currentUser.rank === 1;
  const isPromo = currentUser.isPromotionZone;
  const total = currentUser.totalMembers;

  const mascotSpeech =
    isGuest
      ? `Welcome to the weekly league! Top 5 learners promote to Division I every Sunday. Sign in to join the cohort.`
      : total <= 1
      ? "You are currently leading this week's cohort! Complete lessons to build your XP lead as more learners join."
      : isLeader
      ? `Phenomenal performance! You hold #1 of ${total} learners. Keep claiming daily quests to protect your position.`
      : isPromo
      ? `You are currently rank #${currentUser.rank} of ${total} — well inside the top 5 promotion zone for Division I!`
      : `You are rank #${currentUser.rank} of ${total}. Earn weekly XP from lessons to advance up the cohort standings.`;

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      {/* Sub-Header */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2">
          <Link
            href="/"
            onClick={() => soundFx.playTap()}
            className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center text-zinc-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-headline font-bold text-lg text-white leading-tight">
              Weekly League
            </h1>
            <span className="text-[10px] text-zinc-400 font-medium">
              {cohort.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
          <Trophy className="w-3.5 h-3.5" />
          <span>Division {cohort.division === 2 ? 'II' : 'I'}</span>
        </div>
      </div>

      {/* Ophelos Mascot */}
      <OphelosMascot
        mood={isPromo || isLeader ? 'celebration' : 'happy'}
        tag="Ophelos • League Ref"
        speech={mascotSpeech}
      />

      {/* Cohort Bracket & Countdown Card */}
      <div className="p-3.5 rounded-2xl glass-panel flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">
              Cohort Bracket
            </span>
            <h2 className="font-headline font-bold text-sm text-white">
              {cohort.tier} Tier • Division {cohort.division === 2 ? 'II' : 'I'}
            </h2>
          </div>
        </div>
        <div className="text-right flex flex-col items-end">
          <span className="text-[10px] text-zinc-400 uppercase font-semibold flex items-center gap-1">
            <Clock className="w-3 h-3 text-zinc-500" />
            Ends In
          </span>
          <span className="font-mono text-xs font-bold text-white mt-0.5">{cohort.endsIn}</span>
        </div>
      </div>

      {/* User Position Card */}
      <div className="p-4 rounded-2xl glass-panel flex items-center justify-between shadow-sm">
        <div>
          {isGuest ? (
            <>
              <h3 className="font-headline font-bold text-base text-white">
                Compete with <span className="text-emerald-400 font-mono">{total}</span> Active Learners
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                Sign in to earn XP, track your rank, and qualify for Sunday promotions.
              </p>
            </>
          ) : (
            <>
              <h3 className="font-headline font-bold text-base text-white">
                You are <span className="text-emerald-400 font-mono">#{currentUser.rank}</span> of {total} {total === 1 ? 'learner' : 'learners'}
              </h3>
              <p className="text-xs text-zinc-400 mt-0.5">
                {total <= 5
                  ? 'Rankings are live. Every lesson completed awards XP toward the leaderboard.'
                  : isPromo
                  ? 'Top 5 move up to Division I at the end of the week.'
                  : 'Top 5 advance to Division I. Keep compounding XP!'}
              </p>
            </>
          )}
        </div>
        <div className="flex flex-col items-end gap-1 shrink-0 ml-3">
          {isGuest ? (
            <Link
              href="/login"
              onClick={() => soundFx.playTap()}
              className="px-3 py-1.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-headline font-bold text-xs transition-all active:scale-95"
            >
              Sign In
            </Link>
          ) : (
            <>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
                {currentUser.weeklyXp.toLocaleString()} XP
              </span>
              <span className="text-[10px] font-mono text-zinc-500">
                Delta: {currentUser.rankDelta}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Standings List */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1 text-xs">
          <span className="font-bold text-zinc-400 uppercase tracking-wider text-[10px]">
            Cohort Standings ({standings.length})
          </span>
          {standings.length > 5 ? (
            <span className="text-emerald-400 font-semibold text-[11px] flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Top 5 Promotion Zone
            </span>
          ) : (
            <span className="text-zinc-500 font-medium text-[11px]">
              Live Standings
            </span>
          )}
        </div>

        <div className="space-y-1.5">
          {standings.map((member) => {
            const isFirst = member.rank === 1;
            const isSecond = member.rank === 2;
            const isThird = member.rank === 3;

            return (
              <div
                key={member.id}
                className={`py-2.5 rounded-xl border flex items-center justify-between px-3 relative overflow-hidden transition-all ${
                  member.isCurrentUser
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-sm'
                    : 'bg-[#141414] border-white/10 hover:border-white/20'
                }`}
              >
                {/* Left zone indicator */}
                {member.isPromotionZone && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-emerald-500" />
                )}
                {member.isDemotionZone && (
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-amber-500" />
                )}

                <div className="flex items-center gap-2.5 min-w-0">
                  {/* Rank badge */}
                  <div className="w-6 flex items-center justify-center shrink-0">
                    {isFirst ? (
                      <span className="font-mono text-xs font-bold text-amber-400">1</span>
                    ) : isSecond ? (
                      <span className="font-mono text-xs font-bold text-zinc-300">2</span>
                    ) : isThird ? (
                      <span className="font-mono text-xs font-bold text-amber-600">3</span>
                    ) : (
                      <span className="font-mono text-xs font-semibold text-zinc-500">
                        {member.rank}
                      </span>
                    )}
                  </div>

                  {/* Avatar */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-[11px] shrink-0 border ${
                      member.isCurrentUser
                        ? 'bg-emerald-500 text-black border-emerald-400 font-extrabold shadow-sm'
                        : isFirst
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-white/[0.08] text-zinc-300 border-white/10'
                    }`}
                  >
                    {member.initials}
                  </div>

                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-xs truncate ${
                        member.isCurrentUser ? 'font-bold text-emerald-300' : 'font-medium text-white'
                      }`}
                    >
                      {member.name} {member.isCurrentUser && '(You)'}
                    </span>
                    {member.isCurrentUser && (
                      <span className="text-[10px] text-emerald-400/80 font-medium">
                        Active Learner
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-baseline gap-1 shrink-0 font-mono ml-2">
                  <span className="text-xs font-bold text-white tabular-nums">
                    {member.xp.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-zinc-500 font-semibold">XP</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty state when only 1 learner exists */}
        {standings.length <= 1 && (
          <div className="p-4 rounded-2xl glass-panel text-center space-y-2 mt-3">
            <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center mx-auto text-zinc-400">
              <Users className="w-5 h-5 text-emerald-400" />
            </div>
            <h4 className="font-headline font-bold text-xs text-white">
              Pacing the Cohort
            </h4>
            <p className="text-[11px] text-zinc-400 max-w-[280px] mx-auto leading-relaxed">
              You are currently the sole learner in this cohort. As other registered students earn XP, they will appear on this weekly leaderboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

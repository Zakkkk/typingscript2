import { getBigrams, getSkip2grams, getTrigrams } from "./corpusUtil";
import { getFingerKeyMap } from "./getStats";
import loadLayout from "./loadLayout";
import {
  getAlternates,
  getFullScissors,
  getHalfScissors,
  getIn3roll,
  getInrolls,
  getLsb,
  getLss,
  getOut3roll,
  getOutrolls,
  getRedirects,
  getRedirectWeaks,
  getSfbs,
  getSfr,
  getSfs,
  getSfs2,
  getSfsr,
} from "./rules";
import { Command, Corpus, GlobalSettings, Layout, TokenFreq } from "./types";

const getCommand = (
  name: string,
  token: string,
  getSpecificStats: (
    ngrams: TokenFreq,
    fingerKeyMap: TokenFreq,
    layout?: Layout,
  ) => TokenFreq,
  getOverallNGrams: (corpus: Corpus, layout: Layout) => TokenFreq,
  getLayout: boolean,
): Command => {
  const command: Command = {
    token: token,
    args: 1,
    explain: `[layoutname]:\nLists the top 20 ordered ${name} with their frequencies.`,
    action: (gs, args) => {
      const layoutPos = loadLayout(gs, args[0]);
      if (layoutPos == -1) {
        console.log(`${args[0]} was not found.`);
        return;
      }

      const layout = gs.loadedLayouts[layoutPos];

      if (gs.currentCorpora == -1) {
        console.log(
          "No corpus is currently loaded. Run `corpus [corpusname]` to set one.",
        );

        return;
      }

      const ngramsOverall = getOverallNGrams(
        gs.loadedCorpora[gs.currentCorpora],
        gs.loadedLayouts[loadLayout(gs, args[0])],
      );

      let ngrams: TokenFreq;

      if (!getLayout)
        ngrams = getSpecificStats(
          ngramsOverall,
          getFingerKeyMap(gs.loadedLayouts[loadLayout(gs, args[0])]),
        );
      else
        ngrams = getSpecificStats(
          ngramsOverall,
          getFingerKeyMap(gs.loadedLayouts[loadLayout(gs, args[0])]),
          layout,
        );

      const sorted = Object.fromEntries(
        Object.entries(ngrams).sort(([, a], [, b]) => b - a), // Sort by value in descending order
      );

      const topSorted: TokenFreq = {};
      let loopCount = 0;
      for (const ngram in sorted) {
        topSorted[ngram] = sorted[ngram];

        loopCount++;
        if (loopCount >= 20) break;
      }

      console.log(
        `Top 20 ${layout.name} ${name} in ${gs.loadedCorpora[gs.currentCorpora].name}:`,
      );

      let totalTop = 0;

      let i = 1;
      for (const ngram in topSorted) {
        console.log(
          ` ${i}. ${ngram}: ${Math.round(topSorted[ngram]! * 10 ** 5) / 10 ** 3}%`,
        );

        totalTop += Math.round(topSorted[ngram]! * 10 ** 5) / 10 ** 3;

        i++;
      }

      console.log(`Total 20 ${name}: ${totalTop}%`);
    },
  };

  return command;
};

export const allCommands: Command[] = [
  getCommand("sfb's", "sfb", getSfbs, getBigrams, false),
  getCommand("sfr's", "sfr", getSfr, getBigrams, false),
  // @ts-ignore
  getCommand("lsb's", "lsb", getLsb, getBigrams, true),
  // @ts-ignore
  getCommand("lss's", "lss", getLss, getTrigrams, true),
  // @ts-ignore
  getCommand("half scissors", "hs", getHalfScissors, getBigrams, true),
  // @ts-ignore
  getCommand("full scissors", "fs", getFullScissors, getBigrams, true),
  getCommand("sfs's", "sfs", getSfs, getTrigrams, false),
  getCommand("sfs2's", "sfs2", getSfs2, getSkip2grams, false),
  getCommand("sfsr's", "sfsr", getSfsr, getTrigrams, false),
  getCommand("alts", "alt", getAlternates, getTrigrams, false),
  getCommand("redirects", "red", getRedirects, getTrigrams, false),
  getCommand("weak redirects", "wred", getRedirectWeaks, getTrigrams, false),
  getCommand("inrolls", "inroll", getInrolls, getTrigrams, false),
  getCommand("outrolls", "outroll", getOutrolls, getTrigrams, false),
  getCommand("in 3rolls", "in3roll", getIn3roll, getTrigrams, false),
  getCommand("out 3rolls", "out3roll", getOut3roll, getTrigrams, false),
];

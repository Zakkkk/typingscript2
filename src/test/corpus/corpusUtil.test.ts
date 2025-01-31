import { expect, test } from "vitest";

import fs from "fs";
import { Corpus, Layout } from "../../types";

import { loadCorpus } from "../../corpus/loadCorpus";
import parseCorpus from "../../corpus/parseCorpus";

import { getMonograms } from "../../corpus/corpusUtil";

fs.writeFileSync("corpus/test/corpusUtil1.txt", `a b c hi jk lm na`, {
  flag: "w",
});

parseCorpus("test/corpusUtil1.txt", "test/corpusUtil1");
// @ts-ignore
const corpusUtit1: Corpus = loadCorpus("test/corpusUtil1", false);

const layout: Layout = {
  name: "test",
  rows: ["abcdefghij", "klmno*qrst", "uvwxyz.;,'", "p"],
  fingermap: ["0123366789", "0123366789", "0123366789", "4"],
  hasMagic: true,
  magicIdentifier: "*",
  magicRules: ["hi", "jk", "lm"],
};

test("Monogram collection", () => {
  const monograms1 = getMonograms(corpusUtit1, layout);
  const monograms1Total = 11;
  expect(monograms1).toMatchObject({
    a: 2 / monograms1Total,
    b: 1 / monograms1Total,
    c: 1 / monograms1Total,
    h: 1 / monograms1Total,
    "*": 3 / monograms1Total,
    j: 1 / monograms1Total,
    l: 1 / monograms1Total,
    n: 1 / monograms1Total,
  });
});

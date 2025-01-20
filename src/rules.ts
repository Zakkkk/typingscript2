import { Layout, TokenFreq } from "./types";

const getHand = (finger: number): number => (finger < 5 ? 0 : 1);

export const getSfbs = (
  bigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
): TokenFreq => {
  const sfbs: TokenFreq = {};

  for (const bigram in bigrams) {
    if (
      fingerKeyMap[bigram[0]] == fingerKeyMap[bigram[1]] &&
      bigram[0] != bigram[1]
    )
      sfbs[bigram] = bigrams[bigram];
  }

  return sfbs;
};

export const getLsb = (
  bigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
  layout: Layout,
): TokenFreq => {
  const lsb: TokenFreq = {};

  const getX = (key: string) => {
    for (let i = 0; i < layout.rows.length; i++) {
      if (layout.rows[i].includes(key)) return layout.rows[i].indexOf(key);
    }

    return -1;
  };

  for (const bigram in bigrams) {
    if (
      getHand(fingerKeyMap[bigram[0]]) == getHand(fingerKeyMap[bigram[1]]) &&
      Math.abs(fingerKeyMap[bigram[0]] - fingerKeyMap[bigram[1]]) == 1 &&
      Math.abs(getX(bigram[0]) - getX(bigram[1])) >= 2
    )
      lsb[bigram] = bigrams[bigram];
  }

  return lsb;
};

export const getHalfScissors = (
  bigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
  layout: Layout,
): TokenFreq => {
  const halfScissor: TokenFreq = {};

  const getY = (key: string) => {
    for (let i = 0; i < layout.rows.length; i++) {
      if (layout.rows[i].includes(key)) return i;
    }

    return -1;
  };

  for (const bigram in bigrams) {
    if (
      getHand(fingerKeyMap[bigram[0]]) == getHand(fingerKeyMap[bigram[1]]) &&
      fingerKeyMap[bigram[0]] != fingerKeyMap[bigram[1]] &&
      Math.abs(getY(bigram[0]) - getY(bigram[1])) == 1 &&
      [1, 2, 7, 8].includes(
        fingerKeyMap[getY(bigram[0]) > getY(bigram[1]) ? bigram[0] : bigram[1]],
      )
    )
      halfScissor[bigram] = bigrams[bigram];
  }

  return halfScissor;
};

export const getFullScissors = (
  bigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
  layout: Layout,
): TokenFreq => {
  const fullScissor: TokenFreq = {};

  const getY = (key: string) => {
    for (let i = 0; i < layout.rows.length; i++) {
      if (layout.rows[i].includes(key)) return i;
    }

    return -1;
  };

  for (const bigram in bigrams) {
    if (
      getHand(fingerKeyMap[bigram[0]]) == getHand(fingerKeyMap[bigram[1]]) &&
      fingerKeyMap[bigram[0]] != fingerKeyMap[bigram[1]] &&
      Math.abs(getY(bigram[0]) - getY(bigram[1])) >= 2 &&
      ![3, 4, 5, 6].includes(
        fingerKeyMap[getY(bigram[0]) > getY(bigram[1]) ? bigram[0] : bigram[1]],
      )
    )
      fullScissor[bigram] = bigrams[bigram];
  }

  return fullScissor;
};

export const getSfr = (
  bigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
): TokenFreq => {
  const sfr: TokenFreq = {};

  for (const bigram in bigrams) {
    if (
      fingerKeyMap[bigram[0]] == fingerKeyMap[bigram[1]] &&
      bigram[0] == bigram[1]
    )
      sfr[bigram] = bigrams[bigram];
  }

  return sfr;
};

export const getSfs = (
  trigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
): TokenFreq => {
  const sfs: TokenFreq = {};

  const addGramAmount = (
    gram: string,
    amount: number,
    ngram: Record<string, number>,
  ) => {
    if (gram in ngram) ngram[gram] += amount;
    else ngram[gram] = amount;
  };

  for (const trigram in trigrams) {
    if (
      fingerKeyMap[trigram[0]] == fingerKeyMap[trigram[2]] &&
      trigram[0] != trigram[2]
    ) {
      addGramAmount(trigram[0] + trigram[2], trigrams[trigram], sfs);
    }
  }

  return sfs;
};

export const getLss = (
  trigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
  layout: Layout,
): TokenFreq => {
  const lss: TokenFreq = {};

  const getX = (key: string) => {
    for (let i = 0; i < layout.rows.length; i++) {
      if (layout.rows[i].includes(key)) return layout.rows[i].indexOf(key);
    }

    return -1;
  };

  const addGramAmount = (
    gram: string,
    amount: number,
    ngram: Record<string, number>,
  ) => {
    if (gram in ngram) ngram[gram] += amount;
    else ngram[gram] = amount;
  };

  for (const trigram in trigrams) {
    if (
      getHand(fingerKeyMap[trigram[0]]) == getHand(fingerKeyMap[trigram[2]]) &&
      Math.abs(fingerKeyMap[trigram[0]] - fingerKeyMap[trigram[2]]) == 1 &&
      Math.abs(getX(trigram[0]) - getX(trigram[2])) >= 2
    )
      addGramAmount(trigram[0] + trigram[2], trigrams[trigram], lss);
  }

  return lss;
};

export const getSfs2 = (
  skip2grams: TokenFreq,
  fingerKeyMap: TokenFreq,
): TokenFreq => {
  const sfs2: TokenFreq = {};

  for (const skip2gram in skip2grams) {
    if (
      fingerKeyMap[skip2gram[0]] == fingerKeyMap[skip2gram[1]] &&
      skip2gram[0] != skip2gram[1]
    ) {
      sfs2[skip2gram] = skip2grams[skip2gram];
    }
  }

  return sfs2;
};

export const getSfsr = (
  trigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
): TokenFreq => {
  const sfsr: TokenFreq = {};

  for (const trigram in trigrams) {
    if (
      fingerKeyMap[trigram[0]] == fingerKeyMap[trigram[2]] &&
      trigram[0] == trigram[2]
    ) {
      sfsr[trigram] = trigrams[trigram];
    }
  }

  return sfsr;
};

export const getAlternates = (
  trigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
): TokenFreq => {
  const alt: TokenFreq = {};

  const getHandFromKey = (key: string) => getHand(fingerKeyMap[key]);

  for (const trigram in trigrams) {
    if (
      getHandFromKey(trigram[0]) != getHandFromKey(trigram[1]) &&
      getHandFromKey(trigram[1]) != getHandFromKey(trigram[2])
    ) {
      alt[trigram] = trigrams[trigram];
    }
  }

  return alt;
};

export const getRedirects = (
  trigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
): TokenFreq => {
  const redirect: TokenFreq = {};

  const getHandFromKey = (key: string) => getHand(fingerKeyMap[key]);
  const isThumb = (key: string): boolean =>
    fingerKeyMap[key] == 4 || fingerKeyMap[key] == 5;

  for (const trigram in trigrams) {
    const a = trigram[0];
    const b = trigram[1];
    const c = trigram[2];

    if (
      getHandFromKey(a) == getHandFromKey(b) &&
      getHandFromKey(b) == getHandFromKey(c) &&
      fingerKeyMap[a] != fingerKeyMap[b] &&
      fingerKeyMap[b] != fingerKeyMap[c] &&
      fingerKeyMap[a] < fingerKeyMap[b] != fingerKeyMap[b] < fingerKeyMap[c] &&
      !isThumb(a) &&
      !isThumb(b) &&
      !isThumb(c)
    ) {
      redirect[trigram] = trigrams[trigram];
    }
  }

  return redirect;
};

export const getRedirectWeaks = (
  trigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
): TokenFreq => {
  const redirectWeak: TokenFreq = {};

  const getHandFromKey = (key: string) => getHand(fingerKeyMap[key]);

  const isThumb = (key: string): boolean =>
    fingerKeyMap[key] == 4 || fingerKeyMap[key] == 5;

  const isIndex = (letter: string) =>
    fingerKeyMap[letter] == 3 || fingerKeyMap[letter] == 6;

  for (const trigram in trigrams) {
    const a = trigram[0];
    const b = trigram[1];
    const c = trigram[2];

    if (
      getHandFromKey(a) == getHandFromKey(b) &&
      getHandFromKey(b) == getHandFromKey(c) &&
      fingerKeyMap[a] != fingerKeyMap[b] &&
      fingerKeyMap[b] != fingerKeyMap[c] &&
      fingerKeyMap[a] < fingerKeyMap[b] != fingerKeyMap[b] < fingerKeyMap[c] &&
      !isIndex(a) &&
      !isIndex(b) &&
      !isIndex(c) &&
      !isThumb(a) &&
      !isThumb(b) &&
      !isThumb(c)
    ) {
      redirectWeak[trigram] = trigrams[trigram];
    }
  }

  return redirectWeak;
};

export const getInrolls = (
  trigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
): TokenFreq => {
  const inroll: TokenFreq = {};

  const getHandFromKey = (key: string) => getHand(fingerKeyMap[key]);

  const roll = (trigram: string) =>
    getHandFromKey(trigram[0]) != getHandFromKey(trigram[2]) &&
    fingerKeyMap[trigram[0]] != fingerKeyMap[trigram[1]] &&
    fingerKeyMap[trigram[1]] != fingerKeyMap[trigram[2]];

  for (const trigram in trigrams) {
    if (
      roll(trigram) &&
      Number(
        getHandFromKey(trigram[0]) == getHandFromKey(trigram[1])
          ? fingerKeyMap[trigram[0]] > fingerKeyMap[trigram[1]]
          : fingerKeyMap[trigram[2]] < fingerKeyMap[trigram[1]],
      ) == getHandFromKey(trigram[1])
    ) {
      inroll[trigram] = trigrams[trigram];
    }
  }

  return inroll;
};

export const getOutrolls = (
  trigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
): TokenFreq => {
  const outroll: TokenFreq = {};

  const getHandFromKey = (key: string) => getHand(fingerKeyMap[key]);

  const roll = (trigram: string) =>
    getHandFromKey(trigram[0]) != getHandFromKey(trigram[2]) &&
    fingerKeyMap[trigram[0]] != fingerKeyMap[trigram[1]] &&
    fingerKeyMap[trigram[1]] != fingerKeyMap[trigram[2]];

  for (const trigram in trigrams) {
    if (
      roll(trigram) &&
      Number(
        getHandFromKey(trigram[0]) == getHandFromKey(trigram[1])
          ? fingerKeyMap[trigram[0]] > fingerKeyMap[trigram[1]]
          : fingerKeyMap[trigram[2]] < fingerKeyMap[trigram[1]],
      ) != getHandFromKey(trigram[1])
    ) {
      outroll[trigram] = trigrams[trigram];
    }
  }

  return outroll;
};

export const getIn3roll = (
  trigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
): TokenFreq => {
  const in3roll: TokenFreq = {};

  const getHandFromKey = (key: string) => getHand(fingerKeyMap[key]);

  const onehand = (trigram: string) =>
    getHandFromKey(trigram[0]) == getHandFromKey(trigram[1]) &&
    getHandFromKey(trigram[1]) == getHandFromKey(trigram[2]) &&
    fingerKeyMap[trigram[0]] != fingerKeyMap[trigram[1]] &&
    fingerKeyMap[trigram[1]] != fingerKeyMap[trigram[2]] &&
    fingerKeyMap[trigram[0]] != fingerKeyMap[trigram[2]] &&
    fingerKeyMap[trigram[0]] < fingerKeyMap[trigram[1]] ==
      fingerKeyMap[trigram[1]] < fingerKeyMap[trigram[2]];

  for (const trigram in trigrams) {
    if (
      onehand(trigram) &&
      Number(fingerKeyMap[trigram[0]] < fingerKeyMap[trigram[1]]) !=
        getHandFromKey(trigram[0])
    ) {
      in3roll[trigram] = trigrams[trigram];
    }
  }

  return in3roll;
};

export const getOut3roll = (
  trigrams: TokenFreq,
  fingerKeyMap: TokenFreq,
): TokenFreq => {
  const out3roll: TokenFreq = {};

  const getHandFromKey = (key: string) => getHand(fingerKeyMap[key]);

  const onehand = (trigram: string) =>
    getHandFromKey(trigram[0]) == getHandFromKey(trigram[1]) &&
    getHandFromKey(trigram[1]) == getHandFromKey(trigram[2]) &&
    fingerKeyMap[trigram[0]] != fingerKeyMap[trigram[1]] &&
    fingerKeyMap[trigram[1]] != fingerKeyMap[trigram[2]] &&
    fingerKeyMap[trigram[0]] != fingerKeyMap[trigram[2]] &&
    fingerKeyMap[trigram[0]] < fingerKeyMap[trigram[1]] ==
      fingerKeyMap[trigram[1]] < fingerKeyMap[trigram[2]];

  for (const trigram in trigrams) {
    if (
      onehand(trigram) &&
      Number(fingerKeyMap[trigram[0]] < fingerKeyMap[trigram[1]]) ==
        getHandFromKey(trigram[0])
    ) {
      out3roll[trigram] = trigrams[trigram];
    }
  }

  return out3roll;
};

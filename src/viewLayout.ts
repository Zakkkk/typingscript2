import loadLayout from "./loadLayout";
import { GlobalSettings, Layout, LayoutStats } from "./types";
import {
  getBigrams,
  getMonograms,
  getSkip2grams,
  getTrigrams,
} from "./corpusUtil";
import getLayoutStats from "./getLayoutStats";
import getStats from "./getStats";

const viewLayout = (gs: GlobalSettings, layoutName: string) => {
  const layoutPosition = loadLayout(gs, layoutName);

  if (layoutPosition == -1) {
    console.log(`Layout ${layoutName} was not found.`);
    return;
  }

  let layout = gs.loadedLayouts[layoutPosition];

  console.log(layout.name);

  layout.rows.forEach((row) => {
    console.log(`\t${row.split("").join(" ")}`);
  });

  if (gs.currentCorpora != -1) {
    const stats: LayoutStats = getStats(
      layout,
      gs.loadedCorpora[gs.currentCorpora],
      {
        heatmapScore: true,
        handbalanceScore: true,
        sfb: true,
        alternate: true,
        inroll: true,
      },
    );

    console.log(
      ` Heatmap score: ${Math.round(stats.heatmapScore! * 10 ** 5) / 10 ** 5}\n`,
      `Handbalance: ${Math.round(stats.handbalanceScore! * 10 ** 5) / 10 ** 3}% / ${100 - Math.round(stats.handbalanceScore! * 10 ** 5) / 10 ** 3}%\n`,
      `Sfb: ${Math.round(stats.sfb! * 10 ** 5) / 10 ** 3}%\n`,
      `Alt: ${Math.round(stats.alternate! * 10 ** 5) / 10 ** 3}%\n`,
      `Inroll: ${Math.round(stats.inroll! * 10 ** 5) / 10 ** 3}%\n`,
    );
  } else {
    console.log("No corpus loaded to show stats.");
  }
};

export default viewLayout;

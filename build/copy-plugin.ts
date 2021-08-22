import type {ResolvedConfig} from "vite";
import {Plugin} from "vite";
import {resolve} from "path";
import {promises as fs} from "fs";

/**
 * Create indexes for each series from /public/data in the base dir
 * Makes pages accessible without needing to resort to hash mode in vue router
 */

const copyIndexFile = (): Plugin => {
  let config: ResolvedConfig;
  return {
    name: "create indexes",
    configResolved(resolvedConfig: ResolvedConfig) {
      config = resolvedConfig;
    },
    async writeBundle() {
      const buildDir: string = config.build.outDir;
      const indexFileName: string = "index.html";
      const indexPath: string = resolve(config.root, buildDir, indexFileName);

      let seriesPath = resolve(config.root, "public", "data");

      const seriesDirs = await fs.readdir(seriesPath);

      for (const seriesDir of seriesDirs) {
        const newDirPath = resolve(buildDir, seriesDir);
        const newIndexPath = resolve(newDirPath, indexFileName);
        await fs.mkdir(newDirPath);
        await fs.copyFile(indexPath, newIndexPath);
      }
    },
  };
};

export default copyIndexFile;

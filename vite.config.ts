import { defineConfig } from "vite";
import path from "node:path";
import fs from "node:fs/promises";


const SYSTEM_ID = "huyen-viet-vtt";
const BUILD_ROOT = path.resolve(__dirname, "build", SYSTEM_ID);


function copyStaticDirsPlugin() {
    const dirsToCopy = [
        {
            src: path.resolve(__dirname, "templates"),
            dest: path.resolve(BUILD_ROOT, "templates")
        },
        {
            src: path.resolve(__dirname, "lang"),
            dest: path.resolve(BUILD_ROOT, "lang")
        }
    ];

    return {
        name: "copy-foundry-static-dirs",

        buildStart() {
            for (const dir of dirsToCopy) {
                this.addWatchFile(dir.src);
            }
        },

        async writeBundle() {
            for (const dir of dirsToCopy) {
                await fs.cp(dir.src, dir.dest, {
                    recursive: true,
                    force: true
                });
                console.log(`[vite] copied ${dir.src} -> ${dir.dest}`);
            }
        }
    };
}


export default defineConfig({
    build: {
        outDir: path.resolve(__dirname, `build/${SYSTEM_ID}/module`),
        emptyOutDir: false,
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, "module/boilerplate.ts"),
            formats: ["es"],
            fileName: () => `${SYSTEM_ID}.mjs`
        },
        rollupOptions: {
            output: {
                entryFileNames: `${SYSTEM_ID}.mjs`,
                chunkFileNames: "chunks/[name]-[hash].mjs",
                assetFileNames: "assets/[name]-[hash][extname]"
            }
        }
    },
    plugins: [
        copyStaticDirsPlugin()
    ]
});
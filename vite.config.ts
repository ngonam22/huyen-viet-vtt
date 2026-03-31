import { defineConfig } from "vite";
import path from "node:path";
import fs from "node:fs/promises";
import tailwindcss from '@tailwindcss/vite'


const SYSTEM_ID = "huyen-viet-vtt";
const BUILD_ROOT = path.resolve(__dirname, "build", SYSTEM_ID);


function copyStaticDirsPlugin() {
    const dirsToCopy = [
        { src: path.resolve(__dirname, "templates"), dest: path.resolve(BUILD_ROOT, "templates") },
        { src: path.resolve(__dirname, "lang"),      dest: path.resolve(BUILD_ROOT, "lang") },
        { src: path.resolve(__dirname, "assets"),    dest: path.resolve(BUILD_ROOT, "assets") },
        { src: path.resolve(__dirname, "packs"),     dest: path.resolve(BUILD_ROOT, "packs") },
        { src: path.resolve(__dirname, "lib"),       dest: path.resolve(BUILD_ROOT, "lib") },
    ];

    const filesToCopy = [
        { src: path.resolve(__dirname, "system.json"),                    dest: path.resolve(BUILD_ROOT, "system.json") },
        { src: path.resolve(__dirname, "template.json"),                  dest: path.resolve(BUILD_ROOT, "template.json") },
        { src: path.resolve(__dirname, "character-creation-config.json"), dest: path.resolve(BUILD_ROOT, "character-creation-config.json") },
    ];

    return {
        name: "copy-foundry-static-dirs",

        buildStart() {
            for (const dir of dirsToCopy) this.addWatchFile(dir.src);
            for (const file of filesToCopy) this.addWatchFile(file.src);
        },

        async writeBundle() {
            for (const dir of dirsToCopy) {
                await fs.cp(dir.src, dir.dest, { recursive: true, force: true });
                console.log(`[vite] copied ${dir.src} -> ${dir.dest}`);
            }
            for (const file of filesToCopy) {
                await fs.copyFile(file.src, file.dest);
                console.log(`[vite] copied ${file.src} -> ${file.dest}`);
            }
        }
    };
}


export default defineConfig({
    build: {
        // outDir: path.resolve(__dirname, `build/${SYSTEM_ID}/module`),
        outDir: BUILD_ROOT,
        emptyOutDir: false,
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, "module/boilerplate.ts"),
            formats: ["es"],
            fileName: () => `module/${SYSTEM_ID}.mjs`,
            cssFileName: SYSTEM_ID
        },
        rollupOptions: {
            output: {
                entryFileNames: `module/${SYSTEM_ID}.mjs`,
                chunkFileNames: "module/chunks/[name]-[hash].mjs",
                assetFileNames: (assetInfo) => {
                    const name = assetInfo.name ?? "";

                    if (name.endsWith(".css")) {
                        return "css/[name][extname]";
                    }

                    return "assets/[name]-[hash][extname]";
                }
            }
        }
    },
    plugins: [
        copyStaticDirsPlugin(),
        tailwindcss()
    ]
});
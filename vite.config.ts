import { defineConfig } from "vite";
import path from "node:path";
import fs from "node:fs/promises";
import tailwindcss from '@tailwindcss/vite'


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
        // outDir: path.resolve(__dirname, `build/${SYSTEM_ID}/module`),
        outDir: path.resolve(__dirname, `build/${SYSTEM_ID}`),
        emptyOutDir: false,
        sourcemap: true,
        lib: {
            entry: path.resolve(__dirname, "module/boilerplate.ts"),
            formats: ["es"],
            fileName: () => `${SYSTEM_ID}.mjs`
        },
        rollupOptions: {
            input: {
                style: path.resolve(__dirname, "scss/huyen-viet-vtt.scss")
            },
            output: {
                // 👇 JS vào module/
                entryFileNames: (chunk) => {
                    if (chunk.name === "main") {
                        return `module/${SYSTEM_ID}.mjs`;
                    }
                    return `[name].js`;
                },
                // 👇 CSS ra css/
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name?.endsWith(".css")) {
                        return "css/huyen-viet-vtt.css";
                    }
                    return "assets/[name]-[hash][extname]";
                },

                chunkFileNames: "module/chunks/[name]-[hash].mjs"
            }
        }
    },
    plugins: [
        copyStaticDirsPlugin(),
        tailwindcss(),
    ]
});
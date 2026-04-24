/**
 * Central configuration barrel file.
 *
 * All config values live in feature-specific files under ./config/.
 * This file re-exports everything so that existing imports from
 * "./config", "../helpers/config", or "../helpers/config.ts"
 * continue to work without any changes.
 */

export * from "./config/base";
export * from "./config/boi-canh";
export * from "./config/thi-toc";
export * from "./config/gia-canh";
export * from "./config/thuat-thuc";
export * from "./config/mon-phai";
export * from "./config/progression";
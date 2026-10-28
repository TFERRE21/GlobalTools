#!/usr/bin/env node
"use strict";

// Long-lived worker: launch an SEO collection cycle immediately, then repeat.
const { spawn } = require("child_process");
const path = require("path");
const ROOT = path.resolve(__dirname, "..");
const SCRIPT = path.join(__dirname, "seo-robot.js");
const INTERVAL_MS = Math.max(1, Number(process.env.SEO_INTERVAL_MINUTES || 5)) * 60_000;
const SEO_DATA_DIR = process.env.SEO_DATA_DIR || "/var/lib/globaltools/seo";
let stopping = false;
let active = null;
let timer = null;
let count = 0;
function cycle() {
  if (stopping || active) return;
  console.log("[seo-worker] cycle starting", count + 1);
  active = spawn(process.execPath, [SCRIPT], {
    cwd: ROOT, env: { ...process.env, SEO_DATA_DIR }, stdio: "inherit"
  });
  active.on("error", error => console.error("[seo-worker] spawn error", error.message));
  active.on("close", (code, signal) => {
    active = null;
    count += 1;
    console.log("[seo-worker] cycle finished", { count, code, signal, nextMinutes: INTERVAL_MS / 60000 });
  });
}
function schedule() {
  if (stopping) return;
  timer = setTimeout(() => { cycle(); schedule(); }, INTERVAL_MS);
}
function stop() {
  stopping = true;
  if (timer) clearTimeout(timer);
  if (active) active.kill("SIGTERM");
}
process.on("SIGTERM", stop);
process.on("SIGINT", stop);
console.log("[seo-worker] persistent worker online; every", INTERVAL_MS / 60000, "minutes");
cycle();
schedule();

#!/usr/bin/env node
"use strict";

// Persistent Oolivo SEO worker: runs once at startup, then repeats every 5 minutes.
const { spawn } = require("child_process");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SCRIPT = path.join(__dirname, "seo-robot.js");
const INTERVAL_MS = Math.max(1, Number(process.env.SEO_INTERVAL_MINUTES || 5)) * 60 * 1000;
let stopping = false;
let active = null;
let timer = null;

function runOnce() {
  if (stopping || active) return;
  console.log("[seo-worker] Starting SEO discovery cycle.");
  active = spawn(process.execPath, [SCRIPT], {
    cwd: ROOT,
    env: { ...process.env, SEO_DATA_DIR: process.env.SEO_DATA_DIR || "/var/lib/globaltools/seo" },
    stdio: "inherit"
  });
  active.on("error", err => console.error("[seo-worker] Could not start SEO robot:", err.message));
  active.on("close", (code, signal) => {
    active = null;
    console.log(`[seo-worker] Cycle finished (code=${code}, signal=${signal || "none"}). Next cycle in ${INTERVAL_MS / 60000} minutes.`);
  });
}

function schedule() {
  if (stopping) return;
  timer = setTimeout(() => {
    runOnce();
    schedule();
  }, INTERVAL_MS);
}
function stop(signal) {
  if (stopping) return;
  stopping = true;
  if (timer) clearTimeout(timer);
  if (active) active.kill(signal || "SIGTERM");
  console.log("[seo-worker] Stopped.");
}
process.on("SIGTERM", () => stop("SIGTERM"));
process.on("SIGINT", () => stop("SIGINT"));
console.log(`[seo-worker] Persistent worker online; interval=${INTERVAL_MS / 60000} minutes.`);
runOnce();
schedule();

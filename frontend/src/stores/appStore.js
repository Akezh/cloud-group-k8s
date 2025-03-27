import { writable } from "svelte/store";

export const transcription = writable("");
export const summary = writable("");
export const currentStep = writable(1);
export const isLoading = writable(false);
export const error = writable(null);

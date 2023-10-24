import { writable } from 'svelte/store';

export const visibleTooltip = writable('');
export const isFocus = writable(false);
export const tooltipHTMLElement = writable();
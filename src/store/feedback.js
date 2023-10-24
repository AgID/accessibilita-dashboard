import { writable } from 'svelte/store';


export const sceltaProfessione = writable();
export const sceltaWeb = writable();
export const feedback = writable("si");
export const details = writable("");

export const resetValue = () => {
    sceltaProfessione.set(null);
    sceltaWeb.set(null);
    details.set("");
    feedback.set(null);
}
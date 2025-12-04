import { writable } from 'svelte/store';
//create the store with initial state
function createMeditationStore() {
    const { subscribe, set, update } = writable({
        selectedVisual: null,
        selectedDuration: null,
        moodBefore: null,
        intensityBefore: null,
        moodAfter: null,
        intensityAfter: null
    });
    return {
        subscribe,
        //set the selected visual
        setVisual: (visual) => {
            update(state => ({
                ...state,
                selectedVisual: visual
            }));
        },
        //set the selected duration
        setDuration: (duration) => {
            update(state => ({
                ...state,
                selectedDuration: duration
            }));
        },
        //set mood before meditation
        setMoodBefore: (mood, intensity) => {
            update(state => ({
                ...state,
                moodBefore: mood,
                intensityBefore: intensity
            }));
        },
        //set mood after meditation
        setMoodAfter: (mood, intensity) => {
            update(state => ({
                ...state,
                moodAfter: mood,
                intensityAfter: intensity
            }));
        },
        //set both visual and duration at once
        setMeditation: (visual, duration) => {
            set({
                selectedVisual: visual,
                selectedDuration: duration,
                moodBefore: null,
                intensityBefore: null,
                moodAfter: null,
                intensityAfter: null
            });
        },
        //get current visual selection
        getVisual: () => {
            let currentVisual = null;
            subscribe(state => {
                currentVisual = state.selectedVisual;
            })();
            return currentVisual;
        },
        //get current duration selection
        getDuration: () => {
            let currentDuration = null;
            subscribe(state => {
                currentDuration = state.selectedDuration;
            })();
            return currentDuration;
        },
        //get complete state
        getState: () => {
            let currentState = {
                selectedVisual: null,
                selectedDuration: null,
                moodBefore: null,
                intensityBefore: null,
                moodAfter: null,
                intensityAfter: null
            };
            subscribe(state => {
                currentState = state;
            })();
            return currentState;
        },
        //clear the visual selection
        clearVisual: () => {
            update(state => ({
                ...state,
                selectedVisual: null
            }));
        },
        //clear the duration selection
        clearDuration: () => {
            update(state => ({
                ...state,
                selectedDuration: null
            }));
        },
        //reset entire store
        reset: () => {
            set({
                selectedVisual: null,
                selectedDuration: null,
                moodBefore: null,
                intensityBefore: null,
                moodAfter: null,
                intensityAfter: null
            });
        }
    };
}
export const visualStore = createMeditationStore();

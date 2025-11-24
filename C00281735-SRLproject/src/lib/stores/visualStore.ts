import { writable } from 'svelte/store';

export type VisualType = 'lava-lamp' | 'flowing-goo' | null;

interface MeditationState {
	selectedVisual: VisualType;
	selectedDuration: number | null; // duration in seconds
}

//create the store with initial state
function createMeditationStore() {
	const { subscribe, set, update } = writable<MeditationState>({
		selectedVisual: null,
		selectedDuration: null
	});

	return {
		subscribe,
		//set the selected visual
		setVisual: (visual: VisualType) => {
			update(state => ({
				...state,
				selectedVisual: visual
			}));
		},
		//set the selected duration
		setDuration: (duration: number) => {
			update(state => ({
				...state,
				selectedDuration: duration
			}));
		},
		//set both visual and duration at once
		setMeditation: (visual: VisualType, duration: number) => {
			set({
				selectedVisual: visual,
				selectedDuration: duration
			});
		},
		//get current visual selection
		getVisual: () => {
			let currentVisual: VisualType = null;
			subscribe(state => {
				currentVisual = state.selectedVisual;
			})();
			return currentVisual;
		},
		//get current duration selection
		getDuration: () => {
			let currentDuration: number | null = null;
			subscribe(state => {
				currentDuration = state.selectedDuration;
			})();
			return currentDuration;
		},
		//get complete state
		getState: () => {
			let currentState: MeditationState = {
				selectedVisual: null,
				selectedDuration: null
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
				selectedDuration: null
			});
		}
	};
}

export const visualStore = createMeditationStore();
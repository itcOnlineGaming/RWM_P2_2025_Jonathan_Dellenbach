export type VisualType = 'lava-lamp' | 'flowing-goo' | null;
interface MeditationState {
    selectedVisual: VisualType;
    selectedDuration: number | null;
    moodBefore: string | null;
    intensityBefore: number | null;
    moodAfter: string | null;
    intensityAfter: number | null;
}
export declare const visualStore: {
    subscribe: (this: void, run: import("svelte/store").Subscriber<MeditationState>, invalidate?: () => void) => import("svelte/store").Unsubscriber;
    setVisual: (visual: VisualType) => void;
    setDuration: (duration: number) => void;
    setMoodBefore: (mood: string, intensity: number) => void;
    setMoodAfter: (mood: string, intensity: number) => void;
    setMeditation: (visual: VisualType, duration: number) => void;
    getVisual: () => null;
    getDuration: () => null;
    getState: () => MeditationState;
    clearVisual: () => void;
    clearDuration: () => void;
    reset: () => void;
};
export {};

interface Props {
    onSelect: (duration: number) => void;
    selectedDuration?: number | null;
    onStart?: () => void;
    selectedVisual?: string | null;
}
declare const TimerOption: import("svelte").Component<Props, {}, "">;
type TimerOption = ReturnType<typeof TimerOption>;
export default TimerOption;

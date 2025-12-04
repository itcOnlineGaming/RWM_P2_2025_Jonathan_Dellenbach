interface Props {
    onSelect: (visual: string) => void;
    selectedVisual?: string | null;
    onSubmit?: () => void;
}
declare const VisualOption: import("svelte").Component<Props, {}, "">;
type VisualOption = ReturnType<typeof VisualOption>;
export default VisualOption;


export interface PopUpProps {
    message : string;
    onClose: () => void;
    onResponse?: (response: boolean) => void;
}
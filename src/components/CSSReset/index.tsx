import './normalize.scss';

interface CSSResetProps {
    children: React.ReactNode;
}

export default function CSSReset({ children }: CSSResetProps) {
    return (
        <>
            {children}
        </>
    );
}
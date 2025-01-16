export default function Footer() {
    function getYear(): number {
        return new Date().getFullYear();
    }

    return (
        <div className="flex items-center justify-center">
            <p className="text-lightGrey text-opacity-40 text-xs font-semibold">
                © Bruno C. Terribile {getYear()}
            </p>
        </div>
    );
}
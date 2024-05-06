export default function ProgressBar({
    score,
    total,
}: {
    score: number;
    total: number;
}) {
    const value = Math.round(100 * (score / total));
    return (
        <div>
            <div
                className=" grid place-items-center w-[250px] aspect-square rounded-full "
                style={{
                    background: `conic-gradient(${
                        value < 30
                            ? "#C40C0C"
                            : value < 45
                            ? "#FF6500"
                            : value < 65
                            ? "#C3FF93"
                            : value < 75
                            ? "#7ABA78"
                            : "#41B06E"
                    } ${value}%, #EEF7FF 0%)`,
                }}
            >
                <div className=" place-items-center bg-background w-[200px] aspect-square grid rounded-full text-3xl ">
                    {value}%
                </div>
            </div>
        </div>
    );
}

import { webDevelopmentQuiz } from "@/constants";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Circle } from "lucide-react";
import ProgressBar from "./progressBar";
import FormComponent from "./form";
import trophy from "@/assets/trophy.gif";

export type Question = {
    question: string;
    choices: string[];
    type: string;
    correctAnswer: string;
};

export default function Quiz() {
    const startTime = 120;
    const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState<number | null>(null);
    const [answer, setAnswer] = useState<boolean | null>(null);
    const [result, setResult] = useState({
        totalScore: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });
    const [showResult, setShowResult] = useState(false);
    const [choiceDisabled, setChoiceDisabled] = useState(false);
    const [timeLeft, setTimeLeft] = useState(startTime); // 10 minutes timer
    const [timer, setTimer] = useState<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        // Shuffle the questions array
        const shuffledQuestions = webDevelopmentQuiz.questions.sort(
            () => Math.random() - 0.5
        );
        // Select the first 5 questions
        const selected = shuffledQuestions.slice(0, 15);
        setSelectedQuestions(selected);

        // Start the timer
        const intervalId = setInterval(() => {
            setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
        }, 1000);
        setTimer(intervalId);

        // Clean up the timer when the component unmounts
        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, []); // Empty dependency array to run only once on mount

    useEffect(() => {
        if (timeLeft > 0) {
            const intervalId = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            }, 1000);
            setTimer(intervalId);
        } else {
            setCurrentQuestion(0);
            setShowResult(true);
            setChoiceDisabled(false); // Enable choices for the next question
            setAnswer(null); // Reset answer state
            setAnswerIdx(null); // Set showResult to true when timeLeft is 0
        }

        return () => {
            if (timer) {
                clearInterval(timer);
            }
        };
    }, [timeLeft, timer]);

    if (
        selectedQuestions.length === 0 ||
        currentQuestion >= selectedQuestions.length
    ) {
        return null; // Add loading state or handle empty questions array
    }

    const { question, choices, correctAnswer } =
        selectedQuestions[currentQuestion];

    const onAnswerClick = (choice: string, index: number) => {
        if (!choiceDisabled) {
            setChoiceDisabled(true); // Disable choices
            setAnswerIdx(index);
            if (choice === correctAnswer) {
                setAnswer(true);
                setResult((prev) => ({
                    ...prev,
                    totalScore: prev.totalScore + 1,
                    correctAnswers: prev.correctAnswers + 1,
                }));
            } else {
                setAnswer(false);
                setResult((prev) => ({
                    ...prev,
                    wrongAnswers: prev.wrongAnswers + 1,
                }));
            }
        }
    };

    const next = () => {
        if (currentQuestion !== selectedQuestions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setCurrentQuestion(0);
            setShowResult(true);
        }
        setChoiceDisabled(false); // Enable choices for the next question
        setAnswer(null); // Reset answer state
        setAnswerIdx(null);
    };

    const tryAgain = () => {
        setResult({
            totalScore: 0,
            correctAnswers: 0,
            wrongAnswers: 0,
        });
        setShowResult(false);
        setTimeLeft(startTime); // Reset timer to 10 minutes
    };

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTimeLeft = `${minutes < 10 ? "0" : ""}${minutes}:${
        seconds < 10 ? "0" : ""
    }${seconds}`;

    const progress = Math.round(
        100 * ((currentQuestion + 1) / selectedQuestions.length)
    );

    return (
        <div>
            {showResult ? (
                <div>
                    <div className="mt-5 md:mt-[5rem] flex gap-10 flex-col items-center justify-center ">
                        <div className="border border-muted/40 rounded-lg px-4 py-10 w-full text-center">
                            <h2 className="text-lg font-semibold mb-3">
                                Quiz Results
                            </h2>
                            <div className=" flex items-center justify-center ">
                                <img src={trophy} alt="trophy" />
                            </div>
                            <div className=" flex flex-col items-center justify-center ">
                                <h3 className=" text-xl text-muted my-4 ">
                                    Congratulations!
                                </h3>
                                <div>
                                    <ProgressBar
                                        score={result.totalScore}
                                        total={selectedQuestions.length}
                                    />
                                </div>
                            </div>
                            <div className=" my-10 ">
                                <p>
                                    Congrats, you scored{" "}
                                    <span className=" text-green-600 ">
                                        {result.totalScore}
                                    </span>{" "}
                                    out of{" "}
                                    <span className=" text-blue-600 ">
                                        {selectedQuestions.length}{" "}
                                    </span>{" "}
                                    correct.
                                </p>
                            </div>
                            <Button
                                className=" bg-foreground text-background my-4 w-fit hover:border hover:text-foreground transition "
                                onClick={() => tryAgain()}
                            >
                                Try Again
                            </Button>
                        </div>
                    </div>
                    <div className=" mt-[5rem] ">
                        <FormComponent score={result.totalScore} />
                    </div>
                </div>
            ) : (
                <div className="border border-muted/40 p-4 rounded-lg mt-5 md:mt-[5rem]">
                    <h2 className=" my-6 text-muted ">Frontend Quiz</h2>
                    <div className=" border-2 border-muted/20 my-7 rounded-full ">
                        <div
                            style={{
                                width: `${progress}%`,
                            }}
                            className={` h-2 bg-red-700 rounded-full `}
                        />
                    </div>

                    <div className="mb-3 flex items-center justify-between gap-4 ">
                        <div>
                            <span className="font-bold text-2xl">
                                Question {currentQuestion + 1}
                            </span>
                            <span className=" text-muted ">
                                /{selectedQuestions.length}
                            </span>
                        </div>
                        <span className=" text-red-300 text-3xl ">
                            {formattedTimeLeft}
                        </span>
                    </div>
                    <h3 className="text-lg font-semibold mt-2">{question}</h3>
                    <div className="mt-4 grid gap-4">
                        {choices.map((choice, index) => (
                            <Button
                                key={index}
                                onClick={() => onAnswerClick(choice, index)}
                                disabled={choiceDisabled}
                                className={`px-3 gap-3 py-2 rounded-md cursor-pointer hover:bg-secondary justify-start text-muted border border-muted/40 ${
                                    index === answerIdx
                                        ? answer
                                            ? "bg-green-500 text-white"
                                            : "bg-red-500 text-white"
                                        : ""
                                }`}
                            >
                                {index === answerIdx ? (
                                    <Circle
                                        className=" bg-foreground rounded-full "
                                        size={14}
                                    />
                                ) : (
                                    <Circle size={14} />
                                )}{" "}
                                {choice}
                            </Button>
                        ))}
                    </div>
                    <div className="mt-10">
                        <Button
                            variant="outline"
                            size="sm"
                            disabled={answerIdx === null}
                            onClick={next}
                        >
                            {currentQuestion === selectedQuestions.length - 1
                                ? "Finish"
                                : "Next"}
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

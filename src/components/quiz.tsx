import { webDevelopmentQuiz } from "@/constants";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Circle } from "lucide-react";
import ProgressBar from "./progressBar";
import FormComponent from "./form";

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
                    <div className="mt-5 md:mt-[5rem] flex gap-10 flex-col items-center justify-center md:flex-row ">
                        <div className="border rounded-lg p-4 w-full max-w-[300px] shadow-md">
                            <h2 className="text-lg font-semibold mb-3">
                                Results
                            </h2>
                            <div className="grid gap-2">
                                <p>Total score: {result.totalScore}</p>
                                <p>Correct Answers: {result.correctAnswers}</p>
                                <p>Wrong Answers: {result.wrongAnswers}</p>
                            </div>
                            <Button
                                className=" bg-foreground text-background my-4 w-full hover:outline hover:text-foreground transition "
                                onClick={() => tryAgain()}
                            >
                                Try Again
                            </Button>
                        </div>
                        <div>
                            <ProgressBar
                                score={result.totalScore}
                                total={selectedQuestions.length}
                            />
                        </div>
                    </div>
                    <div className=" mt-[5rem] ">
                        <FormComponent score={result.totalScore} />
                    </div>
                </div>
            ) : (
                <div className="border p-4 rounded-lg mt-5 md:mt-[5rem]">
                    <div
                        style={{
                            width: `${progress}%`,
                        }}
                        className={` h-1 bg-red-700 mt-1 mb-8 rounded-full `}
                    />
                    <div className="mb-3 flex items-center justify-between gap-4 ">
                        <div>
                            <span className="font-bold text-xl">
                                {currentQuestion + 1}
                            </span>
                            <span>/{selectedQuestions.length}</span>
                        </div>
                        <span className=" text-red-300 text-3xl ">
                            {formattedTimeLeft}
                        </span>
                    </div>
                    <h2 className="text-lg font-semibold mt-2">{question}</h2>
                    <div className="mt-4 grid gap-2">
                        {choices.map((choice, index) => (
                            <Button
                                key={index}
                                onClick={() => onAnswerClick(choice, index)}
                                disabled={choiceDisabled}
                                className={`px-3 gap-3 py-2 rounded-md cursor-pointer hover:bg-secondary justify-start ${
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
                    <div className="mt-5">
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

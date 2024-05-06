import { useEffect, useState } from "react";
import supabase from "./supabaseClient";

interface Score {
    id: number;
    name: string;
    score: number;
}
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

const ScoresComponent = () => {
    const [scores, setScores] = useState<Score[]>([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from("scores")
                    .select("*");
                if (error) {
                    throw error;
                }
                // Sort the data by score in descending order
                const sortedData = data
                    ? data.sort((a, b) => b.score - a.score)
                    : [];
                setScores(sortedData);
            } catch (error) {
                console.error("Error fetching data:", error);
                setError(error as Error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className=" my-[3rem] ">
            <div className=" mb-6 flex items-center justify-between ">
                <h2 className=" text-2xl ">High Scores</h2>
                <Link to={`/`}>
                    <Button
                        size="sm"
                        className=" bg-foreground text-background hover:text-foreground hover:outline "
                    >
                        Try Again
                    </Button>
                </Link>
            </div>

            {error && <div>Error: {error.message}</div>}

            <Table>
                <TableCaption>A list of the top 10 scores.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Position</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Score</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {scores.slice(0, 10).map((score, idx) => (
                        <TableRow key={score.id}>
                            <TableCell>{idx + 1}</TableCell>
                            <TableCell>{score.name}</TableCell>
                            <TableCell>{score.score}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default ScoresComponent;

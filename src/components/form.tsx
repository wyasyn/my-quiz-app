import React, { useState } from "react";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import supabase from "./supabaseClient";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

const FormComponent = ({ score }: { score: number }) => {
    const [name, setName] = useState<string>("");
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from("scores")
                .insert([{ name, score }]);

            if (error) {
                throw error;
            }

            console.log("Data inserted successfully:", data);
        } catch (error) {
            console.error("Error inserting data:", error);
            setError(error as Error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className=" max-w-[400px] mx-auto ">
            <h2 className=" text-muted text-xl ">Save your result!</h2>
            <form
                onSubmit={handleSubmit}
                className=" my-8 flex flex-col gap-4 "
            >
                <Label className=" w-full ">
                    Name:
                    <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Label>
                <Button
                    disabled={loading}
                    className=" bg-foreground text-background hover:text-foreground hover:border "
                    type="submit"
                >
                    {loading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    )}{" "}
                    {loading ? "please wait" : "Submit"}
                </Button>
                <Link to={`/table`}>
                    <Button className=" bg-foreground text-background my-[3rem] w-full hover:border hover:text-foreground transition ">
                        View high scores
                    </Button>
                </Link>
                {error && <div>Error: {error.message}</div>}
            </form>
        </div>
    );
};

export default FormComponent;

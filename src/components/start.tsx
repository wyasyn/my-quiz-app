import pattern from "@/assets/pattern.svg";
import frontend from "@/assets/frontend.svg";
import { Link } from "react-router-dom";
export default function Start() {
    return (
        <div>
            <div className="container">
                <div>
                    <div className="relative aspect-video rounded-lg ">
                        <img
                            className=" object-cover object-center w-full h-full mt-7 rounded-lg"
                            src={pattern}
                            alt="bg pattern"
                        />
                        <div className="w-full h-full absolute inset-0  rounded-lg text-3xl font-semibold grid place-items-center text-red-400 ">
                            Quiz by Yasin
                        </div>
                    </div>
                    <div className=" my-[3rem] ">
                        <h2 className=" font-semibold mb-10 ">
                            Top Quiz categories
                        </h2>
                        <Link to={`/quiz`}>
                            <div className=" max-w-[250px] ">
                                <img
                                    className=" aspect-square object-cover object-center rounded-md"
                                    src={frontend}
                                    alt="frontend"
                                />
                                <h3 className=" my-2 text-center ">
                                    Frontend{" "}
                                </h3>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

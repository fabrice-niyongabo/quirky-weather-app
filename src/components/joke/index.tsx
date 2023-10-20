import { useState, useEffect } from "react";
import { IJoke } from "../../interfaces";
import Loader from "./loader";

interface IPorps {
  color?: string;
}
function Joke({ color }: IPorps) {
  const [joke, setJoke] = useState<IJoke | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchAJoke = async () => {
    try {
      setIsLoading(true);
      setErrorMessage("");
      //const req = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
      const req = await fetch(
        "https://v2.jokeapi.dev/joke/Programming,Miscellaneous,Pun,Spooky,Christmas?type=single"
      );
      const response = await req.json();
      setIsLoading(false);
      if (response.error) {
        console.log(response);
        setErrorMessage(`Failed to get a joke`);
      } else {
        setJoke(response);
      }
    } catch (error) {
      setIsLoading(false);
      setErrorMessage(`Failed to get a joke`);
    }
  };
  useEffect(() => {
    fetchAJoke();
  }, []);
  return (
    <div
      style={{
        textAlign: "center",
        padding: 5,
        color: color ? color : "inherit",
      }}
    >
      {isLoading ? (
        <Loader />
      ) : errorMessage.length > 0 ? (
        <small>{errorMessage}</small>
      ) : (
        <small>{joke?.joke}</small>
      )}
    </div>
  );
}

export default Joke;

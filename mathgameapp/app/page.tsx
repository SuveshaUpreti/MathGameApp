// app/page.tsx
"use client"; // Ensure client-side rendering
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Home() {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOption, setGameOption] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [userName, setUserName] = useState<string>(""); // Store user name
  const [nameEntered, setNameEntered] = useState<boolean>(false); // Track if the name has been entered
  const [score, setScore] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [quizCompleted, setQuizCompleted] = useState<boolean>(false);
  const [questionPool, setQuestionPool] = useState<any[]>([]);
  const [timeLeft, setTimeLeft] = useState<number>(60); // Timer in seconds

  const mentalMathQuestions = [
    { problem: "12 x 15", answer: "180" },
    { problem: "25 + 37", answer: "62" },
    { problem: "100 - 47", answer: "53" },
    { problem: "9 x 8", answer: "72" },
    { problem: "7 x 6", answer: "42" },
    { problem: "81 ÷ 9", answer: "9" },
    { problem: "48 + 27", answer: "75" },
    { problem: "64 - 39", answer: "25" },
    { problem: "16 x 3", answer: "48" },
    { problem: "56 ÷ 8", answer: "7" },
  ];

  const mathQuizQuestions = [
    { problem: "What is the value of π (Pi) to two decimal places?", answer: "3.14" },
    { problem: "How many sides does a hexagon have?", answer: "6" },
    { problem: "What is the square root of 144?", answer: "12" },
    { problem: "What is 2^5?", answer: "32" },
    { problem: "How many degrees are in a circle?", answer: "360" },
    { problem: "What is 7 factorial (7!)?", answer: "5040" },
    { problem: "What is the sum of angles in a triangle?", answer: "180" },
    { problem: "What is 100 ÷ 4?", answer: "25" },
    { problem: "How many faces does a cube have?", answer: "6" },
    { problem: "What is 15% of 200?", answer: "30" },
  ];

  useEffect(() => {
    if (questionsAnswered === 10 || timeLeft === 0) {
      setQuizCompleted(true);
      setCurrentQuestion(null);
    }
  }, [questionsAnswered, timeLeft]);

  useEffect(() => {
    if (gameStarted && !quizCompleted) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, quizCompleted]);

  const handleStartGame = () => {
    setGameStarted(true);
    setQuizCompleted(false);
    setScore(0);
    setQuestionsAnswered(0);
    setGameOption(null);
    setUserAnswer("");
    setFeedback("");
    setCurrentQuestion(null);
    setTimeLeft(60); // Reset timer to 60 seconds
    setQuestionPool([...mentalMathQuestions, ...mathQuizQuestions]);
  };

  const getRandomQuestion = (questions: any[]) => {
    const randomIndex = Math.floor(Math.random() * questions.length);
    return questions[randomIndex];
  };

  const handleGameOption = (option: string) => {
    setGameOption(option);
    const selectedQuestions =
      option === "Mental Math" ? [...mentalMathQuestions] : [...mathQuizQuestions];
    setQuestionPool(selectedQuestions);
    const question = getRandomQuestion(selectedQuestions);
    setCurrentQuestion(question);
    setFeedback("");
  };

  const handleSubmitAnswer = () => {
    if (!currentQuestion) return;

    if (userAnswer.trim().toLowerCase() === currentQuestion.answer.toLowerCase()) {
      setFeedback("Correct! 🎉");
      setScore((prevScore) => prevScore + 1);
    } else {
      setFeedback(`Incorrect. The correct answer is ${currentQuestion.answer}.`);
    }

    setUserAnswer(""); // Clear input
    setQuestionsAnswered((prevCount) => prevCount + 1);

    const remainingQuestions = questionPool.filter(
      (q) => q.problem !== currentQuestion.problem
    );
    const nextQuestion = getRandomQuestion(remainingQuestions);
    setQuestionPool(remainingQuestions);
    setCurrentQuestion(nextQuestion);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <div className="flex justify-center mb-4">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
          />
        </div>
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Welcome to the Math Game!
        </h2>

        {!nameEntered ? (
          <div className="space-y-4">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
            <button
              onClick={() => setNameEntered(true)}
              className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all w-full"
            >
              Start
            </button>
          </div>
        ) : !gameStarted ? (
          <button
            onClick={handleStartGame}
            className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all w-full"
          >
            Start Game
          </button>
        ) : (
          <>
            {!gameOption ? (
              <div className="space-y-4">
                <p className="text-gray-600 text-lg text-center">
                  Hi, {userName}! Choose a game mode to start solving problems!
                </p>
                <button
                  onClick={() => handleGameOption("Mental Math")}
                  className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-all w-full"
                >
                  Mental Math
                </button>
                <button
                  onClick={() => handleGameOption("Math General Knowledge")}
                  className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-all w-full"
                >
                  Math General Knowledge
                </button>
              </div>
            ) : (
              <>
                {quizCompleted ? (
                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                      Quiz Completed!
                    </h3>
                    <p className="text-gray-600 text-lg mb-2">
                      {userName}, your final score is: {score} out of {questionsAnswered}
                    </p>
                    <p className="text-gray-600 text-lg mb-4">
                      Time Left: {timeLeft} seconds
                    </p>
                    <button
                      onClick={handleStartGame}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all w-full"
                    >
                      Play Again
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 text-center">
                      {gameOption} Quiz
                    </h3>
                    <p className="text-gray-600 text-lg text-center">
                      {currentQuestion?.problem}
                    </p>
                    <input
                      type="text"
                      value={userAnswer}
                      onChange={(e) => setUserAnswer(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                      placeholder="Type your answer here"
                    />
                    <button
                      onClick={handleSubmitAnswer}
                      className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all w-full"
                    >
                      Submit Answer
                    </button>
                    <p className="text-center text-lg font-medium mt-4">
                      {feedback}
                    </p>
                    <p className="text-center text-sm text-gray-500">
                      Questions Answered: {questionsAnswered} / 10
                    </p>
                    <p className="text-center text-sm text-red-500">
                      Time Left: {timeLeft} seconds
                    </p>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

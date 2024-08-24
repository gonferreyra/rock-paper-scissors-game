import clsx from 'clsx';
import { useEffect, useState } from 'react';
import Rules from './components/Rules';

const choices = ['rock', 'paper', 'scissors'];

function App() {
  // const scoreFromLocalStorage =
  //   JSON.parse(localStorage.getItem('score') as string) || 0;
  const [selectedPick, setSelectedPick] = useState<string>('');
  const [computerPick, setComputerPick] = useState<string>('');
  const [results, setResults] = useState<
    'You win!' | 'You lose!' | 'Tie' | null
  >(null);
  const [showComputerPick, setShowComputerPick] = useState<boolean>(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);
  const [score, setScore] = useState<number>(
    () => JSON.parse(localStorage.getItem('score') as string) || 0,
  );

  function handleSelectedPick(pick: string) {
    setSelectedPick(pick);
  }

  function handleComputerPick() {
    setComputerPick(choices[Math.floor(Math.random() * choices.length)]);
  }

  function handleRulesModal() {
    setIsRulesOpen(!isRulesOpen);
  }

  function startGame(pick: string) {
    // set user choice
    setSelectedPick(pick);

    // set computer choice
    const computerSelection =
      choices[Math.floor(Math.random() * choices.length)];
    setComputerPick(computerSelection);

    setTimeout(() => {
      setShowComputerPick(true);

      setTimeout(() => {
        // compare results
        let result: 'You win!' | 'You lose!' | 'Tie' | null = null;
        if (pick === computerSelection) {
          result = 'Tie';
        } else if (
          (pick === 'rock' && computerSelection === 'scissors') ||
          (pick === 'scissors' && computerSelection === 'paper') ||
          (pick === 'paper' && computerSelection === 'rock')
        ) {
          result = 'You win!';
          setScore((prev) => prev + 1);
        } else {
          result = 'You lose!';
          setScore((prev) => prev - 1);
        }
        setResults(result);
      }, 1000); // compare results timeout
    }, 1000); // show computers pick timeout
  }

  useEffect(() => {
    localStorage.setItem('score', JSON.stringify(score));
  }, [score]);

  return (
    <div className="box-border min-h-screen w-full bg-background-radial-gradient p-6 font-barlow font-semibold uppercase text-white">
      <header className="flex items-center justify-between rounded-md border-4 border-header-outline p-6 lg:m-auto lg:max-w-screen-sm">
        <div className="">
          <img src="/logo.svg" alt="rockpaperscissors-logo" className="h-16" />
        </div>
        <div className="flex flex-col items-center justify-center rounded-lg bg-white px-4 py-3">
          <p className="text-[9px] tracking-widest text-text-score">Score</p>
          <p className="text-4xl tracking-tighter text-text-dark">{score}</p>
        </div>
      </header>

      <main className="relative mx-auto flex min-h-[75vh] max-w-[500px] flex-col items-center justify-center lg:max-w-screen-sm">
        {selectedPick.length <= 0 ? (
          <div className="relative mx-auto my-28 h-80 w-[270px] bg-bg-triangle bg-contain bg-center bg-no-repeat sm:w-[320px]">
            <button
              id="paper"
              className="shadow-blue absolute left-0 top-0 flex h-24 w-24 items-center justify-center rounded-full bg-white"
              onClick={() => startGame('paper')}
            >
              <img src="/icon-paper.svg" alt="paper-icon" />
            </button>
            <button
              id="scissors"
              className="shadow-yellow absolute right-0 top-0 flex h-24 w-24 items-center justify-center rounded-full bg-white"
              onClick={() => startGame('scissors')}
            >
              <img src="/icon-scissors.svg" alt="scissors-icon" />
            </button>
            <button
              id="rock"
              className="shadow-red absolute bottom-0 left-1/2 flex h-24 w-24 -translate-x-1/2 transform items-center justify-center rounded-full bg-white"
              onClick={() => startGame('rock')}
            >
              <img src="/icon-rock.svg" alt="rock-icon" />
            </button>
          </div>
        ) : (
          <div className="relative mx-auto my-28 flex w-[270px] flex-row justify-between lg:w-[580px] lg:gap-12">
            <div className="flex flex-col items-center gap-6 lg:flex-col-reverse">
              <div
                className={clsx(
                  'flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white lg:h-36 lg:w-36',
                  {
                    'shadow-blue': selectedPick === 'paper',
                    'shadow-yellow': selectedPick === 'scissors',
                    'shadow-red': selectedPick === 'rock',
                  },
                )}
              >
                <img src={`/icon-${selectedPick}.svg`} />
              </div>
              <p className="text-xs lg:text-lg">Your pick</p>
            </div>

            {results && (
              <div className="mb-6 mt-12 hidden w-[65%] flex-col items-center lg:flex">
                <p className="text-4xl font-bold lg:text-center">{results}</p>
                {/* make reusable component */}
                <button
                  className="mt-4 flex h-12 w-full items-center justify-center rounded-md bg-white text-sm uppercase text-text-dark"
                  onClick={() => {
                    setSelectedPick('');
                    setComputerPick('');
                    setShowComputerPick(false);
                    setResults(null);
                  }}
                >
                  Play Again
                </button>
              </div>
            )}

            {showComputerPick ? (
              <div className="flex flex-col items-center gap-6 lg:flex-col-reverse">
                <div
                  className={clsx(
                    'flex h-24 w-24 flex-col items-center justify-center rounded-full bg-white lg:h-36 lg:w-36',
                    {
                      'shadow-blue': computerPick === 'paper',
                      'shadow-yellow': computerPick === 'scissors',
                      'shadow-red': computerPick === 'rock',
                    },
                  )}
                >
                  <img src={`/icon-${computerPick}.svg`} />
                </div>
                <p className="text-xs lg:text-lg">house pick</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-6 lg:flex-col-reverse">
                <div className="flex h-24 w-24 flex-col items-center justify-center rounded-full bg-background-radial-gradient lg:lg:h-36 lg:w-36" />
                <p className="text-xs lg:text-lg">house pick</p>
              </div>
            )}
          </div>
        )}

        {results && (
          <div className="mb-6 mt-12 flex w-[65%] flex-col items-center lg:hidden">
            <p className="text-4xl font-bold">{results}</p>
            {/* make resusable component with the ither playagain btn */}
            <button
              className="mt-4 flex h-12 w-full items-center justify-center rounded-md bg-white text-sm uppercase text-text-dark"
              onClick={() => {
                setSelectedPick('');
                setComputerPick('');
                setShowComputerPick(false);
                setResults(null);
              }}
            >
              Play Again
            </button>
          </div>
        )}

        <button
          onClick={handleRulesModal}
          className="mb-4 mt-auto flex h-12 w-32 items-center justify-center rounded-md border-2 border-white tracking-widest lg:ml-auto"
        >
          RULES
        </button>
      </main>

      {isRulesOpen && <Rules handleRulesModal={handleRulesModal} />}
    </div>
  );
}

export default App;

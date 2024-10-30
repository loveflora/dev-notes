import Lottie from "lottie-react";
import { twJoin } from "tailwind-merge";
import winAnimation from "./assets/winAnimation.json";
import player1Image from "./assets/player1.png";
import player2Image from "./assets/player2.png";
import { PlayerType } from "./types";

interface PlayerProps {
  player: PlayerType;
  isCurrentPlayer: boolean;
  isWinner: boolean;
}

export default function Player(props: PlayerProps) {
  const { player, isCurrentPlayer, isWinner } = props;

  let image;
  if (player === "player1") {
    image = player1Image;
  } else {
    image = player2Image;
  }

  return (
    <div className="w-40 h-40 relative">
      {isWinner && (
        <Lottie className="scale-125" animationData={winAnimation} />
      )}
      <img
        src={image}
        className={twJoin(
          "absolute top-0 z-10",
          !isCurrentPlayer && "scale-50",
        )}
      />
    </div>
  );
}

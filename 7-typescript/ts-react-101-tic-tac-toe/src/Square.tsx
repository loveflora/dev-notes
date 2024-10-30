import player1Image from "./assets/player1.png";
import player2Image from "./assets/player2.png";
import { PlayerType } from "./types";

interface SquareProps {
  square: PlayerType | null;
  click: () => void; // 임의의 함수
  // void: 아무것도 반환하지 않는다.
}

export default function Square(props: SquareProps) {
  const { square, click } = props;

  return (
    <div className="bg-base-100" onClick={click}>
      {(() => {
        switch (square) {
          case "player1":
            return <img src={player1Image} />;
          case "player2":
            return <img src={player2Image} />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

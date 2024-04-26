type PencilToolBoxProps = {
  pencilToolBoxVisible: boolean;
  pencilSize: string;
  setPencilSize: (e: string) => void;
  pencilColor: string;
  setPencilColor: (e: string) => void;
};
const PencilToolBox = ({
  pencilToolBoxVisible,
  pencilSize,
  setPencilSize,
  pencilColor,
  setPencilColor,
}: PencilToolBoxProps) => {
  const handlePencilSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPencilSize(e.target.value);
    console.log(pencilSize);
  };
  const handlePencilColor = (color: string) => {
    setPencilColor(color);
    console.log(pencilColor);
  };

  return (
    <>
      {pencilToolBoxVisible && (
        <div className="absolute top-[8vh] left-[20vw] md:left-[50%] md:translate-x-[-50%] md:top-[7vh] bg-pink-300 px-3 py-1 md:py-3 rounded-2xl shadow-xl md:flex gap-4">
          <input
            className="w-[10rem]"
            type="range"
            min={2}
            max={10}
            value={pencilSize}
            onChange={(e) => handlePencilSize(e)}
          />
          <div className="flex gap-2">
            <div
              className={`bg-black rounded-full w-4 aspect-square ${pencilColor === "black" ? "outline outline-offset-2 outline-black" : ""}`}
              onClick={() => handlePencilColor("black")}
            ></div>
            <div
              className={`bg-blue-700 rounded-full w-4 aspect-square ${pencilColor === "blue" ? "outline outline-offset-2 outline-blue-700" : ""}`}
              onClick={() => handlePencilColor("blue")}
            ></div>
            <div
              className={`bg-red-600 rounded-full w-4 aspect-square ${pencilColor === "red" ? "outline outline-offset-2 outline-red-600" : ""}`}
              onClick={() => handlePencilColor("red")}
            ></div>
          </div>
        </div>
      )}
    </>
  );
};

export default PencilToolBox;

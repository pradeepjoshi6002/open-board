type EraserToolBoxProps = {
  eraserToolBoxVisible: boolean;
  eraserSize: string;
  setEraserSize: (e: string) => void;
};

const EraserToolBox = ({
  eraserToolBoxVisible,
  eraserSize,
  setEraserSize,
}: EraserToolBoxProps) => {
  const handleEraserSize = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEraserSize(e.target.value);
    console.log(eraserSize);
  };

  return (
    <>
      {eraserToolBoxVisible && (
        <div className="absolute top-[16vh] left-[20vw] md:left-[50%] md:translate-x-[-50%] md:top-[12.5vh] bg-pink-300 px-3 rounded-2xl shadow-xl">
          <input
            className="w-[10rem]"
            type="range"
            min={2}
            max={10}
            value={eraserSize}
            onChange={(e) => handleEraserSize(e)}
          />
        </div>
      )}
    </>
  );
};

export default EraserToolBox;

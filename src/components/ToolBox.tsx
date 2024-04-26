import {
  FaPencilAlt,
  FaEraser,
  FaDownload,
  FaUpload,
  FaStickyNote,
  FaUndo,
  FaRedo,
} from "react-icons/fa";
import PencilToolBox from "./PencilToolBox";
import EraserToolBox from "./EraserToolBox";
import { useEffect, useState } from "react";

type ToolBoxProps = {
  toolBoxVisible: boolean;
  pencilSize: number;
  setPencilSize: (e: number) => void;
  pencilColor: string;
  setPencilColor: (e: string) => void;
  eraserSize: string;
  setEraserSize: (e: string) => void;
  generateUploadNote: () => void;
  generateStickyCont: () => void;
};

const ToolBox = ({
  toolBoxVisible,
  pencilSize,
  setPencilSize,
  pencilColor,
  setPencilColor,
  eraserSize,
  setEraserSize,
  generateUploadNote,
  generateStickyCont,
}: ToolBoxProps) => {
  const [pencilToolBoxVisible, setPencilToolBoxVisible] = useState(false);
  const [eraserToolBoxVisible, setEraserToolBoxVisible] = useState(false);

  useEffect(() => {
    if (!toolBoxVisible) {
      setPencilToolBoxVisible(false);
      setEraserToolBoxVisible(false);
    }
  }, [toolBoxVisible]);

  return (
    <>
      {toolBoxVisible && (
        <div className="bg-orange-300 rounded-full w-fit p-3  flex flex-col md:flex-row md:absolute md:top-4 md:translate-x-[-50%] md:left-[50%] gap-3 text-3xl text-black ml-5 mt-7 shadow-xl">
          <FaPencilAlt
            onClick={() => setPencilToolBoxVisible(!pencilToolBoxVisible)}
          />
          <PencilToolBox
            pencilToolBoxVisible={pencilToolBoxVisible}
            pencilSize={pencilSize}
            setPencilSize={setPencilSize}
            pencilColor={pencilColor}
            setPencilColor={setPencilColor}
          />
          <FaEraser
            onClick={() => setEraserToolBoxVisible(!eraserToolBoxVisible)}
          />
          <EraserToolBox
            eraserToolBoxVisible={eraserToolBoxVisible}
            eraserSize={eraserSize}
            setEraserSize={setEraserSize}
          />
          <FaDownload />
          <FaUpload onClick={generateUploadNote} />
          <FaStickyNote onClick={generateStickyCont} />
          <FaUndo />
          <FaRedo />
        </div>
      )}
    </>
  );
};
export default ToolBox;

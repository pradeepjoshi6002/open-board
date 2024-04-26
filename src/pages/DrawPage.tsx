import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";
import ToolBox from "../components/ToolBox";
import StickyCont from "../components/StickyCont";
import UploadNote from "../components/UploadNote";
import CanvasBox from "../components/CanvasBox";

const DrawPage: React.FC = () => {
  const [toolBoxVisible, setToolBoxVisible] = useState<boolean>(false);
  const [pencilSize, setPencilSize] = useState<number>(3);
  const [pencilColor, setPencilColor] = useState<string>("black");
  const [eraserSize, setEraserSize] = useState<string>("3");
  const [stickyNotes, setStickyNotes] = useState<JSX.Element[]>([]);
  const [uploadNotes, setUploadNotes] = useState<JSX.Element[]>([]);

  const generateStickyCont = () => {
    setStickyNotes([...stickyNotes, <StickyCont key={stickyNotes.length} />]);
  };
  const generateUploadNote = () => {
    setUploadNotes([...uploadNotes, <UploadNote key={uploadNotes.length} />]);
  };

  return (
    <div className="relative">
      <CanvasBox pencilSize={pencilSize} pencilColor={pencilColor} />
      <button
        className="bg-blue-400 text-white rounded-full w-fit p-3 text-3xl shadow-xl top-5 left-5 absolute"
        onClick={() => setToolBoxVisible(!toolBoxVisible)}
      >
        {toolBoxVisible ? <FaTimes /> : <FaBars />}
      </button>
      <ToolBox
        toolBoxVisible={toolBoxVisible}
        pencilSize={pencilSize}
        setPencilSize={setPencilSize}
        pencilColor={pencilColor}
        setPencilColor={setPencilColor}
        eraserSize={eraserSize}
        setEraserSize={setEraserSize}
        generateUploadNote={generateUploadNote}
        generateStickyCont={generateStickyCont}
      />
      {stickyNotes}
      {uploadNotes}
    </div>
  );
};

export default DrawPage;

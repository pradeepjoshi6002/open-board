import { useEffect, useRef, useState } from "react";

type CanvasBoxProps = {
  pencilSize: string;
  pencilColor: string;
};

const CanvasBox = ({ pencilSize, pencilColor }: CanvasBoxProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [drawingActions, setDrawingActions] = useState([]);
  const [currentPath, setCurrentPath] = useState([]);
  const [currentStyle, setCurrentStyle] = useState<{}[]>([]);

  useEffect(() => {
    if (canvasRef.current) {
      const canvasCont = canvasRef.current;
      canvasCont.width = window.innerWidth;
      canvasCont.height = window.innerHeight;
      const ctx = canvasCont.getContext("2d");
      redrawPreviousData(ctx);
    }
  }, []);
  const startDrawing = (e: React.MouseEvent) => {
    if (context) {
      useContext.beginPath(e.clientX, e.clientY);
      isMouseDown(true);
    }
  };
  const draw = (e: React.MouseEvent) => {
    if (!isMouseDown) {
      return;
    }
    if (context) {
      context.strokeStyle = pencilColor;
      context.lineWidth = pencilSize;
      context.lineTo(e.offsetX, e.offsetY);
      useContext.stroke();
      setCurrentPath([...currentPath, { x: e.offsetX, y: e.offsetY }]);
    }
  };

  const endDrawing = () => {
    isMouseDown(false);
    context && useContext.closePath();
    if (currentPath.length > 0) {
      setDrawingActions([
        ...drawingActions,
        { path: currentPath, style: currentStyle },
      ]);
    }
    setCurrentPath([]);
  };
  useEffect(() => {
    setCurrentStyle([
      ...currentStyle,
      { color: pencilColor, width: pencilSize },
    ]);
  }, [pencilColor, pencilSize]);

  return (
    <canvas ref={canvasRef} className="absolute top-0 left-0 -z-10"></canvas>
  );
};

export default CanvasBox;

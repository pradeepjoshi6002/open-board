import { useEffect, useRef, useState } from "react";

type CanvasBoxProps = {
  pencilSize: number; // Corrected type to number for pixel size
  pencilColor: string;
};

const CanvasBox = ({ pencilSize, pencilColor }: CanvasBoxProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false); // Use clear variable name
  const [drawingHistory, setDrawingHistory] = useState<
    Array<{ path: Point[]; style: Style }>
  >([]);
  const [currentPath, setCurrentPath] = useState<Point[]>([]);
  const [currentStyle, setCurrentStyle] = useState<Style>({
    color: pencilColor,
    lineWidth: pencilSize,
  });

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        setContext(ctx);
        redrawPreviousData(ctx); // Call the function with the context
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    if (context) {
      context.beginPath();
      context.moveTo(e.clientX, e.clientY);
      setIsDrawing(true);
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing) return;
    if (context) {
      context.strokeStyle = currentStyle.color;
      context.lineWidth = currentStyle.lineWidth;
      context.lineTo(e.clientX, e.clientY);
      context.stroke();
      setCurrentPath([...currentPath, { x: e.clientX, y: e.clientY }]);
    }
  };

  const endDrawing = () => {
    setIsDrawing(false);
    context?.closePath();
    if (currentPath.length > 0) {
      setDrawingHistory([
        ...drawingHistory,
        { path: currentPath, style: currentStyle },
      ]);
    }
    setCurrentPath([]);
  };

  // const undoDrawing = () => {
  //   if (drawingHistory.length > 0) {
  //     const newContext = canvasRef.current?.getContext("2d");
  //     if (!newContext) return; // Handle potential null context

  //     if (canvasRef.current) {
  //       newContext.clearRect(
  //         0,
  //         0,
  //         canvasRef.current.width,
  //         canvasRef.current.height
  //       ); // Clear entire canvas
  //       setDrawingHistory(drawingHistory.slice(0, drawingHistory.length - 1)); // Remove last action

  //       redrawPreviousData(newContext); // Redraw remaining history
  //     }
  //   }
  // };

  // const clearDrawing = () => {
  //   setDrawingHistory([]);
  //   setCurrentPath([]);
  //   const newContext = canvasRef.current?.getContext("2d");
  //   if (newContext && canvasRef.current) {
  //     newContext.clearRect(
  //       0,
  //       0,
  //       canvasRef.current.width,
  //       canvasRef.current.height
  //     );
  //   }
  // };

  const redrawPreviousData = (ctx: CanvasRenderingContext2D) => {
    drawingHistory.forEach(({ path, style }) => {
      ctx.beginPath();
      ctx.strokeStyle = style.color;
      ctx.lineWidth = style.lineWidth;
      ctx.moveTo(path[0].x, path[0].y);
      path.forEach((point) => {
        ctx.lineTo(point.x, point.y);
      });
      ctx.stroke();
    });
  };

  useEffect(() => {
    setCurrentStyle({ color: pencilColor, lineWidth: pencilSize });
  }, [pencilColor, pencilSize]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 -z-10"
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={endDrawing}
      onMouseOut={endDrawing}
    />
  );
};

export default CanvasBox;

interface Point {
  x: number;
  y: number;
}

interface Style {
  color: string;
  lineWidth: number;
}

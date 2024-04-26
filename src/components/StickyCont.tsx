import { FaMinus, FaTimes } from "react-icons/fa";
import { useRef, RefObject, useEffect } from "react";

const StickyCont = () => {
  const noteContainer: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);

  const handleEdit = () => {
    if (noteContainer.current) {
      noteContainer.current.focus();
    }
  };

  const notePosition = () => {
    const maxX = window.innerWidth - 250;
    const maxY = window.innerHeight - 250;
    return {
      xPos: Math.floor(Math.random() * maxX),
      yPos: Math.floor(Math.random() * maxY),
    };
  };

  const handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
    if (noteContainer.current) {
      const rect = noteContainer.current.getBoundingClientRect();
      const offSetX = e.clientX - rect.left;
      const offSetY = e.clientY - rect.top;
      // const startPos = {
      //   x: rect.left,
      //   y: rect.top,
      // };

      const handleMouseMove = (e: MouseEvent) => {
        const newX = e.clientX - offSetX;
        const newY = e.clientY - offSetY;
        if (noteContainer.current) {
          noteContainer.current.style.left = `${newX}px`;
          noteContainer.current.style.top = `${newY}px`;
        }
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }
  };

  useEffect(() => {
    const { xPos, yPos } = notePosition();
    if (noteContainer.current) {
      noteContainer.current.style.top = `${yPos}px`;
      noteContainer.current.style.left = `${xPos}px`;
    }
  }, []);

  return (
    <div
      className="shadow-xl w-[14rem] absolute"
      ref={noteContainer}
      onMouseDown={handleDragStart}
    >
      <div className="bg-orange-500 flex justify-end pr-2 py-1 gap-2 rounded-t-lg text-white ">
        <div className="bg-green-500 w-4 rounded-full aspect-square">
          <FaMinus />
        </div>
        <div className="bg-red-500 w-4 rounded-full aspect-square">
          <FaTimes />
        </div>
      </div>
      <textarea
        className="bg-yellow-100 w-full h-[10rem] outline-none p-1"
        onClick={handleEdit}
        spellCheck={false}
      ></textarea>
    </div>
  );
};

export default StickyCont;

import { FaMinus, FaTimes } from "react-icons/fa";
import React, { useRef, RefObject, useEffect, useState } from "react";

const UploadNote = () => {
  const [file, setFile] = useState<File | null>(null);
  const noteContainer: RefObject<HTMLDivElement> = useRef<HTMLDivElement>(null);
  const filePicker: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement>(null);

  const handlePicker = () => {
    if (filePicker.current) {
      filePicker.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
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
      handlePicker();
    }
  }, []);

  return (
    <div
      className="shadow-xl w-[14rem] absolute"
      ref={noteContainer}
      onMouseDown={handleDragStart}
    >
      <div className="bg-orange-500 flex justify-end pr-2 py-1 gap-2 rounded-t-lg text-white cursor-move ">
        <div className="bg-green-500 w-4 rounded-full aspect-square cursor-pointer">
          <FaMinus />
        </div>
        <div className="bg-red-500 w-4 rounded-full aspect-square cursor-pointer">
          <FaTimes />
        </div>
      </div>
      <input
        ref={filePicker}
        type="file"
        className="hidden"
        onChange={handleFileChange}
      />
      <div
        className="bg-yellow-100 w-full h-[10rem] outline-none cursor-pointer"
        onClick={handlePicker}
      >
        {file ? (
          <img
            className="w-full h-full object-contain"
            src={URL.createObjectURL(file)}
            alt="Uploaded File"
          />
        ) : (
          <span className="block text-center mt-4"></span>
        )}
      </div>
    </div>
  );
};

export default UploadNote;

import React from "react";
import cn from 'classnames';
import './style.css';

const FrameSelector = ({ frameChoose, frameSelected }) => {
  const Frames = [
    {
      name: "classic",
      img: "assets/file/images/d1.png",
      text: "Classic",
    },
    {
      name: "bold",
      img: "assets/file/images/d2.png",
      text: "נועז",
    },
    {
      name: "ever",
      img: "assets/file/images/d3.png",
      text: "נקי",
    },
    {
      name: "clean",
      img: "assets/file/images/d4.png",
      text: "אותנטי",
      label: "פופולארי",
    },
  ];
  return (
    <div className="frame-wrapper">
      {Frames.map((frame) => (
        <div
          key={frame.name}
          className={cn("frame-wrapper__item", { last: frameChoose === frame.name })}
          onClick={() => frameSelected(frame.name)}
        >
          <img src={frame.img} className="w-100" alt="" />
          <p>{frame.text}</p>
          {frame.label && <span className="popular">{frame.label}</span>}
        </div>
      ))}
    </div>
  );
};

export default FrameSelector;

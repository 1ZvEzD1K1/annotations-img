import React, { FC, useState } from "react";
import { TAnnotationState } from "../../redux/slices/annotations";
import "./style.scss";

type TAnnotation = {
  el: TAnnotationState;
  id: number;
  delTargetAnnotation: (id: string) => void;
};

const Annotation: FC<TAnnotation> = ({ el, id, delTargetAnnotation }) => {
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <div
      className="annotations"
      style={{ top: el.pos.y * 100 + "%", left: el.pos.x * 100 + "%" }}
      onMouseLeave={() => setVisible(false)}
    >
      <div onMouseEnter={() => setVisible(true)} className="circle">
        {id}
      </div>
      {visible && (
        <div className="comment-container">
          <div className="avatar">
            {el.author
              .split(" ")
              .map((e) => e[0])
              .join("")}
          </div>
          <div className="comment-info">
            <div className="author">{el.author}</div>
            <div className="comment">{el.comment}</div>
          </div>
          <button onClick={() => delTargetAnnotation(el.id)}>
            <img src={require("../../assets/delete.png")} alt="delete" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Annotation;

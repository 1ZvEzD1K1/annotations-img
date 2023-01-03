import React, { Dispatch, FC, SetStateAction } from "react";
import { TPosition } from "../content/Content";
import "./style.scss";

type TFormAnnotation = {
  position: TPosition;
  id: number;
  comment: string;
  setPosition: Dispatch<SetStateAction<TPosition | null>>;
  setComment: Dispatch<SetStateAction<string>>;
  addNewAnnotations: (e: any) => void
};

const FormAnnotation: FC<TFormAnnotation> = ({ position, id, setPosition, setComment, comment, addNewAnnotations }) => {
  return (
    <div
      className="form-annotation"
      style={{ top: position.y * 100 + "%", left: position.x * 100 + "%" }}
      onMouseLeave={(e) => setPosition(null)}
    >
      <div className="circle">{id}</div>
      <div className="form-container">
        <form>
          <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" placeholder="Leave a comment" />
          <button type="submit" onClick={(e) => addNewAnnotations(e)}>
            <img src={require("../../assets/arrow.png")} alt="arrow" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormAnnotation;

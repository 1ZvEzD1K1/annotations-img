import React, { FC, useRef, useState } from "react";
import { useAppDispatch, useTypedSelector } from "../../redux/store";
import Annotation from "../annotation/Annotation";
import FormAnnotation from "../form-annotation/FormAnnotation";
import { deleteAnnotations, postAnnotations } from '../../redux/slices/annotations'
import "./style.scss";
import generateID from "../../utils/generateID";
import randomAuthors from "../../utils/randomAuthors";

type TContent = {
  imgUrl: string | null;
};

export type TPosition = {
  x: number;
  y: number;
};

const Content: FC<TContent> = ({ imgUrl }) => {
  const dispatch = useAppDispatch()
  const containerImg = useRef<HTMLDivElement | null>(null);
  const innerContainer = useRef<HTMLDivElement | null>(null);
  const targetImg = useRef<HTMLImageElement | null>(null);
  const [position, setPosition] = useState<TPosition | null>(null);
  const [comment, setComment] = useState<string>("");
  const { annotations } = useTypedSelector((state) => state.annotations);

  const clickHandler = (e: any) => {
    e.stopPropagation();
    if (
      containerImg.current == null ||
      targetImg.current == null ||
      innerContainer.current == null
    ) {
      return;
    }
    let x: number =
      (e.pageX -
        containerImg.current.offsetLeft -
        innerContainer.current.offsetLeft -
        16) /
      targetImg.current.width;
    let y: number =
      (e.pageY -
        containerImg.current.offsetTop -
        innerContainer.current.offsetTop -
        16) /
      targetImg.current.height;
    setPosition({ x, y });
  };

  const addNewAnnotations = (e: any): void => {
    e.preventDefault()
    if (position) {
      dispatch(postAnnotations({
        id: generateID(),
        author: randomAuthors(),
        comment: comment,
        pos: position
      }))
      setComment('')
      setPosition(null)
    }
  };

  const delTargetAnnotation = (id: string): void => {
    dispatch(deleteAnnotations(id))
  }

  return (
    <div className="content" ref={containerImg}>
      {imgUrl != null ? (
        <div className="container-img" ref={innerContainer}>
          <img
            ref={(e: HTMLImageElement) => (targetImg.current = e)}
            src={imgUrl ? imgUrl : ""}
            alt="content"
            onClick={(e) => clickHandler(e)}
          />
          {annotations.map((el, id) => {
            return <Annotation key={el.id} el={el} id={id + 1} delTargetAnnotation={delTargetAnnotation} />;
          })}
          {position && (
            <FormAnnotation
              setPosition={setPosition}
              position={position}
              id={annotations.length + 1}
              comment={comment}
              setComment={setComment}
              addNewAnnotations={addNewAnnotations}
            />
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Content;

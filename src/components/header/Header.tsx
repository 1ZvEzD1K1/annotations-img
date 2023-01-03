import React, {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  useState,
} from "react";
import { getAnnotations } from "../../redux/slices/annotations";
import { useAppDispatch } from "../../redux/store";
import "./style.scss";

type THeader = {
  setImgUrl: Dispatch<SetStateAction<string | null>>;
};

const Header: FC<THeader> = ({ setImgUrl }) => {
  const dispatch = useAppDispatch()
  const [dataImg, setDataImg] = useState<File | null>(null);

  return (
    <div className="header">
      <div className="filename">{dataImg?.name ?? "Upload your photo"}</div>
      <div className="uploadbutton">
        <input
          id="inpfile"
          accept=".jpg, .jpeg, .png"
          type="file"
          placeholder="photo"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setDataImg(
              e.target.files instanceof FileList ? e.target.files[0] : null
            );

            dispatch(getAnnotations())

            setImgUrl(
              e.target.files instanceof FileList
                ? URL.createObjectURL(e.target.files[0])
                : ""
            );
          }}
        />
        <label htmlFor="inpfile">Upload image</label>
      </div>
    </div>
  );
};

export default Header;

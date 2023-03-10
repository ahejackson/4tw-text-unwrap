import { useRef } from "react";
import "./Button.css";

type FileUploadProps = {
  text?: string;
  icon?: string;
  onUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function FileUpload({ text, icon, onUpload }: FileUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <label className="button text-button file-upload">
      {icon && (
        <svg>
          <use
            xlinkHref={`sprites.svg#${icon}`}
            href={`sprites.svg#${icon}`}
          ></use>
        </svg>
      )}
      {text}
      <input
        id="file-upload-input"
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          onUpload(e);
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }}
      />
    </label>
  );
}

export default FileUpload;

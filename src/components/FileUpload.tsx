import "./Button.css";

type FileUploadProps = {
  text?: string;
  icon?: string;
};

function FileUpload({ text, icon }: FileUploadProps) {
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
      <input type="file" />
    </label>
  );
}

export default FileUpload;

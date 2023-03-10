import Button from "@/components/Button";
import FileUpload from "@/components/FileUpload";
import Settings from "@/components/Settings";
import "./TextUnwrapper.css";

function TextUnwrapper() {
  return (
    <main className="text-unwrapper">
      <div className="text-unwrapper-loadfile">
        <FileUpload text="Upload File" icon="file-upload"></FileUpload>
      </div>

      <textarea
        className="text-unwrapper-textarea"
        placeholder="Paste text to unwrap here"
      ></textarea>

      <div className="text-unwrapper-controls">
        <Button text="Unwrap" icon="align-left"></Button>
        <Button text="Download" icon="file-download"></Button>
        <Button text="Copy Text" icon="copy"></Button>
      </div>

      <div className="text-unwrapper-settings-section">
        <Settings></Settings>
      </div>
    </main>
  );
}

export default TextUnwrapper;

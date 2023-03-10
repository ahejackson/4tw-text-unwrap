import { useState, useEffect } from "react";
import { unwrap } from "@/lib";
import { saveAs } from "file-saver";

import Button from "@/components/Button";
import FileUpload from "@/components/FileUpload";
import Settings from "@/components/Settings";
import "./TextUnwrapper.css";

function TextUnwrapper() {
  const [text, setText] = useState("");
  const [wrapWidth, setWrapWidth] = useState(70);

  useEffect(
    () =>
      document.documentElement.style.setProperty(
        "--textarea-width",
        `${wrapWidth}ch`
      ),
    [wrapWidth]
  );

  function handleUnwrap() {
    setText(unwrap(text, wrapWidth));
    // console.log("Unwrapped");
  }

  function handleDownload() {
    download(text);
    // console.log("File downloaded");
  }

  function download(textToSave: string) {
    let blob = new Blob([textToSave], { type: "text/plain;charset=utf-8" });
    saveAs(blob, "unwrapped.txt");
  }

  async function handleCopy() {
    // console.log("Copying...");

    try {
      await navigator.clipboard.writeText(text);
      // console.log("Copied");
    } catch (err) {
      console.error("Copy failed! Error:", err);
    }
  }

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return;

    const file = e.target.files[0];
    const reader = new FileReader();

    // console.log("File uploading");
    reader.addEventListener("load", handleFileRead, { once: true });
    reader.readAsText(file);
  }

  function handleFileRead(e: ProgressEvent<FileReader>) {
    // console.log("File uploaded");
    if (e.target?.result) {
      const newText = e.target.result as string;
      const unwrapped = unwrap(newText, wrapWidth);

      setText(unwrapped);
      download(unwrapped);
    }
  }

  return (
    <main className="text-unwrapper">
      <div className="text-unwrapper-loadfile">
        <FileUpload
          text="Upload File"
          icon="file-upload"
          onUpload={handleUpload}
        ></FileUpload>
      </div>

      <textarea
        className="text-unwrapper-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Paste text to unwrap here"
      ></textarea>

      <div className="text-unwrapper-controls">
        <Button text="Unwrap" icon="align-left" onClick={handleUnwrap}></Button>
        <Button
          text="Download"
          icon="file-download"
          onClick={handleDownload}
        ></Button>
        <Button text="Copy Text" icon="copy" onClick={handleCopy}></Button>
      </div>

      <div className="text-unwrapper-settings-section">
        <Settings wrapWidth={wrapWidth} setWrapWidth={setWrapWidth}></Settings>
      </div>
    </main>
  );
}

export default TextUnwrapper;

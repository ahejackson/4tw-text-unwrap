import TextUnwrapper from "@/components/TextUnwrapper";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="header">
        <h1 className="title">
          <span className="title-first">Text</span>{" "}
          <span className="title-last">Unwrap</span>
        </h1>
        <p>
          Choose a file to automatically unwrap and download or paste wrapped
          text below.
        </p>
      </header>

      <TextUnwrapper></TextUnwrapper>

      <footer className="footer">
        <p>
          Developed by <a href="https://github.com/ahejackson/">Adam Jackson</a>
        </p>
      </footer>
    </div>
  );
}

export default App;

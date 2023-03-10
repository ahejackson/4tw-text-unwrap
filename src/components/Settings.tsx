import { useState } from "react";

import "./Settings.css";
import "./Button.css";

function Settings() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="text-unwrapper-settings">
      <button
        className="button settings-button"
        aria-label="Show or hide settings"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        <svg aria-hidden="true">
          <use xlinkHref="sprites.svg#gear-2" href="sprites.svg#gear-2"></use>
        </svg>
      </button>

      <div className="text-unwrapper-settings-panel">
        <label className="text-unwrapper-settings-label">
          Existing wrap width
          <input id="text-unwrapper-width" type="number" />
        </label>
      </div>
    </div>
  );
}

export default Settings;

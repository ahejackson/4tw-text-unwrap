const cleaner = new RegExp(String.fromCharCode(160), "g");

export function clean(text: string): string {
  // 4tw exported strings sometimes include non-breaking spaces (character code 160) instead of spaces
  // parse and replace them
  return text.replace(cleaner, " ");
}

export function detectWrapWidth(text: string): number {
  const cleaned = clean(text);
  let lines = cleaned.split("\n");
  return lines.reduce(
    (longestSoFar, line) => Math.max(longestSoFar, line.length),
    0
  );
}

export function unwrap(text: string, wrapWidth?: number): string {
  if (text === "") {
    return text;
  }

  if (!wrapWidth) {
    wrapWidth = detectWrapWidth(text);
  }

  const cleaned = clean(text);
  let lines = cleaned.split("\n");

  let unwrapped = "";
  let nextLine = "";
  let nextLineFirstWord = "";

  for (let i = 0; i < lines.length; i++) {
    // Is there a next line?
    if (i + 1 < lines.length) {
      nextLine = lines[i + 1];
    } else {
      nextLine = "";
    }

    nextLineFirstWord = nextLine.split(" ", 1)[0];

    // If it exists, add the first word of the next line to this line
    if (nextLineFirstWord !== "") {
      // if length(lines[i] + ' ' + nextLineFirstWord) is >= to the linewrap, we unwrap
      // But also check that the original line was wrapped and the extended line would be longer than the wrap length
      if (
        lines[i].length <= wrapWidth &&
        lines[i].length + nextLineFirstWord.length + 1 >= wrapWidth
      ) {
        // then the line was wrapped so lets unwrap it
        unwrapped += lines[i] + " ";
      } else {
        unwrapped += lines[i] + "\n";
      }
    } else {
      unwrapped += lines[i] + "\n";
    }
  }

  return unwrapped;
}

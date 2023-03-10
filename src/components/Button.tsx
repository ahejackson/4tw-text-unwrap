import "./Button.css";

type ButtonProps = {
  text?: string;
  icon?: string;
};

function Button({ text, icon }: ButtonProps) {
  return (
    <button className={`button${text ? " text-button" : ""}`}>
      {icon && (
        <svg>
          <use
            xlinkHref={`sprites.svg#${icon}`}
            href={`sprites.svg#${icon}`}
          ></use>
        </svg>
      )}
      {text}
    </button>
  );
}

export default Button;

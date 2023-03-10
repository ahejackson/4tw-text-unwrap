import "./Button.css";

type ButtonProps = {
  text?: string;
  icon?: string;
  onClick: () => void;
};

function Button({ text, icon, onClick }: ButtonProps) {
  return (
    <button className={`button${text ? " text-button" : ""}`} onClick={onClick}>
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

import React from "react";

import "./InputWithButton.css";

function InputWithButton({
  label,
  inputText = "",
  buttonText,
  placeholder,
  onClick,
  onHandleChange,
  active = true,
}) {
  const inactiveClassName = active && inputText.length ? "" : "inactive";
  const labelClassName = !label ? "" : "withLabel";
  return (
    <div className="inputWithButton">
      {!!label && <div className="label">{label}</div>}
      <input
        className="input"
        spellCheck={false}
        value={inputText}
        placeholder={placeholder}
        onChange={onHandleChange}
      />
      <div
        className={`button ${inactiveClassName} ${labelClassName}`}
        onClick={active && !!inputText.length ? onClick : () => null}
      >
        {buttonText}
      </div>
    </div>
  );
}

export default InputWithButton;

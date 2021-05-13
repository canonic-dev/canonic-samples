import React from "react";

import InputWithButton from "../InputWithButton";

import "./Header.css";

function Header({
  active,
  label,
  placeholder,
  buttonText,
  inputText,
  infoHeading,
  infoText,
  onChange,
  onSave,
  extraCtaText,
  extraCtaClick,
}) {
  return (
    <div className="header">
      <InputWithButton
        active={active}
        label={label}
        placeholder={placeholder}
        inputText={inputText}
        buttonText={buttonText}
        onHandleChange={onChange}
        onClick={onSave}
      />
      <div className="header-info">
        <div>
          {infoHeading}: <span className="header-info-text">{infoText}</span>
        </div>
        {!!extraCtaText && (
          <div className="header-extra button" onClick={extraCtaClick}>
            {extraCtaText}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;

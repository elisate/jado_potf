"use client";

import { useState } from "react";

export function Switch({ checked: controlledChecked, onChange, ...props }) {
  const [internalChecked, setInternalChecked] = useState(false);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const toggle = () => {
    if (!isControlled) {
      setInternalChecked(!checked);
    }
    if (onChange) {
      onChange(!checked);
    }
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
        checked ? "bg-red-800" : "bg-gray-300"
      }`}
      {...props}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

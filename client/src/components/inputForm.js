 import React from "react";

  const InputForm = ({
    label,
    value,
    setValue,
    type,
    invalidFields,
    setInvalidFields,
  }) => {
    const getInputType = () => {
      if (
        type === "password" ||
        type === "confirmPassword" ||
        type === "newPassword"
      ) {
        return "password";
      }

      if (type === "email") return "email";
      if (type === "phone") return "tel";

      return "text";
    };

    return (
      <div>
        <label htmlFor={type} className="block mb-1">
          {label}
        </label>

        <input
          type={getInputType()}
          id={type}
          className="outline-none bg-[#e8f0fe] p-2 rounded-md w-full"
          value={value}
          onChange={(e) =>
            setValue((prev) => ({ ...prev, [type]:
  e.target.value }))
          }
          onFocus={() => setInvalidFields([])}
        />

        {invalidFields.length > 0 &&
          invalidFields.some((item) => item.name === type) && (
            <small className="text-red-500 italic">
              {invalidFields.find((item) => item.name ===
  type)?.message}
            </small>
          )}
      </div>
    );
  };

  export default InputForm;
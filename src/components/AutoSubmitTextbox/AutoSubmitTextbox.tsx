import React, { ChangeEvent, useEffect, useState } from "react";

interface AutoSubmitTextboxProps {
  id: string;
  name: string;
  delay: number;
  submit: (text: string) => void;
  type?: "text" | "search";
}

export default function AutoSubmitTextbox(props: AutoSubmitTextboxProps) {
  const [input, setInput] = useState("");
  const [timeoutID, setTimeoutID] = useState(null);

  useEffect(() => {
    if (!input) return;
    const id = setTimeout(() => {
      props.submit(input);
    }, props.delay);
    setTimeoutID(id);
  }, [input]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timeoutID);
    setInput(e.target.value);
  };

  return (
    <input
      className="AutoSubmitTextbox"
      type={props.type || "text"}
      name={props.name}
      id={props.id}
      value={input}
      onChange={onChange}
    />
  );
}

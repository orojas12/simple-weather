import React from "react";

export default function BaseLayout(props: { children: React.ReactNode }) {
  return <div className="base-layout">{props.children}</div>;
}

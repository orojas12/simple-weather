import React from "react";
import { Navbar } from "@/components";

export default function BaseLayout(props: { children: React.ReactNode }) {
  return (
    <div className="BaseLayout">
      <Navbar />
      <div className="content">{props.children}</div>
    </div>
  );
}

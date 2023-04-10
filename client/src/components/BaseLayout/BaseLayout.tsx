import React from "react";
import { Navbar } from "@/components";

export default function BaseLayout(props: { children: React.ReactNode }) {
  return (
    <article className="BaseLayout">
      <Navbar />
      <main>{props.children}</main>
    </article>
  );
}

import type { Component, ComponentProps } from "solid-js";
import { Link as LinkPrimitive } from "@kobalte/core/link";
import { splitProps } from "solid-js";

import { cn } from "~/lib/utils";

const Link: Component<ComponentProps<"a">> = (props) => {
  const [local, others] = splitProps(props, ["class"]);
  return (
    <LinkPrimitive
      class={cn("text-primary visited:text-secondary", local.class)}
      {...others}
    />
  );
};

export { Link };

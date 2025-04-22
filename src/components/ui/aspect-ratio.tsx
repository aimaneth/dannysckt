"use client"

import * as AspectRatioPrimitive from "@radix-ui/react-aspect-ratio"

function AspectRatio({
  ratio = 1 / 1,
  className,
  ...props
}: React.ComponentProps<typeof AspectRatioPrimitive.Root>) {
  return (
    <AspectRatioPrimitive.Root
      ratio={ratio}
      className={className}
      {...props}
    />
  )
}

export { AspectRatio } 
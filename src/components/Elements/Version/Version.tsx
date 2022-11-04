import { memo } from "react";
import type { FC } from "react";
import { WithClassName } from "@/src/types/components";

export type VersionProps = WithClassName<
  Readonly<{
    target: string;
    version: string;
  }>
>;

export const Version: FC<VersionProps> = memo(
  ({ target, version, className }) => {
    return (
      <span className={className}>
        {target}: {version}
      </span>
    );
  }
);

"use client";

import { usePathname } from "next/navigation";
import { Fragment } from "react";
import Link from "next/link";

type BreadCrumb = {
  segment: string;
  path: string;
};

export const HeaderBreadCrumbs = () => {
  const pathname = usePathname();
  const segments: BreadCrumb[] = pathname
    .split("/")
    .filter((x) => !!x)
    .reduce<BreadCrumb[]>((acc, segment) => {
      const prevBreadCrumb = acc[acc.length - 1];
      if (!prevBreadCrumb) {
        acc.push({
          segment,
          path: `/${segment}`,
        });
      } else {
        acc.push({
          segment,
          path: `${prevBreadCrumb.path}/${segment}`,
        });
      }
      return acc;
    }, []);

  return (
    <div className="flex gap-2 opacity-50">
      {segments.map(({ segment, path }, i) => (
        <Fragment key={segment}>
          <Link href={path}>{segment}</Link>
          {i !== segments.length - 1 && <p>/</p>}
        </Fragment>
      ))}
    </div>
  );
};

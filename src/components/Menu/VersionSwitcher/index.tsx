import Link from "next/link";
import {ActiveSwitchStyle, SwitchStyle} from "./styles";
import directory from "../../../directory/directory";

const Option = function({href, title, isActive}) {
  const SwitchStyle = isActive ? ActiveSwitchStyle : "a";
  return (
    <div>
      <Link href={href}>
        <SwitchStyle href={href}>
          <span>{title}</span>
        </SwitchStyle>
      </Link>
    </div>
  );
};

export function VersionSwitcher({url}) {
  let leftActive = true;
  let urlEnd;
  const filter = url.includes("/framework")
    ? "q/framework" + url.split("/framework")[1]
    : "";
  if (url.includes("/ui-legacy")) {
    leftActive = false;
    urlEnd = url.split("/ui-legacy")[1];
  } else {
    urlEnd = url.split("/ui")[1];
  }

  const leftHref = "/ui" + urlEnd;
  const leftOption = {
    title: "Latest",
    href: uiPaths.includes(leftHref) ? leftHref : "/ui/" + filter,
  };

  const rightHref = "/ui-legacy" + urlEnd;
  const rightOption = {
    title: "Legacy",
    href: uiLegacyPaths.includes(rightHref)
      ? rightHref
      : "/ui-legacy/" + filter,
  };

  return (
    <SwitchStyle>
      <Option
        href={leftOption.href}
        title={leftOption.title}
        isActive={leftActive}
      />
      <Option
        href={rightOption.href}
        title={rightOption.title}
        isActive={!leftActive}
      />
    </SwitchStyle>
  );
}


const lib = directory["lib"].items;
const libLegacy = directory["lib-v1"].items;
const libLegacyPaths = [];
const libPaths = [];
const libItemsAndPaths: [object, string[]][] = [
  [lib, libPaths],
  [libLegacy, libLegacyPaths],
];
for (const [dirItems, paths] of libItemsAndPaths) {
  for (const [_, value] of Object.entries(dirItems)) {
    const {items} = value;
    items.forEach((item) => {
      const {route, filters} = item;
      filters.forEach((filter) => {
        const path = route + "/q/platform/" + filter;
        paths.push(path);
      });
      paths.push(route);
    });
  }
}
libLegacyPaths.push("/lib-v1");
libPaths.push("/lib");

export function LibVersionSwitcher({url}) {
  let rightActive;
  let urlEnd;
  const filter = url.includes("/platform")
    ? "q/platform" + url.split("/platform")[1]
    : "";

  if (url.includes("/lib-v1")) {
    rightActive = false;
    urlEnd = url.split("/lib-v1")[1];
  } else {
    rightActive = true
    urlEnd = url.split("/lib")[1];
  }

  const leftHref = "/lib-v1" + urlEnd;
  const leftOption = {
    title: "v1",
    href: libLegacyPaths.includes(leftHref)
      ? leftHref
      : "/lib-v1/" + filter,
  };

  const rightHref = "/lib" + urlEnd;
  const rightOption = {
    title: "v2 (latest)",
    href: libPaths.includes(rightHref) ? rightHref : "/lib/" + filter,
  };

  return (
    <SwitchStyle>
      <Option
        href={leftOption.href}
        title={leftOption.title}
        isActive={!rightActive}
      />
      <Option
        href={rightOption.href}
        title={rightOption.title}
        isActive={rightActive}
      />
    </SwitchStyle>
  );
}

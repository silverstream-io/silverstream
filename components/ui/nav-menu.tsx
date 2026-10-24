"use client";

import Link from "next/link";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import type { NavLink } from "@/lib/nav";

export default function NavMenu({ links }: { links: NavLink[] }) {
  return (
    <Menu>
      <MenuButton
        className="flex h-8 w-8 items-center justify-center rounded-lg text-indigo-200/65 transition hover:bg-gray-800 hover:text-gray-200 focus:outline-none data-[focus]:ring-2 data-[focus]:ring-indigo-500 data-[open]:bg-gray-800 data-[open]:text-gray-200"
        aria-label="Menu"
      >
        <svg
          className="h-4 w-4 fill-current"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <rect y="2" width="16" height="2" rx="1" />
          <rect y="7" width="16" height="2" rx="1" />
          <rect y="12" width="16" height="2" rx="1" />
        </svg>
      </MenuButton>
      <MenuItems
        anchor={{ to: "bottom end", gap: 12, padding: 16 }}
        className="z-50 w-52 rounded-xl border border-gray-800 bg-gray-900/95 p-1.5 shadow-xl backdrop-blur-sm transition duration-100 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
        transition
      >
        {links.map((link) => (
          <MenuItem key={link.href}>
            <Link
              href={link.href}
              className="block rounded-lg px-3 py-2 text-sm text-indigo-200/65 transition data-[focus]:bg-gray-800 data-[focus]:text-gray-200"
            >
              {link.label}
            </Link>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}

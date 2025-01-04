"use client";

import { type LucideIcon } from "lucide-react";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
export function NavMain({
  items,
  path,
}: {
  items: {
    title: string;
    url: string;
    icon?: LucideIcon;
    disabled?: boolean;
  }[];
  path: string;
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Content</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem key={item.url}>
            <SidebarMenuButton
              tooltip={item.title}
              isActive={item.url === path}
              disabled={item.disabled}
              aria-disabled={item.disabled}
              asChild
              className={cn(item.disabled && 'pointer-events-none opacity-50')}
            >
              <Link href={item.url}>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}

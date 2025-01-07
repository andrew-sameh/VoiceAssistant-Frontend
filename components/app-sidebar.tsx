"use client";

import * as React from "react";
import {
  Notebook,
  BookOpen,
  Bot,
  BrainCog,
  FileText
} from "lucide-react";
import { usePathname } from "next/navigation";

import { NavMain } from "@/components/nav-main";
// import { NavProjects } from "@/components/nav-projects"
// import { NavUser } from "@/components/nav-user"
// import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  navMain: [
    {
      title: "Voice Assistant",
      url: "/",
      icon: Bot,
    },
    {
      title: "Reservations",
      url: "/reservations",
      icon: Notebook,
    },
    {
      title: "RAG" ,
      url: "/rag",
      icon: FileText,
    },
    {
      title: "Documentation",
      url: "/docs",
      icon: BookOpen,
      disabled: true
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <BrainCog className="mx-auto w-6 h-6 mt-2" />
        {/* <span className="ml-2">CineLounge Demo</span> */}
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} path={pathname} />
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}

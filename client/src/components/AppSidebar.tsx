import { NavLink } from 'react-router';
import {
  Avatar,
  AvatarFallback,
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from '@databricks/appkit-ui/react';
import { TrendingUp } from 'lucide-react';
import { useBranding } from '@/branding/BrandingProvider';
import { PRIMARY_NAV, SECONDARY_NAV, type NavItem } from '@/data/nav';

function NavList({ items }: { items: NavItem[] }) {
  return (
    <SidebarMenu>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <SidebarMenuItem key={item.to}>
            <NavLink to={item.to} end>
              {({ isActive }) => (
                <SidebarMenuButton
                  isActive={isActive}
                  tooltip={item.label}
                  className="cursor-pointer"
                >
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              )}
            </NavLink>
          </SidebarMenuItem>
        );
      })}
    </SidebarMenu>
  );
}

export function AppSidebar() {
  const { logoSrc } = useBranding();

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="bg-primary p-0">
        <div className="flex h-12 items-center gap-2 px-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="flex items-center gap-2 pl-1 text-primary-foreground group-data-[collapsible=icon]:hidden">
            <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md bg-white/15">
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt=""
                  className="max-h-7 max-w-7 object-contain"
                />
              ) : (
                <TrendingUp className="size-4" />
              )}
            </div>
            <span className="text-sm font-semibold tracking-wide">
              Command Center
            </span>
          </div>
          <SidebarTrigger className="ml-auto size-8 cursor-pointer text-primary-foreground hover:bg-white/10 hover:text-primary-foreground group-data-[collapsible=icon]:ml-0" />
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <NavList items={PRIMARY_NAV} />
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <NavList items={SECONDARY_NAV} />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="cursor-pointer">
              <Avatar className="size-8 rounded-md">
                <AvatarFallback className="rounded-md bg-muted text-xs font-semibold">
                  AM
                </AvatarFallback>
              </Avatar>
              <div className="flex min-w-0 flex-col text-left leading-tight">
                <span className="truncate text-sm font-semibold">Alex Morgan</span>
                <span className="truncate text-xs text-muted-foreground">
                  SVP Operations
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}

import { 
  LayoutDashboard, 
  Headphones, 
  Landmark, 
  FileText, 
  Receipt, 
  ArrowDownToLine, 
  ArrowUpFromLine, 
  Bitcoin, 
  AlertTriangle, 
  ArrowLeftRight,
  HelpCircle,
  Settings,
  ChevronLeft
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const mainItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Fale com seu Gerente", url: "/gerente", icon: Headphones },
];

const reportItems = [
  { title: "Extrato", url: "/extrato", icon: Receipt },
  { title: "Entradas", url: "/entradas", icon: ArrowDownToLine },
  { title: "Saídas Pix", url: "/saidas-pix", icon: ArrowUpFromLine },
  { title: "Saídas Cripto", url: "/saidas-cripto", icon: Bitcoin },
  { title: "Infrações", url: "/infracoes", icon: AlertTriangle },
  { title: "Transferências Internas", url: "/transferencias", icon: ArrowLeftRight },
];

const footerItems = [
  { title: "Central de Ajuda", url: "/ajuda", icon: HelpCircle },
  { title: "Configurações", url: "/configuracoes", icon: Settings },
];

interface AppSidebarProps {
  onOpenTransfer?: () => void;
  onOpenReceive?: () => void;
}

export function AppSidebar({ onOpenTransfer, onOpenReceive }: AppSidebarProps) {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;

  const isReportActive = reportItems.some((item) => currentPath === item.url);

  return (
    <Sidebar collapsible="icon" className="border-r border-border/40">
      <SidebarHeader className="border-b border-border/40 p-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <span className="text-2xl font-bold text-primary">PIX</span>
            <span className="text-2xl font-bold text-foreground">UP</span>
          </div>
          {!collapsed && (
            <button className="ml-auto p-1 hover:bg-accent rounded-md transition-colors">
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>
        
        {!collapsed && (
          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xs font-medium">F</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">fabianosil...</div>
              <div className="h-1 bg-muted rounded-full mt-1">
                <div className="h-full w-1/3 bg-primary rounded-full"></div>
              </div>
            </div>
            <div className="w-4 h-4 rounded-full bg-muted"></div>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"}
                      className="hover:bg-accent/50 transition-colors" 
                      activeClassName="bg-primary/20 text-primary font-medium border-l-2 border-primary"
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <Collapsible className="group/collapsible-finance">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="hover:bg-accent/50 transition-colors">
                      <Landmark className="h-4 w-4" />
                      {!collapsed && <span>Financeiro</span>}
                      {!collapsed && (
                        <svg
                          className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible-finance:rotate-90"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <button
                              onClick={onOpenTransfer}
                              className="hover:bg-accent/50 transition-colors w-full flex items-center gap-2 text-left"
                            >
                              <ArrowUpFromLine className="h-4 w-4" />
                              <span>Realizar Transferência</span>
                            </button>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                        <SidebarMenuSubItem>
                          <SidebarMenuSubButton asChild>
                            <button
                              onClick={onOpenReceive}
                              className="hover:bg-accent/50 transition-colors w-full flex items-center gap-2 text-left"
                            >
                              <Bitcoin className="h-4 w-4" />
                              <span>Receber via Pix</span>
                            </button>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>

              <Collapsible defaultOpen={isReportActive} className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton className="hover:bg-accent/50 transition-colors">
                      <FileText className="h-4 w-4" />
                      {!collapsed && <span>Relatórios</span>}
                      {!collapsed && (
                        <svg
                          className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-90"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6" />
                        </svg>
                      )}
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  {!collapsed && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {reportItems.map((item) => (
                          <SidebarMenuSubItem key={item.title}>
                            <SidebarMenuSubButton asChild>
                              <NavLink
                                to={item.url}
                                className="hover:bg-accent/50 transition-colors"
                                activeClassName="bg-primary/20 text-primary font-medium"
                              >
                                <item.icon className="h-4 w-4" />
                                <span>{item.title}</span>
                              </NavLink>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-border/40">
        <SidebarMenu>
          {footerItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink 
                  to={item.url}
                  className="hover:bg-accent/50 transition-colors"
                  activeClassName="bg-primary/20 text-primary font-medium"
                >
                  <item.icon className="h-4 w-4" />
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

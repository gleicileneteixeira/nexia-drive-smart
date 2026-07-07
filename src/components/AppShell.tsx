import { Link, Outlet, useLocation } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { RequireAuth } from "./RequireAuth";
import { ProfilePrompt } from "./ProfilePrompt";
import { Flame, Home, Sparkles, Zap, Trophy, TrafficCone, Brain, Library, LogIn, LogOut, UserCircle, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV = [
  { to: "/", label: "Início", icon: Home },
  { to: "/simulado", label: "Simulado", icon: Sparkles },
  { to: "/placas", label: "Placas", icon: TrafficCone },
  { to: "/psicotecnico", label: "Psico", icon: Brain },
  { to: "/biblioteca", label: "Biblioteca", icon: Library },
  { to: "/mais-caem", label: "Mais Caem", icon: Flame },
  { to: "/turbo", label: "Turbo", icon: Zap },
  { to: "/conquistas", label: "Conquistas", icon: Trophy },
] as const;

export function AppShell() {
  const { pathname } = useLocation();
  const { user, signOut } = useAuth();

  const activeAuth = pathname === "/auth" || pathname === "/admin";

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-40 glass border-b border-border/40">
        <div className="mx-auto max-w-6xl px-4 h-16 flex items-center justify-between gap-3">
          <Link to="/" className="shrink-0">
            <Logo />
          </Link>
          <div className="hidden md:flex items-center gap-0.5 min-w-0 flex-1 justify-center">
            {NAV.map((item) => {
              const active = pathname === item.to;
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`relative px-2 py-2 rounded-lg text-sm font-medium flex items-center gap-1.5 whitespace-nowrap transition-colors ${
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                  {active && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-lg bg-primary/15 border border-primary/30"
                      transition={{ type: "spring", stiffness: 300, damping: 28 }}
                    />
                  )}
                </Link>
              );
            })}

            {/* Auth link / user menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className={`relative px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                    activeAuth
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}>
                    <UserCircle className="h-4 w-4" />
                    <span className="max-w-[120px] truncate">{user.email}</span>
                    {activeAuth && (
                      <motion.div
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-lg bg-primary/15 border border-primary/30"
                        transition={{ type: "spring", stiffness: 300, damping: 28 }}
                      />
                    )}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                      <Shield className="h-4 w-4" />
                      Admin
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
                    <LogOut className="h-4 w-4" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link
                to="/auth"
                className={`relative px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
                  activeAuth
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LogIn className="h-4 w-4" />
                Entrar
                {activeAuth && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-primary/15 border border-primary/30"
                    transition={{ type: "spring", stiffness: 300, damping: 28 }}
                  />
                )}
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full glass whitespace-nowrap">
              <Flame className="h-4 w-4 text-warning" />
              <span className="text-sm font-semibold">7</span>
              <span className="text-xs text-muted-foreground">dias</span>
            </div>
            {/* Mobile auth button */}
            <div className="md:hidden">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                      <UserCircle className="h-5 w-5" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center gap-2 cursor-pointer">
                        <Shield className="h-4 w-4" />
                        Admin
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="flex items-center gap-2 cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  to="/auth"
                  className="p-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LogIn className="h-5 w-5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <ProfilePrompt />

      <main className="flex-1">
        {pathname === "/auth" || pathname === "/reset-password" ? (
          <Outlet />
        ) : (
          <RequireAuth>
            <Outlet />
          </RequireAuth>
        )}
      </main>

      {/* Mobile nav */}
      <nav className="md:hidden sticky bottom-0 z-40 glass border-t border-border/40">
        <div className="grid grid-cols-9">
          {[...NAV, { to: "/auth", label: user ? "Conta" : "Entrar", icon: user ? UserCircle : LogIn }].map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex flex-col items-center gap-1 py-2.5 text-[11px] ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

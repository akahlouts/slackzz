import { FC, ReactNode } from "react";

import { ThemeProvider } from "@/providers/theme-provider";
import { WebSocketProvider } from "@/providers/web-socket";
import { ColorPreferencesProvider } from "@/providers/color-preferences";

import MainContent from "@/components/main-content";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WebSocketProvider>
        <ColorPreferencesProvider>
          <MainContent>{children}</MainContent>
        </ColorPreferencesProvider>
      </WebSocketProvider>
    </ThemeProvider>
  );
};

export default MainLayout;

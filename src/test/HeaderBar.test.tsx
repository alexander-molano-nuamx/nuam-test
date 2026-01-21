import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  AppBar,
  SwitchThemeButton,
  CalendarButton,
  NotificationButton,
  LanguageButton,
  UserButton,
  HEADER_HEIGHT,
} from "@nuam/common-fe-lib-components";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Mock del logo para pruebas
const mockLogoSrc = "/test-logo.svg";

// Wrapper con tema para componentes que usan useColorScheme
const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const theme = createTheme({
    cssVariables: {
      colorSchemeSelector: "data-nuam-theme",
    },
    colorSchemes: {
      light: true,
      dark: true,
    },
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

describe("HeaderBar", () => {
  describe("AppBar Component", () => {
    const mockToggleSidebar = vi.fn();

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should render with default NUAM text when no logo provided", () => {
      render(
        <ThemeWrapper>
          <AppBar toggleSidebar={mockToggleSidebar} />
        </ThemeWrapper>
      );

      expect(screen.getByText("NUAM")).toBeInTheDocument();
    });

    it("should render custom logo when provided", () => {
      const customLogo = <img src={mockLogoSrc} alt="Custom Logo" />;

      render(
        <ThemeWrapper>
          <AppBar toggleSidebar={mockToggleSidebar} logo={customLogo} />
        </ThemeWrapper>
      );

      expect(screen.getByAltText("Custom Logo")).toBeInTheDocument();
    });

    it("should render appTitle when provided", () => {
      render(
        <ThemeWrapper>
          <AppBar toggleSidebar={mockToggleSidebar} appTitle="Test App" />
        </ThemeWrapper>
      );

      expect(screen.getByText("Test App")).toBeInTheDocument();
    });

    it("should call toggleSidebar when menu button is clicked", () => {
      render(
        <ThemeWrapper>
          <AppBar toggleSidebar={mockToggleSidebar} />
        </ThemeWrapper>
      );

      const menuButton = screen.getByLabelText("menu");
      fireEvent.click(menuButton);

      expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
    });

    it("should render rightSideComponents when provided", () => {
      render(
        <ThemeWrapper>
          <AppBar
            toggleSidebar={mockToggleSidebar}
            rightSideComponents={<button data-testid="custom-button">Custom</button>}
          />
        </ThemeWrapper>
      );

      expect(screen.getByTestId("custom-button")).toBeInTheDocument();
    });

    it("should have correct HEADER_HEIGHT constant", () => {
      expect(HEADER_HEIGHT).toBe(49);
    });
  });

  describe("AppBar with IsotypeName", () => {
    const mockToggleSidebar = vi.fn();

    beforeEach(() => {
      vi.clearAllMocks();
    });

    it("should render IsotypeName when useIsotypeName is true", () => {
      render(
        <ThemeWrapper>
          <AppBar
            toggleSidebar={mockToggleSidebar}
            useIsotypeName={true}
            isotypeNameProps={{ projectName: "TestProject" }}
          />
        </ThemeWrapper>
      );

      expect(screen.getByText("TestProject")).toBeInTheDocument();
    });

    it("should render IsotypeName with logo when logoSrc is provided", () => {
      render(
        <ThemeWrapper>
          <AppBar
            toggleSidebar={mockToggleSidebar}
            useIsotypeName={true}
            isotypeNameProps={{
              projectName: "TestProject",
              logoSrc: mockLogoSrc,
              alt: "Test Logo",
            }}
          />
        </ThemeWrapper>
      );

      expect(screen.getByAltText("Test Logo")).toBeInTheDocument();
    });

    it("should render IsotypeName with showText prop", () => {
      render(
        <ThemeWrapper>
          <AppBar
            toggleSidebar={mockToggleSidebar}
            useIsotypeName={true}
            isotypeNameProps={{
              projectName: "NUAM",
              logoSrc: mockLogoSrc,
              showText: true,
            }}
          />
        </ThemeWrapper>
      );

      // Con showText=true, el texto debe mostrarse incluso con logo
      expect(screen.getByText("NUAM")).toBeInTheDocument();
    });

    it("should use default projectName NUAM when isotypeNameProps not provided", () => {
      render(
        <ThemeWrapper>
          <AppBar toggleSidebar={mockToggleSidebar} useIsotypeName={true} />
        </ThemeWrapper>
      );

      expect(screen.getByText("NUAM")).toBeInTheDocument();
    });

    it("should render with variant prop in isotypeNameProps", () => {
      render(
        <ThemeWrapper>
          <AppBar
            toggleSidebar={mockToggleSidebar}
            useIsotypeName={true}
            isotypeNameProps={{
              projectName: "TestProject",
              variant: "dark",
            }}
          />
        </ThemeWrapper>
      );

      expect(screen.getByText("TestProject")).toBeInTheDocument();
    });

    it("should not render default NUAM typography when useIsotypeName is true", () => {
      render(
        <ThemeWrapper>
          <AppBar
            toggleSidebar={mockToggleSidebar}
            useIsotypeName={true}
            isotypeNameProps={{ projectName: "CustomName" }}
          />
        </ThemeWrapper>
      );

      // No debería haber un Typography h6 con "NUAM"
      const nuamTypography = screen.queryByRole("heading", { level: 6 });
      expect(nuamTypography).not.toBeInTheDocument();
    });

    it("should prefer useIsotypeName over logo prop", () => {
      const customLogo = <img src="/other-logo.svg" alt="Other Logo" />;

      render(
        <ThemeWrapper>
          <AppBar
            toggleSidebar={mockToggleSidebar}
            logo={customLogo}
            useIsotypeName={true}
            isotypeNameProps={{ projectName: "IsotypeName" }}
          />
        </ThemeWrapper>
      );

      // Debe mostrar IsotypeName, no el logo custom
      expect(screen.getByText("IsotypeName")).toBeInTheDocument();
      expect(screen.queryByAltText("Other Logo")).not.toBeInTheDocument();
    });
  });

  describe("Header Buttons", () => {
    it("should render SwitchThemeButton", () => {
      render(
        <ThemeWrapper>
          <SwitchThemeButton data-testid="theme-button" />
        </ThemeWrapper>
      );

      expect(screen.getByTestId("theme-button")).toBeInTheDocument();
    });

    it("should render CalendarButton with current date", () => {
      render(
        <ThemeWrapper>
          <CalendarButton data-testid="calendar-button" />
        </ThemeWrapper>
      );

      const button = screen.getByTestId("calendar-button");
      expect(button).toBeInTheDocument();
      // Verificar que contiene una fecha en formato DD/MM/YYYY
      expect(button.textContent).toMatch(/\d{2}\/\d{2}\/\d{4}/);
    });

    it("should render NotificationButton", () => {
      render(
        <ThemeWrapper>
          <NotificationButton data-testid="notification-button" />
        </ThemeWrapper>
      );

      expect(screen.getByTestId("notification-button")).toBeInTheDocument();
    });

    it("should render LanguageButton", () => {
      render(
        <ThemeWrapper>
          <LanguageButton data-testid="language-button" />
        </ThemeWrapper>
      );

      expect(screen.getByTestId("language-button")).toBeInTheDocument();
    });

    it("should render UserButton", () => {
      render(
        <ThemeWrapper>
          <UserButton data-testid="user-button" />
        </ThemeWrapper>
      );

      expect(screen.getByTestId("user-button")).toBeInTheDocument();
    });
  });

  describe("Theme Integration", () => {
    const mockToggleSidebar = vi.fn();

    it("should render AppBar with all header buttons", () => {
      render(
        <ThemeWrapper>
          <AppBar
            toggleSidebar={mockToggleSidebar}
            useIsotypeName={true}
            isotypeNameProps={{ projectName: "NUAM", showText: true }}
            rightSideComponents={
              <>
                <SwitchThemeButton data-testid="theme-btn" />
                <CalendarButton data-testid="calendar-btn" />
                <NotificationButton data-testid="notification-btn" />
                <LanguageButton data-testid="language-btn" />
                <UserButton data-testid="user-btn" />
              </>
            }
          />
        </ThemeWrapper>
      );

      expect(screen.getByTestId("theme-btn")).toBeInTheDocument();
      expect(screen.getByTestId("calendar-btn")).toBeInTheDocument();
      expect(screen.getByTestId("notification-btn")).toBeInTheDocument();
      expect(screen.getByTestId("language-btn")).toBeInTheDocument();
      expect(screen.getByTestId("user-btn")).toBeInTheDocument();
    });
  });
});

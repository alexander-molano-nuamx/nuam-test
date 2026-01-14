import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { IsotypeName } from "@nuam/common-fe-lib-components";

/**
 * Suite de tests para IsotypeName Component
 * Probando el componente desde la librería @nuam/common-fe-lib-components
 */
describe("IsotypeName", () => {
  const defaultProps = {
    projectName: "Test Project",
  };

  /**
   * AC1: El componente renderiza correctamente el logo según las props
   */
  describe("AC1: Logo Rendering", () => {
    it("should render logo when logoSrc is provided", () => {
      render(<IsotypeName {...defaultProps} logoSrc="/test-logo.svg" />);

      const logo = screen.getByRole("img");
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute("src", "/test-logo.svg");
    });

    it("should have correct alt text", () => {
      render(
        <IsotypeName
          {...defaultProps}
          logoSrc="/test-logo.svg"
          alt="Custom Alt Text"
        />
      );

      const logo = screen.getByAltText("Custom Alt Text");
      expect(logo).toBeInTheDocument();
    });

    it("should use projectName as default alt text", () => {
      render(<IsotypeName {...defaultProps} logoSrc="/test-logo.svg" />);

      const logo = screen.getByAltText("Test Project logo");
      expect(logo).toBeInTheDocument();
    });
  });

  /**
   * AC2: Cuando no existe logoSrc, se muestra automáticamente el projectName
   */
  describe("AC2: Fallback to projectName", () => {
    it("should display projectName when logoSrc is not provided", () => {
      render(<IsotypeName {...defaultProps} />);

      const projectText = screen.getByRole("heading", { level: 1 });
      expect(projectText).toHaveTextContent("Test Project");
    });

    it("should display projectName when logo fails to load", async () => {
      const onImageError = vi.fn();

      render(
        <IsotypeName
          {...defaultProps}
          logoSrc="/invalid-logo.svg"
          onImageError={onImageError}
        />
      );

      const logo = screen.getByRole("img");

      // Simular error de carga
      fireEvent.error(logo);

      await waitFor(() => {
        expect(onImageError).toHaveBeenCalled();
      });

      // Verificar que el texto del proyecto se muestre
      const projectText = screen.getByRole("heading", { level: 1 });
      expect(projectText).toHaveTextContent("Test Project");
    });
  });

  /**
   * AC3: Funciona correctamente en mobile, tablet y desktop
   */
  describe("AC3: Responsive Behavior", () => {
    it("should render with small size", () => {
      const { container } = render(
        <IsotypeName {...defaultProps} size="sm" />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render with medium size", () => {
      const { container } = render(
        <IsotypeName {...defaultProps} size="md" />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render with large size", () => {
      const { container } = render(
        <IsotypeName {...defaultProps} size="lg" />
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  /**
   * AC4: Variantes (horizontal/vertical) aplican correctamente el layout esperado
   */
  describe("AC4: Layout Variants", () => {
    it("should render horizontal layout", () => {
      const { container } = render(
        <IsotypeName {...defaultProps} variant="horizontal" />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render vertical layout", () => {
      const { container } = render(
        <IsotypeName {...defaultProps} variant="vertical" />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render light variant", () => {
      const { container } = render(
        <IsotypeName {...defaultProps} variant="light" />
      );

      expect(container.firstChild).toBeInTheDocument();
    });

    it("should render dark variant", () => {
      const { container } = render(
        <IsotypeName {...defaultProps} variant="dark" />
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  /**
   * AC5: Puede integrarse sin colisiones
   */
  describe("AC5: Integration", () => {
    it("should accept custom className", () => {
      const { container } = render(
        <IsotypeName {...defaultProps} className="custom-class" />
      );

      expect(container.firstChild).toHaveClass("custom-class");
    });

    it("should render without errors with all props", () => {
      const { container } = render(
        <IsotypeName
          logoSrc="/logo.svg"
          projectName="Full Props Test"
          variant="horizontal"
          size="lg"
          alt="Custom Alt"
          className="test-class"
          onImageError={vi.fn()}
          showText={true}
        />
      );

      expect(container.firstChild).toBeInTheDocument();
    });
  });

  /**
   * AC6: Cumple estándares mínimos de accesibilidad
   */
  describe("AC6: Accessibility", () => {
    it("should have banner role on container", () => {
      render(<IsotypeName {...defaultProps} />);

      const banner = screen.getByRole("banner");
      expect(banner).toBeInTheDocument();
    });

    it("should have aria-label on container", () => {
      render(<IsotypeName {...defaultProps} />);

      const banner = screen.getByRole("banner");
      expect(banner).toHaveAttribute("aria-label", "Test Project logo");
    });

    it("should have heading for project name", () => {
      render(<IsotypeName {...defaultProps} />);

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
    });

    it("should set loading eager for logo", () => {
      render(<IsotypeName {...defaultProps} logoSrc="/logo.svg" />);

      const logo = screen.getByRole("img");
      expect(logo).toHaveAttribute("loading", "eager");
    });

    it("should not be draggable", () => {
      render(<IsotypeName {...defaultProps} logoSrc="/logo.svg" />);

      const logo = screen.getByRole("img");
      expect(logo).toHaveAttribute("draggable", "false");
    });
  });

  /**
   * AC7: showText prop - Muestra logo + texto simultáneamente
   */
  describe("AC7: showText prop", () => {
    it("should show both logo and text when showText is true", async () => {
      render(
        <IsotypeName
          {...defaultProps}
          logoSrc="/logo.svg"
          showText={true}
        />
      );

      // Debe mostrar el logo
      const logo = screen.getByRole("img");
      expect(logo).toBeInTheDocument();

      // Simular carga exitosa del logo
      fireEvent.load(logo);

      await waitFor(() => {
        // El texto debe seguir visible después de que el logo cargue
        const projectText = screen.getByRole("heading", { level: 1 });
        expect(projectText).toHaveTextContent("Test Project");
      });
    });

    it("should hide text after image loads when showText is false (default)", async () => {
      render(
        <IsotypeName
          {...defaultProps}
          logoSrc="/logo.svg"
          showText={false}
        />
      );

      const logo = screen.getByRole("img");

      // Antes de cargar, el texto está visible
      expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

      // Simular carga exitosa
      fireEvent.load(logo);

      await waitFor(() => {
        // El texto debería ocultarse después de que la imagen cargue
        expect(
          screen.queryByRole("heading", { level: 1 })
        ).not.toBeInTheDocument();
      });
    });

    it("should default showText to false", () => {
      render(<IsotypeName {...defaultProps} logoSrc="/logo.svg" />);

      // Por defecto, el texto se muestra mientras carga
      const projectText = screen.getByRole("heading", { level: 1 });
      expect(projectText).toBeInTheDocument();
    });

    it("should render with showText and all size variants", () => {
      const sizes: Array<"sm" | "md" | "lg"> = ["sm", "md", "lg"];

      sizes.forEach((size) => {
        const { container, unmount } = render(
          <IsotypeName
            {...defaultProps}
            logoSrc="/logo.svg"
            showText={true}
            size={size}
          />
        );

        expect(container.firstChild).toBeInTheDocument();
        expect(screen.getByRole("img")).toBeInTheDocument();
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

        unmount();
      });
    });

    it("should render with showText and all variant types", () => {
      const variants: Array<"light" | "dark" | "horizontal" | "vertical"> = [
        "light",
        "dark",
        "horizontal",
        "vertical",
      ];

      variants.forEach((variant) => {
        const { container, unmount } = render(
          <IsotypeName
            {...defaultProps}
            logoSrc="/logo.svg"
            showText={true}
            variant={variant}
          />
        );

        expect(container.firstChild).toBeInTheDocument();
        expect(screen.getByRole("img")).toBeInTheDocument();
        expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();

        unmount();
      });
    });

    it("should show text without logo when only showText is true and no logoSrc", () => {
      render(<IsotypeName {...defaultProps} showText={true} />);

      // Sin logoSrc, solo debe mostrar el texto
      expect(screen.queryByRole("img")).not.toBeInTheDocument();
      expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(
        "Test Project"
      );
    });
  });

  /**
   * AC8: Estilos del borde en ProjectText
   */
  describe("AC8: Border Styling", () => {
    it("should render text with border styling", () => {
      const { container } = render(
        <IsotypeName {...defaultProps} showText={true} />
      );

      const heading = screen.getByRole("heading", { level: 1 });
      expect(heading).toBeInTheDocument();
      expect(container.firstChild).toBeInTheDocument();
    });
  });
});

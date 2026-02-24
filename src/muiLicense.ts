import { LicenseInfo } from "@mui/x-license";

/**
 * Inicializa la licencia MUI X Pro
 * La key se obtiene de la variable de entorno VITE_MUI_LICENSE
 */
function initializeMuiLicense() {
  const licenseKey = import.meta.env.VITE_MUI_LICENSE;

  if (!licenseKey) {
    console.warn(
      "⚠️ MUI X License is deployed by DevOPs team.",
      "Please contact them to obtain the license key",
      "and set it in the VITE_MUI_LICENSE environment variable.",
    );
    return;
  }

  try {
    LicenseInfo.setLicenseKey(licenseKey);
    console.log("✓ MUI X License initialized successfully");
  } catch (error) {
    console.error("✗ Error initializing MUI X License:", error);
  }
}

initializeMuiLicense();

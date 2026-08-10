import { LicenseInfo } from "@mui/x-license";

/**
 * Inicializa la licencia MUI X Pro
 * La key se obtiene de la variable de entorno MUI_LICENSE_KEY
 */
function initializeMuiLicense() {
  const licenseKey = import.meta.env.MUI_LICENSE_KEY;

  if (!licenseKey) {
    console.warn(
      "⚠️ MUI X License is deployed by DevOPs team.",
      "Please contact them to obtain the license key",
      "and set it in the MUI_LICENSE_KEY environment variable.",
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

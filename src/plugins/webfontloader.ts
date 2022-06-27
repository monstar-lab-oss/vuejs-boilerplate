/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts() {
  const webFontLoader = await import("webfontloader");

  webFontLoader.load({
    google: {
      families: ["Lato:400,700&display=swap", "Noto+Sans+JP:400,700,900&display=swap"],
    },
  });
}

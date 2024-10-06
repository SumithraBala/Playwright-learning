export const isDesktopViewport = (page) => {
    // Define a minimum width for a desktop viewport
    const desktopMinWidth = 600; // Adjust as needed

     // Get the current viewport width
    const viewportWidth = page.viewportSize().width

    // Return true if the viewport width meets or exceeds the minimum
    return viewportWidth >= desktopMinWidth;

   }
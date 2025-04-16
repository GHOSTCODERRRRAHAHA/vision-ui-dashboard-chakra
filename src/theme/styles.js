export const globalStyles = {
  colors: {
    gray: {
      900: "#0A0A0A",
      800: "#121212",
      700: "#1A1A1A",
      600: "#2D2D2D",
      500: "#3D3D3D",
      400: "#666666",
      300: "#888888",
      200: "#AAAAAA",
      100: "#DDDDDD",
      50: "#F7F7F7",
    },
    brand: {
      50: "#E5E5E5",
      100: "#CCCCCC",
      200: "#333333",
      300: "#2A2A2A",
      400: "#212121",
      500: "#181818",
      600: "#121212",
      700: "#0A0A0A",
      800: "#050505",
      900: "#000000"
    },
    navy: {
      900: "#000000",
      800: "#0A0A0A",
      700: "#101010",
      600: "#181818",
      500: "#1F1F1F",
      400: "#252525",
      300: "#2A2A2A"
    },
    accent: {
      blue: "#CCCCCC",
      purple: "#AAAAAA",
      pink: "#999999",
      teal: "#888888",
      orange: "#777777",
      green: "#666666"
    }
  },
  styles: {
    global: (props) => ({
      body: {
        fontFamily: "Plus Jakarta Display",
        fontSize: "16px",
        lineHeight: "1.5",
        color: "white",
        letterSpacing: "0.2px",
        backgroundImage: "linear-gradient(127.09deg, #0A0A0A 0%, #000000 100%)",
        backgroundAttachment: "fixed",
      },
      "*::placeholder": {
        color: "gray.400",
      },
      html: {
        fontFamily: "Plus Jakarta Display",
        scrollBehavior: "smooth",
      },
      "h1, h2, h3, h4, h5, h6": {
        letterSpacing: "0.4px",
        marginBottom: "0.5rem",
        fontWeight: "500",
      },
      h1: {
        fontSize: "2.5rem",
      },
      h2: {
        fontSize: "2rem",
      },
      h3: {
        fontSize: "1.75rem",
      },
      h4: {
        fontSize: "1.5rem",
      },
      h5: {
        fontSize: "1.25rem",
      },
      h6: {
        fontSize: "1rem",
      },
      p: {
        marginBottom: "1rem",
      },
      a: {
        textDecoration: "none",
        transition: "color 0.3s ease",
      },
      "::-webkit-scrollbar": {
        width: "8px",
        height: "8px",
      },
      "::-webkit-scrollbar-track": {
        backgroundColor: "rgba(0, 0, 0, 0.1)",
        borderRadius: "10px",
      },
      "::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(255, 255, 255, 0.1)",
        borderRadius: "10px",
        "&:hover": {
          backgroundColor: "rgba(255, 255, 255, 0.2)",
        },
      },
      ".chakra-text": {
        lineHeight: "1.6",
      },
      ".chakra-card": {
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
      },
      ".chakra-button": {
        fontWeight: "500",
        borderRadius: "12px",
        padding: "10px 16px",
        transition: "all 0.3s ease",
      },
      ".glassmorphism": {
        backdropFilter: "blur(20px)",
        backgroundColor: "rgba(15, 15, 15, 0.8)",
        border: "1px solid rgba(50, 50, 50, 0.3)",
      },
      ".premium-gradient": {
        background: "linear-gradient(135deg, #333333 0%, #000000 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }
    }),
  },
};

export const buttonStyles = {
  components: {
    Button: {
      variants: {
        "no-hover": {
          _hover: {
            boxShadow: "none",
          },
        },
        "transparent-with-icon": {
          bg: "transparent",
          fontWeight: "bold",
          borderRadius: "inherit",
          cursor: "pointer",
          _hover: {
            bg: "rgba(255, 255, 255, 0.05)",
            transform: "translateY(-1px)",
          },
          _active: {
            bg: "transparent",
            transform: "none",
            borderColor: "transparent",
          },
          _focus: {
            boxShadow: "none",
          },
        },
        brand: {
          bg: "linear-gradient(135deg, #333333 0%, #121212 100%)",
          color: "#fff",
          fontWeight: "500",
          _hover: {
            bg: "linear-gradient(135deg, #444444 0%, #222222 100%)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.4)",
          },
          _active: {
            bg: "linear-gradient(135deg, #222222 0%, #000000 100%)",
            transform: "translateY(0)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)",
          },
          _focus: {
            boxShadow: "0 0 0 3px rgba(100, 100, 100, 0.4)",
          },
        },
        outlineWhite: {
          bg: "transparent",
          color: "#fff",
          borderColor: "rgba(255, 255, 255, 0.2)",
          borderWidth: "1px",
          fontWeight: "500",
          backdropFilter: "blur(5px)",
          _hover: {
            borderColor: "rgba(255, 255, 255, 0.4)",
            bg: "rgba(255, 255, 255, 0.05)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
          },
          _active: {
            bg: "rgba(255, 255, 255, 0.1)",
            transform: "translateY(0)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)",
          },
          _focus: {
            boxShadow: "0 0 0 3px rgba(200, 200, 200, 0.3)",
          },
        },
        glass: {
          bg: "rgba(25, 25, 25, 0.8)",
          color: "#fff",
          borderColor: "rgba(100, 100, 100, 0.2)",
          borderWidth: "1px",
          fontWeight: "500",
          backdropFilter: "blur(10px)",
          _hover: {
            bg: "rgba(35, 35, 35, 0.9)",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
          },
          _active: {
            bg: "rgba(20, 20, 20, 1)",
            transform: "translateY(0)",
          },
          _focus: {
            boxShadow: "0 0 0 3px rgba(100, 100, 100, 0.3)",
          },
        },
        accent: {
          bg: "#333333",
          color: "#fff",
          fontWeight: "500",
          _hover: {
            bg: "#444444",
            transform: "translateY(-2px)",
            boxShadow: "0 8px 20px rgba(0, 0, 0, 0.3)",
          },
          _active: {
            bg: "#222222",
            transform: "translateY(0)",
          },
          _focus: {
            boxShadow: "0 0 0 3px rgba(100, 100, 100, 0.3)",
          },
        },
      },
      baseStyle: {
        borderRadius: "12px",
        fontWeight: "500",
        padding: "10px 20px",
        transition: "all 0.2s ease",
        letterSpacing: "0.3px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
        _focus: {
          boxShadow: "0 0 0 3px rgba(100, 100, 100, 0.6)",
        },
      },
      sizes: {
        sm: {
          fontSize: "14px",
          height: "36px",
          padding: "0 16px",
        },
        md: {
          fontSize: "15px",
          height: "42px",
          padding: "0 20px",
        },
        lg: {
          fontSize: "16px",
          height: "48px",
          padding: "0 24px",
        },
      },
    },
  },
};

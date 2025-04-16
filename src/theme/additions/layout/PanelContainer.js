const PanelContainer = {
  baseStyle: {
    p: { base: "15px", md: "30px 30px" },
    minHeight: "calc(100vh - 123px)",
    maxWidth: "1600px",
    mx: "auto",
    transition: "all 0.3s ease",
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      height: "1px",
      background: "linear-gradient(90deg, rgba(224, 225, 226, 0) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(224, 225, 226, 0) 100%)",
      zIndex: 0
    }
  },
};

export const PanelContainerComponent = {
  components: {
    PanelContainer,
  },
};

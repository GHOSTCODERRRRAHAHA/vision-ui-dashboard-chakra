const Card = {
  baseStyle: {
    p: "24px",
    display: "flex",
    flexDirection: "column",
    backdropFilter: "blur(20px)",
    width: "100%",
    borderRadius: "20px",
    bg: "linear-gradient(126.97deg, rgba(10, 10, 10, 0.9) 28.26%, rgba(25, 25, 25, 0.8) 91.2%)",
    border: "1px solid rgba(50, 50, 50, 0.2)",
    backgroundClip: "border-box",
    boxShadow: "0 20px 27px 0 rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    _hover: {
      transform: "translateY(-5px)",
      boxShadow: "0 22px 35px 0 rgba(0, 0, 0, 0.2)",
      border: "1px solid rgba(75, 75, 75, 0.3)",
    },
  },
};

export const CardComponent = {
  components: {
    Card,
  },
};

const CONSTANTS = {
  NODE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5001"
      : process.env.NEXT_PUBLIC_NODE_URL,
};

export default CONSTANTS;

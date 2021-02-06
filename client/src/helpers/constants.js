const CONSTANTS = {
  NODE_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5001"
      : process.env.NEXT_PUBLIC_NODE_URL,
  APP_URL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : process.env.NEXT_PUBLIC_APP_URL,
};

export default CONSTANTS;

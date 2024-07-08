"use client";

const getToken = () => {
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split("; ");

    for (const cookie of cookies) {
      const [name, value] = cookie.split("=");
      if (name === "user") {
        return value;
      }
    }
  }

  return null;
};

export default getToken;

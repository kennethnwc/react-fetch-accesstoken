export const getDataWithAuth = async (
  url: string,
  accessToken: string,
  refreshToken: string
) => {
  let accessTokenToFetch = accessToken;
  let retryCounter = 3;
  while (retryCounter > 0) {
    const data = await fetch(url, {
      headers: { Authorization: `Bearer ${accessTokenToFetch}` },
    })
      .then((r) => r.json())
      .catch(() => {
        return "access token expired";
      });
    if (data === "access token expired") {
      retryCounter--;
      const newAccess = await fetch("/api/refresh", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      })
        .then((r) => r.json())
        .catch(() => {
          return "refresh Token expired";
        });
      if (newAccess && newAccess.accessToken) {
        accessTokenToFetch = newAccess.accessToken;
      } else {
        throw Error("refresh token expired");
      }
    } else {
      return { data, accessToken };
    }
  }
};

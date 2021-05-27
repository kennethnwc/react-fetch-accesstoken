const fetching = async (
  url: string,
  times: number,
  accessToken: string
): Promise<Response> => {
  const data = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
    .then((r) => r.json())
    .catch(() => "Expired");
  console.log("data", data);

  if (data === "Expired") {
    if (times > 0) {
      const result = await fetch("/api/refresh", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }).then((r) => {
        if (r.status === 401) {
          router.push("/");
          setTokens({ accessToken: "", refreshToken: "" });
          return;
        }
        return r.json();
      });
      return await fetching(url, times - 1, result?.accessToken);
    }
  }
  return data;
};

const user = fetching("/api/profile", 3, accessToken);
console.log("user", user);

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTokenStore } from "../store/useTokenStore";

const ProfilePage = () => {
  const { accessToken, refreshToken, setTokens } = useTokenStore();
  const [user, setUser] = useState(null);
  const router = useRouter();
  useEffect(() => {
    const fetching = async (url: string) => {
      let counter = 0;
      let accessTokenToFetch = accessToken;
      while (counter < 5) {
        try {
          console.log(counter);
          const data = await fetch(url, {
            headers: { Authorization: `Bearer ${accessTokenToFetch}` },
          }).then((r) => r.json());
          return { data, accessToken: accessTokenToFetch };
        } catch {
          counter++;
          const newAccessToken = await fetch("/api/refresh", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          }).then((r) => r.json());
          if (!newAccessToken) {
            throw Error("Expired Refresh Token");
          }
          accessTokenToFetch = newAccessToken.accessToken;
        }
      }
    };
    (async () => {
      try {
        const data = await fetching("/api/profile").then((r) => r);
        await setTokens({ accessToken: data?.accessToken!, refreshToken });
        console.log(data);
      } catch (err) {
        console.log(err);
        console.log("Logout");
      }
    })();
  }, []);
  return (
    <div className="mx-auto container">
      <pre>{user}</pre>
    </div>
  );
};

export default ProfilePage;

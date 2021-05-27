import { useRouter } from "next/router";
import { useEffect } from "react";
import { useTokenStore } from "../store/useTokenStore";

const ProfilePage = () => {
  const { accessToken, refreshToken, setTokens } = useTokenStore();
  const router = useRouter();
  useEffect(() => {
    const fetching = async (url: string) => {
      let counter = 0;
      let accessTokenToFetch = accessToken;
      while (counter < 5) {
        const data = await fetch(url, {
          headers: { Authorization: `Bearer ${accessTokenToFetch}` },
        });

        if (data.status === 200) {
          return await data.json();
        }

        const newAccessToken = await fetch("/api/refresh", {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        }).then((r) => r.json());
        if (!newAccessToken) {
          return null;
        }
        accessTokenToFetch = newAccessToken.accessToken;
        counter++;
      }
    };
    const data =  fetching("/api/profile");
    console.log("data", data);
    if (!data) {
      router.push("/");
    }
  }, []);
  return <div className="mx-auto container">I am Profile</div>;
};

export default ProfilePage;

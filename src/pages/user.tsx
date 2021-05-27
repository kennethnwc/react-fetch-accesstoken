import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { useTokenStore } from "../store/useTokenStore";
import { getDataWithAuth } from "../utils/getDataWithAuth";

const UserPage = () => {
  const { accessToken, refreshToken, setTokens } = useTokenStore();
  const [data, setData] = useState<{}>();
  console.log(accessToken, refreshToken);
  const router = useRouter();

  useEffect(() => {
    getDataWithAuth("/api/profile", accessToken, refreshToken)
      .then((r) => {
        const { data, accessToken } = r!;
        console.log(data);
        setData(data);
        setTokens({ accessToken, refreshToken });
      })
      .catch((e) => {
        console.log(e);
        router.push("/");
      });
  }, []);

  return (
    <div className="mx-auto container">
      <h1>{data && data.user}</h1>
    </div>
  );
};

export default UserPage;

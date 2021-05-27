import { useTokenStore } from "../store/useTokenStore";
import { useRouter } from "next/router";
const IndexPage = () => {
  const { setTokens } = useTokenStore();
  const router = useRouter();
  return (
    <>
      <h1 className="mx-5 text-red-500">Home</h1>
      <button
        onClick={async () => {
          const data = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify({ user: "a", pwd: "b" }),
            headers: { "Content-type": "application/json" },
          }).then((r) => r.json());
          setTokens(data);
          router.push("/profile");
        }}
      >
        Login
      </button>
    </>
  );
};

export default IndexPage;

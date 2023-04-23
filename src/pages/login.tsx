import { FormEvent } from "react";
import router from "next/router";

const LoginPage = () => {
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      router.push("/api/login");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

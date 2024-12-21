import { BASE_URL } from "../URL";

export async function handleLogin(email, password) {
  try {
    const url = `${BASE_URL}/user/auth/sign-in`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseData = await response.json();

    return {
      statusCode: response.status,
      data: responseData,
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: null,
      data: { status: "ERROR", msg: "An error occurred. Please check your network and try again." },
    };
  }
}

import jwt from "jsonwebtoken";


export function getDataFromToken(request) {
  try {
    const token = request.cookies.get("token")?.value;
    console.log("hello");

    if (!token) {
      throw new Error("Token missing");
    }

    const decodedUser = jwt.verify(token, process.env.SECRET);

    return decodedUser.id;
  } catch (error) {
    console.log("JWT error:", error);
    throw new Error("Invalid or expired token", { cause: error });
  }
}

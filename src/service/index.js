import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const getUserId = (request, requireAuth=true) => {
  const header = request.request ? request.request.headers.authorization : request.connection.context.Authorization;

  if (header) {
    const token = header.replace("Bearer ", "");
    const decoded = jwt.verify(token, "secretword")

    return decoded.userId;
  }
  if (requireAuth) {
    throw new Error("Authentication required!");
  }

  return null;
}

const getToken = userId => jwt.sign({userId}, "secretword", {expiresIn: "7 days"})

const hashPassword = password => {
  if (password.length < 8) {
    throw new Error("Password must be 8  or longer ...")
  }

  return bcrypt.hash(password, 10);
}
export {
  getUserId,
  getToken,
  hashPassword
};

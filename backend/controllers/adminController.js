import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { emailOrPhone, password } = req.body;

  const isEmailOrPhoneValid =
    emailOrPhone === process.env.ADMIN_EMAIL ||
    emailOrPhone === process.env.ADMIN_PHONE;

  if (isEmailOrPhoneValid && password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign({ user: emailOrPhone }, process.env.JWT_SECRET, {
      expiresIn: "16h",
    });

    return res.status(200).json({ token });
  } else {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

export const verifyToken = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ valid: true, user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

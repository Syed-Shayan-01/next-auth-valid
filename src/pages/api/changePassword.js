import { verifyPassword, getByEmail, updateUserPassword } from "@/service/user";

export default async function handler(req, res) {
  if (req.method !== "PATCH") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { email, oldPassword, newPassword } = req.body;

  try {
    const user = getByEmail(email);
    
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isOldPasswordValid = await verifyPassword(oldPassword, user.password);

    if (!isOldPasswordValid) {
      return res.status(400).json({ message: "Invalid old password." });
    }

    await updateUserPassword(email, newPassword);

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
}

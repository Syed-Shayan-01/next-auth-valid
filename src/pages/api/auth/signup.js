// import { registerUser } from "@/service/user";


import { registerUser, updateUserPassword } from "@/service/user"; // Make sure to have both functions imported

export default async function handler(req, res) {
    if (req.method === "POST") {
        const { email, password } = req.body;
        try {
            registerUser(email, password);
            return res.status(201).json({ message: "User registered successfully" });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    } else if (req.method === "PUT") {
        const { email, password } = req.body;
        try {
            updateUserPassword(email, password); // Call your function to update the password
            return res.status(200).json({ message: "Password updated successfully" });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    } else {
        return res.status(400).json({ message: "Bad request" });
    }
}




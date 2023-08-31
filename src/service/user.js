import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

const filePath = path.join(process.cwd(), 'src', 'db', 'users.json');

export const getAllUsers = () => {
    const users = fs.readFileSync(filePath);
    return JSON.parse(users);
}

export const getByEmail = (email) => {
    const users = getAllUsers();
    return users.find((user) => user.email.toLowerCase() === email.toLowerCase());
}


export const getById = (id) => {
    const users = getAllUsers();
    return users.find((user) => user.id === Number(id));
}

export const verifyPassword = async (password, hashedPassword) => {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
}

export const registerUser = async (email, password) => {
    const users = getAllUsers();
    const found = getByEmail(email);
    if (found) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    users.push({ id: users.length + 1, email, password: hashedPassword });
    fs.writeFileSync(filePath, JSON.stringify(users));
    return { email };
}

export const updateUserPassword = async (email, password) => {
    const users = getAllUsers();
    const user =  getByEmail(email)
    const hashedPassword = await bcrypt.hash(password, 12);
    user.password = hashedPassword;
    fs.writeFileSync(filePath, JSON.stringify(users));
    return { email }
};
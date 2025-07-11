import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;
    const filePath = path.join(process.cwd(), 'pages', 'api', 'users.json');

    let users = [];
    if (fs.existsSync(filePath)) {
        users = JSON.parse(fs.readFileSync(filePath));
    }

    if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: 'User already exists' });
    }

    const hashed = await bcrypt.hash(password, 10);
    users.push({ email, password: hashed });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    res.status(200).json({ success: true });
}

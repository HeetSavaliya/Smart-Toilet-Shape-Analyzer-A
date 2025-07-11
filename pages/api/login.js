import fs from 'fs';
import path from 'path';
import bcrypt from 'bcrypt';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();

    const { email, password } = req.body;
    const filePath = path.join(process.cwd(), 'pages', 'api', 'users.json');

    if (!fs.existsSync(filePath)) {
        return res.status(400).json({ error: 'No users yet' });
    }

    const users = JSON.parse(fs.readFileSync(filePath));
    const user = users.find(u => u.email === email);
    if (!user) return res.status(401).json({ error: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Wrong password' });

    // Fake login token
    res.setHeader('Set-Cookie', `logged_in=true; Path=/; HttpOnly`);
    res.status(200).json({ success: true });
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    // TODO: Replace with real session check (e.g., JWT, cookie, or auth header)
    const isAuthenticated = true; // ← insert real logic here

    if (!isAuthenticated) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    // ✅ Read from environment variable (NEVER hardcode tokens!)
    const gradioToken = process.env.ACCESS_TOKEN;
    const gradioURL = `https://huggingface.co/spaces/HeetSavaliya/Final_App/?access=${gradioToken}`;

    if (!gradioToken) {
        return res.status(500).json({ error: 'Missing Gradio token on server' });
    }

    return res.status(200).json({ url: gradioURL });
}

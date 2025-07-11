export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    // TODO: Add your actual auth/session logic here
    const isAuthenticated = true; // Replace with real logic (cookie, session, etc.)

    if (isAuthenticated) {
        // Never expose this token in client-side JS
        const gradioToken = '3v80mdr2k3rjig98bv9mcotf89';
        const gradioURL = `https://huggingface.co/spaces/HeetSavaliya/Final_App/?access=${gradioToken}`;

        res.status(200).json({ url: gradioURL });
    } else {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

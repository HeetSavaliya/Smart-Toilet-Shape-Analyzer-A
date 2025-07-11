export default function handler(req, res) {
    const cookie = req.headers.cookie || '';
    const loggedIn = cookie.includes('logged_in=true');
    if (loggedIn) res.status(200).end();
    else res.status(401).end();
}

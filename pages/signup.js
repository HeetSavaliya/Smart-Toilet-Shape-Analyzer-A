import { useState } from 'react';
import { useRouter } from 'next/router';

export default function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSignup = async () => {
        const res = await fetch('/api/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        if (res.ok) {
            alert('✅ Signup successful!');
            router.push('/');
        } else {
            const error = await res.json();
            alert('Signup failed: ' + (error?.error || 'Unknown error'));
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2 style={styles.title}>📝 Create an Account</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleSignup} style={styles.button}>
                    Sign Up
                </button>
                <p style={styles.footerText}>
                    Already have an account?{' '}
                    <a href="/" style={styles.link}>Login</a>
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f2f5',
        fontFamily: 'Arial, sans-serif',
    },
    card: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    title: {
        textAlign: 'center',
        marginBottom: '10px',
        color: '#333',
    },
    input: {
        padding: '12px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
    },
    button: {
        padding: '12px',
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
    },
    footerText: {
        textAlign: 'center',
        fontSize: '14px',
        color: '#555',
    },
    link: {
        color: '#0070f3',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function AppPage() {
  const router = useRouter();

  useEffect(() => {
    // POST request to check auth and get Gradio URL securely
    fetch('/api/get-gradio-url', {
      method: 'POST',
    })
      .then(res => res.json())
      .then(data => {
        if (data?.url) {
          window.location.href = data.url;
        } else {
          router.push('/');
        }
      })
      .catch(() => router.push('/'));
  }, []);

  return <p>Redirecting to Gradio app...</p>;
}

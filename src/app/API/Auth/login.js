export async function POST(request) {
    const { username, password, expiresInMins } = await request.json();
    console.log('Login request body:', { username, password });
  
    try {
      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          expiresInMins: expiresInMins || 30,
        }),
      });
  
      const data = await response.json();
      console.log('DummyJSON response status:', response.status);
      console.log('DummyJSON response data:', data);
  
      if (!response.ok) {
        return new Response(JSON.stringify(data), {
          status: response.status,
          headers: { 'Content-Type': 'application/json' },
        });
      }
  
      return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Set-Cookie': `accessToken=${data.accessToken}; Path=/; HttpOnly; SameSite=Lax`
        },
      });
    } catch (error) {

        console.error('Login error:', error);
      return new Response(JSON.stringify({ message: 'Internal server error' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
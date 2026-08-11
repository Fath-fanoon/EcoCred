const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000';

async function test() {
  // 1. Signup
  let res = await fetch(`${BASE_URL}/users/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Test User', email: 'testuser@example.com' })
  });
  let user = await res.json();
  console.log('Signup:', user);

  // 2. Login
  res = await fetch(`${BASE_URL}/users/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'testuser@example.com' })
  });
  user = await res.json();
  console.log('Login:', user);

  // 3. Submit Action
  res = await fetch(`${BASE_URL}/actions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      userId: user._id,
      type: 'Carpooling',
      imageUrl: 'mocked-url.jpg',
      gps: '12.34,56.78'
    })
  });
  const action = await res.json();
  console.log('Submit Action:', action);

  // 4. Get Actions
  res = await fetch(`${BASE_URL}/actions/${user._id}`);
  const actions = await res.json();
  console.log('Get Actions:', actions);

  // 5. Get Token Balance
  res = await fetch(`${BASE_URL}/tokens/${user._id}`);
  const tokens = await res.json();
  console.log('Get Tokens:', tokens);

  // 6. Reward Tokens
  res = await fetch(`${BASE_URL}/tokens/reward`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId: user._id, actionId: action._id })
  });
  const reward = await res.json();
  console.log('Reward Tokens:', reward);
}

test().catch(console.error); 
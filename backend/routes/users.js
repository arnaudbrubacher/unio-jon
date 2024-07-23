import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Environment variables
const {
  AUTH0_DOMAIN,
  CLIENT_ID,
  CLIENT_SECRET,
  AUDIENCE
} = process.env;

// Function to get Management API Access Token
const getAccessToken = async () => {
  const response = await axios.post(`https://${AUTH0_DOMAIN}/oauth/token`, {
    grant_type: 'client_credentials',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    audience: AUDIENCE
  });

  return response.data.access_token;
};

// Route to fetch all users
router.get('/', async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const usersResponse = await axios.get(`https://${AUTH0_DOMAIN}/api/v2/users`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    res.json(usersResponse.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Route to fetch a specific user by ID
router.get('/:id', async (req, res) => {
  try {
    const accessToken = await getAccessToken();
    const userResponse = await axios.get(`https://${AUTH0_DOMAIN}/api/v2/users/${req.params.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    res.json(userResponse.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;

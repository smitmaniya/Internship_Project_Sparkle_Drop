const axios = require('axios');

async function geocodeAddress(address) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json`;
  const params = {
    address,
    key: process.env.GOOGLE_MAPS_API_KEY
  };

  try {
    const response = await axios.get(url, { params });
    const { lat, lng } = response.data.results[0].geometry.location;
    return { lat, lng };
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

module.exports = geocodeAddress;

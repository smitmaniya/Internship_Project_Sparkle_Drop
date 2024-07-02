const axios = require('axios');
const ServiceProvider = require('../models/ServiceProvider');
const UserProfile = require('../models/userProfileModel');

// Function to get coordinates from address
const getCoordinates = async (address) => {
  const response = await axios.get(`https://nominatim.openstreetmap.org/search`, {
    params: {
      format: 'json',
      q: address,
      countrycodes: 'ca'
    },
    headers: {
      'User-Agent': 'YourAppName/1.0 (your-email@example.com)'
    }
  });

  if (response.data.length === 0) {
    console.warn(`Location not found for address: ${address}`);
    return null;
  }

  return {
    lat: parseFloat(response.data[0].lat),
    lon: parseFloat(response.data[0].lon)
  };
};

// Function to calculate distance using Haversine formula
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLon / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = (deg) => {
  return deg * (Math.PI / 180);
};

const findServiceProvidersInRange = async (req, res) => {
  const userId = req.params.userId;
  const { page = 1, limit = 10 } = req.body;

  try {
    const user = await UserProfile.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userCoords = await getCoordinates(user.address);
    if (!userCoords) {
      return res.status(404).json({ error: 'User location not found' });
    }

    const serviceProviders = await ServiceProvider.find();
    const nearbyProviders = [];

    for (const provider of serviceProviders) {
      const providerCoords = await getCoordinates(provider.address);
      if (!providerCoords) {
        continue; // Skip providers with invalid addresses
      }

      const distance = getDistanceFromLatLonInKm(
        userCoords.lat,
        userCoords.lon,
        providerCoords.lat,
        providerCoords.lon
      );

      if (distance <= 5) {
        nearbyProviders.push(provider);
      }
    }

    const total = nearbyProviders.length;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const paginatedProviders = nearbyProviders.slice(startIndex, endIndex);

    res.json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: paginatedProviders
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

module.exports = {
  findServiceProvidersInRange,
};

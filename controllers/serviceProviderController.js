const axios = require('axios');
const ServiceProvider = require('../models/ServiceProvider');
const UserProfile = require('../models/userProfileModel');

// Function to get coordinates from postal code
const getCoordinates = async (postalCode) => {
  const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&postalcode=${postalCode}&countrycodes=us`);
  if (response.data.length === 0) {
    throw new Error('Location not found');
  }
  return {
    lat: response.data[0].lat,
    lon: response.data[0].lon
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

  try {
    const user = await UserProfile.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userCoords = await getCoordinates(user.postalCode);
    const serviceProviders = await ServiceProvider.find();
    const nearbyProviders = [];

    for (const provider of serviceProviders) {
      const providerCoords = await getCoordinates(provider.postalCode);
      const distance = getDistanceFromLatLonInKm(
        parseFloat(userCoords.lat),
        parseFloat(userCoords.lon),
        parseFloat(providerCoords.lat),
        parseFloat(providerCoords.lon)
      );

      if (distance <= 5) {
        nearbyProviders.push(provider);
      }
    }

    res.json(nearbyProviders);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while processing your request' });
  }
};

module.exports = {
  findServiceProvidersInRange,
};

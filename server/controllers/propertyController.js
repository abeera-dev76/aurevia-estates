const properties = require('../data/properties');

function getAllProperties(req, res) {
  const { type, status, category, minPrice, maxPrice, bedrooms, location, search } = req.query;
  let results = [...properties];

  if (type)      results = results.filter(p => p.type?.toLowerCase()     === type.toLowerCase());
  if (status)    results = results.filter(p => p.status?.toLowerCase()   === status.toLowerCase());
  if (category)  results = results.filter(p => p.category?.toLowerCase() === category.toLowerCase());
  if (location)  results = results.filter(p => p.location?.toLowerCase().includes(location.toLowerCase()));
  if (search)    results = results.filter(p =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.location?.toLowerCase().includes(search.toLowerCase())
  );
  if (minPrice) results = results.filter(p => p.price >= Number(minPrice));
  if (maxPrice) results = results.filter(p => p.price <= Number(maxPrice));
  if (bedrooms) results = results.filter(p => p.bedrooms >= Number(bedrooms));

  res.json({ success: true, count: results.length, data: results });
}

function getPropertyById(req, res) {
  const property = properties.find(p => p.id === req.params.id);
  if (!property) return res.status(404).json({ success: false, message: 'Property not found.' });
  res.json({ success: true, data: property });
}

module.exports = { getAllProperties, getPropertyById };

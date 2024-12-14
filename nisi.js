function processData(data, format) {
  switch (format) {
    case 'geojson':
      return handleGeoJSON(data);
    // Handle other formats...
    case 'json':
      return handleJSON(data);
    case 'xml':
      return handleXML(data);
    default:
      throw new Error('Unsupported format');
  }
}

function handleGeoJSON(data) {
  // Parse the GeoJSON data
  const geojson = JSON.parse(data);

  // Example: Extracting features from GeoJSON
  if (geojson.type === 'FeatureCollection') {
    return geojson.features.map(feature => ({
      type: feature.type,
      geometry: feature.geometry,
      properties: feature.properties
    }));
  } else if (geojson.type === 'Feature') {
    return {
      type: geojson.type,
      geometry: geojson.geometry,
      properties: geojson.properties
    };
  } else {
    throw new Error('Invalid GeoJSON data');
  }
}

function handleJSON(data) {
  // Handle generic JSON data
  return JSON.parse(data);
}

function handleXML(data) {
  // Handle XML data (this is just a placeholder example)
  const parser = new DOMParser();
  return parser.parseFromString(data, 'application/xml');
}

// Example Usage:
const geojsonData = `{
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [102.0, 0.5]
      },
      "properties": {
        "prop0": "value0"
      }
    }
  ]
}`;

try {
  const result = processData(geojsonData, 'geojson');
  console.log(result);
} catch (error) {
  console.error('Error processing data:', error.message);
}

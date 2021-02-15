const Headers = {
  'Authorization': `Bearer ${process.env.API_TOKEN}`,
  'X-Contentful-Content-Type': `${process.env.CONTENT_TYPE_ID}`
};

const BaseURL = 'https://api.contentful.com/';

const DataURL = `spaces/${process.env.SPACE_ID}/environments/${process.env.ENVIRONMENT}/entries`;

const ParamsURL = `?select=fields,sys.id,sys.version&locale=es-MX&content_type=${process.env.CONTENT_TYPE_ID}`

const Common = {
  Headers,
  BaseURL,
  DataURL,
  ParamsURL
}

export default Common;
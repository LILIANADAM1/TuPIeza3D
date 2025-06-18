import config from '../data/products-config.json';

export const getProductPrice = (product) => {
  const name = (product.name || '').toLowerCase();
  
  // Busca categoría según keywords en config.categories
  let matchedCategoryKey = null;

  for (const [catKey, catData] of Object.entries(config.categories)) {
    if (catData.keywords.some(keyword => name.includes(keyword))) {
      matchedCategoryKey = catKey;
      break;
    }
  }

  const categoryData = matchedCategoryKey
    ? config.categories[matchedCategoryKey]
    : config.defaultCategory;

  // Calcula precio
  const { min, max, step } = categoryData.priceRange;
  const nameLength = name.length;
  const increment = Math.floor(nameLength / 5);
  const variation = increment * step;

  const priceRaw = Math.min(min + variation, max);
  const price = Number(priceRaw.toFixed(2));

  console.log(`Producto: ${name} | Categoría: ${categoryData.name} | Precio: ${price.toFixed(2)}`);

  return price.toFixed(2);
};

export const getProductDescription = (product) => {
  const firstTag = product.tags?.find(tag => config.products[tag]);
  const productConfig = firstTag ? config.products[firstTag] : null;

  if (productConfig) {
    return productConfig.description;
  }

  return product.description || 'Producto en 3D';
};

export const getCategoryName = (categoryKey) => {
  if (!categoryKey) return '';
  return config.categories[categoryKey.toLowerCase()]?.name || config.defaultCategory.name;
};

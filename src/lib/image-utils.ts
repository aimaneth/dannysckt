/**
 * Generates a placeholder image URL from Unsplash for food-related images
 * @param seed A string to generate consistent images for the same product
 * @returns Unsplash image URL
 */
export function getFoodPlaceholderImage(seed: string): string {
  // List of specific food-related Unsplash photo IDs
  const foodPhotos = [
    'pLKgCsBOiw4', // Malaysian food
    'kcA-c3f_3FE', // Noodles
    'Y6OgisiGBjM', // Asian cuisine
    'Yr4n8O_3UPc', // Street food
    'eeqbbemH9-c', // Asian dish
    '4_jhDO54BYg', // Stir fry
    'G5nxqA4MHFY', // Malaysian street food
    'B5PNpc5RdHk', // Asian noodles
    'SqYmTDQYMjo', // Hawker food
    'MAhxnW3y8B4', // Char kuey teow
  ];

  // Use the seed to consistently pick a photo
  const photoIndex = seed.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % foodPhotos.length;
  const photoId = foodPhotos[photoIndex];

  return `https://images.unsplash.com/photo-${photoId}?w=800&h=800&fit=crop&q=80&auto=format`;
} 
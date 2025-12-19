import { createProduct } from "./queries/product.js";
import { createUser } from "./queries/users.js";

export default async function seed() {
  // CREATE USER SEED

  const [alyssa, katelyn, teranae, shikha] = await Promise.all([
    createUser({
      username: "alyssa",
      email: "alyssaradlauer@gmail.com",
      password: "cheezitsAREgood",
    }),
    createUser({
      username: "katelyn",
      email: "katelynconrad424@email.com",
      password: "Ladybug218496!",
    }),
    createUser({
      username: "teranae",
      email: "naethevettech@gmail.com",
      password: "Capstone2025",
    }),
    createUser({
      username: "shikha",
      email: "mailto:shikhadevi101@gmail.com",
      password: "Avir",
    }),
  ]);

  //CREATE PRODUCT SEED
  const products = await Promise.all([
    createProduct({
      name: "Pro Plan Dog Food - Chicken and Rice",
      description:
        "Highly digestible adult dog food formula for optimal nutrient delivery",
      price: 65,
      category: "food",
      pet_type: "dog",
      image_url: "image",
      quantity: 1,
    }),
    createProduct({
      name: "Pro Plan Dog Food - Sensitive Skin",
      description: "Vitamin E & Omega-6 Promote Skin & Coat Health",
      price: 45,
      category: "food",
      pet_type: "dog",
      image_url: "image",
      quantity: 1,
    }),
    createProduct({
      name: "Pro Plan Dog Food - Digestive Health",
      description: "High protein chicken and rice",
      price: 54,
      category: "food",
      pet_type: "dog",
      image_url: "image",
      quantity: 1,
    }),
    createProduct({
      name: "Pro Plan Cat Food - Allergen Reducing",
      description:
        "Chicken and rice innovative formula with a key protein sourced from eggs to help limit cat major allergen",
      price: 30,
      category: "food",
      pet_type: "cat",
      image_url: "image",
      quantity: 1,
    }),
    createProduct({
      name: "Pro Plan Cat Food - Weight Management",
      description:
        "Kibble guaranteed live probiotics for digestive health and antioxidants to boost the immune system",
      price: 35,
      category: "food",
      pet_type: "cat",
      image_url: "image",
      quantity: 1,
    }),
    createProduct({
      name: "Pro Plan Cat Food - Urinary Tract Health",
      description:
        "Made to maintain your kitty's urinary tract health - high protein wet cat food recipes reduce urinary pH and provide low dietary magnesium",
      price: 32,
      category: "food",
      pet_type: "cat",
      image_url: "image",
      quantity: 1,
    }),
    createProduct({
      name: "Busy Bone Jerky Wraps Chew Treats",
      description: "Made with real beefhide and wrapped in real chicken jerky",
      price: 15,
      category: "treats",
      pet_type: "dog",
      image_url: "image",
      quantity: 1,
    }),
    createProduct({
      name: "Friskies Party Mix Beachside Crunch",
      description:
        "Ocean whitefish, shrimp, crab, and tuna - under 2 calories per treat",
      price: 16,
      category: "treats",
      pet_type: "cat",
      image_url: "image",
      quantity: 1,
    }),
    createProduct({
      name: "Purina Pro Plan Veterinary Supplements FortiFlora Canine Health Supplement",
      description:
        "Number 1 veterinarian-recommended dog probiotic brand to support digestive health",
      price: 45,
      category: "supplements",
      pet_type: "dog",
      image_url: "image",
      quantity: 1,
    }),
    createProduct({
      name: "Pro Plan Veterinary Supplements Hydra Care Feline Hydration Supplement ",
      description:
        "The supplement promotes hydration and increases total fluid intake ",
      price: 42,
      category: "supplements",
      pet_type: "cat",
      image_url: "image",
      quantity: 1,
    }),
  ]);

  //CREATE ORDER SEED

  const order1 = await createOrder({
    user_id: alyssa.id,
    date: "2025-12-15",
    note: "Alyssa's first order",
  });
  await Promise.all([
    addProductToOrder({
      order_id: order1.id,
      product_id: products[0].id,
      quantity: 1,
    }),
    addProductToOrder({
      order_id: order1.id,
      product_id: products[2].id,
      quantity: 1,
    }),
    addProductToOrder({
      order_id: order1.id,
      product_id: products[3].id,
      quantity: 2,
    }),
    addProductToOrder({
      order_id: order1.id,
      product_id: products[5].id,
      quantity: 1,
    }),
    addProductToOrder({
      order_id: order1.id,
      product_id: products[8].id,
      quantity: 1,
    }),
  ]);
}

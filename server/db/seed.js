import { createProduct } from "./queries/product.js";
import { createUser } from "./queries/users.js";
import { createOrder } from "./queries/orders.js";
import { addProductToOrder } from "./queries/order_items.js";

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
      name: "Purina Pro Plan - Sensitive Skin and Stomach",
      description:
        "Salmon and rice adult dry dog food - Nutrient rich food made to nourish beneficial bacteria and improve digestive health",
      price: 95,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://dulcealcance.com/cdn/shop/files/8_f6543811-d2c5-412a-b280-11ac4eace4e5.png?v=1731541375&width=1445",
      quantity: 1,
    }),
    createProduct({
      name: "Purina One - Lamb and Rice",
      description:
        "Dry lamb and rice blend to promote healthy skin coat and protein intake. Contains glucosamine for hip and joint health",
      price: 49,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://www.purina.com/sites/default/files/products/purina-one-dry-dog-food-lamb-rice-new.png",
      quantity: 1,
    }),
    createProduct({
      name: "Purina Pro Plan - High Energy High Protein",
      description:
        "Sport 30/20 Salmon and Rice Dry Formula, made for optimal energy when hunting, sporting and physiological demanding activities",
      price: 75,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/2267593-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Merrick Backcountry Grain Free Kibble",
      description:
        "Grain free, freeze dried combination of raw beef and turkey - maintain lean muscle mass and energy levels",
      price: 85,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://www.merrickpetcare.com/sites/default/files/2025-11/merrick-backcountry-heros-banquet-pacakge.png",
      quantity: 1,
    }),
    createProduct({
      name: "Purina One Grain-Free Wet Formula",
      description:
        "13 oz - Grain free, high protein, wet dog food variety pack containing turkey, venison, duck, and chicken",
      price: 14,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://img4.dhresource.com/webp/m/0x0/f3/albu/jc/s/25/6a2ad6ec-5119-431a-a484-643927a26f35.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Hill's Science Diet Adult Sensitive Stomach and Skin - Chicken",
      description:
        "30 lbs, highly digestible for optimal nutrient absorption and easy stool pick-up",
      price: 84,
      category: "food",
      pet_type: "dog",
      image_url: "https://m.media-amazon.com/images/I/81ywQBb-diL.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Purina Pro Plan Complete Essentials - Shredded Blend Chicken and Rice Dry Dog Food",
      description:
        "47lb 100% complete and balanced nutrient-rich adult dog food, contains real chicken and probiotics ",
      price: 97,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://www.purina.com/sites/default/files/products/2024-12/pro_plan_complete_essentials_chicken_rice_dry_dog_food_35lb.png",
      quantity: 1,
    }),
    createProduct({
      name: "The Honest Kitchen Wholemade Whole Grain Fish and Oats Dog Food",
      description:
        "10lbs, dehydrated food concentrate - real ingredients, minimal processing, robust nutrition - just add water to serve as a complete meal",
      price: 108,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068dd69a-1c69-72b2-8000-238a8f115162._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Hill's Science Diet Adult Large Breed Chicken & Barley Recipe Dry Dog Food",
      description:
        "45lbs, specially formulated to fuel the energy needs of large breed dogs - Made with high-quality, easy-to digest-ingredients",
      price: 98,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/3870116-CENTER-1",
      quantity: 1,
    }),
    createProduct({
      name: "Pedigree Grilled Steak & Vegetable Flavor Adult Dry Dog Food",
      description:
        "44lbs, supports everyday health and natural vitality and is formulated with 36 vitamins, minerals, and amino acids - supports lean muscles and healthy digestion",
      price: 34,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://i5.walmartimages.com/seo/Pedigree-Complete-Nutrition-Grilled-Steak-Vegetable-Dry-Dog-Food-for-Adult-Dog-44-lb-Bag_356a4e4e-f551-441f-833d-74192a3afa2b.72c620bb4169c9998732d47b0c891a91.jpeg",
      quantity: 1,
    }),
    createProduct({
      name: "Taste of the Wild Pacific Stream Grain-Free with Smoke-Flavored Salmon Dry Dog Food",
      description:
        "28lbs, fish protein, grain-free recipe with sweet potatoes to provide highly digestible energy - Made with real smoke-flavored salmon to provide ingredients and nutrition needed to thrive",
      price: 59,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/2998871-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Blue Buffalo Life Protection Formula Chicken & Brown Rice Adult Dry Dog Food",
      description:
        "30lbs, made with the finest natural ingredients enhanced with vitamins, minerals, and other nutrients - high-quality, balanced recipe made with real chicken",
      price: 68,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://i5.walmartimages.com/seo/Blue-Buffalo-Life-Protection-Formula-Adult-Dry-Dog-Food-Chicken-Brown-Rice-30-lbs_78fd8b59-757b-4e35-bcfd-7b95f8393d9d.e59525b86b5e057d099cde514ce03371.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
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
      price: 70,
    }),
    addProductToOrder({
      order_id: order1.id,
      product_id: products[2].id,
      quantity: 1,
      price: 70,
    }),
    addProductToOrder({
      order_id: order1.id,
      product_id: products[3].id,
      quantity: 2,
      price: 70,
    }),
    addProductToOrder({
      order_id: order1.id,
      product_id: products[5].id,
      quantity: 1,
      price: 70,
    }),
    addProductToOrder({
      order_id: order1.id,
      product_id: products[8].id,
      quantity: 1,
      price: 70,
    }),
  ]);
}

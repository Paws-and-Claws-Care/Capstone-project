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

  //DOG FOOD
  const products = await Promise.all([
    //Dog Beds
    createProduct({
      name: "Orthopedic Dog Beds",
      description:  "Supportive beds designed to relieve joint pressure and provide extra comfort for senior and large dogs.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/moe/068a853c-d054-7bee-8000-3ad522d7ee54._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Bolster Beds",
      description:  "Cozy beds with raised edges that provide comfort, support, and a secure place to rest.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/moe/0691e23d-7a19-7c9e-8000-8d6b91c1022b._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Elevated Beds",
      description:  "Raised, breathable beds that keep dogs cool, supported, and off the ground.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"hhttps://image.chewy.com/catalog/general/images/moe/068b0b1b-8549-7655-8000-54f4e4acda58._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Pillow Beds",
      description:  "Soft, cushion-style beds that provide cozy comfort for dogs who love to sprawl.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/moe/069271f8-a668-7c02-8000-ab91cff4f261._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
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
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/moe/06940689-7a05-73cb-8000-4afe41ffb7d2._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

//Dog Collars, Leashes & Harnesses
    createProduct({
      name: "Collars",
      description: "Comfortable, durable collars that keep dogs safe and stylish for everyday wear.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/pawfurevers-waterproof-odorless-dog-collar-pink-teal-small/img-368930._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
 createProduct({
      name: "Harnesses",
      description: "Supportive, secure harnesses for comfortable walks and better control.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/moe/0691639c-5122-7c2b-8000-2ba354eb4e07._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
 createProduct({
      name: "Leashes",
      description: "Strong, reliable leashes for safe and enjoyable walks every day.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/pawtitas-recycled-reflective-dog-leash-teal-large/img-519138._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
 createProduct({
      name: "ID tags & Accessories",
      description: "Personalized ID tags and handy accessories to keep dogs safe and organized.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image",//"https://image.chewy.com/catalog/general/images/pawfurever-dog-breed-stainless-steel-personalized-dog-id-tag-husky-gold/img-277747._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
 createProduct({
      name: "Headcollar",
      description: "Gentle, effective head collars for training and better control on walks.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/halti-reflective-padded-no-pull-dog-headcollar-cobalt-blue-size-3/img-710880._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
 createProduct({
      name: "Service Dog",
      description: "Specialized gear designed for working dogs to perform tasks safely and efficiently.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image",//"https://image.chewy.com/catalog/general/images/industrial-puppy-reflective-service-dog-harness-leash-red-x-large-30-to-39in-chest/img-217969._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Smart Collars & Training",
      description: "Smart collars and training tools designed to support safety, tracking, and positive behavior.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image",//"https://image.chewy.com/catalog/general/images/bousnic-smart-bark-collar-waterproof-automatic-bark-control-dog-training-collar-black/img-473696._AC_SL496_V1_.jpg",
    }),
    createProduct({
      name: "Tie Outs",
      description: "Secure tie-outs that give dogs freedom while keeping them safely contained.",
      price: 54,
      category: "Supplies",
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
      name: "Crate Mats & Pads",
      description:
        "Soft, supportive bedding that adds comfort to crates and kennels.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image",//"https://image.chewy.com/catalog/general/images/frisco-swirl-dog-crate-mat-gray-42/img-566295._AC_SL496_V1_.jpg",
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

    createProduct({
      name: "Pet Honesty Skin & Coat Health Chews Allergy Relief of Itchy Skin Supplement",
      description:
        "Tasty supplement helps to soothe skin, a purr-fect combination of a crunchy outer shell and creamy filling",
      price: 14.99,
      category: "Skin and Coat Supplement",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/pet-honesty-skin-coat-health-chews-allergy-relief-of-itchy-skin-supplement-for-cats-3-7oz-bag/img-697084._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Vet Worthy Feline Hairball Support with Pumpkin Soft Chew Skin & Coat Supplement",
      description:
        "This supplement is formulated for kitties over 12 weeks old to eliminate and prevent hairballs",
      price: 14.99,
      category: "Skin and Coat Supplement",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068e394b-791f-780d-8000-ddc6df539280._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Deley Naturals Fish Oil Cat Supplement",
      description:
        "Made from wild-caught fish oil from sardines, herrings, mackerels and anchovies that provide omega-3, -6 and -9 fatty acids to deliver higher levels of EPA and DHA without mercury",
      price: 31.96,
      category: "Skin and Coat Supplement",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06818ff7-5865-7fd3-8000-962055f16b18._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Pet Honesty Senior Joint Support Chicken Flavored Chews Joint Supplement for Joint Pain & Arthritis Relief for Adult & Senior Cats",
      description:
        "This supplement may help ease stiffness and support cartilage health for arthritis pain relief",
      price: 14.99,
      category: "Hip and Joint Supplement",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/067d436a-a703-77bd-8000-d7834fff62a3._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Nutramax Cosequin Hip & Joint with Glucosamine, Chondroitin & Omega-3s Soft Chew Joint Supplement",
      description:
        "Contains Glucosamine for Cats - Cosequin contains glucosamine hydrochloride (FCHG49®) and sodium chondroitin sulfate (TRH122®). This unique combination of ingredients supports healthy joints",
      price: 12.48,
      category: "Hip and Joint Supplement",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068a7822-0006-70c3-8000-9b6f4a2aa7f9._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Nutramax Dasuquin Hip & Joint Soft Chews Joint Supplement",
      description:
        "Formulated with glucosamine, chondroitin sulfate and avocado/soybean unsaponifiables (ASU) to support your cat’s joint health",
      price: 15.99,
      category: "Hip and Joint Supplement",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/nutramax-dasuquin-hip-joint-soft-chews-joint-supplement-for-cats-84-count/img-174158._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "VetriScience Veterinary Strength Healthy Hip & Joint VetriFlex Chicken Flavored Soft Chew Joint Supplement",
      description:
        "Helps maintain mobility, lubricate joints, and manage joint discomfort",
      price: 20.89,
      category: "Hip and Joint Supplement",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06862eab-80dc-795c-8000-3b912a4bec94._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Purina Pro Plan Veterinary Diets FortiFlora Powder Probiotic Digestive Supplement",
      description:
        "This veterinarian-recommended probiotic helps support digestive health in cats and kittens",
      price: 30.99,
      category: "Digestive Supplement",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/purina-pro-plan-veterinary-diets-fortiflora-powder-probiotic-digestive-supplement-for-cats-30-count/img-772792._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Nutramax Proviable Probiotics & Prebiotics Digestive Health Supplement",
      description:
        "A Healthy Gut Supports Overall Health - Probiotics help support intestinal health after imbalances, such as diet changes, food sensitivities, dietary indiscretions, or stress from travel or kenneling.",
      price: 19.97,
      category: "Digestive Supplement",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/nutramax-proviable-probiotics-prebiotics-digestive-health-supplement-for-dogs-cats-30-count/img-490591._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Royal Canin Probiotics Digestive & Immune Health Powder Supplement",
      description:
        "Royal Canin Cat Probiotics boost beneficial bacteria in the gut for feline friends of all ages and sizes",
      price: 9.99,
      category: "Digestive Supplement",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068402d8-3497-7578-8000-d9e75d11efbd._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "VetOne Advita Probiotic Nutritional Cat Supplement",
      description:
        "Contains vitamins A, E, and C plus taurine for overall health",
      price: 23.47,
      category: "Digestive Supplement",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/vetone-advita-probiotic-nutritional-cat-supplement-30-count/img-681574._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Capstar Flea Oral Treatment for Cats, 2-25 lbs",
      description:
        "This oral flea treatment is a fast, effective way to help your four-legged family member get rid of fleas, and it’s available without a prescription",
      price: 43.19,
      category: "Flea & Tick",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06851c60-54cf-73b3-8000-7ce5d499d1bb._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Seresto Flea & Tick Collar for Cats",
      description:
        "Seresto kills and repels fleas by contact, so pests don’t have to bite your cat for the collar to be effective",
      price: 59.99,
      category: "Flea & Tick",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/seresto-flea-tick-collar-for-cats-1-collar-8-mos-supply/img-761379._SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Virbac Knockout E.S. Area Treatment Spray",
      description:
        "Reaches fleas hidden in carpets, rugs, drapes, upholstery, pet bedding, and floor cracks for greater effectiveness",
      price: 32.29,
      category: "Flea & Tick",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/virbac-knockout-es-area-treatment-spray-16fl-oz-can/img-602172._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Advantage Flea & Tick Treatment Shampoo for Cats & Kittens",
      description:
        "Scientifically-formulated shampoo effectively kills fleas and ticks on contact to help prevent flea dermatitis, Lyme disease and more",
      price: 14.99,
      category: "Flea & Tick",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/advantage-flea-tick-treatment-shampoo-for-cats-kittens-8fl-oz-bottle/img-644371._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Nutramax Solliquin Soft Chew Calming Behavioral Health Supplement for Small/Medium Dogs & Cats",
      description:
        "Solliquin is a non-sedating, calming support supplement that is intended for daily use in small to medium dogs and cats of all sizes",
      price: 19.99,
      category: "Anixety & Calming",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06846b38-3280-766e-8000-112eb2d392d4._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Purina Pro Plan Veterinary Diets Calming Care Cat Supplement",
      description:
        "Helps your kitty cope with changes in their routine and location, relieves cat stress, and supports positive behaviors—like playing and seeking out social contact",
      price: 33.99,
      category: "Anixety & calming ",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/purina-pro-plan-veterinary-diets-calming-care-cat-supplement-30-count/img-387023._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),
  ]);

  //CREATE ORDER SEED

  // const order1 = await createOrder({
  //   user_id: alyssa.id,
  //   date: "2025-12-15",
  //   note: "Alyssa's first order",
  // });
  // await Promise.all([
  //   addProductToOrder({
  //     order_id: order1.id,
  //     product_id: products[0].id,
  //     quantity: 1,
  //     price: 70,
  //   }),
  //   addProductToOrder({
  //     order_id: order1.id,
  //     product_id: products[2].id,
  //     quantity: 1,
  //     price: 70,
  //   }),
  //   addProductToOrder({
  //     order_id: order1.id,
  //     product_id: products[3].id,
  //     quantity: 2,
  //     price: 70,
  //   }),
  //   addProductToOrder({
  //     order_id: order1.id,
  //     product_id: products[5].id,
  //     quantity: 1,
  //     price: 70,
  //   }),
  //   addProductToOrder({
  //     order_id: order1.id,
  //     product_id: products[8].id,
  //     quantity: 1,
  //     price: 70,
  //   }),
  // ]);
}


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
    //Dog Beds
    createProduct({
      name: "Orthopedic Dog Beds",
      description:  "Supportive beds designed to relieve joint pressure and provide extra comfort for senior and large dogs.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/moe/068a853c-d054-7bee-8000-3ad522d7ee54._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Bolster Beds",
      description:  "Cozy beds with raised edges that provide comfort, support, and a secure place to rest.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/moe/0691e23d-7a19-7c9e-8000-8d6b91c1022b._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Elevated Beds",
      description:  "Raised, breathable beds that keep dogs cool, supported, and off the ground.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/moe/068b0b1b-8549-7655-8000-54f4e4acda58._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Pillow Beds",
      description:  "Soft, cushion-style beds that provide cozy comfort for dogs who love to sprawl.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/moe/069271f8-a668-7c02-8000-ab91cff4f261._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Covered Beds",
      description:  "Cozy, enclosed beds that provide warmth and a secure space dogs love.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/friends-forever-luna-donut-faux-fur-cozy-cave-covered-dog-bed-with-hooded-blanket-grey/img-287216._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Fun & Trendy",
      description:  "Stylish, playful beds that add personality while keeping dogs cozy.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/multipet-lamb-chop-bolster-cat-dog-bed-with-removable-cover/img-734328._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Sofa Beds",
      description:  "Sofa-style beds that offer plush comfort and a cozy place to lounge.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/moe/068a853c-d054-7bee-8000-3ad522d7ee54._AC_SL496_V1_.jpg",
      quantity: 1,
    }),


    //Dog Bowls & Feeders
    createProduct({
      name: "Bowls",
      description: "Practical, sturdy bowls designed for easy, mess-free mealtime.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/frisco-stainless-steel-bowl-medium-4-cup-2-count/img-504070._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Slow & Puzzle Feeders",
      description: "Interactive feeders that slow eating, improve digestion, and turn mealtime into a fun challenge.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/moe/0692f3f7-83b8-7a92-8000-83f77e8d93e3._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Fountains & Waterers",
      description: "Keep dogs hydrated with fresh, flowing water in easy-to-use, hygienic designs.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/moe/068308fd-e797-7110-8000-288b07a3b90b._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Elevated Bowls",
      description: "Raised, stable bowls that support healthy posture and easier mealtime for dogs.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/moe/06893761-b9e9-78b8-8000-1c83646171e9._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Feeders",
      description: "Convenient, sturdy feeders designed for easy, healthy mealtime.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/petlibro-air-automatic-cat-feeder-with-battery-powered-dog-cat-food-dispenser-black-2-litter/img-311124._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Travel Bowls",
      description: "Portable, collapsible bowls for on-the-go hydration and feeding.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/moe/06940689-7a05-73cb-8000-4afe41ffb7d2._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

//Dog Collars, Leashes & Harnesses
    createProduct({
      name: "Collars",
      description: "Comfortable, durable collars that keep dogs safe and stylish for everyday wear.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/pawfurevers-waterproof-odorless-dog-collar-pink-teal-small/img-368930._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
 createProduct({
      name: "Harnesses",
      description: "Supportive, secure harnesses for comfortable walks and better control.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/moe/0691639c-5122-7c2b-8000-2ba354eb4e07._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
 createProduct({
      name: "Leashes",
      description: "Strong, reliable leashes for safe and enjoyable walks every day.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/pawtitas-recycled-reflective-dog-leash-teal-large/img-519138._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
 createProduct({
      name: "ID tags & Accessories",
      description: "Personalized ID tags and handy accessories to keep dogs safe and organized.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/pawfurever-dog-breed-stainless-steel-personalized-dog-id-tag-husky-gold/img-277747._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
 createProduct({
      name: "Headcollar",
      description: "Gentle, effective head collars for training and better control on walks.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/halti-reflective-padded-no-pull-dog-headcollar-cobalt-blue-size-3/img-710880._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
 createProduct({
      name: "Service Dog",
      description: "Specialized gear designed for working dogs to perform tasks safely and efficiently.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/industrial-puppy-reflective-service-dog-harness-leash-red-x-large-30-to-39in-chest/img-217969._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Smart Collars & Training",
      description: "Smart collars and training tools designed to support safety, tracking, and positive behavior.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/bousnic-smart-bark-collar-waterproof-automatic-bark-control-dog-training-collar-black/img-473696._AC_SL496_V1_.jpg",
    }),
    createProduct({
      name: "Tie Outs",
      description: "Secure tie-outs that give dogs freedom while keeping them safely contained.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/frisco-easy-grip-stake-with-tie-out-cable-large-30ft/img-471138._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Muzzles",
      description: "Comfortable, secure muzzles for safe handling and controlled outings.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/bronzedog-soft-padded-nylon-dog-muzzle-mint-green-medium/img-691155._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

//Dog Crates, Kennels & Gates

    createProduct({
      name: "Crates & Kennels",
      description:
        "Secure and comfortable spaces for safe travel, training, or home rest.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/petmate-two-door-top-load-dog-cat-kennel-tan-24-inches-up-to-15lbs/img-198035._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
      createProduct({
      name: "Pens & Accessories",
      description:
        "Flexible, secure solutions for safe play, training, and everyday containment.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/moe/06929b3d-55bb-74b2-8000-e24528f6f053._AC_SL496_V1_.jpg",
    }),
    createProduct({
      name: "Dog Houses",
      description:
        "Durable, weather-resistant shelters that provide cozy outdoor protection.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/frisco-plastic-outdoor-dog-house-with-elevated-platform-x-large/img-503515._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
 createProduct({
      name: "Stair & Steps",
      description:
        "Safe, supportive steps that help dogs reach higher places with ease.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/petsafe-cozyup-foldable-cat-dog-stairs-grey-large/img-437940._AC_SL496_V1_.jpg",
    }),
    
    createProduct({
      name: "Ramp & Gates",
      description:
        "Practical ramps and gates for safety, accessibility, and home boundaries.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/carlson-pet-products-heritage-home-indoor-wooden-cat-dog-ramp-rustic-white/img-762601._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Crate Mats & Pads",
      description:
        "Soft, supportive bedding that adds comfort to crates and kennels.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/frisco-swirl-dog-crate-mat-gray-42/img-566295._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Fence Systems",
      description:
        "Reliable fencing solutions to keep dogs safe and contained, indoors or outdoors.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/hoistspark-gps-wireless-fence-system-dog-tracker-black-medium/img-626684._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Doors & Accessories",
      description:
        "Reliable solutions for secure access and containment, indoors or outdoors.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/trixie-2-way-pet-door-with-lockable-panel-for-dogs-mediumlarge/img-250059._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

//Dog Toys
   
      createProduct({
      name: "Plush Toys",
      description:
        "Soft, cuddly toys perfect for snuggling and gentle play.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/clifford-the-big-red-snuggle-buddy-14in-plush-dog-toy-red/img-198419._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
      createProduct({
      name: "Chew Toys",
      description:
        "Durable toys designed to satisfy chewing instincts and keep teeth healthy.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/frisco-beef-flavored-twist-bone-nylon-chew-dog-toy-for-heavy-chewers-medium/img-359372._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
      createProduct({
      name: "Fetch Toys",
      description:
        "Fun, interactive toys built for chasing, retrieving, and active play.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/sungrow-interactive-outdoor-play-soccer-ball-dog-fetch-toy-with-straps/img-203790._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
      createProduct({
      name: "Puzzle Toys",
      description:
        "Mental stimulation and problem-solving fun to challenge curious dogs.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/moe/068bf322-7623-7f5c-8000-fc523a720a0e._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
      createProduct({
      name: "Puzzle Toys",
      description:
        "Mental stimulation and problem-solving fun to challenge curious dogs.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/moe/068bf322-7623-7f5c-8000-fc523a720a0e._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
      createProduct({
      name: "Rope & Tug Toys",
      description:
        "Durable toys designed for interactive play and tugging fun.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/frisco-fetch-colorful-ball-knot-rope-dog-toy-smallmedium/img-441237._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
      createProduct({
      name: "Treat Dispensing Toys",
      description:
        "Interactive toys that reward play while keeping dogs engaged.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/moe/068d3c69-e22b-7b22-8000-8df60cf5c874._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
      createProduct({
      name: "Puppy Toys",
      description:
        "Gentle, durable toys designed for teething and early play.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/benebone-bacon-flavor-tough-puppy-chew-toy-2-count/img-623246._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
      createProduct({
      name: "Variety Packs",
      description:
        "A mix of toys for chewing, fetching, and endless fun.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/rocket-rex-small-medium-breeds-puppy-chew-toy-variety-pack-6-count/img-741509._AC_SL496_V1_.jpg",
      quantity: 1,
    }),



// Cat Beds
     createProduct({
      name: "Covered Beds",
      description:  "Cozy, enclosed beds that give cats a warm and secure place to rest.",
      price: 65,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/best-friends-by-sheri-meow-hut-covered-cat-dog-bed-grey-standard/img-134161._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Bolster Beds",
      description:  "Cozy beds with raised edges for head and neck support.",
      price: 65,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/moe/068d6acf-e334-7b4a-8000-f3377211967d._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Orthopedic Beds",
      description:  "Supportive beds designed to relieve joints and provide comfort for senior cats.",
      price: 65,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/moe/068eea17-ea04-79d7-8000-c2560c87f1a4._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Pillow Beds & Mats",
      description:  "Soft, cushioned beds and mats perfect for lounging and naps.",
      price: 65,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/moe/068d6acf-e334-7b4a-8000-f3377211967d._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Heated Beds",
      description:  "Warm, comforting beds that keep cats cozy and relaxed.",
      price: 65,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/pawspik-indoor-electric-heated-cat-small-dog-bed-sherpa-lined-charcoal-ivory-small/img-724548._AC_SL496_V1_.jpg",
      quantity: 1,
    }),createProduct({
      name: "Fun & Trendy Beds",
      description:  "Stylish and playful beds that double as a cozy retreat and décor piece.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "https://image.chewy.com/catalog/general/images/armarkat-pumpkin-shape-cat-bed/img-370039._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

    // Cat Bowls & Feeders
    
 createProduct({
      name: "Bowls",
      description:
        "Durable, easy-to-clean bowls for everyday meals.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/iconic-pet-anti-ant-stainless-steel-non-skid-dog-cat-bowl-2-count-2-cup/img-472832._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Fountains & Waterers",
      description:
        "Fresh, flowing water to keep cats hydrated and healthy.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/moe/068d5996-e28d-7650-8000-159fbad90d1f._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Elevated Bowls & Diners",
      description:
        "Raised bowls that promote better posture and easier eating.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/moe/068d2f90-60f4-7705-8000-bd8edab28161._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
 createProduct({
      name: "Feeders",
      description:
        "Convenient feeders for controlled, mess-free mealtime.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/moe/0685ab8e-ddd1-7690-8000-2e5be2a7f47e._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Double Diners",
      description:
        "Dual bowls for food and water, perfect for multi-cat households.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/moe/06819e5a-0604-7578-8000-e1476993be24._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

    //Cat Carrier & Travel
    createProduct({
      name: "Backpacks & Carrier",
      description:
        "Comfortable, secure carriers for safe travel and outings.",
      price: 45,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/moe/069257f2-1045-79a9-8000-bc35321666c0._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
createProduct({
      name: "Kennels",
      description:
        "Durable, cozy spaces for cats at home or on the go.",
      price: 45,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/tavo-pets-crispin-protection-system-dog-cat-kennel-merle-large/img-164726._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
     createProduct({
      name: "Car Accessories",
      description:
        "Essential travel gear that keeps cats safe and comfortable on the road.",
      price: 45,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/frisco-travel-safety-dog-cat-carrier-medium/img-494510._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
createProduct({
      name: "Strollers",
      description:
        "Convenient strollers for safe, stress-free outdoor adventures.",
      price: 45,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/moe/067f7bd9-ed11-7e47-8000-40f6b5b03fae._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Travel Bowls & Water Bottles",
      description:
        "Portable bowls and bottles to keep cats hydrated on the move.",
      price: 45,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/frisco-travel-collapsible-silicone-dog-cat-bowl-gray-small-1-5-cup/img-595950._AC_SL496_V1_.jpg",
      quantity: 1,
    }),


    // Cat Collars, Leashes and Harnesses
    createProduct({
      name: "Collars",
      description:
        "Comfortable, adjustable collars for everyday wear and style.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/safe-cat-snag-proof-polyester-breakaway-cat-collar-with-bell-purple/img-239514._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
createProduct({
      name: "Leashes",
      description:
        "Lightweight, secure leashes for safe walks and outdoor adventures.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/travel-cat-the-true-adventurer-reflective-cat-kitten-harness-leash-red-small/img-504398._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Harnesses",
      description:
        "Supportive harnesses that keep cats secure while exploring.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/petsafe-come-with-me-kitty-nylon-cat-harness-bungee-leash-lilacdeep-purple-medium-10-5-to-14in-chest/img-194342._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Collar ID Tag",
      description:
        "Personalized ID tags to keep cats safe and identifiable.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/gotags-personalized-stainless-steel-with-enamel-paw-design-bone-shaped-pet-id-tag-sage-regular/img-577750._AC_SL496_V1_.jpg",
      quantity: 1,
    }),


//Cat Toys
     createProduct({
      name: "Interactive Toys",
      description:
        "Engaging toys that stimulate play and curiosity.",
      price: 35,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/moe/0685144d-0e45-7ba8-8000-5411ea16439c._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Teasers Wands",
      description:
        "Fun, dangling wands to encourage chasing and pouncing.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/pet-fit-for-life-2-feathers-1-coon-tail-wand-cat-toy/img-601715._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Balls & Chasers",
      description:
        "Rollable toys that keep cats active and entertained.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/earthtone-solutions-felted-wool-cat-ball-toy-6-count/img-152411._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Catnip Toys",
      description:
        "Catnip-infused toys that excite and delight playful cats.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/moe/06883cd5-c011-79a8-8000-5d8cbec7fb0c._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Plush & Mice Toys",
      description:
        "Soft, small toys perfect for cuddling and solo play.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/moe/06883cd7-3509-78d7-8000-8c949cc42886._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Scratchers Toys",
      description:
        "Durable scratchers that satisfy your cat's natural urge to scratch.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "https://image.chewy.com/catalog/general/images/necoichi-premium-comfort-cat-scratcher-wall-oakbrown-regular/img-627413._AC_SL496_V1_.jpg",
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

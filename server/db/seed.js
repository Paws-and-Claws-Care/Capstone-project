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
      name: "Taste of the Wild High Prairie Grain-Free Dry Puppy Food with Roasted Bison & Roasted Venison",
      description:
        "28lbs, Real meat as the first ingredient - high-protein to help support bones, joints, and lean, strong muscles in puppies and nursing/pregnant mothers",
      price: 60,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/2998898-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "WholeHearted All Life Stages Beef and Brown Rice Recipe Dry Dog Food",
      description:
        "Canine probiotics help support your dog's digestion, while Omega-3 fatty acids promote supple skin and a shiny coat",
      price: 67,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/3001050-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Ollie Baked Beef Dish with Sweet Potatoes Dry Dog Food",
      description:
        "14lbs, Ollie's gently baked Beef Dish with Sweet Potatoes is made with high-quality, 100% human-grade ingredients, including real beef, sweet potatoes, peas, carrots, and oats",
      price: 100,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/3835855-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Pedigree Roasted Chicken & Vegetable Flavor Adult Dry Dog Food",
      description:
        "44lbs, 100% complete and balanced food for adult dogs, bringing a nutritious meal to your pet - made with 26 vitamins, minerals, and amino acids to support your dog's health and vitality",
      price: 34,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://i5.walmartimages.com/seo/PEDIGREE-Complete-Nutrition-Adult-Dry-Dog-Food-Roasted-Chicken-Rice-Vegetable-Flavor-Dog-Kibble-30-lb-Bag_82236770-44de-448c-abc6-d5b9c973da75.f3f97f56b0fb9524b59efa0fae1d7628.jpeg",
      quantity: 1,
    }),
    createProduct({
      name: "JustFoodForDogs Daily Diets Beef & Russet Potato Frozen Dog Food",
      description:
        "72oz, This high-calorie diet incorportes human-edible ground beef, russet and sweet potatoes, as well as an assortment of fruits and vegetables",
      price: 42,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/2936540-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Merrick Premium Grain Free Wholesome and Natural Kibble, Real Texas Beef and Sweet Potato Dry Adult Dog Food",
      description:
        "30lbs, This high protein adult dog food helps maintain lean muscle mass and energy levels through healthy fat and protein ingredients, comprising 63% of this dog food. The other 37% is a blend of produce, fiber, vitamins, minerals, and natural ingredients",
      price: 94,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://i5.walmartimages.com/asr/9d679027-34a2-4325-88e0-8aa49a5584d9.d38ab10d483e5971a12649512fbab357.jpeg",
      quantity: 1,
    }),
    createProduct({
      name: "Purina ONE True Instinct High Protein Formula With Real Beef and Salmon Dry Dog Food",
      description:
        "27.5lbs, Real Beef and Salmon With Bone Broth and Added Vitamins, Minerals and Nutrients. A nutrition-packed, high protein dog food, each serving of this dog kibble features real beef as the first ingredient, providing 32 percent protein to support your dog's strong muscles, including a healthy heart",
      price: 62,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzQB2TnKoS4Veh7HDFSUU5z5RCJl5yBRaCtA&s",
      quantity: 1,
    }),
    createProduct({
      name: "Taste of the Wild Ancient Prairie with Roasted Bison, Roasted Venison and Ancient Grains Dry Dog Food",
      description:
        "28lbs, Real meat as the number 1 ingredient, vitamins and minerals from superfoods and ancient grains - omega fatty acids for healthy skin and coat",
      price: 59,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTg6Z8rqG5rg2r68BN4HqdTB2i-GA-p8gcXkw&s",
      quantity: 1,
    }),
    createProduct({
      name: "Royal Canin Size Health Nutrition Small Breed Adult Dry Dog Food",
      description:
        "14lbs, Small breed dog food ideal for maintaining a healthy weight by meeting small dog's energy needs - helps maintain strong bones with a precise blend of calcium and phosphorus",
      price: 60,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/1521748-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Hill's Science Diet Adult Small Bites Chicken & Barley Recipe Dry Dog Food",
      description:
        "15lbs, made to fuel the energy needs of a dog during the prime of their life - made with high-quality, easy-to-digest ingredients in a small bite size - special blend of prebiotic fibers and antioxidants to support digestion",
      price: 49,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://morristownagway.com/cdn/shop/products/sd-canine-adult-small-bites-dry-productShot_zoom_grande.jpg?v=1670357498",
      quantity: 1,
    }),
    //27 products
    createProduct({
      name: "The Honest Kitchen Whole Food Clusters Grain Free Beef Dry Dog Food",
      description:
        "20 lbs, Crafted with a vet nutritionist to provide the same human grade quality as fresh dog food in a convenient scoop and serve format - Contains ranch raised beef, carrots and kale - that have been cold-pressed and roasted into bite-sized pieces",
      price: 113,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWdNCpuE9qRZouFqtrqHcnkiXZTMtGcO387Q&s",
      quantity: 1,
    }),
    createProduct({
      name: "Ollie Baked Chicken Dish with Carrots Dry Dog Food",
      description:
        "14lbs, Ollie's gently baked Chicken Dish with Carrots is made with high-quality, 100% human-grade ingredients, including real chicken, carrots, sweet potatoes, peas, and oats",
      price: 100,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/3835847-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "WholeHearted Grain Free All Life Stages Lamb and Lentil Formula Dry Dog Food",
      description:
        "40lbs, Crafted with omega-3 fatty acids, antioxidants, and canine probiotics - real lamb as the first ingredient",
      price: 68,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmbxt5BDaySoKM4Z7U03cXTO9mDCVko0HIpQ&s",
      quantity: 1,
    }),
    createProduct({
      name: "Taste of the Wild Southwest Canyon Grain-Free Wild Boar Dry Dog Food",
      description:
        "28lbs, This unique recipe contains a blend of animal protein sources, including wild boar, for a taste sensation that your pet will love. In addition, nutrient-rich legumes and fruits like peas, garbanzo beans, blueberries and raspberries provide antioxidants for your pet's healthy lifestyle",
      price: 59,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/taste-of-the-wild-southwest-canyon-grain-free-dry-dog-food-28lb-bag/img-632693._AC_SX500_SY400_QL75_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Taste of the Wild Ancient Mountain with Roasted Lamb and Ancient Grains Dry Dog Food",
      description:
        "28lbs, Pasture-raised lamb combines with ancient grains - grain sorghum, millet, quinoa and chia seed - for a tasty and protein-packed diet that's also rich in antioxidants, omega fatty acids and more",
      price: 59,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/3084650-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Pedigree High Protein Beef and Lamb Flavor Adult Dry Dog Food",
      description:
        "44lbs, Made with real red meat, 25% more protein than Pedigree Adult Complete Nutrition, and only natural flavors for great taste in every bowl, this healthy dog food recipe supports their everyday health and natural vitality and is formulated with 36 vitamins, minerals, and amino acids",
      price: 36,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdOKl2UYGg1iwB_Wry3Z1x-YArDqOJcbWrPA&s",
      quantity: 1,
    }),
    createProduct({
      name: "WholeHearted Grain Free Small-Breed Beef and Pea Recipe Adult Dry Dog Food",
      description:
        "14lbs, this thoughtfully crafted recipe includes proper levels of calcium and phosphorus and canine probiotics, so you can help maintain their teeth, bones and digestive health with every bowl",
      price: 37,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxm-aaNXtl2Ud9l29ToQ6am1Kr_g1BZ_wCIw&s",
      quantity: 1,
    }),
    createProduct({
      name: "Natural Balance Limited Ingredient Adult Grain-Free Dry Dog Food Salmon & Sweet Potato Recipe",
      description:
        "24lbs, Our dry dog food salmon and sweet potato formula is made with real salmon as the first ingredient and features limited, easily digestible, carbohydrate sources",
      price: 73,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://chuckanddons.com/cdn/shop/files/237945_MAIN._AC_SL1200_V1651594305_714x.jpg?v=1699546378",
      quantity: 1,
    }),
    createProduct({
      name: "ORIJEN Grain Free & Poultry Free, Regional Red, High Protein, Fresh & Raw Animal Ingredients Dry Dog Food",
      description:
        "23.5lbs, This ORIJEN dog food is made with 85%** quality animal ingredients. The first five ingredients of this high protein dog food are farm-raised beef, wild boar, lamb, pork and beef liver. Each serving offers ORIJEN WholePrey ingredients including nourishing organs to provide your dog with the most succulent and nutrient-rich parts of the prey",
      price: 130,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/2992277-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Royal Canin Size Health Nutrition Large Breed Adult Dry Dog Food",
      description:
        "30lbs, Royal Canin Large Adult Dry Dog Food helps support your dog's bone and joint health with a combination of high-quality minerals and nutrients, while easy-to-digest, high-quality proteins, plus fibers and prebiotics, help promote optimal stool quality. This formula also includes clinically proven antioxidants, vitamins C & E, and prebiotics for a healthy gut and immune system",
      price: 100,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRjIg0uoS0JG_g-F2fV1g8ZjQIj9B6zgttHw&s",
      quantity: 1,
    }),
    createProduct({
      name: "Purina Dog Chow Complete Kibble Beef Flavor Adult Dry Dog Food",
      description:
        "18.5lbs, Rich in high-quality protein to support strong muscles, 23 vitamins and minerals and lots of antioxidants to promote a healthy immune system, this wholesome dog food delivers 100 percent complete and balanced nutrition",
      price: 20,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/l_price-drop,fl_relative,w_0.12,g_north_west,e_sharpen/3880496-center-1",
      quantity: 1,
    }),
    //38 products here
    createProduct({
      name: "Hill's Science Diet Adult Sensitive Stomach & Skin Small & Mini Chicken Recipe Dry Dog Food",
      description:
        "15lbs, Hill's Science Diet Sensitive Stomach & Skin Small & Mini dry dog food is gentle on stomachs while nourishing skin & promoting a lustrous coat. With beet pulp, a nourishing prebiotic fiber n Highly digestible food that is gentle on the stomachn Vitamin E & Omega-6 fatty acids for skin & coat nourishment",
      price: 58,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/2517951-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Hill's Science Diet Senior 7+ Chicken Meal, Barley & Rice Recipe Dry Dog Food",
      description:
        "33lbs, Provides easy-to-digest nutrition with a synergistic blend of ingredients to help support energy & activity level. Contains ActivBiome+ Multi-Benefit, a special blend of prebiotic fibers and antioxidants to support digestion, immune system and organ health Healthy heart, kidneys, and bladder supported by antioxidants and balanced minerals",
      price: 81,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://cdn.shopify.com/s/files/1/0663/7951/4105/files/OdhFMyM1CkJahCOb91e1p.jpg?v=1756492915",
      quantity: 1,
    }),
    createProduct({
      name: "Freshpet Vital Fresh Dog Food, Grain Free Small Breed Chicken, Beef, Egg & Salmon Recipe Roll Fresh Dog Food",
      description:
        "1lb, Expertly formulated by veterinary nutritionists, our Grain Free Small Breed Chicken, Beef, Egg and Salmon Recipe with Sweet Potatoes and Spinach Roll is specially developed with targeted levels of protein and fat to fuel the high energy needs of small dogs",
      price: 10,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQckkcExfS3eSx-yuHLUddODVKMYQPil2oNaA&s",
      quantity: 1,
    }),
    createProduct({
      name: "Freshpet Vital Grain Free Chicken, Beef, & Salmon Recipe Roll Fresh Puppy Food",
      description:
        "2lbs, Expertly crafted by veterinary nutritionists, our Puppy Grain Free Chicken, Beef, & Salmon Recipe is rich in high-quality protein and DHA to support healthy growth, brain development, and strong bones and joints",
      price: 14,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/2739925-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Nutro Natural Choice Small Bites Lamb and Brown Rice Recipe Adult Dry Dog Food",
      description:
        "30lbs, Made with chicken as the #1 ingredient, and crafted with vitamins, minerals, and other nutrients, Nutro Natural Choice Small Bites Adult Dry Dog Food, Lamb & Brown Rice Recipe brings real, recognizable ingredients to every mealtime",
      price: 80,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://cdn11.bigcommerce.com/s-qz13ep5fb4/images/stencil/1280x1280/products/92211/262054/1038030__71718.1716989023.jpg?c=1",
      quantity: 1,
    }),
    createProduct({
      name: "ACANA Grain-Free Free Run Poultry Chicken and Turkey and Cage-free Eggs Dry Dog Food",
      description:
        "25lbs, This ACANA dog food contains 60% premium animal ingredients including free-run chicken, turkey and cage-free eggs, and 40% vegetables, fruits and nutrients for a craveable taste your dog will love",
      price: 80,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/2993958-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Wellness Complete Health Natural Small Breed Turkey and Oatmeal Recipe Dry Dog Food",
      description:
        "12lbs, Our Small Breed Complete Health Adult Deboned Turkey & Oatmeal Recipe is designed to support the unique health needs of smaller dogs through nutrient-rich whole foods",
      price: 45,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/1174029-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Royal Canin Breed Health Nutrition German Shepherd Adult Dry Dog Food",
      description:
        "30lbs, This German Shepherd food features a specialized kibble shape and texture designed for your German Shepherd's long, strong muzzle and teeth. Not only that, but this complete and balanced adult dog food provides the nutrition to help your best friend thrive",
      price: 100,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTW5rqTEHjB9NYnlQzH7cDJVgmCmxqvh8OfCw&s",
      quantity: 1,
    }),
    createProduct({
      name: "Hill's Science Diet Small & Mini Chicken Meal & Brown Rice Recipe Dry Dog Food",
      description:
        "12.5lbs, Rich in flavor, it is carefully formulated with vital nutrients to support 5 essential building blocks for lifelong health, so they get the best start in life & grow to their full potential. DHA from fish oil for healthy brain & eye development",
      price: 46,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/l_sale-badge,fl_relative,w_0.12,g_north_west,e_sharpen/3770861-CENTER-1",
      quantity: 1,
    }),
    createProduct({
      name: "Stella & Chewy's Wild Red Raw Coated High Protein Grain & Legume Free Prairie Recipe Dry Dog Food",
      description:
        "21lbs, Our Wild Red Raw Coated kibble is packed with responsibly sourced, animal-based protein from multiple meat sources and then coated with freeze dried raw meat. This provides a protein-rich taste dogs crave with the nutrition they deserve",
      price: 80,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://www.stellaandchewys.com/cdn/shop/files/WR_3.5lb_RawCoated-Prairie-GF.jpg?v=1721337788",
      quantity: 1,
    }),
    createProduct({
      name: "ACANA Butcher's Favorites Wild-Caught Salmon Dry Dog Food",
      description:
        "17lbs, This high protein dog food includes premium ACANA freeze dried dog food kibble and tender pieces of protein-rich real salmon jerky your dog will crave. Wild-caught salmon, whole herring and flounder are balanced with chickpeas, peas & lentils to help maintain a healthy weight",
      price: 95,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRNEmnVZc1pYe81hmGxLeSVhNyZ5EhcMrunw&s",
      quantity: 1,
    }),

    createProduct({
      name: "Blue Buffalo Blue's Stew Natural, Hearty Beef and Country Chicken Wet Dog Food Variety Pack",
      description:
        "12.5oz, Count of 6 - enhanced with vitamins and minerals for adult dogs who prefer a meaty taste. This natural wet dog food is crafted with the finest ingredients that don't contain chicken (or poultry) by-product meals",
      price: 18.5,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo2UON_Uoif0ZolDWut3HJhAUv3r43oaVtbQ&s",
      quantity: 1,
    }),
    //50 products

    // DOG TREATS
    createProduct({
      name: "Busy Bone Jerky Wraps Chew Treats",
      description: "Made with real beefhide and wrapped in real chicken jerky",
      price: 15,
      category: "treats",
      pet_type: "dog",
      image_url: "image",
      quantity: 1,
    }),

    //CAT TREATS
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

    //DOG SUPPLEMENTS
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

    //CAT SUPPLEMENTS
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

    //CAT FOOD
    createProduct({
      name: "Purina Pro Plan - Sensitive Skin and Stomach Lamb and Rice - Adult Dry Cat Food",
      description:
        "16lb, made with real lamb - high-protein and easily digestible rice and oatmeal",
      price: 57,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://cdn11.bigcommerce.com/s-vmvni2zq0j/images/stencil/1280x1280/products/38989/79290/36381657__03420.1606143989.JPG?c=2",
      quantity: 1,
    }),
    createProduct({
      name: "Hill's Science Diet Adult Urinary & Hairball Control - Chicken Recipe Dry Cat Food",
      description:
        "15.5lbs, Actively supports health of urinary system by supporting a healthy mineral content - Features a natural fiber to reduce hairballs",
      price: 67,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://chuckanddons.com/cdn/shop/files/90557_MAIN._AC_SL1200_V1658441310_590x.jpg?v=1682951353",
      quantity: 1,
    }),
    createProduct({
      name: "Purina Friskies Seafood and Chicken Pate Favorites Wet Cat Food Variety Pack",
      description:
        "5.5 ounces, Made with essential vitamins and minerals to support nose-to-tail health - Include an array of tastes to keep your cat interested",
      price: 40,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/purina-friskies-seafood-chicken-pate-favorites-variety-pack-wet-cat-food-5-5oz-can-case-of-48/img-555895._AC_SS300_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Royal Canin Feline Health Nutrition Indoor Adult Dry Cat Food",
      description:
        "15lbs, delivers complete and balanced nutrition to help your cat live a healthy and magnificent life - Contains moderate calorie levels to help cats maintain an ideal weight, and optimal fibers provide cat hairball support",
      price: 68,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/839957-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Purina ONE +Plus Indoor Advantage Natural, Low Fat and Weight Control Dry Cat Food",
      description:
        "16lbs, Made for the special nutritional requirements of indoor cats - this weight management cat food uses real turkey as the number one ingredient - Each cup of cat food contains 37 grams of protein",
      price: 35,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://www.purina.com/sites/default/files/products/purina-one-indoor-advantage-cat-food.png",
      quantity: 1,
    }),
    createProduct({
      name: "Meow Mix Original Choice Dry Cat Food",
      description:
        "30 lbs, made with the irresistible flavors of chicken, turkey, salmon and ocean fish - Includes 40 essential vitamins, minerals, amino acids and fatty acids, along with high quality protein that helps support a lean energetic body",
      price: 33,
      category: "food",
      pet_type: "cat",
      image_url: "https://i.ebayimg.com/images/g/YawAAOSwNfJiphag/s-l1200.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Purina ONE +Plus Sensitive Skin and Stomach Formula Natural Dry Cat Food",
      description:
        " easily digestible cat food with added prebiotic fiber to support sensitive stomach and skin - contains added vitamins, minerals, and nutrients",
      price: 35,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/purina-one-plus-sensitive-skin-stomach-adult-natural-digestive-dry-cat-food-16lb-bag/img-406864._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Blue Buffalo Tastefuls Chicken Recipe Dry Kitten Food",
      description:
        "Real chicken as the first ingredient - prioritize natural ingredients while pleasing picky palates - free of artificial flavors and preservatives",
      price: 32,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/blue-buffalo-tastefuls-chicken-brown-rice-recipe-adult-indoor-dry-cat-food-3lb-bag/img-224943._AC_SX500_SY400_QL75_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Blue Buffalo Tastefuls Chicken, Turkey & Chicken, Ocean Fish & Tuna Entrees Wet Cat Food Pate Variety Pack",
      description:
        "5.5oz, healthy, high-moisture cat food formulated with real chicken, turkey, or fish as the #1 ingredient - Formulated without any chicken (or poultry) by-product meals",
      price: 35,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/blue-buffalo-tastefuls-chicken-turkey-chicken-ocean-fish-tuna-entrees-variety-pack-pate-wet-cat-food-5-5oz-can-case-of-24/img-456747._AC_SX500_SY400_QL75_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Purina ONE Tender Selects Blend With Real Salmon Natural Dry Cat Food",
      description:
        "16lbs, Cat food recipe crafted with real ingredients, including accents of carrots and peas - protein delivered from Salmon as main ingredient",
      price: 34,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/purina-one-tender-selects-blend-with-real-salmon-dry-cat-food-7lb-bag/img-224183._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Purina Friskies Seafood Sensations with Salmon, Tuna and Shrimp Flavors Dry Cat Food",
      description:
        "16lbs, each serving of this cat kibble provides essential fatty acids for skin and coat health, vitamin A and taurine for vision support, and antioxidants for cat immune support",
      price: 17,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/3880761-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Fancy Feast Grain Free Seafood Classic Collection Pate Wet Cat Food Variety Pack",
      description:
        "3oz, Count of 30, 100 percent complete and balanced nutrition for adult cats, this delicious protein-rich canned pate in gravy cat food includes vitamins and minerals and is made without artificial colors or preservatives",
      price: 28,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://www.kroger.com/product/images/xlarge/front/0005000021562",
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
      name: "IAMS ProActive Health Adult Indoor Weight Control & Hairball Care Dry Cat Food with Chicken & Turkey Cat Kibble",
      description:
        "22lbs, assist with a healthy weight loss or weight management, thanks to L-carnitine, which helps burn fat and maintain a healthy metabolism - supports healthy digestion with its tailored fiber blend",
      price: 41,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/2135697-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Purina ONE Tender Selects Blend With Real Chicken Natural Dry Cat Food",
      description:
        "16lbs, Chicken is the real first ingredient including accents of real carrot and peas - Made with no artificial flavors or preservatives",
      price: 36,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRQ9iFwW6708j00z6ClCKlJVtmAXTT_FcD3m4Kb_Hh6hHaQmrS71he6Joe8Ot--dQziP2f19r7Eh6LiZ2xzDYueje4AB2DU--dKhCLP0ZjuJnchbtzej_mo",
      quantity: 1,
    }),
    createProduct({
      name: "WholeHearted Grain Free Chicken Formula Dry Cat Food",
      description:
        "12lbs, includes antioxidants, feline probiotics, and more to support the health of your pet - contains vitamins and minerals",
      price: 33,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/3907628-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "ORIJEN Cat High Protein Fresh & Raw Animal Ingredients Dry Food",
      description:
        "offers a biologically appropriate recipe to help support digestion, a shiny coat, healthy skin and heart health - Made with 90% animal ingredients - First five ingredients are fresh or raw",
      price: 75,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://thepetbowl.com/wp-content/uploads/2020/03/ORc-orig-frobnt.png",
      quantity: 1,
    }),
    createProduct({
      name: "Blue Buffalo Wilderness Natural High-Protein Grain-Free Chicken Dry Cat Food",
      description:
        "protein-rich dry cat food for adult cats packed with real chicken that is sure to satisfy your cat's natural cravings -  formulated without any chicken (or poultry) by-product meals",
      price: 48,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://i5.walmartimages.com/seo/Blue-Buffalo-Wilderness-Natural-High-Protein-Grain-Free-Dry-Cat-Food-Chicken-9-5-lb-Bag_2968aeda-c0d6-4b62-ab3f-1289c564d6e2.50e7a0242a2a883fde7c7a9a76fdfa8b.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
      quantity: 1,
    }),
    createProduct({
      name: "Soulistic Serene Selections Variety Pack Wet Cat Food",
      description:
        "Count of 12, specializes in creating a nutritional blend that reflects a human food style so that you know that what you are feeding your cat is just as healthy as what you eat as well",
      price: 23,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://www.weruva.com/cdn/shop/files/S0058_813778015196_20Soulistic_20Serene_20Selections_20Variety_20Pack_1358ea4d-44fe-40b0-a976-a3bed1bcddfc.png?v=1756163578&width=1214",
      quantity: 1,
    }),
    createProduct({
      name: "Natural Balance Original Ultra Platefulls Best Sellers Wet Cat Food Variety Pack",
      description:
        "Count of 12, Chicken is the first animal protein ingredient, providing essential protein and amino acids to maintain strong muscles - peas included as a grain-free source of fiber",
      price: 18.5,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/4672111-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Purina Pro Plan High Protein with Probiotics Chicken & Rice Formula Dry Cat Food",
      description:
        "16lbs,  made with high-quality protein, including chicken as the first ingredient, and contains guaranteed live probiotics to support digestive and immune health - contains 36 percent protein",
      price: 54,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/l_sale-badge,fl_relative,w_0.12,g_north_west,e_sharpen/1236571-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Friskies Surfin' & Turfin' Favorites Dry Cat Food",
      description:
        "16lbs, Chicken, Ocean Whitefish, Salmon and Filet Mignon flavors served in appealing shapes keep her excited about mealtimes - supports whole-body health - crunchy texture helps to keep her teeth clean",
      price: 16.5,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068247ee-2797-7d5a-8000-76255344046b._AC_SX500_SY400_QL75_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "WholeHearted Grain Free Salmon Formula Dry Cat Food",
      description:
        "12lbs, Each bowl serves up Omega-3 fatty acids, feline probiotics, antioxidants and more to help support your pet's health through balanced nutrition",
      price: 34,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/3907695-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "IAMS ProActive Health Adult Healthy Dry Cat Food with Chicken Cat Kibble",
      description:
        "22lbs, a recipe designed to support healthy bodies and provide healthy energy for play - Chicken is the #1 ingredient in this high-quality poultry-based cat kibble, made for outdoor or indoor cat diets",
      price: 40,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://i5.walmartimages.com/seo/Iams-Proactive-Health-Chicken-Dry-Cat-Food-22-Lb-Bag_2cbbc5bb-451e-4998-a9d4-de379f85227d.3c558fc8fa45daf2175e14d42af455be.jpeg",
      quantity: 1,
    }),
    createProduct({
      name: "Applaws Natural Ocean Fish in Broth Wet Cat Food",
      description:
        "5.5oz, Case of 24, Made with natural ingredients, no artificial colors, flavors or preservatives",
      price: 72,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://applaws.com/uk/wp-content/uploads/sites/3/2024/03/1005.png",
      quantity: 1,
    }),
    createProduct({
      name: "Hill's Science Diet Adult Indoor Chicken Recipe Dry Cat Food",
      description:
        "made with high-quality protein supports lean muscles, while natural fibers promote healthy digestion, and easier litter box clean-up",
      price: 61,
      category: "food",
      pet_type: "cat",
      image_url: "https://s7d2.scene7.com/is/image/PetSmart/5154810",
      quantity: 1,
    }),
    createProduct({
      name: "Tiki Cat Born Carnivore Indoor Health Chicken & Turkey Meal Dry Cat Food",
      description:
        "made with real chicken as the first ingredient, plus gentle fiber sources to aid digestion, balanced omega 3 and 6 fatty acids, and essential vitamins and minerals to support a healthy immune system",
      price: 46,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/tiki-cat-born-carnivore-indoor-health-chicken-turkey-meal-dry-cat-food-3lb-bag/img-640602._AC_SS300_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Purina Fancy Feast Gravy Lovers Poultry and Beef Grilled Gourmet Wet Cat Food Variety Pack",
      description:
        "3 oz, Count of 30, high-quality wet food for cats featuring an enticing aroma and grilled taste of real turkey, chicken or beef in a light, savory gravy - These gravy cat food recipes are crafted in partnership with our expert nutritionists to give them a protein-rich gourmet meal without artificial colors or preservatives",
      price: 28,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/3881798-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Taste of the Wild Rocky Mountain Grain-Free with Roasted Venison & Smoke-Flavored Salmon Dry Cat Food",
      description:
        "14lbs, A grain-free recipe with peas and sweet potatoes provides highly digestible energy for your active cat. Made with real roasted venison and smoke-flavored salmon, this recipe offers a taste sensation like no other",
      price: 40,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/2986977-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Purina ONE Healthy Kitten +Plus Formula High Protein Natural Dry Food",
      description:
        "features a SmartBlend of high-quality ingredients, plus DHA, a nutrient found in mothers' milk, which assists with brain and vision development. We craft this natural kitten food with added vitamins, minerals and nutrients as well as accents of real vegetables, including real carrots and peas, and no artificial flavors or preservatives",
      price: 35,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/2512931-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Meow Mix Gravy Bursts Savory Chicken Flavor Mix with Gravy Filled Pieces Dry Cat Food",
      description: "13.5lbs, ",
      price: 21,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVCimqXS_E1vhtN43oZZ2zY1li9aKfuFvk-g&s",
      quantity: 1,
    }),
    createProduct({
      name: "Purina Cat Chow High Protein Complete Dry Cat Food",
      description:
        "15lbs, This Purina dry cat food has healthy carbs for vital energy and omega-6 fatty acids to help promote a shiny coat. Purina Cat Chow Complete is formulated to nourish cats at every stage of life, from kittens to adult cats, with 25 essential vitamins and minerals to support overall health",
      price: 20,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/l_price-drop,fl_relative,w_0.12,g_north_west,e_sharpen/3880701-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Nulo MedalSeries Grain-Free Turkey & Cod Dry Cat & Kitten Food",
      description:
        "12lbs, With 84% of protein from high-quality animal sources like turkey and cod, cats can enjoy superior taste and nutrition while also staying lean - Vitamin A and Taurine to support good vision",
      price: 46,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/3744831-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Blue Buffalo Blue Tastefuls Chicken & Brown Rice Recipe Natural Dry Food for Adult Indoor Cats",
      description:
        "15lbs, Real chicken as the first ingredient, ideal for adult cats - formulated with natural sources of fiber and nutrients for digestive care and coat health",
      price: 49,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://i5.walmartimages.com/seo/Blue-Buffalo-Tastefuls-Dry-Food-Adult-Indoor-Cat-Chicken-and-Brown-Rice-5-lb-Bag_333ad2b5-1ec8-457f-995f-eaa2394d1257.eaac6d25b73f06a49c405d5aca302781.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
      quantity: 1,
    }),

    //34 so far

    createProduct({
      name: "Cats in the Kitchen Originals Chicken Frick 'A Zee Chicken Recipe Au Jus Wet Cat Food",
      description:
        "3.2oz, Case of 24 - Made with premium cuts of cage-free chicken that contain no added horemones or antibiotics - flaked recipe in a delicious au jus",
      price: 46,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://www.weruva.com/cdn/shop/files/9020_878408009068_20Chicken_20Frick_20A_20Zee_2032oz_20Can_48ef388e-6c0f-4360-9d24-79fd6dd2a58c.png?v=1757258539&width=1000",
      quantity: 1,
    }),
    createProduct({
      name: "Reveal Limited Ingredient Natural Grain Free, Tuna Fillet in Broth Wet Food for Cats",
      description:
        "5.5oz, Case of 12 - made with 100% real ingredients, real protein - Grain free with no artificial flavors, colors or preservatives",
      price: 33,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://assets.petco.com/petco/image/upload/f_auto,q_auto/3886644-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "WholeHearted Grain Free By Land and Sea Flaked Wet Cat Food Variety Pack for All Life Stages",
      description:
        "5.5oz, Count of 24 -  boosted with omega-3 fatty acids to support a healthy skin and coat - No artificial colors added",
      price: 34,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/l_bypetco-badge,fl_relative,w_0.20,g_south_east,e_sharpen/3860305-center-1",
      quantity: 1,
    }),
    createProduct({
      name: "Friskies Extra Gravy Chunky Wet Cat Food Variety Pack",
      description:
        "5.5 oz, Count of 24 - Each entree made with real meat, poultry, or seafood - extra savory gravy - 100% complete and balanced nutrition for adult cats - essential vitamins and minerals",
      price: 20,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIOfC2dJIsqR04-tpD-treU_yFL0-tjowjoA&s",
      quantity: 1,
    }),
    createProduct({
      name: "Purina Friskies Tender and Crunch'd with Flavors of Chicken, Beef, Carrots and Green Beans Cat Food",
      description:
        "16lbs, Made with flavors of chicken, beef, carrots, and green beans - meaty tenders and crunchy bites for a tempting textture combination",
      price: 16.5,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://i5.walmartimages.com/asr/dc4a370d-d145-4212-b8d3-1b457ed31f6a.92f032f6ac6b8db4a6c2ba425dd05bef.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
      quantity: 1,
    }),
    createProduct({
      name: "Purina Friskies Tasty Treasures Prime Filets Wet Cat Food Variety Pack",
      description:
        "5.5oz, count of 12 - Soft cat food made with fish and poultry for the tastes cats crave with savory gravy to add flavor and moisture - 100% complete and balanced nutrition for adult cats - no artificial colors or preservatives",
      price: 10,
      category: "food",
      pet_type: "cat",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJmFrAtHyCqbkP3kv958XOGzeuitHZ50gnMA&s",
      quantity: 1,
    }),
    //40 created

    //SHIKHA PRODUCTS

    createProduct({
      name: "Orthopedic Dog Beds",
      description:
        "Supportive beds designed to relieve joint pressure and provide extra comfort for senior and large dogs.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/moe/068a853c-d054-7bee-8000-3ad522d7ee54._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Bolster Beds",
      description:
        "Cozy beds with raised edges that provide comfort, support, and a secure place to rest.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/moe/0691e23d-7a19-7c9e-8000-8d6b91c1022b._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Elevated Beds",
      description:
        "Raised, breathable beds that keep dogs cool, supported, and off the ground.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/moe/068b0b1b-8549-7655-8000-54f4e4acda58._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Pillow Beds",
      description:
        "Soft, cushion-style beds that provide cozy comfort for dogs who love to sprawl.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/moe/069271f8-a668-7c02-8000-ab91cff4f261._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Covered Beds",
      description:
        "Cozy, enclosed beds that provide warmth and a secure space dogs love.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/friends-forever-luna-donut-faux-fur-cozy-cave-covered-dog-bed-with-hooded-blanket-grey/img-287216._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

    //Dog Bowls & Feeders
    createProduct({
      name: "Bowls",
      description:
        "Practical, sturdy bowls designed for easy, mess-free mealtime.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/frisco-stainless-steel-bowl-medium-4-cup-2-count/img-504070._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Slow & Puzzle Feeders",
      description:
        "Interactive feeders that slow eating, improve digestion, and turn mealtime into a fun challenge.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/moe/0692f3f7-83b8-7a92-8000-83f77e8d93e3._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Fountains & Waterers",
      description:
        "Keep dogs hydrated with fresh, flowing water in easy-to-use, hygienic designs.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/moe/068308fd-e797-7110-8000-288b07a3b90b._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Elevated Bowls",
      description:
        "Raised, stable bowls that support healthy posture and easier mealtime for dogs.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/moe/06893761-b9e9-78b8-8000-1c83646171e9._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Feeders",
      description:
        "Convenient, sturdy feeders designed for easy, healthy mealtime.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //"https://image.chewy.com/catalog/general/images/petlibro-air-automatic-cat-feeder-with-battery-powered-dog-cat-food-dispenser-black-2-litter/img-311124._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

    //Dog Collars, Leashes & Harnesses
    createProduct({
      name: "Collars",
      description:
        "Comfortable, durable collars that keep dogs safe and stylish for everyday wear.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/pawfurevers-waterproof-odorless-dog-collar-pink-teal-small/img-368930._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Harnesses",
      description:
        "Supportive, secure harnesses for comfortable walks and better control.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/moe/0691639c-5122-7c2b-8000-2ba354eb4e07._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Leashes",
      description:
        "Strong, reliable leashes for safe and enjoyable walks every day.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/pawtitas-recycled-reflective-dog-leash-teal-large/img-519138._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "ID tags & Accessories",
      description:
        "Personalized ID tags and handy accessories to keep dogs safe and organized.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/pawfurever-dog-breed-stainless-steel-personalized-dog-id-tag-husky-gold/img-277747._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Headcollar",
      description:
        "Gentle, effective head collars for training and better control on walks.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/halti-reflective-padded-no-pull-dog-headcollar-cobalt-blue-size-3/img-710880._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Service Dog",
      description:
        "Specialized gear designed for working dogs to perform tasks safely and efficiently.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/industrial-puppy-reflective-service-dog-harness-leash-red-x-large-30-to-39in-chest/img-217969._AC_SL496_V1_.jpg
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
      image_url: "image", //https://image.chewy.com/catalog/general/images/petmate-two-door-top-load-dog-cat-kennel-tan-24-inches-up-to-15lbs/img-198035._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Dog Houses",
      description:
        "Durable, weather-resistant shelters that provide cozy outdoor protection.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/frisco-plastic-outdoor-dog-house-with-elevated-platform-x-large/img-503515._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Ramp & Gates",
      description:
        "Practical ramps and gates for safety, accessibility, and home boundaries.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/carlson-pet-products-heritage-home-indoor-wooden-cat-dog-ramp-rustic-white/img-762601._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Crate Mats & Pads",
      description:
        "Soft, supportive bedding that adds comfort to crates and kennels.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/frisco-swirl-dog-crate-mat-gray-42/img-566295._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Fence Systems",
      description:
        "Reliable fencing solutions to keep dogs safe and contained, indoors or outdoors.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/hoistspark-gps-wireless-fence-system-dog-tracker-black-medium/img-626684._AC_SL496_V1_.jpg
      quantity: 1,
    }),

    //Dog Toys

    createProduct({
      name: "Plush Toys",
      description: "Soft, cuddly toys perfect for snuggling and gentle play.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/clifford-the-big-red-snuggle-buddy-14in-plush-dog-toy-red/img-198419._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Chew Toys",
      description:
        "Durable toys designed to satisfy chewing instincts and keep teeth healthy.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/frisco-beef-flavored-twist-bone-nylon-chew-dog-toy-for-heavy-chewers-medium/img-359372._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Fetch Toys",
      description:
        "Fun, interactive toys built for chasing, retrieving, and active play.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/sungrow-interactive-outdoor-play-soccer-ball-dog-fetch-toy-with-straps/img-203790._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Puzzle Toys",
      description:
        "Mental stimulation and problem-solving fun to challenge curious dogs.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/moe/068bf322-7623-7f5c-8000-fc523a720a0e._AC_SL496_V1_.jpg
      quantity: 1,
    }),

    // Cat Beds

    createProduct({
      name: "Bolster Beds",
      description: "Cozy beds with raised edges for head and neck support.",
      price: 65,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/moe/068d6acf-e334-7b4a-8000-f3377211967d._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Orthopedic Beds",
      description:
        "Supportive beds designed to relieve joints and provide comfort for senior cats.",
      price: 65,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/moe/068eea17-ea04-79d7-8000-c2560c87f1a4._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Pillow Beds & Mats",
      description:
        "Soft, cushioned beds and mats perfect for lounging and naps.",
      price: 65,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/moe/068d6acf-e334-7b4a-8000-f3377211967d._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Heated Beds",
      description: "Warm, comforting beds that keep cats cozy and relaxed.",
      price: 65,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/pawspik-indoor-electric-heated-cat-small-dog-bed-sherpa-lined-charcoal-ivory-small/img-724548._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Fun & Trendy Beds",
      description:
        "Stylish and playful beds that double as a cozy retreat and décor piece.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url: "image", //https://image.chewy.com/catalog/general/images/armarkat-pumpkin-shape-cat-bed/img-370039._AC_SL496_V1_.jpg
      quantity: 1,
    }),

    // Cat Bowls & Feeders

    createProduct({
      name: "Bowls",
      description: "Durable, easy-to-clean bowls for everyday meals.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/iconic-pet-anti-ant-stainless-steel-non-skid-dog-cat-bowl-2-count-2-cup/img-472832._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Fountains & Waterers",
      description: "Fresh, flowing water to keep cats hydrated and healthy.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/moe/068d5996-e28d-7650-8000-159fbad90d1f._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Elevated Bowls & Diners",
      description:
        "Raised bowls that promote better posture and easier eating.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/moe/068d2f90-60f4-7705-8000-bd8edab28161._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Feeders",
      description: "Convenient feeders for controlled, mess-free mealtime.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/moe/0685ab8e-ddd1-7690-8000-2e5be2a7f47e._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Double Diners",
      description:
        "Dual bowls for food and water, perfect for multi-cat households.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/moe/06819e5a-0604-7578-8000-e1476993be24._AC_SL496_V1_.jpg
      quantity: 1,
    }),

    //Cat Carrier & Travel
    createProduct({
      name: "Backpacks & Carrier",
      description: "Comfortable, secure carriers for safe travel and outings.",
      price: 45,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/moe/069257f2-1045-79a9-8000-bc35321666c0._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Kennels",
      description: "Durable, cozy spaces for cats at home or on the go.",
      price: 45,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/tavo-pets-crispin-protection-system-dog-cat-kennel-merle-large/img-164726._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Strollers",
      description:
        "Convenient strollers for safe, stress-free outdoor adventures.",
      price: 45,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/moe/067f7bd9-ed11-7e47-8000-40f6b5b03fae._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Travel Bowls & Water Bottles",
      description:
        "Portable bowls and bottles to keep cats hydrated on the move.",
      price: 45,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/frisco-travel-collapsible-silicone-dog-cat-bowl-gray-small-1-5-cup/img-595950._AC_SL496_V1_.jpg
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
      image_url: "image", //https://image.chewy.com/catalog/general/images/safe-cat-snag-proof-polyester-breakaway-cat-collar-with-bell-purple/img-239514._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Leashes",
      description:
        "Lightweight, secure leashes for safe walks and outdoor adventures.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/travel-cat-the-true-adventurer-reflective-cat-kitten-harness-leash-red-small/img-504398._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Harnesses",
      description:
        "Supportive harnesses that keep cats secure while exploring.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/petsafe-come-with-me-kitty-nylon-cat-harness-bungee-leash-lilacdeep-purple-medium-10-5-to-14in-chest/img-194342._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Collar ID Tag",
      description: "Personalized ID tags to keep cats safe and identifiable.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/gotags-personalized-stainless-steel-with-enamel-paw-design-bone-shaped-pet-id-tag-sage-regular/img-577750._AC_SL496_V1_.jpg
      quantity: 1,
    }),

    //Cat Toys
    createProduct({
      name: "Interactive Toys",
      description: "Engaging toys that stimulate play and curiosity.",
      price: 35,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/moe/0685144d-0e45-7ba8-8000-5411ea16439c._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Teasers Wands",
      description: "Fun, dangling wands to encourage chasing and pouncing.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/pet-fit-for-life-2-feathers-1-coon-tail-wand-cat-toy/img-601715._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Balls & Chasers",
      description: "Rollable toys that keep cats active and entertained.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/earthtone-solutions-felted-wool-cat-ball-toy-6-count/img-152411._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Catnip Toys",
      description: "Catnip-infused toys that excite and delight playful cats.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/moe/06883cd5-c011-79a8-8000-5d8cbec7fb0c._AC_SL496_V1_.jpg
      quantity: 1,
    }),
    createProduct({
      name: "Plush & Mice Toys",
      description: "Soft, small toys perfect for cuddling and solo play.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url: "image", //https://image.chewy.com/catalog/general/images/moe/06883cd7-3509-78d7-8000-8c949cc42886._AC_SL496_V1_.jpg
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

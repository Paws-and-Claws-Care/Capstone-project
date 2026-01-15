import { createProduct } from "./queries/product.js";
import { createUser } from "./queries/users.js";
import { createOrder } from "./queries/orders.js";
import { addProductToOrder } from "./queries/order_items.js";
import { addReplyToPost } from "./queries/forum_replies.js";
import { createForumPost } from "./queries/forum_posts.js";

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
      price: 18,
      category: "food",
      pet_type: "dog",
      image_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo2UON_Uoif0ZolDWut3HJhAUv3r43oaVtbQ&s",
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
      price: 16,
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

    //SHIKHA PRODUCTS

    //Dog Beds
    createProduct({
      name: "Orthopedic Dog Beds",
      description:
        "Supportive beds designed to relieve joint pressure and provide extra comfort for senior and large dogs.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068a853c-d054-7bee-8000-3ad522d7ee54._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Bolster Beds",
      description:
        "Cozy beds with raised edges that provide comfort, support, and a secure place to rest.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0691e23d-7a19-7c9e-8000-8d6b91c1022b._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Elevated Beds",
      description:
        "Raised, breathable beds that keep dogs cool, supported, and off the ground.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068b0b1b-8549-7655-8000-54f4e4acda58._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Pillow Beds",
      description:
        "Soft, cushion-style beds that provide cozy comfort for dogs who love to sprawl.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/069271f8-a668-7c02-8000-ab91cff4f261._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Covered Beds",
      description:
        "Cozy, enclosed beds that provide warmth and a secure space dogs love.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/friends-forever-luna-donut-faux-fur-cozy-cave-covered-dog-bed-with-hooded-blanket-grey/img-287216._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Fun & Trendy",
      description:
        "Stylish, playful beds that add personality while keeping dogs cozy.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/multipet-lamb-chop-bolster-cat-dog-bed-with-removable-cover/img-734328._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Sofa Beds",
      description:
        "Sofa-style beds that offer plush comfort and a cozy place to lounge.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068a853c-d054-7bee-8000-3ad522d7ee54._AC_SL496_V1_.jpg",
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
      image_url:
        "https://image.chewy.com/catalog/general/images/frisco-stainless-steel-bowl-medium-4-cup-2-count/img-504070._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Slow & Puzzle Feeders",
      description:
        "Interactive feeders that slow eating, improve digestion, and turn mealtime into a fun challenge.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0692f3f7-83b8-7a92-8000-83f77e8d93e3._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Fountains & Waterers",
      description:
        "Keep dogs hydrated with fresh, flowing water in easy-to-use, hygienic designs.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068308fd-e797-7110-8000-288b07a3b90b._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Elevated Bowls",
      description:
        "Raised, stable bowls that support healthy posture and easier mealtime for dogs.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06893761-b9e9-78b8-8000-1c83646171e9._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Feeders",
      description:
        "Convenient, sturdy feeders designed for easy, healthy mealtime.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/petlibro-air-automatic-cat-feeder-with-battery-powered-dog-cat-food-dispenser-black-2-litter/img-311124._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Travel Bowls",
      description:
        "Portable, collapsible bowls for on-the-go hydration and feeding.",
      price: 45,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06940689-7a05-73cb-8000-4afe41ffb7d2._AC_SL496_V1_.jpg",
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
      image_url:
        "https://image.chewy.com/catalog/general/images/pawfurevers-waterproof-odorless-dog-collar-pink-teal-small/img-368930._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Harnesses",
      description:
        "Supportive, secure harnesses for comfortable walks and better control.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0691639c-5122-7c2b-8000-2ba354eb4e07._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Leashes",
      description:
        "Strong, reliable leashes for safe and enjoyable walks every day.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/pawtitas-recycled-reflective-dog-leash-teal-large/img-519138._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "ID tags & Accessories",
      description:
        "Personalized ID tags and handy accessories to keep dogs safe and organized.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/pawfurever-dog-breed-stainless-steel-personalized-dog-id-tag-husky-gold/img-277747._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Headcollar",
      description:
        "Gentle, effective head collars for training and better control on walks.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/halti-reflective-padded-no-pull-dog-headcollar-cobalt-blue-size-3/img-710880._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Service Dog",
      description:
        "Specialized gear designed for working dogs to perform tasks safely and efficiently.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/industrial-puppy-reflective-service-dog-harness-leash-red-x-large-30-to-39in-chest/img-217969._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Smart Collars & Training",
      description:
        "Smart collars and training tools designed to support safety, tracking, and positive behavior.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/bousnic-smart-bark-collar-waterproof-automatic-bark-control-dog-training-collar-black/img-473696._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Tie Outs",
      description:
        "Secure tie-outs that give dogs freedom while keeping them safely contained.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/frisco-easy-grip-stake-with-tie-out-cable-large-30ft/img-471138._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Muzzles",
      description:
        "Comfortable, secure muzzles for safe handling and controlled outings.",
      price: 54,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/bronzedog-soft-padded-nylon-dog-muzzle-mint-green-medium/img-691155._AC_SL496_V1_.jpg",
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
      image_url:
        "https://image.chewy.com/catalog/general/images/petmate-two-door-top-load-dog-cat-kennel-tan-24-inches-up-to-15lbs/img-198035._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Pens & Accessories",
      description:
        "Flexible, secure solutions for safe play, training, and everyday containment.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06929b3d-55bb-74b2-8000-e24528f6f053._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Dog Houses",
      description:
        "Durable, weather-resistant shelters that provide cozy outdoor protection.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/frisco-plastic-outdoor-dog-house-with-elevated-platform-x-large/img-503515._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Stair & Steps",
      description:
        "Safe, supportive steps that help dogs reach higher places with ease.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/petsafe-cozyup-foldable-cat-dog-stairs-grey-large/img-437940._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Ramp & Gates",
      description:
        "Practical ramps and gates for safety, accessibility, and home boundaries.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/carlson-pet-products-heritage-home-indoor-wooden-cat-dog-ramp-rustic-white/img-762601._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Crate Mats & Pads",
      description:
        "Soft, supportive bedding that adds comfort to crates and kennels.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/frisco-swirl-dog-crate-mat-gray-42/img-566295._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Fence Systems",
      description:
        "Reliable fencing solutions to keep dogs safe and contained, indoors or outdoors.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/hoistspark-gps-wireless-fence-system-dog-tracker-black-medium/img-626684._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Doors & Accessories",
      description:
        "Reliable solutions for secure access and containment, indoors or outdoors.",
      price: 30,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/trixie-2-way-pet-door-with-lockable-panel-for-dogs-mediumlarge/img-250059._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

    //Dog Toys

    createProduct({
      name: "Plush Toys",
      description: "Soft, cuddly toys perfect for snuggling and gentle play.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/clifford-the-big-red-snuggle-buddy-14in-plush-dog-toy-red/img-198419._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Chew Toys",
      description:
        "Durable toys designed to satisfy chewing instincts and keep teeth healthy.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/frisco-beef-flavored-twist-bone-nylon-chew-dog-toy-for-heavy-chewers-medium/img-359372._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Fetch Toys",
      description:
        "Fun, interactive toys built for chasing, retrieving, and active play.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/sungrow-interactive-outdoor-play-soccer-ball-dog-fetch-toy-with-straps/img-203790._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Puzzle Toys",
      description:
        "Mental stimulation and problem-solving fun to challenge curious dogs.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068bf322-7623-7f5c-8000-fc523a720a0e._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Puzzle Toys",
      description:
        "Mental stimulation and problem-solving fun to challenge curious dogs.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068bf322-7623-7f5c-8000-fc523a720a0e._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Rope & Tug Toys",
      description:
        "Durable toys designed for interactive play and tugging fun.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/frisco-fetch-colorful-ball-knot-rope-dog-toy-smallmedium/img-441237._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Treat Dispensing Toys",
      description:
        "Interactive toys that reward play while keeping dogs engaged.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068d3c69-e22b-7b22-8000-8df60cf5c874._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Puppy Toys",
      description: "Gentle, durable toys designed for teething and early play.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/benebone-bacon-flavor-tough-puppy-chew-toy-2-count/img-623246._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Variety Packs",
      description: "A mix of toys for chewing, fetching, and endless fun.",
      price: 32,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/rocket-rex-small-medium-breeds-puppy-chew-toy-variety-pack-6-count/img-741509._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

    // Cat Beds
    createProduct({
      name: "Covered Beds",
      description:
        "Cozy, enclosed beds that give cats a warm and secure place to rest.",
      price: 65,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/best-friends-by-sheri-meow-hut-covered-cat-dog-bed-grey-standard/img-134161._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Bolster Beds",
      description: "Cozy beds with raised edges for head and neck support.",
      price: 65,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068d6acf-e334-7b4a-8000-f3377211967d._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Orthopedic Beds",
      description:
        "Supportive beds designed to relieve joints and provide comfort for senior cats.",
      price: 65,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068eea17-ea04-79d7-8000-c2560c87f1a4._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Pillow Beds & Mats",
      description:
        "Soft, cushioned beds and mats perfect for lounging and naps.",
      price: 65,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068d6acf-e334-7b4a-8000-f3377211967d._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Heated Beds",
      description: "Warm, comforting beds that keep cats cozy and relaxed.",
      price: 65,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/pawspik-indoor-electric-heated-cat-small-dog-bed-sherpa-lined-charcoal-ivory-small/img-724548._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Fun & Trendy Beds",
      description:
        "Stylish and playful beds that double as a cozy retreat and décor piece.",
      price: 65,
      category: "Supplies",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/armarkat-pumpkin-shape-cat-bed/img-370039._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

    // Cat Bowls & Feeders

    createProduct({
      name: "Bowls",
      description: "Durable, easy-to-clean bowls for everyday meals.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/iconic-pet-anti-ant-stainless-steel-non-skid-dog-cat-bowl-2-count-2-cup/img-472832._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Fountains & Waterers",
      description: "Fresh, flowing water to keep cats hydrated and healthy.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068d5996-e28d-7650-8000-159fbad90d1f._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Elevated Bowls & Diners",
      description:
        "Raised bowls that promote better posture and easier eating.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068d2f90-60f4-7705-8000-bd8edab28161._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Feeders",
      description: "Convenient feeders for controlled, mess-free mealtime.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0685ab8e-ddd1-7690-8000-2e5be2a7f47e._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Double Diners",
      description:
        "Dual bowls for food and water, perfect for multi-cat households.",
      price: 16,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06819e5a-0604-7578-8000-e1476993be24._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

    //Cat Carrier & Travel
    createProduct({
      name: "Backpacks & Carrier",
      description: "Comfortable, secure carriers for safe travel and outings.",
      price: 45,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/069257f2-1045-79a9-8000-bc35321666c0._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Kennels",
      description: "Durable, cozy spaces for cats at home or on the go.",
      price: 45,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/tavo-pets-crispin-protection-system-dog-cat-kennel-merle-large/img-164726._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Car Accessories",
      description:
        "Essential travel gear that keeps cats safe and comfortable on the road.",
      price: 45,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/frisco-travel-safety-dog-cat-carrier-medium/img-494510._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Strollers",
      description:
        "Convenient strollers for safe, stress-free outdoor adventures.",
      price: 45,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/067f7bd9-ed11-7e47-8000-40f6b5b03fae._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Travel Bowls & Water Bottles",
      description:
        "Portable bowls and bottles to keep cats hydrated on the move.",
      price: 45,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/frisco-travel-collapsible-silicone-dog-cat-bowl-gray-small-1-5-cup/img-595950._AC_SL496_V1_.jpg",
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
      image_url:
        "https://image.chewy.com/catalog/general/images/safe-cat-snag-proof-polyester-breakaway-cat-collar-with-bell-purple/img-239514._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Leashes",
      description:
        "Lightweight, secure leashes for safe walks and outdoor adventures.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/travel-cat-the-true-adventurer-reflective-cat-kitten-harness-leash-red-small/img-504398._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Harnesses",
      description:
        "Supportive harnesses that keep cats secure while exploring.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/petsafe-come-with-me-kitty-nylon-cat-harness-bungee-leash-lilacdeep-purple-medium-10-5-to-14in-chest/img-194342._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Collar ID Tag",
      description: "Personalized ID tags to keep cats safe and identifiable.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/gotags-personalized-stainless-steel-with-enamel-paw-design-bone-shaped-pet-id-tag-sage-regular/img-577750._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

    //Cat Toys
    createProduct({
      name: "Interactive Toys",
      description: "Engaging toys that stimulate play and curiosity.",
      price: 35,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0685144d-0e45-7ba8-8000-5411ea16439c._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Teasers Wands",
      description: "Fun, dangling wands to encourage chasing and pouncing.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/pet-fit-for-life-2-feathers-1-coon-tail-wand-cat-toy/img-601715._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Balls & Chasers",
      description: "Rollable toys that keep cats active and entertained.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/earthtone-solutions-felted-wool-cat-ball-toy-6-count/img-152411._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Catnip Toys",
      description: "Catnip-infused toys that excite and delight playful cats.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06883cd5-c011-79a8-8000-5d8cbec7fb0c._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Plush & Mice Toys",
      description: "Soft, small toys perfect for cuddling and solo play.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06883cd7-3509-78d7-8000-8c949cc42886._AC_SL496_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Scratchers Toys",
      description:
        "Durable scratchers that satisfy your cat's natural urge to scratch.",
      price: 42,
      category: "Supplies",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/necoichi-premium-comfort-cat-scratcher-wall-oakbrown-regular/img-627413._AC_SL496_V1_.jpg",
      quantity: 1,
    }),

    //KATELYN PRODUCTS

    createProduct({
      name: "Greenies Original Regular Size",
      description: "Adult Natural Dental Dog Treats, 36 oz",
      price: 36,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0691c86a-89c5-731d-8000-3a1b9663a46d._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Blue Buffalo True Chews",
      description:
        "Premium Jerky Cuts with Natural Ingredients Chicken Dog Treats, 32 oz.",
      price: 18,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068dd87b-19c8-7738-8000-d0ee074426e3._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Blue Buffalo",
      description: "Nudges Grillers Chicken Dog Treats, 16 oz.",
      price: 15,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0693c33a-2235-7224-8000-04aa8ea0a20a._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Butcher's Naturals",
      description: "Slow Roasted Salmon Jerky Dog Treats, 16 oz.",
      price: 12,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/butchers-naturals-slow-roasted-salmon-jerky-dog-treats-16oz-bag/img-713599._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Butcher's Naturals",
      description: "Dry Pig Ears Dog Treats, 14 oz.",
      price: 20,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/butchers-naturals-dry-pig-ears-dog-treats-14oz-bag/img-576804._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Good 'n' Fun",
      description:
        "Triple Flavor Kabobs Chicken, Duck & Chicken Liver Dog Treat Chews, 18 oz.",
      price: 9,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/good-n-fun-triple-flavor-kabobs-chicken-duck-chicken-liver-dog-chews-18-count/img-421537._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Blue Buffalo",
      description:
        "Health Bars Baked with Apples & Yogurt Dog Treats, 1-lb bag",
      price: 5,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0686d745-1a19-7739-8000-8182c48918b2._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Vital Essentials",
      description: "Beef Liver Freeze-Dried Dog Treats, 2 oz.",
      price: 6,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068e3d7d-aa74-76b7-8000-cf496b309bc4._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Milk-Bone",
      description: "Soft & Chewy Beef & Filet Mignon Recipe Dog Treats, 25 oz.",
      price: 15,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06891102-da44-7f42-8000-5b76f3024600._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    //10
    createProduct({
      name: "Savory Prime",
      description: "Beggar Bones 3 in 1 Chicken Wings Dog Treats, 10 count",
      price: 13,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06941719-3ec3-786b-8000-3c523a12e779._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Gunnis Taste of Iceland",
      description: "Wolffish Baby Bites Dehydrated Dog Treats, 2.5 oz.",
      price: 12,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06939ce0-8292-7c84-8000-964c9d6be62f._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Wanpy Prime",
      description:
        "All Natural Air-Dried Duck Grain-Free Jerky Dog Treats, 3.5 oz.",
      price: 6,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0690b77b-61f2-7b07-8000-93bb3bd3b2ed._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Milk Bone",
      description: "Dunkin' Vanilla Glaze Flavor Dog Treats, 8 oz.",
      price: 5,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/067d2dff-7f05-7d62-8000-396413b2fdc3._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Pork Chomps",
      description: "Munchy Sticks Dog Treats, 50 count",
      price: 6,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/pork-chomps-munchy-sticks-dog-treats-50-count/img-623679._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Portland Pet Food Company",
      description:
        "Pumpkin Biscuits Grain-Free & Gluten-Free Dog Treats, 5 oz.",
      price: 10,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/portland-pet-food-company-pumpkin-biscuits-grain-free-gluten-free-dog-treats-5oz-bag/img-508695._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Newman's Own",
      description:
        "Bacon & Berries Recipe Woofles Soft & Chewy Dog Treats, 10 oz.",
      price: 10,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/newmans-own-bacon-berries-recipe-woofles-soft-chewy-dog-treats-10oz-bag/img-260282._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Dream Bone",
      description:
        "Sprials Variety Pack Real Chicken, Beef & Prok Rawhide Free Dog Chews, 18 count",
      price: 9,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0691dd73-5101-717e-8000-5e0869712015._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Pup-Peroni",
      description: "Original Beef Flaor Dog Treats, 22.5 oz.",
      price: 12,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/067f563d-14f5-769a-8000-848ec4208634._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Poochie Butter",
      description: "Peanut Butter Blueberry Lickable Dog Treat, 12 oz jar.",
      price: 9,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068f7e49-2529-7e3b-8000-728119619fd2._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    //20
    createProduct({
      name: "Milk-Bone",
      description: "MaroSnacks Real Bone Marrow Dog Treats, 40 oz tub",
      price: 12,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/067d8904-08ff-7d65-8000-58a851a7aabf._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Jack & Pup",
      description: "Tripe Twist 6-in Dog Chew",
      price: 2,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/067f93ba-f935-7972-8000-71bc96004e36._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Canine Carry Outs",
      description: "Cupid Valentine's Cookies Dog Treats, 4.5 oz.",
      price: 2,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/canine-carry-outs-cupid-valentines-cookies-dog-treats-4-5oz-bag/img-496414._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Wholesome Pride Pet Treats",
      description:
        "Sweet Potato Fries All-Natural Single INgredient Dog Treats, 8 oz.",
      price: 10,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/wholesome-pride-pet-treats-sweet-potato-fries-all-natural-single-ingredient-dog-treats-8oz-bag/img-165343._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Bundle: Variety Pack - Buffallo Health Bars",
      description:
        "Baked with Banana & Yogurt Dog Treats, Pumpkin & Cinnamon & Apples & Yogurt Flavors",
      price: 14,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/variety-pack-blue-buffalo-health-bars-baked-with-banana-yogurt-dog-treats-pumpkin-cinnamon-apples-yogurt-flavors/img-381702._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Three Dog Bakery",
      description:
        "Soft Baked Woofers Grain-Free Peanut Butter Banana Dog Treats, 13 oz.",
      price: 6,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068b0681-9778-7de6-8000-09ec9f301225._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Smart Bones",
      description: "Twist Sticks Peanut Butter Flavor Dog Treats, 50 count",
      price: 8,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/smartbones-twist-sticks-peanut-butter-flavor-dog-treats-50-count/img-330945._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Milk-Bone",
      description:
        "Peanut Buttery Bites Real Peanut Butter & Bacon Soft & Chewy Dog Treats, 4.5 oz.",
      price: 3,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/milk-bone-peanut-buttery-bites-real-peanut-butter-bacon-soft-chewy-dog-treats-4-5oz-bag/img-719248._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Buddy Biscuits",
      description: "Softies with Peanut Butter Soft & Chewy Dog Treats, 6 oz.",
      price: 3,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/buddy-biscuits-softies-with-peanut-butter-soft-chewy-dog-treats-6oz-bag/img-344325._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Hartz",
      description:
        "Oinkies Hearty Kabobs with 100% Real Chicken & Duck Carrot & Sweet Potato Rawhide-Free Natural Dog Treats, 18 count.",
      price: 12,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/hartz-oinkies-hearty-kabobs-with-100-real-chicken-duck-carrot-sweet-potato-rawhide-free-natural-dog-treats-18-count/img-782708._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    //30
    createProduct({
      name: "PupCorn",
      description: "Plus Bacon & Peanut Butter Flavor Dog Treats, 4 oz.",
      price: 3,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06913162-c978-76f7-8000-807316cae9dd._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "DentaLife",
      description:
        "Daily Oral Care Chicken Flavor Small/Medium Adult Dental Treats, 40 count pouch",
      price: 13,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0685599d-77da-7353-8000-9e8d91a2ed61._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Milk-Bone",
      description:
        "Mini's Flavor Snacks Beef, Chicken & Bacon Flavored Biscuit Dog Treats, 36 oz tub.",
      price: 12,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0670e71d-ce99-701d-8000-71e1beb96c5e._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Full Moon",
      description:
        "All Natural Human Grade Beef Savory Sticks Dog Treats, 22 oz.",
      price: 18,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/full-moon-all-natural-human-grade-beef-savory-sticks-dog-treats-22oz-bag/img-335854._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Rachael Ray Nutrish",
      description:
        "Turkey Bites Hickory Smoke Bacon Recipe Grain-Free Dog Treats, 5 oz.",
      price: 6,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/rachael-ray-nutrish-turkey-bites-hickory-smoke-bacon-recipe-grain-free-dog-treats-5oz-bag/img-538313._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Nutrish",
      description:
        "Burger Bites, Beef Burger with Bison Grain-Free Dog Treats, 12 oz.",
      price: 10,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0694e9f6-7599-73c8-8000-61f7b86fee31._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Bones & Chews",
      description: "Pig Ear Chews Dog Treats, 1 count",
      price: 3,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/bones-chews-pig-ear-chews-dog-treats-1-count/img-375355._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "DreamBone",
      description:
        "CollaYUMS Twist Plus Collagen Chicken & Peanut Butter Flavor Rawhide Free Dog Chews, 20 count",
      price: 9,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068b89a2-58ff-7f5a-8000-2017bcd60047._AC_SX500_SY400_QL75_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Healthfuls",
      description: "Salmon Fillets Dog Treats, 3.5 oz.",
      price: 4,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/healthfuls-salmon-fillets-dog-treats-3-5oz-bag/img-322441._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Ultra Chewy",
      description:
        "Double treat Bone Peanut Butter Flavor Dog Treats, 8 count.",
      price: 8,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/ultra-chewy-double-treat-bone-peanut-butter-flavor-dog-treats-8-count/img-750298._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    //40
    createProduct({
      name: "Blue Buffalo",
      description: "Be Mine Oatmeal & Cinnamon Crunchy Dog Treats, 11 oz.",
      price: 6,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068cbdda-cdd7-7405-8000-15b4da123f55._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Fruitables",
      description: "Pumpkin & Blueberry Flavor Dog Treats, 7 oz.",
      price: 4,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068a782a-78f5-7fbb-8000-93e4009bff65._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "TruRanch",
      description: "Bully Collagen Sticks Dog Treats, 5-in, 15 count.",
      price: 5,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/truranch-bully-collagen-sticks-dog-treats-5in-15-count/img-543278._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Full Moon",
      description: "Chicken Jerky Human-Grade Dog Treats, 24 oz.",
      price: 27,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/full-moon-chicken-jerky-human-grade-dog-treats-24oz-bag/img-780365._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Three Dog Bakery",
      description: "Blueberry Pancake Soft Baked Dog Treats, 25 oz.",
      price: 15,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/three-dog-bakery-blueberry-pancake-soft-chewy-dog-treats-25oz-bag/img-589294._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Hartz",
      description:
        "Oinkies Chew Bones with 100% Real Chicken Breast Rawhide-Free Natural Dog Treats, 25 count.",
      price: 15,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/067dac6a-e010-7070-8000-3ebcec7db97b._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Newman's Own",
      description:
        "Snack Sticks Chicken & Sweet Potato Recipe Grain-Free Dog Treats, 5 oz.",
      price: 4,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/newmans-own-snack-sticks-chicken-sweet-potato-recipe-grain-free-dog-treats-5oz-bag/img-181074._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Blue Buffalo",
      description:
        "Soft & Chewy Health Bars Chicken & Mixed Berries Dog Treats, 9 oz.",
      price: 6,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0691f6fc-9c27-7c0f-8000-7d91cefb9feb._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Bones & Chews",
      description: "Made in USA Roasted Marrow Bone 6-in Dog Treat, 1 count.",
      price: 6,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/bones-chews-made-in-usa-roasted-marrow-bone-6-dog-treat-1-count/img-372174._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Purina Beneful",
      description:
        "Baked Belights Hugs with Real Beef & Cheese Dog Treats, 19 oz.",
      price: 7,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068e52c2-9d0c-7b43-8000-82ae1f4c2d6a._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    //50
    createProduct({
      name: "Nutrish",
      description: "Soup Bones Premium Beef & Barley Flavor Dog Treats, 23 oz.",
      price: 10,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06889012-660d-7f6c-8000-2b4aefe08908._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Redbarn",
      description: "Medium Barky Bark Dog Treats, 6 count",
      price: 7,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068308ef-ec8f-7eba-8000-f698573a0c72._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Blue Buffalo",
      description: "Nudges Grillers Chicken Dog Treats, 16 oz.",
      price: 15,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0693c33a-2235-7224-8000-04aa8ea0a20a._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Bocce's Bakery",
      description:
        "Birthday Peanut Buttter, Molasses & Vanilla Cake Dog Treats, 5 oz.",
      price: 7,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/bocces-bakery-birthday-peanut-butter-molasses-vanilla-cake-dog-treats-5oz-bag/img-579806._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Rachael Ray Nutrish",
      description:
        "Turkey Bites Hickory Smoke Bacon Recipe Grain-Free Dog Treats, 5 oz.",
      price: 6,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/rachael-ray-nutrish-turkey-bites-hickory-smoke-bacon-recipe-grain-free-dog-treats-5oz-bag/img-538313._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Waggin' Train",
      description:
        "Duck Jercy Tenders Sensitive Stomach Duck Grain-Free High-Protein Jerky Dog Treats, 12 oz.",
      price: 11,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/waggin-train-duck-jerky-tenders-sensitive-stomach-duck-grain-free-high-protein-jerky-dog-treats-12oz-bag/img-517412._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Redbarn",
      description: "Bully Slices Peanut Butter Flavor Beef God Treats, 9 oz.",
      price: 13,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/067ed773-bb96-706d-8000-90f5b4e046f9._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Racheal Ray Nutrish",
      description:
        "Soup Bones Long Lasting Chews Variety Pack Dog Treats, 22 count.",
      price: 22,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/rachael-ray-nutrish-soup-bones-long-lasting-chews-variety-pack-dog-treats-22-count/img-615131._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Jack & Pup",
      description: "Joint Health 6-inch Beef Gullet Sticks Dog Treat, 1 count",
      price: 2,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/067beefa-9752-7956-8000-5578a64c508b._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Busy Bone",
      description:
        "Peanut Butter Flavor Long-Lasting Chew Adult Small/Medium Dog Treats, 10 count pouch.",
      price: 16,
      category: "treats",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0684832e-dde6-732d-8000-b2d4bcacccc9._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    //60

    //*********CAT TREATS*********//
    createProduct({
      name: "Fiskies",
      description: "Party Mix Natural Yums with Real Tuna Cat Treats, 20 oz.",
      price: 9,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/friskies-party-mix-natural-yums-with-real-tuna-cat-treats-20oz-tub/img-222203._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Temptations",
      description:
        "MixUps Catnip Fever Flavor Soft & Crunchy Cat Treats, 30 oz.",
      price: 15,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06916365-f083-784e-8000-01620133be6b._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Temptations",
      description:
        "MixUps Catnip Backyard Cookout Flavor Soft & Crunchy Cat Treats, 30 oz.",
      price: 15,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06916367-a4e5-7651-8000-b26c936b956c._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Bonkers",
      description:
        "Bites Grain-Free Seafood & Eat IT! Crunchy Cat Treats, 30 oz.",
      price: 13,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0686ba37-f797-7a2a-8000-e0a39d5baaf1._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Greenies",
      description:
        "Feline Oven Roasted Chicken Flavor Adult Natural Dental Cat Treats, 4.6 oz.",
      price: 6,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/069164ba-f7ec-7216-8000-3f02eee2d7f8._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Meow Mix",
      description:
        "Irresistibles White Meat Chicken Soft & Chewy Cat Treats, 3 oz.",
      price: 2,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06943e92-0b58-7579-8000-173802136482._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Vital Essentials",
      description: "Minnows Grain-Free Freeze-Dried Raw Cat Treats, 0.5 oz.",
      price: 8,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068d2f74-f063-7bc3-8000-09e1290213ba._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "I and Love and You",
      description:
        "Fillin Good Chicken Flavor with Digestive Support Grain-Free Chrunchy Cat Treats, 2 oz. ",
      price: 5,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/069260a4-ec1c-7178-8000-66a60d8a0cea._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Friskies",
      description:
        "Party Mix Cheezy Craze Crunch Flavor Chrunchy Cat Treats, 6 oz.",
      price: 4,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/friskies-party-mix-cheezy-craze-crunch-flavor-crunchy-cat-treats-6oz-bag/img-416766._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Sheba",
      description:
        "Meaty Tender Sticks Chicken Flavor Soft Adult Cat Treats, 5 count.",
      price: 2,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068fb96a-175a-7ec4-8000-f98609595bce._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    //10
    createProduct({
      name: "Shameless Pets",
      description: "Catnip N Chill Chicken Crunchy Cat Treats, 3.5 oz.",
      price: 4,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/067e54c5-1f9b-714b-8000-302991c257bd._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Blue Buffalo",
      description: "Bursts with Paw-Licken Chicken Cat Treats, 12 oz.",
      price: 9,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/blue-buffalo-bursts-with-paw-licken-chicken-cat-treats-12oz-tub/img-666388._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "PureBites",
      description: "Holiday Turkey Freeeze-Dried Cat Treats, 0.8 oz.",
      price: 3,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/purebites-holiday-turkey-freeze-dried-cat-treats-0-81oz-bag/img-219868._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Vital Essentials",
      description: "Chicken Breast Freeze-Dried Raw Cat Treats, 1 oz.",
      price: 6,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068d2f75-0378-7dcc-8000-fbcc8e336503._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Hartz",
      description:
        "Delectables Squeeze Up Chicken, Tuna, Tuna & Salmon Variety Pack Grain-Free Lickable Cat Treats, 0.5 oz, 54 count. ",
      price: 28,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06825f9f-d3fa-710a-8000-f6be04953b02._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Fancy Feast",
      description:
        "Purina Fancy Feast Purely Natural Chicken, Tuna & Salmon Variety Pack Soft Cat Treat, 10 count.",
      price: 4,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/purina-fancy-feast-purely-natural-chicken-tuna-salmon-variety-pack-soft-cat-treat-10-count/img-640213._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Bonkers",
      description:
        "Purr Pops Grain-Free Chicky Licks Freeze-Dried Cat Treats, 4 count.",
      price: 3,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0686ba10-f3c9-7f42-8000-44b9ef0897ef._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Temptations",
      description:
        "Classic Shrimpy Shrimp Flavor Soft & Crunchy Cat Treats, 16 oz.",
      price: 6,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06916367-4856-76ad-8000-d693bea8eb2d._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "DentalLife",
      description: "Tasty Chicken Flavor Dental Cat Treats, 1.8 oz.",
      price: 2,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/dentalife-tasty-chicken-flavor-dental-cat-treats-1-8oz-bag/img-228336._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "MeowMix",
      description: "Irresistibles Soft Salmon Cat Treats, 3 oz.",
      price: 2,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/069273f2-e922-79ad-8000-7b529408d770._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    //20
    createProduct({
      name: "Vital Essentials",
      description: "Chicken Hearts Freeze-Dried Raw Cat Treats, 0.8 oz.",
      price: 7,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068d2f92-e5bf-703d-8000-caef50f81a87._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Friskies",
      description:
        "lil' Lickables Ocean Whitefish Lickable Cat Treats, 2 oz, 4 count.",
      price: 3,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0689e433-5393-707f-8000-d84a7839aab8._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Inaba",
      description:
        "Churu Tuna & Chicken Puree Variety Pack Grain-Free Lickable Cat Treat, 0.5 oz tube, pack of 50 ",
      price: 33,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06879516-1ebc-7372-8000-f5c4238c5e28._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Whisker Lickin's",
      description: "Tuna Flavor Chruchy Cat Treats, 10 oz.",
      price: 5,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/whisker-lickins-tuna-flavor-crunchy-cat-treats-10oz-bag/img-468611._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Icelandic+",
      description: "Herring Whole Fish Dehydrated Cat Treats, 1 oz.",
      price: 6,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0690a57d-aeb0-7a6a-8000-d3bd438b87bb._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Temptations",
      description:
        "Birhtday Lobster & Beef Flavor Soft & Crunchy Cat Treats, 6.3 oz.",
      price: 4,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/temptations-birthday-lobster-beef-flavored-crunchy-cat-treats-6-3oz-bag/img-591662._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Choolip",
      description:
        "Squeeze Vita Stick Grab n Go Kidney Support Lickable Dog & Cat Treats, 25.9 oz, 49 count.",
      price: 40,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068405eb-e844-7516-8000-8c9ecbdf0029._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Blue Buffalo",
      description:
        "Wilderness Tasty Chicken Flavor Grain-Free Chunchy Cat Treats, 12 oz.",
      price: 11,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/blue-buffalo-wilderness-tasty-chicken-flavor-grain-free-crunchy-cat-treats-12oz-tub/img-407753._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Gunnis Taste of Iceland",
      description: "Salmoon Mini Morsel Dehydrated Cat Treats, 1.5 oz.",
      price: 8,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06939ce2-9495-7600-8000-3974f28b03ab._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Van Ness",
      description: "Oat Garden Kit",
      price: 3,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/van-ness-oat-garden-kit/img-552362._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    //30
    createProduct({
      name: "Inaba",
      description:
        "Churu Tidbits Tuna & Salmon Recipe Grain-Free Cat Treats, 0.42 oz, 8 count.",
      price: 7,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068a7829-35f0-71c5-8000-cc09821b7aba._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Tiki Cat",
      description: "Soft & Chewy Chicken Flavor Grain-Free Cat Treats, 2 oz.",
      price: 4,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0675aefd-581d-7b76-8000-ea96e647eb1a._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Meowijuana",
      description: "Chrunchie Munchies Salmon Flavored Cat Treats, 3 oz.",
      price: 5,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0690a57c-65f1-729a-8000-76486f14779b._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Hartz",
      description:
        "Delectables Lickable Treat Gravy Non Seafood Chicken Lickable Cat Treat, 1.4 oz, 12 count.",
      price: 11,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068402df-10eb-7299-8000-01d8cd223ef1._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "WHIMZEES",
      description:
        "by Wellness Natural Chicken & Salmon Dental Cat Treats, 4.5 oz.",
      price: 6,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/whimzees-by-wellness-natural-chicken-salmon-dental-cat-treats-4-5oz-bag/img-210295._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Whole Life Pet",
      description: "Just One Shrimp Freeze-Dried Cat Treats, 0.7 oz.",
      price: 5,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068308ea-d55a-7ac5-8000-3937c2fd2ede._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Get Naked",
      description: "Digestive Health Soft Cat Treats, 2.5 oz.",
      price: 5,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/get-naked-digestive-health-soft-cat-treats-2-5oz-bag/img-760855._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Bundle: Varitey Pack - Buffalo Blue",
      description:
        "Wilderness Chicken & Trout Grain-Free Cat Treats, 2-oz bag, Chicken & Turkey, Chicken & Duck & Salmon Flavors",
      price: 10,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/variety-pack-blue-buffalo-wilderness-chicken-trout-grain-free-cat-treats-2oz-bag-chicken-turkey-chicken-duck-salmon-flavors/img-497590._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Shameless Pets",
      description:
        "Yam Good Salmon & Sweet Potatos Chrunchy Cat Treats, 2.5 oz.",
      price: 5,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/067e54c8-3af2-7c3e-8000-77a083c6b6da._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Inaba",
      description:
        "Churu for Senior 10+ Tuna & Salmon Bisque Lickable Cat Treats, 1.4 oz, 12 count.",
      price: 13,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06822019-121c-70de-8000-9778e8056dce._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    //40
    createProduct({
      name: "Jack & Cat",
      description: "Meaty Tuna Bites Soft & Chewy Cat Treats, 3 oz.",
      price: 4,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06853e83-9a07-738d-8000-848c61579fee._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Bonkers",
      description:
        "Cat Pillows Bangin Beef Flavored Chruchy Cat Treats, 6.3 oz.",
      price: 4,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0686ba3a-eedf-7509-8000-61239ca18475._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Fancy Feast",
      description:
        "Purina Fancy Feast Purely Natural Hand-Flaked Tuna Soft Cat Treat, 10 count.",
      price: 4,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/purina-fancy-feast-purely-natural-hand-flaked-tuna-soft-cat-treat-10-count/img-480481._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Kitford by Pupford",
      description: "Salmon Freeze-Dried Cat Treats, 1.2 oz.",
      price: 9,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068b0a37-e628-7da8-8000-38cff843f146._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Reveal",
      description:
        "Natural Grain-Free Whole Tuna Loin Chewy Cat Treats, 1 count.",
      price: 3,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0681bb9e-387e-7869-8000-a603870a2f34._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Timy Tiger",
      description: "Catnip Craze Flavor Filled Chrunchy Cat Treats, 3 oz.",
      price: 2,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/tiny-tiger-catnip-craze-flavor-filled-crunchy-cat-treats-3oz-bag/img-722226._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "SmartyKat",
      description: "Silvervine Cat Attrachtant Catnip, 2 oz.",
      price: 7,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/069257eb-fa22-70a7-8000-1c0caf59e6dd._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Vital Essentials",
      description: "Duck Liver Treats Freeze-Dried Raw Cat Treats, 1 oz.",
      price: 8,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068d2f7d-3d2d-7aee-8000-2d06363cf96c._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Friskies",
      description:
        "Lil' Soups with Flaked Chicken in a Velvety Tuna Broth Lickable Cat Food Topper, 1.2 oz, case of 8. ",
      price: 9,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/friskies-lil-soups-with-flaked-chicken-in-a-velvety-tuna-broth-lickable-cat-food-topper-1-2oz-tub-case-of-8/img-732586._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "ORIJEN",
      description:
        "Original Freeze-Dried Grain-Free High-Protien Raw Animal Ingredient Cat Treats, 1.25 oz.",
      price: 8,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0685e7dd-23b3-73ee-8000-f1e996a7a4d5._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    //50
    createProduct({
      name: "Inaba",
      description:
        "Grilled Chicken Fillet in Chicken Flavored Broth Grain-Free Cat Treat, 0.9 oz, 6 count.",
      price: 11,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/inaba-grilled-chicken-fillet-in-chicken-flavored-broth-grain-free-cat-treat-9oz-pouch-6ct/img-292363._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Wanpy Prime",
      description:
        "All Natural Air-Dried Soft Duck High Protien Jerky Strips Cat Treats, 2.8 oz.",
      price: 4,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0690b782-3943-70ea-8000-4821e62146de._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Plato",
      description: "Baltic Herring Dog  Cat Treat, 3 oz.",
      price: 13,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/plato-baltic-herring-dog-cat-treat-3oz-bag/img-781979._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Whisker Lickin's",
      description:
        "Chicken & Salmon Seafood Flavors Chrunchy Cat Treats, 6.5 oz.",
      price: 4,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/whisker-lickins-chicken-seafood-flavors-crunchy-cat-treats-6-5oz-bag/img-259541._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Whole Life",
      description:
        "Just One Ingredient Pure Salmon Fillet Grain-Free Freeze-Dried Cat Treats, 2.5 oz.",
      price: 14,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/whole-life-just-one-ingredient-pure-salmon-fillet-grain-free-freeze-dried-cat-treats-2-5oz-bag/img-399823._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Fieldcrest Farms",
      description:
        "Nothin' to Hide Collagen Chicken Flavor Chrunchy Cat Treats, 3 oz.",
      price: 4,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0680a963-4914-76f9-8000-8e3e6c7eb136._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Frisco",
      description: "Natural Catnip, 2 oz.",
      price: 6,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/frisco-natural-catnip-2oz/img-337507._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Purina Pro Plan Veterinary Diets",
      description: "Chrunchy Bites Dental Cat Treats, 1.8 oz.",
      price: 7,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0677bd50-b295-7854-8000-fe2ac03335b7._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Get Naked",
      description: "Urinary Health Grain-Free Chrunchy Cat Treats, 2.6 oz.",
      price: 5,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/get-naked-urinary-health-grain-free-crunchy-cat-treats-2-5oz-bag/img-189314._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    createProduct({
      name: "Wellness",
      description:
        "Kittles Natural Grain-Free Chicken & Cranberries Chrunchy Cat Treats, 2 oz.",
      price: 3,
      category: "treats",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/wellness-kittles-natural-grain-free-chicken-cranberries-crunchy-cat-treats-2oz-bag/img-381520._AC_SL248_V1_.jpg",
      quantity: 1,
    }),
    //60

    //TERANAE

    createProduct({
      name: "Wuffes Advanced Omega 3 Fish Oil for Healthy Skin & Coat Supplement",
      description:
        "Omega fatty acids, vitamins, and minerals work together to nourish the skin and coat",
      price: 24.99,
      category: "Skin and Coat Supplements",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068e7c1e-80e8-7dfd-8000-db03cf6e1be5._AC_SX500_SY400_QL75_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Nutri-Vet Fish Oil Omega-3 Liquid Skin & Coat Supplement",
      description:
        "Omega-3 fatty acids help maintain the epidermal barrier of your dog’s skin",
      price: 22.87,
      category: "Skin and Coat Supplements",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/nutri-vet-fish-oil-omega-3-liquid-skin-coat-supplement-for-dogs-12fl-oz-bottle/img-267363._AC_SX500_SY400_QL75_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "HOLI Pure Icelandic Salmon Oil Skin & Coat Health ",
      description:
        "Omega-3 fish oil supports hip, joint, heart and immune health",
      price: 16.99,
      category: "Skin and Coat Supplements",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/holi-pure-icelandic-salmon-oil-skin-coat-health-dog-supplement-10fl-oz-bottle/img-521220._AC_SX500_SY400_QL75_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Native Pet Omega-3 Fish Oil & Alaskan Salmon Oil Skin & Coat Health Supplement",
      description:
        "This supplement is formulated to support skin, coat, and joint health for your pup.",
      price: 16.99,
      category: "Skin and Coat Supplements",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/native-pet-omega-3-fish-oil-alaskan-salmon-oil-skin-coat-health-supplement-for-dogs-8fl-oz-bottle/img-667702._SX500_SY400_QL75_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Nutramax Cosequin Joint Health Supplement with Glucosamine, Chondroitin & MSM Chewable Tablets",
      description:
        "Contains Glucosamine for Dogs - Cosequin contains glucosamine hydrochloride (FCHG49®) and sodium chondroitin sulfate (TRH122®), plus methylsulfonylmethane (MSM). This unique combination of ingredients supports healthy joints",
      price: 59.99,
      category: "Hip and Joint Supplement",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/nutramax-cosequin-joint-health-supplement-with-glucosamine-chondroitin-msm-chewable-tablets-for-dogs-250-count/img-402924._AC_SX500_SY400_QL75_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Nutramax Dasuquin Hip & Joint Soft Chews Joint Supplement for Small & Medium Dogs",
      description:
        "Vet Recommended Joint Health Supplement for Dogs - More veterinarians recommend Dasuquin than any other brand, making it the #1 veterinarian recommended joint health supplement brand",
      price: 49.99,
      category: "Hip and Joint Supplement",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/nutramax-dasuquin-hip-joint-soft-chews-joint-supplement-for-small-medium-dogs-84-count/img-121624._AC_SX500_SY400_QL75_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Nutramax Dasuquin Hip & Joint Soft Chews Joint Supplement for Large Dogs,",
      description:
        "Better Together with ASU - Dasuquin goes beyond standard glucosamine supplements with avocado/soybean unsaponifiables (ASU), a unique ingredient that works synergistically with glucosamine and chondroitin to help support healthy joints and cartilage",
      price: 83.99,
      category: "Hip and Joint Supplement",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/nutramax-dasuquin-hip-joint-soft-chews-joint-supplement-for-large-dogs-150-count/img-267062._AC_SX500_SY400_QL75_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Purina Pro Plan Veterinary Diets Joint Supplement for Dogs, Hip & Joint Soft Chews for Small Dogs",
      description:
        "Hip and joint supplement supports mobility and healthy cartilage and joints",
      price: 12.99,
      category: "Hip and Joint Supplement",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0678000d-1262-7e9d-8000-ece0ab7af7ef._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Purina Pro Plan Veterinary Diets Joint Supplement for Dogs, Hip & Joint Soft Chews for Large Dogs",
      description:
        "Supports mobility and daily activities like walking and climbing",
      price: 19.99,
      category: "Hip and Joint Supplement",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0677ffe1-1f94-722e-8000-1655a6f9240f._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Purina Pro Plan Veterinary Diets FortiFlora Powder Probiotic Digestive Supplement",
      description:
        "Provides gentle support for the dietary management of diarrhea in puppies and adult dogs",
      price: 30.99,
      category: "Digestive Supplement",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/purina-pro-plan-veterinary-diets-fortiflora-powder-probiotic-digestive-supplement-for-dogs-30-count/img-706676._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Nutramax Proviable Probiotics Daily Digestive Health Chewable Tablet Supplement",
      description:
        "Clinically Researched - Backed by multiple published studies, Proviable multi-strain probiotic for dogs contains beneficial bacteria to help support gut health",
      price: 39.99,
      category: "Digestive Supplement",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/nutramax-proviable-probiotics-daily-digestive-health-chewable-tablet-supplement-for-dogs-60-count/img-626693._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Royal Canin Digestive Support Soft Chews Supplement",
      description:
        "Royal Canin Chewable Digestive Supplements are made with prebiotic fibers to promote a balanced gut microbiome for adult dogs of all sizes",
      price: 17.99,
      category: "Digestive Supplement",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068402dd-1a2d-7dee-8000-eb6a87e95739._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Greenies Digestive Health Chicken Flavored Soft Chew Digestive Supplement",
      description:
        "Millions of live and active probiotics suitable for daily use help support the digestive system and promote optimal stool quality",
      price: 16.87,
      category: "Digestive Supplement",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0691c85f-5e93-7a68-8000-6b6529acd9fb._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Capstar Flea Oral Treatment for Dogs, 2-25 lbs",
      description:
        "Active ingredient Nitenpyram starts working quickly and kills adult fleas",
      price: 42.96,
      category: "Flea and Tick",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06851c60-6de4-7112-8000-5ffe6e54b7c6._SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Capstar Flea Oral Treatment for Dogs, over 25 lbs",
      description:
        "Kills adult fleas and is indicated for the treatment of flea infestations on dogs, weighing 25.1-125 pounds and 4 weeks of age and older",
      price: 43.19,
      category: "Flea and Tick",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/06851c60-3ca9-7294-8000-efe6e3011793._SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Veterinary Formula Clinical Care Flea & Tick Medicated Shampoo",
      description:
        "Formulated with Pyrethrum, a natural insecticide derived from flowers, to help kill and control fleas and ticks on contact",
      price: 6.97,
      category: "Flea and Tick",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/veterinary-formula-clinical-care-flea-tick-medicated-shampoo-16fl-oz-bottle/img-458744._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Advantage Flea & Tick Treatment Shampoo for Dogs & Puppies",
      description:
        "Scientifically-formulated shampoo effectively kills fleas and ticks on contact to help prevent flea dermatitis, Lyme disease and more",
      price: 14.99,
      category: "Flea and Tick",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/advantage-flea-tick-treatment-shampoo-for-dogs-puppies-8fl-oz-bottle/img-460241._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "Purina Pro Plan Veterinary Diets Calming Care Liver Flavored Powder Calming Supplement",
      description:
        "Calming dog stress relief supplement promotes a positive emotional state and supports dogs with anxious behaviors—like excessive vocalization, jumping, pacing, and spinning",
      price: 33.99,
      category: "Anxiety & Calming",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068ae0a5-9c08-7c81-8000-8b65cf545639._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    createProduct({
      name: "VetriScience Composure Bacon Flavored Chews Calming Supplement",
      description:
        "The chews are designed to help your best friend manage everyday stress and situational anxiety without feeling groggy or tired",
      price: 33.0,
      category: "Anxiety & Calming",
      pet_type: "dog",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/0686d6be-e98b-7d83-8000-f9e1694fdfdd._AC_SL1200_QL100_V1_.jpg",
      quantity: 1,
    }),

    // Cat

    createProduct({
      name: "Nutramax Welactin Omega-3 Fish Oil Liquid Skin & Coat Supplement",
      description:
        "Supports Skin and Coat Health - The omega 3s in Welactin fish oil help support skin and coat health, plus overall wellness. It is recommended for cats of all sizes and life stages",
      price: 15.99,
      category: "Skin and Coat Supplement ",
      pet_type: "cat",
      image_url:
        "https://image.chewy.com/catalog/general/images/moe/068c8309-7ca0-7b82-8000-b71484ce06ae._AC_SL1200_QL100_V1_.jpg",
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

  // ======== FORUM SEED ========

  // imports at top of seed.js:
  // import { createForumPost } from "./queries/forum_posts.js";
  // import { addReplyToPost } from "./queries/forum_replies.js";

  // ---- Create forum posts ----
  const [post1, post2, post3] = await Promise.all([
    createForumPost({
      user_id: shikha.id,
      title: "Best food for senior dogs?",
      category: "Dog",
      body: "My dog is 10 years old. What food brands or ingredients do you recommend for senior dogs?",
    }),

    createForumPost({
      user_id: alyssa.id,
      title: "Cat not drinking enough water",
      category: "Cat",
      body: "My cat avoids the water bowl. How can I increase water intake?",
    }),

    createForumPost({
      user_id: teranae.id,
      title: "Tips for training a new puppy",
      category: "Training",
      body: "We just brought home an 8-week-old puppy. Any advice for potty training and basic commands?",
    }),
  ]);

  // ---- Create forum replies ----
  await Promise.all([
    addReplyToPost({
      post_id: post1.id,
      user_id: alyssa.id,
      body: "We switched to a senior formula with joint supplements and noticed a big improvement.",
    }),

    addReplyToPost({
      post_id: post1.id,
      user_id: katelyn.id,
      body: "Our vet recommended food with glucosamine and lower calories to help with joints and weight.",
    }),

    addReplyToPost({
      post_id: post2.id,
      user_id: shikha.id,
      body: "A water fountain worked immediately for us — cats love moving water!",
    }),

    addReplyToPost({
      post_id: post2.id,
      user_id: katelyn.id,
      body: "Adding wet food and multiple water bowls around the house helped a lot.",
    }),

    addReplyToPost({
      post_id: post3.id,
      user_id: shikha.id,
      body: "Consistency is key. Take them out often and reward immediately when they go outside.",
    }),

    addReplyToPost({
      post_id: post3.id,
      user_id: alyssa.id,
      body: "Start with basic commands like sit and stay, and keep training sessions short and positive.",
    }),
  ]);
}

const products = await Promise.all([
  createProduct({
    name: "Blue Buffalo Stix",
    description:
      "Pepperoni-Style Lamb Recipe Dog Treats Made with Natural Ingredients, 5 oz.",
    price: 6,
    category: "treats",
    pet_type: "dog",
    image_url:
      "https://assets.petco.com/petco/image/upload/c_pad,dpr_1.0,f_auto,q_auto,h_636,w_636/c_pad,h_636,w_636/3334487-center-1",
    quantity: 1,
  }),
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
    description: "Health Bars Baked with Apples & Yogurt Dog Treats, 1-lb bag",
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
    description: "Pumpkin Biscuits Grain-Free & Gluten-Free Dog Treats, 5 oz.",
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
      "https://image.chewy.com/catalog/general/images/moe/068b89a2-58ff-7f5a-8000-2017bcd60047._AC_SL248_V1_.jpgs",
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
    description: "Double treat Bone Peanut Butter Flavor Dog Treats, 8 count.",
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
    description: "MixUps Catnip Fever Flavor Soft & Crunchy Cat Treats, 30 oz.",
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
    description: "Yam Good Salmon & Sweet Potatos Chrunchy Cat Treats, 2.5 oz.",
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
    description: "Cat Pillows Bangin Beef Flavored Chruchy Cat Treats, 6.3 oz.",
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
]);

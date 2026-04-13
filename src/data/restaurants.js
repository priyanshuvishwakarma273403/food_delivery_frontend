// ═══════════════════════════════════════════════════════════════
// TOMATO — World's Largest Food Delivery Catalog
// 100 Restaurants  ·  1000+ Menu Items  ·  30+ Cuisines
// ═══════════════════════════════════════════════════════════════

const img = (id, w = 800) => `https://images.unsplash.com/photo-${id}?w=${w}&q=80&auto=format`;

// ─── Helper: generate unique IDs ─────────────────────────────
let _menuId = 1000;
const mid = () => _menuId++;

// ─── Cuisine Images for category circles ─────────────────────
export const CUISINE_CATEGORIES = [
  { name: 'Pizza', icon: '🍕', image: img('1565299624946-b28f40a0ae38') },
  { name: 'Biryani', icon: '🍲', image: img('1563379091339-03b21ab4a4f8') },
  { name: 'Burger', icon: '🍔', image: img('1568901346375-23c9450c58cd') },
  { name: 'Chicken', icon: '🍗', image: img('1598515214211-89a3d5a43f0c') },
  { name: 'Chinese', icon: '🍜', image: img('1563245372-f21724e3856d') },
  { name: 'Desserts', icon: '🍰', image: img('1551024601-bec78aea704b') },
  { name: 'South Indian', icon: '🥘', image: img('1589302168068-964664d93dc0') },
  { name: 'North Indian', icon: '🍛', image: img('1585937421612-70a008356fbe') },
  { name: 'Rolls & Wraps', icon: '🌯', image: img('1626700051175-6818013e1d4f') },
  { name: 'Sushi', icon: '🍣', image: img('1579871494447-9811cf80d66c') },
  { name: 'Thali', icon: '🍱', image: img('1546833999-b9f581b2f4d0') },
  { name: 'Ice Cream', icon: '🍦', image: img('1501443762994-82bd5dace89a') },
  { name: 'Cakes', icon: '🎂', image: img('1578985545062-69928b1d9587') },
  { name: 'Healthy', icon: '🥗', image: img('1546069901-ba9599a7e63c') },
  { name: 'Momos', icon: '🥟', image: img('1496116218417-1a781b1c416c') },
  { name: 'Pasta', icon: '🍝', image: img('1551183053-bf91a1d81141') },
  { name: 'Kebabs', icon: '🥙', image: img('1599487488170-d11ec9c172f0') },
  { name: 'Street Food', icon: '🌮', image: img('1601050690597-df0568f70950') },
  { name: 'Dosa', icon: '🫓', image: img('1630383249896-424e482df921') },
  { name: 'Korean', icon: '🍚', image: img('1498654896616-c77836568761') },
  { name: 'Thai', icon: '🍲', image: img('1562565652-2e2c42aa1a42') },
  { name: 'Mexican', icon: '🌮', image: img('1551504734-5ee1c4a1479b') },
  { name: 'Coffee', icon: '☕', image: img('1509042239860-f550ce710b93') },
  { name: 'Juices', icon: '🧃', image: img('1622597467836-f3285f2131b8') },
  { name: 'Seafood', icon: '🦐', image: img('1565557623262-b51c2513a641') },
  { name: 'BBQ', icon: '🥩', image: img('1529193591184-b1d58069ecdd') },
  { name: 'Tandoori', icon: '🔥', image: img('1599487488170-d11ec9c172f0') },
  { name: 'Continental', icon: '🍽️', image: img('1414235077428-338989a2e8c0') },
  { name: 'Paan', icon: '🌿', image: img('1571091718767-18b5b1457add') },
  { name: 'Shake', icon: '🥤', image: img('1572490122747-3968b75cc699') },
];

// ─── MEGA RESTAURANT DATABASE ────────────────────────────────
export const ALL_RESTAURANTS = [
  // ───── 1-10: Burger Joints ─────
  {
    id: 1, name: 'The Burger King', image: img('1571091718767-18b5b1457add'),
    cuisine: 'Burgers, American, Fast Food', rating: 4.5, deliveryTime: 25, minOrder: 150, isOpen: true,
    offer: '50% OFF up to ₹100', address: 'Sector 62, Noida', totalRatings: 5200, costForTwo: 400,
    isVeg: false, isPureVeg: false, tags: ['Burger', 'American'],
    menu: [
      { category: 'Recommended', items: [
        { id: mid(), name: 'Whopper Burger', price: 199, description: 'Flame grilled beef patty with fresh lettuce, tomatoes, and mayo.', isVeg: false, isRecommended: true, image: img('1568901346375-23c9450c58cd', 400) },
        { id: mid(), name: 'Crispy Veg Burger', price: 129, description: 'Classic crispy potato patty burger with a touch of mint mayo.', isVeg: true, isRecommended: true, image: img('1550547660-d9450f859349', 400) },
        { id: mid(), name: 'BBQ Chicken Burger', price: 179, description: 'Smoky BBQ grilled chicken with crunchy slaw.', isVeg: false, isRecommended: true, image: img('1553979459-d2229ba7d751', 400) },
      ]},
      { category: 'Beef Burgers', items: [
        { id: mid(), name: 'Double Whopper', price: 299, description: 'Two juicy flame grilled beef patties for the extra hunger.', isVeg: false, image: img('1594212699903-ec8a3eca50f5', 400) },
        { id: mid(), name: 'Steakhouse Burger', price: 249, description: 'Premium steakhouse sauce with crispy onions and swiss cheese.', isVeg: false, image: img('1553979459-d2229ba7d751', 400) },
        { id: mid(), name: 'Classic Cheese Burger', price: 149, description: 'A timeless classic with melted cheddar and pickles.', isVeg: false, image: img('1568901346375-23c9450c58cd', 400) },
      ]},
      { category: 'Chicken Burgers', items: [
        { id: mid(), name: 'Spicy Chicken Zinger', price: 189, description: 'Extra spicy crispy chicken patty with jalapeños.', isVeg: false, image: img('1572802419224-296d0aebd77d', 400) },
        { id: mid(), name: 'Grilled Chicken Burger', price: 169, description: 'Herb marinated grilled chicken breast with garlic mayo.', isVeg: false, image: img('1550547660-d9450f859349', 400) },
      ]},
      { category: 'Sides & Fries', items: [
        { id: mid(), name: 'Large Peri Peri Fries', price: 120, description: 'Golden crispy fries tossed in hot peri peri spice.', isVeg: true, image: img('1630384066252-19e1ad95b4f6', 400) },
        { id: mid(), name: 'Cheesy Wedges', price: 140, description: 'Potato wedges topped with melted cheese sauce and herbs.', isVeg: true, image: img('1623238913973-21e45cced554', 400) },
        { id: mid(), name: 'Onion Rings', price: 99, description: 'Crispy battered onion rings with ranch dip.', isVeg: true, image: img('1639024471283-03518883512d', 400) },
      ]},
      { category: 'Beverages', items: [
        { id: mid(), name: 'Coca Cola (500ml)', price: 60, description: 'Chilled classic Coca Cola.', isVeg: true, image: img('1629203851122-3726ecdf080e', 400) },
        { id: mid(), name: 'Chocolate Milkshake', price: 149, description: 'Rich and creamy chocolate shake with whipped cream.', isVeg: true, image: img('1572490122747-3968b75cc699', 400) },
      ]}
    ]
  },
  {
    id: 2, name: 'Spice Garden', image: img('1517248135467-4c7edcad34c4'),
    cuisine: 'North Indian, Mughlai, Biryani', rating: 4.2, deliveryTime: 35, minOrder: 250, isOpen: true,
    offer: 'Free Delivery', address: 'MG Road, Gurgaon', totalRatings: 3800, costForTwo: 600,
    isVeg: false, isPureVeg: false, tags: ['Biryani', 'North Indian', 'Mughlai'],
    menu: [
      { category: 'Biryani Special', items: [
        { id: mid(), name: 'Hyderabadi Dum Biryani', price: 349, description: 'Slow cooked aromatic rice with tender chicken pieces and saffron.', isVeg: false, isRecommended: true, image: img('1563379091339-03b21ab4a4f8', 400) },
        { id: mid(), name: 'Mutton Biryani', price: 449, description: 'Rich mutton pieces layered with fragrant basmati rice.', isVeg: false, isRecommended: true, image: img('1563379091339-03b21ab4a4f8', 400) },
        { id: mid(), name: 'Veg Dum Biryani', price: 249, description: 'Mixed vegetables cooked in dum style with whole spices.', isVeg: true, image: img('1563379091339-03b21ab4a4f8', 400) },
        { id: mid(), name: 'Egg Biryani', price: 279, description: 'Boiled eggs marinated in spices with fragrant rice.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) },
      ]},
      { category: 'Curries', items: [
        { id: mid(), name: 'Butter Chicken', price: 299, description: 'Creamy tomato based curry with tender chicken pieces.', isVeg: false, isRecommended: true, image: img('1585937421612-70a008356fbe', 400) },
        { id: mid(), name: 'Dal Makhani', price: 249, description: 'Slow cooked black lentils in creamy butter gravy.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) },
        { id: mid(), name: 'Paneer Tikka Masala', price: 279, description: 'Cottage cheese cubes in rich spicy gravy.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) },
        { id: mid(), name: 'Rogan Josh', price: 399, description: 'Kashmiri style mutton curry with aromatic spices.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) },
      ]},
      { category: 'Breads', items: [
        { id: mid(), name: 'Butter Naan', price: 59, description: 'Soft tandoor baked naan brushed with butter.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Garlic Naan', price: 79, description: 'Naan topped with minced garlic and coriander.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Tandoori Roti', price: 39, description: 'Whole wheat bread baked in clay oven.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Lachha Paratha', price: 69, description: 'Layered flaky paratha baked in tandoor.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) },
      ]},
      { category: 'Rice', items: [
        { id: mid(), name: 'Jeera Rice', price: 149, description: 'Basmati rice tempered with cumin seeds.', isVeg: true, image: img('1563379091339-03b21ab4a4f8', 400) },
        { id: mid(), name: 'Steamed Rice', price: 119, description: 'Plain steamed basmati rice.', isVeg: true, image: img('1563379091339-03b21ab4a4f8', 400) },
      ]}
    ]
  },
  {
    id: 3, name: 'Sushi Zen', image: img('1579871494447-9811cf80d66c'),
    cuisine: 'Japanese, Sushi, Seafood', rating: 4.8, deliveryTime: 45, minOrder: 500, isOpen: true,
    offer: '10% OFF', address: 'Connaught Place, Delhi', totalRatings: 2100, costForTwo: 1200,
    isVeg: false, isPureVeg: false, tags: ['Sushi', 'Japanese', 'Seafood'],
    menu: [
      { category: 'Signature Sushi', items: [
        { id: mid(), name: 'Salmon Nigiri (6 pcs)', price: 599, description: 'Fresh Atlantic salmon on seasoned sushi rice.', isVeg: false, isRecommended: true, image: img('1579871494447-9811cf80d66c', 400) },
        { id: mid(), name: 'Rainbow Roll (8 pcs)', price: 699, description: 'California roll topped with assorted sashimi.', isVeg: false, isRecommended: true, image: img('1579871494447-9811cf80d66c', 400) },
        { id: mid(), name: 'Spicy Tuna Roll', price: 549, description: 'Spicy tuna with cucumber and avocado.', isVeg: false, image: img('1579871494447-9811cf80d66c', 400) },
        { id: mid(), name: 'Veg Tempura Roll', price: 449, description: 'Crispy tempura vegetables wrapped in nori.', isVeg: true, image: img('1579871494447-9811cf80d66c', 400) },
      ]},
      { category: 'Ramen', items: [
        { id: mid(), name: 'Tonkotsu Ramen', price: 449, description: 'Rich pork bone broth with chashu, egg, and noodles.', isVeg: false, image: img('1569718212165-3a8922ada9a4', 400) },
        { id: mid(), name: 'Miso Ramen', price: 399, description: 'Fermented soybean broth with vegetables and tofu.', isVeg: true, image: img('1569718212165-3a8922ada9a4', 400) },
        { id: mid(), name: 'Spicy Tantanmen', price: 479, description: 'Sichuan inspired spicy sesame ramen.', isVeg: false, image: img('1569718212165-3a8922ada9a4', 400) },
      ]},
      { category: 'Appetizers', items: [
        { id: mid(), name: 'Edamame', price: 199, description: 'Steamed soybeans with sea salt.', isVeg: true, image: img('1579871494447-9811cf80d66c', 400) },
        { id: mid(), name: 'Gyoza (6 pcs)', price: 349, description: 'Pan fried Japanese dumplings with pork filling.', isVeg: false, image: img('1496116218417-1a781b1c416c', 400) },
        { id: mid(), name: 'Tempura Prawns', price: 499, description: 'Light battered crispy prawns with dipping sauce.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) },
      ]}
    ]
  },
  {
    id: 4, name: 'Pizza Express', image: img('1513104890138-7c749659a591'),
    cuisine: 'Italian, Pizza, Pasta', rating: 4.4, deliveryTime: 20, minOrder: 300, isOpen: true,
    offer: 'Buy 1 Get 1 Free', address: 'Saket, Delhi', totalRatings: 7500, costForTwo: 500,
    isVeg: false, isPureVeg: false, tags: ['Pizza', 'Italian', 'Pasta'],
    menu: [
      { category: 'Bestseller Pizzas', items: [
        { id: mid(), name: 'Margherita Pizza', price: 249, description: 'Classic tomato sauce, mozzarella, and fresh basil.', isVeg: true, isRecommended: true, image: img('1513104890138-7c749659a591', 400) },
        { id: mid(), name: 'Pepperoni Feast', price: 399, description: 'Loaded with pepperoni slices and extra mozzarella.', isVeg: false, isRecommended: true, image: img('1565299624946-b28f40a0ae38', 400) },
        { id: mid(), name: 'BBQ Chicken Pizza', price: 449, description: 'Grilled chicken, smoky BBQ sauce, red onions.', isVeg: false, image: img('1565299624946-b28f40a0ae38', 400) },
        { id: mid(), name: 'Farm House', price: 349, description: 'Capsicum, mushrooms, onion, and corn with herbs.', isVeg: true, image: img('1513104890138-7c749659a591', 400) },
        { id: mid(), name: 'Paneer Tikka Pizza', price: 379, description: 'Indian fusion pizza with spiced paneer and peppers.', isVeg: true, image: img('1513104890138-7c749659a591', 400) },
      ]},
      { category: 'Pasta & Italian', items: [
        { id: mid(), name: 'Penne Arrabbiata', price: 279, description: 'Spicy tomato sauce with garlic and chili flakes.', isVeg: true, image: img('1551183053-bf91a1d81141', 400) },
        { id: mid(), name: 'Alfredo Pasta', price: 299, description: 'Creamy white sauce pasta with mushrooms.', isVeg: true, image: img('1551183053-bf91a1d81141', 400) },
        { id: mid(), name: 'Chicken Carbonara', price: 349, description: 'Rich egg and cheese sauce with crispy bacon.', isVeg: false, image: img('1551183053-bf91a1d81141', 400) },
      ]},
      { category: 'Garlic Breads', items: [
        { id: mid(), name: 'Classic Garlic Bread', price: 129, description: 'Toasted bread with garlic butter and herbs.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Cheese Garlic Bread', price: 179, description: 'Loaded with mozzarella and garlic butter.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) },
      ]},
      { category: 'Desserts', items: [
        { id: mid(), name: 'Tiramisu', price: 299, description: 'Classic Italian coffee-flavored dessert with mascarpone.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
        { id: mid(), name: 'Chocolate Lava Cake', price: 249, description: 'Warm chocolate cake with molten center.', isVeg: true, image: img('1578985545062-69928b1d9587', 400) },
      ]}
    ]
  },
  {
    id: 5, name: 'Healthy Hub', image: img('1546069901-ba9599a7e63c'),
    cuisine: 'Healthy, Salads, Smoothie Bowls', rating: 4.6, deliveryTime: 30, minOrder: 200, isOpen: true,
    offer: '20% OFF on first order', address: 'Hauz Khas, Delhi', totalRatings: 1800, costForTwo: 450,
    isVeg: true, isPureVeg: true, tags: ['Healthy', 'Salads'],
    menu: [
      { category: 'Power Bowls', items: [
        { id: mid(), name: 'Acai Berry Bowl', price: 349, description: 'Blended acai topped with granola, banana, and honey.', isVeg: true, isRecommended: true, image: img('1546069901-ba9599a7e63c', 400) },
        { id: mid(), name: 'Quinoa Buddha Bowl', price: 399, description: 'Quinoa, roasted veggies, avocado, and tahini dressing.', isVeg: true, isRecommended: true, image: img('1512621776951-a57141f2eefd', 400) },
        { id: mid(), name: 'Protein Power Bowl', price: 429, description: 'Brown rice, grilled tofu, edamame, and sesame glaze.', isVeg: true, image: img('1512621776951-a57141f2eefd', 400) },
      ]},
      { category: 'Fresh Salads', items: [
        { id: mid(), name: 'Caesar Salad', price: 249, description: 'Romaine lettuce with parmesan, croutons, and creamy dressing.', isVeg: true, image: img('1546069901-ba9599a7e63c', 400) },
        { id: mid(), name: 'Greek Salad', price: 279, description: 'Cucumber, tomatoes, olives, feta cheese with olive oil.', isVeg: true, image: img('1546069901-ba9599a7e63c', 400) },
        { id: mid(), name: 'Asian Sesame Salad', price: 299, description: 'Mixed greens with tofu, edamame, and ginger sesame dressing.', isVeg: true, image: img('1546069901-ba9599a7e63c', 400) },
      ]},
      { category: 'Smoothies', items: [
        { id: mid(), name: 'Green Detox Smoothie', price: 199, description: 'Spinach, banana, apple, and chia seeds.', isVeg: true, image: img('1622597467836-f3285f2131b8', 400) },
        { id: mid(), name: 'Berry Blast Smoothie', price: 229, description: 'Mixed berries, yogurt, and honey.', isVeg: true, image: img('1622597467836-f3285f2131b8', 400) },
        { id: mid(), name: 'Mango Protein Shake', price: 249, description: 'Fresh mango with protein powder and almond milk.', isVeg: true, image: img('1622597467836-f3285f2131b8', 400) },
      ]}
    ]
  },
  {
    id: 6, name: 'South Treats', image: img('1589302168068-964664d93dc0'),
    cuisine: 'South Indian, Dosa, Idli', rating: 4.1, deliveryTime: 25, minOrder: 100, isOpen: true,
    offer: '₹75 OFF above ₹299', address: 'Mylapore, Chennai', totalRatings: 4200, costForTwo: 300,
    isVeg: true, isPureVeg: true, tags: ['South Indian', 'Dosa'],
    menu: [
      { category: 'Dosa Varieties', items: [
        { id: mid(), name: 'Masala Dosa', price: 99, description: 'Crispy rice crepe filled with spiced potato filling.', isVeg: true, isRecommended: true, image: img('1630383249896-424e482df921', 400) },
        { id: mid(), name: 'Mysore Masala Dosa', price: 129, description: 'Dosa spread with spicy red chutney and potato filling.', isVeg: true, image: img('1630383249896-424e482df921', 400) },
        { id: mid(), name: 'Rava Dosa', price: 119, description: 'Crispy semolina dosa with onions and coriander.', isVeg: true, image: img('1630383249896-424e482df921', 400) },
        { id: mid(), name: 'Paper Dosa', price: 109, description: 'Extra thin and crispy dosa served with chutneys.', isVeg: true, image: img('1630383249896-424e482df921', 400) },
        { id: mid(), name: 'Cheese Dosa', price: 149, description: 'Dosa loaded with grated cheese.', isVeg: true, image: img('1630383249896-424e482df921', 400) },
        { id: mid(), name: 'Ghee Roast Dosa', price: 139, description: 'Roasted dosa with generous ghee.', isVeg: true, image: img('1630383249896-424e482df921', 400) },
      ]},
      { category: 'Idli & Vada', items: [
        { id: mid(), name: 'Idli Sambar (4 pcs)', price: 79, description: 'Soft steamed rice cakes with sambhar and chutney.', isVeg: true, image: img('1589302168068-964664d93dc0', 400) },
        { id: mid(), name: 'Medu Vada (3 pcs)', price: 89, description: 'Crispy lentil fritters with sambhar and chutney.', isVeg: true, image: img('1589302168068-964664d93dc0', 400) },
        { id: mid(), name: 'Rava Idli (4 pcs)', price: 99, description: 'Semolina idli with cashews and curry leaves.', isVeg: true, image: img('1589302168068-964664d93dc0', 400) },
      ]},
      { category: 'Uttapam', items: [
        { id: mid(), name: 'Onion Uttapam', price: 109, description: 'Thick rice pancake topped with onions.', isVeg: true, image: img('1630383249896-424e482df921', 400) },
        { id: mid(), name: 'Mixed Veg Uttapam', price: 129, description: 'Topped with mixed vegetables and green chilli.', isVeg: true, image: img('1630383249896-424e482df921', 400) },
      ]},
      { category: 'South Specials', items: [
        { id: mid(), name: 'Pongal', price: 119, description: 'Comforting rice and lentil dish tempered with pepper and ghee.', isVeg: true, image: img('1589302168068-964664d93dc0', 400) },
        { id: mid(), name: 'Upma', price: 89, description: 'Semolina porridge with vegetables and mustard tempering.', isVeg: true, image: img('1589302168068-964664d93dc0', 400) },
        { id: mid(), name: 'Filter Coffee', price: 49, description: 'Authentic South Indian filter coffee.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) },
      ]}
    ]
  },
  {
    id: 7, name: 'Sweet Dreams Bakery', image: img('1551024601-bec78aea704b'),
    cuisine: 'Desserts, Bakery, Cakes', rating: 4.5, deliveryTime: 15, minOrder: 50, isOpen: true,
    offer: '₹50 OFF above ₹199', address: 'Bandra, Mumbai', totalRatings: 9200, costForTwo: 250,
    isVeg: true, isPureVeg: true, tags: ['Desserts', 'Cakes', 'Ice Cream'],
    menu: [
      { category: 'Birthday Cakes', items: [
        { id: mid(), name: 'Chocolate Truffle Cake', price: 599, description: 'Rich dark chocolate ganache layered cake.', isVeg: true, isRecommended: true, image: img('1578985545062-69928b1d9587', 400) },
        { id: mid(), name: 'Red Velvet Cake', price: 649, description: 'Classic red velvet with cream cheese frosting.', isVeg: true, isRecommended: true, image: img('1578985545062-69928b1d9587', 400) },
        { id: mid(), name: 'Butterscotch Cake', price: 549, description: 'Butterscotch sponge with caramel drizzle.', isVeg: true, image: img('1578985545062-69928b1d9587', 400) },
        { id: mid(), name: 'Black Forest Cake', price: 499, description: 'Chocolate sponge with cherries and whipped cream.', isVeg: true, image: img('1578985545062-69928b1d9587', 400) },
        { id: mid(), name: 'Pineapple Cake', price: 449, description: 'Light and fluffy pineapple cream cake.', isVeg: true, image: img('1578985545062-69928b1d9587', 400) },
      ]},
      { category: 'Pastries & Slices', items: [
        { id: mid(), name: 'Chocolate Eclair', price: 89, description: 'Choux pastry filled with chocolate cream.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
        { id: mid(), name: 'Blueberry Cheesecake Slice', price: 179, description: 'New York style cheesecake with blueberry topping.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
        { id: mid(), name: 'Mango Mousse', price: 149, description: 'Light and airy mango flavored mousse.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
        { id: mid(), name: 'Tiramisu Cup', price: 199, description: 'Individual portion of classic Italian tiramisu.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
      ]},
      { category: 'Ice Cream', items: [
        { id: mid(), name: 'Belgian Chocolate Scoop', price: 129, description: 'Premium Belgian chocolate ice cream.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) },
        { id: mid(), name: 'Mango Sorbet', price: 99, description: 'Refreshing mango sorbet.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) },
        { id: mid(), name: 'Cookie Dough Sundae', price: 199, description: 'Vanilla ice cream with cookie dough and hot fudge.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) },
      ]},
      { category: 'Brownies & Cookies', items: [
        { id: mid(), name: 'Dark Chocolate Brownie', price: 89, description: 'Fudgy brownie with chocolate chunks.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
        { id: mid(), name: 'Walnut Brownie', price: 109, description: 'Chocolate brownie loaded with walnuts.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
        { id: mid(), name: 'Choco Chip Cookies (4 pcs)', price: 129, description: 'Freshly baked cookies with chocolate chips.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
      ]}
    ]
  },
  {
    id: 8, name: 'Curry Pot', image: img('1585937421612-70a008356fbe'),
    cuisine: 'North Indian, Mughlai, Thali', rating: 3.9, deliveryTime: 40, minOrder: 300, isOpen: true,
    offer: 'Flat ₹120 OFF', address: 'Lajpat Nagar, Delhi', totalRatings: 2900, costForTwo: 550,
    isVeg: false, isPureVeg: false, tags: ['North Indian', 'Thali'],
    menu: [
      { category: 'Thali Combos', items: [
        { id: mid(), name: 'Veg Thali', price: 249, description: 'Dal, paneer, 2 roti, rice, raita, salad and sweet.', isVeg: true, isRecommended: true, image: img('1546833999-b9f581b2f4d0', 400) },
        { id: mid(), name: 'Non-Veg Thali', price: 349, description: 'Chicken curry, dal, 2 roti, rice, raita, salad.', isVeg: false, isRecommended: true, image: img('1546833999-b9f581b2f4d0', 400) },
        { id: mid(), name: 'Royal Thali', price: 499, description: 'Premium thali with 2 curries, kebab, biryani, dessert.', isVeg: false, image: img('1546833999-b9f581b2f4d0', 400) },
      ]},
      { category: 'Curries', items: [
        { id: mid(), name: 'Palak Paneer', price: 259, description: 'Cottage cheese cubes in creamy spinach gravy.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) },
        { id: mid(), name: 'Chole Bhature', price: 179, description: 'Spiced chickpea curry with fluffy fried bread.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) },
        { id: mid(), name: 'Chicken Tikka Masala', price: 329, description: 'Grilled chicken in rich tomato-cream gravy.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) },
        { id: mid(), name: 'Egg Curry', price: 199, description: 'Boiled eggs in onion-tomato masala gravy.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) },
        { id: mid(), name: 'Kadai Paneer', price: 269, description: 'Paneer with capsicum in kadai masala.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) },
      ]},
      { category: 'Tandoor', items: [
        { id: mid(), name: 'Tandoori Chicken (Full)', price: 449, description: 'Whole chicken marinated in yogurt and spices.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) },
        { id: mid(), name: 'Paneer Tikka', price: 249, description: 'Chunky paneer pieces grilled in tandoor.', isVeg: true, image: img('1599487488170-d11ec9c172f0', 400) },
        { id: mid(), name: 'Seekh Kebab', price: 299, description: 'Minced lamb kebabs grilled on skewers.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) },
      ]}
    ]
  },
  {
    id: 9, name: 'Dragon Wok', image: img('1563245372-f21724e3856d'),
    cuisine: 'Chinese, Thai, Asian', rating: 4.3, deliveryTime: 30, minOrder: 200, isOpen: true,
    offer: '30% OFF up to ₹150', address: 'Koramangala, Bangalore', totalRatings: 5600, costForTwo: 400,
    isVeg: false, isPureVeg: false, tags: ['Chinese', 'Thai'],
    menu: [
      { category: 'Starters', items: [
        { id: mid(), name: 'Chicken 65', price: 249, description: 'Spicy deep fried chicken bites with curry leaves.', isVeg: false, isRecommended: true, image: img('1598515214211-89a3d5a43f0c', 400) },
        { id: mid(), name: 'Veg Spring Rolls (4 pcs)', price: 149, description: 'Crispy rolls stuffed with mixed vegetables.', isVeg: true, image: img('1563245372-f21724e3856d', 400) },
        { id: mid(), name: 'Chilli Paneer Dry', price: 199, description: 'Indo-Chinese style paneer with bell peppers.', isVeg: true, isRecommended: true, image: img('1563245372-f21724e3856d', 400) },
        { id: mid(), name: 'Prawn Tempura', price: 349, description: 'Light battered crispy prawns.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Crispy Corn', price: 179, description: 'Corn kernels tossed with garlic and pepper.', isVeg: true, image: img('1563245372-f21724e3856d', 400) },
      ]},
      { category: 'Noodles', items: [
        { id: mid(), name: 'Hakka Noodles', price: 199, description: 'Stir fried noodles with vegetables and soy sauce.', isVeg: true, image: img('1563245372-f21724e3856d', 400) },
        { id: mid(), name: 'Schezwan Noodles', price: 229, description: 'Spicy noodles in schezwan sauce.', isVeg: true, image: img('1563245372-f21724e3856d', 400) },
        { id: mid(), name: 'Chicken Chow Mein', price: 269, description: 'Egg noodles with chicken and vegetables.', isVeg: false, image: img('1563245372-f21724e3856d', 400) },
        { id: mid(), name: 'Pad Thai', price: 299, description: 'Thai style flat noodles with peanuts and tamarind.', isVeg: true, image: img('1562565652-2e2c42aa1a42', 400) },
      ]},
      { category: 'Fried Rice', items: [
        { id: mid(), name: 'Veg Fried Rice', price: 179, description: 'Classic wok-tossed rice with vegetables.', isVeg: true, image: img('1563379091339-03b21ab4a4f8', 400) },
        { id: mid(), name: 'Chicken Fried Rice', price: 229, description: 'Fried rice with chicken and secret soy blend.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) },
        { id: mid(), name: 'Schezwan Fried Rice', price: 209, description: 'Spicy Schezwan style fried rice.', isVeg: true, image: img('1563379091339-03b21ab4a4f8', 400) },
      ]},
      { category: 'Main Course', items: [
        { id: mid(), name: 'Manchurian Gravy', price: 219, description: 'Vegetable balls in tangy Manchurian sauce.', isVeg: true, image: img('1563245372-f21724e3856d', 400) },
        { id: mid(), name: 'Sweet & Sour Chicken', price: 289, description: 'Crispy chicken in sweet and sour sauce with pineapple.', isVeg: false, image: img('1563245372-f21724e3856d', 400) },
        { id: mid(), name: 'Thai Green Curry', price: 349, description: 'Coconut milk curry with Thai basil and vegetables.', isVeg: true, image: img('1562565652-2e2c42aa1a42', 400) },
      ]}
    ]
  },
  {
    id: 10, name: 'Momo Junction', image: img('1496116218417-1a781b1c416c'),
    cuisine: 'Momos, Tibetan, Chinese', rating: 4.4, deliveryTime: 20, minOrder: 100, isOpen: true,
    offer: 'Flat ₹50 OFF', address: 'Majnu Ka Tilla, Delhi', totalRatings: 8800, costForTwo: 200,
    isVeg: false, isPureVeg: false, tags: ['Momos'],
    menu: [
      { category: 'Steamed Momos', items: [
        { id: mid(), name: 'Veg Steamed Momos (8 pcs)', price: 99, description: 'Classic steamed vegetable dumplings with spicy chutney.', isVeg: true, isRecommended: true, image: img('1496116218417-1a781b1c416c', 400) },
        { id: mid(), name: 'Chicken Steamed Momos (8 pcs)', price: 129, description: 'Minced chicken dumplings steamed to perfection.', isVeg: false, isRecommended: true, image: img('1496116218417-1a781b1c416c', 400) },
        { id: mid(), name: 'Paneer Steamed Momos (8 pcs)', price: 119, description: 'Stuffed with spiced paneer and herbs.', isVeg: true, image: img('1496116218417-1a781b1c416c', 400) },
      ]},
      { category: 'Fried Momos', items: [
        { id: mid(), name: 'Veg Fried Momos (8 pcs)', price: 119, description: 'Crispy fried vegetable momos.', isVeg: true, image: img('1496116218417-1a781b1c416c', 400) },
        { id: mid(), name: 'Chicken Fried Momos (8 pcs)', price: 149, description: 'Golden fried chicken momos.', isVeg: false, image: img('1496116218417-1a781b1c416c', 400) },
      ]},
      { category: 'Tandoori Momos', items: [
        { id: mid(), name: 'Tandoori Veg Momos (6 pcs)', price: 149, description: 'Momos roasted in tandoor with spicy marinade.', isVeg: true, image: img('1496116218417-1a781b1c416c', 400) },
        { id: mid(), name: 'Tandoori Chicken Momos (6 pcs)', price: 179, description: 'Tandoor grilled chicken momos with smoky flavor.', isVeg: false, image: img('1496116218417-1a781b1c416c', 400) },
      ]},
      { category: 'Gravy Momos', items: [
        { id: mid(), name: 'Veg Momos in Gravy', price: 139, description: 'Steamed momos drenched in spicy tomato gravy.', isVeg: true, image: img('1496116218417-1a781b1c416c', 400) },
        { id: mid(), name: 'Chicken Momos in Gravy', price: 169, description: 'Chicken momos in rich spicy gravy.', isVeg: false, image: img('1496116218417-1a781b1c416c', 400) },
      ]},
      { category: 'Soupy Momos', items: [
        { id: mid(), name: 'Veg Soup Momos', price: 129, description: 'Momos served with hot spicy soup.', isVeg: true, image: img('1496116218417-1a781b1c416c', 400) },
        { id: mid(), name: 'Chicken Soup Momos', price: 159, description: 'Chicken momos in aromatic soup.', isVeg: false, image: img('1496116218417-1a781b1c416c', 400) },
      ]}
    ]
  },
  // ───── 11-20 ─────
  {
    id: 11, name: 'Kebab Factory', image: img('1599487488170-d11ec9c172f0'),
    cuisine: 'Kebabs, Tandoori, Mughlai', rating: 4.6, deliveryTime: 35, minOrder: 350, isOpen: true,
    offer: '20% OFF', address: 'Charminar, Hyderabad', totalRatings: 4100, costForTwo: 700,
    isVeg: false, tags: ['Kebabs', 'Tandoori'],
    menu: [
      { category: 'Signature Kebabs', items: [
        { id: mid(), name: 'Galouti Kebab (6 pcs)', price: 399, description: 'Melt-in-mouth Lucknowi mince kebabs.', isVeg: false, isRecommended: true, image: img('1599487488170-d11ec9c172f0', 400) },
        { id: mid(), name: 'Chicken Malai Tikka', price: 349, description: 'Cream marinated chicken grilled in tandoor.', isVeg: false, isRecommended: true, image: img('1599487488170-d11ec9c172f0', 400) },
        { id: mid(), name: 'Mutton Seekh Kebab', price: 449, description: 'Spiced minced lamb on skewers.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) },
        { id: mid(), name: 'Fish Tikka', price: 379, description: 'Boneless fish marinated in spices and grilled.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) },
        { id: mid(), name: 'Paneer Reshmi Kebab', price: 299, description: 'Soft paneer marinated in cream and cashew paste.', isVeg: true, image: img('1599487488170-d11ec9c172f0', 400) },
        { id: mid(), name: 'Hara Bhara Kebab', price: 199, description: 'Spinach, peas and potato cakes.', isVeg: true, image: img('1599487488170-d11ec9c172f0', 400) },
      ]},
      { category: 'Platters', items: [
        { id: mid(), name: 'Non-Veg Kebab Platter', price: 799, description: 'Assorted kebabs with mint chutney and naan.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) },
        { id: mid(), name: 'Veg Kebab Platter', price: 549, description: 'Assorted veg kebabs with chutneys.', isVeg: true, image: img('1599487488170-d11ec9c172f0', 400) },
      ]}
    ]
  },
  {
    id: 12, name: 'Taco Bell Express', image: img('1551504734-5ee1c4a1479b'),
    cuisine: 'Mexican, Tacos, Burritos', rating: 4.0, deliveryTime: 25, minOrder: 200, isOpen: true,
    offer: 'Buy 2 Get 1', address: 'Andheri, Mumbai', totalRatings: 3500, costForTwo: 400,
    isVeg: false, tags: ['Mexican'],
    menu: [
      { category: 'Tacos', items: [
        { id: mid(), name: 'Crunchy Chicken Taco', price: 149, description: 'Crispy shell with seasoned chicken and salsa.', isVeg: false, isRecommended: true, image: img('1551504734-5ee1c4a1479b', 400) },
        { id: mid(), name: 'Bean & Cheese Taco', price: 119, description: 'Refried beans with melted cheese.', isVeg: true, image: img('1551504734-5ee1c4a1479b', 400) },
        { id: mid(), name: 'Fish Taco', price: 179, description: 'Grilled fish with mango salsa and slaw.', isVeg: false, image: img('1551504734-5ee1c4a1479b', 400) },
      ]},
      { category: 'Burritos', items: [
        { id: mid(), name: 'Chicken Burrito Supreme', price: 249, description: 'Loaded burrito with rice, beans, chicken, and guac.', isVeg: false, image: img('1626700051175-6818013e1d4f', 400) },
        { id: mid(), name: 'Veg Burrito Bowl', price: 199, description: 'Bowl with rice, beans, corn, salsa, and sour cream.', isVeg: true, image: img('1626700051175-6818013e1d4f', 400) },
        { id: mid(), name: 'Paneer Burrito', price: 219, description: 'Indian fusion with spiced paneer and veggies.', isVeg: true, image: img('1626700051175-6818013e1d4f', 400) },
      ]},
      { category: 'Nachos', items: [
        { id: mid(), name: 'Loaded Nachos', price: 199, description: 'Tortilla chips with cheese, beans, and jalapeños.', isVeg: true, image: img('1551504734-5ee1c4a1479b', 400) },
        { id: mid(), name: 'Chicken Nachos', price: 249, description: 'Crispy nachos with seasoned chicken and salsa.', isVeg: false, image: img('1551504734-5ee1c4a1479b', 400) },
      ]},
      { category: 'Quesadillas', items: [
        { id: mid(), name: 'Cheese Quesadilla', price: 179, description: 'Grilled tortilla with melted cheese blend.', isVeg: true, image: img('1551504734-5ee1c4a1479b', 400) },
        { id: mid(), name: 'Chicken Quesadilla', price: 229, description: 'Stuffed with grilled chicken and cheese.', isVeg: false, image: img('1551504734-5ee1c4a1479b', 400) },
      ]}
    ]
  },
  {
    id: 13, name: 'Chai & Snacks Co.', image: img('1509042239860-f550ce710b93'),
    cuisine: 'Beverages, Snacks, Street Food', rating: 4.3, deliveryTime: 15, minOrder: 50, isOpen: true,
    offer: 'Free Chai on ₹199+', address: 'Chandni Chowk, Delhi', totalRatings: 12500, costForTwo: 150,
    isVeg: true, isPureVeg: true, tags: ['Coffee', 'Street Food'],
    menu: [
      { category: 'Hot Beverages', items: [
        { id: mid(), name: 'Masala Chai', price: 29, description: 'Traditional spiced tea with cardamom and ginger.', isVeg: true, isRecommended: true, image: img('1509042239860-f550ce710b93', 400) },
        { id: mid(), name: 'Kulhad Chai', price: 39, description: 'Chai served in traditional clay cup.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) },
        { id: mid(), name: 'Filter Coffee', price: 49, description: 'Strong South Indian filter coffee.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) },
        { id: mid(), name: 'Hot Chocolate', price: 99, description: 'Rich Belgian hot chocolate.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) },
      ]},
      { category: 'Street Snacks', items: [
        { id: mid(), name: 'Samosa (2 pcs)', price: 40, description: 'Crispy pastry filled with spiced potatoes and peas.', isVeg: true, isRecommended: true, image: img('1601050690597-df0568f70950', 400) },
        { id: mid(), name: 'Kachori (2 pcs)', price: 50, description: 'Deep fried flaky bread with dal filling.', isVeg: true, image: img('1601050690597-df0568f70950', 400) },
        { id: mid(), name: 'Aloo Tikki Chaat', price: 79, description: 'Potato patties with chutneys, yogurt, and spices.', isVeg: true, image: img('1601050690597-df0568f70950', 400) },
        { id: mid(), name: 'Pani Puri (6 pcs)', price: 49, description: 'Crispy puris filled with spicy tangy water.', isVeg: true, image: img('1601050690597-df0568f70950', 400) },
        { id: mid(), name: 'Dahi Bhalla', price: 69, description: 'Soft lentil fritters in yogurt with chutneys.', isVeg: true, image: img('1601050690597-df0568f70950', 400) },
        { id: mid(), name: 'Bread Pakora', price: 35, description: 'Potato stuffed bread fritters.', isVeg: true, image: img('1601050690597-df0568f70950', 400) },
      ]},
      { category: 'Cold Drinks', items: [
        { id: mid(), name: 'Mango Lassi', price: 79, description: 'Creamy yogurt drink with Alfonso mango.', isVeg: true, image: img('1622597467836-f3285f2131b8', 400) },
        { id: mid(), name: 'Sweet Lassi', price: 59, description: 'Traditional sweet yogurt drink.', isVeg: true, image: img('1622597467836-f3285f2131b8', 400) },
        { id: mid(), name: 'Cold Coffee', price: 89, description: 'Iced coffee with vanilla ice cream.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) },
      ]}
    ]
  },
  {
    id: 14, name: 'Korean Kitchen', image: img('1498654896616-c77836568761'),
    cuisine: 'Korean, BBQ, Asian', rating: 4.7, deliveryTime: 40, minOrder: 400, isOpen: true,
    offer: '15% OFF', address: 'Hauz Khas, Delhi', totalRatings: 1200, costForTwo: 900,
    isVeg: false, tags: ['Korean', 'BBQ'],
    menu: [
      { category: 'Korean Favorites', items: [
        { id: mid(), name: 'Bibimbap', price: 399, description: 'Rice bowl with mixed vegetables, egg, and gochujang.', isVeg: false, isRecommended: true, image: img('1498654896616-c77836568761', 400) },
        { id: mid(), name: 'Kimchi Fried Rice', price: 349, description: 'Fried rice with fermented kimchi and fried egg.', isVeg: false, image: img('1498654896616-c77836568761', 400) },
        { id: mid(), name: 'Tteokbokki', price: 279, description: 'Spicy Korean rice cakes in gochujang sauce.', isVeg: true, image: img('1498654896616-c77836568761', 400) },
        { id: mid(), name: 'Japchae', price: 329, description: 'Sweet potato glass noodles with vegetables.', isVeg: true, image: img('1498654896616-c77836568761', 400) },
      ]},
      { category: 'Korean Fried Chicken', items: [
        { id: mid(), name: 'Yangnyeom Chicken', price: 449, description: 'Sweet and spicy glazed fried chicken.', isVeg: false, isRecommended: true, image: img('1598515214211-89a3d5a43f0c', 400) },
        { id: mid(), name: 'Soy Garlic Chicken', price: 449, description: 'Crispy chicken in soy garlic glaze.', isVeg: false, image: img('1598515214211-89a3d5a43f0c', 400) },
      ]},
      { category: 'BBQ', items: [
        { id: mid(), name: 'Bulgogi', price: 549, description: 'Marinated grilled beef slices.', isVeg: false, image: img('1529193591184-b1d58069ecdd', 400) },
        { id: mid(), name: 'Galbi', price: 699, description: 'Korean short ribs marinated and grilled.', isVeg: false, image: img('1529193591184-b1d58069ecdd', 400) },
      ]}
    ]
  },
  {
    id: 15, name: 'Roll Express', image: img('1626700051175-6818013e1d4f'),
    cuisine: 'Rolls, Wraps, Fast Food', rating: 4.1, deliveryTime: 15, minOrder: 100, isOpen: true,
    offer: '₹40 OFF above ₹199', address: 'Park Street, Kolkata', totalRatings: 6700, costForTwo: 200,
    isVeg: false, tags: ['Rolls & Wraps'],
    menu: [
      { category: 'Classic Rolls', items: [
        { id: mid(), name: 'Chicken Kathi Roll', price: 129, description: 'Flaky paratha with grilled chicken tikka.', isVeg: false, isRecommended: true, image: img('1626700051175-6818013e1d4f', 400) },
        { id: mid(), name: 'Egg Roll', price: 79, description: 'Egg wrapped paratha with onions and chutney.', isVeg: false, isRecommended: true, image: img('1626700051175-6818013e1d4f', 400) },
        { id: mid(), name: 'Paneer Tikka Roll', price: 109, description: 'Grilled paneer with mint chutney in paratha.', isVeg: true, image: img('1626700051175-6818013e1d4f', 400) },
        { id: mid(), name: 'Double Chicken Roll', price: 169, description: 'Extra chicken loaded roll with special sauce.', isVeg: false, image: img('1626700051175-6818013e1d4f', 400) },
        { id: mid(), name: 'Mutton Seekh Roll', price: 159, description: 'Seekh kebab wrapped in buttery paratha.', isVeg: false, image: img('1626700051175-6818013e1d4f', 400) },
      ]},
      { category: 'Premium Wraps', items: [
        { id: mid(), name: 'Chicken Shawarma', price: 149, description: 'Middle Eastern style chicken wrap with garlic sauce.', isVeg: false, image: img('1626700051175-6818013e1d4f', 400) },
        { id: mid(), name: 'Falafel Wrap', price: 129, description: 'Crispy falafel with hummus and salad.', isVeg: true, image: img('1626700051175-6818013e1d4f', 400) },
        { id: mid(), name: 'Tandoori Chicken Wrap', price: 159, description: 'Tandoori chicken with onions in tortilla.', isVeg: false, image: img('1626700051175-6818013e1d4f', 400) },
      ]}
    ]
  },
  {
    id: 16, name: 'Seafood Harbor', image: img('1565557623262-b51c2513a641'),
    cuisine: 'Seafood, Coastal, Fish Fry', rating: 4.5, deliveryTime: 40, minOrder: 400, isOpen: true,
    offer: 'Free Delivery', address: 'Fort Kochi, Kerala', totalRatings: 2300, costForTwo: 800,
    isVeg: false, tags: ['Seafood'],
    menu: [
      { category: 'Fish', items: [
        { id: mid(), name: 'Kerala Fish Curry', price: 349, description: 'Tangy fish curry with coconut and curry leaves.', isVeg: false, isRecommended: true, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Fish Fry (2 pcs)', price: 299, description: 'Crispy masala fried fish pieces.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Grilled Fish Steak', price: 449, description: 'Herb marinated fish grilled to perfection.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Fish & Chips', price: 349, description: 'Battered fish fillets with crispy fries.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) },
      ]},
      { category: 'Prawns', items: [
        { id: mid(), name: 'Butter Garlic Prawns', price: 449, description: 'Jumbo prawns sautéed in garlic butter.', isVeg: false, isRecommended: true, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Prawn Masala', price: 399, description: 'Prawns in rich onion-tomato masala.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Tandoori Prawns', price: 499, description: 'Large prawns marinated and grilled in tandoor.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) },
      ]},
      { category: 'Crab', items: [
        { id: mid(), name: 'Crab Masala', price: 549, description: 'Whole crab cooked in spicy masala.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Pepper Crab', price: 599, description: 'Black pepper flavored crab.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) },
      ]}
    ]
  },
  {
    id: 17, name: 'Continental Club', image: img('1414235077428-338989a2e8c0'),
    cuisine: 'Continental, Steak, Grills', rating: 4.4, deliveryTime: 45, minOrder: 500, isOpen: true,
    offer: '₹200 OFF above ₹999', address: 'Jubilee Hills, Hyderabad', totalRatings: 1500, costForTwo: 1500,
    isVeg: false, tags: ['Continental'],
    menu: [
      { category: 'Steaks', items: [
        { id: mid(), name: 'Grilled Chicken Steak', price: 499, description: 'Herb marinated chicken breast with mashed potatoes.', isVeg: false, isRecommended: true, image: img('1414235077428-338989a2e8c0', 400) },
        { id: mid(), name: 'Lamb Chops', price: 799, description: 'Rosemary marinated lamb chops with vegetables.', isVeg: false, image: img('1529193591184-b1d58069ecdd', 400) },
        { id: mid(), name: 'BBQ Pork Ribs', price: 899, description: 'Slow cooked ribs with smoky BBQ glaze.', isVeg: false, image: img('1529193591184-b1d58069ecdd', 400) },
      ]},
      { category: 'Soups & Salads', items: [
        { id: mid(), name: 'Cream of Mushroom Soup', price: 179, description: 'Rich and creamy mushroom soup.', isVeg: true, image: img('1414235077428-338989a2e8c0', 400) },
        { id: mid(), name: 'Minestrone Soup', price: 159, description: 'Italian vegetable soup with pasta.', isVeg: true, image: img('1414235077428-338989a2e8c0', 400) },
        { id: mid(), name: 'Grilled Chicken Caesar', price: 349, description: 'Caesar salad with grilled chicken breast.', isVeg: false, image: img('1546069901-ba9599a7e63c', 400) },
      ]},
      { category: 'Mains', items: [
        { id: mid(), name: 'Chicken Cordon Bleu', price: 549, description: 'Stuffed chicken breast with ham and cheese.', isVeg: false, image: img('1414235077428-338989a2e8c0', 400) },
        { id: mid(), name: 'Grilled Fish Platter', price: 649, description: 'Assorted grilled fish with lemon butter sauce.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Mushroom Risotto', price: 399, description: 'Creamy Italian rice with wild mushrooms.', isVeg: true, image: img('1414235077428-338989a2e8c0', 400) },
      ]}
    ]
  },
  {
    id: 18, name: 'Biryani Blues', image: img('1563379091339-03b21ab4a4f8'),
    cuisine: 'Biryani, Mughlai, North Indian', rating: 4.6, deliveryTime: 35, minOrder: 250, isOpen: true,
    offer: '₹75 OFF above ₹399', address: 'Tolichowki, Hyderabad', totalRatings: 11000, costForTwo: 500,
    isVeg: false, tags: ['Biryani', 'Mughlai'],
    menu: [
      { category: 'Biryani Collection', items: [
        { id: mid(), name: 'Special Hyderabadi Biryani', price: 399, description: 'Our signature dum biryani with saffron and mint.', isVeg: false, isRecommended: true, image: img('1563379091339-03b21ab4a4f8', 400) },
        { id: mid(), name: 'Chicken 65 Biryani', price: 369, description: 'Biryani served with crispy chicken 65 on top.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) },
        { id: mid(), name: 'Keema Biryani', price: 379, description: 'Minced meat biryani with aromatic spices.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) },
        { id: mid(), name: 'Prawns Biryani', price: 449, description: 'Coastal style biryani with fresh prawns.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) },
        { id: mid(), name: 'Paneer Biryani', price: 299, description: 'Rich paneer dum biryani.', isVeg: true, image: img('1563379091339-03b21ab4a4f8', 400) },
        { id: mid(), name: 'Mushroom Biryani', price: 279, description: 'Fresh mushrooms with fragrant rice.', isVeg: true, image: img('1563379091339-03b21ab4a4f8', 400) },
      ]},
      { category: 'Kebabs & Starters', items: [
        { id: mid(), name: 'Chicken 65', price: 249, description: 'Spicy deep fried chicken bites.', isVeg: false, image: img('1598515214211-89a3d5a43f0c', 400) },
        { id: mid(), name: 'Mutton Boti Kebab', price: 349, description: 'Chunky mutton pieces grilled in tandoor.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) },
        { id: mid(), name: 'Paneer 65', price: 219, description: 'Crispy fried paneer in spicy coating.', isVeg: true, image: img('1599487488170-d11ec9c172f0', 400) },
      ]},
      { category: 'Breads & Sides', items: [
        { id: mid(), name: 'Butter Naan', price: 49, description: 'Soft buttery naan bread.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Raita', price: 39, description: 'Cool yogurt with cucumber and mint.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Gulab Jamun (2 pcs)', price: 59, description: 'Sweet milk dumplings in sugar syrup.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
      ]}
    ]
  },
  {
    id: 19, name: 'Shake Shack', image: img('1572490122747-3968b75cc699'),
    cuisine: 'Shakes, Beverages, Desserts', rating: 4.3, deliveryTime: 15, minOrder: 100, isOpen: true,
    offer: '₹30 OFF', address: 'Indiranagar, Bangalore', totalRatings: 7800, costForTwo: 300,
    isVeg: true, isPureVeg: true, tags: ['Shake', 'Desserts'],
    menu: [
      { category: 'Thick Shakes', items: [
        { id: mid(), name: 'Oreo Shake', price: 179, description: 'Creamy milkshake with crushed Oreo cookies.', isVeg: true, isRecommended: true, image: img('1572490122747-3968b75cc699', 400) },
        { id: mid(), name: 'Belgian Chocolate Shake', price: 199, description: 'Rich Belgian chocolate with whipped cream.', isVeg: true, isRecommended: true, image: img('1572490122747-3968b75cc699', 400) },
        { id: mid(), name: 'Butterscotch Blast', price: 169, description: 'Butterscotch ice cream shake with caramel.', isVeg: true, image: img('1572490122747-3968b75cc699', 400) },
        { id: mid(), name: 'Strawberry Shake', price: 159, description: 'Fresh strawberry milkshake.', isVeg: true, image: img('1572490122747-3968b75cc699', 400) },
        { id: mid(), name: 'Nutella Shake', price: 219, description: 'Creamy Nutella blended shake.', isVeg: true, image: img('1572490122747-3968b75cc699', 400) },
        { id: mid(), name: 'Kit Kat Shake', price: 189, description: 'Chocolate shake blended with Kit Kat bars.', isVeg: true, image: img('1572490122747-3968b75cc699', 400) },
      ]},
      { category: 'Fresh Juices', items: [
        { id: mid(), name: 'Fresh Orange Juice', price: 99, description: 'Freshly squeezed orange juice.', isVeg: true, image: img('1622597467836-f3285f2131b8', 400) },
        { id: mid(), name: 'Watermelon Juice', price: 79, description: 'Refreshing watermelon juice.', isVeg: true, image: img('1622597467836-f3285f2131b8', 400) },
        { id: mid(), name: 'Mixed Fruit Juice', price: 119, description: 'Blend of seasonal fruits.', isVeg: true, image: img('1622597467836-f3285f2131b8', 400) },
        { id: mid(), name: 'Sugarcane Juice', price: 59, description: 'Fresh sugarcane with lemon and ginger.', isVeg: true, image: img('1622597467836-f3285f2131b8', 400) },
      ]},
      { category: 'Ice Cream Sundaes', items: [
        { id: mid(), name: 'Death by Chocolate', price: 249, description: 'Chocolate overload sundae with brownie and fudge.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) },
        { id: mid(), name: 'Brownie Sundae', price: 219, description: 'Warm brownie with vanilla ice cream and sauce.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) },
      ]}
    ]
  },
  {
    id: 20, name: 'Dhaba Highway', image: img('1585937421612-70a008356fbe'),
    cuisine: 'North Indian, Dhaba Style, Tandoor', rating: 4.0, deliveryTime: 30, minOrder: 200, isOpen: true,
    offer: 'Flat ₹100 OFF', address: 'GT Karnal Road, Delhi', totalRatings: 5400, costForTwo: 400,
    isVeg: false, tags: ['North Indian', 'Tandoori'],
    menu: [
      { category: 'Dhaba Specials', items: [
        { id: mid(), name: 'Dhaba Dal Fry', price: 149, description: 'Rustic smoky dal with tadka.', isVeg: true, isRecommended: true, image: img('1585937421612-70a008356fbe', 400) },
        { id: mid(), name: 'Dhaba Chicken', price: 299, description: 'Country style chicken curry.', isVeg: false, isRecommended: true, image: img('1585937421612-70a008356fbe', 400) },
        { id: mid(), name: 'Sarson Ka Saag', price: 199, description: 'Mustard greens with makki roti.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) },
        { id: mid(), name: 'Rajma Chawal', price: 169, description: 'Kidney bean curry with steamed rice.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) },
        { id: mid(), name: 'Keema Masala', price: 279, description: 'Spiced minced meat curry.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) },
      ]},
      { category: 'Tandoor', items: [
        { id: mid(), name: 'Tandoori Roti (3 pcs)', price: 45, description: 'Whole wheat bread from clay oven.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Missi Roti', price: 39, description: 'Gram flour flatbread with spices.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) },
        { id: mid(), name: 'Tandoori Chicken Half', price: 249, description: 'Half chicken marinated and roasted in tandoor.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) },
      ]}
    ]
  },
  // ───── 21-30 ─────
  { id: 21, name: 'Pasta La Vista', image: img('1551183053-bf91a1d81141'), cuisine: 'Italian, Pasta, Continental', rating: 4.2, deliveryTime: 30, minOrder: 250, isOpen: true, offer: '25% OFF', address: 'Whitefield, Bangalore', totalRatings: 2800, costForTwo: 500, isVeg: false, tags: ['Pasta', 'Italian'],
    menu: [{ category: 'Pasta', items: [
      { id: mid(), name: 'Aglio Olio', price: 249, description: 'Spaghetti with garlic, olive oil, and chili flakes.', isVeg: true, isRecommended: true, image: img('1551183053-bf91a1d81141', 400) },
      { id: mid(), name: 'Mac & Cheese', price: 279, description: 'Creamy cheesy macaroni.', isVeg: true, image: img('1551183053-bf91a1d81141', 400) },
      { id: mid(), name: 'Pesto Penne', price: 299, description: 'Penne in basil pesto sauce.', isVeg: true, image: img('1551183053-bf91a1d81141', 400) },
      { id: mid(), name: 'Chicken Bolognese', price: 349, description: 'Spaghetti with rich meat sauce.', isVeg: false, image: img('1551183053-bf91a1d81141', 400) },
      { id: mid(), name: 'Creamy Mushroom Pasta', price: 269, description: 'Fettuccine in garlic mushroom cream sauce.', isVeg: true, image: img('1551183053-bf91a1d81141', 400) },
      { id: mid(), name: 'Lasagna', price: 399, description: 'Layered pasta baked with cheese and sauce.', isVeg: false, image: img('1551183053-bf91a1d81141', 400) },
    ]}]
  },
  { id: 22, name: 'The Waffle House', image: img('1551024601-bec78aea704b'), cuisine: 'Waffles, Desserts, Pancakes', rating: 4.4, deliveryTime: 20, minOrder: 150, isOpen: true, offer: '1+1 Free', address: 'Cyber Hub, Gurgaon', totalRatings: 3200, costForTwo: 350, isVeg: true, tags: ['Desserts'],
    menu: [{ category: 'Waffles', items: [
      { id: mid(), name: 'Classic Belgian Waffle', price: 149, description: 'Crispy waffle with butter and maple syrup.', isVeg: true, isRecommended: true, image: img('1551024601-bec78aea704b', 400) },
      { id: mid(), name: 'Nutella Waffle', price: 199, description: 'Topped with Nutella and fresh berries.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
      { id: mid(), name: 'Red Velvet Waffle', price: 229, description: 'Red velvet waffle with cream cheese.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
      { id: mid(), name: 'Banana Caramel Waffle', price: 219, description: 'Waffle with banana and salted caramel.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
      { id: mid(), name: 'Oreo Waffle', price: 209, description: 'Waffle topped with Oreo crumble and chocolate.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
    ]}]
  },
  { id: 23, name: 'Royal Mughlai', image: img('1585937421612-70a008356fbe'), cuisine: 'Mughlai, Lucknowi, Kebabs', rating: 4.5, deliveryTime: 40, minOrder: 350, isOpen: true, offer: 'Flat ₹150 OFF', address: 'Aminabad, Lucknow', totalRatings: 6500, costForTwo: 600, isVeg: false, tags: ['Mughlai', 'Kebabs'],
    menu: [{ category: 'Lucknowi Specials', items: [
      { id: mid(), name: 'Tunday Kebab (6 pcs)', price: 399, description: 'Famous Lucknow melt-in-mouth kebabs.', isVeg: false, isRecommended: true, image: img('1599487488170-d11ec9c172f0', 400) },
      { id: mid(), name: 'Nihari', price: 349, description: 'Slow cooked meat stew with spices.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) },
      { id: mid(), name: 'Shahi Tukda', price: 149, description: 'Fried bread soaked in milk with nuts.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
      { id: mid(), name: 'Lucknowi Biryani', price: 379, description: 'Pakki style aromatic biryani.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) },
      { id: mid(), name: 'Kulcha Nihari Combo', price: 249, description: 'Nihari with butter kulcha.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) },
    ]}]
  },
  { id: 24, name: 'Thai Orchid', image: img('1562565652-2e2c42aa1a42'), cuisine: 'Thai, Asian, Salads', rating: 4.3, deliveryTime: 35, minOrder: 300, isOpen: true, offer: '₹100 OFF', address: 'Powai, Mumbai', totalRatings: 1800, costForTwo: 700, isVeg: false, tags: ['Thai'],
    menu: [{ category: 'Thai Curries', items: [
      { id: mid(), name: 'Thai Green Curry', price: 349, description: 'Coconut milk green curry with veggies.', isVeg: true, isRecommended: true, image: img('1562565652-2e2c42aa1a42', 400) },
      { id: mid(), name: 'Thai Red Curry', price: 369, description: 'Spicy red curry with chicken and bamboo shoots.', isVeg: false, image: img('1562565652-2e2c42aa1a42', 400) },
      { id: mid(), name: 'Massaman Curry', price: 399, description: 'Rich peanut based curry with potatoes.', isVeg: false, image: img('1562565652-2e2c42aa1a42', 400) },
      { id: mid(), name: 'Tom Yum Soup', price: 249, description: 'Spicy and sour Thai soup.', isVeg: false, image: img('1562565652-2e2c42aa1a42', 400) },
      { id: mid(), name: 'Som Tam Salad', price: 199, description: 'Spicy green papaya salad.', isVeg: true, image: img('1562565652-2e2c42aa1a42', 400) },
      { id: mid(), name: 'Chicken Satay (6 pcs)', price: 299, description: 'Grilled chicken skewers with peanut sauce.', isVeg: false, image: img('1562565652-2e2c42aa1a42', 400) },
    ]}]
  },
  { id: 25, name: 'Chaayos', image: img('1509042239860-f550ce710b93'), cuisine: 'Tea, Snacks, Maggi', rating: 4.1, deliveryTime: 15, minOrder: 50, isOpen: true, offer: '₹25 OFF', address: 'Multiple Outlets, Delhi NCR', totalRatings: 15000, costForTwo: 200, isVeg: true, tags: ['Coffee', 'Street Food'],
    menu: [{ category: 'Chai Menu', items: [
      { id: mid(), name: 'Aam Papad Chai', price: 69, description: 'Unique mango leather flavored chai.', isVeg: true, isRecommended: true, image: img('1509042239860-f550ce710b93', 400) },
      { id: mid(), name: 'Gur Wali Chai', price: 49, description: 'Chai sweetened with jaggery.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) },
      { id: mid(), name: 'Tandoori Chai', price: 59, description: 'Smoky flavored clay pot chai.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) },
      { id: mid(), name: 'Maggi', price: 89, description: 'Classic 2-minute Maggi noodles.', isVeg: true, image: img('1563245372-f21724e3856d', 400) },
      { id: mid(), name: 'Cheese Maggi', price: 119, description: 'Maggi loaded with cheese.', isVeg: true, image: img('1563245372-f21724e3856d', 400) },
    ]}]
  },
  { id: 26, name: 'Grill Master BBQ', image: img('1529193591184-b1d58069ecdd'), cuisine: 'BBQ, Grills, Steaks', rating: 4.5, deliveryTime: 45, minOrder: 500, isOpen: true, offer: '₹200 OFF', address: 'Jubilee Hills, Hyderabad', totalRatings: 2100, costForTwo: 1200, isVeg: false, tags: ['BBQ'],
    menu: [{ category: 'BBQ Platters', items: [
      { id: mid(), name: 'Mixed BBQ Platter', price: 899, description: 'Assorted grilled meats with sauces.', isVeg: false, isRecommended: true, image: img('1529193591184-b1d58069ecdd', 400) },
      { id: mid(), name: 'Chicken Wings (12 pcs)', price: 399, description: 'Smoky BBQ glazed chicken wings.', isVeg: false, image: img('1529193591184-b1d58069ecdd', 400) },
      { id: mid(), name: 'Grilled Lamb Chops', price: 799, description: 'Herb crusted lamb chops.', isVeg: false, image: img('1529193591184-b1d58069ecdd', 400) },
      { id: mid(), name: 'BBQ Chicken Legs', price: 349, description: 'Smoky charcoal grilled chicken legs.', isVeg: false, image: img('1529193591184-b1d58069ecdd', 400) },
      { id: mid(), name: 'Paneer Tikka Platter', price: 299, description: 'Charcoal grilled paneer with veggies.', isVeg: true, image: img('1599487488170-d11ec9c172f0', 400) },
      { id: mid(), name: 'Corn on the Cob', price: 99, description: 'Grilled corn with butter and spices.', isVeg: true, image: img('1529193591184-b1d58069ecdd', 400) },
    ]}]
  },
  { id: 27, name: 'Dilli Chaat Corner', image: img('1601050690597-df0568f70950'), cuisine: 'Chaat, Street Food, Snacks', rating: 4.0, deliveryTime: 20, minOrder: 50, isOpen: true, offer: '₹30 OFF', address: 'Karol Bagh, Delhi', totalRatings: 9500, costForTwo: 150, isVeg: true, tags: ['Street Food'],
    menu: [{ category: 'Chaat Varieties', items: [
      { id: mid(), name: 'Raj Kachori', price: 79, description: 'Large crispy kachori with yogurt and chutneys.', isVeg: true, isRecommended: true, image: img('1601050690597-df0568f70950', 400) },
      { id: mid(), name: 'Papdi Chaat', price: 69, description: 'Crispy wafers with potatoes and tangy sauce.', isVeg: true, image: img('1601050690597-df0568f70950', 400) },
      { id: mid(), name: 'Bhel Puri', price: 59, description: 'Puffed rice with vegetables and chutneys.', isVeg: true, image: img('1601050690597-df0568f70950', 400) },
      { id: mid(), name: 'Sev Puri', price: 69, description: 'Flat puris with toppings and sev.', isVeg: true, image: img('1601050690597-df0568f70950', 400) },
      { id: mid(), name: 'Chole Kulche', price: 89, description: 'Spiced chickpeas with soft kulcha bread.', isVeg: true, image: img('1601050690597-df0568f70950', 400) },
      { id: mid(), name: 'Dahi Puri (6 pcs)', price: 69, description: 'Puris filled with yogurt and sweet chutney.', isVeg: true, image: img('1601050690597-df0568f70950', 400) },
    ]}]
  },
  { id: 28, name: 'Bengal Fish House', image: img('1565557623262-b51c2513a641'), cuisine: 'Bengali, Fish, Rice', rating: 4.2, deliveryTime: 35, minOrder: 250, isOpen: true, offer: 'Free Delivery', address: 'Salt Lake, Kolkata', totalRatings: 3100, costForTwo: 500, isVeg: false, tags: ['Seafood'],
    menu: [{ category: 'Bengali Classics', items: [
      { id: mid(), name: 'Ilish Bhapa', price: 499, description: 'Steamed Hilsa fish in mustard paste.', isVeg: false, isRecommended: true, image: img('1565557623262-b51c2513a641', 400) },
      { id: mid(), name: 'Kosha Mangsho', price: 399, description: 'Slow cooked spicy mutton curry.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) },
      { id: mid(), name: 'Chingri Malai Curry', price: 449, description: 'Prawns in coconut cream sauce.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) },
      { id: mid(), name: 'Fish Kalia', price: 349, description: 'Bengali style rich fish curry.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) },
      { id: mid(), name: 'Luchi Alur Dom', price: 149, description: 'Fried puffed bread with potato curry.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) },
      { id: mid(), name: 'Mishti Doi', price: 69, description: 'Sweet set yogurt, Bengali style.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
      { id: mid(), name: 'Rasgulla (4 pcs)', price: 79, description: 'Soft spongy cheese balls in sugar syrup.', isVeg: true, image: img('1551024601-bec78aea704b', 400) },
    ]}]
  },
  { id: 29, name: 'Pind Punjab', image: img('1585937421612-70a008356fbe'), cuisine: 'Punjabi, North Indian, Tandoor', rating: 4.3, deliveryTime: 30, minOrder: 200, isOpen: true, offer: '₹80 OFF', address: 'Sector 26, Chandigarh', totalRatings: 7200, costForTwo: 450, isVeg: false, tags: ['North Indian', 'Tandoori'],
    menu: [{ category: 'Punjabi Favorites', items: [
      { id: mid(), name: 'Butter Chicken', price: 299, description: 'Rich butter tomato gravy with chicken.', isVeg: false, isRecommended: true, image: img('1585937421612-70a008356fbe', 400) },
      { id: mid(), name: 'Amritsari Kulcha', price: 99, description: 'Stuffed kulcha with butter.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) },
      { id: mid(), name: 'Pindi Chole', price: 179, description: 'Dry spiced chickpea curry.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) },
      { id: mid(), name: 'Lassi (Sweet/Salty)', price: 69, description: 'Thick creamy Punjabi lassi.', isVeg: true, image: img('1622597467836-f3285f2131b8', 400) },
      { id: mid(), name: 'Chicken Tikka', price: 269, description: 'Tandoor grilled chicken pieces.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) },
      { id: mid(), name: 'Aloo Paratha', price: 79, description: 'Stuffed potato flatbread with butter.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) },
    ]}]
  },
  { id: 30, name: 'Ice Cream Nation', image: img('1501443762994-82bd5dace89a'), cuisine: 'Ice Cream, Frozen Desserts', rating: 4.6, deliveryTime: 15, minOrder: 100, isOpen: true, offer: '₹50 OFF above ₹299', address: 'HSR Layout, Bangalore', totalRatings: 8500, costForTwo: 250, isVeg: true, tags: ['Ice Cream', 'Desserts'],
    menu: [{ category: 'Premium Scoops', items: [
      { id: mid(), name: 'Madagascar Vanilla (2 scoops)', price: 179, description: 'Pure vanilla bean ice cream.', isVeg: true, isRecommended: true, image: img('1501443762994-82bd5dace89a', 400) },
      { id: mid(), name: 'Dark Chocolate Truffle', price: 199, description: '70% cocoa dark chocolate.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) },
      { id: mid(), name: 'Salted Caramel', price: 199, description: 'Sweet and salty caramel ice cream.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) },
      { id: mid(), name: 'Mango Alphonso', price: 189, description: 'Real Alphonso mango ice cream.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) },
      { id: mid(), name: 'Pistachio Kulfi', price: 149, description: 'Traditional Indian ice cream with pistachios.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) },
      { id: mid(), name: 'Cookie Dough', price: 209, description: 'Vanilla ice cream with cookie dough pieces.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) },
      { id: mid(), name: 'Strawberry Cheesecake', price: 219, description: 'Strawberry ice cream with cheesecake bites.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) },
    ]}]
  },
  // ───── 31-50: More diverse restaurants ─────
  { id: 31, name: 'Noodle Box', image: img('1563245372-f21724e3856d'), cuisine: 'Chinese, Noodles, Wok', rating: 4.1, deliveryTime: 25, minOrder: 150, isOpen: true, offer: '20% OFF', address: 'Viman Nagar, Pune', totalRatings: 4300, costForTwo: 300, isVeg: false, tags: ['Chinese'],
    menu: [{ category: 'Noodle Bowls', items: [{ id: mid(), name: 'Chilli Garlic Noodles', price: 199, description: 'Spicy wok tossed noodles.', isVeg: true, isRecommended: true, image: img('1563245372-f21724e3856d', 400) }, { id: mid(), name: 'Singapore Noodles', price: 249, description: 'Curry flavored rice noodles.', isVeg: false, image: img('1563245372-f21724e3856d', 400) }, { id: mid(), name: 'Dan Dan Noodles', price: 279, description: 'Sichuan spiced minced pork noodles.', isVeg: false, image: img('1563245372-f21724e3856d', 400) }, { id: mid(), name: 'Veg Chow Mein', price: 179, description: 'Classic vegetable chow mein.', isVeg: true, image: img('1563245372-f21724e3856d', 400) }, { id: mid(), name: 'Kung Pao Noodles', price: 229, description: 'Spicy peanut and chilli noodles.', isVeg: true, image: img('1563245372-f21724e3856d', 400) }]}]
  },
  { id: 32, name: 'Vada Pav King', image: img('1601050690597-df0568f70950'), cuisine: 'Street Food, Mumbai Special', rating: 4.0, deliveryTime: 10, minOrder: 40, isOpen: true, offer: '₹20 OFF', address: 'Dadar, Mumbai', totalRatings: 18000, costForTwo: 100, isVeg: true, tags: ['Street Food'],
    menu: [{ category: 'Mumbai Specials', items: [{ id: mid(), name: 'Classic Vada Pav', price: 25, description: 'Mumbai iconic potato fritter in bread.', isVeg: true, isRecommended: true, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Cheese Vada Pav', price: 45, description: 'Vada pav with cheese slice.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Schezwan Vada Pav', price: 35, description: 'Vada pav with schezwan chutney.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Misal Pav', price: 89, description: 'Spicy sprout curry with bread.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Pav Bhaji', price: 99, description: 'Buttery mashed vegetables with bread rolls.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Dabeli', price: 35, description: 'Sweet spicy potato filling in bread.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }]}]
  },
  { id: 33, name: 'Tandoori Flames', image: img('1599487488170-d11ec9c172f0'), cuisine: 'Tandoori, Kebabs, Indian', rating: 4.4, deliveryTime: 35, minOrder: 300, isOpen: true, offer: '₹100 OFF', address: 'Aundh, Pune', totalRatings: 3200, costForTwo: 600, isVeg: false, tags: ['Tandoori', 'Kebabs'],
    menu: [{ category: 'Tandoori Specials', items: [{ id: mid(), name: 'Tandoori Platter', price: 599, description: 'Mixed tandoori items platter.', isVeg: false, isRecommended: true, image: img('1599487488170-d11ec9c172f0', 400) }, { id: mid(), name: 'Afghani Chicken', price: 349, description: 'Creamy mild chicken tikka.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) }, { id: mid(), name: 'Reshmi Kebab', price: 299, description: 'Silky smooth chicken kebabs.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) }, { id: mid(), name: 'Achari Paneer Tikka', price: 249, description: 'Pickle marinated paneer tikka.', isVeg: true, image: img('1599487488170-d11ec9c172f0', 400) }, { id: mid(), name: 'Mutton Burrah Kebab', price: 499, description: 'Large mutton chops from tandoor.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) }]}]
  },
  { id: 34, name: 'Cake Walk', image: img('1578985545062-69928b1d9587'), cuisine: 'Cakes, Bakery, Pastries', rating: 4.5, deliveryTime: 20, minOrder: 200, isOpen: true, offer: '₹60 OFF', address: 'Koramangala, Bangalore', totalRatings: 5100, costForTwo: 400, isVeg: true, tags: ['Cakes'],
    menu: [{ category: 'Designer Cakes', items: [{ id: mid(), name: 'Death by Chocolate Cake', price: 799, description: '5 layers of chocolate heaven.', isVeg: true, isRecommended: true, image: img('1578985545062-69928b1d9587', 400) }, { id: mid(), name: 'Fruit Gateau', price: 649, description: 'Fresh fruit topped cream cake.', isVeg: true, image: img('1578985545062-69928b1d9587', 400) }, { id: mid(), name: 'Cheese Cake', price: 699, description: 'New York style cheesecake.', isVeg: true, image: img('1578985545062-69928b1d9587', 400) }, { id: mid(), name: 'Opera Cake', price: 749, description: 'French almond sponge with coffee.', isVeg: true, image: img('1578985545062-69928b1d9587', 400) }, { id: mid(), name: 'Tres Leches', price: 599, description: 'Three milk soaked sponge cake.', isVeg: true, image: img('1578985545062-69928b1d9587', 400) }, { id: mid(), name: 'Bento Cake', price: 449, description: 'Trendy mini cake for one.', isVeg: true, image: img('1578985545062-69928b1d9587', 400) }]}]
  },
  { id: 35, name: 'Andhra Bhavan', image: img('1589302168068-964664d93dc0'), cuisine: 'South Indian, Andhra, Spicy', rating: 4.2, deliveryTime: 30, minOrder: 150, isOpen: true, offer: '₹50 OFF', address: 'Begumpet, Hyderabad', totalRatings: 4800, costForTwo: 350, isVeg: false, tags: ['South Indian'],
    menu: [{ category: 'Andhra Meals', items: [{ id: mid(), name: 'Andhra Meals (Full)', price: 199, description: 'Complete Andhra thali with rice and curries.', isVeg: false, isRecommended: true, image: img('1546833999-b9f581b2f4d0', 400) }, { id: mid(), name: 'Gongura Chicken', price: 299, description: 'Chicken in tangy gongura leaf curry.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Pesarattu', price: 89, description: 'Green moong dal dosa.', isVeg: true, image: img('1630383249896-424e482df921', 400) }, { id: mid(), name: 'Gutti Vankaya', price: 179, description: 'Stuffed brinjal curry.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Natu Kodi Pulusu', price: 349, description: 'Country chicken curry in tamarind gravy.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }]}]
  },
  { id: 36, name: 'Kolkata Biryani House', image: img('1563379091339-03b21ab4a4f8'), cuisine: 'Biryani, Bengali, Mughlai', rating: 4.4, deliveryTime: 35, minOrder: 200, isOpen: true, offer: 'Buy 1 Get 1', address: 'New Market, Kolkata', totalRatings: 8900, costForTwo: 400, isVeg: false, tags: ['Biryani'],
    menu: [{ category: 'Kolkata Biryani', items: [{ id: mid(), name: 'Kolkata Chicken Biryani', price: 249, description: 'Light potato and egg style biryani.', isVeg: false, isRecommended: true, image: img('1563379091339-03b21ab4a4f8', 400) }, { id: mid(), name: 'Kolkata Mutton Biryani', price: 349, description: 'Signature mutton biryani with aloo.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) }, { id: mid(), name: 'Egg Biryani Special', price: 199, description: 'Biryani with boiled egg and potato.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) }, { id: mid(), name: 'Veg Biryani', price: 179, description: 'Kolkata style vegetable biryani.', isVeg: true, image: img('1563379091339-03b21ab4a4f8', 400) }, { id: mid(), name: 'Chaap Cutlet (4 pcs)', price: 149, description: 'Kolkata style mutton chop.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) }]}]
  },
  { id: 37, name: 'Naturals Ice Cream', image: img('1501443762994-82bd5dace89a'), cuisine: 'Ice Cream, Natural Flavors', rating: 4.7, deliveryTime: 15, minOrder: 100, isOpen: true, offer: '10% OFF', address: 'Juhu, Mumbai', totalRatings: 14000, costForTwo: 200, isVeg: true, tags: ['Ice Cream'],
    menu: [{ category: 'Fruit Ice Cream', items: [{ id: mid(), name: 'Tender Coconut', price: 149, description: 'Made with real tender coconut.', isVeg: true, isRecommended: true, image: img('1501443762994-82bd5dace89a', 400) }, { id: mid(), name: 'Sitaphal', price: 169, description: 'Custard apple ice cream.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) }, { id: mid(), name: 'Chikoo', price: 139, description: 'Sapota flavored ice cream.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) }, { id: mid(), name: 'Jackfruit', price: 159, description: 'Seasonal jackfruit ice cream.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) }, { id: mid(), name: 'Fig & Honey', price: 179, description: 'Fig ice cream with honey swirl.', isVeg: true, image: img('1501443762994-82bd5dace89a', 400) }]}]
  },
  { id: 38, name: 'Mumbai Tiffin Service', image: img('1546833999-b9f581b2f4d0'), cuisine: 'Home Style, Thali, Indian', rating: 4.0, deliveryTime: 30, minOrder: 100, isOpen: true, offer: 'Flat ₹40 OFF', address: 'Lower Parel, Mumbai', totalRatings: 6200, costForTwo: 250, isVeg: true, tags: ['Thali'],
    menu: [{ category: 'Daily Tiffin', items: [{ id: mid(), name: 'Regular Thali', price: 149, description: 'Dal, sabzi, roti, rice, pickle.', isVeg: true, isRecommended: true, image: img('1546833999-b9f581b2f4d0', 400) }, { id: mid(), name: 'Special Thali', price: 199, description: 'Paneer dish, dal, 2 sabzi, roti, rice.', isVeg: true, image: img('1546833999-b9f581b2f4d0', 400) }, { id: mid(), name: 'Diet Thali', price: 179, description: 'Low oil dal, salad, roti, curd.', isVeg: true, image: img('1546833999-b9f581b2f4d0', 400) }, { id: mid(), name: 'Gujarati Thali', price: 219, description: 'Full Gujarati meal with sweets.', isVeg: true, image: img('1546833999-b9f581b2f4d0', 400) }, { id: mid(), name: 'Rajasthani Thali', price: 249, description: 'Dal bati churma and more.', isVeg: true, image: img('1546833999-b9f581b2f4d0', 400) }]}]
  },
  { id: 39, name: 'Wok This Way', image: img('1563245372-f21724e3856d'), cuisine: 'Pan Asian, Chinese, Thai', rating: 4.3, deliveryTime: 30, minOrder: 200, isOpen: true, offer: '₹70 OFF', address: 'Banjara Hills, Hyderabad', totalRatings: 2700, costForTwo: 450, isVeg: false, tags: ['Chinese', 'Thai'],
    menu: [{ category: 'Wok Specials', items: [{ id: mid(), name: 'Kung Pao Chicken', price: 299, description: 'Spicy chicken with peanuts and chili.', isVeg: false, isRecommended: true, image: img('1563245372-f21724e3856d', 400) }, { id: mid(), name: 'Thai Basil Chicken', price: 329, description: 'Stir fried with holy basil and chili.', isVeg: false, image: img('1562565652-2e2c42aa1a42', 400) }, { id: mid(), name: 'Teriyaki Tofu', price: 249, description: 'Glazed tofu with teriyaki sauce.', isVeg: true, image: img('1563245372-f21724e3856d', 400) }, { id: mid(), name: 'Black Bean Chicken', price: 299, description: 'Chicken in fermented black bean sauce.', isVeg: false, image: img('1563245372-f21724e3856d', 400) }, { id: mid(), name: 'Vegetable Stir Fry', price: 199, description: 'Mixed vegetables in oyster sauce.', isVeg: true, image: img('1563245372-f21724e3856d', 400) }]}]
  },
  { id: 40, name: 'Salad Story', image: img('1512621776951-a57141f2eefd'), cuisine: 'Salads, Healthy, Keto', rating: 4.5, deliveryTime: 20, minOrder: 200, isOpen: true, offer: '15% OFF', address: 'Sector 29, Gurgaon', totalRatings: 1900, costForTwo: 500, isVeg: true, tags: ['Healthy'],
    menu: [{ category: 'Signature Salads', items: [{ id: mid(), name: 'Kale & Quinoa Bowl', price: 349, description: 'Super food bowl with kale and quinoa.', isVeg: true, isRecommended: true, image: img('1512621776951-a57141f2eefd', 400) }, { id: mid(), name: 'Mediterranean Bowl', price: 369, description: 'Hummus, falafel, veggies, and pita.', isVeg: true, image: img('1512621776951-a57141f2eefd', 400) }, { id: mid(), name: 'Poke Bowl', price: 399, description: 'Hawaiian style bowl with tofu and avocado.', isVeg: true, image: img('1512621776951-a57141f2eefd', 400) }, { id: mid(), name: 'Cobb Salad', price: 329, description: 'Classic American salad with eggs and avocado.', isVeg: true, image: img('1512621776951-a57141f2eefd', 400) }, { id: mid(), name: 'Thai Crunch Salad', price: 299, description: 'Crunchy salad with peanut dressing.', isVeg: true, image: img('1512621776951-a57141f2eefd', 400) }]}]
  },
  // ───── 41-60 ─────
  { id: 41, name: 'Fried Chicken Republic', image: img('1598515214211-89a3d5a43f0c'), cuisine: 'Fried Chicken, Wings, American', rating: 4.3, deliveryTime: 25, minOrder: 200, isOpen: true, offer: '₹80 OFF', address: 'Magarpatta, Pune', totalRatings: 5800, costForTwo: 350, isVeg: false, tags: ['Chicken'],
    menu: [{ category: 'Chicken Buckets', items: [{ id: mid(), name: 'Original Recipe Bucket (8 pcs)', price: 499, description: 'Classic crispy fried chicken.', isVeg: false, isRecommended: true, image: img('1598515214211-89a3d5a43f0c', 400) }, { id: mid(), name: 'Hot & Crispy Wings (12)', price: 399, description: 'Extra spicy chicken wings.', isVeg: false, image: img('1598515214211-89a3d5a43f0c', 400) }, { id: mid(), name: 'Smoky BBQ Wings (12)', price: 419, description: 'Wings with smoky BBQ glaze.', isVeg: false, image: img('1598515214211-89a3d5a43f0c', 400) }, { id: mid(), name: 'Chicken Popcorn', price: 199, description: 'Bite sized crispy chicken.', isVeg: false, image: img('1598515214211-89a3d5a43f0c', 400) }, { id: mid(), name: 'Chicken Strips (6)', price: 279, description: 'Tender chicken strips with dip.', isVeg: false, image: img('1598515214211-89a3d5a43f0c', 400) }]}]
  },
  { id: 42, name: 'Paratha Junction', image: img('1565557623262-b51c2513a641'), cuisine: 'Parathas, North Indian', rating: 4.1, deliveryTime: 20, minOrder: 80, isOpen: true, offer: '₹30 OFF', address: 'Paranthe Wali Gali, Delhi', totalRatings: 11500, costForTwo: 200, isVeg: true, tags: ['North Indian'],
    menu: [{ category: 'Paratha Menu', items: [{ id: mid(), name: 'Aloo Paratha', price: 69, description: 'Stuffed potato paratha with butter.', isVeg: true, isRecommended: true, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Gobhi Paratha', price: 79, description: 'Cauliflower stuffed paratha.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Paneer Paratha', price: 89, description: 'Cottage cheese stuffed paratha.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Mix Veg Paratha', price: 79, description: 'Mixed vegetables stuffed paratha.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Dal Paratha', price: 69, description: 'Lentil stuffed paratha.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Onion Paratha', price: 59, description: 'Onion stuffed paratha.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) }]}]
  },
  { id: 43, name: 'Starbeans Cafe', image: img('1509042239860-f550ce710b93'), cuisine: 'Coffee, Beverages, Snacks', rating: 4.4, deliveryTime: 20, minOrder: 100, isOpen: true, offer: '₹40 OFF', address: 'MG Road, Bangalore', totalRatings: 6700, costForTwo: 400, isVeg: true, tags: ['Coffee'],
    menu: [{ category: 'Coffee Classics', items: [{ id: mid(), name: 'Caramel Macchiato', price: 249, description: 'Espresso with caramel and steamed milk.', isVeg: true, isRecommended: true, image: img('1509042239860-f550ce710b93', 400) }, { id: mid(), name: 'Cold Brew', price: 199, description: 'Slow steeped cold brew coffee.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) }, { id: mid(), name: 'Hazelnut Latte', price: 269, description: 'Latte with hazelnut syrup.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) }, { id: mid(), name: 'Mocha Frappuccino', price: 289, description: 'Blended coffee with chocolate.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) }, { id: mid(), name: 'Espresso Shot', price: 149, description: 'Double shot espresso.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) }, { id: mid(), name: 'Matcha Latte', price: 279, description: 'Japanese matcha with steamed milk.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) }]}]
  },
  { id: 44, name: 'Juice Junction', image: img('1622597467836-f3285f2131b8'), cuisine: 'Juices, Smoothies, Fresh', rating: 4.2, deliveryTime: 15, minOrder: 50, isOpen: true, offer: '₹20 OFF', address: 'Linking Road, Mumbai', totalRatings: 4500, costForTwo: 200, isVeg: true, tags: ['Juices'],
    menu: [{ category: 'Fresh Juices', items: [{ id: mid(), name: 'ABC Juice', price: 99, description: 'Apple, beetroot, carrot detox juice.', isVeg: true, isRecommended: true, image: img('1622597467836-f3285f2131b8', 400) }, { id: mid(), name: 'Pomegranate Juice', price: 119, description: 'Fresh pomegranate juice.', isVeg: true, image: img('1622597467836-f3285f2131b8', 400) }, { id: mid(), name: 'Mosambi Juice', price: 79, description: 'Sweet lime juice.', isVeg: true, image: img('1622597467836-f3285f2131b8', 400) }, { id: mid(), name: 'Pineapple Juice', price: 89, description: 'Fresh pineapple juice.', isVeg: true, image: img('1622597467836-f3285f2131b8', 400) }, { id: mid(), name: 'Coconut Water', price: 59, description: 'Fresh tender coconut water.', isVeg: true, image: img('1622597467836-f3285f2131b8', 400) }]}]
  },
  { id: 45, name: 'Tiffin Box', image: img('1546833999-b9f581b2f4d0'), cuisine: 'Home Style, Meals, Indian', rating: 4.3, deliveryTime: 30, minOrder: 100, isOpen: true, offer: 'Free Delivery', address: 'Hitech City, Hyderabad', totalRatings: 3800, costForTwo: 250, isVeg: false, tags: ['Thali'],
    menu: [{ category: 'Lunch Specials', items: [{ id: mid(), name: 'Mini Meals', price: 129, description: 'Rice, dal, one sabzi, curd.', isVeg: true, isRecommended: true, image: img('1546833999-b9f581b2f4d0', 400) }, { id: mid(), name: 'Non-Veg Mini Meals', price: 169, description: 'Rice, chicken curry, roti, salad.', isVeg: false, image: img('1546833999-b9f581b2f4d0', 400) }, { id: mid(), name: 'Biriyani Combo', price: 199, description: 'Biryani with raita and salan.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) }, { id: mid(), name: 'Roti Sabzi Combo', price: 109, description: '3 roti with mixed sabzi and pickle.', isVeg: true, image: img('1546833999-b9f581b2f4d0', 400) }, { id: mid(), name: 'Curd Rice', price: 79, description: 'Tempered curd rice.', isVeg: true, image: img('1546833999-b9f581b2f4d0', 400) }]}]
  },
  { id: 46, name: 'Goan Fish Curry', image: img('1565557623262-b51c2513a641'), cuisine: 'Goan, Seafood, Coastal', rating: 4.4, deliveryTime: 35, minOrder: 300, isOpen: true, offer: '₹80 OFF', address: 'Panjim, Goa', totalRatings: 2400, costForTwo: 600, isVeg: false, tags: ['Seafood'],
    menu: [{ category: 'Goan Classics', items: [{ id: mid(), name: 'Fish Curry Rice', price: 249, description: 'Goan coconut fish curry with rice.', isVeg: false, isRecommended: true, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Prawn Balchao', price: 349, description: 'Fiery prawn pickle curry.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Chicken Cafreal', price: 299, description: 'Green masala chicken.', isVeg: false, image: img('1598515214211-89a3d5a43f0c', 400) }, { id: mid(), name: 'Pork Vindaloo', price: 349, description: 'Tangy spicy pork curry.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Bebinca', price: 149, description: 'Traditional Goan layered dessert.', isVeg: true, image: img('1551024601-bec78aea704b', 400) }]}]
  },
  { id: 47, name: 'Chettinad Kitchen', image: img('1589302168068-964664d93dc0'), cuisine: 'Chettinad, South Indian, Spicy', rating: 4.3, deliveryTime: 35, minOrder: 200, isOpen: true, offer: '₹60 OFF', address: 'T Nagar, Chennai', totalRatings: 3600, costForTwo: 450, isVeg: false, tags: ['South Indian'],
    menu: [{ category: 'Chettinad Specials', items: [{ id: mid(), name: 'Chettinad Chicken', price: 329, description: 'Fiery Chettinad masala chicken.', isVeg: false, isRecommended: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Pepper Chicken', price: 299, description: 'Black pepper flavored chicken.', isVeg: false, image: img('1598515214211-89a3d5a43f0c', 400) }, { id: mid(), name: 'Mutton Chettinad', price: 399, description: 'Rich mutton in Chettinad spices.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Kozhi Varuval', price: 279, description: 'Dry fried chicken fry.', isVeg: false, image: img('1598515214211-89a3d5a43f0c', 400) }, { id: mid(), name: 'Appam with Stew', price: 149, description: 'Kerala appam with vegetable stew.', isVeg: true, image: img('1589302168068-964664d93dc0', 400) }]}]
  },
  { id: 48, name: 'Doner Kebab House', image: img('1626700051175-6818013e1d4f'), cuisine: 'Turkish, Kebabs, Middle Eastern', rating: 4.2, deliveryTime: 25, minOrder: 200, isOpen: true, offer: '₹50 OFF', address: 'Connaught Place, Delhi', totalRatings: 2100, costForTwo: 400, isVeg: false, tags: ['Kebabs'],
    menu: [{ category: 'Doner & Wraps', items: [{ id: mid(), name: 'Chicken Doner', price: 199, description: 'Shaved chicken in pita with garlic sauce.', isVeg: false, isRecommended: true, image: img('1626700051175-6818013e1d4f', 400) }, { id: mid(), name: 'Lamb Doner', price: 249, description: 'Shaved lamb with hummus and salad.', isVeg: false, image: img('1626700051175-6818013e1d4f', 400) }, { id: mid(), name: 'Falafel Plate', price: 179, description: 'Falafel with hummus and pita.', isVeg: true, image: img('1626700051175-6818013e1d4f', 400) }, { id: mid(), name: 'Shawarma Plate', price: 229, description: 'Chicken shawarma with rice and garlic.', isVeg: false, image: img('1626700051175-6818013e1d4f', 400) }, { id: mid(), name: 'Hummus Bowl', price: 149, description: 'Creamy hummus with olive oil and pita.', isVeg: true, image: img('1626700051175-6818013e1d4f', 400) }]}]
  },
  { id: 49, name: 'Farm Fresh Bowl', image: img('1546069901-ba9599a7e63c'), cuisine: 'Bowls, Organic, Healthy', rating: 4.6, deliveryTime: 25, minOrder: 250, isOpen: true, offer: '₹60 OFF', address: 'Baner, Pune', totalRatings: 1600, costForTwo: 500, isVeg: true, tags: ['Healthy'],
    menu: [{ category: 'Grain Bowls', items: [{ id: mid(), name: 'Teriyaki Rice Bowl', price: 299, description: 'Brown rice with teriyaki tofu and veggies.', isVeg: true, isRecommended: true, image: img('1512621776951-a57141f2eefd', 400) }, { id: mid(), name: 'Burrito Bowl', price: 319, description: 'Mexican rice bowl with beans and salsa.', isVeg: true, image: img('1512621776951-a57141f2eefd', 400) }, { id: mid(), name: 'Falafel Bowl', price: 319, description: 'Falafel with quinoa and tahini.', isVeg: true, image: img('1512621776951-a57141f2eefd', 400) }, { id: mid(), name: 'Asian Noodle Bowl', price: 279, description: 'Soba noodles with vegetables in miso.', isVeg: true, image: img('1512621776951-a57141f2eefd', 400) }, { id: mid(), name: 'Harvest Bowl', price: 349, description: 'Roasted veggies, quinoa, and pesto.', isVeg: true, image: img('1512621776951-a57141f2eefd', 400) }]}]
  },
  { id: 50, name: 'Hyderabadi Dastarkhwan', image: img('1563379091339-03b21ab4a4f8'), cuisine: 'Hyderabadi, Biryani, Mughlai', rating: 4.7, deliveryTime: 40, minOrder: 300, isOpen: true, offer: '₹100 OFF', address: 'Old City, Hyderabad', totalRatings: 13000, costForTwo: 500, isVeg: false, tags: ['Biryani', 'Mughlai'],
    menu: [{ category: 'Royal Feast', items: [{ id: mid(), name: 'Dum Ka Murgh Biryani', price: 399, description: 'The authentic Hyderabadi biryani.', isVeg: false, isRecommended: true, image: img('1563379091339-03b21ab4a4f8', 400) }, { id: mid(), name: 'Haleem', price: 249, description: 'Rich meat and wheat porridge.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Double Ka Meetha', price: 99, description: 'Bread pudding dessert.', isVeg: true, image: img('1551024601-bec78aea704b', 400) }, { id: mid(), name: 'Pathar Ka Gosht', price: 549, description: 'Meat cooked on hot stone.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Lukhmi (4 pcs)', price: 149, description: 'Flaky pastry with keema filling.', isVeg: false, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Qubani Ka Meetha', price: 119, description: 'Apricot dessert with cream.', isVeg: true, image: img('1551024601-bec78aea704b', 400) }]}]
  },
  // ───── 51-70 ─────
  { id: 51, name: 'Rajasthani Rasoi', image: img('1585937421612-70a008356fbe'), cuisine: 'Rajasthani, Indian, Thali', rating: 4.2, deliveryTime: 35, minOrder: 200, isOpen: true, offer: '₹70 OFF', address: 'Jodhpur, Rajasthan', totalRatings: 3900, costForTwo: 400, isVeg: true, tags: ['North Indian', 'Thali'],
    menu: [{ category: 'Rajasthani', items: [{ id: mid(), name: 'Dal Bati Churma', price: 249, description: 'Signature Rajasthani dish.', isVeg: true, isRecommended: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Gatte Ki Sabzi', price: 179, description: 'Gram flour dumplings in yogurt curry.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Ker Sangri', price: 159, description: 'Desert beans and berries.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Laal Maas', price: 349, description: 'Fiery red meat curry.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Pyaaz Kachori', price: 49, description: 'Onion filled fried pastry.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }]}]
  },
  { id: 52, name: 'Gujarati Bhawan', image: img('1546833999-b9f581b2f4d0'), cuisine: 'Gujarati, Thali, Sweet', rating: 4.3, deliveryTime: 30, minOrder: 150, isOpen: true, offer: '₹50 OFF', address: 'CG Road, Ahmedabad', totalRatings: 5100, costForTwo: 350, isVeg: true, tags: ['Thali'],
    menu: [{ category: 'Gujarati Thali', items: [{ id: mid(), name: 'Unlimited Gujarati Thali', price: 299, description: 'Full unlimited thali with sweets.', isVeg: true, isRecommended: true, image: img('1546833999-b9f581b2f4d0', 400) }, { id: mid(), name: 'Dhokla (6 pcs)', price: 79, description: 'Steamed gram flour cakes.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Handvo', price: 99, description: 'Savory rice and lentil cake.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Thepla (4 pcs)', price: 69, description: 'Fenugreek flatbread.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Undhiyu', price: 199, description: 'Mixed winter vegetable dish.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) }]}]
  },
  { id: 53, name: 'Kerala Express', image: img('1589302168068-964664d93dc0'), cuisine: 'Kerala, South Indian, Appam', rating: 4.4, deliveryTime: 35, minOrder: 200, isOpen: true, offer: '₹60 OFF', address: 'Ernakulam, Kerala', totalRatings: 4200, costForTwo: 450, isVeg: false, tags: ['South Indian'],
    menu: [{ category: 'Kerala Meals', items: [{ id: mid(), name: 'Kerala Sadya', price: 249, description: 'Traditional Kerala feast on banana leaf.', isVeg: true, isRecommended: true, image: img('1546833999-b9f581b2f4d0', 400) }, { id: mid(), name: 'Malabar Chicken Biryani', price: 299, description: 'Aromatic biryani with Malabar spices.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) }, { id: mid(), name: 'Kerala Parotta (3 pcs)', price: 59, description: 'Flaky layered flatbread.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Beef Fry', price: 299, description: 'Kerala style dry beef fry.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Karimeen Pollichathu', price: 449, description: 'Pearl spot fish in banana leaf.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Puttu & Kadala (2 log)', price: 99, description: 'Steamed rice cake with chickpea curry.', isVeg: true, image: img('1589302168068-964664d93dc0', 400) }]}]
  },
  { id: 54, name: 'Dim Sum Haus', image: img('1496116218417-1a781b1c416c'), cuisine: 'Dim Sum, Chinese, Asian', rating: 4.5, deliveryTime: 30, minOrder: 300, isOpen: true, offer: '₹90 OFF', address: 'Bandra, Mumbai', totalRatings: 1800, costForTwo: 600, isVeg: false, tags: ['Chinese', 'Momos'],
    menu: [{ category: 'Dim Sum', items: [{ id: mid(), name: 'Har Gow (6 pcs)', price: 349, description: 'Crystal shrimp dumplings.', isVeg: false, isRecommended: true, image: img('1496116218417-1a781b1c416c', 400) }, { id: mid(), name: 'Siu Mai (6 pcs)', price: 329, description: 'Pork and shrimp dumplings.', isVeg: false, image: img('1496116218417-1a781b1c416c', 400) }, { id: mid(), name: 'Char Siu Bao (3 pcs)', price: 249, description: 'BBQ pork steamed buns.', isVeg: false, image: img('1496116218417-1a781b1c416c', 400) }, { id: mid(), name: 'Xiao Long Bao (6 pcs)', price: 399, description: 'Soup dumplings.', isVeg: false, image: img('1496116218417-1a781b1c416c', 400) }, { id: mid(), name: 'Veg Crystal Dumpling (6)', price: 299, description: 'Translucent vegetable dumplings.', isVeg: true, image: img('1496116218417-1a781b1c416c', 400) }]}]
  },
  { id: 55, name: 'Lebanese House', image: img('1626700051175-6818013e1d4f'), cuisine: 'Lebanese, Mediterranean', rating: 4.3, deliveryTime: 30, minOrder: 250, isOpen: true, offer: '₹70 OFF', address: 'Defence Colony, Delhi', totalRatings: 1500, costForTwo: 700, isVeg: false, tags: ['Kebabs', 'Continental'],
    menu: [{ category: 'Mezze', items: [{ id: mid(), name: 'Hummus with Pita', price: 199, description: 'Classic chickpea dip with warm pita.', isVeg: true, isRecommended: true, image: img('1626700051175-6818013e1d4f', 400) }, { id: mid(), name: 'Baba Ganoush', price: 219, description: 'Smoky eggplant dip.', isVeg: true, image: img('1626700051175-6818013e1d4f', 400) }, { id: mid(), name: 'Tabbouleh', price: 179, description: 'Fresh parsley and bulgur salad.', isVeg: true, image: img('1546069901-ba9599a7e63c', 400) }, { id: mid(), name: 'Mixed Grill Platter', price: 599, description: 'Assorted Middle Eastern grills.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) }, { id: mid(), name: 'Lamb Kofta', price: 399, description: 'Spiced lamb meatballs with tzatziki.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) }]}]
  },
  { id: 56, name: 'Burmese Kitchen', image: img('1562565652-2e2c42aa1a42'), cuisine: 'Burmese, Asian, Noodles', rating: 4.1, deliveryTime: 35, minOrder: 200, isOpen: true, offer: '₹50 OFF', address: 'Mayanagri, Mumbai', totalRatings: 900, costForTwo: 500, isVeg: false, tags: ['Thai'],
    menu: [{ category: 'Burmese Specials', items: [{ id: mid(), name: 'Khow Suey', price: 249, description: 'Coconut curry noodle soup.', isVeg: true, isRecommended: true, image: img('1562565652-2e2c42aa1a42', 400) }, { id: mid(), name: 'Chicken Khow Suey', price: 299, description: 'With chicken and crispy noodles.', isVeg: false, image: img('1562565652-2e2c42aa1a42', 400) }, { id: mid(), name: 'Burmese Salad', price: 179, description: 'Crunchy mixed salad with sesame.', isVeg: true, image: img('1546069901-ba9599a7e63c', 400) }, { id: mid(), name: 'Samosa Soup', price: 149, description: 'Unique samosa in broth.', isVeg: true, image: img('1562565652-2e2c42aa1a42', 400) }]}]
  },
  { id: 57, name: 'Frankie Zone', image: img('1626700051175-6818013e1d4f'), cuisine: 'Frankies, Wraps, Indian', rating: 4.0, deliveryTime: 15, minOrder: 80, isOpen: true, offer: '₹25 OFF', address: 'FC Road, Pune', totalRatings: 5800, costForTwo: 200, isVeg: false, tags: ['Rolls & Wraps'],
    menu: [{ category: 'Frankies', items: [{ id: mid(), name: 'Paneer Frankie', price: 89, description: 'Paneer tikka in rumali roti.', isVeg: true, isRecommended: true, image: img('1626700051175-6818013e1d4f', 400) }, { id: mid(), name: 'Chicken Frankie', price: 109, description: 'Spiced chicken in frankie wrap.', isVeg: false, image: img('1626700051175-6818013e1d4f', 400) }, { id: mid(), name: 'Egg Frankie', price: 69, description: 'Egg with onion and chutney.', isVeg: false, image: img('1626700051175-6818013e1d4f', 400) }, { id: mid(), name: 'Mixed Veg Frankie', price: 79, description: 'Mixed vegetables in wrap.', isVeg: true, image: img('1626700051175-6818013e1d4f', 400) }, { id: mid(), name: 'Schezwan Paneer Frankie', price: 99, description: 'Spicy paneer frankie.', isVeg: true, image: img('1626700051175-6818013e1d4f', 400) }]}]
  },
  { id: 58, name: 'Kashmiri Wazwan', image: img('1585937421612-70a008356fbe'), cuisine: 'Kashmiri, Wazwan, Indian', rating: 4.6, deliveryTime: 45, minOrder: 400, isOpen: true, offer: '₹150 OFF', address: 'Lal Chowk, Srinagar', totalRatings: 1200, costForTwo: 800, isVeg: false, tags: ['North Indian', 'Kebabs'],
    menu: [{ category: 'Wazwan', items: [{ id: mid(), name: 'Rista', price: 399, description: 'Meatballs in red Kashmiri gravy.', isVeg: false, isRecommended: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Gushtaba', price: 449, description: 'Meatballs in rich yogurt gravy.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Tabakh Maaz', price: 499, description: 'Fried lamb ribs in milk.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Yakhni', price: 349, description: 'Lamb in fennel yogurt curry.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Kashmiri Pulao', price: 249, description: 'Sweet rice with dry fruits.', isVeg: true, image: img('1563379091339-03b21ab4a4f8', 400) }, { id: mid(), name: 'Kahwah', price: 69, description: 'Kashmiri green tea with saffron.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) }]}]
  },
  { id: 59, name: 'Mediterranean Grill', image: img('1414235077428-338989a2e8c0'), cuisine: 'Mediterranean, Greek, Healthy', rating: 4.4, deliveryTime: 35, minOrder: 350, isOpen: true, offer: '₹80 OFF', address: 'DLF Phase 5, Gurgaon', totalRatings: 1100, costForTwo: 800, isVeg: false, tags: ['Continental', 'Healthy'],
    menu: [{ category: 'Mediterranean', items: [{ id: mid(), name: 'Greek Gyros Plate', price: 399, description: 'Grilled meat with tzatziki and pita.', isVeg: false, isRecommended: true, image: img('1414235077428-338989a2e8c0', 400) }, { id: mid(), name: 'Moussaka', price: 449, description: 'Layered eggplant and meat casserole.', isVeg: false, image: img('1414235077428-338989a2e8c0', 400) }, { id: mid(), name: 'Souvlaki', price: 349, description: 'Grilled meat skewers with rice.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) }, { id: mid(), name: 'Spanakopita', price: 249, description: 'Spinach and feta pastry.', isVeg: true, image: img('1414235077428-338989a2e8c0', 400) }, { id: mid(), name: 'Mezze Platter', price: 499, description: 'Assorted dips, pita, and salad.', isVeg: true, image: img('1414235077428-338989a2e8c0', 400) }]}]
  },
  { id: 60, name: 'Awadhi Dastarkhwan', image: img('1585937421612-70a008356fbe'), cuisine: 'Awadhi, Lucknowi, Mughlai', rating: 4.5, deliveryTime: 40, minOrder: 300, isOpen: true, offer: '₹120 OFF', address: 'Hazratganj, Lucknow', totalRatings: 4600, costForTwo: 600, isVeg: false, tags: ['Mughlai', 'Kebabs'],
    menu: [{ category: 'Awadhi Cuisine', items: [{ id: mid(), name: 'Lucknowi Kebab Platter', price: 599, description: 'Assorted Lucknowi kebabs.', isVeg: false, isRecommended: true, image: img('1599487488170-d11ec9c172f0', 400) }, { id: mid(), name: 'Korma', price: 349, description: 'Rich nut-based creamy curry.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Biryani Royal', price: 449, description: 'Royal Awadhi style biryani.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) }, { id: mid(), name: 'Sheermal', price: 69, description: 'Saffron flavored bread.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Zarda', price: 99, description: 'Sweet saffron rice with nuts.', isVeg: true, image: img('1563379091339-03b21ab4a4f8', 400) }]}]
  },
  // ───── 61-80 ─────
  { id: 61, name: 'Dhaba 29', image: img('1585937421612-70a008356fbe'), cuisine: 'Highway Dhaba, Punjabi', rating: 4.0, deliveryTime: 30, minOrder: 150, isOpen: true, offer: '₹40 OFF', address: 'NH8, Jaipur', totalRatings: 3400, costForTwo: 350, isVeg: false, tags: ['North Indian'],
    menu: [{ category: 'Highway Specials', items: [{ id: mid(), name: 'Tawa Chicken', price: 289, description: 'Chicken cooked on iron griddle.', isVeg: false, isRecommended: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Paneer Bhurji', price: 199, description: 'Scrambled paneer with spices.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Tandoori Roti Set', price: 39, description: 'Set of 3 rotis.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Egg Bhurji', price: 129, description: 'Scrambled eggs Indian style.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }]}]
  },
  { id: 62, name: 'Bombay Sandwich Co.', image: img('1601050690597-df0568f70950'), cuisine: 'Sandwiches, Toast, Snacks', rating: 4.2, deliveryTime: 15, minOrder: 50, isOpen: true, offer: '₹20 OFF', address: 'Churchgate, Mumbai', totalRatings: 7800, costForTwo: 150, isVeg: true, tags: ['Street Food'],
    menu: [{ category: 'Sandwiches', items: [{ id: mid(), name: 'Bombay Grilled Sandwich', price: 69, description: 'Classic Mumbai style potato sandwich.', isVeg: true, isRecommended: true, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Cheese Grilled Sandwich', price: 89, description: 'Extra cheese grilled sandwich.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Club Sandwich', price: 149, description: 'Triple decker sandwich.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Junglee Sandwich', price: 99, description: 'All veggies loaded sandwich.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }]}]
  },
  { id: 63, name: 'Nagaland Kitchen', image: img('1562565652-2e2c42aa1a42'), cuisine: 'Northeast, Naga, Tribal', rating: 4.3, deliveryTime: 40, minOrder: 250, isOpen: true, offer: '₹70 OFF', address: 'Laitumkhrah, Shillong', totalRatings: 800, costForTwo: 500, isVeg: false, tags: ['Chinese'],
    menu: [{ category: 'Northeast Specials', items: [{ id: mid(), name: 'Smoked Pork with Bamboo', price: 349, description: 'Signature Naga smoked pork dish.', isVeg: false, isRecommended: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Naga Curry', price: 299, description: 'Fiery ghost pepper curry.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Axone Pork', price: 329, description: 'Fermented soybean pork curry.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Jadoh', price: 199, description: 'Khasi red rice with pork.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) }]}]
  },
  { id: 64, name: 'Tibetan Delight', image: img('1496116218417-1a781b1c416c'), cuisine: 'Tibetan, Momos, Thukpa', rating: 4.2, deliveryTime: 25, minOrder: 100, isOpen: true, offer: '₹30 OFF', address: 'McLeod Ganj, Dharamshala', totalRatings: 2100, costForTwo: 200, isVeg: false, tags: ['Momos'],
    menu: [{ category: 'Tibetan Food', items: [{ id: mid(), name: 'Thukpa', price: 149, description: 'Tibetan noodle soup.', isVeg: false, isRecommended: true, image: img('1569718212165-3a8922ada9a4', 400) }, { id: mid(), name: 'Shapta Chicken', price: 199, description: 'Stir fried chicken Tibetan style.', isVeg: false, image: img('1563245372-f21724e3856d', 400) }, { id: mid(), name: 'Tingmo (3 pcs)', price: 79, description: 'Steamed bread buns.', isVeg: true, image: img('1496116218417-1a781b1c416c', 400) }, { id: mid(), name: 'Thenthuk', price: 159, description: 'Hand pulled noodle soup.', isVeg: false, image: img('1569718212165-3a8922ada9a4', 400) }]}]
  },
  { id: 65, name: 'Pizza Paradise', image: img('1565299624946-b28f40a0ae38'), cuisine: 'Pizza, Italian, Fast Food', rating: 4.3, deliveryTime: 25, minOrder: 200, isOpen: true, offer: '₹100 OFF above ₹499', address: 'Electronic City, Bangalore', totalRatings: 6300, costForTwo: 400, isVeg: false, tags: ['Pizza'],
    menu: [{ category: 'Gourmet Pizzas', items: [{ id: mid(), name: 'Truffle Mushroom Pizza', price: 549, description: 'Wild mushrooms with truffle oil.', isVeg: true, isRecommended: true, image: img('1565299624946-b28f40a0ae38', 400) }, { id: mid(), name: 'Chicken Tikka Pizza', price: 449, description: 'Indian fusion pizza.', isVeg: false, image: img('1565299624946-b28f40a0ae38', 400) }, { id: mid(), name: 'Four Cheese Pizza', price: 499, description: 'Mozzarella, parmesan, cheddar, feta.', isVeg: true, image: img('1513104890138-7c749659a591', 400) }, { id: mid(), name: 'Meat Lovers Pizza', price: 549, description: 'Loaded with various meats.', isVeg: false, image: img('1565299624946-b28f40a0ae38', 400) }, { id: mid(), name: 'Peri Peri Paneer Pizza', price: 399, description: 'Spicy paneer with peri peri sauce.', isVeg: true, image: img('1513104890138-7c749659a591', 400) }]}]
  },
  { id: 66, name: 'Malabar Kitchen', image: img('1589302168068-964664d93dc0'), cuisine: 'Malabar, Kerala, Biryani', rating: 4.4, deliveryTime: 35, minOrder: 200, isOpen: true, offer: '₹60 OFF', address: 'Calicut, Kerala', totalRatings: 3700, costForTwo: 400, isVeg: false, tags: ['South Indian', 'Biryani'],
    menu: [{ category: 'Malabar Specials', items: [{ id: mid(), name: 'Malabar Biryani', price: 299, description: 'Aromatic biryani with short grain rice.', isVeg: false, isRecommended: true, image: img('1563379091339-03b21ab4a4f8', 400) }, { id: mid(), name: 'Malabar Parotta Chicken', price: 199, description: 'Flaky parotta with chicken curry.', isVeg: false, image: img('1589302168068-964664d93dc0', 400) }, { id: mid(), name: 'Pathiri (6 pcs)', price: 79, description: 'Rice flour flatbread.', isVeg: true, image: img('1589302168068-964664d93dc0', 400) }, { id: mid(), name: 'Banana Chips', price: 49, description: 'Crispy Kerala banana chips.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }]}]
  },
  { id: 67, name: 'Cloud Kitchen Quick', image: img('1568901346375-23c9450c58cd'), cuisine: 'Multi Cuisine, Quick Bites', rating: 4.1, deliveryTime: 15, minOrder: 100, isOpen: true, offer: '₹35 OFF', address: 'Online Only, Pan India', totalRatings: 4500, costForTwo: 250, isVeg: false, tags: ['Burger', 'Pizza'],
    menu: [{ category: 'Quick Bites', items: [{ id: mid(), name: 'Loaded Fries', price: 149, description: 'Fries with cheese and toppings.', isVeg: true, isRecommended: true, image: img('1630384066252-19e1ad95b4f6', 400) }, { id: mid(), name: 'Chicken Nuggets (10)', price: 199, description: 'Crispy chicken nuggets.', isVeg: false, image: img('1598515214211-89a3d5a43f0c', 400) }, { id: mid(), name: 'Corn Dog (2)', price: 129, description: 'Classic American corn dogs.', isVeg: false, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Mozzarella Sticks (6)', price: 179, description: 'Crispy fried cheese sticks.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) }]}]
  },
  { id: 68, name: 'Royal Tandoor Palace', image: img('1599487488170-d11ec9c172f0'), cuisine: 'Tandoori, Mughlai, Royal', rating: 4.5, deliveryTime: 40, minOrder: 400, isOpen: true, offer: '₹130 OFF', address: 'Chandni Chowk, Delhi', totalRatings: 5200, costForTwo: 700, isVeg: false, tags: ['Tandoori', 'Mughlai'],
    menu: [{ category: 'Royal Specials', items: [{ id: mid(), name: 'Peshawari Chicken', price: 399, description: 'Frontier style grilled chicken.', isVeg: false, isRecommended: true, image: img('1599487488170-d11ec9c172f0', 400) }, { id: mid(), name: 'Barra Kebab', price: 449, description: 'Large mutton chops from charcoal.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) }, { id: mid(), name: 'Nargisi Kofta', price: 349, description: 'Egg encased in mince meat.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Kakori Kebab', price: 399, description: 'Silky smooth minced lamb kebab.', isVeg: false, image: img('1599487488170-d11ec9c172f0', 400) }]}]
  },
  { id: 69, name: 'Assam Tea House', image: img('1509042239860-f550ce710b93'), cuisine: 'Assamese, Tea, Northeast', rating: 4.1, deliveryTime: 25, minOrder: 80, isOpen: true, offer: '₹20 OFF', address: 'Dispur, Assam', totalRatings: 1100, costForTwo: 200, isVeg: false, tags: ['Coffee'],
    menu: [{ category: 'Assamese Menu', items: [{ id: mid(), name: 'Assam Tea Special', price: 49, description: 'Premium Assam CTC tea.', isVeg: true, isRecommended: true, image: img('1509042239860-f550ce710b93', 400) }, { id: mid(), name: 'Pitha (4 pcs)', price: 89, description: 'Assamese rice cake.', isVeg: true, image: img('1551024601-bec78aea704b', 400) }, { id: mid(), name: 'Duck Curry', price: 349, description: 'Traditional Assamese duck curry.', isVeg: false, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Masor Tenga', price: 199, description: 'Tangy tomato fish curry.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) }]}]
  },
  { id: 70, name: 'Protein Bowl Co.', image: img('1512621776951-a57141f2eefd'), cuisine: 'Fitness Food, Bowls, Keto', rating: 4.5, deliveryTime: 20, minOrder: 200, isOpen: true, offer: '₹50 OFF', address: 'Andheri, Mumbai', totalRatings: 2200, costForTwo: 450, isVeg: false, tags: ['Healthy'],
    menu: [{ category: 'Protein Bowls', items: [{ id: mid(), name: 'Grilled Chicken Bowl', price: 349, description: 'Chicken breast, brown rice, broccoli.', isVeg: false, isRecommended: true, image: img('1512621776951-a57141f2eefd', 400) }, { id: mid(), name: 'Salmon Poke Bowl', price: 549, description: 'Fresh salmon with sushi rice.', isVeg: false, image: img('1579871494447-9811cf80d66c', 400) }, { id: mid(), name: 'Keto Bowl', price: 399, description: 'Low carb bowl with avocado and eggs.', isVeg: true, image: img('1512621776951-a57141f2eefd', 400) }, { id: mid(), name: 'Paneer Protein Bowl', price: 299, description: 'High protein paneer with quinoa.', isVeg: true, image: img('1512621776951-a57141f2eefd', 400) }]}]
  },
  // ───── 71-100 ─────
  { id: 71, name: 'Maharaja Palace', image: img('1585937421612-70a008356fbe'), cuisine: 'Royal Indian, Thali', rating: 4.6, deliveryTime: 45, minOrder: 500, isOpen: true, offer: '₹200 OFF', address: 'Jaipur, Rajasthan', totalRatings: 2800, costForTwo: 1000, isVeg: false, tags: ['North Indian', 'Thali'], menu: [{ category: 'Royal Feast', items: [{ id: mid(), name: 'Maharaja Thali', price: 699, description: 'Premium 12-item royal thali.', isVeg: false, isRecommended: true, image: img('1546833999-b9f581b2f4d0', 400) }, { id: mid(), name: 'Paneer Lababdar', price: 299, description: 'Rich tomato cream paneer.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Dum Aloo Kashmiri', price: 249, description: 'Baby potatoes in rich gravy.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) }]}] },
  { id: 72, name: 'Asian Street Kitchen', image: img('1563245372-f21724e3856d'), cuisine: 'Pan Asian, Street Food', rating: 4.2, deliveryTime: 25, minOrder: 150, isOpen: true, offer: '₹40 OFF', address: 'Bandra, Mumbai', totalRatings: 3400, costForTwo: 350, isVeg: false, tags: ['Chinese', 'Thai'], menu: [{ category: 'Street Eats', items: [{ id: mid(), name: 'Banh Mi Sandwich', price: 199, description: 'Vietnamese style sandwich.', isVeg: false, isRecommended: true, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Vietnamese Pho', price: 279, description: 'Vietnamese beef noodle soup.', isVeg: false, image: img('1569718212165-3a8922ada9a4', 400) }, { id: mid(), name: 'Bao Buns (3)', price: 249, description: 'Soft steamed buns with fillings.', isVeg: false, image: img('1496116218417-1a781b1c416c', 400) }, { id: mid(), name: 'Korean Corn Dog', price: 129, description: 'Korean style cheese corn dog.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }]}] },
  { id: 73, name: 'South Spice Box', image: img('1630383249896-424e482df921'), cuisine: 'South Indian, Tiffin', rating: 4.3, deliveryTime: 20, minOrder: 80, isOpen: true, offer: '₹25 OFF', address: 'Adyar, Chennai', totalRatings: 8200, costForTwo: 200, isVeg: true, tags: ['South Indian', 'Dosa'], menu: [{ category: 'Tiffin Box', items: [{ id: mid(), name: 'Mini Tiffin Combo', price: 99, description: 'Idli, vada, dosa mini combo.', isVeg: true, isRecommended: true, image: img('1630383249896-424e482df921', 400) }, { id: mid(), name: 'Podi Dosa', price: 89, description: 'Dosa with spicy gun powder.', isVeg: true, image: img('1630383249896-424e482df921', 400) }, { id: mid(), name: 'Paniyaram (6 pcs)', price: 79, description: 'Round fluffy dumplings.', isVeg: true, image: img('1589302168068-964664d93dc0', 400) }]}] },
  { id: 74, name: 'Mughal Darbar', image: img('1585937421612-70a008356fbe'), cuisine: 'Mughlai, Biryani, Kebabs', rating: 4.4, deliveryTime: 40, minOrder: 300, isOpen: true, offer: '₹90 OFF', address: 'Paharganj, Delhi', totalRatings: 5600, costForTwo: 550, isVeg: false, tags: ['Mughlai', 'Biryani'], menu: [{ category: 'Mughlai Menu', items: [{ id: mid(), name: 'Murgh Musallam', price: 499, description: 'Whole chicken in rich gravy.', isVeg: false, isRecommended: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Shahi Paneer', price: 269, description: 'Paneer in nuts and cream gravy.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Nawabi Biryani', price: 399, description: 'Rich aromatic biryani.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) }]}] },
  { id: 75, name: 'Pancake Lounge', image: img('1551024601-bec78aea704b'), cuisine: 'Pancakes, Waffles, Brunch', rating: 4.3, deliveryTime: 25, minOrder: 200, isOpen: true, offer: '₹50 OFF', address: 'Indiranagar, Bangalore', totalRatings: 2400, costForTwo: 400, isVeg: true, tags: ['Desserts'], menu: [{ category: 'Pancakes', items: [{ id: mid(), name: 'Blueberry Pancakes (3)', price: 249, description: 'Fluffy pancakes with blueberry compote.', isVeg: true, isRecommended: true, image: img('1551024601-bec78aea704b', 400) }, { id: mid(), name: 'Banana Nutella Pancakes', price: 279, description: 'Topped with banana and Nutella.', isVeg: true, image: img('1551024601-bec78aea704b', 400) }, { id: mid(), name: 'Classic Buttermilk Pancakes', price: 199, description: 'With maple syrup and butter.', isVeg: true, image: img('1551024601-bec78aea704b', 400) }]}] },
  { id: 76, name: 'Biriyani Box', image: img('1563379091339-03b21ab4a4f8'), cuisine: 'Biryani, Meals, Rice', rating: 4.1, deliveryTime: 25, minOrder: 150, isOpen: true, offer: '₹40 OFF', address: 'Marathahalli, Bangalore', totalRatings: 7100, costForTwo: 300, isVeg: false, tags: ['Biryani'], menu: [{ category: 'Biryani Boxes', items: [{ id: mid(), name: 'Student Biryani', price: 149, description: 'Budget friendly chicken biryani.', isVeg: false, isRecommended: true, image: img('1563379091339-03b21ab4a4f8', 400) }, { id: mid(), name: 'Family Biryani (Serves 4)', price: 599, description: 'Large pack for family.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) }, { id: mid(), name: 'Premium Mutton Biryani', price: 349, description: 'Rich mutton dum biryani.', isVeg: false, image: img('1563379091339-03b21ab4a4f8', 400) }]}] },
  { id: 77, name: 'Wrap & Roll', image: img('1626700051175-6818013e1d4f'), cuisine: 'Wraps, Rolls, Fast Food', rating: 4.0, deliveryTime: 15, minOrder: 80, isOpen: true, offer: '₹20 OFF', address: 'Nehru Place, Delhi', totalRatings: 4300, costForTwo: 200, isVeg: false, tags: ['Rolls & Wraps'], menu: [{ category: 'Wraps', items: [{ id: mid(), name: 'Greek Wrap', price: 169, description: 'Gyro style wrap with tzatziki.', isVeg: false, isRecommended: true, image: img('1626700051175-6818013e1d4f', 400) }, { id: mid(), name: 'BBQ Ranch Wrap', price: 179, description: 'BBQ chicken with ranch sauce.', isVeg: false, image: img('1626700051175-6818013e1d4f', 400) }, { id: mid(), name: 'Mediterranean Wrap', price: 159, description: 'Falafel, hummus, and veggies.', isVeg: true, image: img('1626700051175-6818013e1d4f', 400) }]}] },
  { id: 78, name: 'Dosa Factory', image: img('1630383249896-424e482df921'), cuisine: 'Dosa, South Indian, Tiffin', rating: 4.2, deliveryTime: 20, minOrder: 70, isOpen: true, offer: '₹15 OFF', address: 'BTM Layout, Bangalore', totalRatings: 9800, costForTwo: 150, isVeg: true, tags: ['Dosa', 'South Indian'], menu: [{ category: 'Dosa Specials', items: [{ id: mid(), name: 'Family Dosa', price: 179, description: 'Extra large dosa for sharing.', isVeg: true, isRecommended: true, image: img('1630383249896-424e482df921', 400) }, { id: mid(), name: 'Pav Bhaji Dosa', price: 139, description: 'Fusion pav bhaji masala dosa.', isVeg: true, image: img('1630383249896-424e482df921', 400) }, { id: mid(), name: 'Spring Roll Dosa', price: 149, description: 'Dosa rolled like spring roll.', isVeg: true, image: img('1630383249896-424e482df921', 400) }]}] },
  { id: 79, name: 'Japanese Ramen Bar', image: img('1569718212165-3a8922ada9a4'), cuisine: 'Japanese, Ramen, Asian', rating: 4.6, deliveryTime: 35, minOrder: 300, isOpen: true, offer: '₹80 OFF', address: 'Koramangala, Bangalore', totalRatings: 1400, costForTwo: 700, isVeg: false, tags: ['Sushi'], menu: [{ category: 'Ramen', items: [{ id: mid(), name: 'Shoyu Ramen', price: 399, description: 'Classic soy sauce based ramen.', isVeg: false, isRecommended: true, image: img('1569718212165-3a8922ada9a4', 400) }, { id: mid(), name: 'Spicy Miso Ramen', price: 429, description: 'Spicy miso broth with chashu.', isVeg: false, image: img('1569718212165-3a8922ada9a4', 400) }, { id: mid(), name: 'Veg Ramen', price: 349, description: 'Vegetable broth with tofu.', isVeg: true, image: img('1569718212165-3a8922ada9a4', 400) }]}] },
  { id: 80, name: 'Midnight Munchies', image: img('1568901346375-23c9450c58cd'), cuisine: 'Late Night, Multi Cuisine', rating: 4.0, deliveryTime: 20, minOrder: 100, isOpen: true, offer: 'Flat ₹30 OFF', address: 'Pan India Delivery', totalRatings: 6700, costForTwo: 250, isVeg: false, tags: ['Burger', 'Pizza'], menu: [{ category: 'Night Specials', items: [{ id: mid(), name: 'Midnight Burger', price: 179, description: 'Our bestselling late night burger.', isVeg: false, isRecommended: true, image: img('1568901346375-23c9450c58cd', 400) }, { id: mid(), name: 'Pizza Slice Combo', price: 199, description: '2 pizza slices with fries.', isVeg: true, image: img('1513104890138-7c749659a591', 400) }, { id: mid(), name: 'Loaded Nachos', price: 149, description: 'Cheese nachos with salsa.', isVeg: true, image: img('1551504734-5ee1c4a1479b', 400) }]}] },
  // 81-90
  { id: 81, name: 'Granny Kitchen', image: img('1546833999-b9f581b2f4d0'), cuisine: 'Home Food, Comfort Food', rating: 4.4, deliveryTime: 30, minOrder: 100, isOpen: true, offer: 'Free Delivery', address: 'Koramangala, Bangalore', totalRatings: 3200, costForTwo: 250, isVeg: true, tags: ['Thali'], menu: [{ category: 'Home Style', items: [{ id: mid(), name: 'Mom\'s Dal Rice', price: 129, description: 'Comforting dal with steamed rice.', isVeg: true, isRecommended: true, image: img('1546833999-b9f581b2f4d0', 400) }, { id: mid(), name: 'Aloo Gobhi Roti', price: 109, description: 'Home style potato cauliflower.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Khichdi Kadhi', price: 119, description: 'Comfort food classic.', isVeg: true, image: img('1546833999-b9f581b2f4d0', 400) }]}] },
  { id: 82, name: 'Amritsar Sweets', image: img('1551024601-bec78aea704b'), cuisine: 'Sweets, Mithai, Indian', rating: 4.3, deliveryTime: 20, minOrder: 100, isOpen: true, offer: '₹30 OFF', address: 'Lawrence Road, Amritsar', totalRatings: 7800, costForTwo: 200, isVeg: true, tags: ['Desserts'], menu: [{ category: 'Indian Sweets', items: [{ id: mid(), name: 'Gulab Jamun (kg)', price: 349, description: 'Classic milk dumplings.', isVeg: true, isRecommended: true, image: img('1551024601-bec78aea704b', 400) }, { id: mid(), name: 'Jalebi (500g)', price: 199, description: 'Crispy spiral sweets.', isVeg: true, image: img('1551024601-bec78aea704b', 400) }, { id: mid(), name: 'Rasgulla (kg)', price: 299, description: 'Bengali spongy cheese balls.', isVeg: true, image: img('1551024601-bec78aea704b', 400) }, { id: mid(), name: 'Barfi Assorted (500g)', price: 249, description: 'Mixed barfi selection.', isVeg: true, image: img('1551024601-bec78aea704b', 400) }]}] },
  { id: 83, name: 'Seoul Kitchen', image: img('1498654896616-c77836568761'), cuisine: 'Korean, Fried Chicken', rating: 4.4, deliveryTime: 30, minOrder: 250, isOpen: true, offer: '₹60 OFF', address: 'HSR Layout, Bangalore', totalRatings: 1600, costForTwo: 600, isVeg: false, tags: ['Korean'], menu: [{ category: 'Korean Menu', items: [{ id: mid(), name: 'Army Stew', price: 449, description: 'Hearty Korean army base stew.', isVeg: false, isRecommended: true, image: img('1498654896616-c77836568761', 400) }, { id: mid(), name: 'Korean Fried Chicken', price: 399, description: 'Double fried crispy chicken.', isVeg: false, image: img('1598515214211-89a3d5a43f0c', 400) }, { id: mid(), name: 'Kimchi Jjigae', price: 299, description: 'Spicy kimchi stew.', isVeg: false, image: img('1498654896616-c77836568761', 400) }]}] },
  { id: 84, name: 'Wood Fired Pizza Co', image: img('1513104890138-7c749659a591'), cuisine: 'Artisan Pizza, Italian', rating: 4.7, deliveryTime: 30, minOrder: 300, isOpen: true, offer: '₹100 OFF', address: 'Indiranagar, Bangalore', totalRatings: 2900, costForTwo: 600, isVeg: false, tags: ['Pizza'], menu: [{ category: 'Artisan Pizzas', items: [{ id: mid(), name: 'Neapolitan Margherita', price: 449, description: 'San Marzano tomato, buffalo mozzarella.', isVeg: true, isRecommended: true, image: img('1513104890138-7c749659a591', 400) }, { id: mid(), name: 'Diavola', price: 499, description: 'Spicy salami with chili.', isVeg: false, image: img('1565299624946-b28f40a0ae38', 400) }, { id: mid(), name: 'Prosciutto & Arugula', price: 549, description: 'Parma ham with fresh rocket.', isVeg: false, image: img('1565299624946-b28f40a0ae38', 400) }]}] },
  { id: 85, name: 'Bihari Litti House', image: img('1585937421612-70a008356fbe'), cuisine: 'Bihari, Litti Chokha', rating: 4.1, deliveryTime: 30, minOrder: 100, isOpen: true, offer: '₹25 OFF', address: 'Boring Road, Patna', totalRatings: 2300, costForTwo: 200, isVeg: true, tags: ['North Indian'], menu: [{ category: 'Bihari', items: [{ id: mid(), name: 'Litti Chokha (4 pcs)', price: 119, description: 'Baked wheat balls with mashed veggies.', isVeg: true, isRecommended: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Sattu Paratha', price: 69, description: 'Roasted gram flour stuffed bread.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Thekua (8 pcs)', price: 79, description: 'Sweet wheat flour cookies.', isVeg: true, image: img('1551024601-bec78aea704b', 400) }]}] },
  { id: 86, name: 'Sindhi Rasoi', image: img('1585937421612-70a008356fbe'), cuisine: 'Sindhi, Indian, Vegetarian', rating: 4.2, deliveryTime: 30, minOrder: 150, isOpen: true, offer: '₹35 OFF', address: 'Ulhasnagar, Mumbai', totalRatings: 1800, costForTwo: 300, isVeg: true, tags: ['North Indian'], menu: [{ category: 'Sindhi Cuisine', items: [{ id: mid(), name: 'Sindhi Kadhi', price: 179, description: 'Tangy gram flour curry with veggies.', isVeg: true, isRecommended: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Dal Pakwan', price: 99, description: 'Chana dal with crispy flatbread.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Sai Bhaji', price: 159, description: 'Spinach mixed vegetable curry.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) }]}] },
  { id: 87, name: 'Mangalorean Fish Land', image: img('1565557623262-b51c2513a641'), cuisine: 'Mangalorean, Coastal, Fish', rating: 4.5, deliveryTime: 35, minOrder: 250, isOpen: true, offer: '₹70 OFF', address: 'Mangalore, Karnataka', totalRatings: 2600, costForTwo: 500, isVeg: false, tags: ['Seafood'], menu: [{ category: 'Coastal', items: [{ id: mid(), name: 'Neer Dosa Fish Curry', price: 249, description: 'Thin rice crepes with fish curry.', isVeg: false, isRecommended: true, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Kane Fry (2 pcs)', price: 299, description: 'Crispy fried ladyfish.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Ghee Roast Chicken', price: 349, description: 'Mangalorean spiced ghee chicken.', isVeg: false, image: img('1598515214211-89a3d5a43f0c', 400) }]}] },
  { id: 88, name: 'Italian Corner', image: img('1414235077428-338989a2e8c0'), cuisine: 'Italian, European, Cafe', rating: 4.3, deliveryTime: 30, minOrder: 250, isOpen: true, offer: '₹55 OFF', address: 'SDA Market, Delhi', totalRatings: 2100, costForTwo: 550, isVeg: false, tags: ['Pasta', 'Pizza'], menu: [{ category: 'Italian', items: [{ id: mid(), name: 'Bruschetta (4 pcs)', price: 199, description: 'Toasted bread with tomato basil.', isVeg: true, isRecommended: true, image: img('1414235077428-338989a2e8c0', 400) }, { id: mid(), name: 'Ravioli', price: 399, description: 'Stuffed pasta in cream sauce.', isVeg: true, image: img('1551183053-bf91a1d81141', 400) }, { id: mid(), name: 'Chicken Piccata', price: 449, description: 'Chicken in lemon caper butter sauce.', isVeg: false, image: img('1414235077428-338989a2e8c0', 400) }]}] },
  { id: 89, name: 'Chaat Republic', image: img('1601050690597-df0568f70950'), cuisine: 'Chaat, Indian Street Food', rating: 4.1, deliveryTime: 15, minOrder: 40, isOpen: true, offer: '₹15 OFF', address: 'Brigade Road, Bangalore', totalRatings: 5400, costForTwo: 100, isVeg: true, tags: ['Street Food'], menu: [{ category: 'Chaat', items: [{ id: mid(), name: 'Delhi Chaat Platter', price: 149, description: 'Assorted chaat combination.', isVeg: true, isRecommended: true, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Ram Ladoo (8 pcs)', price: 49, description: 'Moong dal fritters.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Gol Gappe (10 pcs)', price: 59, description: 'Crispy puris with flavored water.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }]}] },
  { id: 90, name: 'Smoke House Deli', image: img('1529193591184-b1d58069ecdd'), cuisine: 'European, Cafe, Brunch', rating: 4.5, deliveryTime: 35, minOrder: 400, isOpen: true, offer: '₹100 OFF', address: 'Lavelle Road, Bangalore', totalRatings: 1900, costForTwo: 900, isVeg: false, tags: ['Continental'], menu: [{ category: 'Cafe Menu', items: [{ id: mid(), name: 'Eggs Benedict', price: 399, description: 'Poached eggs on muffin with hollandaise.', isVeg: false, isRecommended: true, image: img('1414235077428-338989a2e8c0', 400) }, { id: mid(), name: 'Smoked Salmon Bagel', price: 449, description: 'Bagel with cream cheese and smoked salmon.', isVeg: false, image: img('1414235077428-338989a2e8c0', 400) }, { id: mid(), name: 'Avocado Toast', price: 299, description: 'Sourdough with smashed avocado.', isVeg: true, image: img('1512621776951-a57141f2eefd', 400) }]}] },
  // 91-100
  { id: 91, name: 'Tandoori Junction', image: img('1599487488170-d11ec9c172f0'), cuisine: 'Tandoori, Indian, Kebabs', rating: 4.2, deliveryTime: 30, minOrder: 200, isOpen: true, offer: '₹45 OFF', address: 'Kothrud, Pune', totalRatings: 3800, costForTwo: 400, isVeg: false, tags: ['Tandoori'], menu: [{ category: 'Tandoor', items: [{ id: mid(), name: 'Tandoori Mixed Grill', price: 499, description: 'Assorted tandoori items.', isVeg: false, isRecommended: true, image: img('1599487488170-d11ec9c172f0', 400) }, { id: mid(), name: 'Tandoori Mushroom', price: 199, description: 'Stuffed mushrooms from tandoor.', isVeg: true, image: img('1599487488170-d11ec9c172f0', 400) }, { id: mid(), name: 'Fish Amritsari', price: 299, description: 'Crispy battered fish fry.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) }]}] },
  { id: 92, name: 'Maharashtrian Kitchen', image: img('1585937421612-70a008356fbe'), cuisine: 'Maharashtrian, Thali', rating: 4.3, deliveryTime: 30, minOrder: 150, isOpen: true, offer: '₹40 OFF', address: 'Deccan, Pune', totalRatings: 4100, costForTwo: 300, isVeg: true, tags: ['Thali'], menu: [{ category: 'Maharashtrian', items: [{ id: mid(), name: 'Puran Poli (3 pcs)', price: 99, description: 'Sweet stuffed flatbread.', isVeg: true, isRecommended: true, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Misal Pav', price: 89, description: 'Spicy sprout curry with bread.', isVeg: true, image: img('1601050690597-df0568f70950', 400) }, { id: mid(), name: 'Bharli Vangi', price: 179, description: 'Stuffed eggplant curry.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Sabudana Khichdi', price: 99, description: 'Tapioca pearl stir fry.', isVeg: true, image: img('1585937421612-70a008356fbe', 400) }]}] },
  { id: 93, name: 'Calcutta Rolls', image: img('1626700051175-6818013e1d4f'), cuisine: 'Rolls, Kolkata Style', rating: 4.1, deliveryTime: 15, minOrder: 60, isOpen: true, offer: '₹15 OFF', address: 'Park Circus, Kolkata', totalRatings: 9200, costForTwo: 150, isVeg: false, tags: ['Rolls & Wraps'], menu: [{ category: 'Kolkata Rolls', items: [{ id: mid(), name: 'Double Egg Roll', price: 59, description: 'Classic double egg Kolkata roll.', isVeg: false, isRecommended: true, image: img('1626700051175-6818013e1d4f', 400) }, { id: mid(), name: 'Mutton Roll', price: 99, description: 'Juicy mutton kathi roll.', isVeg: false, image: img('1626700051175-6818013e1d4f', 400) }, { id: mid(), name: 'Mixed Roll', price: 89, description: 'Egg and chicken combined.', isVeg: false, image: img('1626700051175-6818013e1d4f', 400) }]}] },
  { id: 94, name: 'North East Flavors', image: img('1562565652-2e2c42aa1a42'), cuisine: 'Northeast Indian, Manipuri', rating: 4.2, deliveryTime: 35, minOrder: 200, isOpen: true, offer: '₹50 OFF', address: 'Imphal, Manipur', totalRatings: 700, costForTwo: 400, isVeg: false, tags: ['Chinese'], menu: [{ category: 'Northeast Cuisine', items: [{ id: mid(), name: 'Eromba', price: 149, description: 'Fermented fish and vegetable curry.', isVeg: false, isRecommended: true, image: img('1585937421612-70a008356fbe', 400) }, { id: mid(), name: 'Chamthong', price: 129, description: 'Clear vegetable stew.', isVeg: true, image: img('1562565652-2e2c42aa1a42', 400) }, { id: mid(), name: 'Singju Salad', price: 99, description: 'Spicy fermented fish salad.', isVeg: false, image: img('1546069901-ba9599a7e63c', 400) }]}] },
  { id: 95, name: 'Chai Point', image: img('1509042239860-f550ce710b93'), cuisine: 'Chai, Snacks, Quick Bites', rating: 4.0, deliveryTime: 10, minOrder: 30, isOpen: true, offer: 'Free Biscuits', address: 'Pan India', totalRatings: 22000, costForTwo: 100, isVeg: true, tags: ['Coffee', 'Street Food'], menu: [{ category: 'Chai', items: [{ id: mid(), name: 'Power Chai', price: 39, description: 'Strong CTC chai.', isVeg: true, isRecommended: true, image: img('1509042239860-f550ce710b93', 400) }, { id: mid(), name: 'Ginger Chai', price: 39, description: 'Chai with fresh ginger.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) }, { id: mid(), name: 'Iced Chai', price: 69, description: 'Cold brew iced chai.', isVeg: true, image: img('1509042239860-f550ce710b93', 400) }, { id: mid(), name: 'Bun Maska', price: 39, description: 'Irani style buttered bun.', isVeg: true, image: img('1565557623262-b51c2513a641', 400) }]}] },
  { id: 96, name: 'Fusion Bites', image: img('1568901346375-23c9450c58cd'), cuisine: 'Fusion, Indo-Chinese, Modern', rating: 4.3, deliveryTime: 25, minOrder: 200, isOpen: true, offer: '₹55 OFF', address: 'Powai, Mumbai', totalRatings: 2800, costForTwo: 450, isVeg: false, tags: ['Chinese', 'Burger'], menu: [{ category: 'Fusion Menu', items: [{ id: mid(), name: 'Butter Chicken Pizza', price: 399, description: 'Indian butter chicken on pizza crust.', isVeg: false, isRecommended: true, image: img('1565299624946-b28f40a0ae38', 400) }, { id: mid(), name: 'Tandoori Pasta', price: 299, description: 'Pasta in tandoori cream sauce.', isVeg: true, image: img('1551183053-bf91a1d81141', 400) }, { id: mid(), name: 'Naan Tacos', price: 179, description: 'Mini naan with tikka filling.', isVeg: false, image: img('1551504734-5ee1c4a1479b', 400) }]}] },
  { id: 97, name: 'Bengali Sweet House', image: img('1551024601-bec78aea704b'), cuisine: 'Bengali Sweets, Mishti', rating: 4.6, deliveryTime: 20, minOrder: 100, isOpen: true, offer: '₹30 OFF', address: 'Esplanade, Kolkata', totalRatings: 6500, costForTwo: 200, isVeg: true, tags: ['Desserts'], menu: [{ category: 'Bengali Sweets', items: [{ id: mid(), name: 'Sandesh Assorted (500g)', price: 249, description: 'Famous Bengal cottage cheese sweets.', isVeg: true, isRecommended: true, image: img('1551024601-bec78aea704b', 400) }, { id: mid(), name: 'Chomchom (6 pcs)', price: 149, description: 'Oval shaped cheese balls.', isVeg: true, image: img('1551024601-bec78aea704b', 400) }, { id: mid(), name: 'Pantua (6 pcs)', price: 129, description: 'Dark fried milk balls.', isVeg: true, image: img('1551024601-bec78aea704b', 400) }, { id: mid(), name: 'Nolen Gur Rosogolla', price: 179, description: 'Rasgulla with date palm jaggery.', isVeg: true, image: img('1551024601-bec78aea704b', 400) }]}] },
  { id: 98, name: 'Tamil Nadu Express', image: img('1589302168068-964664d93dc0'), cuisine: 'Tamil, South Indian', rating: 4.2, deliveryTime: 25, minOrder: 100, isOpen: true, offer: '₹20 OFF', address: 'Anna Nagar, Chennai', totalRatings: 5100, costForTwo: 200, isVeg: true, tags: ['South Indian', 'Dosa'], menu: [{ category: 'Tamil Classics', items: [{ id: mid(), name: 'Kothu Parotta', price: 119, description: 'Shredded parotta with egg and masala.', isVeg: false, isRecommended: true, image: img('1589302168068-964664d93dc0', 400) }, { id: mid(), name: 'Sambar Rice', price: 89, description: 'Rice mixed with lentil sambar.', isVeg: true, image: img('1589302168068-964664d93dc0', 400) }, { id: mid(), name: 'Curd Rice', price: 69, description: 'Yogurt rice with tempering.', isVeg: true, image: img('1589302168068-964664d93dc0', 400) }, { id: mid(), name: 'Rasam Vada', price: 89, description: 'Vada dipped in hot rasam.', isVeg: true, image: img('1589302168068-964664d93dc0', 400) }]}] },
  { id: 99, name: 'Sichuan House', image: img('1563245372-f21724e3856d'), cuisine: 'Sichuan, Chinese, Spicy', rating: 4.4, deliveryTime: 30, minOrder: 250, isOpen: true, offer: '₹70 OFF', address: 'GK 2, Delhi', totalRatings: 1300, costForTwo: 600, isVeg: false, tags: ['Chinese'], menu: [{ category: 'Sichuan', items: [{ id: mid(), name: 'Mapo Tofu', price: 249, description: 'Tofu in spicy Sichuan sauce.', isVeg: true, isRecommended: true, image: img('1563245372-f21724e3856d', 400) }, { id: mid(), name: 'Sichuan Chilli Chicken', price: 299, description: 'Extremely spicy dry chicken.', isVeg: false, image: img('1563245372-f21724e3856d', 400) }, { id: mid(), name: 'Hot Pot Noodles', price: 349, description: 'Numbing spicy hot pot.', isVeg: false, image: img('1563245372-f21724e3856d', 400) }, { id: mid(), name: 'Sichuan Prawns', price: 399, description: 'Prawns in fiery Sichuan pepper sauce.', isVeg: false, image: img('1563245372-f21724e3856d', 400) }]}] },
  { id: 100, name: 'The Grand Buffet', image: img('1414235077428-338989a2e8c0'), cuisine: 'Multi Cuisine, International', rating: 4.8, deliveryTime: 45, minOrder: 500, isOpen: true, offer: '₹250 OFF above ₹1499', address: 'Aerocity, Delhi', totalRatings: 3200, costForTwo: 2000, isVeg: false, tags: ['Continental', 'Italian'], menu: [{ category: 'Grand Menu', items: [{ id: mid(), name: 'Grand Platter for 2', price: 1499, description: 'International cuisine sampler.', isVeg: false, isRecommended: true, image: img('1414235077428-338989a2e8c0', 400) }, { id: mid(), name: 'Lobster Thermidor', price: 1999, description: 'Classic French lobster dish.', isVeg: false, image: img('1565557623262-b51c2513a641', 400) }, { id: mid(), name: 'Wagyu Steak', price: 2499, description: 'Premium Japanese Wagyu beef.', isVeg: false, image: img('1529193591184-b1d58069ecdd', 400) }, { id: mid(), name: 'Truffle Risotto', price: 799, description: 'Black truffle mushroom risotto.', isVeg: true, image: img('1414235077428-338989a2e8c0', 400) }, { id: mid(), name: 'Crème Brûlée', price: 399, description: 'Classic French custard dessert.', isVeg: true, image: img('1551024601-bec78aea704b', 400) }]}] },
];

// ─── Helper to get restaurant by ID ──────────────────────────
export const getRestaurantById = (id) => ALL_RESTAURANTS.find(r => r.id === Number(id));

// ─── Get top rated restaurants ───────────────────────────────
export const getTopRatedRestaurants = (limit = 12) => 
  [...ALL_RESTAURANTS]
    .filter(r => r.isOpen)
    .sort((a, b) => b.rating - a.rating || b.totalRatings - a.totalRatings)
    .slice(0, limit);

// ─── Get restaurants by cuisine ──────────────────────────────
export const getRestaurantsByCuisine = (cuisine) =>
  ALL_RESTAURANTS.filter(r => 
    r.cuisine.toLowerCase().includes(cuisine.toLowerCase()) ||
    r.tags?.some(t => t.toLowerCase() === cuisine.toLowerCase())
  );

// ─── Search restaurants ──────────────────────────────────────
export const searchRestaurants = (query) => {
  const q = query.toLowerCase();
  return ALL_RESTAURANTS.filter(r =>
    r.name.toLowerCase().includes(q) ||
    r.cuisine.toLowerCase().includes(q) ||
    r.tags?.some(t => t.toLowerCase().includes(q)) ||
    r.menu?.some(cat => cat.items.some(item => item.name.toLowerCase().includes(q)))
  );
};

// ─── Get total counts ────────────────────────────────────────
export const getTotalFoodItems = () => 
  ALL_RESTAURANTS.reduce((acc, r) => 
    acc + (r.menu?.reduce((a, c) => a + c.items.length, 0) || 0), 0
  );

export const getTotalRestaurants = () => ALL_RESTAURANTS.length;

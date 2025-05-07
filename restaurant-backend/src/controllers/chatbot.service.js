const Fuse = require("fuse.js");

// Welcome message for new users
const welcomeMessage = "Welcome to our restaurant! 👋 I'm here to help you with:\n" +
  "• <a href='/menu' class='text-blue-500 hover:text-blue-600'>View our menu</a> and discover our dishes\n" +
  "• <a href='/booking' class='text-blue-500 hover:text-blue-600'>Make a reservation</a>\n" +
  "• <a href='/reviews' class='text-blue-500 hover:text-blue-600'>Read customer reviews</a>\n" +
  "• <a href='/contact' class='text-blue-500 hover:text-blue-600'>Contact us</a>\n" +
  "• <a href='/about' class='text-blue-500 hover:text-blue-600'>Learn about us</a>\n\n" +
  "How can I assist you today?";

// Enhanced FAQ database with more comprehensive responses and interactive links
const faq = [
  // English Questions
  {
    question: "i want to see the menu",
    answer: "Of course! You can explore our delicious menu here: <a href='/menu' class='text-blue-500 hover:text-blue-600'>View Menu</a>. We offer:\n" +
      "• <a href='/menu#appetizers' class='text-blue-500 hover:text-blue-600'>Appetizers</a>\n" +
      "• <a href='/menu#main-courses' class='text-blue-500 hover:text-blue-600'>Main Courses</a>\n" +
      "• <a href='/menu#desserts' class='text-blue-500 hover:text-blue-600'>Desserts</a>\n" +
      "• <a href='/menu#beverages' class='text-blue-500 hover:text-blue-600'>Beverages</a>\n\n" +
      "Would you like to know about our <a href='/menu#chef-special' class='text-blue-500 hover:text-blue-600'>Chef's Special</a> or <a href='/menu#daily-specials' class='text-blue-500 hover:text-blue-600'>Daily Specials</a>?"
  },
  {
    question: "show me the menu",
    answer: "Here's our menu: <a href='/menu' class='text-blue-500 hover:text-blue-600'>View Menu</a>. We have:\n" +
      "• <a href='/menu#appetizers' class='text-blue-500 hover:text-blue-600'>Appetizers</a>\n" +
      "• <a href='/menu#main-courses' class='text-blue-500 hover:text-blue-600'>Main Courses</a>\n" +
      "• <a href='/menu#desserts' class='text-blue-500 hover:text-blue-600'>Desserts</a>\n" +
      "• <a href='/menu#beverages' class='text-blue-500 hover:text-blue-600'>Beverages</a>\n\n" +
      "Check out our <a href='/menu#chef-special' class='text-blue-500 hover:text-blue-600'>Chef's Special</a> for today's recommendations!"
  },
  {
    question: "i want to book a table",
    answer: "You can easily book a table through our reservation system: <a href='/book' class='text-blue-500 hover:text-blue-600'>Book Now</a>. Here's what you can do:\n" +
      "• Choose your preferred date and time\n" +
      "• Select the number of guests\n" +
      "• Add any special requests\n" +
      "• Get instant confirmation\n\n" +
      "For special occasions or large groups, you can also <a href='/contact' class='text-blue-500 hover:text-blue-600'>contact us directly</a>. How many people will be dining with us?"
  },
  {
    question: "make a reservation",
    answer: "I'll help you make a reservation! Please visit: <a href='/book' class='text-blue-500 hover:text-blue-600'>Book Now</a>. You can:\n" +
      "• Select your preferred date and time\n" +
      "• Choose your table size\n" +
      "• Add special requests\n" +
      "• Get instant confirmation\n\n" +
      "For groups of 8 or more, please <a href='/contact' class='text-blue-500 hover:text-blue-600'>contact us</a> for special arrangements."
  },
  {
    question: "how can i read reviews",
    answer: "You can read our customer reviews here: <a href='/reviews' class='text-blue-500 hover:text-blue-600'>Read Reviews</a>. Our guests love sharing their experiences! You can:\n" +
      "• Read verified customer reviews\n" +
      "• See photos from our guests\n" +
      "• <a href='/reviews#write-review' class='text-blue-500 hover:text-blue-600'>Share your experience</a>\n\n" +
      "Would you like to <a href='/booking' class='text-blue-500 hover:text-blue-600'>book a table</a> and experience it yourself?"
  },
  {
    question: "what are your opening hours",
    answer: "We are open daily from 9 AM to 11 PM. Here's our schedule:\n" +
      "• Kitchen Hours: 9 AM - 10:30 PM\n" +
      "• Bar Hours: 9 AM - 11 PM\n" +
      "• Weekend Brunch: 9 AM - 2 PM\n\n" +
      "We're also open on holidays, but we recommend <a href='/booking' class='text-blue-500 hover:text-blue-600'>making a reservation</a> during these times. For special events, please <a href='/contact' class='text-blue-500 hover:text-blue-600'>contact us</a>."
  },
  {
    question: "where are you located",
    answer: "We are located in Kasr El Kebir, Morocco. Here's how to find us:\n" +
      "• <a href='https://www.google.com/maps/search/?api=1&query=Kasr+El+Kebir+Morocco' target='_blank' class='text-blue-500 hover:text-blue-600'>Get Directions</a>\n" +
      "• <a href='/contact' class='text-blue-500 hover:text-blue-600'>View Contact Information</a>\n" +
      "• <a href='/parking' class='text-blue-500 hover:text-blue-600'>Parking Information</a>\n\n" +
      "We're easily accessible by car and public transportation. Need help finding us? <a href='/contact' class='text-blue-500 hover:text-blue-600'>Contact us</a>!"
  },
  {
    question: "do you have parking",
    answer: "Yes, we have a dedicated parking area for our guests. Here's what you need to know:\n" +
      "• Free parking for all guests\n" +
      "• 24/7 security monitoring\n" +
      "• Easy access from main street\n" +
      "• <a href='https://www.google.com/maps/search/?api=1&query=Kasr+El+Kebir+Morocco' target='_blank' class='text-blue-500 hover:text-blue-600'>View on Map</a>\n\n" +
      "For valet parking or special arrangements, please <a href='/contact' class='text-blue-500 hover:text-blue-600'>contact us</a>."
  },
  {
    question: "what payment methods do you accept",
    answer: "We accept various payment methods for your convenience:\n" +
      "• Cash\n" +
      "• Credit Cards (Visa, MasterCard)\n" +
      "• Mobile Payments\n" +
      "• Digital Wallets\n\n" +
      "You can also <a href='/menu' class='text-blue-500 hover:text-blue-600'>view our menu</a> to plan your order! For large groups or special events, please <a href='/contact' class='text-blue-500 hover:text-blue-600'>contact us</a> for payment arrangements."
  },
  {
    question: "do you have vegetarian options",
    answer: "Yes, we offer a variety of vegetarian dishes! You can find them marked with a 🌱 symbol on our menu. Here's what we offer:\n" +
      "• <a href='/menu#vegetarian' class='text-blue-500 hover:text-blue-600'>Vegetarian Menu</a>\n" +
      "• <a href='/menu#vegan' class='text-blue-500 hover:text-blue-600'>Vegan Options</a>\n" +
      "• <a href='/menu#gluten-free' class='text-blue-500 hover:text-blue-600'>Gluten-Free Choices</a>\n\n" +
      "Would you like me to recommend some popular vegetarian dishes? You can also <a href='/contact' class='text-blue-500 hover:text-blue-600'>contact us</a> for special dietary requirements."
  },

  // French Questions
  {
    question: "je veux voir le menu",
    answer: "Bien sûr ! Voici notre menu : <a href='/menu' class='text-blue-500 hover:text-blue-600'>Voir le Menu</a>. Nous proposons :\n" +
      "• <a href='/menu#entrees' class='text-blue-500 hover:text-blue-600'>Entrées</a>\n" +
      "• <a href='/menu#plats' class='text-blue-500 hover:text-blue-600'>Plats Principaux</a>\n" +
      "• <a href='/menu#desserts' class='text-blue-500 hover:text-blue-600'>Desserts</a>\n" +
      "• <a href='/menu#boissons' class='text-blue-500 hover:text-blue-600'>Boissons</a>\n\n" +
      "Découvrez nos <a href='/menu#special-chef' class='text-blue-500 hover:text-blue-600'>Spécialités du Chef</a> !"
  },
  {
    question: "je veux réserver une table",
    answer: "Vous pouvez réserver une table ici : <a href='/booking' class='text-blue-500 hover:text-blue-600'>Réserver</a>. Voici ce que vous pouvez faire :\n" +
      "• Choisir votre date et heure préférées\n" +
      "• Sélectionner le nombre de personnes\n" +
      "• Ajouter des demandes spéciales\n" +
      "• Obtenir une confirmation instantanée\n\n" +
      "Pour les groupes de 8 personnes ou plus, veuillez <a href='/contact' class='text-blue-500 hover:text-blue-600'>nous contacter</a>."
  },
  {
    question: "quelles sont vos heures d'ouverture",
    answer: "Nous sommes ouverts tous les jours de 9h à 23h. Voici notre horaire :\n" +
      "• Service de cuisine : 9h - 22h30\n" +
      "• Bar : 9h - 23h\n" +
      "• Brunch du weekend : 9h - 14h\n\n" +
      "Nous sommes également ouverts les jours fériés. <a href='/booking' class='text-blue-500 hover:text-blue-600'>Réserver une table</a> pour votre visite!"
  },

  // Arabic Questions
  {
    question: "أريد مشاهدة القائمة",
    answer: "تفضل، هذه صفحة القائمة: <a href='/menu' class='text-blue-500 hover:text-blue-600'>عرض القائمة</a>. لدينا:\n" +
      "• <a href='/menu#المقبلات' class='text-blue-500 hover:text-blue-600'>المقبلات</a>\n" +
      "• <a href='/menu#الأطباق-الرئيسية' class='text-blue-500 hover:text-blue-600'>الأطباق الرئيسية</a>\n" +
      "• <a href='/menu#الحلويات' class='text-blue-500 hover:text-blue-600'>الحلويات</a>\n" +
      "• <a href='/menu#المشروبات' class='text-blue-500 hover:text-blue-600'>المشروبات</a>\n\n" +
      "اكتشف <a href='/menu#طبق-الشيف' class='text-blue-500 hover:text-blue-600'>طبق الشيف الخاص</a> اليوم!"
  },
  {
    question: "أريد الحجز",
    answer: "يمكنك الحجز من هنا: <a href='/booking' class='text-blue-500 hover:text-blue-600'>احجز الآن</a>. يمكنك:\n" +
      "• اختيار التاريخ والوقت المفضل\n" +
      "• تحديد عدد الأشخاص\n" +
      "• إضافة طلبات خاصة\n" +
      "• الحصول على تأكيد فوري\n\n" +
      "للحفلات أو المجموعات الكبيرة، يرجى <a href='/contact' class='text-blue-500 hover:text-blue-600'>الاتصال بنا</a>."
  },
  {
    question: "متى تفتحون",
    answer: "نحن نفتح من التاسعة صباحًا حتى الحادية عشر مساءً. مواعيدنا:\n" +
      "• المطبخ: 9 صباحًا - 10:30 مساءً\n" +
      "• البار: 9 صباحًا - 11 مساءً\n" +
      "• برنش نهاية الأسبوع: 9 صباحًا - 2 ظهرًا\n\n" +
      "نحن مفتوحون أيضًا في أيام العطل. <a href='/booking' class='text-blue-500 hover:text-blue-600'>احجز طاولتك</a> الآن!"
  },
  {
    question: "هل لديكم موقف سيارات",
    answer: "نعم، لدينا موقف سيارات مخصص للضيوف. معلومات الموقف:\n" +
      "• موقف مجاني لجميع الضيوف\n" +
      "• مراقبة أمنية على مدار الساعة\n" +
      "• وصول سهل من الشارع الرئيسي\n" +
      "• <a href='https://www.google.com/maps/search/?api=1&query=Kasr+El+Kebir+Morocco' target='_blank' class='text-blue-500 hover:text-blue-600'>عرض على الخريطة</a>\n\n" +
      "للحصول على خدمة التوصيل أو ترتيبات خاصة، يرجى <a href='/contact' class='text-blue-500 hover:text-blue-600'>الاتصال بنا</a>."
  }
];

// Enhanced Fuse.js configuration for better matching
const fuse = new Fuse(faq, {
  keys: ['question'],
  threshold: 0.4,
  distance: 100,
  includeScore: true,
  minMatchCharLength: 3,
  shouldSort: true,
});

function findBestMatch(userMessage) {
  const cleanMessage = userMessage.toLowerCase().trim();
  
  // Check for empty or very short messages
  if (!cleanMessage || cleanMessage.length < 2) {
    return welcomeMessage;
  }
  
  const result = fuse.search(cleanMessage);
  
  if (result.length > 0 && result[0].score < 0.6) {
    return result[0].item.answer;
  } else {
    return "I'm not sure I understood your question. Here are some things you can ask me about:\n" +
           "• <a href='/menu' class='text-blue-500 hover:text-blue-600'>Our menu and dishes</a>\n" +
           "• <a href='/booking' class='text-blue-500 hover:text-blue-600'>Making a reservation</a>\n" +
           "• <a href='/reviews' class='text-blue-500 hover:text-blue-600'>Customer reviews</a>\n" +
           "• Opening hours and location\n" +
           "• <a href='/contact' class='text-blue-500 hover:text-blue-600'>Contact information</a>\n" +
           "• Special dietary requirements\n\n" +
           "Feel free to rephrase your question or choose from these topics! You can also <a href='/contact' class='text-blue-500 hover:text-blue-600'>contact us directly</a> for assistance.";
  }
}

module.exports = { findBestMatch };

import React, { useState, useEffect } from "react";
import { NavbarComponent } from "../components/NavbarComponent";
import Sidebar from "../components/Sidebar";
import AppSection from "../components/AppSection";

const Homepage = () => {
  const [search, setSearch] = useState("");
  const [activeSection, setActiveSection] = useState("all");
  const [sidebarSearch, setSidebarSearch] = useState("");

  // ✅ Data (could move to separate file if grows too big)
  const llmLinks = [
    { name: "ChatGPT", url: "https://chat.openai.com/", info: "OpenAI's conversational AI assistant.", img: "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" },
    { name: "Gemini", url: "https://gemini.google.com/", info: "Google's generative AI chatbot.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Google_Gemini_logo.svg/2560px-Google_Gemini_logo.svg.png"},
    { name: "Perplexity", url: "https://www.perplexity.ai/", info: "AI-powered search and answers.", img: "https://avatars.githubusercontent.com/u/10639145?s=200&v=4" },
    { name: "Claude", url: "https://claude.ai/", info: "Anthropic's helpful AI assistant.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Po3958DsH3mbAF6CdYaH_fRL4aA6K49y-B_diepetSe0WR3SdqEGkZMHoNFv8MONNCE&usqp=CAU" },
    { name: "Mistral", url: "https://www.mistral.ai/", info: "Fast, open-source LLM chat.", img: "https://avatars.githubusercontent.com/u/149570682?s=200&v=4" },
  ];

  const paymentLinks = [
    { name: "Paytm", url: "https://paytm.com/", info: "India's leading digital wallet and payments app.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPC3UNIfxgrAHMh6VLpvokIYGUjmHIVBSTjA&s" },
    { name: "Google Pay", url: "https://pay.google.com/", info: "Google's secure payment platform.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyVO9LUWF81Ov6LZR50eDNu5rNFCpkn0LwYQ&s" },
    { name: "PhonePe", url: "https://www.phonepe.com/", info: "UPI-based payments and money transfer.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo4x8kSTmPUq4PFzl4HNT0gObFuEhivHOFYg&s" },
    { name: "Amazon Pay", url: "https://www.amazon.in/amazonpay/home", info: "Amazon's payment and wallet service.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg-oM_Rzaa0qVSLEQY4-0VDLl1sdudCFFv-Q&s" },
    { name: "BHIM", url: "https://www.bhimupi.org.in/", info: "Official UPI app by NPCI for instant payments.", img: "https://img.icons8.com/?size=512&id=5RcHTSNy4fbL&format=png" },
  ];

  const ecommerceLinks = [
    { name: "Amazon", url: "https://www.amazon.in/", info: "India's largest e-commerce marketplace with everything from electronics to groceries.", img: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Amazon_icon.svg/2048px-Amazon_icon.svg.png" },
    { name: "Flipkart", url: "https://www.flipkart.com/", info: "Popular Indian e-commerce platform offering wide range of products.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRpbvkPas6YxnZo1hS5O_dI03Xz9IvQyUCWg&s" },
    { name: "Myntra", url: "https://www.myntra.com/", info: "Leading fashion and lifestyle e-commerce store in India.", img: "https://cdn.worldvectorlogo.com/logos/myntra-2.svg" },
    { name: "Snapdeal", url: "https://www.snapdeal.com/", info: "Online shopping platform in India offering budget-friendly products.", img: "https://www.logo.wine/a/logo/Snapdeal/Snapdeal-White-Dark-Background-Logo.wine.svg" },
    { name: "Nykaa", url: "https://www.nykaa.com/", info: "India's top beauty, wellness and fashion e-commerce platform.", img: "https://cdn.iconscout.com/icon/free/png-256/free-nykaa-logo-icon-svg-download-png-2822953.png?f=webp" },
    { name: "Meesho", url: "https://www.meesho.com/", info: "India's social commerce platform with affordable fashion and lifestyle products.", img: "https://upload.wikimedia.org/wikipedia/commons/3/33/Meesho_logo.png" },
    { name: "Reliance Digital", url: "https://www.reliancedigital.in/", info: "E-commerce platform by Reliance focusing on electronics and appliances.", img: "https://srmt82east.com/uploads/ddf2b53a07c96e464533c413d5e8229b.png"}
  ]

  const movieBookingLinks = [
  { 
    name: "BookMyShow", 
    url: "https://in.bookmyshow.com/", 
    info: "India's leading platform for movie, events, and show ticket bookings.", 
    img: "https://static.thearcweb.com/images/PROD/PROD-ba7546cb-c6e1-47d7-9d37-8ba14a2c2615.png" 
  },
  { 
    name: "Paytm Movies", 
    url: "https://paytm.com/movies", 
    info: "Book movie tickets online via Paytm with cashback offers.", 
    img: "https://b.zmtcdn.com/data/edition_assets/17514345049287.png" 
  },
  { 
    name: "PVR Cinemas", 
    url: "https://www.pvrcinemas.com/", 
    info: "Official site of PVR Cinemas for movie ticket booking.", 
    img: "https://upload.wikimedia.org/wikipedia/commons/d/dc/Pvrcinemas_logo.jpg" 
  },
  { 
    name: "INOX Movies", 
    url: "https://www.inoxmovies.com/", 
    info: "INOX multiplex chain's official platform to book movie tickets.", 
    img: "https://pimwp.s3-accelerate.amazonaws.com/2021/08/29-8-21-1.png" 
  },
  { 
    name: "Cinepolis India", 
    url: "https://www.cinepolisindia.com/", 
    info: "Book tickets for movies across Cinepolis multiplexes in India.", 
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Cin%C3%A9polis_logo.svg/3000px-Cin%C3%A9polis_logo.svg.png" 
  }
];

const foodLinks = [
  { 
    name: "Zomato", 
    url: "https://www.zomato.com/", 
    info: "Food delivery, dining & restaurant discovery platform.", 
    img: "https://upload.wikimedia.org/wikipedia/commons/7/75/Zomato_logo.png" 
  },
  { 
    name: "Swiggy", 
    url: "https://www.swiggy.com/", 
    info: "India's leading online food ordering and delivery platform.", 
    img: "https://upload.wikimedia.org/wikipedia/commons/1/13/Swiggy_logo.png" 
  },
  { 
    name: "Zepto", 
    url: "https://www.zepto.com/", 
    info: "10-minute grocery delivery app in India.", 
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Bh36VUEJ2DeC0vl6oKkElCXqN-anYYCROg&s" 
  },
  { 
    name: "Blinkit", 
    url: "https://www.blinkit.com/", 
    info: "Instant grocery delivery platform (acquired by Zomato).", 
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg" 
  },
  { 
    name: "Instamart", 
    url: "https://www.swiggy.com/instamart", 
    info: "Swiggy’s instant grocery delivery service.", 
    img: "https://pnghdpro.com/wp-content/themes/pnghdpro/download/social-media-and-brands/swiggy-instamart-logo-app-icon-hd.png"  // best available official Instamart logo
  }
];

const bookingLinks = [
  { 
    name: "OYO Rooms", 
    url: "https://www.oyorooms.com/", 
    info: "Affordable hotels and stays across India.", 
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBa1nDbQQOSJaOzUy1WcaxP8AMTvMBA93NsQ&s" 
  },
  { 
    name: "MakeMyTrip", 
    url: "https://www.makemytrip.com/hotels/", 
    info: "India's top travel portal for hotel and flight bookings.", 
    img: "https://upload.wikimedia.org/wikipedia/commons/6/61/Makemytrip_logo.svg" 
  },
  { 
    name: "Goibibo", 
    url: "https://www.goibibo.com/hotels/", 
    info: "Hotel, flight, and bus booking service under MakeMyTrip Group.", 
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYsAMKhqML76Ashmo_0sTwDLfUfj9pD9C7qdeNvdc4hddcT6KL5IYwzo9lQLjA1_NtDT0&usqp=CAU" 
  },
  { 
    name: "Booking.com", 
    url: "https://www.booking.com/", 
    info: "Global leader in hotel and accommodation bookings.", 
    img: "https://i.pinimg.com/736x/05/4a/e1/054ae133783fb54d125fa0b99690513d.jpg" 
  },
  { 
    name: "Agoda", 
    url: "https://www.agoda.com/", 
    info: "International hotel booking platform popular in Asia.", 
    img: "https://logos-world.net/wp-content/uploads/2024/07/Agoda-Symbol.png" 
  },
  { 
    name: "Yatra", 
    url: "https://www.yatra.com/hotels", 
    info: "Online travel agency offering hotels, flights, and holidays.", 
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Yatra_logo.svg/1280px-Yatra_logo.svg.png" 
  }
];

const socialMediaLinks = [
  { 
    name: "Facebook", 
    url: "https://www.facebook.com/", 
    info: "World's largest social networking site to connect with friends and communities.", 
    img: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Facebook_icon.svg" 
  },
  { 
    name: "Instagram", 
    url: "https://www.instagram.com/", 
    info: "Meta's photo and video sharing platform with reels and stories.", 
    img: "https://upload.wikimedia.org/wikipedia/commons/9/95/Instagram_logo_2022.svg" 
  },
  { 
    name: "Twitter (X)", 
    url: "https://x.com/", 
    info: "Real-time microblogging and social networking platform.", 
    img: "https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?semt=ais_hybrid&w=740&q=80" 
  },
  { 
    name: "Reddit", 
    url: "https://www.reddit.com/", 
    info: "Global discussion forum and social news aggregation site.", 
    img: "https://i.pinimg.com/736x/fe/23/a7/fe23a7aa94317e4819ef2fa961bd3892.jpg" 
  },
  { 
    name: "Pinterest", 
    url: "https://in.pinterest.com/", 
    info: "Visual discovery engine for ideas, fashion, lifestyle, and design.", 
    img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png" 
  },
  { 
    name: "Quora", 
    url: "https://www.quora.com/", 
    info: "Q&A platform where people share knowledge and experiences.", 
    img: "https://upload.wikimedia.org/wikipedia/commons/9/91/Quora_logo_2015.svg" 
  },
  { 
    name: "YouTube", 
    url: "https://www.youtube.com/", 
    info: "Video sharing platform for music, entertainment, and learning.", 
    img: "https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg" 
  }
];
const datingLinks = [
  { 
    name: "Tinder", 
    url: "https://tinder.com/", 
    info: "Global dating app to meet new people and find matches.", 
    img: "https://growthhackingnow.com/wp-content/uploads/2024/10/tinder-growth-study-logo-1024x512.png" 
  },
  { 
    name: "Bumble", 
    url: "https://bumble.com/", 
    info: "Women-first dating app that also offers networking and friendships.", 
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Bumble_Logo_2024.svg/2560px-Bumble_Logo_2024.svg.png" 
  },
  { 
    name: "TrulyMadly", 
    url: "https://www.trulymadly.com/", 
    info: "Indian dating app focusing on verified profiles and serious relationships.", 
    img: "https://pbs.twimg.com/profile_images/1631251824027267072/kq-8NvGk_400x400.jpg" 
  },
  { 
    name: "OkCupid", 
    url: "https://www.okcupid.com/", 
    info: "Online dating platform with detailed profiles and compatibility matching.", 
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/OkCupid_logo.svg/1200px-OkCupid_logo.svg.png" 
  },
  { 
    name: "Hinge", 
    url: "https://hinge.co/", 
    info: "Dating app designed to be deleted — focuses on meaningful relationships.", 
    img: "https://i.pinimg.com/736x/b6/da/b4/b6dab4db6e23f15204e3cc4e0634705a.jpg" 
  }
];

const jobPortalsLinks = [
  {
    name: "Naukri",
    url: "https://www.naukri.com/",
    info: "India's leading job portal for all sectors and career levels.",
    img: "https://play-lh.googleusercontent.com/76gEFhQto5xMHr2Qf8nWLvm1s0O60clhkwHvxQDSeI3hthf7Zs05JJQeyg5H347DGQ"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/jobs/",
    info: "Professional networking platform with job listings and company insights.",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/81/LinkedIn_icon.svg"
  },
  {
    name: "Indeed",
    url: "https://www.indeed.co.in/",
    info: "Global job search engine, with listings for India.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS93_IYeCb3pIupGAAuYWrwCKplRg5DGLMBsg&s"
  },
  {
    name: "Shine",
    url: "https://www.shine.com/",
    info: "Job portal for Indian professionals across industries.",
    img: "https://play-lh.googleusercontent.com/XZbAiQrSRgCRnmCX8l0t1095rFdj2I8JXEYMCAsq9AhcKbZmYg6_uSR-ABDjiqX5MHxs"
  },
  {
    name: "Foundit",
    url: "https://www.monsterindia.com/",
    info: "Job search and career development portal for India.",
    img: "https://play-lh.googleusercontent.com/Uw5EnL1NtuH3wdbfOp-SsLuUKtD6bqwlVTBgSn0ULWk3SGbBomauQ1JWvg-0yPBKqQ"
  }
];
const governmentPrepLinks = [
  {
    name: "StudyIQ",
    url: "https://www.studyiq.com/",
    info: "Online platform offering courses, current affairs, and test series for government exams in India.",
    img: "https://play-lh.googleusercontent.com/G9NHWnskf4O5U56yC8vKKBEg-tTO3E_u5Z5eUIe6H6Fe4fiki1FK_DfjiW4ZiIVxBSE"
  },
  {
    name: "Testbook",
    url: "https://testbook.com/",
    info: "India's platform for practicing online tests and preparing for government jobs.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ13H_w6246dJbdPh6BY0rghVmPCWvKxVr4rw&s"
  },
  {
    name: "Adda247",
    url: "https://www.adda247.com/",
    info: "Leading online platform for government exam preparation, quizzes, and study material.",
    img: "https://static.toiimg.com/thumb/msid-104458955,width-400,resizemode-4/104458955.jpg"
  },
  {
    name: "Oliveboard",
    url: "https://www.oliveboard.in/",
    info: "Online preparation platform for banking, SSC, insurance, and government exams.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoWW-4NV1wkP3XM_21hzJmi5KU6xWuIMAgAw&s"
  },
  {
    name: "CareerPower",
    url: "https://www.careerpower.in/",
    info: "Comprehensive online resources and mock tests for Indian government exams.",
    img: "https://content.jdmagicbox.com/comp/gwalior/w1/9999px751.x751.170602225901.m2w1/catalogue/career-power-j-a-hospital-gwalior-career-power-tzbf0wuhii.jpg"}
];

const educationLinks = [
  {
    name: "Coursera",
    url: "https://www.coursera.org/",
    info: "Online courses and certifications from top universities worldwide.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMb215frjDhAKzHEJ5vb3HJwfGji4NRvVq3Q&s"
  },
  {
    name: "Udemy",
    url: "https://www.udemy.com/",
    info: "Online learning platform offering courses in programming, business, and more.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcbC9JNrtvj6sdkH2pDn8Xg2u5uy_TTZ8Mzg&s"
  },
  {
    name: "Unacademy",
    url: "https://unacademy.com/",
    info: "India's leading online learning platform for competitive exams and skills.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3I8MHCoQwIr7JRNGJofutnnyXyD12S0aRBw&s"
  },
  {
    name: "Khan Academy",
    url: "https://www.khanacademy.org/",
    info: "Free educational platform offering lessons for school and college students.",
    img: "https://www.svgrepo.com/show/353965/khan-academy-icon.svg"
  },
  {
    name: "Vedantu",
    url: "https://www.vedantu.com/",
    info: "Live online tutoring platform for Indian school students.",
    img: "https://i.pinimg.com/736x/8a/5b/fa/8a5bfaf3b1f90399966491d44ffebb64.jpg"
  }
];
const digitalNewsLinks = [
  {
    name: "Firstpost",
    url: "https://www.firstpost.com/",
    info: "Digital news portal covering politics, business, entertainment, and sports.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpJhCoZqsRuBKrzwfkQYxuvhg8i7gPqKbAZA&s"
  },
  {
    name: "Scroll.in",
    url: "https://scroll.in/",
    info: "Independent news platform focusing on politics, culture, and current affairs.",
    img: "https://play-lh.googleusercontent.com/lDQItNHRSiPz0_OUaxvpuFvO8VPK9tg8p-UETHAGqWMcFvM0UMYwOnSrcwbE-pHDIA"
  },
  {
    name: "The Quint",
    url: "https://www.thequint.com/",
    info: "Digital news platform covering news, opinion, and social issues.",
    img: "https://play-lh.googleusercontent.com/oC0sc87f3WSww7bVN1g7UiDjChK4HL3ImhGqu9UewVHI5-P9ki6vlS1T6vdls2cU4SyZ"
  },
  {
    name: "The Wire",
    url: "https://thewire.in/",
    info: "Independent online news website focusing on politics and policy analysis.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99FJm8IvHPEfhf6Po4TtgEcA5xsbnlP6a_Q&s"
  },
  {
    name: "News18",
    url: "https://www.news18.com/",
    info: "Online news portal delivering updates on politics, technology, and entertainment.",
    img: "https://www.nw18.com/images/portfolio/News18_brd.png"
  },
  {
    name: "OpIndia",
    url: "https://www.opindia.com/",
    info: "Web-native platform focusing on news, opinion, and political analysis.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_YOb5Pq6jsgwsoCbaiyiFEVp_WyOju0PDNg&s"
  },
  {
    name: "Inshorts",
    url: "https://www.inshorts.com/en/read",
    info: "Bite-sized news summaries covering national and international news quickly.",
    img: "https://upload.wikimedia.org/wikipedia/en/5/5a/Inshorts_logo.png"
  }
];

const ottLinks = [
  {
    name: "Netflix",
    url: "https://www.netflix.com/in/",
    info: "Global streaming platform offering movies, TV shows, documentaries, and originals.",
    img: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg"
  },
  {
    name: "Amazon Prime Video",
    url: "https://www.primevideo.com/",
    info: "Streaming service with a wide range of movies, TV shows, and Amazon Originals.",
    img: "https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.png"
  },
  {
    name: "Jio Hotstar",
    url: "https://www.hotstar.com/in",
    info: "Popular platform for movies, TV shows, sports, and Disney content in India.",
    img: "https://images.hindustantimes.com/tech/img/2025/02/14/1600x900/JioHotstar_1739533540278_1739533540622.jpg"
  },
  {
    name: "Zee5",
    url: "https://www.zee5.com/",
    info: "Indian OTT platform offering movies, TV shows, originals, and regional content.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrUo192NQMG5gnIQVeRrvLTSEETsZlzH2Meg&s"
  },
  {
    name: "Sony LIV",
    url: "https://www.sonyliv.com/",
    info: "Streaming platform with movies, TV shows, and sports content from Sony Entertainment.",
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReZjczq8DrzHnGVLu-b_2lMVwRtsyt1ArgSA&s"
  },
  {
    name: "MX Player",
    url: "https://www.mxplayer.in/",
    info: "Free streaming platform for movies, TV shows, and original content in India.",
    img: "https://mxplayerpc.com/images/uploads/2022-08-30/icon-pgpn8.png"
  },

];



  const sections = {
    llm: { title: "Popular LLM Apps", color: "border-blue-100", data: llmLinks },
    payment: { title: "Payment Apps", color: "border-green-100", data: paymentLinks },
    ecommerce: { title: "E-commerce Apps", color: "border-yellow-100", data: ecommerceLinks },
    movieBooking : { title: "Movie Booking Apps", color: "border-red-100", data: movieBookingLinks },
    foodDelivery: { title: "Food Delivery Apps", color: "border-purple-100", data: foodLinks },
    bookings: { title: "Booking Apps", color: "border-pink-100", data: bookingLinks },
    socialMediaLinks: { title: "Social Media Apps", color: "border-indigo-100", data: socialMediaLinks },
    dating: { title: "Dating Apps", color: "border-teal-100", data: datingLinks },
    jobPortals: { title: "Job Portals", color: "border-orange-100", data: jobPortalsLinks },
    governmentPrep: { title: "Government Exam Prep", color: "border-cyan-100", data: governmentPrepLinks },
    education: { title: "Educational Platforms", color: "border-lime-100", data: educationLinks },
    digitalNews: { title: "Digital News Platforms", color: "border-rose-100", data: digitalNewsLinks },
    ott: { title: "OTT Platforms", color: "border-violet-100", data: ottLinks },
  };

  // 🔍 Highlight section based on sidebar search
  const matchedSection = Object.keys(sections).find(key =>
    sections[key].title.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

useEffect(() => {
  if (sidebarSearch.trim() === "") {
    // ✅ if sidebar search is cleared, go back to "all"
    setActiveSection("all");
  } else if (matchedSection) {
    setActiveSection(matchedSection);
  }
}, [sidebarSearch]);

  // 🔍 Global search across all apps
  const allApps = Object.keys(sections).flatMap(key =>
    sections[key].data.map(app => ({ ...app, section: key }))
  );
  const filteredApps = allApps.filter(app =>
    app.name.toLowerCase().includes(search.toLowerCase()) ||
    app.info.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex">
      <Sidebar
        sections={sections}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarSearch={sidebarSearch}
        setSidebarSearch={setSidebarSearch}
      />

      <main className="flex-1">
        <NavbarComponent search={search} setSearch={setSearch} />

        {search ? (
          <AppSection title="Search Results" apps={filteredApps} color="border-blue-100" />
        ) : activeSection === "all" ? (
          Object.keys(sections).map(key => (
            <AppSection
              key={key}
              title={sections[key].title}
              apps={sections[key].data}
              color={sections[key].color}
            />
          ))
        ) : (
          <AppSection
            title={sections[activeSection].title}
            apps={sections[activeSection].data}
            color={sections[activeSection].color}
          />
        )}
      </main>
    </div>
  );
};

export default Homepage;


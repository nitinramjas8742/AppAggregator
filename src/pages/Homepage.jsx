import React, { useState, useEffect } from "react";
import { NabvarComponent } from "../components/NavbarComponent";
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
    { name: "Amazon", url: "https://www.amazon.in/", info: "India's largest e-commerce marketplace with everything from electronics to groceries.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAPzZqCFhLyI24F64l6vj9E2lpArW3bXgAqA&s" },
    { name: "Flipkart", url: "https://www.flipkart.com/", info: "Popular Indian e-commerce platform offering wide range of products.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0V8u7b0S2ezQ1x0HjKglKHQ1cQk0eLwuzHg&s" },
    { name: "Myntra", url: "https://www.myntra.com/", info: "Leading fashion and lifestyle e-commerce store in India.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_MzLTehC7F6lzJHJ6fp7L-Bh0Q8LfDqXJng&s" },
    { name: "Snapdeal", url: "https://www.snapdeal.com/", info: "Online shopping platform in India offering budget-friendly products.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLovf0Yk0bs2K0XHz0E0Oqz3LDKslDnQBW7g&s" },
    { name: "Nykaa", url: "https://www.nykaa.com/", info: "India's top beauty, wellness and fashion e-commerce platform.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLpXNYI2LzmRyWBo8E0QzTxEcvYgWbPfqQFA&s" },
    { name: "Meesho", url: "https://www.meesho.com/", info: "India's social commerce platform with affordable fashion and lifestyle products.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStQ9hBd8PQESvQogpc5Oe30EbZjL8Dj_YZHw&s" },
    { name: "Reliance Digital", url: "https://www.reliancedigital.in/", info: "E-commerce platform by Reliance focusing on electronics and appliances.", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRf14fj4gHBc8qrlHTm7YxXFo1gm9F8Sikjhw&s" },
  ];

  const sections = {
    llm: { title: "Popular LLM Apps", color: "border-blue-100", data: llmLinks },
    payment: { title: "Payment Apps", color: "border-green-100", data: paymentLinks },
    ecommerce: { title: "E-commerce Apps", color: "border-yellow-100", data: ecommerceLinks },
  };

  // 🔍 Highlight section based on sidebar search
  const matchedSection = Object.keys(sections).find(key =>
    sections[key].title.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  useEffect(() => {
    if (matchedSection) setActiveSection(matchedSection);
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
        <NabvarComponent search={search} setSearch={setSearch} />

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


// scripts/author/chapter1_lessons.js
// Authoring for Chapter 1: The Nature and Purpose of Money
// Lessons: L01 (What Money Actually Does), L02 (Money, Income, and Wealth Are Not the Same), L03 (What Gives Money Its Value)

module.exports = {
  // ==========================================
  // LESSON 1: WHAT MONEY ACTUALLY DOES
  // ==========================================
  L01: {
    id: "L01",
    number: 1,
    title: "What Money Actually Does",
    subtitle: "Discover why money was invented, how it solved the barter trap, and the three essential jobs it performs every day.",
    difficulty: "Medium",
    contents: [
      {
        id: "L01.CT1",
        title: "Why We Need Money",
        objective: "Understand the transition from barter to money and identify the three core functions of money in modern economic life.",
        groups: [
          {
            id: "L01.CT1.G1",
            title: "Life Before Money: The Barter Economy",
            objective: "Explore how direct trade operated before currency existed and why economic survival required finding trade partners.",
            items: [
              {
                id: "L01.CT1.G1.I01",
                kind: "slide",
                order: 1,
                title: "Imagine a World Without Money",
                subtitle: "How would you get food, clothing, and shelter if nobody accepted coins, notes, or digital transfers?",
                body: [
                  {
                    type: "paragraph",
                    text: "Imagine waking up tomorrow and discovering that money no longer exists. No paper notes, no coins, and no banking apps on your phone."
                  },
                  {
                    type: "paragraph",
                    text: "You need breakfast, but the food vendor cannot accept a bank transfer. The bus driver refuses cash. Your landlord demands physical items in exchange for another month's stay."
                  },
                  {
                    type: "callout",
                    text: "People still have skills and still produce goods, but without a common payment method, every transaction requires finding someone who wants exactly what you have to offer."
                  },
                  {
                    type: "paragraph",
                    text: "This ancient method of trade is known as the barter system. It works in small, simple communities, but quickly falls apart as society grows."
                  }
                ],
                concepts: ["barter"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G1.I02",
                kind: "widget",
                order: 2,
                title: "Your First Move in a Barter Economy",
                subtitle: "Choose your trade strategy when modern currency is unavailable.",
                widget_type: "choice_with_reflection",
                config: {
                  prompt: "You are a skilled tailor who needs a bag of rice, but money does not exist. What is your first move?",
                  options: [
                    { id: "A", label: "Sew two shirts and look for a rice farmer who needs new clothing." },
                    { id: "B", label: "Borrow rice from a neighbor and promise to sew clothes for them next month." },
                    { id: "C", label: "Try to trade shirts for salt first, hoping the rice farmer will accept salt." }
                  ],
                  follow_up_prompt: "Which option provides the fastest path to a successful trade, and what makes it challenging?"
                },
                concepts: ["barter", "double_coincidence_of_wants"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G1.I03",
                kind: "slide",
                order: 3,
                title: "The Problem of Matching Needs",
                subtitle: "Direct trade requires a rare alignment of wants between two strangers.",
                body: [
                  {
                    type: "paragraph",
                    text: "In economics, the biggest obstacle to barter trade is called the 'Double Coincidence of Wants'."
                  },
                  {
                    type: "definition",
                    term: "Double Coincidence of Wants",
                    text: "A situation where two parties to a trade must each want the exact item or service that the other person is willing to part with."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "You have a surplus of fresh tomatoes and want a haircut.",
                      "The barber loves tomatoes: the trade happens smoothly.",
                      "The barber is allergic to tomatoes and wants firewood: the trade fails completely."
                    ]
                  },
                  {
                    type: "paragraph",
                    text: "As people specialize in different trades, finding a direct match becomes increasingly exhausting and time-consuming."
                  }
                ],
                concepts: ["double_coincidence_of_wants", "specialisation"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G1.I04",
                kind: "case_study",
                order: 4,
                title: "The Village Marketplace Match",
                subtitle: "Analyze a real-world barter mismatch between three local producers.",
                scenario: {
                  narrative: "Amaka brings three large baskets of harvested yams to the weekly market, hoping to get her broken smartphone screen repaired. Tunde, the phone technician, inspects the yams but declines the trade because his family already harvested twenty yams yesterday. Tunde urgently needs ₦5,000 worth of fuel for his generator to keep his repair equipment running.",
                  characters: [
                    { name: "Amaka", role: "Yam Farmer", details: "Has surplus agricultural produce" },
                    { name: "Tunde", role: "Phone Repairer", details: "Requires generator fuel" },
                    { name: "Musa", role: "Fuel Merchant", details: "Has gasoline, looking for yams" }
                  ],
                  data: [
                    { label: "Amaka's Produce", value: "3 Large Yams" },
                    { label: "Tunde's Repair Value", value: "₦5,000 Equivalent" },
                    { label: "Musa's Fuel Supply", value: "10 Litres Gasoline" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why did the direct trade between Amaka and Tunde fail despite both having valuable offerings?",
                    options: [
                      { id: "A", label: "There was no double coincidence of wants; Tunde had plenty of yams." },
                      { id: "B", label: "Amaka's yams had zero economic value." },
                      { id: "C", label: "Tunde did not know how to repair phone screens." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "This scenario highlights why direct barter is inefficient. Even when both parties possess high-quality goods, exchange halts without mutual desire. By introducing a third party (Musa) or an accepted medium of exchange, the bottleneck dissolves instantly.",
                key_takeaway: "An item can be highly valuable without being useful to the specific person you are negotiating with.",
                concepts: ["barter", "double_coincidence_of_wants"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G1.I05",
                kind: "slide",
                order: 5,
                title: "The Cost of Wasted Time",
                subtitle: "When trade is inefficient, society loses productivity and innovation.",
                body: [
                  {
                    type: "paragraph",
                    text: "Economists call the energy and hours spent seeking trading partners 'search costs' or 'transaction costs'."
                  },
                  {
                    type: "paragraph",
                    text: "If a farmer spends three days walking around town attempting to exchange cassava for shoes, those are three days lost from planting, resting, or developing new tools."
                  },
                  {
                    type: "callout",
                    text: "Money is humanity's most elegant invention for slashing transaction costs to near zero."
                  }
                ],
                concepts: ["barter", "scarcity"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L01.CT1.G2",
            title: "The Limitations of Barter Trade",
            objective: "Examine divisibility, perishability, and portability issues that make barter impractical.",
            items: [
              {
                id: "L01.CT1.G2.I01",
                kind: "slide",
                order: 1,
                title: "The Divisibility Dilemma",
                subtitle: "What happens when one item cannot be split without destroying its value?",
                body: [
                  {
                    type: "paragraph",
                    text: "Suppose you own a healthy live dairy cow and want to purchase three loaves of bread. You cannot cut off a small fraction of the living cow to pay the baker."
                  },
                  {
                    type: "example",
                    text: "A cow is indivisible while alive. If you butcher it, you must trade the entire carcass immediately before the meat spoils in the tropical heat."
                  },
                  {
                    type: "paragraph",
                    text: "Modern money solves this through standard denominations: you can spend small coins or notes without destroying the value of your remaining savings."
                  }
                ],
                concepts: ["barter", "unit_of_account"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G2.I02",
                kind: "widget",
                order: 2,
                title: "Make the Trade Work",
                subtitle: "Categorize the major barriers to barter transactions.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Barter Failure Classification",
                  buckets: [
                    { id: "perishability", label: "Perishability Issue" },
                    { id: "divisibility", label: "Divisibility Issue" },
                    { id: "portability", label: "Portability Issue" }
                  ],
                  cards: [
                    { id: "c1", label: "Fresh fish spoiling before finding a buyer", bucket: "perishability", feedback: "Perishable items rapidly rot, destroying their trade value." },
                    { id: "c2", label: "Trading one live horse for five pencils", bucket: "divisibility", feedback: "You cannot cut a live horse into small fractions without killing it." },
                    { id: "c3", label: "Carrying 80 kilograms of heavy iron bars to market", bucket: "portability", feedback: "Excessive weight makes transporting goods for trade impractical." }
                  ]
                },
                concepts: ["barter", "store_of_value"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G2.I03",
                kind: "slide",
                order: 3,
                title: "Perishability: The Ticking Clock",
                subtitle: "Agricultural goods lose their value with each passing hour.",
                body: [
                  {
                    type: "paragraph",
                    text: "If your primary store of wealth is fresh milk, bananas, or leafy greens, your wealth has an expiration date."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "You cannot save fresh tomatoes for your retirement twenty years later.",
                      "Pests, weather, and spoilage continuously erode agricultural wealth.",
                      "A reliable financial system requires assets that hold their physical and economic integrity over time."
                    ]
                  }
                ],
                concepts: ["store_of_value", "barter"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G2.I04",
                kind: "case_study",
                order: 4,
                title: "The Tomato Farmer's Race Against Time",
                subtitle: "Observe the rapid decay of trade value in perishable goods.",
                scenario: {
                  narrative: "Ibrahim harvests fifty baskets of ripe plum tomatoes on Monday. He needs roofing sheets for his barn. The hardware merchant wants tomatoes, but only one basket per week for family meals. Ibrahim cannot store forty-nine baskets for forty-nine weeks because the tomatoes will rot within four days.",
                  characters: [
                    { name: "Ibrahim", role: "Tomato Farmer", details: "Faces total product spoilage within 96 hours" },
                    { name: "Chinedu", role: "Hardware Merchant", details: "Needs only small weekly amounts of fresh produce" }
                  ],
                  data: [
                    { label: "Harvest Volume", value: "50 Baskets" },
                    { label: "Hardware Merchant Need", value: "1 Basket / Week" },
                    { label: "Shelf Life", value: "4 Days" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What economic function does Ibrahim's crop fail to fulfill as wealth?",
                    options: [
                      { id: "A", label: "Store of value (it rots quickly and cannot store purchasing power)." },
                      { id: "B", label: "It cannot be consumed as food." },
                      { id: "C", label: "It is illegal to trade agricultural produce." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Ibrahim's dilemma demonstrates why perishable commodities cannot serve as a reliable store of value. Money decouples production from consumption: Ibrahim can sell his entire tomato crop on day one for currency and spend that currency on roofing sheets over months or years.",
                key_takeaway: "True stores of value must preserve purchasing power across time without physical deterioration.",
                concepts: ["store_of_value", "purchasing_power"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G2.I05",
                kind: "slide",
                order: 5,
                title: "Portability and Standard Weights",
                subtitle: "Money must be lightweight enough to carry and easy to count.",
                body: [
                  {
                    type: "paragraph",
                    text: "Early civilizations traded cattle, giant stone discs, and bags of salt. While salt was useful, carrying twenty kilograms of salt just to buy clothing was exhausting and risky."
                  },
                  {
                    type: "paragraph",
                    text: "To function efficiently, money needs five physical qualities: portability, durability, divisibility, uniformity, and limited supply."
                  }
                ],
                concepts: ["commodity_money", "medium_of_exchange"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L01.CT1.G3",
            title: "The Three Core Functions of Money",
            objective: "Master the three universal jobs of money: Medium of Exchange, Unit of Account, and Store of Value.",
            items: [
              {
                id: "L01.CT1.G3.I01",
                kind: "slide",
                order: 1,
                title: "What If Everybody Accepted One Thing?",
                subtitle: "The birth of universally accepted currency.",
                body: [
                  {
                    type: "paragraph",
                    text: "Societies discovered that commerce thrives when everyone agrees to accept a single common item in exchange for all goods and services."
                  },
                  {
                    type: "paragraph",
                    text: "Historically, items like cowrie shells, silver coins, and gold ingots filled this role. Today, national currencies (such as the Nigerian Naira, US Dollar, and Euro) serve as official legal tender."
                  },
                  {
                    type: "callout",
                    text: "Money is not magic—it is a social technology based on widespread public trust."
                  }
                ],
                concepts: ["medium_of_exchange", "legal_tender"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G3.I02",
                kind: "widget",
                order: 2,
                title: "Barter Versus Money Comparison",
                subtitle: "Compare the efficiency of money against direct exchange across key commercial criteria.",
                widget_type: "option_comparison",
                config: {
                  title: "Barter vs. Monetary Economy",
                  option_a: {
                    name: "Barter System",
                    attributes: {
                      "Matching Wants": "Difficult (requires double coincidence)",
                      "Pricing Simplicity": "Chaotic (thousands of exchange ratios)",
                      "Speed of Commerce": "Very slow (high search costs)",
                      "Storage Over Time": "Risky (items rot or depreciate)"
                    }
                  },
                  option_b: {
                    name: "Monetary System",
                    attributes: {
                      "Matching Wants": "Effortless (universal acceptance)",
                      "Pricing Simplicity": "Clear (single price tag in currency)",
                      "Speed of Commerce": "Instantaneous (cash or transfer)",
                      "Storage Over Time": "Durable (stable in banking accounts)"
                    }
                  }
                },
                concepts: ["medium_of_exchange", "unit_of_account", "store_of_value"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G3.I03",
                kind: "slide",
                order: 3,
                title: "The Three Classic Jobs of Money",
                subtitle: "Memorize these three pillars: Medium of Exchange, Unit of Account, and Store of Value.",
                body: [
                  {
                    type: "numbered_list",
                    items: [
                      "Medium of Exchange: Eliminates barter by enabling you to buy anything from anyone willing to accept payment.",
                      "Unit of Account: Provides a common measuring stick to price goods, compare options, and calculate profits.",
                      "Store of Value: Allows you to preserve your hard-earned labor today so you can spend it tomorrow, next month, or next year."
                    ]
                  },
                  {
                    type: "callout",
                    text: "Whenever you look at a price tag, pay a cashier, or stash savings in a bank account, you are putting these three jobs to work."
                  }
                ],
                concepts: ["medium_of_exchange", "unit_of_account", "store_of_value"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Identify the Function of Money",
                subtitle: "Test your understanding of the three core functions with realistic commercial scenarios.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L01.CT1.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "A merchant gives a customer a receipt for ₦2,500 after selling a bag of rice. Which primary function of money is demonstrated by this completed payment?",
                    options: [
                      { id: "A", text: "Medium of exchange" },
                      { id: "B", text: "Unit of account" },
                      { id: "C", text: "Store of value" }
                    ],
                    correct: "A",
                    explanation: "When money is actively transferred to settle a purchase, it is performing its role as a medium of exchange.",
                    concepts: ["medium_of_exchange"]
                  },
                  {
                    id: "L01.CT1.G3.I04.Q2",
                    type: "single_choice",
                    prompt: "A smartphone store lists one model at ₦120,000 and another at ₦180,000. Which function allows a shopper to compare the relative cost of both phones?",
                    options: [
                      { id: "A", text: "Store of value" },
                      { id: "B", text: "Unit of account" },
                      { id: "C", text: "Double coincidence of wants" }
                    ],
                    correct: "B",
                    explanation: "Unit of account acts as a universal ruler or metric, allowing consumers to compare the values of different items using a single common number.",
                    concepts: ["unit_of_account"]
                  },
                  {
                    id: "L01.CT1.G3.I04.Q3",
                    type: "true_false",
                    prompt: "Placing ₦50,000 into a savings account to pay for school fees next year relies on money acting as a store of value.",
                    correct: true,
                    explanation: "Saving money to transfer purchasing power from today into the future is the definition of a store of value.",
                    concepts: ["store_of_value"]
                  }
                ],
                concepts: ["medium_of_exchange", "unit_of_account", "store_of_value"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G3.I05",
                kind: "slide",
                order: 5,
                title: "Money Does Not Need to Be Physical Paper",
                subtitle: "From cowrie shells to gold coins, bank ledgers, and digital transfers.",
                body: [
                  {
                    type: "paragraph",
                    text: "Many people think money must be paper notes or metal coins. In reality, physical banknotes represent only a small fraction of the money circulating today."
                  },
                  {
                    type: "paragraph",
                    text: "Most money exists as digital records in secure central bank and commercial bank databases. When you send a mobile bank transfer, no physical cash moves—only secure accounting ledger numbers change."
                  },
                  {
                    type: "definition",
                    term: "Fiat Money",
                    text: "Money established as legal tender by government regulation and maintained through public confidence, rather than backed by gold or physical commodities."
                  }
                ],
                concepts: ["fiat_money", "legal_tender"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L01.CT1.G4",
            title: "How Money Powers Daily Commerce",
            objective: "Understand how money enables price signals, specialized careers, and economic growth.",
            items: [
              {
                id: "L01.CT1.G4.I01",
                kind: "slide",
                order: 1,
                title: "Sell Here, Buy Anywhere",
                subtitle: "Money separates the act of selling what you produce from buying what you consume.",
                body: [
                  {
                    type: "paragraph",
                    text: "Because money is universally accepted, you can sell your web development skills to a client in Lagos, and use that same income to buy groceries from a vendor who has never heard of programming."
                  },
                  {
                    type: "paragraph",
                    text: "You do not need to find a grocery vendor who needs a website. Money bridges the gap between millions of different specializations."
                  }
                ],
                concepts: ["specialisation", "medium_of_exchange"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G4.I02",
                kind: "case_study",
                order: 2,
                title: "The Freelance Graphic Designer",
                subtitle: "How a digital specialist survives in a complex marketplace through currency.",
                scenario: {
                  narrative: "Folake is a freelance graphic designer who designs company logos. She needs dental care, electricity tokens, and groceries. None of the local supermarkets or dentists need a new logo this month.",
                  characters: [
                    { name: "Folake", role: "Graphic Designer", details: "Earns ₦150,000 for a corporate brand identity" },
                    { name: "Dr. Alabi", role: "Dentist", details: "Requires ₦25,000 for tooth extraction" },
                    { name: "Power Utility", role: "Utility Provider", details: "Bills ₦15,000 monthly" }
                  ],
                  data: [
                    { label: "Design Earnings", value: "₦150,000" },
                    { label: "Dental Expense", value: "₦25,000" },
                    { label: "Utility Expense", value: "₦15,000" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "How does the monetary system protect Folake's career?",
                    options: [
                      { id: "A", label: "She can convert specialized design skills into currency, which all providers accept." },
                      { id: "B", label: "It forces dentists to accept logos as payment." },
                      { id: "C", label: "It allows her to receive dental care without paying." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Without currency, specialists like software developers, surgeons, and musicians could barely survive unless they spent half their time farming their own food. Money unlocks occupational specialization, which is the engine of modern living standards.",
                key_takeaway: "Universal currency allows individuals to focus deeply on specialized talents without worrying about direct trade matches.",
                concepts: ["specialisation", "medium_of_exchange"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G4.I03",
                kind: "slide",
                order: 3,
                title: "Prices Help Us Compare Options",
                subtitle: "Prices provide vital information that guides everyday budgeting decisions.",
                body: [
                  {
                    type: "paragraph",
                    text: "Prices are not just arbitrary numbers; they are communication signals that reflect scarcity, cost of production, and consumer demand."
                  },
                  {
                    type: "paragraph",
                    text: "When you see that a train ticket costs ₦3,000 while an airline ticket costs ₦65,000, you instantly understand the relative trade-off in speed, comfort, and resource usage."
                  }
                ],
                concepts: ["unit_of_account", "price_comparison"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G4.I04",
                kind: "widget",
                order: 4,
                title: "Build a ₦10,000 Grocery Basket",
                subtitle: "Use a fixed monetary budget to balance essential nutritional items.",
                widget_type: "allocation_basket",
                config: {
                  title: "Weekly Essentials Basket",
                  budget: 10000,
                  items: [
                    { id: "rice", label: "Rice (5kg)", cost: 4500, category: "staple" },
                    { id: "beans", label: "Beans (2kg)", cost: 2200, category: "protein" },
                    { id: "oil", label: "Cooking Oil (1L)", cost: 1800, category: "essential" },
                    { id: "soda", label: "Soft Drinks (Pack)", cost: 2500, category: "luxury" },
                    { id: "eggs", label: "Half Crate Eggs", cost: 1500, category: "protein" }
                  ]
                },
                concepts: ["unit_of_account", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G4.I05",
                kind: "slide",
                order: 5,
                title: "Money Can Wait for Tomorrow",
                subtitle: "Decoupling when you work from when you consume.",
                body: [
                  {
                    type: "paragraph",
                    text: "Because money acts as a store of value, you do not have to consume all the rewards of your labor immediately."
                  },
                  {
                    type: "paragraph",
                    text: "You can work intensely during your twenties and thirties, save capital systematically in diversified financial instruments, and fund your living expenses decades later during retirement."
                  }
                ],
                concepts: ["store_of_value", "saving"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L01.CT1.G5",
            title: "When Money Fails and Why Trust Matters",
            objective: "Analyze why money depends entirely on social trust, legal enforcement, and sound policy.",
            items: [
              {
                id: "L01.CT1.G5.I01",
                kind: "slide",
                order: 1,
                title: "The Banknote Nobody Accepts",
                subtitle: "What happens when public confidence in a currency collapses?",
                body: [
                  {
                    type: "paragraph",
                    text: "If a merchant hands you a torn, faded paper note from a country that no longer exists, you will refuse to take it. Why? Because you know no other vendor will accept it from you."
                  },
                  {
                    type: "callout",
                    text: "Currency has value only because everyone believes everyone else will continue to honor and accept it."
                  },
                  {
                    type: "paragraph",
                    text: "If trust in a currency's stability collapses, citizens quickly abandon it in favor of stable foreign currencies, gold, or tangible physical assets."
                  }
                ],
                concepts: ["payment_acceptance", "fiat_money"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G5.I02",
                kind: "case_study",
                order: 2,
                title: "Will You Accept This Payment?",
                subtitle: "Evaluate counterparty risk and currency acceptance in retail trade.",
                scenario: {
                  narrative: "Kemi manages a boutique in Abuja. A tourist enters and offers to pay for a ₦40,000 jacket using fifty old banknotes of a defunct foreign currency that was demonetized five years ago. The tourist insists the paper has beautiful designs and cost a fortune back home.",
                  characters: [
                    { name: "Kemi", role: "Store Manager", details: "Responsible for daily store revenue" },
                    { name: "Tourist", role: "Shopper", details: "Offering demonetized foreign banknotes" }
                  ],
                  data: [
                    { label: "Jacket Price", value: "₦40,000" },
                    { label: "Offered Currency Status", value: "Demonetized / Defunct" },
                    { label: "Bank Exchange Value", value: "₦0" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What should Kemi do and why?",
                    options: [
                      { id: "A", label: "Decline the payment because banks and suppliers will not accept demonetized paper." },
                      { id: "B", label: "Accept the payment because foreign banknotes are always valuable." },
                      { id: "C", label: "Give the jacket away for free." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Paper money is not intrinsically valuable; its worth stems from legal tender laws and the backing of an active central banking institution. When a currency is demonetized or loses public acceptability, it reverts to being ordinary worthless paper.",
                key_takeaway: "Currency is only as valuable as the collective trust and legal structure backing it.",
                concepts: ["payment_acceptance", "legal_tender"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G5.I03",
                kind: "slide",
                order: 3,
                title: "Money Is Not the Same as Real Wealth",
                subtitle: "Do not confuse the tickets with the actual concert.",
                body: [
                  {
                    type: "paragraph",
                    text: "Economists frequently remind us: money is the measuring tape, not the furniture. Having more paper notes in an economy does not automatically make the society richer."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Real wealth consists of tangible goods and capabilities: food, roads, factories, houses, education, and healthcare.",
                      "If a government simply prints trillions of new banknotes without producing more goods, prices skyrocket (inflation).",
                      "You cannot eat paper notes or live inside a digital bank balance."
                    ]
                  }
                ],
                concepts: ["money_vs_wealth", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G5.I04",
                kind: "quiz",
                order: 4,
                title: "Checking Foundations of Value",
                subtitle: "Test your understanding of currency trust and real economic wealth.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L01.CT1.G5.I04.Q1",
                    type: "single_choice",
                    prompt: "If a central bank prints three times more currency overnight while the country's factories and farms produce the exact same amount of goods, what happens to prices?",
                    options: [
                      { id: "A", text: "Prices rise substantially because more money is chasing the same goods." },
                      { id: "B", text: "Prices drop by two-thirds immediately." },
                      { id: "C", text: "Everyone becomes three times wealthier in terms of actual living standards." }
                    ],
                    correct: "A",
                    explanation: "When the supply of money increases much faster than output, the purchasing power of each individual unit drops, causing general price inflation.",
                    concepts: ["money_vs_wealth", "inflation"]
                  },
                  {
                    id: "L01.CT1.G5.I04.Q2",
                    type: "true_false",
                    prompt: "Real wealth consists of tangible goods, services, and productive assets, whereas money is an instrument used to facilitate their trade.",
                    correct: true,
                    explanation: "Correct! Money is a claim check on real goods and productive capacity.",
                    concepts: ["money_vs_wealth"]
                  }
                ],
                concepts: ["money_vs_wealth", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G5.I05",
                kind: "slide",
                order: 5,
                title: "The Rules That Keep Money Working",
                subtitle: "Why governments enforce anti-counterfeiting laws and bank supervision.",
                body: [
                  {
                    type: "paragraph",
                    text: "For a monetary system to remain stable, a society needs strict legal and institutional protections:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Anti-counterfeiting laws: Preventing bad actors from forging currency.",
                      "Central Bank supervision: Regulating commercial banks to protect consumer deposits.",
                      "Contract enforcement: Ensuring court systems enforce business and loan agreements."
                    ]
                  }
                ],
                concepts: ["central_bank", "legal_tender"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L01.CT1.G6",
            title: "Market Mechanics: Supply, Demand, and Scarcity",
            objective: "Examine how prices adjust when consumer demand surges or product supplies fall.",
            items: [
              {
                id: "L01.CT1.G6.I01",
                kind: "slide",
                order: 1,
                title: "Two Markets, One Mission",
                subtitle: "Whether in an open-air market or on an e-commerce website, price discovery rules apply.",
                body: [
                  {
                    type: "paragraph",
                    text: "In any market, buyers want the lowest possible price to conserve their funds, while sellers want the highest possible price to cover expenses and earn a sustainable profit."
                  },
                  {
                    type: "paragraph",
                    text: "The ongoing interaction between buyers and sellers forms the market price. When many buyers compete for a scarce item, prices rise. When sellers have excess stock that nobody wants, prices fall."
                  }
                ],
                concepts: ["supply_and_demand", "scarcity"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G6.I02",
                kind: "widget",
                order: 2,
                title: "Navigate Changing Market Conditions",
                subtitle: "Select the most prudent action when unexpected market conditions arise.",
                widget_type: "choice_with_reflection",
                config: {
                  prompt: "A sudden flood cuts off highway transport, temporarily halving the tomato supply in your city. What happens to tomato prices in the local market over the next week?",
                  options: [
                    { id: "A", label: "Prices will increase because supply is constrained while demand remains steady." },
                    { id: "B", label: "Prices will stay unchanged because vendors never adjust prices." },
                    { id: "C", label: "Prices will drop to zero because tomatoes become rare." }
                  ],
                  follow_up_prompt: "How should a prudent household budget react when temporary food supply shocks occur?"
                },
                concepts: ["supply_and_demand", "scarcity"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G6.I03",
                kind: "slide",
                order: 3,
                title: "When Everybody Wants the Same Thing",
                subtitle: "How scarcity drives up valuations in real time.",
                body: [
                  {
                    type: "paragraph",
                    text: "Scarcity is the bedrock of economic valuation. Items that are abundant (like air or seawater) cost nothing, even though they are vital to life."
                  },
                  {
                    type: "paragraph",
                    text: "Conversely, items that are scarce, difficult to extract, and highly desired (such as gold, diamonds, or prime city center real estate) command premium prices."
                  }
                ],
                concepts: ["scarcity", "purchasing_power"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G6.I04",
                kind: "case_study",
                order: 4,
                title: "The Last Five Power Banks",
                subtitle: "Observe competitive bidding during a sudden electrical outage.",
                scenario: {
                  narrative: "A sudden regional blackout hits a university campus during final examination week. The campus electronics store has only five heavy-duty power banks left in inventory. Twenty desperate students crowd around the counter, all needing to charge laptops to submit final assignments before midnight.",
                  characters: [
                    { name: "Mr. Eze", role: "Shopkeeper", details: "Has 5 units remaining; normal price was ₦15,000" },
                    { name: "Students", role: "Exam Takers", details: "Facing imminent academic deadlines" }
                  ],
                  data: [
                    { label: "Available Inventory", value: "5 Units" },
                    { label: "Competing Buyers", value: "20 Students" },
                    { label: "Baseline Price", value: "₦15,000" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What economic force is occurring in this scenario?",
                    options: [
                      { id: "A", label: "Demand vastly exceeds supply, creating intense price pressure due to extreme scarcity." },
                      { id: "B", label: "The store owner is giving away power banks at half price." },
                      { id: "C", label: "Demand has collapsed because nobody wants charged laptops." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "When demand surges dramatically while supply is fixed in the short term, scarcity intensifies. Price acts as a rationing mechanism to allocate limited goods among competing buyers.",
                key_takeaway: "Market prices fluctuate to balance scarce supply with competing human demand.",
                concepts: ["supply_and_demand", "scarcity"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G6.I05",
                kind: "quiz",
                order: 5,
                title: "Explain Market Dynamics",
                subtitle: "Select the most accurate explanations for core market supply and demand questions.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L01.CT1.G6.I05.Q1",
                    type: "single_choice",
                    prompt: "Why can't people simply trade goods directly forever without using money?",
                    options: [
                      { id: "A", text: "Finding someone who wants what you have while offering what you need takes too much time and energy." },
                      { id: "B", text: "Direct trade is strictly prohibited by international law." },
                      { id: "C", text: "Barter only works if both people have identical items." }
                    ],
                    correct: "A",
                    explanation: "The double coincidence of wants and high search costs make barter unviable for a modern, specialized economy.",
                    concepts: ["barter", "double_coincidence_of_wants"]
                  },
                  {
                    id: "L01.CT1.G6.I05.Q2",
                    type: "single_choice",
                    prompt: "Which of the following best describes why money helps an economy grow?",
                    options: [
                      { id: "A", text: "It allows people to specialize in what they do best and trade freely with minimal transaction friction." },
                      { id: "B", text: "It guarantees that no business will ever lose money." },
                      { id: "C", text: "It makes all goods and services completely equal in quality." }
                    ],
                    correct: "A",
                    explanation: "Money reduces transaction costs, enabling division of labor and high-efficiency trade.",
                    concepts: ["specialisation", "medium_of_exchange"]
                  }
                ],
                concepts: ["barter", "medium_of_exchange"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L01.CT1.G7",
            title: "Mastering the Functions of Money",
            objective: "Review and evaluate trade challenges to solidify full comprehension of money's essential economic roles.",
            items: [
              {
                id: "L01.CT1.G7.I01",
                kind: "slide",
                order: 1,
                title: "You Are Running the Modern Market",
                subtitle: "A high-level synthesis of how currency anchors daily commercial life.",
                body: [
                  {
                    type: "paragraph",
                    text: "Take a moment to look at the entire financial architecture we have explored:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Barter proved too cumbersome due to the double coincidence of wants and divisibility issues.",
                      "Money emerged to perform three core jobs: Medium of Exchange, Unit of Account, and Store of Value.",
                      "Prices convey vital information regarding scarcity, helping consumers budget and businesses allocate resources.",
                      "Real wealth is not paper currency; it is the goods, skills, and productive assets that support human life."
                    ]
                  }
                ],
                concepts: ["medium_of_exchange", "unit_of_account", "store_of_value"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G7.I02",
                kind: "quiz",
                order: 2,
                title: "Solve the Trade Deadlock",
                subtitle: "Diagnose and resolve trade deadlocks using foundational economic principles.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L01.CT1.G7.I02.Q1",
                    type: "single_choice",
                    prompt: "Three merchants are locked in a barter standoff: Merchant A has shoes and wants goat meat. Merchant B has goat meat and wants timber. Merchant C has timber and wants shoes. How does introducing currency resolve this deadlock instantly?",
                    options: [
                      { id: "A", text: "Merchant A pays B with currency, B pays C with currency, and C buys the shoes from A with currency." },
                      { id: "B", text: "Merchant A must destroy their shoes to force the others to trade." },
                      { id: "C", text: "Merchant B must give away the goat meat for free." }
                    ],
                    correct: "A",
                    explanation: "Currency acts as a universal intermediate good. Each merchant converts their inventory into money, which is accepted by everyone without circular negotiation.",
                    concepts: ["medium_of_exchange", "barter"]
                  },
                  {
                    id: "L01.CT1.G7.I02.Q2",
                    type: "single_choice",
                    prompt: "Why is a ₦1,000 note more effective as a medium of exchange than a ₦1,000 coupon that is only accepted at one specific grocery store?",
                    options: [
                      { id: "A", text: "The note is legal tender with universal acceptance across all sellers and creditors." },
                      { id: "B", text: "The grocery coupon has a higher interest rate." },
                      { id: "C", text: "The grocery coupon cannot be printed on paper." }
                    ],
                    correct: "A",
                    explanation: "Universal acceptability and legal tender status are what make currency far superior to restricted-use tokens or store coupons.",
                    concepts: ["legal_tender", "medium_of_exchange"]
                  }
                ],
                concepts: ["medium_of_exchange", "barter"],
                authoring_status: "authored"
              },
              {
                id: "L01.CT1.G7.I03",
                kind: "slide",
                order: 3,
                title: "Lesson Summary: The True Power of Money",
                subtitle: "You now understand what money actually does—laying the groundwork to build income and real wealth.",
                body: [
                  {
                    type: "paragraph",
                    text: "Congratulations on completing Lesson 1! You have unlocked a clear, foundational understanding of why money exists and how it empowers daily trade."
                  },
                  {
                    type: "callout",
                    text: "Next in Lesson 2: We will explore why high income does not automatically equal wealth, and how to calculate your true financial net worth."
                  }
                ],
                concepts: ["medium_of_exchange", "money_vs_wealth"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // LESSON 2: MONEY, INCOME, AND WEALTH ARE NOT THE SAME
  // ==========================================
  L02: {
    id: "L02",
    number: 2,
    title: "Money, Income, and Wealth Are Not the Same",
    subtitle: "Learn the crucial differences between earning money, spending cash, and building lasting financial net worth.",
    difficulty: "Medium-High",
    contents: [
      {
        id: "L02.CT1",
        title: "Income: Where Your Money Comes From",
        objective: "Differentiate between various sources of income and understand why earning a high salary does not guarantee wealth.",
        groups: [
          {
            id: "L02.CT1.G1",
            title: "Where Your Money Comes From",
            objective: "Identify different cash inflows including allowances, wages, sales, and capital gains.",
            items: [
              {
                id: "L02.CT1.G1.I01",
                kind: "case_study",
                order: 1,
                title: "A Student Receiving an Allowance",
                subtitle: "Examine how irregular cash inflows require careful allocation.",
                scenario: {
                  narrative: "Dayo is a university student who receives a monthly allowance of ₦35,000 from his parents. Additionally, he occasionally makes ₦10,000 by tutoring junior secondary school students in mathematics. In some months, no tutoring opportunities arise.",
                  characters: [
                    { name: "Dayo", role: "Undergraduate Student", details: "Has fixed allowance and variable tutoring income" }
                  ],
                  data: [
                    { label: "Monthly Allowance", value: "₦35,000" },
                    { label: "Tutoring Income (Variable)", value: "₦0 - ₦15,000" },
                    { label: "Campus Living Expenses", value: "₦30,000" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What type of income is Dayo's tutoring revenue?",
                    options: [
                      { id: "A", label: "Earned income (direct compensation for his teaching labor and time)." },
                      { id: "B", label: "Passive income from corporate stock dividends." },
                      { id: "C", label: "A fixed government pension." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Dayo's cash flow illustrates the difference between passive gifts/allowances and earned income. When income is variable, budgeting based strictly on guaranteed baseline inflows prevents mid-month financial shortfalls.",
                key_takeaway: "Earned income directly trades your time and expertise for money.",
                concepts: ["income", "earned_income"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT1.G1.I02",
                kind: "slide",
                order: 2,
                title: "The Four Types of Income Streams",
                subtitle: "How money enters your bank account.",
                body: [
                  {
                    type: "paragraph",
                    text: "Income is any money you receive over a specific period. Financial planners classify income into four main categories:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Earned Income: Wages, salaries, commissions, and bonuses earned by working.",
                      "Profit Income: Revenue generated from operating a business minus the expenses.",
                      "Passive / Investment Income: Dividends, bond interest, and rental income from property.",
                      "Transfer / Gift Income: Allowances, scholarships, grants, and inheritances."
                    ]
                  },
                  {
                    type: "callout",
                    text: "Most people begin with earned income. Wealth creation begins when you use earned income to acquire assets that produce passive and profit income."
                  }
                ],
                concepts: ["income", "earned_income", "passive_income"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT1.G1.I03",
                kind: "widget",
                order: 3,
                title: "Identify the Source of Income",
                subtitle: "Classify incoming cash transactions into their correct economic category.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Income Stream Sorter",
                  buckets: [
                    { id: "earned", label: "Earned Income (Labor)" },
                    { id: "profit", label: "Business Profit" },
                    { id: "passive", label: "Passive / Investment" }
                  ],
                  cards: [
                    { id: "c1", label: "Monthly salary from a bank job", bucket: "earned", feedback: "Salaries are compensation for active work." },
                    { id: "c2", label: "Net profit from selling packaged snacks", bucket: "profit", feedback: "Business revenue minus costs is profit." },
                    { id: "c3", label: "Quarterly dividends received from MTN shares", bucket: "passive", feedback: "Dividends are returns on invested capital without daily labor." },
                    { id: "c4", label: "Weekend freelance photography fees", bucket: "earned", feedback: "Freelance fees require active work." }
                  ]
                },
                concepts: ["income", "earned_income", "passive_income"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT1.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Income or Something Else?",
                subtitle: "Test your ability to distinguish real income from balance sheet transfers.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L02.CT1.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "If you take a ₦500,000 personal loan from a commercial bank, is that loan considered income?",
                    options: [
                      { id: "A", text: "No, a loan is a liability (debt) that must be repaid with interest, not income." },
                      { id: "B", text: "Yes, any cash deposited into your bank account is income." },
                      { id: "C", text: "Yes, because it increases your disposable spending immediately." }
                    ],
                    correct: "A",
                    explanation: "Borrowed money is a liability, not income. It creates an offsetting legal obligation to repay.",
                    concepts: ["income", "liability"]
                  },
                  {
                    id: "L02.CT1.G1.I04.Q2",
                    type: "true_false",
                    prompt: "Rental payments received by a property owner who leases out two residential apartments represent passive investment income.",
                    correct: true,
                    explanation: "Rental income is generated by owning productive property assets, making it an investment inflow.",
                    concepts: ["passive_income", "asset"]
                  }
                ],
                concepts: ["income", "liability", "passive_income"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L02.CT1.G2",
            title: "Salary, Sales, Gifts, and Other Inflows",
            objective: "Analyze stability, predictability, and tax obligations associated with different income channels.",
            items: [
              {
                id: "L02.CT1.G2.I01",
                kind: "case_study",
                order: 1,
                title: "Two Workers, Different Realities",
                subtitle: "Compare the financial dynamics of salaried employment vs. entrepreneurial sales.",
                scenario: {
                  narrative: "Babatunde works as a civil servant with a dependable monthly net salary of ₦180,000. Fatima operates a fashion boutique where her monthly revenue fluctuates wildly between ₦80,000 in slow months and ₦650,000 during festive seasons. Babatunde knows exactly what to expect, while Fatima must manage cash flow carefully to survive lean periods.",
                  characters: [
                    { name: "Babatunde", role: "Civil Servant", details: "Fixed, predictable income of ₦180,000" },
                    { name: "Fatima", role: "Fashion Retailer", details: "Highly volatile income between ₦80k and ₦650k" }
                  ],
                  data: [
                    { label: "Babatunde Monthly Salary", value: "₦180,000" },
                    { label: "Fatima Average Monthly Sales", value: "₦320,000" },
                    { label: "Fatima Lean Month Low", value: "₦80,000" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What financial habit is most essential for Fatima to maintain financial stability?",
                    options: [
                      { id: "A", label: "Building a cash reserve during peak months to cover expenses during slow months." },
                      { id: "B", label: "Spending all profits immediately during peak months on luxury clothes." },
                      { id: "C", label: "Stopping her retail business completely." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Predictability of income is just as critical as the average amount earned. Irregular earners must act as their own financial shock absorbers by retaining surpluses during boom months.",
                key_takeaway: "Variable income demands rigorous cash-flow buffering during peak earning seasons.",
                concepts: ["cash_flow", "irregular_income"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT1.G2.I02",
                kind: "slide",
                order: 2,
                title: "Cash Flow: The Speed and Rhythm of Money",
                subtitle: "Why timing matters as much as the total amount.",
                body: [
                  {
                    type: "definition",
                    term: "Cash Flow",
                    text: "The ongoing net movement of money into and out of your personal or business accounts over a given timeframe."
                  },
                  {
                    type: "paragraph",
                    text: "You can be owed millions on paper, but if you do not have liquid cash to pay your rent or electricity bill this Friday, you are in a cash-flow crisis."
                  },
                  {
                    type: "callout",
                    text: "Positive cash flow means you consistently bring in more money than you spend each month. Negative cash flow forces you to rely on debt or drain your savings."
                  }
                ],
                concepts: ["cash_flow", "liquidity"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT1.G2.I03",
                kind: "widget",
                order: 3,
                title: "Classify Cash Flow Movements",
                subtitle: "Determine whether financial events represent cash inflows or cash outflows.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Cash Flow Sorter",
                  buckets: [
                    { id: "inflow", label: "Cash Inflow (+)" },
                    { id: "outflow", label: "Cash Outflow (-)" }
                  ],
                  cards: [
                    { id: "c1", label: "Client payment for website design", bucket: "inflow", feedback: "Receiving funds for services is an inflow." },
                    { id: "c2", label: "Monthly mobile phone data subscription", bucket: "outflow", feedback: "Paying for telecommunications is an outflow." },
                    { id: "c3", label: "Generator fuel and maintenance", bucket: "outflow", feedback: "Operating costs reduce your cash balance." },
                    { id: "c4", label: "Interest paid into your high-yield savings account", bucket: "inflow", feedback: "Interest earned increases your available funds." }
                  ]
                },
                concepts: ["cash_flow", "income"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT1.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Mastering Income and Cash Flow",
                subtitle: "Verify your grasp of cash flow timing and income stability.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L02.CT1.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "A graphic designer invoices clients for ₦800,000 in January, but clients only pay invoices 60 days later in March. In January, the designer's bank account has ₦10,000 and rent of ₦150,000 is due. What problem is the designer facing?",
                    options: [
                      { id: "A", text: "A cash-flow timing crunch, despite having high invoiced earnings on paper." },
                      { id: "B", text: "A complete lack of marketable skills." },
                      { id: "C", text: "Excessive passive income." }
                    ],
                    correct: "A",
                    explanation: "Paper earnings are not cash in hand. Cash flow timing is vital for meeting immediate legal and living obligations.",
                    concepts: ["cash_flow", "liquidity"]
                  }
                ],
                concepts: ["cash_flow"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L02.CT1.G3",
            title: "High Income vs. Wealth Creation",
            objective: "Understand why spending habits determine whether high earnings turn into real wealth or disappear.",
            items: [
              {
                id: "L02.CT1.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The High-Earning Worker with Zero Savings",
                subtitle: "How high earners fall into the trap of living paycheck to paycheck.",
                scenario: {
                  narrative: "Dr. Victor earns ₦1,800,000 per month as a senior consulting engineer. However, he finances two luxury vehicles at ₦450,000 per month, rents an upscale serviced duplex for ₦600,000 monthly, and spends ₦700,000 on fine dining, high-end gadgets, and VIP clubbing. At the end of every month, his savings balance is ₦0. If he misses two months of salary, he faces immediate insolvency.",
                  characters: [
                    { name: "Dr. Victor", role: "Senior Consulting Engineer", details: "Earns ₦1.8M/mo, spends ₦1.8M/mo" }
                  ],
                  data: [
                    { label: "Gross Monthly Salary", value: "₦1,800,000" },
                    { label: "Fixed Monthly Liabilities", value: "₦1,050,000" },
                    { label: "Lifestyle Discretionary Expenses", value: "₦750,000" },
                    { label: "Monthly Retained Savings", value: "₦0" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Is Dr. Victor genuinely wealthy?",
                    options: [
                      { id: "A", label: "No; he has high income and high consumption, but zero accumulated wealth." },
                      { id: "B", label: "Yes, because anyone who earns over ₦1,000,000 is automatically wealthy." },
                      { id: "C", label: "Yes, because driving expensive luxury vehicles proves high net worth." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Wealth is not what you spend; wealth is the financial assets you retain and invest. An individual earning ₦250,000 who saves ₦50,000 every month is building wealth faster than someone earning ₦1.8M who spends every kobo.",
                key_takeaway: "Wealth is defined by what you accumulate and keep, not the visual spectacle of what you spend.",
                concepts: ["money_vs_wealth", "lifestyle_inflation"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT1.G3.I02",
                kind: "slide",
                order: 2,
                title: "Income Is the Tap; Wealth Is the Reservoir",
                subtitle: "The plumbing analogy of personal finance.",
                body: [
                  {
                    type: "paragraph",
                    text: "Think of your personal finances as a water system:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Income is the water flowing out of the tap.",
                      "Expenses are the leaks and drains at the bottom.",
                      "Wealth is the clean water collected and stored in the reservoir tank."
                    ]
                  },
                  {
                    type: "callout",
                    text: "If your tap flows at 1,000 liters per hour but your drain is open at 1,000 liters per hour, your tank remains empty. The moment the tap turns off (illness, retirement, job loss), you face immediate drought."
                  }
                ],
                concepts: ["money_vs_wealth", "saving"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT1.G3.I03",
                kind: "widget",
                order: 3,
                title: "Compare Two Financial Lives",
                subtitle: "Examine two workers over five years to see how saving rates beat raw income.",
                widget_type: "option_comparison",
                config: {
                  title: "High Earner vs. Disciplined Saver (5-Year Horizon)",
                  option_a: {
                    name: "Worker A: The Big Spender",
                    attributes: {
                      "Monthly Net Salary": "₦1,500,000",
                      "Monthly Living Expenses": "₦1,450,000",
                      "Monthly Savings": "₦50,000 (3.3%)",
                      "5-Year Accumulated Savings": "₦3,000,000",
                      "Emergency Survival Buffer": "2 Months of Expenses"
                    }
                  },
                  option_b: {
                    name: "Worker B: The Builder",
                    attributes: {
                      "Monthly Net Salary": "₦450,000",
                      "Monthly Living Expenses": "₦300,000",
                      "Monthly Savings": "₦150,000 (33.3%)",
                      "5-Year Accumulated Savings": "₦9,000,000 + Investment Yield",
                      "Emergency Survival Buffer": "30 Months of Expenses"
                    }
                  }
                },
                concepts: ["money_vs_wealth", "net_worth", "saving"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT1.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Does Higher Income Equal Wealth?",
                subtitle: "Check your conceptual grasp of income versus retained capital.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L02.CT1.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "Which equation best describes how financial wealth is built over time?",
                    options: [
                      { id: "A", text: "Wealth = (Income - Expenses) consistently invested in appreciating assets" },
                      { id: "B", text: "Wealth = Borrowing the maximum credit allowed by your bank" },
                      { id: "C", text: "Wealth = Upgrading your lifestyle every time your salary increases" }
                    ],
                    correct: "A",
                    explanation: "Wealth is the surplus retained between income and expenses, compounded over time in productive assets.",
                    concepts: ["net_worth", "saving"]
                  }
                ],
                concepts: ["net_worth", "money_vs_wealth"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      },
      {
        id: "L02.CT2",
        title: "Assets, Liabilities, and Net Worth",
        objective: "Master the fundamental personal balance sheet: what you own (assets), what you owe (liabilities), and your true net worth.",
        groups: [
          {
            id: "L02.CT2.G1",
            title: "Understanding Assets",
            objective: "Define assets, distinguish appreciating from depreciating items, and understand liquidity.",
            items: [
              {
                id: "L02.CT2.G1.I01",
                kind: "case_study",
                order: 1,
                title: "A Trader's Inventory, Shop, and Cash",
                subtitle: "Audit the balance sheet of an active retail entrepreneur.",
                scenario: {
                  narrative: "Ngozi operates a wholesale dry-foods store in Onitsha. She owns ₦4,000,000 in bagged rice inventory, ₦1,200,000 in bank deposits, commercial shelving units worth ₦300,000, and a delivery van worth ₦3,500,000. All of these items generate income or can be converted to cash.",
                  characters: [
                    { name: "Ngozi", role: "Wholesale Trader", details: "Has diversified commercial assets" }
                  ],
                  data: [
                    { label: "Dry Foods Inventory", value: "₦4,000,000" },
                    { label: "Liquid Bank Cash", value: "₦1,200,000" },
                    { label: "Delivery Vehicle", value: "₦3,500,000" },
                    { label: "Store Equipment", value: "₦300,000" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What is the total value of Ngozi's commercial assets?",
                    options: [
                      { id: "A", label: "₦9,000,000 (all resources with measurable monetary value)." },
                      { id: "B", label: "Only the ₦1,200,000 in cash." },
                      { id: "C", label: "₦0 because merchandise is not an asset." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "An asset is any economic resource you own that has quantifiable value and can generate future cash flows or be liquidated. Ngozi's balance sheet includes both liquid cash and working inventory.",
                key_takeaway: "Assets are items of economic value that work for you or can be liquidated for cash.",
                concepts: ["asset", "liquidity"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT2.G1.I02",
                kind: "slide",
                order: 2,
                title: "Appreciating vs. Depreciating Assets",
                subtitle: "Not all possessions grow in value over time.",
                body: [
                  {
                    type: "paragraph",
                    text: "A possession is only an investment asset if it protects or expands your purchasing power over time:"
                  },
                  {
                    type: "definition",
                    term: "Appreciating Asset",
                    text: "An asset that increases in economic value over time, such as productive agricultural land, residential real estate, or shares in profitable corporations."
                  },
                  {
                    type: "definition",
                    term: "Depreciating Asset",
                    text: "An item that loses economic market value with age, usage, and technological obsolescence, such as smartphones, consumer electronics, and motor vehicles."
                  }
                ],
                concepts: ["appreciating_asset", "depreciating_asset"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT2.G1.I03",
                kind: "widget",
                order: 3,
                title: "Identify and Sort Real Assets",
                subtitle: "Distinguish appreciating assets from depreciating consumer items.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Asset Quality Classifier",
                  buckets: [
                    { id: "appreciating", label: "Appreciating Asset" },
                    { id: "depreciating", label: "Depreciating Asset" }
                  ],
                  cards: [
                    { id: "c1", label: "Plots of titled land in an expanding suburban corridor", bucket: "appreciating", feedback: "Land in growing areas tends to increase in value." },
                    { id: "c2", label: "Latest flagship smartphone bought for ₦1,400,000", bucket: "depreciating", feedback: "Phones lose 40% of resale value within two years." },
                    { id: "c3", label: "A diversified portfolio of blue-chip stock index funds", bucket: "appreciating", feedback: "Equities compound with corporate economic growth." },
                    { id: "c4", label: "A luxury sedan purchased brand new from the showroom", bucket: "depreciating", feedback: "Cars lose value immediately upon registration." }
                  ]
                },
                concepts: ["appreciating_asset", "depreciating_asset"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT2.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Asset or Not?",
                subtitle: "Test your ability to classify items on a personal balance sheet.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L02.CT2.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "Why is a ₦2,000,000 treasury bill considered a stronger financial asset than a ₦2,000,000 designer watch for an ordinary investor?",
                    options: [
                      { id: "A", text: "Treasury bills generate guaranteed yield and are highly liquid, while luxury watches have uncertain secondary market resale value." },
                      { id: "B", text: "Treasury bills can be worn to social weddings." },
                      { id: "C", text: "Designer watches are illegal to sell." }
                    ],
                    correct: "A",
                    explanation: "Financial assets like treasury bills produce predictable interest income and can be quickly converted back to cash at face value.",
                    concepts: ["asset", "liquidity"]
                  }
                ],
                concepts: ["asset", "appreciating_asset"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L02.CT2.G2",
            title: "Understanding Liabilities",
            objective: "Identify financial obligations, examine interest costs, and differentiate good debt from destructive consumer debt.",
            items: [
              {
                id: "L02.CT2.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Smartphone Bought on Instalments",
                subtitle: "Analyze the hidden cost of consumer installment borrowing.",
                scenario: {
                  narrative: "Tari wants a premium smartphone that retails for ₦400,000 cash. He signs a 'Buy Now, Pay Later' agreement requiring him to pay ₦48,000 every month for 12 months. Tari feels the monthly payment is affordable, but has not calculated the total annual cost.",
                  characters: [
                    { name: "Tari", role: "Office Worker", details: "Took 12-month installment contract for mobile device" }
                  ],
                  data: [
                    { label: "Cash Retail Price", value: "₦400,000" },
                    { label: "Monthly Instalment", value: "₦48,000" },
                    { label: "Total Paid After 1 Year", value: "₦576,000" },
                    { label: "Financing Surcharge", value: "₦176,000 (44% Effective Cost)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What economic reality did Tari enter by signing the agreement?",
                    options: [
                      { id: "A", label: "He took on a ₦576,000 liability to purchase an asset that depreciates to ₦250,000 within a year." },
                      { id: "B", label: "He created a passive income stream for himself." },
                      { id: "C", label: "He received a free gift from the vendor." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Borrowing at high interest rates to purchase rapidly depreciating consumer items is the single fastest way to destroy net worth. Tari paid ₦176,000 in financing fees for a phone that will be worth far less when his final payment clears.",
                key_takeaway: "A liability represents a claim on your future earnings. Avoid high-interest debt for depreciating lifestyle items.",
                concepts: ["liability", "depreciating_asset"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT2.G2.I02",
                kind: "slide",
                order: 2,
                title: "What Is a Liability?",
                subtitle: "Debts that drain your future cash flow.",
                body: [
                  {
                    type: "definition",
                    term: "Liability",
                    text: "Any legal obligation or borrowed monetary amount that you owe to another person, bank, or vendor."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Unpaid credit card or loan app balances.",
                      "Money borrowed from family members or cooperative societies.",
                      "Outstanding utility bills, rent arrears, and taxes due."
                    ]
                  },
                  {
                    type: "callout",
                    text: "Every naira of debt you carry requires a portion of your future working hours just to pay off the past."
                  }
                ],
                concepts: ["liability"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT2.G2.I03",
                kind: "widget",
                order: 3,
                title: "Classify Assets vs. Liabilities",
                subtitle: "Assign balance sheet items to what you own vs. what you owe.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Balance Sheet Sorter",
                  buckets: [
                    { id: "asset", label: "Asset (You Own)" },
                    { id: "liability", label: "Liability (You Owe)" }
                  ],
                  cards: [
                    { id: "c1", label: "₦500,000 fixed deposit in commercial bank", bucket: "asset", feedback: "Bank deposits are cash assets you own." },
                    { id: "c2", label: "₦200,000 quick loan app debt with 20% interest", bucket: "liability", feedback: "Money owed to lenders is a liability." },
                    { id: "c3", label: "Shares in a food manufacturing conglomerate", bucket: "asset", feedback: "Equities represent ownership stakes in productive businesses." },
                    { id: "c4", label: "Outstanding unpaid rent of ₦350,000 owed to landlord", bucket: "liability", feedback: "Arrears are legally binding debts." }
                  ]
                },
                concepts: ["asset", "liability"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT2.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Identify the True Debt Position",
                subtitle: "Test your ability to isolate liabilities from income and assets.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L02.CT2.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "If you purchase a house valued at ₦30,000,000 using ₦6,000,000 of your own savings and a ₦24,000,000 mortgage loan from a bank, what is your asset and what is your liability?",
                    options: [
                      { id: "A", text: "The house is an asset of ₦30,000,000; the mortgage is a liability of ₦24,000,000." },
                      { id: "B", text: "You have zero assets until the mortgage is 100% paid off." },
                      { id: "C", text: "The mortgage is an asset because the bank gave you money." }
                    ],
                    correct: "A",
                    explanation: "You own the house (asset worth ₦30M), but owe the bank (liability of ₦24M). Your net equity is ₦6M.",
                    concepts: ["asset", "liability", "net_worth"]
                  }
                ],
                concepts: ["asset", "liability"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L02.CT2.G3",
            title: "Net Worth: Calculating What You Actually Own",
            objective: "Calculate personal net worth using the standard formula: Net Worth = Total Assets - Total Liabilities.",
            items: [
              {
                id: "L02.CT2.G3.I01",
                kind: "case_study",
                order: 1,
                title: "Two People with Similar Assets but Different Debts",
                subtitle: "How debt exposure dramatically changes the true financial picture.",
                scenario: {
                  narrative: "Chidi and Emeka both live in similar apartments and each control total assets valued at ₦12,000,000 (cars, equipment, and cash). However, Chidi has no debts whatsoever. Emeka financed his car, took loan app advances, and owes ₦8,500,000 across multiple lenders.",
                  characters: [
                    { name: "Chidi", role: "Debt-Free Worker", details: "Assets: ₦12M | Liabilities: ₦0" },
                    { name: "Emeka", role: "Leveraged Worker", details: "Assets: ₦12M | Liabilities: ₦8.5M" }
                  ],
                  data: [
                    { label: "Chidi Net Worth", value: "₦12,000,000" },
                    { label: "Emeka Net Worth", value: "₦3,500,000" },
                    { label: "Emeka Monthly Debt Service", value: "₦280,000" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "To an outsider looking at their cars and clothes, both look equally wealthy. What is the real financial truth?",
                    options: [
                      { id: "A", label: "Chidi has more than triple Emeka's real net worth and zero monthly debt stress." },
                      { id: "B", label: "Emeka is richer because having loans proves good credit." },
                      { id: "C", label: "Both are financially identical." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Visible possessions often deceive outside observers. Net worth reveals reality: Emeka's net worth is only ₦3,500,000 despite his ₦12,000,000 surface lifestyle, because 70% of his assets are claimed by creditors.",
                key_takeaway: "Net worth is the only objective scorecard of financial independence.",
                concepts: ["net_worth", "liability"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT2.G3.I02",
                kind: "slide",
                order: 2,
                title: "The Golden Net Worth Formula",
                subtitle: "Assets minus Liabilities equals your Net Worth.",
                body: [
                  {
                    type: "definition",
                    term: "Net Worth",
                    text: "Total Value of Everything You Own (Assets) minus Total Amount of Everything You Owe (Liabilities)."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Positive Net Worth: Your assets exceed your liabilities. If you sold everything and paid all debts, you would have cash remaining.",
                      "Zero Net Worth: Your assets exactly match your debts.",
                      "Negative Net Worth: You owe more than the total market value of everything you possess (insolvency)."
                    ]
                  },
                  {
                    type: "callout",
                    text: "Your primary long-term financial goal should be increasing your net worth every single year, regardless of market conditions."
                  }
                ],
                concepts: ["net_worth", "asset", "liability"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT2.G3.I03",
                kind: "widget",
                order: 3,
                title: "Interactive Net Worth Calculator",
                subtitle: "Input your assets and liabilities to calculate your net financial position.",
                widget_type: "net_worth_calculator",
                config: {
                  title: "Personal Balance Sheet Calculator",
                  default_assets: [
                    { name: "Emergency Savings", value: 350000 },
                    { name: "Investment Portfolio", value: 800000 },
                    { name: "Equipment / Resale Goods", value: 450000 }
                  ],
                  default_liabilities: [
                    { name: "Credit Card / Loan App", value: 150000 },
                    { name: "Unpaid Personal Debt", value: 50000 }
                  ]
                },
                concepts: ["net_worth", "asset", "liability"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT2.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Calculate and Interpret Net Worth",
                subtitle: "Solve balance sheet scenarios to verify your calculation skills.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L02.CT2.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "A professional has ₦4,000,000 in bank savings, owns a car worth ₦3,000,000, and has zero investments. They owe ₦2,500,000 on a student loan and ₦500,000 on a credit line. What is their net worth?",
                    options: [
                      { id: "A", text: "₦4,000,000 (Assets: ₦7M - Liabilities: ₦3M)" },
                      { id: "B", text: "₦7,000,000" },
                      { id: "C", text: "₦10,000,000" }
                    ],
                    correct: "A",
                    explanation: "Total Assets = ₦4M + ₦3M = ₦7M. Total Liabilities = ₦2.5M + ₦0.5M = ₦3M. Net Worth = ₦7M - ₦3M = ₦4,000,000.",
                    concepts: ["net_worth", "asset", "liability"]
                  }
                ],
                concepts: ["net_worth"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L02.CT2.G4",
            title: "The Difference Between Earning and Keeping",
            objective: "Synthesize the complete distinction between income, assets, liabilities, and true wealth.",
            items: [
              {
                id: "L02.CT2.G4.I01",
                kind: "case_study",
                order: 1,
                title: "The Business Owner and the High-Paid Executive",
                subtitle: "Contrast active employment earnings with scalable equity ownership.",
                scenario: {
                  narrative: "Samuel earns ₦2,200,000 monthly as a corporate banking director. He must work 60 hours every week to maintain this income. Halima founded a commercial logistics company ten years ago. Her company generates steady profits and has an independent management team. Halima draws a modest salary of ₦800,000, but owns 100% of the business shares valued at ₦120,000,000.",
                  characters: [
                    { name: "Samuel", role: "Corporate Executive", details: "High earned income (₦2.2M/mo) tied 100% to his active time" },
                    { name: "Halima", role: "Business Owner", details: "Moderate salary (₦800k/mo) + ₦120M in commercial business equity" }
                  ],
                  data: [
                    { label: "Samuel Annual Net Salary", value: "₦26,400,000" },
                    { label: "Halima Business Asset Value", value: "₦120,000,000" },
                    { label: "Samuel Net Assets", value: "₦15,000,000" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "If both individuals stopped working today, who possesses true financial freedom?",
                    options: [
                      { id: "A", label: "Halima, because her business equity generates ongoing income without requiring her continuous presence." },
                      { id: "B", label: "Samuel, because his monthly salary was higher." },
                      { id: "C", label: "Neither person can survive without a salary." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "True financial wealth decoupling survival from continuous daily labor. Samuel is wealthy only as long as he continues working 60 hours a week. Halima has built a productive asset that works for her around the clock.",
                key_takeaway: "True wealth means owning productive assets that generate value independently of your physical presence.",
                concepts: ["money_vs_wealth", "passive_income", "asset"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT2.G4.I02",
                kind: "slide",
                order: 2,
                title: "Summary: The Three Financial Buckets",
                subtitle: "Never confuse these three distinct concepts again.",
                body: [
                  {
                    type: "table",
                    columns: ["Concept", "What It Represents", "How It Changes"],
                    rows: [
                      ["Money / Cash", "Current medium of exchange in your wallet or bank", "Spent or saved daily"],
                      ["Income", "Rate at which cash flows to you over time", "Increases via raises, sales, or promotions"],
                      ["Wealth (Net Worth)", "Accumulated stock of productive assets minus debts", "Grows by consistently investing the surplus"]
                    ]
                  },
                  {
                    type: "callout",
                    text: "You do not need a multi-million naira salary to build wealth; you need a consistent habit of spending less than you earn and investing the difference."
                  }
                ],
                concepts: ["money_vs_wealth", "net_worth"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT2.G4.I03",
                kind: "widget",
                order: 3,
                title: "Personal Financial Statement Review",
                subtitle: "Analyze and benchmark a simulated balance sheet.",
                widget_type: "cash_flow_classifier",
                config: {
                  title: "Monthly Cash Flow vs Net Worth Health Check",
                  monthly_inflow: 450000,
                  categories: [
                    { name: "Rent & Utilities", amount: 160000, essential: true },
                    { name: "Food & Groceries", amount: 90000, essential: true },
                    { name: "Transport & Fuel", amount: 50000, essential: true },
                    { name: "Discretionary Entertainment", amount: 40000, essential: false },
                    { name: "Asset Investment Allocation", amount: 110000, essential: true }
                  ]
                },
                concepts: ["cash_flow", "budget", "saving"],
                authoring_status: "authored"
              },
              {
                id: "L02.CT2.G4.I04",
                kind: "quiz",
                order: 4,
                title: "Who Is Financially Better Off?",
                subtitle: "Final comprehensive quiz for Lesson 2.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L02.CT2.G4.I04.Q1",
                    type: "single_choice",
                    prompt: "Which individual has the healthiest long-term financial foundation?",
                    options: [
                      { id: "A", text: "Person X: Earns ₦350,000, spends ₦250,000, invests ₦100,000 monthly, has zero debt." },
                      { id: "B", text: "Person Y: Earns ₦1,200,000, spends ₦1,190,000, saves ₦10,000, owes ₦5,000,000 in car loans." },
                      { id: "C", text: "Person Z: Unemployed with no savings who borrows from friends." }
                    ],
                    correct: "A",
                    explanation: "Person X maintains a high savings rate (nearly 29%), lives within their means, carries zero debt, and compounds assets systematically.",
                    concepts: ["net_worth", "saving"]
                  }
                ],
                concepts: ["net_worth", "money_vs_wealth"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // LESSON 3: WHAT GIVES MONEY ITS VALUE?
  // ==========================================
  L03: {
    id: "L03",
    number: 3,
    title: "What Gives Money Its Value?",
    subtitle: "Explore the evolution from commodity money to fiat currency, central banking, and why trust holds the entire financial system together.",
    difficulty: "High",
    contents: [
      {
        id: "L03.CT1",
        title: "From Gold to Digital Numbers: The Evolution of Trust",
        objective: "Understand how money evolved from physical commodities to paper representative money and modern fiat currency.",
        groups: [
          {
            id: "L03.CT1.G1",
            title: "Commodity Money and Intrinsic Value",
            objective: "Examine how physical goods like salt, cowries, and precious metals functioned as early currency.",
            items: [
              {
                id: "L03.CT1.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The Ancient Cowrie Shell Trade",
                subtitle: "How natural rarity established early monetary exchange across West Africa.",
                scenario: {
                  narrative: "Centuries ago in West Africa, cowrie shells imported from the Indian Ocean were universally accepted as money. Because cowrie shells did not occur naturally on West African beaches, their local supply was strictly limited. Traders could easily count them, transport them in bags, and use them to purchase everything from salt to cattle.",
                  characters: [
                    { name: "Kofi", role: "Coastal Trader", details: "Using cowrie currency for trans-regional trade" }
                  ],
                  data: [
                    { label: "Currency Material", value: "Natural Cowrie Shells" },
                    { label: "Key Strength", value: "Naturally Scarce & Uniform" },
                    { label: "Downside", value: "Heavy to transport in bulk" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What made cowrie shells effective as money in ancient West Africa?",
                    options: [
                      { id: "A", label: "Natural scarcity and universal social acceptance within trade routes." },
                      { id: "B", label: "They could be eaten as emergency food." },
                      { id: "C", label: "They were legally decreed by the United Nations." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Commodity money functions when an item possesses natural scarcity, durability, and widespread social recognition. When European merchants later flooded the coast with shiploads of imported shells, the supply skyrocketed and cowrie currency collapsed.",
                key_takeaway: "Scarcity is essential for any currency to maintain purchasing power.",
                concepts: ["commodity_money", "scarcity"],
                authoring_status: "authored"
              },
              {
                id: "L03.CT1.G1.I02",
                kind: "slide",
                order: 2,
                title: "The Qualities of Sound Money",
                subtitle: "Why gold, silver, and modern currencies triumphed over other commodities.",
                body: [
                  {
                    type: "paragraph",
                    text: "Throughout history, humans experimented with livestock, grain, shells, and precious metals. The commodities that survived as money possessed six golden properties:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Durability: It cannot rot, rust, or disintegrate easily.",
                      "Portability: High value per unit of weight; easy to carry.",
                      "Divisibility: Can be split into smaller denominations without losing value.",
                      "Uniformity: Every unit of the same face value is identical in purchasing power.",
                      "Scarcity: Cannot be effortlessly reproduced or created at zero cost.",
                      "Acceptability: Recognized and respected by the broader commercial community."
                    ]
                  }
                ],
                concepts: ["commodity_money", "medium_of_exchange"],
                authoring_status: "authored"
              },
              {
                id: "L03.CT1.G1.I03",
                kind: "widget",
                order: 3,
                title: "Evaluate Commodity Money Candidates",
                subtitle: "Test different physical items against the six criteria of sound money.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Money Suitability Test",
                  buckets: [
                    { id: "pass", label: "Suitable as Money" },
                    { id: "fail", label: "Fails Key Criteria" }
                  ],
                  cards: [
                    { id: "c1", label: "Gold & Silver Coins", bucket: "pass", feedback: "Durable, divisible, rare, and portable." },
                    { id: "c2", label: "Fresh Mangoes", bucket: "fail", feedback: "Rots quickly (not durable) and abundant in season (not scarce)." },
                    { id: "c3", label: "Standardized Paper Banknotes backed by Central Bank", bucket: "pass", feedback: "Lightweight, divisible, uniform, and legally protected." },
                    { id: "c4", label: "Living Goats", bucket: "fail", feedback: "Hard to carry, cannot divide alive, and requires continuous feeding." }
                  ]
                },
                concepts: ["commodity_money", "store_of_value"],
                authoring_status: "authored"
              },
              {
                id: "L03.CT1.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Commodity Money Check",
                subtitle: "Verify your understanding of commodity-based currencies.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L03.CT1.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "Why did precious metals like gold and silver dominate global trade for thousands of years?",
                    options: [
                      { id: "A", text: "They combine physical durability, natural rarity, high value density, and easy divisibility." },
                      { id: "B", text: "They were created artificially by early bankers in laboratories." },
                      { id: "C", text: "They dissolved easily in water." }
                    ],
                    correct: "A",
                    explanation: "Gold and silver do not corrode, are difficult to counterfeit, and pack substantial value into portable coins.",
                    concepts: ["commodity_money"]
                  }
                ],
                concepts: ["commodity_money"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L03.CT1.G2",
            title: "From Gold Backing to Modern Fiat Currency",
            objective: "Trace the historical journey from gold-backed paper certificates to modern government-decreed fiat money.",
            items: [
              {
                id: "L03.CT1.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Goldsmith's Paper Receipt",
                subtitle: "How the first paper banknotes were born from gold storage lockers.",
                scenario: {
                  narrative: "In 17th-century London, merchants deposited heavy gold coins into secure vaults owned by goldsmiths. The goldsmiths issued paper receipts promising to return the exact weight of gold upon presentation. Soon, merchants realized that instead of walking to the vault to withdraw heavy gold coins, they could simply hand over the paper receipts to settle business deals. Paper money was born.",
                  characters: [
                    { name: "Sir Thomas", role: "Merchant", details: "Trades paper receipts instead of heavy gold" },
                    { name: "Goldsmith Vault", role: "Early Banker", details: "Stores gold and issues redeemable paper certificates" }
                  ],
                  data: [
                    { label: "Vault Physical Gold", value: "1,000 Ounces" },
                    { label: "Issued Paper Notes", value: "1,000 Units" },
                    { label: "Redemption Ratio", value: "100% Backed" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why did merchants prefer trading the paper receipts over physical gold?",
                    options: [
                      { id: "A", label: "Paper receipts were lightweight, easily concealed, and slashes transport costs." },
                      { id: "B", label: "Gold had ceased to be valuable." },
                      { id: "C", label: "Paper was illegal to steal." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Paper currency originated as representative money: lightweight paper certificates directly redeemable for physical gold in vaults. Over centuries, governments severed this direct gold link, giving rise to modern fiat money.",
                key_takeaway: "Paper money began as a convenient claim check on physical gold.",
                concepts: ["fiat_money", "commodity_money"],
                authoring_status: "authored"
              },
              {
                id: "L03.CT1.G2.I02",
                kind: "slide",
                order: 2,
                title: "What Is Fiat Money?",
                subtitle: "The transition from gold-backed currency to government declaration.",
                body: [
                  {
                    type: "definition",
                    term: "Fiat Money",
                    text: "Currency that has no intrinsic physical value and is not backed by gold or silver, but is declared legal tender by government order."
                  },
                  {
                    type: "paragraph",
                    text: "The Latin word 'fiat' translates to 'let it be done'. The Nigerian Naira, the US Dollar, the British Pound, and the Euro are all fiat currencies."
                  },
                  {
                    type: "callout",
                    text: "A ₦1,000 banknote is physically worth about ₦20 of paper and ink. It purchases ₦1,000 worth of food because the Central Bank backs it, laws enforce it, and 200 million people agree to accept it."
                  }
                ],
                concepts: ["fiat_money", "legal_tender"],
                authoring_status: "authored"
              },
              {
                id: "L03.CT1.G2.I03",
                kind: "widget",
                order: 3,
                title: "Commodity Money vs. Fiat Money",
                subtitle: "Compare the trade-offs between physical commodity money and modern fiat currency.",
                widget_type: "option_comparison",
                config: {
                  title: "Commodity Money vs. Fiat Money",
                  option_a: {
                    name: "Commodity Money (e.g. Gold)",
                    attributes: {
                      "Source of Value": "Physical rarity and industrial utility",
                      "Supply Control": "Limited by mining and discovery",
                      "Portability": "Heavy and inconvenient for large transactions",
                      "Government Control": "Difficult for governments to manipulate"
                    }
                  },
                  option_b: {
                    name: "Fiat Money (e.g. Naira / Dollar)",
                    attributes: {
                      "Source of Value": "Government decree and social trust",
                      "Supply Control": "Managed by Central Bank monetary policy",
                      "Portability": "Extremely light; instantaneous digital transfers",
                      "Government Control": "Risk of over-printing causing inflation"
                    }
                  }
                },
                concepts: ["fiat_money", "commodity_money"],
                authoring_status: "authored"
              },
              {
                id: "L03.CT1.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Understanding Fiat Currency",
                subtitle: "Test your understanding of modern fiat systems.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L03.CT1.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "What guarantees that a merchant in Abuja will accept a Nigerian Naira note for a meal?",
                    options: [
                      { id: "A", text: "It is designated by law as legal tender and backed by the economic authority of Nigeria." },
                      { id: "B", text: "The Central Bank promises to hand over 5 grams of gold for each note." },
                      { id: "C", text: "The paper note is made of edible ingredients." }
                    ],
                    correct: "A",
                    explanation: "Fiat currency relies on legal tender status, tax payment obligations, and widespread public trust in the nation's financial institutions.",
                    concepts: ["fiat_money", "legal_tender"]
                  }
                ],
                concepts: ["fiat_money", "legal_tender"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L03.CT1.G3",
            title: "The Pillars of Currency Value: Trust, Law, and Stability",
            objective: "Analyze the institutional foundations required to keep a national currency stable and respected.",
            items: [
              {
                id: "L03.CT1.G3.I01",
                kind: "slide",
                order: 1,
                title: "The Three Anchors of Modern Currency",
                subtitle: "Why does anyone trust a digital number on a screen?",
                body: [
                  {
                    type: "numbered_list",
                    items: [
                      "Legal Framework: Taxes must be paid in the national currency, creating guaranteed baseline domestic demand.",
                      "Central Bank Monetary Policy: The central bank manages interest rates and money supply to prevent catastrophic inflation.",
                      "Economic Productivity: The currency is backed by the real goods, services, and industrial output of the nation."
                    ]
                  },
                  {
                    type: "callout",
                    text: "When a nation produces abundant exports (agricultural goods, petroleum, manufactured products, technology services), foreign demand for its currency strengthens."
                  }
                ],
                concepts: ["central_bank", "legal_tender", "gross_domestic_product"],
                authoring_status: "authored"
              },
              {
                id: "L03.CT1.G3.I02",
                kind: "case_study",
                order: 2,
                title: "The Case of Hyperinflation in Zimbabwe",
                subtitle: "What happens when a central bank prints money to fund government deficits without economic output.",
                scenario: {
                  narrative: "In 2008, Zimbabwe's economy collapsed as the government printed trillions of new dollars to pay state salaries. With no corresponding increase in food or manufactured goods, prices doubled every 24 hours. The central bank printed a 100-Trillion-Dollar banknote, but that single note could barely buy a loaf of bread. Citizens completely abandoned the national currency and began trading in US Dollars and South African Rand.",
                  characters: [
                    { name: "Ordinary Citizens", role: "Consumers", details: "Needed wheelbarrows of cash to buy groceries" },
                    { name: "Central Bank of Zimbabwe", role: "Monetary Authority", details: "Printed trillions of unbacked banknotes" }
                  ],
                  data: [
                    { label: "Peak Inflation Rate", value: "79,600,000,000% Month" },
                    { label: "Highest Denomination", value: "100 Trillion Dollars" },
                    { label: "Real Purchasing Power", value: "1 Loaf of Bread" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why did a 100-Trillion-Dollar note fail to make Zimbabweans wealthy?",
                    options: [
                      { id: "A", label: "Printing paper does not create real goods; when money outpaces production, purchasing power evaporates." },
                      { id: "B", label: "The ink used on the notes was toxic." },
                      { id: "C", label: "No one knew how to count that high." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Hyperinflation illustrates that money is merely a claim check on real goods. Printing infinite tickets does not expand the size of the cinema. When money supply explodes without real economic growth, the currency dies.",
                key_takeaway: "A currency's value is determined by economic discipline and productive output, not by printing presses.",
                concepts: ["hyperinflation", "purchasing_power", "money_vs_wealth"],
                authoring_status: "authored"
              },
              {
                id: "L03.CT1.G3.I03",
                kind: "widget",
                order: 3,
                title: "Test Currency Trust Factors",
                subtitle: "Identify which national actions strengthen or weaken a currency.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Currency Health Factors",
                  buckets: [
                    { id: "strengthens", label: "Strengthens Currency Value" },
                    { id: "weakens", label: "Weakens Currency Value" }
                  ],
                  cards: [
                    { id: "c1", label: "High export revenues from manufactured goods and agriculture", bucket: "strengthens", feedback: "Strong exports create global demand for your currency." },
                    { id: "c2", label: "Printing massive unbacked money to fund budget deficits", bucket: "weakens", feedback: "Diluting the money supply triggers rapid inflation." },
                    { id: "c3", label: "A credible, independent central bank controlling inflation", bucket: "strengthens", feedback: "Institutional credibility anchors long-term domestic savings." },
                    { id: "c4", label: "Political instability and arbitrary confiscation of property", bucket: "weakens", feedback: "Capital flight occurs as citizens convert wealth to foreign assets." }
                  ]
                },
                concepts: ["central_bank", "inflation", "exchange_rate"],
                authoring_status: "authored"
              },
              {
                id: "L03.CT1.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Chapter 1 Comprehensive Review",
                subtitle: "Final assessment covering all core concepts from Chapter 1 (Lessons 1-3).",
                quiz_mode: "lesson_final",
                questions: [
                  {
                    id: "L03.CT1.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "What is the fundamental difference between commodity money and fiat money?",
                    options: [
                      { id: "A", text: "Commodity money has intrinsic physical value (like gold), while fiat money has value because of government decree and trust." },
                      { id: "B", text: "Fiat money can only be used by billionaires." },
                      { id: "C", text: "Commodity money has no physical existence." }
                    ],
                    correct: "A",
                    explanation: "Commodity money has intrinsic value based on physical properties, whereas fiat money derives its value from public confidence, law, and institutional stability.",
                    concepts: ["commodity_money", "fiat_money"]
                  },
                  {
                    id: "L03.CT1.G3.I04.Q2",
                    type: "single_choice",
                    prompt: "If you want to know if someone is genuinely financially independent, which metric should you examine?",
                    options: [
                      { id: "A", text: "Their Net Worth (Total Assets minus Total Liabilities) and passive cash flow." },
                      { id: "B", text: "The brand of car they drive on weekends." },
                      { id: "C", text: "The total number of credit cards in their wallet." }
                    ],
                    correct: "A",
                    explanation: "Net worth and sustainable asset yield reflect real financial independence, while luxury consumption often masks high debt.",
                    concepts: ["net_worth", "money_vs_wealth"]
                  },
                  {
                    id: "L03.CT1.G3.I04.Q3",
                    type: "true_false",
                    prompt: "The three universal functions of money are Medium of Exchange, Unit of Account, and Store of Value.",
                    correct: true,
                    explanation: "These three functions form the cornerstone of all modern monetary economics.",
                    concepts: ["medium_of_exchange", "unit_of_account", "store_of_value"]
                  }
                ],
                concepts: ["fiat_money", "net_worth", "medium_of_exchange"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  }
};

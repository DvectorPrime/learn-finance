// scripts/author/chapter3_lessons.js
// Chapter 3: How the Economy Affects Your Pocket
// Lessons: L08 (What Is an Economy?), L09 (Supply, Demand, and Prices), L10 (Interest Rates), L11 (Economic Crises)

module.exports = {
  // ==========================================
  // LESSON 8: WHAT IS AN ECONOMY?
  // ==========================================
  L08: {
    id: "L08",
    number: 8,
    title: "What Is an Economy?",
    subtitle: "Understand the circular flow of goods, services, and money connecting households, businesses, and governments.",
    difficulty: "Low-Medium",
    contents: [
      {
        id: "L08.CT1",
        title: "The Web of Economic Connections",
        objective: "Understand how individuals, private businesses, and governments interact in a continuous circular flow of money and labor.",
        groups: [
          {
            id: "L08.CT1.G1",
            title: "People, Businesses, and Government",
            objective: "Identify the three main economic actors and their interlocking roles.",
            items: [
              {
                id: "L08.CT1.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The Baker, the Teacher, and the Council",
                subtitle: "How three actors depend on one another's spending and taxes.",
                scenario: {
                  narrative: "Mr. Okafor bakes bread and sells it to Mrs. Lawal, a public school teacher. Mrs. Lawal receives her monthly salary from the state government. The state government funds her salary using corporate taxes collected from Mr. Okafor's bakery and payroll taxes from citizens. When one party stops spending or paying taxes, the entire chain feels the contraction.",
                  characters: [
                    { name: "Mr. Okafor", role: "Bakery Owner", details: "Produces food, employs workers, pays business taxes" },
                    { name: "Mrs. Lawal", role: "School Teacher", details: "Provides public education, buys food with salary" },
                    { name: "State Government", role: "Public Sector", details: "Collects taxes, provides roads and schools, pays civil servants" }
                  ],
                  data: [
                    { label: "Okafor Monthly Tax Paid", value: "₦45,000" },
                    { label: "Lawal Monthly Salary", value: "₦140,000" },
                    { label: "Lawal Monthly Bakery Spend", value: "₦18,000" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What does this three-way relationship demonstrate about an economy?",
                    options: [
                      { id: "A", label: "An economy is an interconnected system where one person's spending becomes another person's income." },
                      { id: "B", label: "Teachers should bake their own bread." },
                      { id: "C", label: "Governments operate completely outside the financial system." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "An economy is not an abstract concept in a textbook; it is the living network of trades between households, businesses, and the government. Your personal spending keeps other workers employed, while their purchases fund your income.",
                key_takeaway: "One person's spending is always another person's income.",
                concepts: ["economy", "income"],
                authoring_status: "authored"
              },
              {
                id: "L08.CT1.G1.I02",
                kind: "slide",
                order: 2,
                title: "The Three Main Economic Players",
                subtitle: "Households, Businesses, and the State.",
                body: [
                  {
                    type: "definition",
                    term: "Economy",
                    text: "The organized system of producing, distributing, and consuming goods and services across a society."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Households: Provide labor to businesses and government, and spend wages on goods and services.",
                      "Businesses: Organize capital and labor to produce goods and services, earning profits and paying wages.",
                      "Government: Enforces legal contracts, maintains infrastructure (roads, power, security), collects taxes, and provides public services."
                    ]
                  }
                ],
                concepts: ["economy"],
                authoring_status: "authored"
              },
              {
                id: "L08.CT1.G1.I03",
                kind: "widget",
                order: 3,
                title: "Classify Economic Roles",
                subtitle: "Sort financial actions according to whether they originate from Households, Businesses, or Government.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Economic Actor Classifier",
                  buckets: [
                    { id: "household", label: "Household" },
                    { id: "business", label: "Business" },
                    { id: "government", label: "Government" }
                  ],
                  cards: [
                    { id: "c1", label: "Buying groceries for family dinner", bucket: "household", feedback: "Household consumption drives consumer demand." },
                    { id: "c2", label: "Investing in factory machinery to expand output", bucket: "business", feedback: "Businesses deploy capital to produce goods." },
                    { id: "c3", label: "Paving an interstate highway and building bridges", bucket: "government", feedback: "Public infrastructure is funded and built by the state." },
                    { id: "c4", label: "Paying monthly corporate tax on annual profits", bucket: "business", feedback: "Firms pay taxes to support public governance." }
                  ]
                },
                concepts: ["economy"],
                authoring_status: "authored"
              },
              {
                id: "L08.CT1.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Economic Actors Quiz",
                subtitle: "Test your understanding of the foundational participants in an economy.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L08.CT1.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "What is the primary economic role of households in a modern economy?",
                    options: [
                      { id: "A", text: "They supply labor to businesses and government, and consume finished products." },
                      { id: "B", text: "They print national currency banknotes." },
                      { id: "C", text: "They set international tariff policies." }
                    ],
                    correct: "A",
                    explanation: "Households are the primary source of labor and the end consumers of finished goods and services.",
                    concepts: ["economy"]
                  }
                ],
                concepts: ["economy"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L08.CT1.G2",
            title: "How Money and Goods Move Through Society",
            objective: "Master the Circular Flow Model of economic activity and Gross Domestic Product (GDP).",
            items: [
              {
                id: "L08.CT1.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Circle of ₦10,000",
                subtitle: "Trace a single banknote as it circulates through four different hands in one day.",
                scenario: {
                  narrative: "A doctor pays ₦10,000 to an electrician to fix a hospital breaker. The electrician uses that exact ₦10,000 to buy groceries from a market trader. The market trader pays ₦10,000 to a farmer for fresh yams. The farmer spends the ₦10,000 on medical tests at the doctor's clinic. In a single day, that single ₦10,000 note facilitated ₦40,000 worth of real economic commerce.",
                  characters: [
                    { name: "Doctor", role: "Healthcare Provider", details: "Initiates payment for technical services" },
                    { name: "Electrician", role: "Skilled Tradesperson", details: "Passes funds to retail food market" },
                    { name: "Market Trader", role: "Retailer", details: "Transfers funds to agricultural producer" },
                    { name: "Farmer", role: "Food Producer", details: "Closes the circle by purchasing medical care" }
                  ],
                  data: [
                    { label: "Physical Cash Used", value: "₦10,000 (One Note)" },
                    { label: "Total Economic Commerce", value: "₦40,000" },
                    { label: "Velocity of Money", value: "4 Turns in 24 Hours" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why was ₦40,000 worth of real value created using only a single ₦10,000 note?",
                    options: [
                      { id: "A", label: "Money circulates continuously; the velocity of money allows a small stock of currency to settle many transactions." },
                      { id: "B", label: "The banknote was photocopied four times." },
                      { id: "C", label: "The bank secretly deposited extra money." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "This case illustrates the 'Velocity of Money'. Economic activity depends not just on how much money exists, but on how quickly it circulates between active buyers and sellers.",
                key_takeaway: "When money circulates rapidly through productive trade, overall economic prosperity expands.",
                concepts: ["economy", "gross_domestic_product"],
                authoring_status: "authored"
              },
              {
                id: "L08.CT1.G2.I02",
                kind: "slide",
                order: 2,
                title: "The Circular Flow Model and GDP",
                subtitle: "Measuring the total size of national production.",
                body: [
                  {
                    type: "definition",
                    term: "Gross Domestic Product (GDP)",
                    text: "The total monetary value of all finished goods and services produced within a country's borders during a specific period (usually one year)."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "When GDP is growing: Businesses hire more workers, wages rise, and living standards improve.",
                      "When GDP is shrinking: Companies lay off staff, profits fall, and the economy enters a recession."
                    ]
                  }
                ],
                concepts: ["gross_domestic_product", "economy"],
                authoring_status: "authored"
              },
              {
                id: "L08.CT1.G2.I03",
                kind: "widget",
                order: 3,
                title: "Trace the Circular Flow",
                subtitle: "Follow how capital moves from wages to retail spending, business revenues, and tax revenue.",
                widget_type: "option_comparison",
                config: {
                  title: "High-Velocity vs Stagnant Economy",
                  option_a: {
                    name: "High-Circulation Economy",
                    attributes: {
                      "Consumer Confidence": "High (people spend and invest freely)",
                      "Business Revenues": "Rapidly growing; companies expand factories",
                      "Job Opportunities": "Abundant; wages increase with competition",
                      "Tax Revenues": "Plentiful; government funds roads and power"
                    }
                  },
                  option_b: {
                    name: "Frozen / Stagnant Economy",
                    attributes: {
                      "Consumer Confidence": "Low (people hoard cash out of fear)",
                      "Business Revenues": "Plummeting; retail shelves remain full",
                      "Job Opportunities": "Scarce; widespread layoffs and salary freezes",
                      "Tax Revenues": "Deficits; government borrows to cover basic payroll"
                    }
                  }
                },
                concepts: ["economy", "gross_domestic_product"],
                authoring_status: "authored"
              },
              {
                id: "L08.CT1.G2.I04",
                kind: "quiz",
                order: 4,
                title: "GDP and Circular Flow Check",
                subtitle: "Test your grasp of macro-economic indicators.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L08.CT1.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "What does Gross Domestic Product (GDP) measure?",
                    options: [
                      { id: "A", text: "The total market value of all finished goods and services produced in a country in a year." },
                      { id: "B", text: "The total amount of physical cash inside bank vaults." },
                      { id: "C", text: "The number of banknotes printed by the central bank." }
                    ],
                    correct: "A",
                    explanation: "GDP is the comprehensive scorecard of a country's economic production and output.",
                    concepts: ["gross_domestic_product"]
                  }
                ],
                concepts: ["gross_domestic_product"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L08.CT1.G3",
            title: "How Everyday Decisions Connect",
            objective: "Recognize how consumer choices, savings habits, and business investments shape the broader economic climate.",
            items: [
              {
                id: "L08.CT1.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Shift to Locally Made Goods",
                subtitle: "How consumer buying habits alter domestic employment.",
                scenario: {
                  narrative: "When foreign shoe imports become extremely expensive due to currency shifts, thousands of students and office workers begin buying handmade leather shoes produced by local artisans in Aba. Within six months, Aba leather workshops hire 1,200 new apprentice cobblers and local leather tanneries double production.",
                  characters: [
                    { name: "Local Shoemakers", role: "Domestic Manufacturers", details: "Experience 250% surge in order volume" },
                    { name: "Consumers", role: "Buyers", details: "Substituting expensive foreign imports with domestic craft" }
                  ],
                  data: [
                    { label: "Domestic Shoe Orders", value: "+250%" },
                    { label: "New Apprentices Hired", value: "1,200 Workers" },
                    { label: "Local Economic Retention", value: "92% of Capital Remains Domestic" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What economic principle is illustrated by this consumer shift?",
                    options: [
                      { id: "A", label: "Import substitution: buying domestic goods directly stimulates local production, jobs, and wages." },
                      { id: "B", label: "Shoemakers forced people to buy by law." },
                      { id: "C", label: "Leather shoes became free." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Every time you spend money, you cast a vote for the type of economy you want to build. Choosing competitive domestic products retains capital within the local circular flow, stimulating domestic wages and employment.",
                key_takeaway: "Consumer choices directly dictate which industries expand and create local employment.",
                concepts: ["economy", "supply_and_demand"],
                authoring_status: "authored"
              },
              {
                id: "L08.CT1.G3.I02",
                kind: "slide",
                order: 2,
                title: "You Are Part of the Economic Machine",
                subtitle: "How individual financial habits impact the whole.",
                body: [
                  {
                    type: "paragraph",
                    text: "You are never completely disconnected from the national economy:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "When you save money in a bank: The bank lends that capital to entrepreneurs to build factories and inventory.",
                      "When you upskill: Your higher productivity increases national economic efficiency.",
                      "When you pay taxes: You fund the roads, legal systems, and power grids that make business possible."
                    ]
                  }
                ],
                concepts: ["economy", "saving"],
                authoring_status: "authored"
              },
              {
                id: "L08.CT1.G3.I03",
                kind: "widget",
                order: 3,
                title: "Economic Impact Simulator",
                subtitle: "Choose an action and see its ripple effect across the circular economy.",
                widget_type: "choice_with_reflection",
                config: {
                  prompt: "You decide to patronize locally produced rice from a domestic farming cooperative instead of imported polished rice. What is the primary economic ripple effect?",
                  options: [
                    { id: "A", label: "Your money stays in the local economy, boosting farm incomes and encouraging local millers to hire more workers." },
                    { id: "B", label: "Foreign shipping companies become wealthier." },
                    { id: "C", label: "Local farmers are forced to close down." }
                  ],
                  follow_up_prompt: "How does domestic food production protect national food security during foreign exchange crises?"
                },
                concepts: ["economy", "purchasing_power"],
                authoring_status: "authored"
              },
              {
                id: "L08.CT1.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Lesson 8 Capstone Quiz",
                subtitle: "Comprehensive review of economic fundamentals.",
                quiz_mode: "lesson_final",
                questions: [
                  {
                    id: "L08.CT1.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "Why is one person's spending considered another person's income in macroeconomic analysis?",
                    options: [
                      { id: "A", text: "Because in a circular flow economy, transactions always transfer money from a buyer to a seller who uses it to pay workers and suppliers." },
                      { id: "B", text: "Because all bank accounts are merged together." },
                      { id: "C", text: "Because the government redistributes all cash every evening." }
                    ],
                    correct: "A",
                    explanation: "Every naira spent at a store pays the wages of staff, profits of owners, and orders from wholesalers, linking all participants.",
                    concepts: ["economy"]
                  }
                ],
                concepts: ["economy"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // LESSON 9: SUPPLY, DEMAND, AND PRICES
  // ==========================================
  L09: {
    id: "L09",
    number: 9,
    title: "Supply, Demand, and Prices",
    subtitle: "Discover how the fundamental laws of supply and demand establish equilibrium prices across all markets.",
    difficulty: "Medium-High",
    contents: [
      {
        id: "L09.CT1",
        title: "The Mechanics of Market Prices",
        objective: "Understand how shortages raise prices, surpluses lower prices, and markets reach equilibrium.",
        groups: [
          {
            id: "L09.CT1.G1",
            title: "When Everybody Wants the Same Thing",
            objective: "Analyze demand surges, consumer willingness to pay, and price increases.",
            items: [
              {
                id: "L09.CT1.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The Umbrella Vendor in a Sudden Downpour",
                subtitle: "How instant demand spikes alter market pricing in seconds.",
                scenario: {
                  narrative: "On a sunny Tuesday afternoon in central Ikeja, Musa sells folding umbrellas from a sidewalk stand for ₦1,500 each, making two or three sales per hour. Suddenly, the sky turns black and a ferocious rainstorm erupts. Fifty commuters rush under the canopy, desperate for umbrellas. Musa raises his price to ₦3,000 and sells his entire stock of twenty umbrellas in five minutes.",
                  characters: [
                    { name: "Musa", role: "Street Vendor", details: "Has 20 umbrellas in stock" },
                    { name: "Commuters", role: "Caught in the Rain", details: "Willing to pay a premium to protect electronics and clothing" }
                  ],
                  data: [
                    { label: "Sunny Day Price", value: "₦1,500" },
                    { label: "Rainstorm Surge Price", value: "₦3,000 (+100%)" },
                    { label: "Units Sold", value: "20 / 20 Sold Out" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What economic law drove the price of umbrellas from ₦1,500 to ₦3,000?",
                    options: [
                      { id: "A", label: "A massive surge in consumer demand against a fixed, scarce short-term supply." },
                      { id: "B", label: "The manufacturing cost of umbrellas doubled during the rain." },
                      { id: "C", label: "Musa was required by law to change his price tag." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Prices reflect urgency and scarcity. When a sudden storm makes umbrellas urgently valuable to fifty people simultaneously, willingness to pay rises dramatically. Price acts as a rationing device.",
                key_takeaway: "When consumer demand surges while supply is fixed, prices rise.",
                concepts: ["supply_and_demand", "scarcity"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT1.G1.I02",
                kind: "slide",
                order: 2,
                title: "The Law of Demand",
                subtitle: "The inverse relationship between price and quantity demanded.",
                body: [
                  {
                    type: "definition",
                    term: "Law of Demand",
                    text: "All other factors being equal, as the price of a good increases, consumer demand for that good decreases; conversely, as price drops, demand increases."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Higher Price: Fewer people can afford it; consumers seek substitutes.",
                      "Lower Price: More consumers enter the market; existing buyers purchase in larger quantities."
                    ]
                  }
                ],
                concepts: ["supply_and_demand"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT1.G1.I03",
                kind: "widget",
                order: 3,
                title: "Interactive Demand Curve Explorer",
                subtitle: "Adjust the price of an item and watch consumer quantity demanded react.",
                widget_type: "option_comparison",
                config: {
                  title: "Price vs Quantity Demanded Simulation",
                  option_a: {
                    name: "Premium Pricing (₦5,000 / unit)",
                    attributes: {
                      "Target Audience": "Affluent buyers only",
                      "Estimated Daily Sales": "15 Units",
                      "Daily Gross Revenue": "₦75,000",
                      "Market Character": "Low volume, high margin"
                    }
                  },
                  option_b: {
                    name: "Mass Market Pricing (₦2,000 / unit)",
                    attributes: {
                      "Target Audience": "Broad consumer base",
                      "Estimated Daily Sales": "80 Units",
                      "Daily Gross Revenue": "₦160,000",
                      "Market Character": "High volume, moderate margin"
                    }
                  }
                },
                concepts: ["supply_and_demand"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT1.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Demand Mechanics Quiz",
                subtitle: "Test your grasp of the law of demand.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L09.CT1.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "According to the Law of Demand, what typically happens when the price of fresh chicken drops by 40%?",
                    options: [
                      { id: "A", text: "Consumers buy more chicken, substituting it for more expensive beef and fish." },
                      { id: "B", text: "Consumers refuse to buy any chicken." },
                      { id: "C", text: "Chicken becomes impossible to cook." }
                    ],
                    correct: "A",
                    explanation: "As price decreases, quantity demanded expands because existing customers buy more and new budget-conscious shoppers enter the market.",
                    concepts: ["supply_and_demand"]
                  }
                ],
                concepts: ["supply_and_demand"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L09.CT1.G2",
            title: "When There Is Not Enough to Go Around",
            objective: "Analyze supply shortages, rationing, and black markets.",
            items: [
              {
                id: "L09.CT1.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Fuel Scarcity Queue",
                subtitle: "What happens when government caps prices below market equilibrium.",
                scenario: {
                  narrative: "During a national supply bottleneck, the government caps petrol at ₦650 per liter, even though importing and distributing it costs ₦850. Because gas stations lose money selling at ₦650, they close down or only sell for two hours. Massive vehicle queues stretch for miles. Outside the stations, black-market peddlers sell jerrycans of fuel for ₦1,400 to drivers who cannot afford to wait ten hours in line.",
                  characters: [
                    { name: "Gas Station Owners", role: "Retailers", details: "Face bankruptcy if they sell at price ceiling" },
                    { name: "Commuters / Drivers", role: "Buyers", details: "Wasting productive working hours queuing" },
                    { name: "Black Market Sellers", role: "Arbitrageurs", details: "Selling scarce fuel at real equilibrium price (₦1,400)" }
                  ],
                  data: [
                    { label: "Official Price Ceiling", value: "₦650 / L" },
                    { label: "True Delivery Cost", value: "₦850 / L" },
                    { label: "Black Market Clearing Price", value: "₦1,400 / L" },
                    { label: "Average Queue Time", value: "6.5 Hours" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What economic dysfunction was caused by the artificial price ceiling?",
                    options: [
                      { id: "A", label: "A severe shortage: capping prices below cost destroyed supply, creating long queues and an expensive black market." },
                      { id: "B", label: "Fuel became abundant in every home." },
                      { id: "C", label: "Car engines stopped needing gasoline." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "When laws force prices below the true cost of production, suppliers stop supplying. The result is artificial shortages, wasted hours in queues, and a thriving black market where real prices exceed what a free market would charge.",
                key_takeaway: "Price ceilings below market costs inevitably produce shortages and black markets.",
                concepts: ["supply_and_demand", "scarcity"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT1.G2.I02",
                kind: "slide",
                order: 2,
                title: "Shortages and Price Controls",
                subtitle: "Why artificial price caps fail in practice.",
                body: [
                  {
                    type: "definition",
                    term: "Shortage",
                    text: "A situation where the quantity demanded by consumers exceeds the quantity supplied by producers at the current price."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "In a free market: Shortages cause prices to rise, which encourages producers to supply more and causes buyers to conserve.",
                      "Under artificial price caps: Prices cannot rise, so suppliers exit the market, turning the shortage into a crisis."
                    ]
                  }
                ],
                concepts: ["scarcity", "supply_and_demand"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT1.G2.I03",
                kind: "widget",
                order: 3,
                title: "Shortage vs Equilibrium Simulator",
                subtitle: "See how price controls distort production and consumer queues.",
                widget_type: "option_comparison",
                config: {
                  title: "Free Market vs Price Control Comparison",
                  option_a: {
                    name: "Free Market Pricing (₦850)",
                    attributes: {
                      "Fuel Availability": "Available instantly at all pumps",
                      "Queue Length": "0 to 5 minutes",
                      "Supplier Incentive": "High (stations make sustainable margin)",
                      "Black Market Presence": "Zero"
                    }
                  },
                  option_b: {
                    name: "Price Capped Market (₦650)",
                    attributes: {
                      "Fuel Availability": "Severe shortage; 80% of stations closed",
                      "Queue Length": "4 to 12 hours",
                      "Supplier Incentive": "Negative (lose money on every liter)",
                      "Black Market Presence": "Massive (₦1,400 per liter)"
                    }
                  }
                },
                concepts: ["supply_and_demand", "equilibrium_price"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT1.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Shortage Dynamics Quiz",
                subtitle: "Assess your understanding of shortages and price ceilings.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L09.CT1.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "What is the predictable economic consequence of setting a legal maximum price ceiling below the cost of producing food?",
                    options: [
                      { id: "A", text: "Farmers reduce production, leading to food shortages and empty grocery shelves." },
                      { id: "B", text: "Farmers double their harvest out of generosity." },
                      { id: "C", text: "Grocery stores give away free food to everyone." }
                    ],
                    correct: "A",
                    explanation: "Producers cannot sustainably sell at a loss. Price ceilings below costs dry up supply.",
                    concepts: ["supply_and_demand"]
                  }
                ],
                concepts: ["supply_and_demand"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L09.CT1.G3",
            title: "When Sellers Have More Goods Than Buyers",
            objective: "Explore market gluts, clearance sales, and deflationary price adjustments.",
            items: [
              {
                id: "L09.CT1.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Bumper Watermelon Harvest",
                subtitle: "How unexpected abundance collapses wholesale market prices.",
                scenario: {
                  narrative: "Favorable rains lead to a record-breaking harvest of watermelons across northern agricultural belts. Hundreds of overloaded trucks arrive at the Mile 12 market in Lagos on the same Friday. The market is overwhelmed with fifty times the usual supply of watermelons. Facing imminent spoilage in the hot sun, traders slash prices from ₦2,000 to ₦500 per melon to clear stock.",
                  characters: [
                    { name: "Fruit Wholesalers", role: "Suppliers", details: "Sitting on huge perishable surplus" },
                    { name: "City Shoppers", role: "Buyers", details: "Enjoying unprecedented cheap fruit prices" }
                  ],
                  data: [
                    { label: "Normal Friday Volume", value: "2,000 Melons" },
                    { label: "Surge Friday Volume", value: "100,000 Melons" },
                    { label: "Baseline Price", value: "₦2,000" },
                    { label: "Surplus Clearance Price", value: "₦500 (-75%)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What caused the price of watermelons to collapse by 75%?",
                    options: [
                      { id: "A", label: "A massive market surplus (supply vastly exceeded buyer demand at the old price)." },
                      { id: "B", label: "People suddenly hated watermelons." },
                      { id: "C", label: "The government banned fruit sales." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "A surplus (glut) occurs when the quantity supplied is much greater than the quantity demanded. Sellers must lower prices to attract buyers and clear inventory before physical decay or storage costs destroy their capital.",
                key_takeaway: "Surpluses force sellers to discount prices to stimulate demand and clear inventory.",
                concepts: ["supply_and_demand", "equilibrium_price"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT1.G3.I02",
                kind: "slide",
                order: 2,
                title: "The Mechanics of a Market Surplus",
                subtitle: "How abundance benefits consumers.",
                body: [
                  {
                    type: "definition",
                    term: "Market Surplus",
                    text: "A situation where the quantity of a product supplied by sellers exceeds the quantity demanded by buyers at the prevailing price."
                  },
                  {
                    type: "paragraph",
                    text: "Surpluses trigger price wars between competing sellers. The lowest-cost, most efficient producers survive, while consumers enjoy bargains."
                  }
                ],
                concepts: ["supply_and_demand"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT1.G3.I03",
                kind: "widget",
                order: 3,
                title: "Surplus vs Shortage Classifier",
                subtitle: "Determine whether market conditions indicate a Surplus or a Shortage.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Market Condition Classifier",
                  buckets: [
                    { id: "surplus", label: "Market Surplus (Glut)" },
                    { id: "shortage", label: "Market Shortage (Scarcity)" }
                  ],
                  cards: [
                    { id: "c1", label: "Stores running 70% off clearance sales to empty crowded warehouses", bucket: "surplus", feedback: "Discounts indicate excess inventory sellers must clear." },
                    { id: "c2", label: "Long overnight queues forming outside filling stations", bucket: "shortage", feedback: "Queues show demand outstripping available supply." },
                    { id: "c3", label: "Black-market scalpers selling concert tickets at 5x original price", bucket: "shortage", feedback: "Scalping thrives when demand exceeds fixed ticket capacity." },
                    { id: "c4", label: "Farmers leaving unsold cabbages on fields because transport costs exceed sale prices", bucket: "surplus", feedback: "Massive oversupply drives prices below recovery costs." }
                  ]
                },
                concepts: ["supply_and_demand"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT1.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Surplus Dynamics Quiz",
                subtitle: "Test your understanding of market surpluses.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L09.CT1.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "What is the natural market remedy when smartphone retailers import too many units that consumers refuse to buy at ₦200,000?",
                    options: [
                      { id: "A", text: "Retailers lower prices until they find the equilibrium point where buyers are willing to purchase." },
                      { id: "B", text: "Retailers double the price to make up for lost time." },
                      { id: "C", text: "The police arrest customers for not buying." }
                    ],
                    correct: "A",
                    explanation: "Price discounting clears excess supply by enticing price-sensitive buyers back into the market.",
                    concepts: ["supply_and_demand", "equilibrium_price"]
                  }
                ],
                concepts: ["supply_and_demand"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L09.CT2.G1",
            title: "Seasons, Scarcity, and Market Prices",
            objective: "Analyze agricultural crop cycles, seasonal peaks, and seasonal budgeting strategies.",
            items: [
              {
                id: "L09.CT2.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The December Chicken Price Surge",
                subtitle: "How holiday traditions create predictable seasonal demand spikes.",
                scenario: {
                  narrative: "In September, live broiler chickens sell for ₦4,500 in suburban markets. In late December, millions of families celebrate Christmas and New Year festivals where poultry is a traditional centerpiece. Despite poultry farmers expanding flocks, consumer demand outpaces supply, driving chicken prices to ₦11,000 per bird.",
                  characters: [
                    { name: "Poultry Farmers", role: "Producers", details: "Plan flock production 8 weeks in advance for holiday demand" },
                    { name: "Holiday Shoppers", role: "Seasonal Buyers", details: "Willing to pay festive premiums for live birds" }
                  ],
                  data: [
                    { label: "September Price", value: "₦4,500" },
                    { label: "December Peak Price", value: "₦11,000 (+144%)" },
                    { label: "Smart Buyer Strategy", value: "Buy frozen in Nov or pre-order" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "How can a financially savvy household avoid paying the seasonal price spike?",
                    options: [
                      { id: "A", label: "Buy and freeze poultry in October/November, or buy earlier when prices are at regular baseline." },
                      { id: "B", label: "Borrow money on Christmas Eve at 50% interest." },
                      { id: "C", label: "Complain loudly to the market vendor." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Predictable seasonal demand spikes happen every single year (festivals, school resumptions, harvest cycles). Budget-conscious consumers anticipate these cycles by purchasing non-perishables or freezable goods well before the seasonal peak.",
                key_takeaway: "Seasonal price surges are predictable; proactive planning saves substantial household capital.",
                concepts: ["supply_and_demand", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT2.G1.I02",
                kind: "slide",
                order: 2,
                title: "Agricultural Seasonality and Pricing",
                subtitle: "Why prices move in sync with the rains and harvests.",
                body: [
                  {
                    type: "paragraph",
                    text: "In agricultural economies, prices swing dramatically between harvest seasons and the 'lean season' before harvest:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Harvest Season (Peak Supply): Abundant crops flood markets; prices drop to annual lows.",
                      "Planting Season / Lean Season (Low Supply): Old harvest stocks dwindle while new crops grow; prices reach annual peaks."
                    ]
                  }
                ],
                concepts: ["supply_and_demand", "scarcity"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT2.G1.I03",
                kind: "widget",
                order: 3,
                title: "Seasonal Household Budget Planner",
                subtitle: "Plan food bulk purchases across the calendar year to smooth expenses.",
                widget_type: "budget_prioritizer",
                config: {
                  title: "Seasonal Bulk-Buying Plan",
                  monthly_income: 250000,
                  categories: [
                    { name: "October Grain Harvest Bulk Buy (Yearly Supply)", amount: 80000, flexible: true },
                    { name: "Regular Monthly Expenses", amount: 120000, locked: true },
                    { name: "Holiday Reserve Fund", amount: 30000, flexible: true },
                    { name: "Emergency Savings", amount: 20000, flexible: true }
                  ]
                },
                concepts: ["budget", "supply_and_demand"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT2.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Seasonality Quiz",
                subtitle: "Test your understanding of seasonal pricing dynamics.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L09.CT2.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "When is the optimal time for a household to buy durable agricultural staples like dry beans and grains in bulk?",
                    options: [
                      { id: "A", text: "Right after the main harvest season when supply is at its annual peak and prices are lowest." },
                      { id: "B", text: "During the pre-planting lean season when grain silos are nearly empty." },
                      { id: "C", text: "The timing makes zero difference to prices." }
                    ],
                    correct: "A",
                    explanation: "Buying right after harvest takes advantage of market surpluses and lowest annual pricing.",
                    concepts: ["supply_and_demand", "budget"]
                  }
                ],
                concepts: ["supply_and_demand"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L09.CT2.G2",
            title: "Substitutes, Preferences, and Changing Needs",
            objective: "Understand consumer substitution, elasticity, and complementary goods.",
            items: [
              {
                id: "L09.CT2.G2.I01",
                kind: "case_study",
                order: 1,
                title: "Beef vs. Fish and Eggs",
                subtitle: "How consumers switch to substitute goods when prices climb.",
                scenario: {
                  narrative: "When regional beef prices surge from ₦3,000 to ₦6,000 per kilo due to livestock cattle transport disruptions, millions of families stop buying beef. Instead, they purchase fresh catfish, mackerel, and eggs to meet their protein needs. Consequently, catfish sellers find their demand doubling, allowing them to raise fish prices slightly from ₦2,200 to ₦2,800.",
                  characters: [
                    { name: "Butchers", role: "Beef Sellers", details: "See foot traffic drop by 50% due to high prices" },
                    { name: "Fish Farmers", role: "Substitute Sellers", details: "Experience influx of former beef customers" }
                  ],
                  data: [
                    { label: "Beef Price Spike", value: "₦3,000 -> ₦6,000 (+100%)" },
                    { label: "Fish Demand Surge", value: "+80% Volume" },
                    { label: "Fish Price Adjustment", value: "₦2,200 -> ₦2,800 (+27%)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What economic concept explains why fish demand rose when beef prices skyrocketed?",
                    options: [
                      { id: "A", label: "Substitute goods: when the price of one good rises, consumers switch to alternative goods that satisfy the same need." },
                      { id: "B", label: "Doctors banned all meat." },
                      { id: "C", label: "Fish became free to harvest." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Substitute goods are products that can replace each other in consumption. A price spike in one product pushes consumers into substitute markets, driving up demand in the substitute category.",
                key_takeaway: "Consumers protect their budgets by actively substituting expensive items with affordable alternatives.",
                concepts: ["supply_and_demand"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT2.G2.I02",
                kind: "slide",
                order: 2,
                title: "Substitutes vs. Complementary Goods",
                subtitle: "How products are linked in the consumer's mind.",
                body: [
                  {
                    type: "bullet_list",
                    items: [
                      "Substitute Goods: Items used in place of one another (e.g. Butter vs Margarine, Beef vs Fish, Bus vs Train). Price hike in one increases demand for the other.",
                      "Complementary Goods: Items consumed together (e.g. Cars and Petrol, Smartphones and Mobile Data). Price hike in one reduces demand for both."
                    ]
                  }
                ],
                concepts: ["supply_and_demand"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT2.G2.I03",
                kind: "widget",
                order: 3,
                title: "Classify Linked Goods",
                subtitle: "Categorize product pairs as Substitutes or Complements.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Goods Relationship Classifier",
                  buckets: [
                    { id: "substitute", label: "Substitute Goods (Replace Each Other)" },
                    { id: "complement", label: "Complementary Goods (Used Together)" }
                  ],
                  cards: [
                    { id: "c1", label: "Tea and Coffee", bucket: "substitute", feedback: "When coffee gets too expensive, tea drinking increases." },
                    { id: "c2", label: "Printers and Ink Cartridges", bucket: "complement", feedback: "Printers are useless without ink; they are consumed together." },
                    { id: "c3", label: "Ride-hailing apps vs Commercial yellow taxis", bucket: "substitute", feedback: "Commuters switch between transport options based on price." },
                    { id: "c4", label: "Smartphones and Screen Protective Glass", bucket: "complement", feedback: "Protective cases and glass are purchased to complement phones." }
                  ]
                },
                concepts: ["supply_and_demand"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT2.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Substitutes and Complements Quiz",
                subtitle: "Test your understanding of interconnected consumer goods.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L09.CT2.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "If the cost of petrol increases dramatically, what is the expected impact on the demand for large, gas-guzzling V8 luxury SUVs?",
                    options: [
                      { id: "A", text: "Demand for V8 SUVs decreases because petrol is a complementary good that makes owning them much more expensive." },
                      { id: "B", text: "Demand for V8 SUVs immediately triples." },
                      { id: "C", text: "Petrol prices have no impact on vehicle choice." }
                    ],
                    correct: "A",
                    explanation: "Because cars and fuel are complementary goods, higher operating fuel costs suppress demand for fuel-inefficient vehicles.",
                    concepts: ["supply_and_demand"]
                  }
                ],
                concepts: ["supply_and_demand"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L09.CT2.G3",
            title: "How Buyers and Sellers Respond to Prices",
            objective: "Analyze price elasticity of demand: essential necessities vs. elastic luxury desires.",
            items: [
              {
                id: "L09.CT2.G3.I01",
                kind: "case_study",
                order: 1,
                title: "Insulin vs. Designer Handbags",
                subtitle: "The stark contrast in price elasticity of demand.",
                scenario: {
                  narrative: "A pharmaceutical distributor raises the price of life-saving diabetic insulin by 50%. Patients continue buying it because without it, they face death. Simultaneously, a luxury fashion house raises the price of its leather handbags by 50%. Handbag sales drop by 80% as shoppers delay purchases or choose alternative accessories.",
                  characters: [
                    { name: "Diabetic Patients", role: "Inelastic Consumers", details: "Must purchase life-saving medicine regardless of price" },
                    { name: "Fashion Shoppers", role: "Elastic Consumers", details: "Easily postpone or abandon discretionary luxury purchases" }
                  ],
                  data: [
                    { label: "Insulin Price Hike", value: "+50% -> Demand Flat (-2%)" },
                    { label: "Handbag Price Hike", value: "+50% -> Demand Collapsed (-80%)" },
                    { label: "Economic Metric", value: "Price Elasticity of Demand" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why did consumers react so differently to the same 50% price increase?",
                    options: [
                      { id: "A", label: "Insulin is an essential necessity with inelastic demand, while luxury handbags are discretionary wants with highly elastic demand." },
                      { id: "B", label: "Handbags are perishable and rot quickly." },
                      { id: "C", label: "Medicine is cheaper to transport." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Price elasticity measures how sensitive consumer demand is to changes in price. Necessities with no substitutes (cooking salt, emergency healthcare) have inelastic demand. Discretionary luxuries have elastic demand.",
                key_takeaway: "Inelastic goods must be purchased at any price; elastic goods are abandoned when prices rise.",
                concepts: ["supply_and_demand", "needs_vs_wants"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT2.G3.I02",
                kind: "slide",
                order: 2,
                title: "Understanding Price Elasticity",
                subtitle: "How sensitivity shapes business pricing power.",
                body: [
                  {
                    type: "definition",
                    term: "Price Elasticity of Demand",
                    text: "A measure of the responsiveness of the quantity demanded of a good to a change in its price."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Inelastic Demand: Quantity demanded changes very little when price changes (e.g. cooking salt, tap water, insulin, basic school tuition).",
                      "Elastic Demand: Quantity demanded drops drastically when price rises (e.g. movie theater tickets, hotel vacations, high-end electronics)."
                    ]
                  }
                ],
                concepts: ["supply_and_demand"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT2.G3.I03",
                kind: "widget",
                order: 3,
                title: "Elasticity Classifier",
                subtitle: "Sort products according to whether their demand is Elastic or Inelastic.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Price Elasticity Sorter",
                  buckets: [
                    { id: "inelastic", label: "Inelastic (Necessity, Stiff Demand)" },
                    { id: "elastic", label: "Elastic (Discretionary, Sensitive Demand)" }
                  ],
                  cards: [
                    { id: "c1", label: "Emergency surgical treatment for appendicitis", bucket: "inelastic", feedback: "Life-saving care cannot be postponed." },
                    { id: "c2", label: "Weekend VIP bottle service at a nightclub", bucket: "elastic", feedback: "Consumers cut nightlife immediately when budgets tighten." },
                    { id: "c3", label: "Basic cooking table salt", bucket: "inelastic", feedback: "Salt has no substitute and represents tiny fraction of budget." },
                    { id: "c4", label: "First-class luxury airline upgrade", bucket: "elastic", feedback: "Travelers easily choose economy when price difference is high." }
                  ]
                },
                concepts: ["supply_and_demand", "needs_vs_wants"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT2.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Elasticity Assessment",
                subtitle: "Assess your understanding of price sensitivity.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L09.CT2.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "If an entrepreneur wants to build a business that remains profitable even during severe economic recessions, which type of product or service should they provide?",
                    options: [
                      { id: "A", text: "Products with inelastic demand (essential staples, basic repairs, staple food processing)." },
                      { id: "B", text: "High-end luxury jewelry and luxury sports cars." },
                      { id: "C", text: "Exotic overseas cruise holidays." }
                    ],
                    correct: "A",
                    explanation: "Inelastic essentials retain demand during recessions because consumers cannot survive without them.",
                    concepts: ["supply_and_demand", "needs_vs_wants"]
                  }
                ],
                concepts: ["supply_and_demand"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L09.CT2.G4",
            title: "When Several Things Change at Once",
            objective: "Synthesize supply and demand shifts operating simultaneously in dynamic markets.",
            items: [
              {
                id: "L09.CT2.G4.I01",
                kind: "case_study",
                order: 1,
                title: "The Smartphone Market Boom",
                subtitle: "Simultaneous technology breakthroughs and surging consumer adoption.",
                scenario: {
                  narrative: "Between 2012 and 2022, consumer demand for smartphones in Nigeria grew by 500% as mobile banking and social commerce expanded. Normally, a 500% surge in demand causes prices to skyrocket. However, global semiconductor factories dramatically improved manufacturing efficiency, slashing the unit production cost of microchips by 70%. As a result, entry-level smartphones became more affordable, not more expensive.",
                  characters: [
                    { name: "Consumers", role: "Mass Demand", details: "Millions seeking internet-enabled smartphones" },
                    { name: "Chip Manufacturers", role: "High-Tech Supply", details: "Automated production drastically lowered unit manufacturing costs" }
                  ],
                  data: [
                    { label: "Demand Shift", value: "+500% Consumer Desire" },
                    { label: "Supply Shift", value: "+800% Manufacturing Capacity" },
                    { label: "Market Result", value: "Better technology at lower real prices" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why didn't smartphone prices explode despite millions of new buyers entering the market?",
                    options: [
                      { id: "A", label: "Supply expanded even faster than demand due to technological advancements and mass production economies of scale." },
                      { id: "B", label: "Smartphones became illegal to charge money for." },
                      { id: "C", label: "Phone companies gave away devices at a loss forever." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "When both supply and demand increase simultaneously, the final price depends on which curve shifts further. Technological progress expanded supply faster than surging demand, bringing powerful computers into the pockets of billions.",
                key_takeaway: "Technological innovation can expand supply fast enough to lower prices even as demand surges.",
                concepts: ["supply_and_demand", "equilibrium_price"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT2.G4.I02",
                kind: "slide",
                order: 2,
                title: "Simultaneous Supply and Demand Shifts",
                subtitle: "The four market quadrants.",
                body: [
                  {
                    type: "table",
                    columns: ["Demand Shift", "Supply Shift", "Predictable Price Outcome"],
                    rows: [
                      ["Demand Rises (+)", "Supply Falls (-)", "Price Skyrockets (Severe scarcity)"],
                      ["Demand Falls (-)", "Supply Rises (+)", "Price Collapses (Heavy surplus)"],
                      ["Demand Rises (+)", "Supply Rises (+)", "Quantity expands; price depends on which shifts more"],
                      ["Demand Falls (-)", "Supply Falls (-)", "Quantity shrinks; price depends on which shifts more"]
                    ]
                  }
                ],
                concepts: ["supply_and_demand", "equilibrium_price"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT2.G4.I03",
                kind: "widget",
                order: 3,
                title: "Market Scenario Predictor",
                subtitle: "Predict whether prices will rise or fall under compound market shocks.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Price Direction Predictor",
                  buckets: [
                    { id: "up", label: "Price Rises" },
                    { id: "down", label: "Price Falls" }
                  ],
                  cards: [
                    { id: "c1", label: "Severe drought destroys crops while population grows by 10%", bucket: "up", feedback: "Demand up, supply down drives prices higher." },
                    { id: "c2", label: "New automation doubles factory output while consumers switch to a new rival gadget", bucket: "down", feedback: "Supply up, demand down drives prices lower." },
                    { id: "c3", label: "A sudden viral health report claims bananas cure illness; global demand triples overnight", bucket: "up", feedback: "Surging demand against fixed short-term supply raises prices." }
                  ]
                },
                concepts: ["supply_and_demand", "equilibrium_price"],
                authoring_status: "authored"
              },
              {
                id: "L09.CT2.G4.I04",
                kind: "quiz",
                order: 4,
                title: "Lesson 9 Capstone Quiz",
                subtitle: "Final comprehensive evaluation of supply, demand, and equilibrium.",
                quiz_mode: "lesson_final",
                questions: [
                  {
                    id: "L09.CT2.G4.I04.Q1",
                    type: "single_choice",
                    prompt: "What is an 'equilibrium price' in economics?",
                    options: [
                      { id: "A", text: "The market clearing price where the quantity demanded by buyers exactly equals the quantity supplied by sellers." },
                      { id: "B", text: "The price fixed by the United Nations." },
                      { id: "C", text: "The price at which no business makes any profit." }
                    ],
                    correct: "A",
                    explanation: "At equilibrium, there are neither shortages nor surpluses; the market clears smoothly.",
                    concepts: ["equilibrium_price", "supply_and_demand"]
                  }
                ],
                concepts: ["supply_and_demand", "equilibrium_price"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // LESSON 10: INTEREST RATES AND THEIR EFFECTS ON YOU
  // ==========================================
  L10: {
    id: "L10",
    number: 10,
    title: "Interest Rates and Their Effects on You",
    subtitle: "Understand the price of borrowing money, how central banks set policy rates, and the magic of compound growth.",
    difficulty: "High",
    contents: [
      {
        id: "L10.CT1",
        title: "The Cost of Time and Borrowed Money",
        objective: "Understand what interest rates represent, how loans are calculated, and how compound interest multiplies wealth.",
        groups: [
          {
            id: "L10.CT1.G1",
            title: "What an Interest Rate Means",
            objective: "Define interest rates as the rental cost of capital.",
            items: [
              {
                id: "L10.CT1.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The ₦100,000 Equipment Loan",
                subtitle: "How interest compensates lenders for risk and delayed consumption.",
                scenario: {
                  narrative: "Folake needs an industrial sewing machine costing ₦100,000 to fulfill a lucrative wedding contract. She borrows ₦100,000 from a credit union agreeing to repay ₦115,000 in twelve months. The extra ₦15,000 is the interest fee. Because the machine allows her to earn ₦80,000 in net sewing profits, paying ₦15,000 in interest was a profitable investment.",
                  characters: [
                    { name: "Folake", role: "Fashion Designer", details: "Borrower deploying capital into productive equipment" },
                    { name: "Credit Union", role: "Lender", details: "Supplying capital and earning 15% interest for delayed use" }
                  ],
                  data: [
                    { label: "Principal Borrowed", value: "₦100,000" },
                    { label: "Annual Interest Fee", value: "₦15,000 (15%)" },
                    { label: "Business Net Profit Earned", value: "₦80,000" },
                    { label: "Net Gain to Folake", value: "₦65,000 Surplus" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why does interest exist in financial agreements?",
                    options: [
                      { id: "A", label: "It compensates the lender for forgoing their own immediate spending and taking on the risk of default." },
                      { id: "B", label: "It is an arbitrary punishment for not having cash." },
                      { id: "C", label: "Banks are legally required to double all numbers." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Interest is simply the 'rent' you pay to use someone else's money over time. When used to acquire productive assets that generate higher returns than the interest rate, borrowing creates wealth.",
                key_takeaway: "Interest is the price of renting capital across time.",
                concepts: ["interest_rate", "liability"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT1.G1.I02",
                kind: "slide",
                order: 2,
                title: "Understanding Principal and Interest",
                subtitle: "The basic components of any debt or savings contract.",
                body: [
                  {
                    type: "definition",
                    term: "Interest Rate",
                    text: "The percentage proportion of an amount loaned which a lender charges as interest to the borrower, typically expressed on an annual basis."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Principal: The original sum of money borrowed in a loan or put into an investment.",
                      "Interest: The additional fee paid for the privilege of using the principal.",
                      "Annual Percentage Rate (APR): The total annual cost of borrowing, including interest and processing fees."
                    ]
                  }
                ],
                concepts: ["interest_rate"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT1.G1.I03",
                kind: "widget",
                order: 3,
                title: "Loan Repayment Calculator",
                subtitle: "Calculate monthly payments and total interest across different borrowing rates.",
                widget_type: "loan_repayment_calculator",
                config: {
                  title: "Simple Loan Interest Estimator",
                  principal: 200000,
                  default_interest_rate: 18,
                  loan_term_months: 12
                },
                concepts: ["interest_rate", "liability"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT1.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Interest Basics Quiz",
                subtitle: "Test your understanding of interest rates.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L10.CT1.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "If you borrow ₦50,000 for one year at a 20% annual interest rate, what is the total amount you must repay at the end of the year?",
                    options: [
                      { id: "A", text: "₦60,000 (₦50,000 principal + ₦10,000 interest)" },
                      { id: "B", text: "₦70,000" },
                      { id: "C", text: "₦50,000" }
                    ],
                    correct: "A",
                    explanation: "Interest = 20% of ₦50,000 = ₦10,000. Total repayment = ₦50,000 + ₦10,000 = ₦60,000.",
                    concepts: ["interest_rate"]
                  }
                ],
                concepts: ["interest_rate"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L10.CT1.G2",
            title: "Borrowing Money at Different Rates",
            objective: "Examine prime commercial rates vs predatory quick loan apps charging 100%+ APR.",
            items: [
              {
                id: "L10.CT1.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The 30% Per Month Loan App Trap",
                subtitle: "How compound borrowing rates create debt spirals.",
                scenario: {
                  narrative: "Tade borrows ₦40,000 from an unregulated mobile loan app to buy fashionable clothes for a birthday party. The app advertises a 'low fee of just 1% per day' (30% per month). When Tade misses his payment deadline at 30 days, late penalties kick in. Within four months, the app demands ₦128,000 for the original ₦40,000 loan, and begins harassing his phone contacts.",
                  characters: [
                    { name: "Tade", role: "Consumer Borrower", details: "Borrowed for non-essential clothing" },
                    { name: "Predatory Loan App", role: "Unregulated Lender", details: "Charges 365% effective annualized APR" }
                  ],
                  data: [
                    { label: "Original Principal", value: "₦40,000" },
                    { label: "Advertised Daily Rate", value: "1% / Day (365% APR)" },
                    { label: "Amount Due After 4 Months", value: "₦128,000 (+220%)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What critical financial mistake did Tade make?",
                    options: [
                      { id: "A", label: "Borrowing at predatory interest rates for non-essential depreciating consumption." },
                      { id: "B", label: "Using an Android smartphone." },
                      { id: "C", label: "Going to a birthday celebration." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "A rate of '1% per day' sounds harmless, but annualized it represents an astronomical 365% APR. Borrowing at extreme interest rates for non-essential consumer goods is a primary driver of household bankruptcy.",
                key_takeaway: "Never borrow high-interest debt for non-income-generating lifestyle consumption.",
                concepts: ["interest_rate", "liability"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT1.G2.I02",
                kind: "slide",
                order: 2,
                title: "Good Debt vs. Toxic Debt",
                subtitle: "The rule of return on invested capital.",
                body: [
                  {
                    type: "bullet_list",
                    items: [
                      "Productive Debt ('Good Debt'): Borrowing at low or moderate interest rates to acquire assets that earn more than the interest cost (e.g. business inventory, productive equipment, education with clear career payoff).",
                      "Toxic Debt: Borrowing at high interest rates (over 25% APR) for lifestyle luxuries, consumer gadgets, or day-to-day food that produces zero future cash flow."
                    ]
                  }
                ],
                concepts: ["liability", "interest_rate"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT1.G2.I03",
                kind: "widget",
                order: 3,
                title: "Debt Quality Sorter",
                subtitle: "Classify borrowing scenarios into Productive Debt vs Toxic Debt.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Debt Quality Classifier",
                  buckets: [
                    { id: "productive", label: "Productive Debt" },
                    { id: "toxic", label: "Toxic Debt" }
                  ],
                  cards: [
                    { id: "c1", label: "Low-interest commercial loan to buy a commercial grain milling machine", bucket: "productive", feedback: "The milling machine generates daily revenue that easily covers debt service." },
                    { id: "c2", label: "Taking a 25% monthly loan app advance to buy concert VIP tickets", bucket: "toxic", feedback: "Entertainment provides zero financial return while leaving crushing debt." },
                    { id: "c3", label: "Borrowing to fund an accredited welding and underwater engineering certification", bucket: "productive", feedback: "High-value professional certifications dramatically expand earning power." },
                    { id: "c4", label: "Borrowing to bet on online sports gambling games", bucket: "toxic", feedback: "Gambling with borrowed funds guarantees financial catastrophe." }
                  ]
                },
                concepts: ["liability", "interest_rate"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT1.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Debt Evaluation Quiz",
                subtitle: "Assess your ability to differentiate productive and dangerous borrowing.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L10.CT1.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "When is borrowing money financially justified?",
                    options: [
                      { id: "A", text: "When the borrowed capital is invested in an asset or enterprise that generates returns higher than the cost of the loan." },
                      { id: "B", text: "Whenever you feel like buying expensive gifts for friends." },
                      { id: "C", text: "Whenever a lender offers you an easy credit limit." }
                    ],
                    correct: "A",
                    explanation: "Borrowing is economically sound only when the net return on the asset exceeds the cost of financing.",
                    concepts: ["liability", "interest_rate"]
                  }
                ],
                concepts: ["liability"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L10.CT1.G3",
            title: "Saving Money and Earning Compound Interest",
            objective: "Harness compound interest to build long-term wealth.",
            items: [
              {
                id: "L10.CT1.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Power of Starting at Age 22 vs. 32",
                subtitle: "How a ten-year head start changes compounding results exponentially.",
                scenario: {
                  narrative: "Amina starts investing ₦30,000 monthly at age 22 into an index portfolio compounding at 12% annually. She stops contributing at age 32 (investing for only 10 years, total contributed: ₦3.6M) and lets it compound until age 60. Her friend Bolaji waits until age 32 to start, investing ₦30,000 every single month for 28 years until age 60 (total contributed: ₦10.08M). At age 60, Amina has accumulated more wealth than Bolaji, despite contributing less than half the money.",
                  characters: [
                    { name: "Amina", role: "Early Starter", details: "Invested from age 22 to 32 (10 yrs only); accumulated ₦72M+" },
                    { name: "Bolaji", role: "Late Starter", details: "Invested from age 32 to 60 (28 yrs); accumulated ₦68M" }
                  ],
                  data: [
                    { label: "Amina Total Cash Invested", value: "₦3,600,000" },
                    { label: "Bolaji Total Cash Invested", value: "₦10,080,000 (2.8x more)" },
                    { label: "Amina Final Wealth at 60", value: "₦72,400,000" },
                    { label: "The Deciding Factor", value: "Time in the Market (Compounding)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why did Amina end up with more wealth despite contributing less than half as much money as Bolaji?",
                    options: [
                      { id: "A", label: "Her money had an extra 10 years of uninterrupted exponential compound growth." },
                      { id: "B", label: "Her bank paid her triple the interest rate." },
                      { id: "C", label: "Bolaji's bank went out of business." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Compound interest is exponential, not linear. In compounding, time is vastly more powerful than the amount of money contributed. The earlier you begin saving and investing, the less total capital you need to reach financial freedom.",
                key_takeaway: "Time in the market beats timing the market. Start compounding as early as possible.",
                concepts: ["compound_interest", "saving"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT1.G3.I02",
                kind: "slide",
                order: 2,
                title: "How Compound Interest Works",
                subtitle: "Earning interest on your interest.",
                body: [
                  {
                    type: "definition",
                    term: "Compound Interest",
                    text: "Interest calculated on the initial principal as well as on the accumulated interest from previous periods."
                  },
                  {
                    type: "paragraph",
                    text: "Albert Einstein famously called compound interest the eighth wonder of the world: 'He who understands it, earns it; he who doesn't, pays it.'"
                  }
                ],
                concepts: ["compound_interest"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT1.G3.I03",
                kind: "widget",
                order: 3,
                title: "Interactive Savings Growth Calculator",
                subtitle: "Adjust monthly contributions and time horizons to see compound interest in action.",
                widget_type: "savings_growth_calculator",
                config: {
                  title: "Compound Wealth Visualizer",
                  initial_principal: 100000,
                  monthly_addition: 25000,
                  nominal_annual_rate: 14,
                  inflation_rate: 0
                },
                concepts: ["compound_interest", "saving"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT1.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Compounding Principles Quiz",
                subtitle: "Test your understanding of compound growth.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L10.CT1.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "What is the key difference between simple interest and compound interest?",
                    options: [
                      { id: "A", text: "Simple interest is paid only on the original principal, whereas compound interest is earned on both principal and accumulated interest." },
                      { id: "B", text: "Simple interest is always twice as high as compound interest." },
                      { id: "C", text: "Compound interest can only be earned in foreign currencies." }
                    ],
                    correct: "A",
                    explanation: "Compound interest reinvests earnings, causing wealth to grow exponentially over time.",
                    concepts: ["compound_interest"]
                  }
                ],
                concepts: ["compound_interest"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L10.CT2.G1",
            title: "The Central Bank and Monetary Policy",
            objective: "Analyze how central banks use the benchmark interest rate (MPR) to cool inflation or stimulate job creation.",
            items: [
              {
                id: "L10.CT2.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The Central Bank Raises the Monetary Policy Rate",
                subtitle: "Why the central bank increases borrowing costs to combat runaway inflation.",
                scenario: {
                  narrative: "With national inflation climbing past 28%, the Central Bank Monetary Policy Committee votes to raise the benchmark Monetary Policy Rate (MPR) from 18% to 26%. Commercial banks immediately raise their loan interest rates to 32%. Because borrowing is now expensive, businesses postpone non-essential expansions and consumers buy fewer items on credit. As spending cools, the rapid acceleration of price inflation slows.",
                  characters: [
                    { name: "Central Bank Governor", role: "Monetary Regulator", details: "Using interest rates as the primary tool to control inflation" },
                    { name: "Commercial Banks", role: "Lenders", details: "Adjusting customer borrowing and deposit rates" }
                  ],
                  data: [
                    { label: "Old Central Bank Rate", value: "18%" },
                    { label: "New Central Bank Rate", value: "26% (+800 bps)" },
                    { label: "Commercial Loan Rate", value: "32% / Year" },
                    { label: "Goal", value: "Cool excess borrowing and reduce inflation" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why do central banks raise interest rates when inflation is high?",
                    options: [
                      { id: "A", label: "Higher rates make borrowing expensive and saving rewarding, reducing total spending in the economy to cool price pressure." },
                      { id: "B", label: "They want all businesses to shut down." },
                      { id: "C", label: "Raising rates prints free money for citizens." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "The central bank uses the benchmark interest rate like the brake and accelerator pedal of an automobile. When the economy is overheating with dangerous inflation, it presses the brake (raises interest rates) to slow down borrowing and spending.",
                key_takeaway: "Raising interest rates cools inflation by making borrowing expensive and encouraging savings.",
                concepts: ["central_bank", "interest_rate", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT2.G1.I02",
                kind: "slide",
                order: 2,
                title: "The Monetary Policy Transmission Mechanism",
                subtitle: "How central bank boardrooms affect your bank account.",
                body: [
                  {
                    type: "bullet_list",
                    items: [
                      "When Central Bank Raises Rates: Mortgage rates rise, car loan costs jump, credit card rates climb, and fixed deposit savings yields increase. People spend less; inflation cools.",
                      "When Central Bank Cuts Rates: Borrowing becomes cheap, businesses take loans to hire and expand, and consumer spending surges. The economy accelerates."
                    ]
                  }
                ],
                concepts: ["central_bank", "interest_rate"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT2.G1.I03",
                kind: "widget",
                order: 3,
                title: "Monetary Policy Dial",
                subtitle: "Simulate what happens when the central bank turns the interest rate dial up or down.",
                widget_type: "option_comparison",
                config: {
                  title: "Central Bank Rate Policy Impact",
                  option_a: {
                    name: "Rate Hike Regime (e.g. 26% MPR)",
                    attributes: {
                      "Cost of Borrowing": "Very High (discourages unnecessary debt)",
                      "Reward for Saving": "High (treasury bills and fixed deposits pay more)",
                      "Economic Growth": "Slower (companies pause large projects)",
                      "Inflation Pressure": "Cooling down"
                    }
                  },
                  option_b: {
                    name: "Rate Cut Regime (e.g. 11% MPR)",
                    attributes: {
                      "Cost of Borrowing": "Cheap (encourages business expansion)",
                      "Reward for Saving": "Low (savers seek higher-risk equities/real estate)",
                      "Economic Growth": "Accelerating (hiring and production expand)",
                      "Inflation Pressure": "Rising if demand outpaces production"
                    }
                  }
                },
                concepts: ["central_bank", "interest_rate", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT2.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Central Bank Policy Quiz",
                subtitle: "Test your understanding of monetary policy levers.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L10.CT2.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "If the central bank aggressively increases interest rates, what should an ordinary citizen expect regarding bank savings and personal loans?",
                    options: [
                      { id: "A", text: "Personal loans will become more expensive, while returns on fixed deposits and treasury bills will increase." },
                      { id: "B", text: "Loans will become completely free of charge." },
                      { id: "C", text: "Banks will stop accepting deposits." }
                    ],
                    correct: "A",
                    explanation: "Commercial banks pass higher central bank benchmark rates onto both loan borrowers and deposit savers.",
                    concepts: ["central_bank", "interest_rate"]
                  }
                ],
                concepts: ["central_bank", "interest_rate"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L10.CT2.G2",
            title: "Interest Rates, Inflation, and Spending",
            objective: "Analyze consumer behavior under high vs low interest rate economic regimes.",
            items: [
              {
                id: "L10.CT2.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Builder's Delayed Construction",
                subtitle: "How high borrowing interest rates force developers to pause projects.",
                scenario: {
                  narrative: "Dele planned to take a ₦20,000,000 commercial construction loan to build a four-unit rental block. When interest rates were 14%, annual interest was ₦2,800,000, which projected rental income easily covered. When bank lending rates jumped to 30%, annual interest surged to ₦6,000,000. Dele immediately cancelled the project because rental yields could not cover the interest.",
                  characters: [
                    { name: "Dele", role: "Real Estate Developer", details: "Cancels capital expansion due to 30% financing costs" }
                  ],
                  data: [
                    { label: "Loan Principal", value: "₦20,000,000" },
                    { label: "Interest at 14%", value: "₦2,800,000 / Year" },
                    { label: "Interest at 30%", value: "₦6,000,000 / Year (+₦3.2M)" },
                    { label: "Project Status", value: "Suspended" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What broader economic effect occurred when Dele paused construction?",
                    options: [
                      { id: "A", label: "Construction workers lost jobs, cement sellers lost orders, and economic growth cooled down." },
                      { id: "B", label: "Cement prices automatically dropped to zero." },
                      { id: "C", label: "Dele became instantly wealthy." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "High interest rates intentionally slow economic activity to subdue inflation. By making capital expensive, businesses pause marginal debt-funded projects, reducing competition for scarce building materials and labor.",
                key_takeaway: "High interest rates cool aggregate spending by discouraging debt-financed expansion.",
                concepts: ["interest_rate", "liability", "central_bank"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT2.G2.I02",
                kind: "slide",
                order: 2,
                title: "The Trade-off of Rate Hikes",
                subtitle: "Taming inflation vs preserving economic employment.",
                body: [
                  {
                    type: "paragraph",
                    text: "Central bankers face a difficult tightrope:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Raise rates too slowly: Inflation runs wild, destroying the currency and impoverishing consumers.",
                      "Raise rates too aggressively: Borrowing freezes, businesses downsize, unemployment rises, and the economy risks entering a recession."
                    ]
                  }
                ],
                concepts: ["central_bank", "interest_rate", "economic_recession"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT2.G2.I03",
                kind: "widget",
                order: 3,
                title: "Household Rate Shock Simulator",
                subtitle: "See how interest rate changes alter monthly mortgage and debt repayments.",
                widget_type: "loan_repayment_calculator",
                config: {
                  title: "Household Loan Rate Shock Calculator",
                  principal: 5000000,
                  default_interest_rate: 28,
                  loan_term_months: 36
                },
                concepts: ["interest_rate", "liability"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT2.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Spending and Rate Quiz",
                subtitle: "Test your understanding of interest rates on spending.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L10.CT2.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "During a high interest rate regime, what is the smartest financial posture for an individual household?",
                    options: [
                      { id: "A", text: "Aggressively pay down high-interest floating debt, avoid new consumer borrowing, and deploy surplus savings into high-yield fixed income." },
                      { id: "B", text: "Take on as many short-term variable interest loans as possible." },
                      { id: "C", text: "Close all savings accounts and keep physical cash." }
                    ],
                    correct: "A",
                    explanation: "In high interest regimes, debt is extraordinarily costly while safe fixed-income yields are at their highest.",
                    concepts: ["interest_rate", "liability", "saving"]
                  }
                ],
                concepts: ["interest_rate"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L10.CT2.G3",
            title: "How Rate Changes Affect Households and Businesses",
            objective: "Synthesize the impact of interest rates across all financial planning domains.",
            items: [
              {
                id: "L10.CT2.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Treasury Bill vs. Commercial Loan Decision",
                subtitle: "How high interest rates reward capital holders while punishing overleveraged firms.",
                scenario: {
                  narrative: "During a period of 22% treasury bill yields, Company Alpha has ₦50,000,000 cash. It earns ₦11,000,000 annually with zero default risk by investing in government treasury bills. Meanwhile, Company Beta has ₦50,000,000 in floating bank debt at 30% interest, costing them ₦15,000,000 annually in interest fees. Company Alpha expands, while Company Beta struggles to avoid liquidation.",
                  characters: [
                    { name: "Company Alpha", role: "Cash Rich Firm", details: "Earns 22% risk-free yield on cash balances" },
                    { name: "Company Beta", role: "Debt Heavy Firm", details: "Pays 30% annual interest on outstanding bank loans" }
                  ],
                  data: [
                    { label: "Treasury Bill Yield", value: "22% Risk-Free Return" },
                    { label: "Commercial Loan Rate", value: "30% Annual Financing Cost" },
                    { label: "Alpha Annual Inflow", value: "+₦11,000,000" },
                    { label: "Beta Annual Outflow", value: "-₦15,000,000" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What fundamental rule of financial positioning is highlighted here?",
                    options: [
                      { id: "A", label: "In a high interest rate environment, being a capital provider (saver/investor) is highly lucrative, while being a debtor is extremely dangerous." },
                      { id: "B", label: "Companies should never hold cash." },
                      { id: "C", label: "Interest rates have no impact on company profitability." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Interest rates redistribute wealth between savers and borrowers. When rates are high, holding debt is toxic, but lending capital through treasury bills and fixed income yields handsome, low-risk income.",
                key_takeaway: "Position yourself as an owner and lender of capital, rather than a perpetual borrower.",
                concepts: ["interest_rate", "asset", "liability"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT2.G3.I02",
                kind: "slide",
                order: 2,
                title: "Lesson 10 Summary: Navigating Interest Rates",
                subtitle: "The rules of the interest rate game.",
                body: [
                  {
                    type: "bullet_list",
                    items: [
                      "Interest is the price of renting money across time.",
                      "Compound interest makes time your greatest asset when saving, and your worst enemy when in debt.",
                      "Central banks raise rates to fight inflation and cut rates to stimulate jobs.",
                      "When rates are high: Eliminate debt and capture high fixed-income yields.",
                      "When rates are low: Secure cheap, fixed-rate financing for productive long-term assets."
                    ]
                  }
                ],
                concepts: ["interest_rate", "compound_interest", "central_bank"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT2.G3.I03",
                kind: "widget",
                order: 3,
                title: "Interest Strategy Matcher",
                subtitle: "Match macroeconomic interest rate conditions with the appropriate personal financial move.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Rate Regime Strategy Matcher",
                  buckets: [
                    { id: "high_rate", label: "Action in High-Rate Environment" },
                    { id: "low_rate", label: "Action in Low-Rate Environment" }
                  ],
                  cards: [
                    { id: "c1", label: "Locking in 20%+ yields in safe government treasury bills", bucket: "high_rate", feedback: "Take advantage of attractive risk-free returns." },
                    { id: "c2", label: "Securing a low fixed-rate 15-year mortgage to buy real estate", bucket: "low_rate", feedback: "Lock in historically cheap borrowing costs for the long haul." },
                    { id: "c3", label: "Rapidly paying off all variable-rate consumer debt and credit lines", bucket: "high_rate", feedback: "Floating interest rates will skyrocket and drain your cash flow." },
                    { id: "c4", label: "Investing aggressively in equities and growing business equity", bucket: "low_rate", feedback: "Low rates fuel business expansion and stock market valuations." }
                  ]
                },
                concepts: ["interest_rate", "saving", "liability"],
                authoring_status: "authored"
              },
              {
                id: "L10.CT2.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Lesson 10 Final Review",
                subtitle: "Comprehensive assessment of interest rate mechanics and strategies.",
                quiz_mode: "lesson_final",
                questions: [
                  {
                    id: "L10.CT2.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "Why is compounding interest over 30 years often described as exponential growth?",
                    options: [
                      { id: "A", text: "Because in later years, the interest earned on accumulated past interest dwarfs the original money you contributed." },
                      { id: "B", text: "Because interest rates double every calendar month." },
                      { id: "C", text: "Because banks give away free cash lotteries." }
                    ],
                    correct: "A",
                    explanation: "Compounding curves start slowly and curve upwards steeply over decades as accumulated earnings generate their own returns.",
                    concepts: ["compound_interest"]
                  }
                ],
                concepts: ["interest_rate", "compound_interest"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // LESSON 11: HOW ECONOMIC CRISES AFFECT ORDINARY PEOPLE
  // ==========================================
  L11: {
    id: "L11",
    number: 11,
    title: "How Economic Downturns Affect Ordinary People",
    subtitle: "Explore the causes of recessions, the 2008 global financial crisis, and how to build an unbreakable personal emergency shield.",
    difficulty: "High",
    contents: [
      {
        id: "L11.CT1",
        title: "The Anatomy of an Economic Crisis",
        objective: "Understand recessions, unemployment contagion, and how macroeconomic downturns impact households.",
        groups: [
          {
            id: "L11.CT1.G1",
            title: "What Is an Economic Crisis?",
            objective: "Define economic recessions, depressions, and financial contagion.",
            items: [
              {
                id: "L11.CT1.G1.I01",
                kind: "case_study",
                order: 1,
                title: "When the Factory Town Goes Quiet",
                subtitle: "How the closure of a major anchor employer impacts an entire municipality.",
                scenario: {
                  narrative: "In a manufacturing town, the primary textile factory employs 4,000 workers. When global trade tariffs make exported textiles uncompetitive, the factory closes permanently. Within three months, local restaurants lose 70% of their customers, barbers and mechanics face empty shops, real estate rents drop by half, and local government tax revenues collapse.",
                  characters: [
                    { name: "Factory Workers", role: "Unemployed Labor", details: "4,000 workers lose monthly salaries simultaneously" },
                    { name: "Town Small Businesses", role: "Secondary Economy", details: "Face immediate bankruptcy as consumer spending dries up" }
                  ],
                  data: [
                    { label: "Direct Job Losses", value: "4,000 Factory Workers" },
                    { label: "Indirect Business Revenue Drop", value: "-70% Across Town" },
                    { label: "Economic Phenomenon", value: "Local Economic Depression" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why did barbers and restaurant owners lose their livelihoods even though they never worked in the textile factory?",
                    options: [
                      { id: "A", label: "Because one person's spending is another's income; when factory workers lost wages, all local businesses lost customers." },
                      { id: "B", label: "The government banned haircuts." },
                      { id: "C", label: "Textile machinery poisoned the food." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Economic crises spread like a contagion through the circular flow of spending. When a major sector contracts, the loss of worker spending spreads outward into retail, services, housing, and government services.",
                key_takeaway: "Economic downturns ripple through every sector of society via the circular flow of spending.",
                concepts: ["economic_recession", "economy"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT1.G1.I02",
                kind: "slide",
                order: 2,
                title: "What Is a Recession?",
                subtitle: "The official definition of an economic contraction.",
                body: [
                  {
                    type: "definition",
                    term: "Economic Recession",
                    text: "A significant, widespread, and sustained decline in economic activity across an economy, typically defined as two consecutive quarters of negative GDP growth."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Falling production and lower retail sales.",
                      "Rising unemployment and corporate hiring freezes.",
                      "Declining corporate profits and falling stock market valuations.",
                      "Stagnant or declining wage growth."
                    ]
                  }
                ],
                concepts: ["economic_recession", "gross_domestic_product"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT1.G1.I03",
                kind: "widget",
                order: 3,
                title: "Economic Health Indicator",
                subtitle: "Compare economic signals between boom times and recessionary downturns.",
                widget_type: "option_comparison",
                config: {
                  title: "Economic Boom vs. Recession",
                  option_a: {
                    name: "Economic Boom (Expansion)",
                    attributes: {
                      "GDP Growth": "Positive (+3% to +7% annually)",
                      "Job Market": "Plentiful openings; workers command raises",
                      "Consumer Spending": "High; retail sales surging",
                      "Credit Availability": "Banks eagerly lend to households"
                    }
                  },
                  option_b: {
                    name: "Economic Recession (Contraction)",
                    attributes: {
                      "GDP Growth": "Negative (-1% to -5% annually)",
                      "Job Market": "Layoffs, hiring freezes, salary delays",
                      "Consumer Spending": "Consumers cut discretionary items",
                      "Credit Availability": "Banks tighten credit standards drastically"
                    }
                  }
                },
                concepts: ["economic_recession", "gross_domestic_product"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT1.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Recession Fundamentals Quiz",
                subtitle: "Assess your understanding of economic recessions.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L11.CT1.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "What is the standard technical definition of an economic recession?",
                    options: [
                      { id: "A", text: "Two consecutive quarters (six months) of negative Real GDP growth." },
                      { id: "B", text: "Any month where petrol prices rise by 5%." },
                      { id: "C", text: "A week where the stock market closes for holidays." }
                    ],
                    correct: "A",
                    explanation: "Two consecutive quarters of declining economic output (GDP) officially marks a technical recession.",
                    concepts: ["economic_recession", "gross_domestic_product"]
                  }
                ],
                concepts: ["economic_recession"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L11.CT1.G2",
            title: "Recession, Unemployment, and Falling Income",
            objective: "Examine how job cuts, salary freezes, and business contractions impact household stability.",
            items: [
              {
                id: "L11.CT1.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Tech Startup Downsizing",
                subtitle: "When venture funding dries up during an economic slowdown.",
                scenario: {
                  narrative: "Tayo worked as a product marketing manager at a fast-growing Lagos fintech startup earning ₦600,000 monthly. When global interest rates rose and investment funding froze, the company's revenue missed targets by 50%. The founders were forced to lay off 40% of the workforce with only two weeks' severance pay. Tayo had no emergency savings fund.",
                  characters: [
                    { name: "Tayo", role: "Laid-off Tech Worker", details: "Zero emergency fund; high monthly expenses of ₦450k" }
                  ],
                  data: [
                    { label: "Monthly Income Before Layoff", value: "₦600,000" },
                    { label: "Emergency Cash Buffer", value: "₦45,000 (3 days of survival)" },
                    { label: "Monthly Living Expenses", value: "₦450,000" },
                    { label: "Result", value: "Immediate financial emergency and distress" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What made Tayo's situation catastrophic within days of losing his job?",
                    options: [
                      { id: "A", label: "He lived at the absolute ceiling of his income with zero emergency cash buffer to survive between jobs." },
                      { id: "B", label: "His apartment burned down." },
                      { id: "C", label: "Fintech startups are banned by law." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "No job is 100% secure. Economic downturns frequently cause sudden corporate restructuring. Maintaining an emergency fund covering 3 to 6 months of essential living expenses is the non-negotiable shield every worker needs.",
                key_takeaway: "An emergency fund is your personal unemployment insurance policy.",
                concepts: ["emergency_fund", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT1.G2.I02",
                kind: "slide",
                order: 2,
                title: "The Emergency Fund: Your First Line of Defense",
                subtitle: "Why liquidity matters most during a downturn.",
                body: [
                  {
                    type: "definition",
                    term: "Emergency Fund",
                    text: "A dedicated cash reserve set aside in a secure, liquid account to cover 3 to 6 months of essential living expenses in the event of job loss, medical emergency, or economic shock."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Keep it liquid: Accessible within 24 hours (high-yield savings or money market funds).",
                      "Never invest emergency funds in volatile stocks, illiquid real estate, or high-risk crypto.",
                      "Only touch it for genuine life emergencies (job loss, major illness, emergency home repairs)."
                    ]
                  }
                ],
                concepts: ["emergency_fund", "liquidity", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT1.G2.I03",
                kind: "widget",
                order: 3,
                title: "Calculate Your Emergency Fund Target",
                subtitle: "Calculate how much cash you need to survive 3, 6, or 9 months of unemployment.",
                widget_type: "numeric_calculator",
                config: {
                  title: "Emergency Fund Sizer",
                  default_inputs: {
                    monthly_essential_rent: 80000,
                    monthly_essential_food: 60000,
                    monthly_essential_utilities_transport: 40000,
                    target_months: 6
                  },
                  formula_display: "Target Fund = Total Monthly Essentials × Target Months"
                },
                concepts: ["emergency_fund", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT1.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Emergency Preparedness Quiz",
                subtitle: "Test your readiness for income disruptions.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L11.CT1.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "Where should your emergency fund be stored?",
                    options: [
                      { id: "A", text: "In a low-risk, highly liquid account (such as a high-yield savings account or money market fund) accessible within 24 hours." },
                      { id: "B", text: "Locked into illiquid undeveloped land that takes two years to sell." },
                      { id: "C", text: "Invested in volatile speculative penny stocks." }
                    ],
                    correct: "A",
                    explanation: "Emergency funds require immediate liquidity and capital preservation, not high-risk volatility.",
                    concepts: ["emergency_fund", "liquidity"]
                  }
                ],
                concepts: ["emergency_fund"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L11.CT1.G3",
            title: "Inflation, Scarcity, and Financial Pressure",
            objective: "Analyze stagflation: the painful combination of economic stagnation and rising consumer prices.",
            items: [
              {
                id: "L11.CT1.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Double Trap: Stagflation",
                subtitle: "When the economy contracts while consumer prices surge simultaneously.",
                scenario: {
                  narrative: "During a national economic crisis, businesses downsize and unemployment rises to 25%. Normally, low economic activity cools prices. However, due to severe currency devaluation and port tariffs, food and fuel prices surge by 35%. Workers face a double nightmare: jobs are scarce and salaries are frozen, while the cost of surviving increases every week.",
                  characters: [
                    { name: "Ordinary Citizens", role: "Consumers", details: "Trapped between shrinking job prospects and soaring grocery costs" }
                  ],
                  data: [
                    { label: "Economic Growth Rate", value: "-2.1% (Recession)" },
                    { label: "Annual Inflation Rate", value: "+34.5% (High Inflation)" },
                    { label: "Economic Diagnosis", value: "Stagflation" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What makes stagflation the most difficult economic environment for central banks to fix?",
                    options: [
                      { id: "A", label: "If the central bank cuts interest rates to stimulate jobs, inflation gets worse; if it raises rates to fight inflation, it worsens the recession." },
                      { id: "B", label: "Stagflation turns all paper notes into coins." },
                      { id: "C", label: "Central banks are closed during stagflation." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Stagflation (Stagnant Growth + High Inflation) is the most challenging macroeconomic scenario. It demands that individuals maintain strict budget discipline, eliminate variable debt, and build resilient, multi-stream earning power.",
                key_takeaway: "Stagflation combines high unemployment with high inflation, requiring aggressive household cost-cutting.",
                concepts: ["economic_recession", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT1.G3.I02",
                kind: "slide",
                order: 2,
                title: "Navigating Stagflation",
                subtitle: "Defensive financial survival strategies.",
                body: [
                  {
                    type: "bullet_list",
                    items: [
                      "Cut non-essential recurring subscriptions immediately.",
                      "Form wholesale buying groups with family or neighbors to acquire staple food in bulk.",
                      "Diversify your income with freelance, agricultural, or trade skills.",
                      "Avoid taking on new loans or financial obligations."
                    ]
                  }
                ],
                concepts: ["budget", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT1.G3.I03",
                kind: "widget",
                order: 3,
                title: "Emergency Budget Trimmer",
                subtitle: "Strip a household budget down to pure survival essentials.",
                widget_type: "budget_prioritizer",
                config: {
                  title: "Crisis Mode Budget Stripper",
                  monthly_income: 180000,
                  categories: [
                    { name: "Rent & Basic Shelter", amount: 65000, locked: true },
                    { name: "Basic Nutritional Groceries", amount: 60000, locked: true },
                    { name: "Work Commute Transport", amount: 25000, locked: true },
                    { name: "Streaming & Weekend Outings", amount: 20000, flexible: true },
                    { name: "Clothing Upgrades & Electronics", amount: 10000, flexible: true }
                  ]
                },
                concepts: ["budget", "needs_vs_wants"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT1.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Stagflation Check",
                subtitle: "Assess your understanding of stagflation.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L11.CT1.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "What is 'stagflation'?",
                    options: [
                      { id: "A", text: "A toxic economic condition characterized by stagnant economic growth, high unemployment, and high inflation simultaneously." },
                      { id: "B", text: "A period where all food is completely free." },
                      { id: "C", text: "A celebration of stock market record highs." }
                    ],
                    correct: "A",
                    explanation: "Stagflation combines the misery of a stagnant economy (unemployment) with the burden of rising prices (inflation).",
                    concepts: ["economic_recession", "inflation"]
                  }
                ],
                concepts: ["economic_recession", "inflation"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L11.CT2.G1",
            title: "The Global Financial Crisis of 2008",
            objective: "Analyze the historic 2008 subprime mortgage collapse, excessive leverage, and systemic risk.",
            items: [
              {
                id: "L11.CT2.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The Subprime Mortgage Meltdown",
                subtitle: "How irresponsible lending in American housing brought down global banking.",
                scenario: {
                  narrative: "In the mid-2000s, US banks issued millions of home mortgages to borrowers with no steady income, zero down payments, and poor credit ratings ('subprime loans'). Wall Street investment firms bundled thousands of these risky mortgages into complex financial securities stamped with 'Triple-A' ratings and sold them to global banks and pension funds. When homeowners began defaulting on mortgages en masse in 2007, the securities collapsed, bankrupting century-old Wall Street banks like Lehman Brothers and freezing global credit.",
                  characters: [
                    { name: "Wall Street Banks", role: "Mortgage Bundlers", details: "Overleveraged 30-to-1 on subprime mortgage derivatives" },
                    { name: "Subprime Borrowers", role: "Homebuyers", details: "Signed up for adjustable-rate loans they could not afford" },
                    { name: "Global Economy", role: "Casualty", details: "Credit froze, world trade dropped, millions lost jobs globally" }
                  ],
                  data: [
                    { label: "Lehman Brothers Bankruptcy", value: "September 2008 ($600B+ Debt)" },
                    { label: "Global Stock Market Losses", value: "Over $10 Trillion Erased" },
                    { label: "US Unemployment Peak", value: "10.0%" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What was the root cause of the 2008 Global Financial Crisis?",
                    options: [
                      { id: "A", label: "Excessive, reckless debt and predatory mortgage lending packaged into misrated securities that collapsed when housing prices turned." },
                      { id: "B", label: "A global shortage of paper ink." },
                      { id: "C", label: "Governments banned computers." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "The 2008 crisis taught humanity a profound lesson on the dangers of excessive leverage (borrowing). When institutions and households borrow 30 times more than their equity, even a small 3% decline in asset values wipes out 100% of their net worth.",
                key_takeaway: "Excessive debt and financial speculation turn localized mistakes into systemic global collapses.",
                concepts: ["liability", "economic_recession"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT2.G1.I02",
                kind: "slide",
                order: 2,
                title: "The Peril of Excessive Leverage",
                subtitle: "Why debt magnifies losses just as much as gains.",
                body: [
                  {
                    type: "definition",
                    term: "Leverage",
                    text: "Using borrowed capital to increase the potential return (and risk) of an investment."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "When you invest ₦100,000 of your own cash and the asset drops by 10%, you lose ₦10,000. You still have ₦90,000.",
                      "If you borrow ₦900,000 to invest ₦1,000,000 and the asset drops by 10%, your entire ₦100,000 personal equity is wiped out completely.",
                      "Excessive leverage makes you fragile to even the smallest economic bump."
                    ]
                  }
                ],
                concepts: ["liability", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT2.G1.I03",
                kind: "widget",
                order: 3,
                title: "Leverage Risk Simulator",
                subtitle: "See how borrowing multiples amplify both gains and total bankruptcies.",
                widget_type: "option_comparison",
                config: {
                  title: "Cash Investor vs. Leveraged Borrower (10% Asset Drop)",
                  option_a: {
                    name: "Prudent Cash Investor (0% Debt)",
                    attributes: {
                      "Initial Equity": "₦1,000,000",
                      "Borrowed Debt": "₦0",
                      "Asset Value After 10% Drop": "₦900,000",
                      "Remaining Personal Equity": "₦900,000 (Fully solvent, survives downturn)"
                    }
                  },
                  option_b: {
                    name: "Overleveraged Trader (90% Debt)",
                    attributes: {
                      "Initial Equity": "₦1,000,000",
                      "Borrowed Debt": "₦9,000,000 (10x Leverage)",
                      "Asset Value After 10% Drop": "₦9,000,000",
                      "Remaining Personal Equity": "₦0 (Total wipeout; facing debt collectors)"
                    }
                  }
                },
                concepts: ["liability", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT2.G1.I04",
                kind: "quiz",
                order: 4,
                title: "2008 Crisis Quiz",
                subtitle: "Test your understanding of the 2008 Great Financial Crisis.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L11.CT2.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "What does the 2008 financial crisis demonstrate about financial leverage?",
                    options: [
                      { id: "A", text: "High leverage turns ordinary market downturns into fatal bankruptcies by wiping out thin equity buffers." },
                      { id: "B", text: "Leverage is completely safe as long as banks approve it." },
                      { id: "C", text: "Borrowing money never carries any risk." }
                    ],
                    correct: "A",
                    explanation: "Leverage magnifies downside risk. In 2008, institutions borrowed 30x their capital, leaving zero margin for error.",
                    concepts: ["liability", "economic_recession"]
                  }
                ],
                concepts: ["economic_recession"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L11.CT2.G2",
            title: "How Economic Shocks Spread Across Countries",
            objective: "Trace global supply chain integration, commodity shocks, and cross-border contagion.",
            items: [
              {
                id: "L11.CT2.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Grain Ship Blockade",
                subtitle: "How a conflict thousands of miles away raises bread prices in Lagos.",
                scenario: {
                  narrative: "When the Black Sea shipping corridors were disrupted in 2022, global wheat shipments from Ukraine and Russia—which supply nearly 30% of global wheat exports—were halted. Global wheat prices jumped by 60% on the Chicago commodities exchange within weeks. In Nigeria, local flour millers had to pay double for imported grain, causing the price of a standard loaf of bread to surge from ₦400 to ₦900.",
                  characters: [
                    { name: "Lagos Bakeries", role: "Local Food Producers", details: "Confronting global wheat price spikes" },
                    { name: "Consumers", role: "Everyday Buyers", details: "Surprised by bread price hikes caused by a distant war" }
                  ],
                  data: [
                    { label: "Global Wheat Supply Disruption", value: "30% of Global Export Volume" },
                    { label: "Global Wheat Price Spike", value: "+60%" },
                    { label: "Local Bread Price Increase", value: "₦400 -> ₦900 (+125%)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why did a conflict in Eastern Europe directly raise the cost of breakfast in Nigeria?",
                    options: [
                      { id: "A", label: "Global trade integration: Nigeria imports wheat; global supply shocks immediately lift worldwide commodity prices." },
                      { id: "B", label: "Bakers decided to stop working." },
                      { id: "C", label: "Wheat is illegal to grow in Africa." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "The modern world is deeply interconnected through global supply chains. A shock in one part of the world—whether a war, a pandemic, a banking crisis, or a drought—transmits rapidly to domestic store shelves via international trade.",
                key_takeaway: "Global economic shocks transmit directly into domestic retail prices via international trade links.",
                concepts: ["economy", "inflation", "supply_and_demand"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT2.G2.I02",
                kind: "slide",
                order: 2,
                title: "Global Supply Chain Interconnection",
                subtitle: "The pathways of economic contagion.",
                body: [
                  {
                    type: "bullet_list",
                    items: [
                      "Commodity Shocks: Global oil, gas, fertilizer, and grain disruptions impact all importing nations.",
                      "Financial Contagion: When Wall Street banks stop lending, credit lines to developing markets freeze.",
                      "Currency Shockwaves: When the US Federal Reserve raises interest rates, capital flees emerging markets, triggering worldwide currency depreciation."
                    ]
                  }
                ],
                concepts: ["economy", "exchange_rate"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT2.G2.I03",
                kind: "widget",
                order: 3,
                title: "Contagion Pathway Tracker",
                subtitle: "Trace how a global event travels step by step to your personal bank account.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Global to Local Transmission Flow",
                  buckets: [
                    { id: "global", label: "Global Root Shock" },
                    { id: "domestic", label: "Domestic Retail Impact" }
                  ],
                  cards: [
                    { id: "c1", label: "Global shipping container shortages in Asian maritime ports", bucket: "global", feedback: "Global logistics bottlenecks originate at source manufacturing ports." },
                    { id: "c2", label: "Local supermarket charging 40% more for imported baby formula", bucket: "domestic", feedback: "End consumers absorb higher overseas freight costs." },
                    { id: "c3", label: "US Federal Reserve raising interest rates to 20-year highs", bucket: "global", feedback: "Major central bank policy triggers global capital realignments." },
                    { id: "c4", label: "Local bank loan interest rates climbing to 30%", bucket: "domestic", feedback: "Domestic banks raise rates to match global capital yields." }
                  ]
                },
                concepts: ["economy", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT2.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Global Contagion Quiz",
                subtitle: "Test your understanding of international economic linkages.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L11.CT2.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "Why can't an individual country completely isolate itself from global inflation if it imports food and energy?",
                    options: [
                      { id: "A", text: "Because it must purchase those commodities on international markets at prevailing world prices." },
                      { id: "B", text: "Because international law forbids having local prices." },
                      { id: "C", text: "Because foreign currencies are illegal to use." }
                    ],
                    correct: "A",
                    explanation: "Imported essentials link local retail prices directly to global commodity markets.",
                    concepts: ["economy", "inflation"]
                  }
                ],
                concepts: ["economy"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L11.CT2.G3",
            title: "How Crises Affect Jobs, Savings, and Households",
            objective: "Analyze real household defense strategies during deep economic downturns.",
            items: [
              {
                id: "L11.CT2.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Tale of Two Households in a Recession",
                subtitle: "How financial preparation separates resilience from ruin.",
                scenario: {
                  narrative: "When a deep economic recession hit in 2016, both Family Ade and Family Cole faced salary payment delays of four months. Family Ade had zero emergency savings and owed ₦150,000 on high-interest loan apps; they had to sell furniture at distress prices and pull children out of school. Family Cole had built a 6-month emergency fund in treasury bills and carried zero debt; they lived comfortably off their cash reserve until salaries resumed.",
                  characters: [
                    { name: "Family Ade", role: "Unprepared Household", details: "Zero savings, high debt; suffered severe distress" },
                    { name: "Family Cole", role: "Resilient Household", details: "6-month cash reserve, debt-free; weathered shock smoothly" }
                  ],
                  data: [
                    { label: "Salary Payment Delay", value: "4 Months (Both Families)" },
                    { label: "Family Ade Outcome", value: "Asset liquidation, emergency loans" },
                    { label: "Family Cole Outcome", value: "Zero disruption to living conditions" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What made the difference in how these two families survived the exact same crisis?",
                    options: [
                      { id: "A", label: "Family Cole built an emergency cash shield and eliminated consumer debt before the crisis struck." },
                      { id: "B", label: "Family Cole had political connections." },
                      { id: "C", label: "Family Ade was cursed." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Crises do not announce when they will arrive. The time to prepare for a roof leak is when the sun is shining. Building an emergency fund and living below your means is not boring conservatism—it is the difference between survival and ruin.",
                key_takeaway: "Financial resilience is built during the good times to protect you during the bad times.",
                concepts: ["financial_resilience", "emergency_fund"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT2.G3.I02",
                kind: "slide",
                order: 2,
                title: "The Pillars of Financial Resilience",
                subtitle: "The four shock absorbers of a secure life.",
                body: [
                  {
                    type: "numbered_list",
                    items: [
                      "An Emergency Fund: 3 to 6 months of non-negotiable living expenses in liquid cash.",
                      "Zero High-Interest Debt: Eliminating loan-app debt and credit cards so no creditors can threaten you.",
                      "Multiple Income Streams: Developing secondary freelance, consulting, or small trade skills.",
                      "Living Below Your Means: Maintaining a 20%+ monthly savings rate as an automatic habit."
                    ]
                  }
                ],
                concepts: ["financial_resilience", "emergency_fund", "saving"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT2.G3.I03",
                kind: "widget",
                order: 3,
                title: "Resilience Scorecard",
                subtitle: "Audit your household's financial defenses against a simulated 6-month recession.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Recession Readiness Audit",
                  buckets: [
                    { id: "resilient", label: "Strengthens Household Shield" },
                    { id: "fragile", label: "Creates Extreme Vulnerability" }
                  ],
                  cards: [
                    { id: "c1", label: "Having 6 months of basic living costs in liquid money market funds", bucket: "resilient", feedback: "Provides survival runway if employment is interrupted." },
                    { id: "c2", label: "Spending 100% of income with zero savings every month", bucket: "fragile", feedback: "One missed paycheck triggers immediate crisis." },
                    { id: "c3", label: "Holding zero consumer loans and zero credit app balances", bucket: "resilient", feedback: "No debt service obligations draining your monthly cash." },
                    { id: "c4", label: "Financing a luxury car on high-interest monthly instalments", bucket: "fragile", feedback: "Massive fixed monthly debt that cannot be paused." }
                  ]
                },
                concepts: ["financial_resilience", "emergency_fund"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT2.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Household Resilience Quiz",
                subtitle: "Assess your crisis management knowledge.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L11.CT2.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "What is the primary purpose of building financial resilience during economic expansion periods?",
                    options: [
                      { id: "A", text: "To guarantee that when unexpected job loss or economic downturns hit, your household survives without distress borrowing or panic asset sales." },
                      { id: "B", text: "To show off account balances to neighbors." },
                      { id: "C", text: "To avoid ever spending money on food." }
                    ],
                    correct: "A",
                    explanation: "Financial resilience ensures you control your destiny even when the external macro-economy turns hostile.",
                    concepts: ["financial_resilience", "emergency_fund"]
                  }
                ],
                concepts: ["financial_resilience"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L11.CT2.G4",
            title: "What Individuals and Institutions Can Learn",
            objective: "Synthesize Chapter 3: How the macro-economy shapes individual opportunities and how to thrive in any cycle.",
            items: [
              {
                id: "L11.CT2.G4.I01",
                kind: "case_study",
                order: 1,
                title: "The Crisis-Tested Investor",
                subtitle: "How seasoned investors view recessions as generational wealth opportunities.",
                scenario: {
                  narrative: "During the 2020 economic downturn, panic gripped the Nigerian stock market, and shares of blue-chip dividend-paying companies dropped by 45%. While frightened speculators sold at the bottom to hold cash, Zainab—who had preserved cash in high-yield reserves—stepped in and bought shares in leading banks and telecommunications firms at bargain valuations. Over the following four years, the economy recovered, and her investments gained 380% in capital appreciation and dividends.",
                  characters: [
                    { name: "Zainab", role: "Disciplined Value Investor", details: "Maintained cash buffer to purchase distressed productive assets" },
                    { name: "Panic Sellers", role: "Emotional Traders", details: "Sold sound assets at bottom out of fear" }
                  ],
                  data: [
                    { label: "Market Panic Discount", value: "-45% on Blue-Chip Equities" },
                    { label: "Zainab Entry Position", value: "₦2,000,000 Invested at Bottom" },
                    { label: "4-Year Portfolio Value", value: "₦9,600,000 (+380%)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why was Zainab able to capitalize on the crisis while others panicked?",
                    options: [
                      { id: "A", label: "She had no debt, maintained cash liquidity, and understood that market prices temporarily disconnect from true long-term value during panics." },
                      { id: "B", label: "She possessed insider political secrets." },
                      { id: "C", label: "The stock market promised to guarantee all profits." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Economic crises are painful, but they are also when generational fortunes are founded. Warren Buffett famously said: 'Be fearful when others are greedy, and greedy when others are fearful.' Those who enter a crisis with low debt and high cash reserves can acquire world-class assets at deep discounts.",
                key_takeaway: "Crises punish the unprepared and overleveraged, but reward the disciplined and patient.",
                concepts: ["financial_resilience", "asset", "compound_interest"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT2.G4.I02",
                kind: "slide",
                order: 2,
                title: "Chapter 3 Synthesis: Mastering Macroeconomics",
                subtitle: "Summary of Lessons 8, 9, 10, and 11.",
                body: [
                  {
                    type: "bullet_list",
                    items: [
                      "The Economy Is Circular: One person's spending is another person's income.",
                      "Supply & Demand Rule Markets: Prices communicate scarcity and clear shortages and surpluses.",
                      "Interest Rates Are the Cost of Time: Pay down toxic debt and harness compound growth early.",
                      "Economic Downturns Are Inevitable: Build an emergency fund of 3-6 months and avoid excessive leverage."
                    ]
                  }
                ],
                concepts: ["economy", "supply_and_demand", "interest_rate", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT2.G4.I03",
                kind: "widget",
                order: 3,
                title: "Macro-Economic Mastery Checklist",
                subtitle: "Review the key tenets of economic defense and opportunity.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Macroeconomic Master Checklist",
                  buckets: [
                    { id: "mastery", label: "Mastery Principle" },
                    { id: "myth", label: "Dangerous Economic Myth" }
                  ],
                  cards: [
                    { id: "c1", label: "Holding 3-6 months of basic living costs in liquid reserves before investing in high-risk ventures", bucket: "mastery", feedback: "Emergency liquidity prevents distress borrowing." },
                    { id: "c2", label: "Assuming economic booms will last forever and taking maximum loans at the top of the cycle", bucket: "myth", feedback: "Economic cycles always turn; overleveraged borrowers get wiped out." },
                    { id: "c3", label: "Investing in productive businesses whose returns beat inflation and interest rates", bucket: "mastery", feedback: "Real positive returns grow long-term wealth." },
                    { id: "c4", label: "Panicking and selling all long-term investments at the very bottom of a recession", bucket: "myth", feedback: "Locking in paper losses at the bottom destroys compounding." }
                  ]
                },
                concepts: ["economy", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L11.CT2.G4.I04",
                kind: "quiz",
                order: 4,
                title: "Chapter 3 Capstone Examination",
                subtitle: "Final comprehensive evaluation for Chapter 3 covering the economy, supply & demand, interest rates, and crises.",
                quiz_mode: "lesson_final",
                questions: [
                  {
                    id: "L11.CT2.G4.I04.Q1",
                    type: "single_choice",
                    prompt: "During an economic recession, why do consumer spending cuts in one sector often trigger job losses in completely unrelated businesses?",
                    options: [
                      { id: "A", text: "Because money circulates in a continuous flow; when workers in one industry lose income, their reduced spending shrinks revenues across the entire economy." },
                      { id: "B", text: "Because banks confiscate all cash during recessions." },
                      { id: "C", text: "Because businesses are forced by law to fire workers." }
                    ],
                    correct: "A",
                    explanation: "The circular flow model proves that one person's spending is another person's income.",
                    concepts: ["economy", "economic_recession"]
                  },
                  {
                    id: "L11.CT2.G4.I04.Q2",
                    type: "single_choice",
                    prompt: "Why is taking high-interest consumer debt (e.g. loan apps charging 30% monthly) especially lethal during economic crises?",
                    options: [
                      { id: "A", text: "Because if income drops, the crushing compounding interest multiplies the debt exponentially while you have zero cash to repay." },
                      { id: "B", text: "Because interest rates decrease during crises." },
                      { id: "C", text: "Because loan apps forgive all debt during recessions." }
                    ],
                    correct: "A",
                    explanation: "High-interest debt compounds ruthlessly against you when income is volatile or interrupted.",
                    concepts: ["interest_rate", "liability"]
                  },
                  {
                    id: "L11.CT2.G4.I04.Q3",
                    type: "true_false",
                    prompt: "True or False: An emergency fund covering 3 to 6 months of essential living expenses provides the liquidity needed to survive unexpected job loss without turning to toxic debt.",
                    correct: true,
                    explanation: "True! Emergency cash buffers are the foundation of all financial stability and resilience.",
                    concepts: ["emergency_fund", "financial_resilience"]
                  }
                ],
                concepts: ["economy", "economic_recession", "interest_rate", "emergency_fund"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  }
};

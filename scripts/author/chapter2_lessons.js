// scripts/author/chapter2_lessons.js
// Chapter 2: Why Your Money Buys Less
// Lessons: L04 (Understanding Purchasing Power), L05 (Inflation and Everyday Expenses), L06 (Nominal vs. Real Value), L07 (Currency & Exchange Rates)

module.exports = {
  // ==========================================
  // LESSON 4: UNDERSTANDING PURCHASING POWER
  // ==========================================
  L04: {
    id: "L04",
    number: 4,
    title: "Understanding Purchasing Power",
    subtitle: "Discover why the number of notes in your wallet matters less than the quantity of real goods and services those notes can buy.",
    difficulty: "Medium",
    contents: [
      {
        id: "L04.CT1",
        title: "How Much Can Your Money Really Buy?",
        objective: "Understand purchasing power, compare price levels across locations and time, and recognize why account balances can be misleading.",
        groups: [
          {
            id: "L04.CT1.G1",
            title: "Same Amount, Different Shopping Basket",
            objective: "Analyze how identical sums of currency yield vastly different amounts of real goods.",
            items: [
              {
                id: "L04.CT1.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The ₦5,000 Shopping Challenge",
                subtitle: "See how the real contents of a grocery basket change over time.",
                scenario: {
                  narrative: "Amina takes a ₦5,000 banknote to the neighborhood grocery store today. Five years ago, that same ₦5,000 bought 5kg of rice, a carton of eggs, 2 liters of vegetable oil, and fresh vegetables. Today, ₦5,000 barely covers a 2kg bag of rice and four eggs.",
                  characters: [
                    { name: "Amina", role: "Shopper", details: "Holding an identical ₦5,000 note across two time periods" }
                  ],
                  data: [
                    { label: "Nominal Budget", value: "₦5,000" },
                    { label: "2019 Basket Yield", value: "4 Full Grocery Items" },
                    { label: "Current Basket Yield", value: "1.5 Grocery Items" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What happened to Amina's money?",
                    options: [
                      { id: "A", label: "Her ₦5,000 note has lost purchasing power; prices rose while the face value remained unchanged." },
                      { id: "B", label: "The bank deducted funds from her physical cash." },
                      { id: "C", label: "Groceries suddenly became poisonous." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Amina's ₦5,000 banknote is still crisp and legally valid, but its economic weight—its purchasing power—has declined significantly. Money is ultimately worth what it can purchase.",
                key_takeaway: "Purchasing power measures the actual quantity of goods and services a unit of currency commands.",
                concepts: ["purchasing_power", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G1.I02",
                kind: "slide",
                order: 2,
                title: "Your Budget Is ₦5,000",
                subtitle: "Why the face value of money is only an illusion.",
                body: [
                  {
                    type: "paragraph",
                    text: "The number printed on a banknote is known as its 'nominal value'. A ₦5,000 note will always say '5,000'."
                  },
                  {
                    type: "paragraph",
                    text: "However, the true economic value of money is its 'purchasing power': how many loaves of bread, liters of fuel, or hours of bus transport that ₦5,000 can command."
                  },
                  {
                    type: "callout",
                    text: "Focusing solely on the number on your paycheck while ignoring prices is called the 'money illusion'."
                  }
                ],
                concepts: ["purchasing_power", "nominal_value"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G1.I03",
                kind: "slide",
                order: 3,
                title: "What Can You Buy Today?",
                subtitle: "Tracking the changing contents of consumer baskets.",
                body: [
                  {
                    type: "paragraph",
                    text: "To track purchasing power, economists create a hypothetical 'basket of consumer goods' containing food, transport fares, housing rent, and utilities."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "When prices rise across the basket, purchasing power drops.",
                      "When prices fall (rare in modern economies), purchasing power rises.",
                      "If your wages stay the same while prices double, your effective living standard is cut in half."
                    ]
                  }
                ],
                concepts: ["purchasing_power", "consumer_price_index"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G1.I04",
                kind: "slide",
                order: 4,
                title: "Compare Two Different Shopping Baskets",
                subtitle: "Historical comparison of staple food quantities.",
                body: [
                  {
                    type: "table",
                    columns: ["Item", "2018 Price", "Current Price", "Change in Power"],
                    rows: [
                      ["Bag of Rice (50kg)", "₦14,000", "₦85,000", "-83% Purchasing Power"],
                      ["Loaf of Sliced Bread", "₦350", "₦1,400", "-75% Purchasing Power"],
                      ["1 Liter Petrol", "₦145", "₦950", "-84% Purchasing Power"],
                      ["Bus Fare (Standard Route)", "₦200", "₦800", "-75% Purchasing Power"]
                    ]
                  },
                  {
                    type: "paragraph",
                    text: "Notice that while the currency notes look identical, what you bring home from the market has shrunk dramatically."
                  }
                ],
                concepts: ["purchasing_power", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G1.I05",
                kind: "widget",
                order: 5,
                title: "Build Your Shopping Basket",
                subtitle: "Allocate ₦5,000 across essential grocery items under current pricing.",
                widget_type: "allocation_basket",
                config: {
                  title: "₦5,000 Grocery Basket Builder",
                  budget: 5000,
                  items: [
                    { id: "bread", label: "Loaf of Bread", cost: 1200, category: "staple" },
                    { id: "eggs", label: "Half-Dozen Eggs", cost: 1400, category: "protein" },
                    { id: "milk", label: "Tin of Evaporated Milk", cost: 750, category: "dairy" },
                    { id: "beans", label: "1kg White Beans", cost: 1650, category: "protein" },
                    { id: "fruit", label: "Fresh Oranges (Bag)", cost: 900, category: "fruit" }
                  ]
                },
                concepts: ["purchasing_power", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G1.I06",
                kind: "quiz",
                order: 6,
                title: "What Can Your Money Buy?",
                subtitle: "Assess your understanding of purchasing power vs nominal amounts.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L04.CT1.G1.I06.Q1",
                    type: "single_choice",
                    prompt: "If you have ₦10,000 today and prices of all goods and services double tomorrow, what happens to your purchasing power?",
                    options: [
                      { id: "A", text: "Your purchasing power is reduced by half; you can only buy 50% of what you bought before." },
                      { id: "B", text: "Your purchasing power doubles because prices are higher." },
                      { id: "C", text: "Your purchasing power remains identical because you still hold ₦10,000." }
                    ],
                    correct: "A",
                    explanation: "When prices double, each unit of currency buys exactly half as much as before.",
                    concepts: ["purchasing_power"]
                  }
                ],
                concepts: ["purchasing_power"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L04.CT1.G2",
            title: "Comparing What Your Money Can Buy",
            objective: "Examine spatial differences in purchasing power across cities, rural regions, and international borders.",
            items: [
              {
                id: "L04.CT1.G2.I01",
                kind: "slide",
                order: 1,
                title: "Same Money, Different Prices Across Towns",
                subtitle: "Why ₦200,000 in a rural town feels different from ₦200,000 in a major metropolis.",
                body: [
                  {
                    type: "paragraph",
                    text: "Purchasing power is not uniform across geography. A monthly salary of ₦200,000 will provide a comfortable three-bedroom apartment, fresh food, and transport in a quiet rural town."
                  },
                  {
                    type: "paragraph",
                    text: "In a densely populated metropolis like Lagos or Abuja, that exact same ₦200,000 might barely cover a single room and daily transport commuting costs."
                  }
                ],
                concepts: ["purchasing_power", "price_comparison"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G2.I02",
                kind: "slide",
                order: 2,
                title: "Comparing Prices Across Locations",
                subtitle: "The concept of regional purchasing power parity.",
                body: [
                  {
                    type: "paragraph",
                    text: "When evaluating job offers in different locations, intelligent earners calculate the 'cost of living' rather than comparing raw salary figures."
                  },
                  {
                    type: "example",
                    text: "Earning ₦300,000 in a city where basic monthly living costs are ₦280,000 leaves you with ₦20,000. Earning ₦200,000 where living costs are ₦120,000 leaves you with ₦80,000 to save and invest."
                  }
                ],
                concepts: ["purchasing_power", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G2.I03",
                kind: "slide",
                order: 3,
                title: "Comparing Prices Across Time",
                subtitle: "How time steadily drains the purchasing power of dormant cash.",
                body: [
                  {
                    type: "paragraph",
                    text: "Leaving cash locked in a safe or under a mattress is not 'risk-free'. While the cash will never be stolen, its purchasing power silently and guaranteed evaporates."
                  },
                  {
                    type: "callout",
                    text: "Inflation is the invisible thief that steals value from uninvested cash."
                  }
                ],
                concepts: ["purchasing_power", "store_of_value"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G2.I04",
                kind: "case_study",
                order: 4,
                title: "The Student Shopping in Two Markets",
                subtitle: "Observe price arbitrage between central city supermarkets and wholesale bulk markets.",
                scenario: {
                  narrative: "Zainab is a student on a tight monthly food budget of ₦30,000. If she buys small packaged groceries at the convenience store right outside her university gate, her ₦30,000 lasts only 16 days. If she travels on a ₦500 bus to the central wholesale grain depot and buys in bulk with roommates, her ₦30,000 provides food for 32 days.",
                  characters: [
                    { name: "Zainab", role: "University Student", details: "Has ₦30,000 monthly food allowance" }
                  ],
                  data: [
                    { label: "Campus Retail Longevity", value: "16 Days" },
                    { label: "Wholesale Market Longevity", value: "32 Days" },
                    { label: "Transport Overhead", value: "₦500" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What economic action did Zainab take to protect her purchasing power?",
                    options: [
                      { id: "A", label: "She reduced retail markups by purchasing at wholesale price points, doubling her effective food volume." },
                      { id: "B", label: "She begged the shopkeeper for discounts." },
                      { id: "C", label: "She stopped eating meals." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Purchasing power can be maximized by smart procurement habits. Convenience stores charge heavy premiums for location and packaging; bulk purchasing directly enhances your real basket size.",
                key_takeaway: "Where and how you buy goods directly expands or contracts your purchasing power.",
                concepts: ["purchasing_power", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G2.I05",
                kind: "slide",
                order: 5,
                title: "Market A vs. Market B Analysis",
                subtitle: "Breakdown of unit pricing vs convenience costs.",
                body: [
                  {
                    type: "table",
                    columns: ["Market Outlet", "Price per kg Rice", "Price per Liter Oil", "Effective Monthly Cost"],
                    rows: [
                      ["Campus Mini-Mart", "₦2,200", "₦2,500", "₦45,000"],
                      ["Central Wholesale Depot", "₦1,400", "₦1,800", "₦28,000"],
                      ["Monthly Savings", "₦800 / kg", "₦700 / L", "₦17,000 Retained"]
                    ]
                  }
                ],
                concepts: ["price_comparison", "purchasing_power"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G2.I06",
                kind: "slide",
                order: 6,
                title: "Which Basket Gives Better Value?",
                subtitle: "Calculating cost-per-unit to identify the true deal.",
                body: [
                  {
                    type: "paragraph",
                    text: "Marketers often disguise price increases by shrinking packaging while keeping the price tag identical (known as 'shrinkflation')."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "A biscuit manufacturer reduces packet weight from 100g to 75g but keeps the price at ₦200.",
                      "The nominal price did not rise, but your purchasing power dropped by 25%.",
                      "Always calculate the price per gram or price per liter to detect hidden price hikes."
                    ]
                  }
                ],
                concepts: ["purchasing_power", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G2.I07",
                kind: "widget",
                order: 7,
                title: "Compare Wholesale vs. Retail Baskets",
                subtitle: "See how smart shopping choices preserve student food reserves.",
                widget_type: "option_comparison",
                config: {
                  title: "Retail Convenience vs. Wholesale Group Buying",
                  option_a: {
                    name: "Campus Convenience Store",
                    attributes: {
                      "Travel Effort": "Zero (at gate)",
                      "Rice 10kg Total": "₦22,000",
                      "Cooking Oil 5L": "₦12,500",
                      "Monthly Food Runway": "18 Days"
                    }
                  },
                  option_b: {
                    name: "Wholesale Market Depot",
                    attributes: {
                      "Travel Effort": "30-min bus trip (₦1,000 fare)",
                      "Rice 10kg Total": "₦14,000",
                      "Cooking Oil 5L": "₦9,000",
                      "Monthly Food Runway": "32 Days (Surplus Created)"
                    }
                  }
                },
                concepts: ["purchasing_power", "price_comparison"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G2.I08",
                kind: "quiz",
                order: 8,
                title: "Which Option Has Greater Purchasing Power?",
                subtitle: "Test your ability to spot true value across retail offerings.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L04.CT1.G2.I08.Q1",
                    type: "single_choice",
                    prompt: "A detergent brand keeps its price at ₦1,000, but quietly shrinks the package from 500g down to 400g. What has occurred?",
                    options: [
                      { id: "A", text: "Shrinkflation: the price per gram increased by 25%, eroding the consumer's purchasing power." },
                      { id: "B", text: "The consumer received a 20% free discount." },
                      { id: "C", text: "The purchasing power remained completely unchanged." }
                    ],
                    correct: "A",
                    explanation: "Shrinkflation is a subtle form of inflation where the quantity or quality decreases while nominal price remains unchanged.",
                    concepts: ["purchasing_power", "inflation"]
                  }
                ],
                concepts: ["purchasing_power"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L04.CT1.G3",
            title: "Why the Number in Your Account Is Not the Whole Story",
            objective: "Recognize that nominal savings balances lose real value unless invested to beat inflation.",
            items: [
              {
                id: "L04.CT1.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Money That Stayed the Same",
                subtitle: "The cautionary tale of cash sitting idle in a zero-interest account.",
                scenario: {
                  narrative: "In 2020, Ken kept ₦1,000,000 cash in a safe at home to fund a professional certification course that cost exactly ₦1,000,000. He opened the safe in 2024. The ₦1,000,000 was still there down to the last note. But when he went to register, the certification course tuition had risen to ₦2,800,000 due to currency depreciation and operational inflation.",
                  characters: [
                    { name: "Ken", role: "Saver", details: "Saved ₦1,000,000 in physical cash for 4 years" }
                  ],
                  data: [
                    { label: "Nominal Cash in Safe", value: "₦1,000,000" },
                    { label: "2020 Course Tuition", value: "₦1,000,000 (100% Covered)" },
                    { label: "2024 Course Tuition", value: "₦2,800,000 (35% Covered)" },
                    { label: "Purchasing Power Loss", value: "-64%" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Did Ken lose money?",
                    options: [
                      { id: "A", label: "In nominal terms, no (he still had ₦1M). In real terms, yes (he lost nearly two-thirds of his purchasing power)." },
                      { id: "B", label: "No, he has the exact same wealth as in 2020." },
                      { id: "C", label: "He became richer because ₦1M is a large number." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Ken fell victim to the money illusion. Cash that does not generate a return equal to or exceeding the rate of inflation suffers a continuous, irreversible decline in purchasing power.",
                key_takeaway: "Idle cash loses purchasing power every single day inflation is positive.",
                concepts: ["purchasing_power", "nominal_value", "real_value"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G3.I02",
                kind: "slide",
                order: 2,
                title: "You Still Have ₦20,000",
                subtitle: "The psychological comfort of unchanging numbers.",
                body: [
                  {
                    type: "paragraph",
                    text: "When you check your mobile banking app and see ₦20,000, your brain feels a sense of security because the number has not decreased."
                  },
                  {
                    type: "paragraph",
                    text: "However, if the prices of fuel, rice, electricity, and mobile data around you jumped by 30% this year, your ₦20,000 behaves like ₦15,380 did last year."
                  }
                ],
                concepts: ["purchasing_power", "nominal_value"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G3.I03",
                kind: "slide",
                order: 3,
                title: "The Cost of Things You Need Has Risen",
                subtitle: "Tracking real living expenses.",
                body: [
                  {
                    type: "paragraph",
                    text: "When daily necessities become more expensive, your financial runway shrinks:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "An emergency fund that could cover 6 months of living expenses in 2021 might only cover 2.5 months today.",
                      "Emergency funds must be periodically adjusted upward as inflation increases monthly baseline expenses."
                    ]
                  }
                ],
                concepts: ["emergency_fund", "purchasing_power"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G3.I04",
                kind: "slide",
                order: 4,
                title: "Has Your Financial Position Changed?",
                subtitle: "Auditing your true financial standing.",
                body: [
                  {
                    type: "paragraph",
                    text: "To know if you are making financial progress, compare your income growth against the national inflation rate:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Salary up 10%, Inflation at 25%: You are getting poorer in real terms.",
                      "Salary up 25%, Inflation at 25%: You are treading water (break-even).",
                      "Salary up 35%, Inflation at 25%: You are genuinely improving your real living standards."
                    ]
                  }
                ],
                concepts: ["real_value", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G3.I05",
                kind: "slide",
                order: 5,
                title: "Money Balance vs. Purchasing Power",
                subtitle: "The definitive distinction between units and utility.",
                body: [
                  {
                    type: "paragraph",
                    text: "Always remember: Money is a claim check on real human labor, goods, and resources."
                  },
                  {
                    type: "callout",
                    text: "Wealth is not measured by the quantity of paper notes you hoard, but by the quantity and quality of real life your resources can purchase."
                  }
                ],
                concepts: ["purchasing_power", "money_vs_wealth"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G3.I06",
                kind: "slide",
                order: 6,
                title: "Why the Amount Alone Can Mislead You",
                subtitle: "Avoiding the common trap of nominal bias.",
                body: [
                  {
                    type: "paragraph",
                    text: "In historical periods of hyperinflation, citizens held billions of currency units in their bank accounts and were still on the brink of starvation."
                  },
                  {
                    type: "paragraph",
                    text: "Never judge your wealth by the length of the number in your account. Judge it by your net worth, your cash-flow buffer, and your purchasing power."
                  }
                ],
                concepts: ["nominal_value", "hyperinflation"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G3.I07",
                kind: "widget",
                order: 7,
                title: "Track Your Purchasing Power",
                subtitle: "Simulate how inflation reduces the purchasing power of cash over 1, 3, and 5 years.",
                widget_type: "inflation_calculator",
                config: {
                  title: "Purchasing Power Decay Simulator",
                  initial_amount: 100000,
                  default_inflation_rate: 22,
                  time_horizons: [1, 3, 5]
                },
                concepts: ["inflation", "purchasing_power"],
                authoring_status: "authored"
              },
              {
                id: "L04.CT1.G3.I08",
                kind: "quiz",
                order: 8,
                title: "Same Balance, Different Value",
                subtitle: "Final quiz for Lesson 4 testing comprehension of purchasing power.",
                quiz_mode: "lesson_final",
                questions: [
                  {
                    id: "L04.CT1.G3.I08.Q1",
                    type: "single_choice",
                    prompt: "If your savings account earns 4% annual interest while the national inflation rate is 24%, what is happening to the real purchasing power of your savings?",
                    options: [
                      { id: "A", text: "You are losing approximately 20% in real purchasing power each year." },
                      { id: "B", text: "You are gaining 4% in wealth every year." },
                      { id: "C", text: "Your purchasing power stays completely flat." }
                    ],
                    correct: "A",
                    explanation: "Real return = Nominal interest (4%) - Inflation rate (24%) = -20%. Your money grows numerically, but buys 20% less real goods each year.",
                    concepts: ["real_value", "inflation", "purchasing_power"]
                  }
                ],
                concepts: ["purchasing_power", "real_value"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // LESSON 5: INFLATION AND YOUR EVERYDAY EXPENSES
  // ==========================================
  L05: {
    id: "L05",
    number: 5,
    title: "Inflation and Your Everyday Expenses",
    subtitle: "Understand the economic mechanics of inflation, who wins, who loses, and how to defend your personal budget.",
    difficulty: "High",
    contents: [
      {
        id: "L05.CT1",
        title: "Why Everything Seems to Be Getting More Expensive",
        objective: "Analyze what inflation is, how it is measured using consumer baskets, and its primary economic causes.",
        groups: [
          {
            id: "L05.CT1.G1",
            title: "The Cost of Your Everyday Basket",
            objective: "Explore how price hikes on food, fuel, and transport accumulate into broad headline inflation.",
            items: [
              {
                id: "L05.CT1.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The Rising Morning Commute",
                subtitle: "How transportation fuel price hikes ripple across every consumer category.",
                scenario: {
                  narrative: "Chidi takes a minibus to work each morning in Ibadan. When the pump price of petrol increases from ₦600 to ₦900 per liter, the commercial bus drivers immediately raise the fare from ₦300 to ₦500. Two days later, food sellers at the local market raise the price of a plate of rice by ₦400, explaining that the cost of transporting food from farm settlements has jumped.",
                  characters: [
                    { name: "Chidi", role: "Daily Commuter", details: "Spends additional ₦8,000 monthly on transport" },
                    { name: "Bus Operators", role: "Transporters", details: "Passing on higher fuel operating costs" }
                  ],
                  data: [
                    { label: "Petrol Pump Price", value: "₦600 -> ₦900 (+50%)" },
                    { label: "Daily Bus Fare", value: "₦300 -> ₦500 (+66%)" },
                    { label: "Monthly Budget Impact", value: "+₦8,800" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What economic mechanism is demonstrated by this ripple effect?",
                    options: [
                      { id: "A", label: "Cost-push inflation: rising key input costs (energy/transport) force businesses to raise end-consumer prices." },
                      { id: "B", label: "Consumers suddenly having too much spare cash." },
                      { id: "C", label: "Bus drivers reducing their daily working hours." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Energy and transport are universal inputs in modern economics. When the price of moving goods and workers increases, virtually every product on retail shelves must follow suit to cover operating costs.",
                key_takeaway: "Cost-push inflation occurs when production and transportation costs rise across an economy.",
                concepts: ["inflation", "consumer_price_index"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT1.G1.I02",
                kind: "slide",
                order: 2,
                title: "What Is Headline Inflation?",
                subtitle: "Measuring the general rise in overall consumer prices.",
                body: [
                  {
                    type: "definition",
                    term: "Inflation",
                    text: "A broad, continuous increase in the overall price level of goods and services across an entire economy over an extended period."
                  },
                  {
                    type: "paragraph",
                    text: "Inflation does not mean one single item got expensive because of bad weather. It means almost everything—food, rent, haircuts, school supplies, and electricity—costs more currency than it did twelve months ago."
                  }
                ],
                concepts: ["inflation", "consumer_price_index"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT1.G1.I03",
                kind: "widget",
                order: 3,
                title: "Calculate Personal Basket Inflation",
                subtitle: "See how changes in essential expense items impact your monthly total.",
                widget_type: "inflation_calculator",
                config: {
                  title: "Personal Inflation Tracker",
                  initial_amount: 150000,
                  default_inflation_rate: 28,
                  time_horizons: [1, 2, 3]
                },
                concepts: ["inflation", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT1.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Identify Causes of Price Hikes",
                subtitle: "Distinguish general inflation from individual product price adjustments.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L05.CT1.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "Which scenario represents broad economic inflation rather than a temporary single-product price fluctuation?",
                    options: [
                      { id: "A", text: "Across twelve months, average prices of food, housing, electricity, transport, and healthcare all rise by 25%." },
                      { id: "B", text: "Watermelon prices double in December because it is out of season, while other prices remain flat." },
                      { id: "C", text: "A single shoe store holds a clearance sale." }
                    ],
                    correct: "A",
                    explanation: "Inflation is a systemic, economy-wide rise in the general price level across a broad basket of goods and services.",
                    concepts: ["inflation"]
                  }
                ],
                concepts: ["inflation"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L05.CT1.G2",
            title: "What Inflation Actually Means",
            objective: "Distinguish demand-pull inflation from cost-push inflation and monetary expansion.",
            items: [
              {
                id: "L05.CT1.G2.I01",
                kind: "case_study",
                order: 1,
                title: "Too Much Money Chasing Too Few Goods",
                subtitle: "The classic driver of demand-pull inflation.",
                scenario: {
                  narrative: "In a mining town, a new lithium deposit brings thousands of well-paid engineers. The town only has two small bakeries producing 300 loaves of bread daily. With high disposable salaries, the newcomers eagerly bid up the price of bread from ₦800 to ₦2,200 per loaf. The bakeries cannot expand their ovens quickly enough to satisfy the surge.",
                  characters: [
                    { name: "Engineers", role: "High-income Influx", details: "Willing to pay premium prices for limited daily staples" },
                    { name: "Local Townspeople", role: "Original Residents", details: "Priced out of bread by sudden demand surge" }
                  ],
                  data: [
                    { label: "Daily Bread Supply", value: "300 Loaves (Fixed)" },
                    { label: "Original Bread Price", value: "₦800" },
                    { label: "Surge Equilibrium Price", value: "₦2,200 (+175%)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What economic force drove bread prices up in this town?",
                    options: [
                      { id: "A", label: "Demand-pull inflation: consumer demand surged far faster than production could expand." },
                      { id: "B", label: "Flour was banned by the government." },
                      { id: "C", label: "The bakery reduced prices to attract customers." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Demand-pull inflation happens when aggregate spending power expands faster than the productive supply of goods. Buyers compete against one another by offering higher prices.",
                key_takeaway: "When demand expands faster than supply can respond, prices rise.",
                concepts: ["supply_and_demand", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT1.G2.I02",
                kind: "slide",
                order: 2,
                title: "The Two Main Engines of Inflation",
                subtitle: "Demand-pull vs. Cost-push inflation.",
                body: [
                  {
                    type: "bullet_list",
                    items: [
                      "Demand-Pull Inflation: Occurs when strong consumer spending and easy credit create high demand that outstrips factory and agricultural production.",
                      "Cost-Push Inflation: Occurs when the costs of raw materials, energy, imported components, or wages surge, forcing producers to raise prices to avoid bankruptcy."
                    ]
                  },
                  {
                    type: "paragraph",
                    text: "In developing nations with high import reliance, currency depreciation often triggers severe cost-push inflation on food and manufactured goods."
                  }
                ],
                concepts: ["inflation", "supply_and_demand"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT1.G2.I03",
                kind: "widget",
                order: 3,
                title: "Classify Inflation Drivers",
                subtitle: "Sort real-world economic events into Demand-Pull or Cost-Push causes.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Inflation Type Sorter",
                  buckets: [
                    { id: "demand", label: "Demand-Pull (Excess Spending)" },
                    { id: "cost", label: "Cost-Push (Rising Production Costs)" }
                  ],
                  cards: [
                    { id: "c1", label: "Global oil price shocks doubling transport and fertilizer costs", bucket: "cost", feedback: "Input cost spikes cause cost-push inflation." },
                    { id: "c2", label: "Massive government stimulus checks handed out during factory lockdowns", bucket: "demand", feedback: "More money chasing restricted goods causes demand-pull inflation." },
                    { id: "c3", label: "Severe drought destroying 40% of the national grain harvest", bucket: "cost", feedback: "Supply contraction raises costs of food production." },
                    { id: "c4", label: "Low interest rates triggering a massive housing borrowing boom", bucket: "demand", feedback: "Surging buyer credit bids up home prices." }
                  ]
                },
                concepts: ["inflation"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT1.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Checking Inflation Concepts",
                subtitle: "Test your understanding of inflation types.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L05.CT1.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "When international shipping freight rates triple and diesel fuel prices double, causing retail shoe prices to jump, what type of inflation is occurring?",
                    options: [
                      { id: "A", text: "Cost-push inflation" },
                      { id: "B", text: "Demand-pull inflation" },
                      { id: "C", text: "Deflation" }
                    ],
                    correct: "A",
                    explanation: "Increases in transport and energy operating costs push up final retail prices.",
                    concepts: ["inflation"]
                  }
                ],
                concepts: ["inflation"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L05.CT1.G3",
            title: "How Rising Prices Affect Different People",
            objective: "Analyze why inflation acts as a regressive tax on low-income earners while benefiting asset owners.",
            items: [
              {
                id: "L05.CT1.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Pensioner vs. The Property Owner",
                subtitle: "How inflation creates stark winners and losers in society.",
                scenario: {
                  narrative: "Elder Paul retired on a fixed government pension of ₦80,000 per month that has not changed in six years. During that time, national food and medicine prices tripled. Meanwhile, Halima owns three commercial retail rental buildings. She raises rents by 25% each year in line with inflation, preserving her living standard effortlessly.",
                  characters: [
                    { name: "Elder Paul", role: "Fixed Pensioner", details: "Monthly income fixed at ₦80,000" },
                    { name: "Halima", role: "Real Estate Owner", details: "Can adjust rents annually with market inflation" }
                  ],
                  data: [
                    { label: "Paul Monthly Income (2018)", value: "₦80,000 (Comfortable)" },
                    { label: "Paul Monthly Income (2024)", value: "₦80,000 (Impoverished)" },
                    { label: "Halima Annual Rental Inflow", value: "Scaled from ₦3M to ₦9M" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why was Elder Paul severely damaged by inflation while Halima prospered?",
                    options: [
                      { id: "A", label: "Paul's income was nominally fixed, while Halima owns real assets whose cash flows adjust with inflation." },
                      { id: "B", label: "Paul spent all his money on luxury watches." },
                      { id: "C", label: "Commercial buildings are immune to maintenance costs." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Inflation is deeply unequal. People on fixed salaries, pensions, or uninvested cash bear the brunt of rising prices. Owners of real, productive assets (real estate, profitable businesses, commodities) pass on higher costs and protect their wealth.",
                key_takeaway: "Fixed-income earners are the biggest casualties of sustained high inflation.",
                concepts: ["inflation", "purchasing_power", "asset"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT1.G3.I02",
                kind: "slide",
                order: 2,
                title: "Inflation Is an Invisible Regressive Tax",
                subtitle: "Why low-income households suffer the highest percentage burden.",
                body: [
                  {
                    type: "paragraph",
                    text: "Lower-income households spend 60% to 80% of their total income purely on food, energy, and transportation—the exact categories where inflation strikes fastest."
                  },
                  {
                    type: "paragraph",
                    text: "Wealthier households spend only 15% to 25% of income on basic sustenance, investing the remainder in assets that appreciate alongside inflation."
                  }
                ],
                concepts: ["inflation", "purchasing_power"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT1.G3.I03",
                kind: "widget",
                order: 3,
                title: "Compare Budget Impact Across Incomes",
                subtitle: "Simulate a 30% food price hike on low vs high earners.",
                widget_type: "option_comparison",
                config: {
                  title: "Impact of 30% Food Inflation",
                  option_a: {
                    name: "Low-Income Household (₦70,000 Salary)",
                    attributes: {
                      "Initial Food Cost": "₦45,000 (64% of income)",
                      "Post-Inflation Food Cost": "₦58,500 (83% of income)",
                      "Remaining for Healthcare/Rent": "₦11,500 (Emergency crisis)",
                      "Living Standard Change": "Severe nutritional cutbacks"
                    }
                  },
                  option_b: {
                    name: "High-Income Household (₦900,000 Salary)",
                    attributes: {
                      "Initial Food Cost": "₦120,000 (13% of income)",
                      "Post-Inflation Food Cost": "₦156,000 (17% of income)",
                      "Remaining for Investments": "₦744,000 (Fully resilient)",
                      "Living Standard Change": "Zero impact on daily diet"
                    }
                  }
                },
                concepts: ["inflation", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT1.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Who Wins and Loses in Inflation?",
                subtitle: "Assess your understanding of the distributional consequences of inflation.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L05.CT1.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "Who generally benefits the most when an economy experiences unexpectedly high inflation?",
                    options: [
                      { id: "A", text: "Fixed-rate borrowers, because they repay their existing debts with depreciated, less valuable currency." },
                      { id: "B", text: "Retirees living on fixed cash pensions." },
                      { id: "C", text: "People holding uninvested cash in checking accounts." }
                    ],
                    correct: "A",
                    explanation: "Borrowers with fixed interest rates win during inflation because the real value of the debt they owe shrinks relative to prices.",
                    concepts: ["inflation", "liability"]
                  }
                ],
                concepts: ["inflation"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L05.CT2.G1",
            title: "Your Transport Fare, Food, and Rent",
            objective: "Analyze practical personal budget strategies to weather persistent inflationary pressure.",
            items: [
              {
                id: "L05.CT2.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The Annual Rent Renewal Surprise",
                subtitle: "How housing landlords adjust rents to catch up with general price levels.",
                scenario: {
                  narrative: "Sola rents a two-bedroom flat in Surulere for ₦1,200,000 per year. Upon lease renewal, the landlord issues a letter increasing the rent to ₦1,800,000 (+50%). The landlord explains that building repair materials (cement, plumbing, paint) have surged by 80%, and his own family living expenses have skyrocketed.",
                  characters: [
                    { name: "Sola", role: "Tenant", details: "Salary increased by only 10% this year" },
                    { name: "Landlord", role: "Property Owner", details: "Adjusting rent to match citywide replacement costs" }
                  ],
                  data: [
                    { label: "Previous Annual Rent", value: "₦1,200,000" },
                    { label: "New Renewal Rent", value: "₦1,800,000 (+₦600k)" },
                    { label: "Sola Salary Increase", value: "+₦180,000 / Year" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What financial gap is Sola facing?",
                    options: [
                      { id: "A", label: "A ₦420,000 annual deficit between her rent increase and her modest salary raise." },
                      { id: "B", label: "A massive budget surplus." },
                      { id: "C", label: "Free accommodation." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Rent is often a delayed inflation trigger. While food and fuel prices rise weekly, rents typically jump abruptly upon annual lease renewal, causing severe financial shock if tenants do not plan ahead.",
                key_takeaway: "Essential annual expenses like rent adjust in large step-functions during inflationary cycles.",
                concepts: ["inflation", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT2.G1.I02",
                kind: "slide",
                order: 2,
                title: "Navigating Step-Function Price Hikes",
                subtitle: "Why proactive emergency reserves prevent housing dislocation.",
                body: [
                  {
                    type: "paragraph",
                    text: "Because rent, school fees, and vehicle insurance adjust once every year or term, households often feel falsely comfortable during the months in between."
                  },
                  {
                    type: "callout",
                    text: "Rule of Thumb: When inflation is above 20%, anticipate that all annual contracts will increase by at least 25% to 40% upon renewal."
                  }
                ],
                concepts: ["inflation", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT2.G1.I03",
                kind: "widget",
                order: 3,
                title: "Monthly Budget Re-balancer",
                subtitle: "Adjust discretionary categories to absorb a 40% hike in rent and transport.",
                widget_type: "budget_prioritizer",
                config: {
                  title: "Inflation Response Budget Planner",
                  monthly_income: 300000,
                  categories: [
                    { name: "Increased Rent & Maintenance", amount: 150000, locked: true },
                    { name: "Increased Food & Transport", amount: 95000, locked: true },
                    { name: "Dining Out & Entertainment", amount: 25000, flexible: true },
                    { name: "Fashion & Non-essential Gadgets", amount: 20000, flexible: true },
                    { name: "Monthly Emergency Savings", amount: 10000, flexible: true }
                  ]
                },
                concepts: ["budget", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT2.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Budget Defenses Against Inflation",
                subtitle: "Select the most effective defensive actions.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L05.CT2.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "What is the best immediate personal financial defense when essential non-negotiable living costs jump by 30%?",
                    options: [
                      { id: "A", text: "Audit discretionary spending, trim non-essential luxuries, and seek ways to expand earned income." },
                      { id: "B", text: "Take high-interest quick loans to maintain previous luxury spending habits." },
                      { id: "C", text: "Ignore your bank balances completely." }
                    ],
                    correct: "A",
                    explanation: "Defending against inflation requires cutting discretionary waste and aggressively boosting income power.",
                    concepts: ["budget", "inflation"]
                  }
                ],
                concepts: ["budget"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L05.CT2.G2",
            title: "When Your Income Cannot Keep Up",
            objective: "Understand wage-price lag and explore actionable strategies for boosting earning power.",
            items: [
              {
                id: "L05.CT2.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Wage-Lag Reality",
                subtitle: "Why salaries rarely rise as quickly as market grocery shelves.",
                scenario: {
                  narrative: "Gbenga is a customer service representative earning ₦120,000 per month. Over the past 18 months, consumer prices rose by 45%. His employer faces high utility bills and freight costs, and informs staff that salary reviews can only happen after annual profitability audits.",
                  characters: [
                    { name: "Gbenga", role: "Customer Service Agent", details: "Experiencing a 45% reduction in real purchasing power" }
                  ],
                  data: [
                    { label: "Nominal Salary", value: "₦120,000 (Flat)" },
                    { label: "Price Level Change", value: "+45%" },
                    { label: "Real Purchasing Power", value: "₦82,750 Equivalent" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What economic reality is Gbenga experiencing?",
                    options: [
                      { id: "A", label: "Wage lag: wages are sticky and adjust much slower than consumer market prices." },
                      { id: "B", label: "His salary was automatically converted to foreign currency." },
                      { id: "C", label: "The employer reduced his hours by 50%." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Economists describe wages as 'sticky downwards and slow to rise'. Prices in markets update in seconds, but employment contracts often take months or years to renegotiate. Developing freelance side skills or scalable business offerings provides faster pricing flexibility.",
                key_takeaway: "Wages usually lag inflation. Relying on a single rigid salary during high inflation is risky.",
                concepts: ["inflation", "earned_income"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT2.G2.I02",
                kind: "slide",
                order: 2,
                title: "Combating Wage Lag with High-Value Skills",
                subtitle: "How to regain pricing power as an individual.",
                body: [
                  {
                    type: "paragraph",
                    text: "To protect yourself against wage lag, you need personal pricing power:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Develop specialized in-demand skills (technology, healthcare, specialized technical repairs).",
                      "Build secondary freelance or consulting income channels.",
                      "Seek remote international work or clients who pay in stable foreign currencies."
                    ]
                  }
                ],
                concepts: ["earned_income", "specialisation"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT2.G2.I03",
                kind: "widget",
                order: 3,
                title: "Explore Side Income Possibilities",
                subtitle: "Evaluate secondary income channels based on launch speed and earning potential.",
                widget_type: "option_comparison",
                config: {
                  title: "Inflation Defense Income Options",
                  option_a: {
                    name: "Freelance Technical Skill (e.g. Copywriting, Web, Video)",
                    attributes: {
                      "Upfront Capital": "Low (requires laptop/internet)",
                      "Pricing Flexibility": "High (can increase client rates with inflation)",
                      "Global Market Access": "Yes (can earn USD, GBP, or EUR)"
                    }
                  },
                  option_b: {
                    name: "Passive Fixed Savings Account",
                    attributes: {
                      "Upfront Capital": "Requires large liquid cash lump sum",
                      "Pricing Flexibility": "Zero (fixed bank interest rate)",
                      "Global Market Access": "No (bound to local currency inflation)"
                    }
                  }
                },
                concepts: ["earned_income", "passive_income"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT2.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Wage Lag Assessment",
                subtitle: "Test your comprehension of wage adjustment dynamics.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L05.CT2.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "Why does high inflation often cause labor strikes and salary disputes across an economy?",
                    options: [
                      { id: "A", text: "Because living costs surge immediately, while worker salaries remain locked under older contractual agreements." },
                      { id: "B", text: "Because workers dislike receiving currency." },
                      { id: "C", text: "Because inflation automatically cancels all employment contracts." }
                    ],
                    correct: "A",
                    explanation: "When price hikes erode living standards, workers demand immediate compensatory raises, leading to tension when businesses cannot instantly afford higher payrolls.",
                    concepts: ["inflation", "earned_income"]
                  }
                ],
                concepts: ["inflation"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L05.CT2.G3",
            title: "Who Gains and Who Loses When Prices Rise",
            objective: "Synthesize the complete macroeconomic picture of inflation winners, losers, and wealth protection.",
            items: [
              {
                id: "L05.CT2.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Borrower vs. The Bank Depositor",
                subtitle: "A five-year case analysis of fixed-rate borrowing during rapid inflation.",
                scenario: {
                  narrative: "In 2019, Musa borrowed ₦5,000,000 at a fixed 12% annual interest rate to purchase a farm tractor. His brother Ali deposited ₦5,000,000 into a fixed deposit account earning 8% interest. Over the next five years, tractor prices quadrupled to ₦20,000,000 and farm revenues soared, while Ali's bank balance grew to only ₦7,300,000.",
                  characters: [
                    { name: "Musa", role: "Fixed-Rate Borrower", details: "Bought productive agricultural equipment with fixed debt" },
                    { name: "Ali", role: "Fixed Deposit Saver", details: "Held cash in bank earning sub-inflation interest" }
                  ],
                  data: [
                    { label: "Musa Asset Market Value", value: "₦20,000,000" },
                    { label: "Musa Total Debt Repaid", value: "₦6,800,000" },
                    { label: "Ali Final Cash Balance", value: "₦7,346,000" },
                    { label: "Ali Real Purchasing Power", value: "36% of 2019 Equivalent" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why did Musa gain massive wealth while Ali lost real purchasing power?",
                    options: [
                      { id: "A", label: "Musa held a real productive asset whose value tracked inflation, funded by cheap fixed debt." },
                      { id: "B", label: "Ali's bank failed and stole his deposits." },
                      { id: "C", label: "Tractors are legally exempt from inflation." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "During high inflation, cash savers lose while owners of productive, debt-financed real assets gain. The debt does not adjust for inflation, but the asset's market value and revenues expand rapidly.",
                key_takeaway: "Real assets funded by affordable fixed debt outperform cash savings during inflationary periods.",
                concepts: ["inflation", "asset", "liability"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT2.G3.I02",
                kind: "slide",
                order: 2,
                title: "Summary: The Inflation Scorecard",
                subtitle: "Winners vs losers in an inflationary economic regime.",
                body: [
                  {
                    type: "table",
                    columns: ["Category", "Inflation Impact", "Key Reason"],
                    rows: [
                      ["Cash Savers", "Heavy Loss", "Purchasing power dissolves continuously"],
                      ["Fixed Pensioners", "Heavy Loss", "Income stays flat while living costs double"],
                      ["Real Estate Owners", "Significant Gain", "Property values and rental streams rise"],
                      ["Equity Investors", "Moderate to Strong Gain", "Corporate earnings adjust with prices"],
                      ["Fixed-Rate Borrowers", "Significant Gain", "Debts are repaid in depreciated currency"]
                    ]
                  }
                ],
                concepts: ["inflation", "asset", "liability"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT2.G3.I03",
                kind: "widget",
                order: 3,
                title: "Test Your Inflation Strategy",
                subtitle: "Choose the strongest asset allocation to protect family capital against 25% inflation.",
                widget_type: "choice_with_reflection",
                config: {
                  prompt: "Your family has ₦2,000,000 in surplus capital and expects 25% inflation over the next two years. What allocation strategy best protects purchasing power?",
                  options: [
                    { id: "A", label: "A diversified mix of inflation-hedged equities, high-yield agricultural commodities, and a liquid emergency buffer." },
                    { id: "B", label: "Keeping all ₦2,000,000 in physical cash banknotes inside a bedroom closet." },
                    { id: "C", label: "Spending all ₦2,000,000 on luxury designer shoes and club parties immediately." }
                  ],
                  follow_up_prompt: "Why is holding 100% cash the guaranteed way to lose wealth in this scenario?"
                },
                concepts: ["inflation", "purchasing_power", "asset"],
                authoring_status: "authored"
              },
              {
                id: "L05.CT2.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Lesson 5 Final Review",
                subtitle: "Comprehensive quiz on inflation dynamics and defense.",
                quiz_mode: "lesson_final",
                questions: [
                  {
                    id: "L05.CT2.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "What is the single most important rule for long-term wealth preservation during periods of chronic inflation?",
                    options: [
                      { id: "A", text: "Ensure your assets are invested in productive vehicles that earn a return higher than the rate of inflation." },
                      { id: "B", text: "Keep all your wealth in physical cash under your mattress." },
                      { id: "C", text: "Borrow as much short-term 50% interest loan-app debt as possible." }
                    ],
                    correct: "A",
                    explanation: "Real return = Nominal Return - Inflation Rate. To grow wealth, your returns must exceed the rate of price increases.",
                    concepts: ["inflation", "real_value", "asset"]
                  }
                ],
                concepts: ["inflation", "real_value"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // LESSON 6: NOMINAL VALUE VS. REAL VALUE
  // ==========================================
  L06: {
    id: "L06",
    number: 6,
    title: "Nominal Value vs. Real Value",
    subtitle: "Master the mathematical difference between stated numbers and true purchasing power across time.",
    difficulty: "Very High",
    contents: [
      {
        id: "L06.CT1",
        title: "The Difference Between the Amount and Its Real Worth",
        objective: "Understand nominal values, inflation deflators, and how to compute the real value of wages and assets.",
        groups: [
          {
            id: "L06.CT1.G1",
            title: "More Money, Less Purchasing Power",
            objective: "Explore how receiving a nominal salary raise can still leave you poorer in real terms.",
            items: [
              {
                id: "L06.CT1.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The Deceptive 20% Salary Raise",
                subtitle: "Calculate why a celebratory promotion felt like a pay cut.",
                scenario: {
                  narrative: "Biodun celebrated a 20% promotion raise from ₦200,000 to ₦240,000 per month. However, over the same year, general consumer prices in his city rose by 32%. When Biodun went to pay his rent, transport, and groceries, he found that his ₦240,000 could not buy the exact same lifestyle that his ₦200,000 bought twelve months earlier.",
                  characters: [
                    { name: "Biodun", role: "Promoted Officer", details: "Nominal salary increased from ₦200k to ₦240k (+20%)" }
                  ],
                  data: [
                    { label: "Nominal Salary Raise", value: "+20% (₦240,000)" },
                    { label: "Annual Inflation Rate", value: "+32%" },
                    { label: "Net Real Wage Change", value: "-12% (Purchasing Power Deficit)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Did Biodun receive a real pay increase or a real pay cut?",
                    options: [
                      { id: "A", label: "A real pay cut: prices rose 32% while his pay rose only 20%, reducing his real purchasing power by 12%." },
                      { id: "B", label: "A real pay increase because 240,000 is higher than 200,000." },
                      { id: "C", label: "His financial standing did not change at all." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Biodun experienced nominal growth with real decline. Because inflation (32%) was higher than his raise (20%), his real wage shrank. Knowing the difference between nominal and real values prevents financial confusion.",
                key_takeaway: "A salary increase that is lower than the inflation rate is a real pay reduction.",
                concepts: ["nominal_value", "real_value", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT1.G1.I02",
                kind: "slide",
                order: 2,
                title: "Defining Nominal vs. Real",
                subtitle: "The two definitions that every smart investor must know.",
                body: [
                  {
                    type: "definition",
                    term: "Nominal Value",
                    text: "The stated or face monetary amount of money, wages, or prices, completely unadjusted for the effects of inflation."
                  },
                  {
                    type: "definition",
                    term: "Real Value",
                    text: "The nominal value adjusted for changes in price levels, measuring the true physical basket of goods and services that can be purchased."
                  },
                  {
                    type: "callout",
                    text: "Formula: Real Value ≈ Nominal Value - Inflation Rate."
                  }
                ],
                concepts: ["nominal_value", "real_value"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT1.G1.I03",
                kind: "widget",
                order: 3,
                title: "Nominal vs Real Wage Calculator",
                subtitle: "Input your salary raise and the inflation rate to find your true real wage change.",
                widget_type: "numeric_calculator",
                config: {
                  title: "Real Wage Growth Calculator",
                  default_inputs: {
                    salary_raise_percent: 15,
                    annual_inflation_rate: 28
                  },
                  formula_display: "Real Growth = Raise% - Inflation%"
                },
                concepts: ["nominal_value", "real_value", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT1.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Nominal vs. Real Quick Check",
                subtitle: "Test your mathematical grasp of real returns.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L06.CT1.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "If your employer gives you an 8% salary raise in a year where consumer inflation is 18%, what is your real change in compensation?",
                    options: [
                      { id: "A", text: "A 10% decline in real purchasing power" },
                      { id: "B", text: "An 8% increase in real purchasing power" },
                      { id: "C", text: "A 26% gain in overall wealth" }
                    ],
                    correct: "A",
                    explanation: "Real change = 8% raise - 18% inflation = -10%. You can buy 10% less than you could before the raise.",
                    concepts: ["real_value", "nominal_value"]
                  }
                ],
                concepts: ["real_value", "nominal_value"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L06.CT1.G2",
            title: "Comparing Across Different Eras",
            objective: "Learn how to compare wages, movie tickets, and property prices across different decades accurately.",
            items: [
              {
                id: "L06.CT1.G2.I01",
                kind: "case_study",
                order: 1,
                title: "My Grandfather's ₦200 Salary in 1978",
                subtitle: "Why older generations could buy cars and land on seemingly tiny nominal wages.",
                scenario: {
                  narrative: "Grandpa Adeleke frequently tells his grandchildren: 'In 1978, as a young civil engineer, my monthly salary was only ₦250, but with that salary I bought a brand new Peugeot 504 car for ₦3,000 and built a four-bedroom house for ₦10,000.' His grandson Femi currently earns ₦250,000 per month, but cannot afford a used car.",
                  characters: [
                    { name: "Grandpa Adeleke", role: "Retired Engineer (1978)", details: "Earned ₦250/mo; car cost ₦3,000" },
                    { name: "Femi", role: "Grandson (Current Era)", details: "Earns ₦250,000/mo; car costs ₦9,000,000" }
                  ],
                  data: [
                    { label: "1978 Salary vs Car Ratio", value: "12 Months of Salary" },
                    { label: "Current Salary vs Car Ratio", value: "36 Months of Salary" },
                    { label: "Price Level Inflation", value: "> 30,000% Cumulative" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why was Grandpa's ₦250 salary far more powerful than Femi's ₦250,000 salary?",
                    options: [
                      { id: "A", label: "The real purchasing power of each Naira in 1978 was hundreds of times higher than today." },
                      { id: "B", label: "Old currency notes were larger in physical size." },
                      { id: "C", label: "Automobiles were made of cheaper plastic in 1978." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Comparing historical monetary figures without adjusting for inflation is completely meaningless. Grandpa's ₦250 purchased a substantial portion of a car; today's ₦250,000 buys only four tires.",
                key_takeaway: "Historical financial comparisons must always adjust for cumulative inflation.",
                concepts: ["nominal_value", "real_value", "purchasing_power"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT1.G2.I02",
                kind: "slide",
                order: 2,
                title: "The Inflation Deflator",
                subtitle: "How economists convert past money into today's equivalents.",
                body: [
                  {
                    type: "paragraph",
                    text: "To compare money across different years, economists use price indices like the Consumer Price Index (CPI)."
                  },
                  {
                    type: "paragraph",
                    text: "By dividing past amounts by the price index of that era and multiplying by today's index, we find the 'constant currency' or 'real' equivalent."
                  }
                ],
                concepts: ["consumer_price_index", "real_value"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT1.G2.I03",
                kind: "widget",
                order: 3,
                title: "Historical Purchasing Power Converter",
                subtitle: "Convert historical naira values into current purchasing power equivalents.",
                widget_type: "option_comparison",
                config: {
                  title: "1980 vs Current Day Purchasing Power",
                  option_a: {
                    name: "1980 Era (₦1,000)",
                    attributes: {
                      "Staple Food Basket": "Can buy 5 bags of rice + 1 cow",
                      "Apartment Rent": "Could cover 6 months city rent",
                      "Purchasing Power Index": "Extremely High"
                    }
                  },
                  option_b: {
                    name: "Current Era (₦1,000)",
                    attributes: {
                      "Staple Food Basket": "Can buy 1 small loaf of bread",
                      "Apartment Rent": "Covers less than 0.1% of monthly rent",
                      "Purchasing Power Index": "Extremely Low"
                    }
                  }
                },
                concepts: ["nominal_value", "real_value"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT1.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Historical Value Check",
                subtitle: "Verify your ability to evaluate historical currency claims.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L06.CT1.G2.I04.Q1",
                    type: "true_false",
                    prompt: "Saying 'a house cost only ₦15,000 in 1980, so people were much poorer' is a classic mistake of nominal bias.",
                    correct: true,
                    explanation: "True! In 1980, average monthly salaries were ₦100 to ₦200, so a ₦15,000 house represented significant purchasing power.",
                    concepts: ["nominal_value", "real_value"]
                  }
                ],
                concepts: ["nominal_value", "real_value"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L06.CT1.G3",
            title: "Real Investment Returns vs. Nominal Yields",
            objective: "Calculate true investment performance by deducting inflation and taxes from nominal interest rates.",
            items: [
              {
                id: "L06.CT1.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The 15% Interest Rate Trap",
                subtitle: "Why double-digit bank interest can still lose purchasing power.",
                scenario: {
                  narrative: "Titi invested ₦2,000,000 in a fixed-income bond advertising a high 15% annual yield. At the end of the year, her bank credited her account with ₦300,000 in interest, bringing her total to ₦2,300,000. Titi was thrilled until she calculated that national consumer inflation for the year stood at 27%.",
                  characters: [
                    { name: "Titi", role: "Bond Investor", details: "Earned 15% nominal return during 27% inflation" }
                  ],
                  data: [
                    { label: "Nominal Return Earned", value: "+15% (₦300,000)" },
                    { label: "Inflation Rate", value: "27%" },
                    { label: "Real Investment Return", value: "-12% (Net Loss in Purchasing Power)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What was Titi's actual economic outcome?",
                    options: [
                      { id: "A", label: "Her real investment return was negative 12%; her ₦2,300,000 buys 12% less than her ₦2,000,000 did a year ago." },
                      { id: "B", label: "She beat inflation by 15%." },
                      { id: "C", label: "Her real wealth doubled." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "A positive nominal yield does not guarantee wealth growth. If your investments return 15% while the cost of living increases by 27%, your real rate of return is negative 12%. Wealth grows only when real returns are positive.",
                key_takeaway: "Real Return = Nominal Return minus Inflation. Never evaluate investments by nominal yield alone.",
                concepts: ["real_value", "nominal_value", "interest_rate"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT1.G3.I02",
                kind: "slide",
                order: 2,
                title: "The Fisher Equation: Real Interest Rates",
                subtitle: "The famous economic equation governing all lending and investing.",
                body: [
                  {
                    type: "definition",
                    term: "Real Interest Rate",
                    text: "The nominal interest rate minus the expected rate of inflation."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Positive Real Return: Nominal Rate > Inflation (Your purchasing power expands).",
                      "Zero Real Return: Nominal Rate = Inflation (Your purchasing power is preserved).",
                      "Negative Real Return: Nominal Rate < Inflation (Your purchasing power shrinks despite interest earned)."
                    ]
                  }
                ],
                concepts: ["real_value", "interest_rate", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT1.G3.I03",
                kind: "widget",
                order: 3,
                title: "Real Return Calculator",
                subtitle: "Input your investment yield and inflation to reveal your real net gain or loss.",
                widget_type: "numeric_calculator",
                config: {
                  title: "Real Rate of Return Calculator",
                  default_inputs: {
                    nominal_yield: 16,
                    inflation_rate: 24
                  },
                  formula_display: "Real Return = Nominal Yield% - Inflation Rate%"
                },
                concepts: ["real_value", "interest_rate"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT1.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Real Yield Assessment",
                subtitle: "Solve investment return questions.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L06.CT1.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "If an investment provides a 22% nominal return in an economic environment with 18% inflation, what is the real return earned by the investor?",
                    options: [
                      { id: "A", text: "+4% real return (purchasing power expanded by 4%)" },
                      { id: "B", text: "+40% real return" },
                      { id: "C", text: "-4% loss" }
                    ],
                    correct: "A",
                    explanation: "Real return = 22% - 18% = +4%. The investor successfully outpaced inflation and expanded real wealth.",
                    concepts: ["real_value"]
                  }
                ],
                concepts: ["real_value"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L06.CT2.G1",
            title: "Evaluating Raises and Job Offers",
            objective: "Analyze real compensation when changing careers or negotiating employment packages.",
            items: [
              {
                id: "L06.CT2.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The Relocation Job Offer",
                subtitle: "Compare two job offers across different cities with distinct cost-of-living index numbers.",
                scenario: {
                  narrative: "Nnamdi earns ₦350,000 monthly in Enugu, where his monthly living expenses are ₦180,000, leaving him with ₦170,000 in monthly savings. He receives an attractive offer in Lagos for ₦550,000 (+57% nominal increase). However, an apartment and daily transport in Lagos will cost him ₦400,000 monthly.",
                  characters: [
                    { name: "Nnamdi", role: "Software Developer", details: "Evaluating Enugu vs Lagos employment offers" }
                  ],
                  data: [
                    { label: "Enugu Net Savings", value: "₦170,000 / Month" },
                    { label: "Lagos Net Savings", value: "₦150,000 / Month" },
                    { label: "Nominal Salary Gap", value: "+₦200,000 in Lagos" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Which offer delivers higher real savings and purchasing power?",
                    options: [
                      { id: "A", label: "The Enugu position, because lower living expenses leave him with ₦170,000 in real monthly savings vs ₦150,000 in Lagos." },
                      { id: "B", label: "The Lagos position because the nominal salary number is higher." },
                      { id: "C", label: "Both positions leave zero savings." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Higher nominal salaries often get devoured by higher local cost of living. Nnamdi would actually save ₦20,000 less per month in Lagos despite earning ₦200,000 more in nominal wages.",
                key_takeaway: "Always evaluate job offers by net retained purchasing power after deducting local living costs.",
                concepts: ["nominal_value", "real_value", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT2.G1.I02",
                kind: "slide",
                order: 2,
                title: "The Cost-of-Living Multiplier",
                subtitle: "How to normalize wages across geographic borders.",
                body: [
                  {
                    type: "paragraph",
                    text: "Before accepting an offer in a new city or country, calculate your Net Savings Potential:"
                  },
                  {
                    type: "callout",
                    text: "Net Savings = Nominal Salary - Essential Local Cost of Living (Rent + Food + Transport + Tax)."
                  }
                ],
                concepts: ["real_value", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT2.G1.I03",
                kind: "widget",
                order: 3,
                title: "Job Offer Comparison Tool",
                subtitle: "Compare two career options side by side on a real purchasing power basis.",
                widget_type: "option_comparison",
                config: {
                  title: "Enugu vs Lagos Real Compensation",
                  option_a: {
                    name: "Enugu Job Offer",
                    attributes: {
                      "Gross Salary": "₦350,000",
                      "Rent & Utilities": "₦90,000",
                      "Food & Transport": "₦90,000",
                      "Retained Net Savings": "₦170,000 (48.5% savings rate)"
                    }
                  },
                  option_b: {
                    name: "Lagos Job Offer",
                    attributes: {
                      "Gross Salary": "₦550,000",
                      "Rent & Utilities": "₦250,000",
                      "Food & Transport": "₦150,000",
                      "Retained Net Savings": "₦150,000 (27.2% savings rate)"
                    }
                  }
                },
                concepts: ["real_value", "nominal_value", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT2.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Career Compensation Check",
                subtitle: "Evaluate career decisions using real values.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L06.CT2.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "What should you prioritize when deciding whether a new job offer in another city represents a true promotion?",
                    options: [
                      { id: "A", text: "Whether the raise leaves you with higher net real savings after accounting for local rent and living costs." },
                      { id: "B", text: "Only the total gross nominal salary printed on the letter." },
                      { id: "C", text: "The title on the business card." }
                    ],
                    correct: "A",
                    explanation: "Real retained surplus after local costs determines your actual wealth-building capacity.",
                    concepts: ["real_value", "budget"]
                  }
                ],
                concepts: ["real_value"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L06.CT2.G2",
            title: "Comparing Across Different Currencies",
            objective: "Analyze real values when earning or spending across international foreign exchange boundaries.",
            items: [
              {
                id: "L06.CT2.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Remote Dollar Freelancer",
                subtitle: "How earning in a strong foreign currency alters real purchasing power locally.",
                scenario: {
                  narrative: "Zubair lives in Kaduna and works as a remote freelance technical writer for an international software firm, earning a fixed rate of $1,500 per month. When the Naira exchange rate moved from ₦750/$ to ₦1,500/$, his nominal income in Naira jumped from ₦1,125,000 to ₦2,250,000 per month, far outpacing local price inflation.",
                  characters: [
                    { name: "Zubair", role: "Remote Freelancer", details: "Earns $1,500 fixed USD monthly while spending locally in NGN" }
                  ],
                  data: [
                    { label: "Initial Naira Inflow", value: "₦1,125,000 ($1,500 @ ₦750)" },
                    { label: "New Naira Inflow", value: "₦2,250,000 ($1,500 @ ₦1,500)" },
                    { label: "Local Cost of Living Increase", value: "+45%" },
                    { label: "Net Real Gain", value: "+55% Surge in Purchasing Power" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why did Zubair's real purchasing power expand while local workers suffered?",
                    options: [
                      { id: "A", label: "His income was earned in a hard currency that depreciated the local currency, doubling his nominal inflow while domestic inflation was only 45%." },
                      { id: "B", label: "Foreign dollars are legally exempt from market prices." },
                      { id: "C", label: "He stopped paying for groceries." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Earning in hard currency while living in a developing economy provides a natural hedge against domestic currency depreciation. When the local currency weakens, the local equivalent of foreign earnings expands faster than domestic price rises.",
                key_takeaway: "Global income provides powerful insulation against local currency depreciation.",
                concepts: ["real_value", "exchange_rate", "purchasing_power"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT2.G2.I02",
                kind: "slide",
                order: 2,
                title: "Hard Currency Hedging",
                subtitle: "Why global earners build resilience against domestic inflation.",
                body: [
                  {
                    type: "paragraph",
                    text: "A currency that reliably holds value internationally (like the US Dollar, Euro, or Swiss Franc) is often referred to as 'hard currency'."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Holding a portion of savings in foreign currency assets preserves international purchasing power.",
                      "Earning in foreign currency transforms local currency depreciation into an income windfall.",
                      "However, remember that foreign currencies also experience inflation in their home economies (e.g. US inflation)."
                    ]
                  }
                ],
                concepts: ["exchange_rate", "purchasing_power"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT2.G2.I03",
                kind: "widget",
                order: 3,
                title: "Currency Hedging Comparison",
                subtitle: "Simulate holding 100% domestic currency vs a 50/50 hedged allocation during devaluation.",
                widget_type: "option_comparison",
                config: {
                  title: "Currency Portfolio Comparison",
                  option_a: {
                    name: "100% Domestic Currency",
                    attributes: {
                      "Local Purchasing Power": "Declines by 35% during devaluation",
                      "International Travel Power": "Cuts in half (-50%)",
                      "Volatility": "Low nominal volatility, high real purchasing power loss"
                    }
                  },
                  option_b: {
                    name: "Hedged Portfolio (50% NGN / 50% USD)",
                    attributes: {
                      "Local Purchasing Power": "Preserved and slightly expanded",
                      "International Travel Power": "Protected",
                      "Volatility": "Resilient against bilateral exchange rate shocks"
                    }
                  }
                },
                concepts: ["exchange_rate", "real_value"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT2.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Currency Exchange Assessment",
                subtitle: "Test your understanding of international purchasing power.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L06.CT2.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "If you need to pay $5,000 for overseas university tuition next year and expect your domestic currency to depreciate by 40%, what is the most prudent risk management move?",
                    options: [
                      { id: "A", text: "Acquire the required foreign currency systematically in advance or hold dollar-denominated assets." },
                      { id: "B", text: "Wait until the registration day to exchange all your money at whatever the rate is." },
                      { id: "C", text: "Convert your dollars to domestic cash." }
                    ],
                    correct: "A",
                    explanation: "Pre-funding known foreign currency liabilities eliminates exchange-rate risk and protects against depreciation.",
                    concepts: ["exchange_rate", "purchasing_power"]
                  }
                ],
                concepts: ["exchange_rate"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L06.CT2.G3",
            title: "Long-Term Wealth and Real Compounding",
            objective: "Understand how true compounding works only when returns outpace inflation over decades.",
            items: [
              {
                id: "L06.CT2.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The 20-Year Compounding Comparison",
                subtitle: "How real return rates determine retirement security.",
                scenario: {
                  narrative: "Two friends, Kunle and Femi, each invest ₦100,000 monthly for twenty years. Kunle leaves his funds in savings products earning 8% annually while inflation averages 18% (real return: -10%). Femi invests in productive equities and commercial real estate yielding 24% annually (real return: +6%). After twenty years, Kunle's nominal millions can barely buy groceries, while Femi has accumulated generational financial freedom.",
                  characters: [
                    { name: "Kunle", role: "Conservative Saver", details: "Negative real return of -10% annually" },
                    { name: "Femi", role: "Productive Investor", details: "Positive real return of +6% annually" }
                  ],
                  data: [
                    { label: "Kunle Real Purchasing Power", value: "Shrank by 75%" },
                    { label: "Femi Real Purchasing Power", value: "Expanded by 320%" },
                    { label: "Key Difference", value: "Earning positive REAL returns" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What made the monumental difference between Kunle and Femi's outcomes?",
                    options: [
                      { id: "A", label: "Femi achieved positive real compounding, while Kunle suffered continuous real purchasing power erosion." },
                      { id: "B", label: "Kunle was unlucky with bank lotteries." },
                      { id: "C", label: "Femi worked twice as many hours." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Compounding is the eighth wonder of the world only when the net real return is positive. Compounding at a negative real rate simply guarantees catastrophic loss of purchasing power over decades.",
                key_takeaway: "Long-term financial independence requires consistent positive real compound growth.",
                concepts: ["compound_interest", "real_value"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT2.G3.I02",
                kind: "slide",
                order: 2,
                title: "The True Goal of Wealth Building",
                subtitle: "Defeating inflation over the long haul.",
                body: [
                  {
                    type: "paragraph",
                    text: "Every naira you save must be assigned a job to beat inflation."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Cash and money market funds: For short-term emergencies (0 - 6 months).",
                      "Fixed-income bonds and treasury notes: For capital preservation (1 - 3 years).",
                      "Equities, real estate, and business ventures: For beating inflation and real wealth expansion (5+ years)."
                    ]
                  }
                ],
                concepts: ["real_value", "asset", "compound_interest"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT2.G3.I03",
                kind: "widget",
                order: 3,
                title: "Simulate Real Compounding Growth",
                subtitle: "Observe the difference between nominal balances and inflation-adjusted purchasing power over 10 years.",
                widget_type: "savings_growth_calculator",
                config: {
                  title: "10-Year Real Compounding Simulator",
                  initial_principal: 500000,
                  monthly_addition: 50000,
                  nominal_annual_rate: 18,
                  inflation_rate: 14
                },
                concepts: ["compound_interest", "real_value"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT2.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Real Compounding Mastery",
                subtitle: "Assess your long-term compounding knowledge.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L06.CT1.G3.I04.Q2",
                    type: "single_choice",
                    prompt: "Why is investing primarily in low-interest bank accounts for a 30-year retirement plan dangerous?",
                    options: [
                      { id: "A", text: "Because sub-inflation returns silently erode the real purchasing power of the accumulated savings over decades." },
                      { id: "B", text: "Because banks automatically close accounts after 10 years." },
                      { id: "C", text: "Because interest payments are banned." }
                    ],
                    correct: "A",
                    explanation: "Over 30 years, an average negative real return of even 5% will destroy more than 75% of your purchasing power.",
                    concepts: ["real_value", "inflation"]
                  }
                ],
                concepts: ["real_value"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L06.CT2.G4",
            title: "Making Fair Financial Comparisons",
            objective: "Synthesize the entire framework of nominal vs. real measurement across all financial decisions.",
            items: [
              {
                id: "L06.CT2.G4.I01",
                kind: "case_study",
                order: 1,
                title: "The Financial Auditor's Verdict",
                subtitle: "Audit three business proposals to identify which creates genuine real value.",
                scenario: {
                  narrative: "An investment club is evaluating three business proposals. Proposal A offers a 12% guaranteed annual dividend in a 20% inflation environment. Proposal B is a commercial poultry venture projecting 32% annual return. Proposal C is holding foreign currency cash yielding 0% interest.",
                  characters: [
                    { name: "Investment Committee", role: "Decision Makers", details: "Tasked with allocating ₦10,000,000 club capital" }
                  ],
                  data: [
                    { label: "Proposal A Real Return", value: "-8% (12% - 20%)" },
                    { label: "Proposal B Real Return", value: "+12% (32% - 20%)" },
                    { label: "Proposal C Real Return", value: "Preserves USD purchasing power" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Which proposal is the only one generating positive real domestic economic growth?",
                    options: [
                      { id: "A", label: "Proposal B: the poultry enterprise generating a 32% return, beating inflation by +12%." },
                      { id: "B", label: "Proposal A: because it has the word 'guaranteed'." },
                      { id: "C", label: "None of them." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Guaranteed nominal returns are often guaranteed real losses if the return is below inflation. The only way to expand wealth is to invest in productive commercial enterprises or assets that produce real economic surplus.",
                key_takeaway: "Always demand positive real expected returns before deploying investment capital.",
                concepts: ["real_value", "nominal_value", "asset"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT2.G4.I02",
                kind: "slide",
                order: 2,
                title: "Lesson Summary: The Real Reality",
                subtitle: "Key takeaways from Lesson 6.",
                body: [
                  {
                    type: "bullet_list",
                    items: [
                      "Nominal is the number; Real is the purchasing power.",
                      "Never evaluate a salary raise, an investment yield, or a price change without subtracting inflation.",
                      "A 10% raise during 20% inflation is a 10% real pay cut.",
                      "Long-term wealth is built by generating positive real compound returns over decades."
                    ]
                  }
                ],
                concepts: ["nominal_value", "real_value", "purchasing_power"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT2.G4.I03",
                kind: "widget",
                order: 3,
                title: "Real vs. Nominal Rule Checklist",
                subtitle: "Review the essential analytical rules for comparing financial metrics.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Financial Thinking Checklist",
                  buckets: [
                    { id: "smart", label: "Smart Real Thinking" },
                    { id: "trap", label: "Nominal Illusion Trap" }
                  ],
                  cards: [
                    { id: "c1", label: "Subtracting inflation before celebrating an investment gain", bucket: "smart", feedback: "Always calculate net real returns." },
                    { id: "c2", label: "Assuming you are richer just because the bank balance number is higher", bucket: "trap", feedback: "Ignores whether living costs doubled." },
                    { id: "c3", label: "Adjusting emergency savings targets upward as monthly expenses rise", bucket: "smart", feedback: "Protects real survival runway." },
                    { id: "c4", label: "Leaving millions in physical cash in a safe for 10 years", bucket: "trap", feedback: "Guarantees massive purchasing power destruction." }
                  ]
                },
                concepts: ["real_value", "nominal_value"],
                authoring_status: "authored"
              },
              {
                id: "L06.CT2.G4.I04",
                kind: "quiz",
                order: 4,
                title: "Lesson 6 Comprehensive Exam",
                subtitle: "Final quiz certifying mastery of nominal and real financial valuation.",
                quiz_mode: "lesson_final",
                questions: [
                  {
                    id: "L06.CT2.G4.I04.Q1",
                    type: "single_choice",
                    prompt: "An investor deposits ₦1,000,000 in a product offering 10% annual interest. During that year, inflation is 15%. At year-end, the account balance is ₦1,100,000. Which statement is completely accurate?",
                    options: [
                      { id: "A", text: "The investor has ₦1,100,000 nominally, but suffered a 5% real loss in purchasing power." },
                      { id: "B", text: "The investor became 10% richer in real terms." },
                      { id: "C", text: "The investor beat inflation by 5%." }
                    ],
                    correct: "A",
                    explanation: "Real return = 10% - 15% = -5%. The account has more paper notes, but those notes buy 5% less goods than the initial principal did.",
                    concepts: ["real_value", "nominal_value"]
                  }
                ],
                concepts: ["real_value", "nominal_value"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // LESSON 7: WHY THE NAIRA'S VALUE CHANGES
  // ==========================================
  L07: {
    id: "L07",
    number: 7,
    title: "Why Currency Values Change: Exchange Rates and the Naira",
    subtitle: "Understand how foreign exchange markets work, why currency exchange rates fluctuate, and how global trade affects your personal wallet.",
    difficulty: "High",
    contents: [
      {
        id: "L07.CT1",
        title: "Understanding Currency Exchange Rates",
        objective: "Understand how exchange rates are determined by trade balances, foreign reserves, and market supply and demand.",
        groups: [
          {
            id: "L07.CT1.G1",
            title: "What an Exchange Rate Tells You",
            objective: "Define exchange rates and understand how currencies are priced relative to one another.",
            items: [
              {
                id: "L07.CT1.G1.I01",
                kind: "case_study",
                order: 1,
                title: "Buying a Laptop from Abroad",
                subtitle: "How exchange rates dictate local import prices.",
                scenario: {
                  narrative: "Emeka wants to buy a specialized programming laptop listed online for $1,000 USD. In January, the exchange rate is ₦800 per dollar, so the laptop costs ₦800,000. By September, the exchange rate moves to ₦1,600 per dollar. Even though the foreign manufacturer did not raise the price of the laptop by a single cent, Emeka must now pay ₦1,600,000.",
                  characters: [
                    { name: "Emeka", role: "Software Student", details: "Purchasing imported electronics priced in USD" }
                  ],
                  data: [
                    { label: "Foreign Laptop Price", value: "$1,000 USD (Unchanged)" },
                    { label: "January Exchange Rate", value: "₦800 / $1 (Cost: ₦800k)" },
                    { label: "September Exchange Rate", value: "₦1,600 / $1 (Cost: ₦1.6M)" },
                    { label: "Local Price Increase", value: "+100% in NGN" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why did the local price of the laptop double for Emeka?",
                    options: [
                      { id: "A", label: "The Naira depreciated against the US Dollar, requiring twice as many Naira to purchase the same $1,000." },
                      { id: "B", label: "The laptop battery became twice as large." },
                      { id: "C", label: "Online retail websites banned Nigerian shoppers." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "An exchange rate is simply the price of one currency expressed in another. When your local currency weakens against the trading currency, all imported items instantly become more expensive in local terms.",
                key_takeaway: "Currency depreciation directly raises the local cost of all imported goods and services.",
                concepts: ["exchange_rate", "currency_depreciation"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT1.G1.I02",
                kind: "slide",
                order: 2,
                title: "What Is an Exchange Rate?",
                subtitle: "The pricing mechanism of international commerce.",
                body: [
                  {
                    type: "definition",
                    term: "Exchange Rate",
                    text: "The price of one nation's currency expressed in terms of another nation's currency."
                  },
                  {
                    type: "paragraph",
                    text: "Just as yams or tomatoes have a price in a local market, currencies have prices in the foreign exchange (Forex) market."
                  },
                  {
                    type: "callout",
                    text: "If Nigeria imports more goods than it exports, demand for foreign currency exceeds supply, causing the exchange rate of the foreign currency to rise relative to the Naira."
                  }
                ],
                concepts: ["exchange_rate", "currency_depreciation"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT1.G1.I03",
                kind: "widget",
                order: 3,
                title: "Exchange Rate Cost Converter",
                subtitle: "Calculate how exchange rate movements impact foreign purchase costs.",
                widget_type: "numeric_calculator",
                config: {
                  title: "Imported Item Cost Converter",
                  default_inputs: {
                    foreign_price_usd: 250,
                    exchange_rate_ngn_per_usd: 1550
                  },
                  formula_display: "Total Local Cost = Foreign Price ($) × Exchange Rate (₦/$)"
                },
                concepts: ["exchange_rate"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT1.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Exchange Rate Fundamentals",
                subtitle: "Test your understanding of exchange rate pricing.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L07.CT1.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "If the exchange rate changes from ₦1,000 = $1 to ₦1,500 = $1, what has happened to the Naira?",
                    options: [
                      { id: "A", text: "The Naira has depreciated (weakened) relative to the Dollar." },
                      { id: "B", text: "The Naira has appreciated (strengthened) relative to the Dollar." },
                      { id: "C", text: "The Dollar has ceased to exist." }
                    ],
                    correct: "A",
                    explanation: "When you must surrender more local currency units (₦1,500 instead of ₦1,000) to buy one foreign currency unit ($1), the local currency has depreciated.",
                    concepts: ["currency_depreciation", "exchange_rate"]
                  }
                ],
                concepts: ["exchange_rate", "currency_depreciation"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L07.CT1.G2",
            title: "Why Currencies Have Different Values",
            objective: "Analyze trade balances, export productivity, and national economic competitiveness.",
            items: [
              {
                id: "L07.CT1.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Trade Deficit Dilemma",
                subtitle: "How importing food, cars, and gadgets while exporting only crude oil strains reserves.",
                scenario: {
                  narrative: "Nation X exports raw crude petroleum, which accounts for 90% of its foreign revenue. However, the nation imports refined fuel, toothpicks, rice, smartphones, cars, pharmaceuticals, and machinery. When global crude oil prices drop by 40%, the nation's foreign currency inflows plunge, but citizens still demand billions of dollars to pay for imported goods.",
                  characters: [
                    { name: "Central Bank of Nation X", role: "Monetary Authority", details: "Watching foreign exchange reserves drain rapidly" },
                    { name: "Importers", role: "Local Merchants", details: "Lining up to purchase scarce US dollars" }
                  ],
                  data: [
                    { label: "Crude Export Revenue", value: "Down 40%" },
                    { label: "Import Demand", value: "Steady / High" },
                    { label: "FX Market Result", value: "Severe Currency Depreciation" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What is the structural cause of currency weakness in this economy?",
                    options: [
                      { id: "A", label: "A severe trade imbalance: high import demand with concentrated and volatile export earnings." },
                      { id: "B", label: "Citizens are using too many credit cards." },
                      { id: "C", label: "Exporting raw oil is illegal." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "A currency's long-term strength reflects what the nation produces and sells to the rest of the world. An economy that imports everything it consumes while relying on a single raw commodity for export earnings will suffer violent currency shocks whenever commodity prices drop.",
                key_takeaway: "Currencies stay strong when a nation produces diverse, competitive goods and services that the world wants to buy.",
                concepts: ["exchange_rate", "foreign_exchange_reserves", "supply_and_demand"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT1.G2.I02",
                kind: "slide",
                order: 2,
                title: "Supply and Demand for Foreign Currency",
                subtitle: "The engine that moves exchange rate charts every minute.",
                body: [
                  {
                    type: "bullet_list",
                    items: [
                      "Demand for Dollars: Created by local importers paying for foreign goods, students paying overseas tuition, travelers, and businesses remitting dividends.",
                      "Supply of Dollars: Created by oil/gas sales, agricultural exports (cocoa, sesame), foreign investments, remittances from diaspora citizens, and foreign loans.",
                      "When Demand > Supply: The price of the Dollar rises (Naira depreciates).",
                      "When Supply > Demand: The price of the Dollar falls (Naira appreciates)."
                    ]
                  }
                ],
                concepts: ["supply_and_demand", "exchange_rate"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT1.G2.I03",
                kind: "widget",
                order: 3,
                title: "FX Supply vs. Demand Sorter",
                subtitle: "Identify which commercial activities supply foreign exchange and which consume it.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Foreign Exchange Flow Classifier",
                  buckets: [
                    { id: "supplies_fx", label: "Supplies FX to the Nation (+)" },
                    { id: "demands_fx", label: "Consumes FX from the Nation (-)" }
                  ],
                  cards: [
                    { id: "c1", label: "Agricultural exporter shipping organic cocoa to Germany", bucket: "supplies_fx", feedback: "Export sales bring foreign exchange into the country." },
                    { id: "c2", label: "Local importer buying 5,000 smartphones from China", bucket: "demands_fx", feedback: "Paying foreign manufacturers requires buying dollars." },
                    { id: "c3", label: "Diaspora worker in the UK sending British Pounds to family in Ibadan", bucket: "supplies_fx", feedback: "Remittances inject foreign currency into domestic banks." },
                    { id: "c4", label: "A Nigerian student paying university tuition in Canada", bucket: "demands_fx", feedback: "Overseas education is an import of services that consumes FX." }
                  ]
                },
                concepts: ["exchange_rate", "foreign_exchange_reserves"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT1.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Exchange Rate Drivers Quiz",
                subtitle: "Test your understanding of foreign exchange drivers.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L07.CT1.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "If Nigeria's technology companies and manufacturing exporters increase their sales abroad by 300%, what will happen to the foreign exchange market?",
                    options: [
                      { id: "A", text: "The supply of foreign currency will surge, strengthening the value of the Naira." },
                      { id: "B", text: "The Naira will automatically become completely worthless." },
                      { id: "C", text: "The Central Bank will ban all trade." }
                    ],
                    correct: "A",
                    explanation: "Increased export revenues supply more foreign exchange to the domestic market, strengthening the local currency.",
                    concepts: ["exchange_rate", "supply_and_demand"]
                  }
                ],
                concepts: ["exchange_rate"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L07.CT1.G3",
            title: "What Makes Exchange Rates Change?",
            objective: "Analyze inflation differentials, interest rate policies, and foreign exchange reserves.",
            items: [
              {
                id: "L07.CT1.G3.I01",
                kind: "slide",
                order: 1,
                title: "The Role of Foreign Exchange Reserves",
                subtitle: "The national emergency fund of international trade.",
                body: [
                  {
                    type: "definition",
                    term: "Foreign Exchange Reserves",
                    text: "Foreign currency assets (primarily US Dollars, Euros, gold, and IMF SDRs) held by a nation's central bank."
                  },
                  {
                    type: "paragraph",
                    text: "Reserves act as a buffer. When export earnings temporarily dip, the central bank can release foreign reserves into the market to meet importer demand and prevent wild currency panics."
                  },
                  {
                    type: "callout",
                    text: "If reserves fall too low (e.g., less than 3 months of import cover), global investors panic, currency speculators bet against the currency, and rapid depreciation ensues."
                  }
                ],
                concepts: ["foreign_exchange_reserves", "central_bank"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT1.G3.I02",
                kind: "case_study",
                order: 2,
                title: "The Speculative Run on the Currency",
                subtitle: "How rumors and expectations accelerate currency declines.",
                scenario: {
                  narrative: "When news leaks that national oil production has dropped by 30%, rumors spread that the central bank will devalue the currency next month. Importers and wealthy individuals rush to convert billions of Naira into US Dollars immediately before the predicted devaluation. This panic buying creates a self-fulfilling prophecy, forcing the currency down within 72 hours.",
                  characters: [
                    { name: "Market Speculators", role: "Traders", details: "Buying foreign currency in anticipation of a drop" },
                    { name: "Central Bank", role: "Regulator", details: "Struggling to meet sudden panic dollar demand" }
                  ],
                  data: [
                    { label: "Baseline Dollar Demand", value: "$50 Million / Day" },
                    { label: "Panic Dollar Demand", value: "$200 Million / Day" },
                    { label: "Result", value: "Instant 25% Currency Depreciation" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What economic behavioral phenomenon amplified the currency collapse?",
                    options: [
                      { id: "A", label: "Speculative panic and herd behavior: expectations of future weakness triggered immediate capital flight." },
                      { id: "B", label: "The banking system shut down electricity." },
                      { id: "C", label: "Foreign countries seized the country's paper notes." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Expectations heavily influence financial markets. If market participants believe a currency will lose value tomorrow, they dump it today, which immediately causes the very collapse they feared.",
                key_takeaway: "Market psychology and credible monetary policy are vital for currency stability.",
                concepts: ["exchange_rate", "central_bank"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT1.G3.I03",
                kind: "widget",
                order: 3,
                title: "Evaluate Currency Strength Factors",
                subtitle: "Identify which national indicators support a stable exchange rate.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Currency Support Sorter",
                  buckets: [
                    { id: "strengthens", label: "Strengthens Local Currency" },
                    { id: "weakens", label: "Weakens Local Currency" }
                  ],
                  cards: [
                    { id: "c1", label: "Substantial rise in non-oil exports and agricultural manufacturing", bucket: "strengthens", feedback: "Broad-based exports create sustainable FX inflows." },
                    { id: "c2", label: "Massive reliance on imported refined petroleum and staple foods", bucket: "weakens", feedback: "Drains national FX reserves continuously." },
                    { id: "c3", label: "High domestic inflation far exceeding trade partner inflation", bucket: "weakens", feedback: "Currencies with higher inflation naturally depreciate." },
                    { id: "c4", label: "Strong, transparent foreign direct investment in factories", bucket: "strengthens", feedback: "Capital investments bring hard currency into the economy." }
                  ]
                },
                concepts: ["exchange_rate", "foreign_exchange_reserves"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT1.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Currency Factors Check",
                subtitle: "Test your understanding of currency valuation factors.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L07.CT1.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "Why does high domestic inflation inevitably weaken a nation's exchange rate over time?",
                    options: [
                      { id: "A", text: "Because domestic goods become uncompetitive, reducing exports while making cheaper foreign imports more attractive." },
                      { id: "B", text: "Because foreign banks refuse to look at high numbers." },
                      { id: "C", text: "Inflation has zero impact on exchange rates." }
                    ],
                    correct: "A",
                    explanation: "Purchasing Power Parity (PPP) dictates that currencies of nations with chronic high inflation must depreciate against currencies with low inflation.",
                    concepts: ["exchange_rate", "inflation", "purchasing_power"]
                  }
                ],
                concepts: ["exchange_rate", "inflation"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L07.CT2.G1",
            title: "Imported Goods and Local Prices",
            objective: "Trace the direct transmission mechanism between exchange rate devaluation and supermarket shelf prices.",
            items: [
              {
                id: "L07.CT2.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The Pharmacy's Imported Antibiotics",
                subtitle: "Why local healthcare costs jump overnight when currency devalues.",
                scenario: {
                  narrative: "Dr. Kemi runs a community pharmacy in Port Harcourt. She imports essential asthma inhalers and antibiotics from India. When the Naira depreciates by 35% in one month, the cost of clearing her shipment from the port increases from ₦4,000,000 to ₦5,400,000. She must raise the retail price of inhalers from ₦3,500 to ₦4,800 to avoid business insolvency.",
                  characters: [
                    { name: "Dr. Kemi", role: "Pharmacist", details: "Imports vital medications manufactured overseas" }
                  ],
                  data: [
                    { label: "FX Depreciation", value: "-35% in NGN Value" },
                    { label: "Shipment Clearance Cost", value: "₦4.0M -> ₦5.4M" },
                    { label: "Inhaler Retail Price", value: "₦3,500 -> ₦4,800 (+37%)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Why couldn't Dr. Kemi absorb the cost difference herself?",
                    options: [
                      { id: "A", label: "Retail pharmacy profit margins are thin (10-15%); absorbing a 35% import spike would quickly cause bankruptcy." },
                      { id: "B", label: "She wanted to punish her patients." },
                      { id: "C", label: "Indian suppliers demanded local currency." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Import pass-through is instantaneous in an import-dependent economy. Retailers have no choice but to pass on exchange rate depreciation to end-consumers. This is why currency stability is vital for public welfare and healthcare access.",
                key_takeaway: "Exchange rate depreciation flows directly into higher retail prices for all imported medicines, food, and parts.",
                concepts: ["exchange_rate", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT2.G1.I02",
                kind: "slide",
                order: 2,
                title: "Exchange Rate Pass-Through",
                subtitle: "How global currency shocks reach everyday street vendors.",
                body: [
                  {
                    type: "paragraph",
                    text: "Even items produced locally often rely on imported inputs:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Bread is baked locally, but the wheat flour is imported from North America or Europe.",
                      "Chickens are raised locally, but the feed relies on imported vitamins and vaccines.",
                      "A tailor works locally, but the sewing machine needles, zippers, and threads are imported."
                    ]
                  },
                  {
                    type: "callout",
                    text: "Because of imported inputs, currency depreciation raises the prices of almost everything you touch, not just imported luxury electronics."
                  }
                ],
                concepts: ["exchange_rate", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT2.G1.I03",
                kind: "widget",
                order: 3,
                title: "Trace Import Content in Local Goods",
                subtitle: "Discover how much of everyday local products depends on foreign exchange.",
                widget_type: "option_comparison",
                config: {
                  title: "Import Content in Common Goods",
                  option_a: {
                    name: "Locally Baked Loaf of Bread",
                    attributes: {
                      "Imported Content": "70% (Imported wheat, imported baking yeast, imported diesel for generator)",
                      "FX Depreciation Sensitivity": "Extremely High (Price jumps within days of dollar hike)"
                    }
                  },
                  option_b: {
                    name: "Locally Harvested Cassava / Garri",
                    attributes: {
                      "Imported Content": "15% (Local farming, transport fuel only)",
                      "FX Depreciation Sensitivity": "Moderate (More insulated from global dollar shocks)"
                    }
                  }
                },
                concepts: ["exchange_rate", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT2.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Import Pass-Through Check",
                subtitle: "Test your understanding of exchange rate effects on local goods.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L07.CT2.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "Why does the price of locally prepared street food (like fried bean cakes or bread) rise when the US Dollar surges?",
                    options: [
                      { id: "A", text: "Because key ingredients (wheat flour, cooking oil, generator fuel) are imported or priced against global commodities." },
                      { id: "B", text: "Because street food vendors accept payments in US Dollars." },
                      { id: "C", text: "Because street vendors are required by law to raise prices." }
                    ],
                    correct: "A",
                    explanation: "Imported inputs link domestic retail prices directly to foreign exchange rates.",
                    concepts: ["exchange_rate", "inflation"]
                  }
                ],
                concepts: ["exchange_rate"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L07.CT2.G2",
            title: "Foreign Currency, Travel, and Education",
            objective: "Analyze personal budgeting and planning for foreign travel, diaspora commitments, and international school fees.",
            items: [
              {
                id: "L07.CT2.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Overseas University Tuition Shock",
                subtitle: "How exchange rate shifts can disrupt education plans.",
                scenario: {
                  narrative: "Tari's parents budgeted ₦12,000,000 to cover his final year tuition of £12,000 in the UK when the exchange rate was ₦1,000/£1. Before the September tuition deadline, the exchange rate surged to ₦2,000/£1. The family suddenly needed ₦24,000,000—a ₦12,000,000 deficit that threatened Tari's graduation.",
                  characters: [
                    { name: "Tari", role: "International Student", details: "Tuition bill fixed in British Pounds (£12,000)" },
                    { name: "Parents", role: "Sponsors", details: "Earning income entirely in Nigerian Naira" }
                  ],
                  data: [
                    { label: "Fixed Tuition Owed", value: "£12,000 GBP" },
                    { label: "Original Naira Budget", value: "₦12,000,000 (@ ₦1,000/£)" },
                    { label: "New Naira Requirement", value: "₦24,000,000 (@ ₦2,000/£)" },
                    { label: "Family Financial Shortfall", value: "₦12,000,000" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What financial mistake did Tari's parents make?",
                    options: [
                      { id: "A", label: "They kept tuition funds in local currency rather than converting to the target currency (£) as funds became available." },
                      { id: "B", label: "They chose a school in the United Kingdom." },
                      { id: "C", label: "They paid tuition too early." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "When you have a known future foreign currency liability, holding the funds in a depreciating local currency leaves you exposed to catastrophic exchange rate risk. Families and businesses must match the currency of their savings to the currency of their liabilities.",
                key_takeaway: "Match the currency of your savings to the currency of your upcoming obligations.",
                concepts: ["exchange_rate", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT2.G2.I02",
                kind: "slide",
                order: 2,
                title: "Currency Matching: A Golden Risk Principle",
                subtitle: "Never leave foreign commitments unhedged.",
                body: [
                  {
                    type: "paragraph",
                    text: "Corporate treasurers use a rule called 'Asset-Liability Currency Matching':"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "If you owe money in US Dollars, accumulate assets in US Dollars.",
                      "If you owe money in British Pounds, accumulate assets in British Pounds.",
                      "Never hold 100% local currency when you have large, non-negotiable foreign obligations due within 12 months."
                    ]
                  }
                ],
                concepts: ["exchange_rate", "liability"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT2.G2.I03",
                kind: "widget",
                order: 3,
                title: "Tuition Risk Calculator",
                subtitle: "Simulate foreign tuition requirements under different exchange rate scenarios.",
                widget_type: "numeric_calculator",
                config: {
                  title: "Foreign Tuition Exposure Calculator",
                  default_inputs: {
                    tuition_amount_foreign: 8000,
                    potential_exchange_rate: 1850
                  },
                  formula_display: "Total Required = Foreign Tuition × Expected FX Rate"
                },
                concepts: ["exchange_rate"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT2.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Foreign Obligation Risk Quiz",
                subtitle: "Test your ability to manage foreign exchange risks.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L07.CT2.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "What is 'currency risk' in personal finance?",
                    options: [
                      { id: "A", text: "The risk that exchange rate fluctuations will unexpectedly increase the cost of foreign obligations or erode asset values." },
                      { id: "B", text: "The risk that physical banknotes will catch fire." },
                      { id: "C", text: "The risk that a bank will miscount your paper money." }
                    ],
                    correct: "A",
                    explanation: "Currency risk arises whenever you hold assets in one currency while owing liabilities in another.",
                    concepts: ["exchange_rate"]
                  }
                ],
                concepts: ["exchange_rate"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L07.CT2.G3",
            title: "Businesses, Trade, and Exchange-Rate Risk",
            objective: "Synthesize Chapter 2 by evaluating how businesses manage exchange rate volatility and protect capital.",
            items: [
              {
                id: "L07.CT2.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Manufacturer Who Hedged",
                subtitle: "How a smart factory owner survived an acute foreign exchange crisis.",
                scenario: {
                  narrative: "Alhaji Bello operates a commercial packaging factory in Kano that imports industrial plastic resin granules from South Korea. Sensing impending currency depreciation, he entered into a forward contract with his bank to lock in the exchange rate for his next three container shipments. When the currency devalued by 40% two months later, Alhaji Bello's competitors halted operations, while his factory continued running smoothly at locked-in costs.",
                  characters: [
                    { name: "Alhaji Bello", role: "Factory Owner", details: "Hedged foreign exchange exposure via forward contracts" },
                    { name: "Competitors", role: "Unhedged Producers", details: "Caught with sudden 40% cost increases and shut down" }
                  ],
                  data: [
                    { label: "Bello Locked-in Rate", value: "₦950 / $1" },
                    { label: "Post-Devaluation Market Rate", value: "₦1,450 / $1 (+52%)" },
                    { label: "Bello Production Status", value: "100% Operational" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What management tool protected Alhaji Bello's business?",
                    options: [
                      { id: "A", label: "Hedging: locking in future exchange rates in advance to eliminate currency volatility." },
                      { id: "B", label: "Smuggling raw materials across the border." },
                      { id: "C", label: "Refusing to pay his workers." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Hedging is not gambling; it is insurance against volatility. By eliminating exchange rate uncertainty, businesses can price products predictably, protect profit margins, and survive economic storms.",
                key_takeaway: "Prudent risk management neutralizes foreign exchange volatility.",
                concepts: ["exchange_rate", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT2.G3.I02",
                kind: "slide",
                order: 2,
                title: "Chapter 2 Synthesis: Defending Your Purchasing Power",
                subtitle: "Summary of Lessons 4, 5, 6, and 7.",
                body: [
                  {
                    type: "bullet_list",
                    items: [
                      "Purchasing power is the true measure of wealth: what your money actually buys.",
                      "Inflation is systemic; it erodes idle cash and transfers wealth from savers to asset owners.",
                      "Nominal numbers deceive; real values subtract inflation to reveal true economic progress.",
                      "Exchange rates mirror national trade productivity; currency diversification protects your family from domestic devaluation."
                    ]
                  }
                ],
                concepts: ["purchasing_power", "inflation", "real_value", "exchange_rate"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT2.G3.I03",
                kind: "widget",
                order: 3,
                title: "Chapter 2 Master Strategy Check",
                subtitle: "Select the most effective defensive actions against currency devaluation and inflation.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Wealth Defense Sorter",
                  buckets: [
                    { id: "sound", label: "Sound Financial Protection" },
                    { id: "vulnerable", label: "High Vulnerability" }
                  ],
                  cards: [
                    { id: "c1", label: "Holding diversified productive assets (real estate, productive business equity)", bucket: "sound", feedback: "Real assets appreciate alongside inflation." },
                    { id: "c2", label: "Keeping 100% of family life savings in zero-interest physical cash notes", bucket: "vulnerable", feedback: "Guarantees loss of purchasing power." },
                    { id: "c3", label: "Developing exportable remote freelance skills earning hard currency", bucket: "sound", feedback: "Insulates income against domestic depreciation." },
                    { id: "c4", label: "Taking high-interest loans to purchase depreciating luxury items", bucket: "vulnerable", feedback: "Drains future cash flow." }
                  ]
                },
                concepts: ["purchasing_power", "real_value", "exchange_rate"],
                authoring_status: "authored"
              },
              {
                id: "L07.CT2.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Chapter 2 Capstone Exam",
                subtitle: "Final comprehensive test for Chapter 2 covering purchasing power, inflation, and exchange rates.",
                quiz_mode: "lesson_final",
                questions: [
                  {
                    id: "L07.CT2.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "What is the primary reason why a country's currency steadily depreciates against major global currencies over a 10-year period?",
                    options: [
                      { id: "A", text: "The country persistently runs high domestic inflation and heavy trade deficits, importing far more than it exports." },
                      { id: "B", text: "The country prints too few banknotes." },
                      { id: "C", text: "Foreign countries ban the use of coins." }
                    ],
                    correct: "A",
                    explanation: "Persistent high inflation combined with persistent trade deficits continuously drives down the international value of a currency.",
                    concepts: ["exchange_rate", "inflation"]
                  },
                  {
                    id: "L07.CT2.G3.I04.Q2",
                    type: "single_choice",
                    prompt: "If your nominal salary increased from ₦300,000 to ₦360,000 (+20%) while the prices of your family's grocery and transport basket rose by 30%, what happened to your real standard of living?",
                    options: [
                      { id: "A", text: "Your real living standard declined by approximately 10% because price increases outpaced your raise." },
                      { id: "B", text: "Your real living standard increased by 20%." },
                      { id: "C", text: "Your real living standard stayed exactly the same." }
                    ],
                    correct: "A",
                    explanation: "Real change = 20% raise - 30% inflation = -10%. You have more paper money, but can purchase 10% less real goods.",
                    concepts: ["real_value", "nominal_value"]
                  },
                  {
                    id: "L07.CT2.G3.I04.Q3",
                    type: "true_false",
                    prompt: "Currency pass-through means that when the exchange rate depreciates, the price of imported goods—and local goods using imported inputs—rises in local stores.",
                    correct: true,
                    explanation: "True! Import costs flow directly through the supply chain into retail consumer prices.",
                    concepts: ["exchange_rate", "inflation"]
                  }
                ],
                concepts: ["exchange_rate", "real_value", "inflation", "purchasing_power"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  }
};

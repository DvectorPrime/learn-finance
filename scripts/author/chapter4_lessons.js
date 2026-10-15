// scripts/author/chapter4_lessons.js
// Chapter 4: How People Make Money Decisions
// Lessons: L12 (Irrational Decisions & Biases), L13 (Social Pressure & Lifestyle Inflation), L14 (Needs vs. Wants), L15 (Opportunity Cost)

module.exports = {
  // ==========================================
  // LESSON 12: WHY WE MAKE IRRATIONAL MONEY DECISIONS
  // ==========================================
  L12: {
    id: "L12",
    number: 12,
    title: "Why We Make Irrational Money Decisions: Cognitive Biases",
    subtitle: "Explore behavioural economics: why smart people make terrible financial choices, and how to outsmart your own brain.",
    difficulty: "Medium-High",
    contents: [
      {
        id: "L12.CT1",
        title: "The Emotional Brain vs. Financial Logic",
        objective: "Understand present bias, instant gratification, and the emotional triggers of fear and greed.",
        groups: [
          {
            id: "L12.CT1.G1",
            title: "Why Knowing Better Does Not Always Mean Doing Better",
            objective: "Examine the gap between financial literacy knowledge and real-world execution.",
            items: [
              {
                id: "L12.CT1.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The Accountant's Empty Bank Account",
                subtitle: "Why technical knowledge does not automatically cure emotional spending.",
                scenario: {
                  narrative: "Ifeanyi is a licensed chartered accountant who prepares corporate budgets of ₦500,000,000 daily for multinational companies. Yet in his personal life, Ifeanyi has ₦0 in personal savings, owes ₦400,000 across multiple retail debt apps, and habitually spends entire weekends buying expensive rounds of drinks for acquaintances at VIP lounges. When asked, he admits: 'At work I think with math; outside work I spend to escape stress.'",
                  characters: [
                    { name: "Ifeanyi", role: "Chartered Accountant", details: "Masters corporate finance at work, struggles with emotional personal spending" }
                  ],
                  data: [
                    { label: "Professional Skill", value: "Senior Corporate Auditor" },
                    { label: "Personal Savings Rate", value: "0%" },
                    { label: "Unsecured Consumer Debt", value: "₦400,000" },
                    { label: "Root Cause", value: "Emotional coping via spending" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What does Ifeanyi's experience demonstrate about financial management?",
                    options: [
                      { id: "A", label: "Managing money is primarily about emotional psychology and behavioral self-discipline, not just mathematical intelligence." },
                      { id: "B", label: "Accountants are legally forbidden from saving." },
                      { id: "C", label: "VIP drinks always appreciate in value." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Personal finance is 20% head knowledge and 80% behavioral habit. Knowing how compound interest works means nothing if your emotional impulses hijack your wallet every Friday evening.",
                key_takeaway: "Mastering money requires mastering your emotions, impulses, and daily behavioral habits.",
                concepts: ["behavioural_bias", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT1.G1.I02",
                kind: "slide",
                order: 2,
                title: "The Two Operating Systems of the Brain",
                subtitle: "Daniel Kahneman's System 1 vs. System 2.",
                body: [
                  {
                    type: "paragraph",
                    text: "Nobel laureate Daniel Kahneman revealed that our brains operate in two distinct modes:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "System 1 (Fast & Emotional): Automatic, instinctive, impulsive, seeking instant gratification. This system buys the designer shoes.",
                      "System 2 (Slow & Logical): Deliberate, analytical, calculating long-term consequences. This system designs the retirement budget."
                    ]
                  },
                  {
                    type: "callout",
                    text: "Retail stores and social media marketing are specifically engineered to trigger fast, emotional System 1 impulses before your logical System 2 can intervene."
                  }
                ],
                concepts: ["behavioural_bias"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT1.G1.I03",
                kind: "widget",
                order: 3,
                title: "Spending Trigger Audit",
                subtitle: "Identify your personal emotional spending vulnerabilities.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Emotional Trigger Audit",
                  buckets: [
                    { id: "emotional", label: "Emotional Spending Trigger" },
                    { id: "planned", label: "Deliberate Planned Purchase" }
                  ],
                  cards: [
                    { id: "c1", label: "Browsing e-commerce flash sales at 1:00 AM because of loneliness or boredom", bucket: "emotional", feedback: "Late-night retail browsing is driven by dopamine-seeking." },
                    { id: "c2", label: "Buying a replacement laptop battery after researching prices for two weeks", bucket: "planned", feedback: "Researched necessity purchases reflect System 2 discipline." },
                    { id: "c3", label: "Ordering expensive takeout meals because of feeling exhausted after work", bucket: "emotional", feedback: "Stress and exhaustion frequently trigger friction-reducing spending." },
                    { id: "c4", label: "Funding a scheduled monthly index fund transfer on payday", bucket: "planned", feedback: "Automated investing takes willpower out of the equation." }
                  ]
                },
                concepts: ["behavioural_bias", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT1.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Psychology of Money Quiz",
                subtitle: "Test your understanding of behavioral finance principles.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L12.CT1.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "Why do most people struggle with personal budgeting despite understanding basic arithmetic?",
                    options: [
                      { id: "A", text: "Because financial decisions are heavily influenced by emotional stress, dopamine rewards, social status, and impulsive habits." },
                      { id: "B", text: "Because numbers are too complicated to remember." },
                      { id: "C", text: "Because calculators are inaccurate." }
                    ],
                    correct: "A",
                    explanation: "Behavioral economics proves that emotional biases and psychological triggers overpower intellectual calculations.",
                    concepts: ["behavioural_bias"]
                  }
                ],
                concepts: ["behavioural_bias"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L12.CT1.G2",
            title: "Impulse Buying and Instant Gratification",
            objective: "Analyze present bias, dopamine loops, and the power of the 72-Hour Rule.",
            items: [
              {
                id: "L12.CT1.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Midnight Flash Sale",
                subtitle: "How countdown timers and limited-stock alerts hijack rational judgment.",
                scenario: {
                  narrative: "While scrolling social media at midnight, Sandra sees a flash-sale ad for an imported designer watch discounted from ₦85,000 to ₦45,000. A flashing digital timer warns: 'Sale ends in 14 minutes! Only 2 items left!' Heart racing with excitement, Sandra inputs her card details and completes the order. Two days later when the watch arrives, she leaves it in the box unopened, realizing she never needed a watch and now cannot afford her upcoming electricity bill.",
                  characters: [
                    { name: "Sandra", role: "Impulse Shopper", details: "Triggered by artificial urgency and dopamine rush" }
                  ],
                  data: [
                    { label: "Purchase Price", value: "₦45,000" },
                    { label: "Utility / Need Level", value: "Zero (Unopened in box)" },
                    { label: "Budget Deficit Created", value: "Overdue Electricity Bill" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What psychological trick did the online store use to bypass Sandra's logical thinking?",
                    options: [
                      { id: "A", label: "Artificial urgency and fear of missing out (FOMO) to trigger an immediate emotional impulse." },
                      { id: "B", label: "The store gave her free electricity." },
                      { id: "C", label: "The watch was an essential medicine." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Marketers intentionally use countdown timers, low-stock warnings, and anchor discounts to create panic. When the emotional brain feels scarcity, it bypasses logical budget constraints.",
                key_takeaway: "Never make non-essential financial commitments when feeling rushed, stressed, or emotionally excited.",
                concepts: ["behavioural_bias", "present_bias"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT1.G2.I02",
                kind: "slide",
                order: 2,
                title: "Present Bias and the 72-Hour Rule",
                subtitle: "Why tomorrow's security loses to today's dopamine.",
                body: [
                  {
                    type: "definition",
                    term: "Present Bias",
                    text: "The tendency of human beings to heavily overvalue immediate pleasure today while severely discounting future consequences and security."
                  },
                  {
                    type: "callout",
                    text: "The 72-Hour Rule: Whenever you feel a sudden impulse to buy a non-essential luxury item, force yourself to wait exactly 72 hours. In 80% of cases, the dopamine rush fades and you realize you do not need it."
                  }
                ],
                concepts: ["present_bias", "behavioural_bias"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT1.G2.I03",
                kind: "widget",
                order: 3,
                title: "Apply the 72-Hour Cooling-Off Rule",
                subtitle: "Simulate pausing on an impulse purchase and evaluate the outcome.",
                widget_type: "choice_with_reflection",
                config: {
                  prompt: "You see a luxury pair of sunglasses online for ₦55,000 on pay-day Friday. You feel an intense desire to buy it immediately. What is the smartest move?",
                  options: [
                    { id: "A", label: "Add it to a 72-hour wishlist and close the browser. If you still want it and have surplus budget on Monday, reconsider." },
                    { id: "B", label: "Buy it immediately on credit before someone else takes it." },
                    { id: "C", label: "Buy two pairs just in case one breaks." }
                  ],
                  follow_up_prompt: "How does creating a cooling-off buffer protect your long-term savings goals?"
                },
                concepts: ["present_bias", "behavioural_bias"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT1.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Impulse Control Quiz",
                subtitle: "Test your strategies for curbing impulse spending.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L12.CT1.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "What is 'Present Bias' in behavioural economics?",
                    options: [
                      { id: "A", text: "The psychological flaw of prioritizing immediate short-term gratification over superior long-term financial security." },
                      { id: "B", text: "A preference for giving birthday presents to family members." },
                      { id: "C", text: "The ability to accurately predict tomorrow's stock prices." }
                    ],
                    correct: "A",
                    explanation: "Present bias causes humans to choose a smaller immediate reward over a much larger future benefit.",
                    concepts: ["present_bias"]
                  }
                ],
                concepts: ["present_bias"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L12.CT1.G3",
            title: "Fear, Greed, and Financial Decisions",
            objective: "Analyze Ponzi schemes, get-rich-quick scams, and the dual emotional traps of fear and greed.",
            items: [
              {
                id: "L12.CT1.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The 'Guaranteed 50% Monthly' Scheme",
                subtitle: "How greed blinds otherwise intelligent investors to mathematical impossibility.",
                scenario: {
                  narrative: "An online platform called 'FastWealth Global' promises investors a 'guaranteed 50% return every 30 days via algorithmic Forex trading'. Austin watches his coworker withdraw ₦100,000 profit in the first month. Overcome by greed and fear of missing out, Austin withdraws his entire ₦3,000,000 life savings and deposits it into the scheme. In the third month, the platform website disappears, the founders vanish, and Austin loses every single kobo.",
                  characters: [
                    { name: "Austin", role: "Victim of Greed", details: "Invested entire life savings into an unsustainable Ponzi scheme" },
                    { name: "FastWealth Founders", role: "Fraudsters", details: "Paid early investors using new depositors' money before absconding" }
                  ],
                  data: [
                    { label: "Promised Monthly Yield", value: "50% Guaranteed" },
                    { label: "Annualized Rate", value: "> 12,000% APR (Impossible)" },
                    { label: "Austin Capital Loss", value: "₦3,000,000 (100% Total Loss)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What red flag should have alerted Austin that this was an illegal Ponzi fraud?",
                    options: [
                      { id: "A", label: "Any offering promising 'guaranteed' abnormally high returns with 'zero risk' is mathematically a scam." },
                      { id: "B", label: "The founders had foreign accents." },
                      { id: "C", label: "The website had blue colors." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "In real economics, risk and return are inseparable. No legitimate commercial enterprise or fund manager in human history can guarantee 50% monthly risk-free returns. Ponzi schemes pay early members using latecomers' capital until the pyramid inevitably collapses.",
                key_takeaway: "If an investment promises guaranteed high returns with zero risk, it is 100% guaranteed to be a scam.",
                concepts: ["behavioural_bias", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT1.G3.I02",
                kind: "slide",
                order: 2,
                title: "The Iron Law of Risk and Return",
                subtitle: "The foundational law of legitimate investing.",
                body: [
                  {
                    type: "paragraph",
                    text: "Legitimate finance obeys an unbreakable physical law:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Low Risk = Modest, Steady Returns (e.g. Government Treasury Bills).",
                      "Moderate Risk = Moderate Potential Growth (e.g. Blue-chip corporate equities, rental property).",
                      "High Potential Return = High Risk of Total Capital Loss (e.g. Early-stage startups, speculative commodities).",
                      "Guaranteed High Return + Zero Risk = FRAUD (Mathematically impossible)."
                    ]
                  }
                ],
                concepts: ["behavioural_bias", "asset"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT1.G3.I03",
                kind: "widget",
                order: 3,
                title: "Scam Detection Radar",
                subtitle: "Evaluate investment proposals for classic fraud red flags.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Investment Legitimacy Auditor",
                  buckets: [
                    { id: "legit", label: "Legitimate Investment" },
                    { id: "scam", label: "Fraudulent Scam Warning" }
                  ],
                  cards: [
                    { id: "c1", label: "Regulated mutual fund targeting 18% annual yield backed by corporate debt", bucket: "legit", feedback: "Transparent, regulated, and realistic yield." },
                    { id: "c2", label: "'Pay ₦50,000 and bring two friends to earn ₦200,000 next week'", bucket: "scam", feedback: "Classic referral pyramid scheme with no underlying product." },
                    { id: "c3", label: "Federal Government savings bond paying 16% coupon semi-annually", bucket: "legit", feedback: "Sovereign debt backed by government legal taxing authority." },
                    { id: "c4", label: "Anonymous Telegram crypto bot guaranteeing 10% daily automated profits", bucket: "scam", feedback: "Guaranteed extreme daily profits are 100% fraudulent." }
                  ]
                },
                concepts: ["behavioural_bias", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT1.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Scam Immunity Check",
                subtitle: "Test your ability to spot predatory financial traps.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L12.CT1.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "A company on social media claims: 'Invest ₦100,000 today and receive ₦50,000 every week guaranteed forever with zero risk.' What is the only rational conclusion?",
                    options: [
                      { id: "A", text: "It is an unsustainable fraudulent Ponzi scheme designed to steal depositor funds." },
                      { id: "B", text: "It is a breakthrough modern financial innovation." },
                      { id: "C", text: "It is an official government welfare initiative." }
                    ],
                    correct: "A",
                    explanation: "No legitimate business produces risk-free 50% weekly returns. Such promises are the hallmark of financial scams.",
                    concepts: ["behavioural_bias"]
                  }
                ],
                concepts: ["behavioural_bias"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L12.CT2.G1",
            title: "Herd Behaviour: Following Everybody Else",
            objective: "Understand social contagion, speculative bubbles, and independent decision-making.",
            items: [
              {
                id: "L12.CT2.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The Crypto Coin Hype Train",
                subtitle: "How fear of missing out drives buyers into assets they do not understand.",
                scenario: {
                  narrative: "A new meme cryptocurrency called 'RocketToken' surges by 1,000% in seven days. Social media influencers, taxi drivers, and college students are buzzing about it. Chidi knows nothing about blockchain or tokenomics, but seeing his friends brag about overnight gains, he uses his rent savings of ₦250,000 to buy RocketToken at its peak. The next morning, the founders dump their holdings, the coin crashes by 98%, and Chidi is left with ₦5,000.",
                  characters: [
                    { name: "Chidi", role: "Herd Follower", details: "Bought at the very peak solely because everyone else was talking about it" },
                    { name: "Speculative Insiders", role: "Pump-and-Dumpers", details: "Hyped the token before cashing out on late retail buyers" }
                  ],
                  data: [
                    { label: "Coin Surge", value: "+1,000% in 7 Days" },
                    { label: "Chidi Entry Point", value: "Absolute Market Peak" },
                    { label: "Crash Percentage", value: "-98% in 24 Hours" },
                    { label: "Chidi Remaining Capital", value: "₦5,000 (Loss of ₦245k)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What cognitive bias drove Chidi to buy a speculative coin at the top?",
                    options: [
                      { id: "A", label: "Herd behaviour and FOMO (buying simply because everyone around him was buying)." },
                      { id: "B", label: "A thorough review of audited financial statements." },
                      { id: "C", label: "His university professor assigned it as homework." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Herd behaviour is the psychological compulsion to follow the crowd. In financial markets, by the time the crowd—including casual acquaintances and influencers—is buzzing about an asset, the smart early money is already preparing to sell.",
                key_takeaway: "Never invest in any asset you do not deeply understand simply because others are making money.",
                concepts: ["herd_behaviour", "behavioural_bias"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT2.G1.I02",
                kind: "slide",
                order: 2,
                title: "The Anatomy of a Market Bubble",
                subtitle: "From smart money to retail euphoria and the inevitable crash.",
                body: [
                  {
                    type: "numbered_list",
                    items: [
                      "Smart Money Phase: Astute value investors identify an undervalued opportunity quietly.",
                      "Institutional Awareness: Professional funds enter; prices rise steadily.",
                      "Retail Euphoria / Herd Phase: The general public hears about it; media hype explodes; ordinary people buy without analysis.",
                      "The Crash: Smart money cashes out; prices collapse, leaving the herd with massive losses."
                    ]
                  }
                ],
                concepts: ["herd_behaviour", "behavioural_bias"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT2.G1.I03",
                kind: "widget",
                order: 3,
                title: "Evaluate an Investment Hype Scenario",
                subtitle: "Analyze whether an investment opportunity is grounded in fundamentals or herd euphoria.",
                widget_type: "choice_with_reflection",
                config: {
                  prompt: "Your social group chat is exploding with excitement about an unregistered agricultural trading platform promising 40% monthly returns. Everyone is posting screenshots of profits. What do you do?",
                  options: [
                    { id: "A", label: "Pause, conduct independent verification, demand audited financials, and refuse to commit capital based on hype." },
                    { id: "B", label: "Borrow money from your brother to put in as much cash as possible today." },
                    { id: "C", label: "Forward the link to all your family members immediately." }
                  ],
                  follow_up_prompt: "Why does social proof often lead to the biggest investment disasters?"
                },
                concepts: ["herd_behaviour", "behavioural_bias"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT2.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Identify Herd Behaviour",
                subtitle: "Test your ability to spot herd mentalities.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L12.CT2.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "What is 'Herd Behaviour' in investing?",
                    options: [
                      { id: "A", text: "The psychological tendency for individuals to mimic the financial actions of the majority rather than performing independent rational analysis." },
                      { id: "B", text: "Investing exclusively in cattle and sheep farming." },
                      { id: "C", text: "Working with a certified financial planner." }
                    ],
                    correct: "A",
                    explanation: "Herd behaviour leads people to buy at the top of bubbles out of FOMO and sell at the bottom out of panic.",
                    concepts: ["herd_behaviour"]
                  }
                ],
                concepts: ["herd_behaviour"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L12.CT2.G2",
            title: "Loss Aversion: Why Losing Hurts So Much",
            objective: "Understand loss aversion and the sunk cost fallacy.",
            items: [
              {
                id: "L12.CT2.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Unprofitable Commercial Bus",
                subtitle: "How the sunk cost fallacy keeps people throwing good money after bad.",
                scenario: {
                  narrative: "Musa bought a dilapidated used commercial minibus for ₦2,000,000. Over the past six months, the engine broke down four times, costing him ₦1,500,000 in continuous mechanical repairs. A qualified mechanic tells him honestly: 'This chassis is warped; it will never run reliably. Sell it for scrap for ₦800,000 and stop spending.' Musa refuses, saying: 'I have already put ₦3,500,000 into this bus! I cannot walk away now until I get my money back!' He spends another ₦500,000 on repairs, and the engine explodes a week later.",
                  characters: [
                    { name: "Musa", role: "Trapped Owner", details: "Blinded by the sunk cost fallacy and loss aversion" },
                    { name: "Mechanic", role: "Objective Advisor", details: "Advises cutting losses immediately" }
                  ],
                  data: [
                    { label: "Purchase Price", value: "₦2,000,000" },
                    { label: "Repairs Sunk", value: "₦1,500,000 + ₦500,000" },
                    { label: "Total Money Lost", value: "₦4,000,000" },
                    { label: "True Market Value", value: "₦800,000 Scrap" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What psychological trap caused Musa to waste an additional ₦500,000?",
                    options: [
                      { id: "A", label: "The Sunk Cost Fallacy: refusing to abandon a failing endeavor because of unrecoverable past investments." },
                      { id: "B", label: "He had too much spare cash." },
                      { id: "C", label: "Minibuses are legally required to be repaired forever." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Money already spent and unrecoverable is a 'sunk cost'. Rational financial decisions should be based solely on future costs and expected future benefits. Clinging to a losing investment just to avoid admitting a loss causes far deeper financial ruin.",
                key_takeaway: "Past unrecoverable expenses should never dictate future financial decisions. Cut your losses early.",
                concepts: ["sunk_cost_fallacy", "loss_aversion"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT2.G2.I02",
                kind: "slide",
                order: 2,
                title: "Loss Aversion: The 2-to-1 Asymmetry",
                subtitle: "Losing ₦10,000 hurts twice as much as gaining ₦10,000 feels good.",
                body: [
                  {
                    type: "definition",
                    term: "Loss Aversion",
                    text: "The psychological phenomenon where the emotional pain of losing an amount of money is perceived as roughly twice as intense as the joy of gaining that same amount."
                  },
                  {
                    type: "definition",
                    term: "Sunk Cost Fallacy",
                    text: "Continuing a doomed project, investment, or purchase simply because you have already invested money, time, or energy into it that cannot be recovered."
                  }
                ],
                concepts: ["loss_aversion", "sunk_cost_fallacy"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT2.G2.I03",
                kind: "widget",
                order: 3,
                title: "Sunk Cost Decision Checker",
                subtitle: "Decide whether to cut losses or continue funding failing projects.",
                widget_type: "choice_with_reflection",
                config: {
                  prompt: "You paid a non-refundable ₦40,000 deposit for a coding bootcamp that turns out to be completely disorganized, with no teacher and stolen slides. To continue, they demand another ₦100,000. What is the rational economic decision?",
                  options: [
                    { id: "A", label: "Cut your losses: walk away from the ₦40,000 sunk cost and invest your remaining ₦100,000 in a reputable, verified course." },
                    { id: "B", label: "Pay the extra ₦100,000 just so your initial ₦40,000 doesn't feel 'wasted'." },
                    { id: "C", label: "Wait five years for the bootcamp to improve." }
                  ],
                  follow_up_prompt: "Why is walking away from a bad investment often the most profitable move you can make?"
                },
                concepts: ["sunk_cost_fallacy", "loss_aversion"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT2.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Identify Loss Aversion",
                subtitle: "Test your understanding of loss aversion and sunk costs.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L12.CT2.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "An investor bought shares at ₦100 each. The company's business model collapsed, and the shares now trade at ₦20. Competitors are thriving. The investor refuses to sell because 'I cannot sell at a loss.' What bias is being exhibited?",
                    options: [
                      { id: "A", text: "Loss Aversion and the Sunk Cost Fallacy: refusing to acknowledge an economic reality to avoid emotional pain." },
                      { id: "B", text: "Masterful long-term compound investing." },
                      { id: "C", text: "Diversified portfolio allocation." }
                    ],
                    correct: "A",
                    explanation: "Holding on to a dead business just to avoid booking a paper loss prevents redeploying remaining capital into growing opportunities.",
                    concepts: ["loss_aversion", "sunk_cost_fallacy"]
                  }
                ],
                concepts: ["loss_aversion", "sunk_cost_fallacy"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L12.CT2.G3",
            title: "Anchoring and Misleading Comparisons",
            objective: "Examine how pricing anchors and artificial reference points trick consumers into perceived bargains.",
            items: [
              {
                id: "L12.CT2.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Struck-Through Price Tag",
                subtitle: "How a fake original price tricks your brain into seeing an irresistible bargain.",
                scenario: {
                  narrative: "A boutique displays a leather jacket with a prominent red price tag: '~₦120,000~ NOW ONLY ₦45,000! (Save ₦75,000!)'. Kelechi feels he is getting an incredible deal and buys it immediately. In reality, the boutique never sold the jacket for ₦120,000; the jacket cost ₦18,000 wholesale and was always intended to sell at ₦45,000.",
                  characters: [
                    { name: "Kelechi", role: "Shopper", details: "Anchored to the fictitious ₦120,000 original price" },
                    { name: "Boutique", role: "Retailer", details: "Using price anchoring to manufacture perceived value" }
                  ],
                  data: [
                    { label: "Fabricated Anchor", value: "₦120,000" },
                    { label: "Actual Retail Price", value: "₦45,000" },
                    { label: "Real Wholesale Cost", value: "₦18,000" },
                    { label: "Consumer Illusion", value: "'I saved ₦75,000!'" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Did Kelechi actually 'save' ₦75,000?",
                    options: [
                      { id: "A", label: "No; he spent ₦45,000 of real cash on a jacket. You only save money when you don't spend it." },
                      { id: "B", label: "Yes, his bank account gained ₦75,000." },
                      { id: "C", label: "The store gave him cash back." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "This is classic Anchoring Bias. The store planted '₦120,000' in Kelechi's mind as the reference point, making ₦45,000 feel like a steal. In reality, Kelechi didn't save ₦75,000; his net worth decreased by ₦45,000.",
                key_takeaway: "You do not save money by buying discounted items; you only save money when cash stays in your account.",
                concepts: ["anchoring_bias", "behavioural_bias"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT2.G3.I02",
                kind: "slide",
                order: 2,
                title: "What Is Anchoring Bias?",
                subtitle: "The gravitational pull of the first number you see.",
                body: [
                  {
                    type: "definition",
                    term: "Anchoring Bias",
                    text: "The cognitive tendency to rely disproportionately on the first piece of information encountered (the 'anchor') when making decisions or estimating value."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Negotiations: The party who names the first price sets the mental anchor for all counter-offers.",
                      "Retail Menus: Restaurants place an absurdly expensive ₦45,000 steak at the top of the menu so the ₦18,000 chicken looks reasonable.",
                      "Always evaluate an item based on its intrinsic utility to you, completely ignoring the vendor's 'original' price tag."
                    ]
                  }
                ],
                concepts: ["anchoring_bias"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT2.G3.I03",
                kind: "widget",
                order: 3,
                title: "Anchor Evaluation Simulator",
                subtitle: "Evaluate purchasing options by focusing on real utility rather than fake discount percentages.",
                widget_type: "option_comparison",
                config: {
                  title: "Real Utility vs. Anchored Discount",
                  option_a: {
                    name: "Anchored 'Discount' Deal",
                    attributes: {
                      "Stated Original Price": "₦150,000",
                      "Discounted Price": "₦65,000",
                      "Utility to Your Life": "Low (bought solely because of discount)",
                      "Net Wealth Impact": "-₦65,000 Outflow"
                    }
                  },
                  option_b: {
                    name: "Disciplined Walking Away",
                    attributes: {
                      "Stated Original Price": "N/A",
                      "Price Paid": "₦0",
                      "Utility to Your Life": "Zero clutter",
                      "Net Wealth Impact": "₦65,000 Retained in Savings"
                    }
                  }
                },
                concepts: ["anchoring_bias", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT2.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Identify the Anchor",
                subtitle: "Test your ability to spot price anchors.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L12.CT2.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "A car salesman shows you a vehicle with a window sticker of ₦15,000,000, and after five minutes offers it to you for 'a special deal of ₦12,500,000'. What psychological tactic did the salesman employ?",
                    options: [
                      { id: "A", text: "Price anchoring: setting ₦15M as the mental baseline so ₦12.5M feels like an exceptional bargain." },
                      { id: "B", text: "Giving away company cars at a loss." },
                      { id: "C", text: "Charity philanthropy." }
                    ],
                    correct: "A",
                    explanation: "The salesman anchored your expectations high so the actual price would look attractive.",
                    concepts: ["anchoring_bias"]
                  }
                ],
                concepts: ["anchoring_bias"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L12.CT2.G4",
            title: "Recognising Bias Before Making a Decision",
            objective: "Synthesize cognitive bias defense systems into an actionable personal checklist.",
            items: [
              {
                id: "L12.CT2.G4.I01",
                kind: "case_study",
                order: 1,
                title: "The Triple-Biased Shopper",
                subtitle: "Observe an emotional sales funnel in real time.",
                scenario: {
                  narrative: "Yemi walks into an electronics mall. The salesman tells him: 'This TV is normally ~₦800,000~, today only ₦500,000 (Anchor!). Everyone in your neighborhood is buying this exact model (Herd Behavior!). If you don't take it in the next 10 minutes, another customer will get it (Artificial Urgency!). Plus, since you already spent ₦20,000 taking an Uber to come here, you might as well buy (Sunk Cost!)'. Yemi recognizes all four biases and walks out empty-handed.",
                  characters: [
                    { name: "Yemi", role: "Trained Financial Thinker", details: "Identifies and neutralizes four sales manipulation biases" },
                    { name: "Salesman", role: "High-Pressure Retailer", details: "Stacking cognitive biases to force immediate purchase" }
                  ],
                  data: [
                    { label: "Anchor Used", value: "₦800,000 Stated Price" },
                    { label: "Social Proof Used", value: "Everyone is buying" },
                    { label: "Urgency Used", value: "10-minute deadline" },
                    { label: "Yemi's Defense", value: "System 2 Pausing & Walking Away" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "How did Yemi successfully protect his ₦500,000?",
                    options: [
                      { id: "A", label: "He paused, detached his emotions, identified the sales manipulation tactics, and evaluated his true needs." },
                      { id: "B", label: "He broke the TV screen." },
                      { id: "C", label: "He called the fire brigade." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Recognizing behavioral biases in real time is like developing financial superpowers. When you see retail tactics as psychological triggers rather than genuine opportunities, you take total command of your money.",
                key_takeaway: "Pause before committing capital. Awareness of cognitive bias is the ultimate financial shield.",
                concepts: ["behavioural_bias", "anchoring_bias", "herd_behaviour", "sunk_cost_fallacy"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT2.G4.I02",
                kind: "slide",
                order: 2,
                title: "The 4-Step Bias Defense Checklist",
                subtitle: "Run every major financial decision through these four filters.",
                body: [
                  {
                    type: "numbered_list",
                    items: [
                      "Pause for 72 Hours: Disengage the dopamine-driven emotional brain (neutralizes Present Bias).",
                      "Ignore Stated Discounts: Ask: 'Would I pay this exact cash price if there were no discount tag?' (neutralizes Anchoring).",
                      "Ignore the Crowd: Ask: 'Am I buying this because of sound fundamentals, or because my friends are boasting?' (neutralizes Herd Behaviour).",
                      "Disregard Past Costs: Treat past unrecoverable money as gone; evaluate only future benefits (neutralizes Sunk Cost Fallacy)."
                    ]
                  }
                ],
                concepts: ["behavioural_bias", "anchoring_bias", "herd_behaviour", "present_bias"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT2.G4.I03",
                kind: "widget",
                order: 3,
                title: "Bias Diagnostic Tool",
                subtitle: "Match a financial error with its underlying cognitive bias.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Cognitive Bias Diagnostic Matcher",
                  buckets: [
                    { id: "present_bias", label: "Present Bias" },
                    { id: "sunk_cost", label: "Sunk Cost Fallacy" },
                    { id: "anchoring", label: "Anchoring Bias" },
                    { id: "herd", label: "Herd Behaviour" }
                  ],
                  cards: [
                    { id: "c1", label: "Emptying your savings account to buy an expensive outfit for this weekend's party", bucket: "present_bias", feedback: "Prioritizing instant gratification over future security." },
                    { id: "c2", label: "Pouring another ₦100,000 into a broken generator because you already spent ₦200,000 on it", bucket: "sunk_cost", feedback: "Clinging to an unrecoverable past expense." },
                    { id: "c3", label: "Feeling thrilled to buy a ₦30,000 shirt because the tag said '~₦90,000~'", bucket: "anchoring", feedback: "Fixating on a fictitious original reference number." },
                    { id: "c4", label: "Putting money into an unvetted crypto coin because your entire office chat is talking about it", bucket: "herd", feedback: "Blindly following the crowd out of FOMO." }
                  ]
                },
                concepts: ["behavioural_bias", "anchoring_bias", "herd_behaviour", "present_bias", "sunk_cost_fallacy"],
                authoring_status: "authored"
              },
              {
                id: "L12.CT2.G4.I04",
                kind: "quiz",
                order: 4,
                title: "Lesson 12 Comprehensive Exam",
                subtitle: "Final examination testing mastery of behavioral finance and cognitive biases.",
                quiz_mode: "lesson_final",
                questions: [
                  {
                    id: "L12.CT2.G4.I04.Q1",
                    type: "single_choice",
                    prompt: "Which psychological trap occurs when someone refuses to walk away from a disastrous business partnership simply because they already spent two years and millions of Naira on it?",
                    options: [
                      { id: "A", text: "The Sunk Cost Fallacy" },
                      { id: "B", text: "Anchoring Bias" },
                      { id: "C", text: "Compound Interest" }
                    ],
                    correct: "A",
                    explanation: "The sunk cost fallacy occurs when unrecoverable past investments cause individuals to make irrational continuing commitments.",
                    concepts: ["sunk_cost_fallacy", "behavioural_bias"]
                  }
                ],
                concepts: ["behavioural_bias", "sunk_cost_fallacy"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // LESSON 13: SOCIAL PRESSURE AND LIFESTYLE INFLATION
  // ==========================================
  L13: {
    id: "L13",
    number: 13,
    title: "Social Pressure and Lifestyle Inflation",
    subtitle: "Conquer peer comparison, social media curated wealth, and the dangerous habit of lifestyle inflation.",
    difficulty: "Medium",
    contents: [
      {
        id: "L13.CT1",
        title: "Spending to Keep Up",
        objective: "Understand conspicuous consumption, social comparison traps, and how lifestyle creep destroys wealth accumulation.",
        groups: [
          {
            id: "L13.CT1.G1",
            title: "When Your Friends Set the Standard",
            objective: "Analyze peer spending pressure and learn diplomatic strategies to protect your financial boundaries.",
            items: [
              {
                id: "L13.CT1.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The ₦40,000 Group Dinner Dilemma",
                subtitle: "When joining friends at an upscale restaurant wrecks a monthly budget.",
                scenario: {
                  narrative: "Titi earns ₦160,000 monthly as an executive assistant. Her university friends, who work in high-paying multinational tech companies, invite her to a birthday dinner at an exclusive Victoria Island lounge. When the final bill is split equally among everyone, Titi's share is ₦42,000—more than 25% of her entire monthly salary. Too embarrassed to speak up, she pays with her rent savings and spends the next three weeks eating plain noodles.",
                  characters: [
                    { name: "Titi", role: "Modest Earner", details: "Earns ₦160k/mo; pressured into ₦42k single dinner" },
                    { name: "Tech Friends", role: "High Earners", details: "Earn ₦800k/mo; ₦42k is a trivial 5% expense for them" }
                  ],
                  data: [
                    { label: "Titi Monthly Net Pay", value: "₦160,000" },
                    { label: "One Dinner Cost", value: "₦42,000 (26% of Income)" },
                    { label: "Budget Impact", value: "Drained entire month's grocery & rent buffer" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What should Titi do to handle peer dining invitations in the future?",
                    options: [
                      { id: "A", label: "Establish clear financial boundaries: propose affordable hangouts, attend only for drinks, or politely decline without shame." },
                      { id: "B", label: "Take loans to sponsor the next dinner." },
                      { id: "C", label: "Never speak to any friends again." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Comparison is the thief of joy and the destroyer of wealth. Spending money you cannot afford to impress people who are not paying your bills is a guaranteed recipe for financial anxiety.",
                key_takeaway: "True friends respect financial boundaries. Never compromise your future to match someone else's budget.",
                concepts: ["lifestyle_inflation", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L13.CT1.G1.I02",
                kind: "slide",
                order: 2,
                title: "The Comparison Trap",
                subtitle: "Running another person's financial race.",
                body: [
                  {
                    type: "paragraph",
                    text: "Every individual has unique financial goals, family obligations, and income realities."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Your friend may have wealthy parents funding their rent behind the scenes.",
                      "Your friend may be deep in secret, suffocating credit card debt.",
                      "Adopting someone else's lifestyle without their balance sheet leads directly to financial ruin."
                    ]
                  }
                ],
                concepts: ["lifestyle_inflation", "conspicuous_consumption"],
                authoring_status: "authored"
              },
              {
                id: "L13.CT1.G1.I03",
                kind: "widget",
                order: 3,
                title: "Peer Pressure Boundary Simulator",
                subtitle: "Select the most diplomatic and financially sound response to expensive social invitations.",
                widget_type: "choice_with_reflection",
                config: {
                  prompt: "Your peer group plans a weekend beach resort trip costing ₦80,000 each. It does not fit your current budget. What is the best response?",
                  options: [
                    { id: "A", label: "'That sounds amazing, but it's outside my savings budget right now. I'd love to catch up with everyone for casual coffee next week!'" },
                    { id: "B", label: "Borrow money from a loan app so they don't think you are broke." },
                    { id: "C", label: "Lie and say you have malaria to avoid the conversation." }
                  ],
                  follow_up_prompt: "Why does being transparent and confident about your financial priorities earn more real respect than pretending to be rich?"
                },
                concepts: ["lifestyle_inflation", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L13.CT1.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Peer Spending Quiz",
                subtitle: "Test your ability to navigate social financial pressure.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L13.CT1.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "What is 'conspicuous consumption' in economics?",
                    options: [
                      { id: "A", text: "Spending money on luxury goods and services primarily to publicly display social status and wealth to others." },
                      { id: "B", text: "Buying groceries in large wholesale quantities." },
                      { id: "C", text: "Paying electric utility bills on time." }
                    ],
                    correct: "A",
                    explanation: "Conspicuous consumption is buying items not for practical utility, but to broadcast prestige and status.",
                    concepts: ["conspicuous_consumption"]
                  }
                ],
                concepts: ["conspicuous_consumption"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L13.CT1.G2",
            title: "Social Media and Financial Expectations",
            objective: "Deconstruct curated online lifestyles and separate displayed wealth from true net worth.",
            items: [
              {
                id: "L13.CT1.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Influencer's Rented Lifestyle",
                subtitle: "Behind the curtain of private jets and five-star luxury vacations.",
                scenario: {
                  narrative: "Femi follows an online lifestyle influencer who posts daily photos posing in designer outfits, luxury sports cars, and first-class flights. Femi feels inadequate about his own modest lifestyle and begins spending ₦150,000 monthly on designer clothes to look successful online. Later, a viral documentary reveals the influencer was drowning in ₦50,000,000 of debt, rented sports cars by the hour for photos, and was facing court eviction.",
                  characters: [
                    { name: "Femi", role: "Social Media Follower", details: "Fell into debt trying to emulate a fabricated internet lifestyle" },
                    { name: "Online Influencer", role: "Curated Persona", details: "Projected multi-millionaire lifestyle while deeply insolvent" }
                  ],
                  data: [
                    { label: "Online Image", value: "Billionaire Luxury" },
                    { label: "Real Balance Sheet", value: "-₦50M Net Worth (Insolvent)" },
                    { label: "Femi's Wasted Cash", value: "₦1,800,000 in Clothes" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What fundamental financial truth does this case illustrate?",
                    options: [
                      { id: "A", label: "Visible spending is the easiest thing to fake; real wealth is quiet and hidden in investment assets." },
                      { id: "B", label: "Everyone on Instagram is a certified billionaire." },
                      { id: "C", label: "Renting sports cars is a sound investment strategy." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Social media shows the highlight reel of consumption, never the balance sheet of debt. Author Morgan Housel noted: 'Spending money to show people how much money you have is the fastest way to have less money.'",
                key_takeaway: "Never judge your financial journey against someone else's curated internet highlight reel.",
                concepts: ["conspicuous_consumption", "money_vs_wealth"],
                authoring_status: "authored"
              },
              {
                id: "L13.CT1.G2.I02",
                kind: "slide",
                order: 2,
                title: "Real Wealth vs. Displayed Wealth",
                subtitle: "The contrast between being rich and looking rich.",
                body: [
                  {
                    type: "table",
                    columns: ["Looking Rich (Conspicuous Consumption)", "Being Truly Wealthy (High Net Worth)"],
                    rows: [
                      ["Drives leased luxury car with high monthly debt", "Drives modest, reliable paid-off vehicle"],
                      ["Wears expensive designer logo apparel", "Prioritizes comfortable, durable clothing"],
                      ["Zero emergency fund; one paycheck from crisis", "6 to 12 months liquid cash reserves"],
                      ["Spends 99% of income on visual spectacle", "Invests 30%+ of income into income-producing assets"]
                    ]
                  }
                ],
                concepts: ["money_vs_wealth", "conspicuous_consumption"],
                authoring_status: "authored"
              },
              {
                id: "L13.CT1.G2.I03",
                kind: "widget",
                order: 3,
                title: "Social Media Reality Check",
                subtitle: "Separate real financial assets from cosmetic social displays.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Wealth Reality Checker",
                  buckets: [
                    { id: "real", label: "Real Financial Asset (Builds Wealth)" },
                    { id: "cosmetic", label: "Cosmetic Display (Drains Wealth)" }
                  ],
                  cards: [
                    { id: "c1", label: "₦5,000,000 diversified corporate stock portfolio producing quarterly dividends", bucket: "real", feedback: "Productive equity that compounds value and generates cash." },
                    { id: "c2", label: "Spending ₦800,000 on VIP bottle sparklers at a nightclub for Instagram stories", bucket: "cosmetic", feedback: "Liquid cash burned in minutes purely for public display." },
                    { id: "c3", label: "Owning a titled residential duplex generating steady rental income", bucket: "real", feedback: "Tangible real estate asset providing recurring cash flow." },
                    { id: "c4", label: "Buying the newest ₦1.8M smartphone every 12 months on credit", bucket: "cosmetic", feedback: "Depreciating consumer electronic purchased for status." }
                  ]
                },
                concepts: ["money_vs_wealth", "conspicuous_consumption"],
                authoring_status: "authored"
              },
              {
                id: "L13.CT1.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Social Media Wealth Quiz",
                subtitle: "Assess your immunity to online financial illusion.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L13.CT1.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "Why is visible luxury consumption a poor indicator of someone's actual financial net worth?",
                    options: [
                      { id: "A", text: "Because luxury items can easily be financed through high-interest debt, leaving the buyer with negative real net worth." },
                      { id: "B", text: "Because billionaires are legally prohibited from buying luxury goods." },
                      { id: "C", text: "Because clothes and cars have no monetary value." }
                    ],
                    correct: "A",
                    explanation: "Anyone can lease or borrow to look wealthy on the outside while being financially insolvent on the inside.",
                    concepts: ["conspicuous_consumption", "net_worth"]
                  }
                ],
                concepts: ["conspicuous_consumption"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L13.CT1.G3",
            title: "The Pressure to Look Successful and Lifestyle Inflation",
            objective: "Recognize lifestyle inflation (lifestyle creep) and master the 50% Raise Rule.",
            items: [
              {
                id: "L13.CT1.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Promotion That Disappeared",
                subtitle: "How increasing spending alongside every raise keeps you trapped.",
                scenario: {
                  narrative: "Babatunde was promoted from Junior Analyst (salary: ₦180,000) to Senior Associate (salary: ₦450,000)—a massive ₦270,000 monthly raise. Immediately, he upgraded to a luxury serviced apartment (extra ₦150,000/mo), bought a financed SUV (extra ₦80,000/mo), and started dining at upscale restaurants (extra ₦40,000/mo). Twelve months later, Babatunde has the exact same ₦0 monthly savings rate as when he was a junior analyst.",
                  characters: [
                    { name: "Babatunde", role: "Promoted Professional", details: "Expanded lifestyle expenses to consume 100% of his ₦270,000 raise" }
                  ],
                  data: [
                    { label: "Old Salary", value: "₦180,000 (Saved ₦0)" },
                    { label: "New Salary", value: "₦450,000 (+150%)" },
                    { label: "New Monthly Expenses", value: "₦450,000 (Saved ₦0)" },
                    { label: "Net Wealth Growth", value: "₦0 (Trapped in Lifestyle Inflation)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What financial phenomenon caused Babatunde's ₦270,000 raise to vanish without building wealth?",
                    options: [
                      { id: "A", label: "Lifestyle Inflation (Lifestyle Creep): increasing expenses in exact proportion to rising income." },
                      { id: "B", label: "His bank deducted a 100% tax." },
                      { id: "C", label: "His salary was paid in counterfeit currency." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Lifestyle inflation is the silent killer of wealth for middle- and high-income earners. If every raise is immediately absorbed by a more expensive car, bigger rent, and fancier dining, you remain trapped on the financial hamster wheel forever.",
                key_takeaway: "Wealth is created by maintaining the gap between what you earn and what you spend.",
                concepts: ["lifestyle_inflation", "saving"],
                authoring_status: "authored"
              },
              {
                id: "L13.CT1.G3.I02",
                kind: "slide",
                order: 2,
                title: "The 50% Raise Rule",
                subtitle: "How to enjoy promotions while accelerating financial freedom.",
                body: [
                  {
                    type: "paragraph",
                    text: "You do not have to live like a monk forever. When you receive a raise, use the '50% Rule':"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "50% of the raise: Allocate toward lifestyle upgrades and personal enjoyment.",
                      "50% of the raise: Automatically redirect toward investments, debt reduction, and emergency reserves."
                    ]
                  },
                  {
                    type: "callout",
                    text: "By saving half of every raise before you see it in your checking account, your wealth automatically compounds while your lifestyle steadily improves."
                  }
                ],
                concepts: ["lifestyle_inflation", "budget", "saving"],
                authoring_status: "authored"
              },
              {
                id: "L13.CT1.G3.I03",
                kind: "widget",
                order: 3,
                title: "The 50% Raise Allocator",
                subtitle: "Calculate how to split your next promotion between lifestyle and compounding investments.",
                widget_type: "numeric_calculator",
                config: {
                  title: "Raise Allocation Simulator",
                  default_inputs: {
                    current_salary: 250000,
                    new_salary: 400000,
                    investment_share_percent: 50
                  },
                  formula_display: "Investment Addition = (New Salary - Current Salary) × 50%"
                },
                concepts: ["lifestyle_inflation", "saving"],
                authoring_status: "authored"
              },
              {
                id: "L13.CT1.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Lesson 13 Capstone Quiz",
                subtitle: "Final quiz on social spending and lifestyle inflation.",
                quiz_mode: "lesson_final",
                questions: [
                  {
                    id: "L13.CT1.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "What is 'Lifestyle Inflation'?",
                    options: [
                      { id: "A", text: "The tendency to increase spending and recurring luxuries in lockstep with every increase in income, preventing wealth accumulation." },
                      { id: "B", text: "A general rise in the price of food in supermarkets." },
                      { id: "C", text: "The cost of inflating car tires." }
                    ],
                    correct: "A",
                    explanation: "Lifestyle inflation traps high earners in a perpetual paycheck-to-paycheck cycle because expenses expand to meet income.",
                    concepts: ["lifestyle_inflation"]
                  }
                ],
                concepts: ["lifestyle_inflation"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // LESSON 14: NEEDS, WANTS, AND TRADE-OFFS
  // ==========================================
  L14: {
    id: "L14",
    number: 14,
    title: "Needs, Wants, and Financial Trade-offs",
    subtitle: "Distinguish genuine survival essentials from discretionary desires, and master trade-offs under limited budgets.",
    difficulty: "Medium",
    contents: [
      {
        id: "L14.CT1",
        title: "What Do You Actually Need?",
        objective: "Differentiate essential living expenses from discretionary desires across varying life contexts.",
        groups: [
          {
            id: "L14.CT1.G1",
            title: "Needs vs. Wants",
            objective: "Define physiological needs vs comfort and status desires.",
            items: [
              {
                id: "L14.CT1.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The ₦150,000 Student Budget Dilemma",
                subtitle: "Classifying expenses when resources are strictly limited.",
                scenario: {
                  narrative: "Uche has ₦50,000 remaining for the final month of the university semester. He lists what he thinks he 'needs': textbook handouts (₦12,000), basic food groceries (₦22,000), monthly hostel electricity (₦6,000), a trending graphic hoodie (₦18,000), and weekly club outings with friends (₦15,000). His total wishlist comes to ₦73,000—₦23,000 more than his available cash.",
                  characters: [
                    { name: "Uche", role: "Student", details: "Has ₦50,000 budget; wishlist totals ₦73,000" }
                  ],
                  data: [
                    { label: "Available Cash", value: "₦50,000" },
                    { label: "True Essentials (Food, Books, Power)", value: "₦40,000" },
                    { label: "Discretionary Wants (Hoodie, Outings)", value: "₦33,000" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Which items are genuine non-negotiable needs for Uche to finish the semester successfully?",
                    options: [
                      { id: "A", label: "Textbook handouts, basic food groceries, and hostel electricity (₦40,000 total)." },
                      { id: "B", label: "The graphic hoodie and club outings." },
                      { id: "C", label: "All items are equally life-threatening necessities." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "A 'Need' is something essential for survival, basic health, safety, and legal/academic standing. A 'Want' is something that enhances comfort, entertainment, or status. By funding true needs (₦40,000) first, Uche survives with a ₦10,000 safety cushion.",
                key_takeaway: "Funding true needs first prevents financial crises and debt traps.",
                concepts: ["needs_vs_wants", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT1.G1.I02",
                kind: "slide",
                order: 2,
                title: "The Boundary Between Needs and Wants",
                subtitle: "Survival essentials vs discretionary upgrades.",
                body: [
                  {
                    type: "definition",
                    term: "Need",
                    text: "A fundamental expenditure required for survival, safety, shelter, basic nutrition, and basic employment functioning."
                  },
                  {
                    type: "definition",
                    term: "Want",
                    text: "An expenditure that satisfies a personal desire, boosts comfort, provides entertainment, or projects social status, but is not vital to survival."
                  },
                  {
                    type: "callout",
                    text: "Be careful: Marketers excel at disguising 'wants' as 'needs'. A reliable smartphone for work is a need; upgrading to the newest titanium flagship phone every October is a want."
                  }
                ],
                concepts: ["needs_vs_wants"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT1.G1.I03",
                kind: "widget",
                order: 3,
                title: "Need vs. Want Sorter",
                subtitle: "Classify items into True Needs vs Discretionary Wants.",
                widget_type: "need_want_sorter",
                config: {
                  title: "Needs vs Wants Classifier",
                  cards: [
                    { id: "c1", label: "Basic clean drinking water and rice groceries", category: "need", feedback: "Essential nutrition is a biological necessity." },
                    { id: "c2", label: "Subscribing to 4 different video streaming services simultaneously", category: "want", feedback: "Entertainment subscriptions are discretionary." },
                    { id: "c3", label: "Prescription medication for chronic illness", category: "need", feedback: "Vital for health and physical survival." },
                    { id: "c4", label: "Designer sneaker collection", category: "want", feedback: "Luxury footwear satisfies status desires." }
                  ]
                },
                concepts: ["needs_vs_wants"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT1.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Needs vs. Wants Quiz",
                subtitle: "Test your ability to differentiate essential from optional spending.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L14.CT1.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "Which of the following is the best example of a genuine financial NEED for a remote software engineer?",
                    options: [
                      { id: "A", text: "A dependable internet broadband connection and working laptop" },
                      { id: "B", text: "A gold-plated mechanical keyboard" },
                      { id: "C", text: "Daily gourmet coffee delivery" }
                    ],
                    correct: "A",
                    explanation: "Reliable internet and computer equipment are mandatory working tools to generate income.",
                    concepts: ["needs_vs_wants"]
                  }
                ],
                concepts: ["needs_vs_wants"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L14.CT1.G2",
            title: "Essential Expenses and Discretionary Spending",
            objective: "Implement the 50/30/20 budgeting framework to balance survival, desires, and savings.",
            items: [
              {
                id: "L14.CT1.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Household Monthly Audit",
                subtitle: "Applying the 50/30/20 rule to an entry-level professional salary.",
                scenario: {
                  narrative: "Chidinma earns ₦200,000 net monthly. Before budgeting, she constantly ran out of money by day 20. She decides to implement the 50/30/20 rule: 50% for Needs (₦100,000 for rent, groceries, transport), 30% for Wants (₦60,000 for dining out, movies, hobbies), and 20% for Savings & Debt payoff (₦40,000). For the first time in her career, she ends the month with savings intact.",
                  characters: [
                    { name: "Chidinma", role: "Junior Analyst", details: "Restructured personal finances using 50/30/20" }
                  ],
                  data: [
                    { label: "Net Monthly Income", value: "₦200,000" },
                    { label: "50% Needs Allocation", value: "₦100,000" },
                    { label: "30% Wants Allocation", value: "₦60,000" },
                    { label: "20% Wealth Allocation", value: "₦40,000 (Savings & Investments)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What is the primary strength of the 50/30/20 budgeting rule?",
                    options: [
                      { id: "A", label: "It guarantees that savings happen automatically while still allowing guilt-free enjoyment within defined limits." },
                      { id: "B", label: "It eliminates the need to pay rent." },
                      { id: "C", label: "It doubles your gross salary." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "A budget should not be a financial straightjacket that bans all fun. The 50/30/20 rule creates balance: it protects your future (20%), covers your essentials (50%), and allows guilt-free personal enjoyment (30%) without risking insolvency.",
                key_takeaway: "Budgeting creates freedom by designating guilt-free spending limits for wants.",
                concepts: ["budget", "needs_vs_wants", "saving"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT1.G2.I02",
                kind: "slide",
                order: 2,
                title: "The 50/30/20 Budget Blueprint",
                subtitle: "The world's most popular personal budgeting system.",
                body: [
                  {
                    type: "bullet_list",
                    items: [
                      "50% Needs: Rent, groceries, transport, utilities, minimum loan payments.",
                      "30% Wants: Dining out, leisure, vacations, premium entertainment, new clothes.",
                      "20% Savings: Emergency fund cash, retirement index funds, debt acceleration."
                    ]
                  },
                  {
                    type: "callout",
                    text: "In high-cost cities, some people adjust this to 60/20/20 or 70/10/20. The non-negotiable rule is: always save at least 15% to 20% before touching discretionary wants."
                  }
                ],
                concepts: ["budget", "saving"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT1.G2.I03",
                kind: "widget",
                order: 3,
                title: "50/30/20 Budget Calculator",
                subtitle: "Input your monthly income to generate your personal 50/30/20 allocation targets.",
                widget_type: "numeric_calculator",
                config: {
                  title: "50/30/20 Allocator",
                  default_inputs: {
                    monthly_take_home_pay: 240000
                  },
                  formula_display: "Needs = 50% | Wants = 30% | Savings = 20%"
                },
                concepts: ["budget", "saving"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT1.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Budget Priorities Quiz",
                subtitle: "Test your understanding of the 50/30/20 framework.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L14.CT1.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "Under the standard 50/30/20 budgeting rule, what percentage of net income is dedicated to long-term savings, debt elimination, and investing?",
                    options: [
                      { id: "A", text: "20%" },
                      { id: "B", text: "50%" },
                      { id: "C", text: "0%" }
                    ],
                    correct: "A",
                    explanation: "20% of net income is reserved for building emergency reserves, paying down debt, and investing for wealth.",
                    concepts: ["budget", "saving"]
                  }
                ],
                concepts: ["budget"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L14.CT1.G3",
            title: "Why Context Matters",
            objective: "Recognize that needs and wants shift depending on career, geography, and personal circumstances.",
            items: [
              {
                id: "L14.CT1.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Delivery Driver's Motorcycle",
                subtitle: "When a luxury consumer toy for one person is a life-sustaining tool for another.",
                scenario: {
                  narrative: "For an office worker who commutes via staff bus, buying an expensive motorcycle is a discretionary recreational want. For Haruna, a courier dispatch rider whose daily livelihood depends on delivering packages across Lagos, buying a durable motorcycle is a critical, income-generating necessity. Without it, his income drops to zero.",
                  characters: [
                    { name: "Haruna", role: "Dispatch Courier", details: "Motorcycle is a mandatory capital asset" },
                    { name: "Office Worker", role: "Commuter", details: "Motorcycle is an optional weekend toy" }
                  ],
                  data: [
                    { label: "Asset", value: "150cc Motorcycle" },
                    { label: "Haruna Context", value: "Primary Income Producing Tool (Need)" },
                    { label: "Office Worker Context", value: "Recreational Luxury (Want)" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What does this contrast reveal about classifying financial expenses?",
                    options: [
                      { id: "A", label: "Needs and wants are contextual: whether an item is a need depends on how directly it supports your survival and livelihood." },
                      { id: "B", label: "Motorcycles are illegal for office workers." },
                      { id: "C", label: "All vehicles are always wants." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Context defines necessity. A professional photographer needs a ₦1,500,000 professional camera to earn a living; for a casual vacationer, that same camera is an extravagant want. Always evaluate expenditures through the lens of your specific career and life realities.",
                key_takeaway: "An item's status as a need or want depends entirely on your specific vocation and circumstances.",
                concepts: ["needs_vs_wants", "asset"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT1.G3.I02",
                kind: "slide",
                order: 2,
                title: "Contextual Elasticity of Needs",
                subtitle: "How life transitions transform priorities.",
                body: [
                  {
                    type: "bullet_list",
                    items: [
                      "A single student living in a campus hostel has minimal fixed utility needs.",
                      "A parent with an infant child has non-negotiable healthcare, pediatric nutrition, and childcare needs.",
                      "Review and reclassify your budget categories whenever your life stage, career, or family status changes."
                    ]
                  }
                ],
                concepts: ["needs_vs_wants", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT1.G3.I03",
                kind: "widget",
                order: 3,
                title: "Context-Based Expense Classifier",
                subtitle: "Classify items based on whether they are Needs or Wants for different professions.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Professional Context Classifier",
                  buckets: [
                    { id: "need", label: "Essential Professional Need" },
                    { id: "want", label: "Discretionary Luxury" }
                  ],
                  cards: [
                    { id: "c1", label: "High-spec graphics workstation for a 3D animator", bucket: "need", feedback: "Mandatory equipment required to render client projects." },
                    { id: "c2", label: "High-spec graphics workstation for an accountant who only uses spreadsheets", bucket: "want", feedback: "Massive overkill for simple accounting software." },
                    { id: "c3", label: "Vehicle for an interstate logistics driver", bucket: "need", feedback: "The fundamental tool that generates the driver's revenue." },
                    { id: "c4", label: "Second luxury sports car for an executive with a company car", bucket: "want", feedback: "Pure conspicuous consumption." }
                  ]
                },
                concepts: ["needs_vs_wants"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT1.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Contextual Needs Quiz",
                subtitle: "Test your understanding of contextual spending priorities.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L14.CT1.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "Why is it dangerous to simply copy another person's personal budget template line by line?",
                    options: [
                      { id: "A", text: "Because their income, vocation, family dependencies, and living context are completely different from yours." },
                      { id: "B", text: "Because budgets are protected by copyright law." },
                      { id: "C", text: "Because only certified accountants are allowed to use templates." }
                    ],
                    correct: "A",
                    explanation: "Your budget must reflect your individual reality, vocation, and specific constraints.",
                    concepts: ["budget", "needs_vs_wants"]
                  }
                ],
                concepts: ["budget"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L14.CT2.G1",
            title: "When Your Money Cannot Cover Everything",
            objective: "Analyze financial rationing, emergency prioritization, and triage under scarcity.",
            items: [
              {
                id: "L14.CT2.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The Medical Emergency Triage",
                subtitle: "When an unexpected crisis forces immediate reallocation of all available cash.",
                scenario: {
                  narrative: "Ngozi had budgeted ₦120,000 for the month: ₦50,000 for groceries, ₦30,000 for transport, ₦20,000 for savings, and ₦20,000 for a weekend wedding reception outfit. In week two, her elderly mother falls ill and requires an immediate ₦45,000 diagnostic medical scan. Ngozi has no emergency fund.",
                  characters: [
                    { name: "Ngozi", role: "Daughter / Budgeter", details: "Facing unexpected medical emergency with fixed funds" }
                  ],
                  data: [
                    { label: "Available Cash Balance", value: "₦65,000" },
                    { label: "Emergency Medical Scan", value: "₦45,000 (Top Priority)" },
                    { label: "Remaining Living Budget", value: "₦20,000 for 18 Days" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "How must Ngozi reallocate her budget to survive the month?",
                    options: [
                      { id: "A", label: "Cancel the wedding outfit, pause all non-essential spending, pay for the scan, and live on strict grocery staples." },
                      { id: "B", label: "Buy the wedding outfit anyway and ignore the hospital." },
                      { id: "C", label: "Take a 50% monthly loan app advance to buy the outfit." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Financial triage requires brutally honest prioritization. In emergencies, life and health immediately trump social appearances. Having an emergency fund prevents life events from destroying your monthly grocery runway.",
                key_takeaway: "In financial emergencies, survival and health take 100% precedence over social desires.",
                concepts: ["budget", "emergency_fund", "trade_off"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT2.G1.I02",
                kind: "slide",
                order: 2,
                title: "The Financial Triage Hierarchy",
                subtitle: "The four tiers of survival spending.",
                body: [
                  {
                    type: "numbered_list",
                    items: [
                      "Tier 1 (Survival): Food, urgent medical care, basic shelter rent, basic utilities.",
                      "Tier 2 (Livelihood): Transport to work, tools required to generate daily income.",
                      "Tier 3 (Obligations): Minimum legal debt payments, insurance premiums.",
                      "Tier 4 (Discretionary): Entertainment, social clothing, dining out, luxury upgrades (cut 100% in a crisis)."
                    ]
                  }
                ],
                concepts: ["budget", "needs_vs_wants"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT2.G1.I03",
                kind: "widget",
                order: 3,
                title: "Crisis Triage Allocator",
                subtitle: "Allocate limited emergency funds across competing urgent demands.",
                widget_type: "budget_prioritizer",
                config: {
                  title: "Emergency Triage Sorter",
                  monthly_income: 70000,
                  categories: [
                    { name: "Emergency Prescription Medication", amount: 35000, locked: true },
                    { name: "Basic Maize / Rice Staples", amount: 25000, locked: true },
                    { name: "Public Bus Commute to Work", amount: 10000, locked: true },
                    { name: "Friend's Birthday Contribution", amount: 15000, flexible: true },
                    { name: "New Shoes", amount: 20000, flexible: true }
                  ]
                },
                concepts: ["budget", "needs_vs_wants", "trade_off"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT2.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Financial Triage Quiz",
                subtitle: "Assess your ability to prioritize during unexpected emergencies.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L14.CT2.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "When facing a sudden severe income drop, which category of spending should be eliminated first?",
                    options: [
                      { id: "A", text: "Discretionary wants (dining out, entertainment, fashion, non-essential subscriptions)" },
                      { id: "B", text: "Basic nutritional food for children" },
                      { id: "C", text: "Life-saving prescription medications" }
                    ],
                    correct: "A",
                    explanation: "Discretionary spending should be completely eliminated first to preserve vital shelter, food, and health.",
                    concepts: ["budget", "needs_vs_wants"]
                  }
                ],
                concepts: ["budget"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L14.CT2.G2",
            title: "Comparing Priorities and Ranking Goals",
            objective: "Learn how to rank competing financial objectives (e.g. debt repayment vs investing vs emergency fund).",
            items: [
              {
                id: "L14.CT2.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The Three Competing Goals",
                subtitle: "How to allocate a monthly surplus across debt, savings, and investments.",
                scenario: {
                  narrative: "Emeka has a monthly surplus of ₦50,000 after covering all essential living expenses. He has three competing desires: 1) Repay a ₦200,000 loan app debt charging 15% monthly interest, 2) Build a ₦300,000 emergency fund (currently at ₦0), and 3) Invest in a stock market portfolio yielding 18% annually.",
                  characters: [
                    { name: "Emeka", role: "Decision Maker", details: "Has ₦50,000 surplus; must rank order of financial operations" }
                  ],
                  data: [
                    { label: "Loan App Interest", value: "15% / Month (180% Annualized)" },
                    { label: "Emergency Buffer", value: "₦0 (Severe Vulnerability)" },
                    { label: "Stock Market Yield", value: "18% / Year" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What is the mathematically and strategically correct order of priority for Emeka?",
                    options: [
                      { id: "A", label: "1) Build a mini emergency buffer (₦50k), 2) Aggressively eradicate the 180% toxic loan debt, 3) Invest in stocks." },
                      { id: "B", label: "Invest 100% in stocks while letting the 180% loan app compound." },
                      { id: "C", label: "Spend the surplus on a luxury watch." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Financial priorities have a strict logical order of operations. Investing in the stock market to earn 18% a year while paying 180% annual interest on toxic loans is mathematical madness. Eradicate toxic debt first.",
                key_takeaway: "Eliminate high-interest debt before deploying capital into long-term investments.",
                concepts: ["budget", "liability", "emergency_fund"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT2.G2.I02",
                kind: "slide",
                order: 2,
                title: "The Financial Order of Operations",
                subtitle: "The universal sequence for deploying your financial surplus.",
                body: [
                  {
                    type: "numbered_list",
                    items: [
                      "Step 1: Starter Emergency Fund (1 month of basic living expenses).",
                      "Step 2: Toxic Debt Eradication (Pay off all loans with interest above 15%).",
                      "Step 3: Fully Funded Emergency Shield (3 to 6 months of living expenses).",
                      "Step 4: Long-Term Compound Investing (Equities, real estate, productive assets).",
                      "Step 5: Major Lifestyle Goals (Home ownership, luxury travel, philanthropy)."
                    ]
                  }
                ],
                concepts: ["budget", "emergency_fund", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT2.G2.I03",
                kind: "widget",
                order: 3,
                title: "Financial Priority Ranker",
                subtitle: "Rank financial goals into the correct sequence of execution.",
                widget_type: "sequence_ordering",
                config: {
                  title: "Financial Order of Operations",
                  items: [
                    { id: "s1", label: "Build 1-month basic emergency cash buffer", correct_order: 1 },
                    { id: "s2", label: "Aggressively pay off high-interest loan apps and credit debt", correct_order: 2 },
                    { id: "s3", label: "Expand emergency buffer to 3-6 months", correct_order: 3 },
                    { id: "s4", label: "Consistently invest 20%+ in long-term productive assets", correct_order: 4 }
                  ]
                },
                concepts: ["budget", "financial_resilience"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT2.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Priority Ranking Quiz",
                subtitle: "Test your understanding of the financial order of operations.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L14.CT2.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "Why should you pay off a 30% interest loan before investing in stocks that yield 15%?",
                    options: [
                      { id: "A", text: "Because paying off a 30% debt gives you a guaranteed 30% risk-free return by avoiding interest, which beats an uncertain 15% stock yield." },
                      { id: "B", text: "Because stock investments are illegal if you owe debt." },
                      { id: "C", text: "Because banks will delete your stock account." }
                    ],
                    correct: "A",
                    explanation: "Eliminating debt is mathematically equivalent to earning a risk-free return equal to the interest rate avoided.",
                    concepts: ["liability", "interest_rate"]
                  }
                ],
                concepts: ["budget", "liability"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L14.CT2.G3",
            title: "Making Trade-offs and Accepting Constraints",
            objective: "Synthesize the reality that saying YES to one financial goal means saying NO to another.",
            items: [
              {
                id: "L14.CT2.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Business Capital vs. Luxury Wedding Choice",
                subtitle: "Choosing between a one-day celebration and long-term financial security.",
                scenario: {
                  narrative: "Kunle and his fiancée have saved ₦6,000,000. Kunle's extended family pressures them to host a 600-guest luxury wedding reception costing ₦6,000,000. Kunle also has an opportunity to buy a commercial logistics franchise route that yields ₦350,000 net monthly profit. After serious discussion, the couple hosts an elegant, intimate ceremony for ₦1,200,000 and deploys the remaining ₦4,800,000 into the franchise. Three years later, the franchise income has fully funded their first home.",
                  characters: [
                    { name: "Kunle & Fiancée", role: "Forward-Thinking Couple", details: "Chose asset creation over transient social spectacle" },
                    { name: "Extended Family", role: "Traditional Pressure", details: "Demanded lavish 600-guest wedding reception" }
                  ],
                  data: [
                    { label: "Total Capital", value: "₦6,000,000" },
                    { label: "Option A (Party)", value: "₦6M spent in 8 hours (Zero return)" },
                    { label: "Option B (Asset + Intimate Event)", value: "₦1.2M wedding + ₦4.8M franchise route" },
                    { label: "3-Year Franchise Income", value: "+₦12,600,000 Cash Flow" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What made the couple's decision a masterclass in financial trade-offs?",
                    options: [
                      { id: "A", label: "They sacrificed transient social validation for a cash-generating asset that provided long-term security." },
                      { id: "B", label: "They hated all their friends and family." },
                      { id: "C", label: "Weddings are prohibited by the central bank." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Every major financial decision involves a trade-off. Choosing to spend millions on an 8-hour party means giving up a business, a house down-payment, or children's education funds. Mature adults evaluate the trade-off and choose long-term freedom.",
                key_takeaway: "Maturity means accepting constraints and prioritizing long-term assets over transient celebrations.",
                concepts: ["trade_off", "opportunity_cost", "asset"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT2.G3.I02",
                kind: "slide",
                order: 2,
                title: "The Power of Conscious Trade-offs",
                subtitle: "You can afford anything, but not everything.",
                body: [
                  {
                    type: "paragraph",
                    text: "Personal finance author Paula Pant noted: 'You can afford anything, but you cannot afford everything.'"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Saying YES to a lavish luxury apartment means saying NO to saving for your own business.",
                      "Saying YES to driving a modest car means saying NO to monthly vehicle debt stress.",
                      "Make your trade-offs consciously, intentionally, and without regret."
                    ]
                  }
                ],
                concepts: ["trade_off", "opportunity_cost"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT2.G3.I03",
                kind: "widget",
                order: 3,
                title: "Trade-off Evaluation Matrix",
                subtitle: "Compare the long-term trade-offs of major life expenditures.",
                widget_type: "option_comparison",
                config: {
                  title: "Life Capital Trade-off Evaluator",
                  option_a: {
                    name: "Lavish 1-Day Social Celebration (₦5M)",
                    attributes: {
                      "Duration of Enjoyment": "24 Hours",
                      "Long-Term Cash Flow": "₦0 (100% Sunk Expense)",
                      "Financial Stress": "High (Starting marriage with depleted savings)",
                      "Net Worth Impact": "-₦5,000,000"
                    }
                  },
                  option_b: {
                    name: "Modest Event + Income Asset (₦1M / ₦4M)",
                    attributes: {
                      "Duration of Enjoyment": "Lifelong peace of mind",
                      "Long-Term Cash Flow": "+₦100,000 to ₦300,000 monthly",
                      "Financial Stress": "Low (Strong capital foundation)",
                      "Net Worth Impact": "+₦4,000,000 Asset Equity"
                    }
                  }
                },
                concepts: ["trade_off", "asset", "opportunity_cost"],
                authoring_status: "authored"
              },
              {
                id: "L14.CT2.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Lesson 14 Final Review",
                subtitle: "Comprehensive assessment of needs, wants, and trade-offs.",
                quiz_mode: "lesson_final",
                questions: [
                  {
                    id: "L14.CT2.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "What is an economic trade-off?",
                    options: [
                      { id: "A", text: "A situational decision where giving up or diminishing one desirable choice is necessary to gain another preferred alternative." },
                      { id: "B", text: "A barter transaction involving only farm vegetables." },
                      { id: "C", text: "A trade agreement between two hostile countries." }
                    ],
                    correct: "A",
                    explanation: "Trade-offs are the fundamental reality of managing limited resources across competing human desires.",
                    concepts: ["trade_off"]
                  }
                ],
                concepts: ["trade_off", "needs_vs_wants"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  },

  // ==========================================
  // LESSON 15: OPPORTUNITY COST - THE HIDDEN COST OF EVERY DECISION
  // ==========================================
  L15: {
    id: "L15",
    number: 15,
    title: "Opportunity Cost: The Hidden Cost of Every Decision",
    subtitle: "Master economics' most profound insight: the true cost of anything is what you give up to get it.",
    difficulty: "High",
    contents: [
      {
        id: "L15.CT1",
        title: "Every Choice Has Another Side",
        objective: "Understand opportunity cost, identify the next-best alternative, and evaluate unseen trade-offs.",
        groups: [
          {
            id: "L15.CT1.G1",
            title: "The Meaning of Opportunity Cost",
            objective: "Define opportunity cost as the value of the foregone next-best alternative.",
            items: [
              {
                id: "L15.CT1.G1.I01",
                kind: "case_study",
                order: 1,
                title: "Study for the Exam or Work the Shift?",
                subtitle: "How students trade immediate cash for long-term qualification earnings.",
                scenario: {
                  narrative: "Tari is offered a weekend bartending shift that pays ₦25,000 cash. However, taking the shift means he will not study for his final university engineering examination on Monday morning. If he fails the exam, he must pay ₦80,000 for a retake semester and delay his graduation by six months. Tari must evaluate the real cost of that ₦25,000.",
                  characters: [
                    { name: "Tari", role: "Engineering Student", details: "Weighing ₦25k immediate cash vs academic graduation" }
                  ],
                  data: [
                    { label: "Immediate Cash Gain", value: "₦25,000" },
                    { label: "Retake Tuition Cost", value: "₦80,000" },
                    { label: "Delayed Career Earnings", value: "6 Months of Professional Salary" },
                    { label: "The Opportunity Cost", value: "Graduating on time with top grades" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What is the opportunity cost if Tari chooses to work the bartending shift?",
                    options: [
                      { id: "A", label: "His exam preparation time and the risk of delaying his engineering graduation and career." },
                      { id: "B", label: "Only the cost of his bus ticket to the bar." },
                      { id: "C", label: "Zero, because earning cash is always 100% positive." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "The opportunity cost of an action is not what you pay; it is the value of the next-best alternative you surrender. Earning ₦25,000 while risking ₦80,000 in retake fees and six months of delayed career salary is an extraordinarily expensive trade.",
                key_takeaway: "The real cost of any decision includes everything you give up to make it.",
                concepts: ["opportunity_cost", "scarcity"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT1.G1.I02",
                kind: "slide",
                order: 2,
                title: "What Is Opportunity Cost?",
                subtitle: "The most important concept in all of economic science.",
                body: [
                  {
                    type: "definition",
                    term: "Opportunity Cost",
                    text: "The loss of potential gain from other alternatives when one alternative is chosen."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "When you spend ₦50,000 on shoes: The true cost is not just the ₦50,000; it is the shares you could have bought that would have paid dividends for twenty years.",
                      "When you spend 4 hours scrolling social media: The true cost is the new language, skill, or business you could have built in those 4 hours.",
                      "Money and time are finite; choosing A always means rejecting B."
                    ]
                  }
                ],
                concepts: ["opportunity_cost"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT1.G1.I03",
                kind: "widget",
                order: 3,
                title: "Identify the Next-Best Alternative",
                subtitle: "Pinpoint the exact opportunity cost across common life decisions.",
                widget_type: "choice_with_reflection",
                config: {
                  prompt: "You have ₦100,000 cash. You can: Option A: Buy a luxury designer watch, Option B: Invest in an index fund yielding 18% annual return, Option C: Store physical cash in a jar. If you choose Option A, what is your opportunity cost?",
                  options: [
                    { id: "A", label: "Option B: The 18% annual compound investment growth you surrendered." },
                    { id: "B", label: "Option C: The glass jar." },
                    { id: "C", label: "Zero, because you have a beautiful watch." }
                  ],
                  follow_up_prompt: "Why is the opportunity cost always the NEXT-BEST alternative, rather than all other alternatives combined?"
                },
                concepts: ["opportunity_cost"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT1.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Opportunity Cost Definition Quiz",
                subtitle: "Test your grasp of opportunity cost fundamentals.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L15.CT1.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "What does an economist mean by 'opportunity cost'?",
                    options: [
                      { id: "A", text: "The value of the next-best alternative you must give up when making a choice." },
                      { id: "B", text: "The total amount of cash printed on a store receipt." },
                      { id: "C", text: "The price of advertising a job opportunity." }
                    ],
                    correct: "A",
                    explanation: "Opportunity cost measures the highest-value option foregone when choosing one path over another.",
                    concepts: ["opportunity_cost"]
                  }
                ],
                concepts: ["opportunity_cost"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L15.CT1.G2",
            title: "The Next-Best Alternative",
            objective: "Learn to identify and rank competing options before spending capital.",
            items: [
              {
                id: "L15.CT1.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The ₦500,000 Graduation Gift",
                subtitle: "Evaluating three mutually exclusive uses of capital.",
                scenario: {
                  narrative: "Upon graduating from university, Halima's uncle gifts her ₦500,000 cash. Halima considers three options: 1) A luxury celebratory party with friends (Cost: ₦500k), 2) Professional data science certification and a high-performance laptop (Cost: ₦500k), and 3) A commercial high-yield treasury deposit (Cost: ₦500k). Her next-best alternative to the laptop is the treasury deposit.",
                  characters: [
                    { name: "Halima", role: "Graduate", details: "Evaluating three competing uses of ₦500,000 windfall" }
                  ],
                  data: [
                    { label: "Option 1 (Party)", value: "Transient 24-hr social celebration" },
                    { label: "Option 2 (Tech Skills)", value: "Unlocks high-paying international employment" },
                    { label: "Option 3 (Treasury Deposit)", value: "Earns ₦90,000 guaranteed annual yield" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "If Halima chooses Option 2 (Data Science Certification), what did she give up, and was it a smart trade-off?",
                    options: [
                      { id: "A", label: "She gave up the ₦90k annual treasury yield and party, but gained a career asset capable of earning millions annually." },
                      { id: "B", label: "She lost all her money forever." },
                      { id: "C", label: "She gave up nothing." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Whenever evaluating a financial choice, write down the top two alternatives. The decision is worthwhile only if the chosen path delivers superior long-term utility than the next-best alternative.",
                key_takeaway: "Compare your chosen path against the next-best alternative to ensure you are maximizing value.",
                concepts: ["opportunity_cost", "trade_off"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT1.G2.I02",
                kind: "slide",
                order: 2,
                title: "Ranking Alternatives",
                subtitle: "The discipline of the comparative balance sheet.",
                body: [
                  {
                    type: "paragraph",
                    text: "Before deploying significant capital, list your options in rank order:"
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Rank 1: Chosen option.",
                      "Rank 2: Next-best alternative (Your Opportunity Cost).",
                      "Rank 3+: Other lesser alternatives.",
                      "Rule: Only proceed if Rank 1 clearly outperforms Rank 2 across a multi-year horizon."
                    ]
                  }
                ],
                concepts: ["opportunity_cost"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT1.G2.I03",
                kind: "widget",
                order: 3,
                title: "Windfall Allocation Matrix",
                subtitle: "Rank three competing uses of a ₦500,000 windfall.",
                widget_type: "option_comparison",
                config: {
                  title: "Windfall Alternative Comparison",
                  option_a: {
                    name: "Career Skill Certification & Laptop",
                    attributes: {
                      "5-Year Expected Earning Impact": "+₦5,000,000 to +₦15,000,000",
                      "Asset Type": "Human Capital (Permanent)",
                      "Long-Term Value": "Extraordinarily High"
                    }
                  },
                  option_b: {
                    name: "Luxury VIP Celebration Party",
                    attributes: {
                      "5-Year Expected Earning Impact": "₦0",
                      "Asset Type": "Transient Consumption",
                      "Long-Term Value": "Zero (Fades in 48 hours)"
                    }
                  }
                },
                concepts: ["opportunity_cost", "asset"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT1.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Next-Best Alternative Quiz",
                subtitle: "Assess your ability to identify the precise opportunity cost.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L15.CT1.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "A farmer can use a 2-acre plot of land to plant maize (projected profit: ₦800,000), cassava (projected profit: ₦650,000), or build a storage barn (saves ₦400,000 in rentals). If the farmer plants maize, what is the opportunity cost?",
                    options: [
                      { id: "A", text: "₦650,000 (the profit from planting cassava, the next-best alternative)" },
                      { id: "B", text: "₦1,050,000 (cassava plus the barn combined)" },
                      { id: "C", text: "₦0" }
                    ],
                    correct: "A",
                    explanation: "Opportunity cost is strictly the value of the single next-best alternative foregone (cassava profit: ₦650,000).",
                    concepts: ["opportunity_cost"]
                  }
                ],
                concepts: ["opportunity_cost"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L15.CT1.G3",
            title: "Why the Cheapest Option Is Not Always the Best",
            objective: "Examine lifecycle costs, durability, and false economy.",
            items: [
              {
                id: "L15.CT1.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The ₦4,000 Counterfeit Shoes vs. ₦20,000 Leather Boots",
                subtitle: "How buying cheap goods repeatedly costs far more in the long run.",
                scenario: {
                  narrative: "Chinedu needs sturdy shoes for work on construction sites. He buys cheap counterfeit sneakers for ₦4,000. Within six weeks, the soles split and the shoes disintegrate in the rain. Over two years, Chinedu buys eight pairs of cheap shoes, spending ₦32,000 in total and enduring constant foot pain. His coworker buys one pair of authentic safety leather boots for ₦20,000 that lasts four full years.",
                  characters: [
                    { name: "Chinedu", role: "Short-Term Cheap Buyer", details: "Spent ₦32,000 over 2 years on 8 pairs of failing shoes" },
                    { name: "Coworker", role: "Long-Term Value Buyer", details: "Spent ₦20,000 on 1 durable pair that lasts 4 years" }
                  ],
                  data: [
                    { label: "Cheap Shoe Total Cost (2 Yrs)", value: "₦32,000 (8 Pairs)" },
                    { label: "Durable Boot Total Cost (4 Yrs)", value: "₦20,000 (1 Pair)" },
                    { label: "Chinedu Net Waste", value: "+₦12,000 Extra Paid for Inferior Goods" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What economic fallacy did Chinedu fall into?",
                    options: [
                      { id: "A", label: "The 'False Economy' trap: buying low-quality cheap goods that fail repeatedly costs more over time than buying quality once." },
                      { id: "B", label: "Shoes are illegal to wear on construction sites." },
                      { id: "C", label: "He became richer by buying 8 pairs." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Author Terry Pratchett coined the 'Boots Theory of Socioeconomic Unfairness': poor people often spend more money over their lifetimes on cheap, failing items than wealthy people spend on durable, high-quality items. Whenever possible, evaluate total lifecycle cost rather than upfront sticker price.",
                key_takeaway: "True value is measured by cost per year of use, not the initial purchase tag.",
                concepts: ["opportunity_cost", "trade_off"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT1.G3.I02",
                kind: "slide",
                order: 2,
                title: "Cost Per Use: The True Price Formula",
                subtitle: "How smart buyers evaluate purchases.",
                body: [
                  {
                    type: "definition",
                    term: "Cost Per Use (CPU)",
                    text: "Total Purchase Price divided by Total Number of Times the Item Is Used."
                  },
                  {
                    type: "example",
                    text: "A ₦60,000 work laptop used 250 days a year for 3 years costs ₦80 per day of use. A ₦30,000 party outfit worn once costs ₦30,000 per use. The laptop is hundreds of times cheaper in real terms."
                  }
                ],
                concepts: ["opportunity_cost", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT1.G3.I03",
                kind: "widget",
                order: 3,
                title: "Cost Per Use Calculator",
                subtitle: "Calculate the real cost per use of any major purchase.",
                widget_type: "numeric_calculator",
                config: {
                  title: "Cost Per Use Calculator",
                  default_inputs: {
                    purchase_price: 45000,
                    expected_uses: 150
                  },
                  formula_display: "Cost Per Use = Purchase Price ÷ Expected Number of Uses"
                },
                concepts: ["opportunity_cost", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT1.G3.I04",
                kind: "quiz",
                order: 4,
                title: "False Economy Quiz",
                subtitle: "Assess your understanding of lifecycle costs.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L15.CT1.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "What is a 'false economy' in personal finance?",
                    options: [
                      { id: "A", text: "An action that seems to save money initially (like buying poor quality tools), but ultimately results in higher total costs and wasted time." },
                      { id: "B", text: "A country that uses fake paper money." },
                      { id: "C", text: "A bank account with zero balance." }
                    ],
                    correct: "A",
                    explanation: "A false economy appears cheap upfront, but ends up costing far more in repairs, replacements, and headaches.",
                    concepts: ["opportunity_cost"]
                  }
                ],
                concepts: ["opportunity_cost"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L15.CT2.G1",
            title: "Spending Now vs. Saving for Later",
            objective: "Evaluate intertemporal choice: how present spending sacrifices future compound wealth.",
            items: [
              {
                id: "L15.CT2.G1.I01",
                kind: "case_study",
                order: 1,
                title: "The ₦2,000 Daily Coffee Habit",
                subtitle: "How small daily leaks compound into millions over a decade.",
                scenario: {
                  narrative: "Dayo buys an upscale takeout specialty iced latte and pastry every morning before work for ₦2,500. He considers it a minor expense. Over 20 workdays a month, that equals ₦50,000 monthly, or ₦600,000 per year. If Dayo brewed coffee at home for ₦300 and invested the remaining ₦44,000 monthly into an index fund compounding at 15% annually, he would accumulate over ₦12,500,000 in ten years.",
                  characters: [
                    { name: "Dayo", role: "Daily Spender", details: "Spends ₦50k/mo on takeout beverages without tracking" }
                  ],
                  data: [
                    { label: "Daily Spend", value: "₦2,500" },
                    { label: "Annual Cash Outflow", value: "₦600,000" },
                    { label: "10-Year Invested Opportunity Cost", value: "₦12,500,000+" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What is the true opportunity cost of Dayo's daily takeout beverage?",
                    options: [
                      { id: "A", label: "Over ₦12,500,000 in compound investment wealth that could have funded a home deposit or business." },
                      { id: "B", label: "Only the ₦2,500 note paid that morning." },
                      { id: "C", label: "Zero, because coffee is healthy." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Small recurring leaks are the enemy of wealth accumulation because they steal from the future power of compound interest. A ₦50,000 monthly habit is not just ₦50,000; it is millions of foregone future wealth.",
                key_takeaway: "Recurring daily habits have massive compounded opportunity costs over decades.",
                concepts: ["opportunity_cost", "compound_interest", "budget"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT2.G1.I02",
                kind: "slide",
                order: 2,
                title: "The Multiplier Effect of Compounded Savings",
                subtitle: "Every naira you save today is worth several naira tomorrow.",
                body: [
                  {
                    type: "paragraph",
                    text: "Whenever you consider a non-essential recurring luxury, multiply its annual cost by the Rule of 10:"
                  },
                  {
                    type: "callout",
                    text: "Every ₦100,000 you invest annually at 15% return compounds to approximately ₦2,000,000 over 10 years, and over ₦10,000,000 over 20 years."
                  }
                ],
                concepts: ["compound_interest", "opportunity_cost"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT2.G1.I03",
                kind: "widget",
                order: 3,
                title: "Recurring Habit Opportunity Cost Calculator",
                subtitle: "See how much a small daily spending habit would grow to if invested over 10 years.",
                widget_type: "savings_growth_calculator",
                config: {
                  title: "Habit Wealth Opportunity Calculator",
                  initial_principal: 0,
                  monthly_addition: 45000,
                  nominal_annual_rate: 15,
                  inflation_rate: 0
                },
                concepts: ["compound_interest", "opportunity_cost"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT2.G1.I04",
                kind: "quiz",
                order: 4,
                title: "Intertemporal Choice Quiz",
                subtitle: "Assess your understanding of time-shifted spending.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L15.CT2.G1.I04.Q1",
                    type: "single_choice",
                    prompt: "Why do economists evaluate small daily recurring expenses differently from one-off purchases?",
                    options: [
                      { id: "A", text: "Because small recurring expenses accumulate continuously and deprive your future of massive compound investment growth." },
                      { id: "B", text: "Because banks charge extra fees on small purchases." },
                      { id: "C", text: "Because small expenses are tax-exempt." }
                    ],
                    correct: "A",
                    explanation: "Compounding turns small monthly savings into vast sums of capital over multi-year horizons.",
                    concepts: ["compound_interest", "opportunity_cost"]
                  }
                ],
                concepts: ["compound_interest"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L15.CT2.G2",
            title: "Studying, Working, and Using Your Time",
            objective: "Analyze time as your most scarce and irreplaceable economic asset.",
            items: [
              {
                id: "L15.CT2.G2.I01",
                kind: "case_study",
                order: 1,
                title: "The 3-Hour Daily Traffic Commute",
                subtitle: "How time spent in gridlock represents massive foregone human capital.",
                scenario: {
                  narrative: "Bisi rents an apartment far outside the city for ₦400,000 per year, saving ₦300,000 compared to an apartment near her office (₦700,000/yr). However, her commute consumes three hours in traffic every day (60 hours a month) and costs ₦25,000 extra in monthly bus fares (₦300,000/yr). The ₦300,000 she thought she saved on rent is wiped out by transport fares, and she loses 720 hours every year in traffic that she could have used to freelance or sleep.",
                  characters: [
                    { name: "Bisi", role: "Long Commuter", details: "Trading 720 hours of life yearly for an illusion of rent savings" }
                  ],
                  data: [
                    { label: "Nominal Rent Savings", value: "₦300,000 / Year" },
                    { label: "Extra Transport Cost", value: "₦300,000 / Year (Net Cash Saved: ₦0)" },
                    { label: "Time Lost in Traffic", value: "720 Hours / Year (30 Full Days)" },
                    { label: "Real Outcome", value: "Exhaustion and zero financial gain" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "What was the real opportunity cost of Bisi's distant apartment?",
                    options: [
                      { id: "A", label: "720 hours of personal life, health, and potential freelance earning power sacrificed for zero net financial savings." },
                      { id: "B", label: "The apartment had no roof." },
                      { id: "C", label: "Bus drivers were friendly." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Money lost can be earned back; time lost is gone forever. Bisi thought she was saving money on rent, but after accounting for transport fares, she saved ₦0 and sacrificed 720 hours of life. Always factor the economic value of your time into living decisions.",
                key_takeaway: "Your time has economic value. Never trade hundreds of hours to save negligible amounts of cash.",
                concepts: ["opportunity_cost", "trade_off"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT2.G2.I02",
                kind: "slide",
                order: 2,
                title: "The Hourly Value of Your Time",
                subtitle: "Why wasting 4 hours to save ₦500 is an economic disaster.",
                body: [
                  {
                    type: "paragraph",
                    text: "Calculate your effective hourly wage: Divide your monthly net income by the total hours you work each month."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "If you earn ₦2,000 per hour, spending 3 hours in lines or across town to save ₦1,000 is an economic loss of ₦5,000.",
                      "Treat your time with the exact same respect, discipline, and budgeting that you apply to your money."
                    ]
                  }
                ],
                concepts: ["opportunity_cost"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT2.G2.I03",
                kind: "widget",
                order: 3,
                title: "Hourly Value Estimator",
                subtitle: "Calculate the real monetary value of your working hours.",
                widget_type: "numeric_calculator",
                config: {
                  title: "Hourly Time Valuation Tool",
                  default_inputs: {
                    monthly_net_earnings: 240000,
                    monthly_hours_worked: 160
                  },
                  formula_display: "Hourly Value = Monthly Net Earnings ÷ Monthly Hours"
                },
                concepts: ["opportunity_cost"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT2.G2.I04",
                kind: "quiz",
                order: 4,
                title: "Time Valuation Quiz",
                subtitle: "Test your understanding of time opportunity costs.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L15.CT2.G2.I04.Q1",
                    type: "single_choice",
                    prompt: "A freelance programmer who earns ₦5,000 per hour spends 4 hours washing their car by hand to save ₦1,500 at a professional car wash. What was the net economic outcome?",
                    options: [
                      { id: "A", text: "A net economic loss of ₦18,500 (surrendered ₦20,000 of productive coding time to save ₦1,500)." },
                      { id: "B", text: "A massive profit of ₦20,000." },
                      { id: "C", text: "A tie with zero economic effect." }
                    ],
                    correct: "A",
                    explanation: "Opportunity cost = 4 hours × ₦5,000/hr = ₦20,000 foregone. Subtracting ₦1,500 saved leaves an ₦18,500 net loss.",
                    concepts: ["opportunity_cost"]
                  }
                ],
                concepts: ["opportunity_cost"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L15.CT2.G3",
            title: "Business Decisions and Limited Resources",
            objective: "Apply opportunity cost to corporate capital allocation, inventory selection, and business hiring.",
            items: [
              {
                id: "L15.CT2.G3.I01",
                kind: "case_study",
                order: 1,
                title: "The Bakery's Oven vs. Delivery Van Dilemma",
                subtitle: "How a business owner allocates scarce capital between production capacity and logistics.",
                scenario: {
                  narrative: "Madame Joy owns a thriving commercial bakery with ₦3,000,000 in retained expansion capital. She can either: 1) Buy an automated industrial deck oven that triples bread baking capacity, generating an estimated ₦600,000 extra monthly net profit, or 2) Buy a branded delivery van that saves ₦150,000 monthly in hired transport fees. She can only afford one.",
                  characters: [
                    { name: "Madame Joy", role: "Bakery Entrepreneur", details: "Evaluating two productive capital equipment investments" }
                  ],
                  data: [
                    { label: "Expansion Capital", value: "₦3,000,000" },
                    { label: "Option 1 (New Oven Profit)", value: "+₦600,000 / Month" },
                    { label: "Option 2 (Van Savings)", value: "+₦150,000 / Month" },
                    { label: "Optimal Decision", value: "Option 1 generates 4x higher return on capital" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Which capital investment maximizes business wealth and growth?",
                    options: [
                      { id: "A", label: "Buying the industrial oven: it triples production and generates ₦600,000 monthly, easily funding delivery rentals." },
                      { id: "B", label: "Buying the van because it looks prestigious on the road." },
                      { id: "C", label: "Leaving the ₦3M uninvested in a checking account." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "Business capital is strictly finite. The opportunity cost of buying the delivery van was the ₦600,000 monthly profit from tripling bread production. By choosing the highest-yielding asset, Madame Joy expands her business rapidly.",
                key_takeaway: "Businesses must allocate scarce capital to the projects with the highest return on investment.",
                concepts: ["opportunity_cost", "asset"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT2.G3.I02",
                kind: "slide",
                order: 2,
                title: "Capital Allocation in Business",
                subtitle: "The chief duty of every entrepreneur and CEO.",
                body: [
                  {
                    type: "paragraph",
                    text: "In business, capital allocation is everything. Every naira invested in inventory line A is a naira that cannot be invested in inventory line B."
                  },
                  {
                    type: "bullet_list",
                    items: [
                      "Measure Return on Invested Capital (ROIC) across all projects.",
                      "Ruthlessly eliminate slow-moving, low-margin inventory.",
                      "Concentrate capital where profit margins, customer demand, and cash velocity are highest."
                    ]
                  }
                ],
                concepts: ["opportunity_cost", "asset"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT2.G3.I03",
                kind: "widget",
                order: 3,
                title: "Business Capital Allocation Matrix",
                subtitle: "Compare competing business investments based on projected monthly yield.",
                widget_type: "option_comparison",
                config: {
                  title: "Bakery Capital Allocation Comparison",
                  option_a: {
                    name: "Automated Industrial Deck Oven",
                    attributes: {
                      "Capital Cost": "₦3,000,000",
                      "Monthly Revenue Boost": "+₦600,000",
                      "Payback Period": "5 Months",
                      "ROI Rating": "Exceptional"
                    }
                  },
                  option_b: {
                    name: "Branded Delivery Van",
                    attributes: {
                      "Capital Cost": "₦3,000,000",
                      "Monthly Cost Savings": "+₦150,000",
                      "Payback Period": "20 Months",
                      "ROI Rating": "Moderate"
                    }
                  }
                },
                concepts: ["opportunity_cost", "asset"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT2.G3.I04",
                kind: "quiz",
                order: 4,
                title: "Business Capital Quiz",
                subtitle: "Assess your understanding of corporate capital allocation.",
                quiz_mode: "group_quiz",
                questions: [
                  {
                    id: "L15.CT2.G3.I04.Q1",
                    type: "single_choice",
                    prompt: "What should guide a small business owner when deciding between two competing equipment purchases?",
                    options: [
                      { id: "A", text: "Which equipment generates the highest net return on investment (ROI) and fastest cash-flow payback." },
                      { id: "B", text: "Which equipment has the brightest paint color." },
                      { id: "C", text: "Which equipment is sold by a friend." }
                    ],
                    correct: "A",
                    explanation: "Capital must flow to the investments that produce the highest economic productivity and cash return.",
                    concepts: ["opportunity_cost"]
                  }
                ],
                concepts: ["opportunity_cost"],
                authoring_status: "authored"
              }
            ]
          },
          {
            id: "L15.CT2.G4",
            title: "Comparing Alternatives and Their Consequences",
            objective: "Synthesize the entire Module 1 curriculum: Value, Prices, Trade, and Decision-Making.",
            items: [
              {
                id: "L15.CT2.G4.I01",
                kind: "case_study",
                order: 1,
                title: "The Financial Master's Dilemma",
                subtitle: "Synthesizing purchasing power, inflation, compound interest, and opportunity cost in a single life decision.",
                scenario: {
                  narrative: "David is 26 years old and has built a 6-month emergency cash fund. He receives a ₦1,000,000 annual bonus. He analyzes three choices: Choice 1: Upgrade to a luxury sports sedan with a ₦1M down payment and ₦120,000 monthly financing debt for 3 years. Choice 2: Leave the ₦1,000,000 in a 0% checking account. Choice 3: Invest the ₦1,000,000 in a diversified index fund compounding at 18% annually.",
                  characters: [
                    { name: "David", role: "Module 1 Graduate", details: "Evaluating choices using the full Module 1 financial framework" }
                  ],
                  data: [
                    { label: "Choice 1 (Car Debt)", value: "-₦4.3M total cash spent on a depreciating asset" },
                    { label: "Choice 2 (Idle Cash)", value: "Loses 25% purchasing power annually to inflation" },
                    { label: "Choice 3 (Compounding Asset)", value: "Grows to ₦5,233,000 in 10 years at 18% return" }
                  ]
                },
                prompts: [
                  {
                    id: "P1",
                    prompt: "Applying all the principles of Module 1, which choice produces true long-term financial freedom?",
                    options: [
                      { id: "A", label: "Choice 3: Investing the capital to beat inflation, build net worth, and harness compound growth." },
                      { id: "B", label: "Choice 1: Taking on 3 years of car debt." },
                      { id: "C", label: "Choice 2: Letting inflation slowly destroy idle cash." }
                    ],
                    expected_answer: "A"
                  }
                ],
                debrief: "David's scenario brings all of Module 1 together: Money is a tool; inflation destroys idle cash; debt multiplies fragility; and compound interest in productive assets creates generational wealth. By understanding opportunity cost, David secures his financial independence.",
                key_takeaway: "Every financial decision is connected. Choose assets over liabilities, beat inflation, and let compounding build your freedom.",
                concepts: ["opportunity_cost", "compound_interest", "net_worth", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT2.G4.I02",
                kind: "slide",
                order: 2,
                title: "Module 1 Master Synthesis: The Foundations of Money",
                subtitle: "You have completed all 15 lessons of Module 1!",
                body: [
                  {
                    type: "numbered_list",
                    items: [
                      "Chapter 1: Money is a social technology performing three jobs: Medium of Exchange, Unit of Account, and Store of Value.",
                      "Chapter 2: Purchasing power is real wealth; nominal numbers deceive. Inflation and exchange rates dictate the true size of your basket.",
                      "Chapter 3: The economy is an interconnected circular flow. Interest rates are the cost of time; recessions reward the prepared.",
                      "Chapter 4: Your emotions and biases are your biggest financial risk. Master opportunity cost, live below your means, and compound capital systematically."
                    ]
                  },
                  {
                    type: "callout",
                    text: "You now possess the foundational economic principles required to master personal budgeting, investing, and wealth creation."
                  }
                ],
                concepts: ["opportunity_cost", "net_worth", "compound_interest", "purchasing_power"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT2.G4.I03",
                kind: "widget",
                order: 3,
                title: "Module 1 Mastery Self-Assessment",
                subtitle: "Audit your core financial superpowers across all 15 lessons.",
                widget_type: "sort_into_buckets",
                config: {
                  title: "Financial Mastery Verification",
                  buckets: [
                    { id: "mastered", label: "Mastered Superpower" },
                    { id: "trap", label: "Trap Avoided" }
                  ],
                  cards: [
                    { id: "c1", label: "Calculating Net Worth (Assets - Liabilities) instead of judging wealth by car brands", bucket: "mastered", feedback: "Real net worth is your true scorecard." },
                    { id: "c2", label: "Holding millions in zero-interest physical cash during 25% inflation", bucket: "trap", feedback: "Guarantees rapid purchasing power destruction." },
                    { id: "c3", label: "Evaluating purchases by their Opportunity Cost (what alternative am I giving up?)", bucket: "mastered", feedback: "Economics' most profound decision-making tool." },
                    { id: "c4", label: "Borrowing from 30% monthly loan apps to buy designer party outfits", bucket: "trap", feedback: "Toxic debt that triggers destructive debt spirals." }
                  ]
                },
                concepts: ["opportunity_cost", "net_worth", "inflation"],
                authoring_status: "authored"
              },
              {
                id: "L15.CT2.G4.I04",
                kind: "quiz",
                order: 4,
                title: "Module 1 Grand Capstone Examination",
                subtitle: "The final evaluation certifying complete mastery of Module 1: Foundations of Money.",
                quiz_mode: "lesson_final",
                questions: [
                  {
                    id: "L15.CT2.G4.I04.Q1",
                    type: "single_choice",
                    prompt: "What is the overarching lesson of Opportunity Cost for your personal financial life?",
                    options: [
                      { id: "A", text: "Every time you spend money or time on one thing, you are permanently giving up the chance to use that resource for the next-best alternative." },
                      { id: "B", text: "You should never spend any money on food." },
                      { id: "C", text: "All choices are completely free of trade-offs." }
                    ],
                    correct: "A",
                    explanation: "Understanding opportunity cost ensures you allocate finite time and money to what truly builds long-term security.",
                    concepts: ["opportunity_cost"]
                  },
                  {
                    id: "L15.CT2.G4.I04.Q2",
                    type: "single_choice",
                    prompt: "Which formula defines real investment growth after accounting for macroeconomic conditions?",
                    options: [
                      { id: "A", text: "Real Return = Nominal Investment Yield - Inflation Rate" },
                      { id: "B", text: "Real Return = Total Cash Borrowed + Bank Fees" },
                      { id: "C", text: "Real Return = Number of Banknotes × 2" }
                    ],
                    correct: "A",
                    explanation: "Real return measures the genuine expansion of purchasing power after subtracting price inflation.",
                    concepts: ["real_value", "inflation"]
                  },
                  {
                    id: "L15.CT2.G4.I04.Q3",
                    type: "true_false",
                    prompt: "True or False: A person earning ₦300,000 monthly who consistently saves and invests ₦60,000 into productive compound assets will build more wealth over time than a person earning ₦1,500,000 monthly who spends 100% of their income.",
                    correct: true,
                    explanation: "True! Wealth is defined by the surplus retained and compounded, not by the gross flow of income.",
                    concepts: ["net_worth", "money_vs_wealth", "compound_interest"]
                  }
                ],
                concepts: ["opportunity_cost", "real_value", "net_worth", "compound_interest"],
                authoring_status: "authored"
              }
            ]
          }
        ]
      }
    ]
  }
};

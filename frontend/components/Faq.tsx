import React, { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      question: "How do I place a bet on the platform?",
      answer:
        "To place a bet, simply select a game, choose the odds, and enter the amount you'd like to wager. Confirm your bet and wait for the result. All bets are placed instantly on the blockchain for transparency.",
    },
    {
      question: "What is the minimum bet amount?",
      answer:
        "The minimum bet amount varies depending on the game and odds. You can check the specific requirements for each match directly on the betting page.",
    },
    {
      question: "How do I withdraw my winnings?",
      answer:
        "You can withdraw your winnings directly to your wallet by going to the 'Withdraw' section in your account settings. Withdrawals are processed quickly on the blockchain.",
    },
    {
      question: "Is my data safe on the platform?",
      answer:
        "Yes! Our platform uses blockchain technology to secure all transactions. Your personal data is encrypted, and your betting activities are transparent and auditable.",
    },
    {
      question: "Can I bet on multiple games at the same time?",
      answer:
        "Yes, you can place multiple bets on different games simultaneously. Each bet is processed independently, and you will receive real-time updates on the status of each bet.",
    },
  ];

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="text-white py-16 px-4 md:px-12">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-white">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-700">
            <div className="flex justify-between items-center py-4 cursor-pointer" onClick={() => toggleOpen(index)}>
              <h3 className="text-lg font-semibold">{faq.question}</h3>
              <svg
                className={`w-6 h-6 transition-transform duration-300 ${
                  openIndex === index ? "transform rotate-180 animate-pulse duration-1000 transition-all" : ""
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            {openIndex === index && <p className="text-gray-400 text-base px-4 pb-4">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;

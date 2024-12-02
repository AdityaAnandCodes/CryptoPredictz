import React, { useState } from "react";

type FaqItem = {
  question: string;
  answer: string;
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
        question: "How do I participate in predictions on the platform?",
        answer:
            "To participate, select a market, choose your prediction, and enter the amount you'd like to stake. Confirm your prediction, and it will be recorded on the blockchain for transparency. You'll receive rewards if your prediction is correct.",
    },
    {
        question: "What is the minimum stake amount?",
        answer:
            "The minimum stake amount varies depending on the market and conditions. You can check the specific requirements for each market directly on the prediction page.",
    },
    {
        question: "How do I claim my rewards for correct predictions?",
        answer:
            "You can claim your rewards directly in your account by going to the 'Claim Rewards' section. All rewards are processed on the blockchain and transferred to your wallet securely.",
    },
    {
        question: "Is my data secure on the platform?",
        answer:
            "Absolutely! Our platform leverages blockchain technology to secure all transactions. Your personal data is encrypted, and all prediction activities are transparent and auditable.",
    },
    {
        question: "Can I participate in multiple prediction markets simultaneously?",
        answer:
            "Yes, you can engage in multiple prediction markets at the same time. Each prediction is processed independently, and you will receive updates on the outcome of each market as they resolve.",
    },
];


  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq" className="text-white py-16 px-4 md:px-12">
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
                  openIndex === index
                    ? "transform rotate-180 animate-pulse animation-slow duration-1000 transition-all"
                    : ""
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

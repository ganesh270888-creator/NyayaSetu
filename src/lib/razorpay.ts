import Razorpay from "razorpay";

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export const PLANS = [
  {
    id: "free",
    name: "Free",
    nameHi: "मुफ्त",
    price: 0,
    priceLabel: "₹0",
    features: [
      { en: "3 contract scans/month", hi: "3 अनुबंध स्कैन/महीना" },
      { en: "2 legal notices/month", hi: "2 कानूनी नोटिस/महीना" },
      { en: "1 GST playbook/month", hi: "1 GST प्लेबुक/महीना" },
      { en: "Basic email support", hi: "बेसिक ईमेल सपोर्ट" },
    ],
  },
  {
    id: "starter",
    name: "Starter",
    nameHi: "स्टार्टर",
    price: 99900,
    priceLabel: "₹999",
    features: [
      { en: "25 contract scans/month", hi: "25 अनुबंध स्कैन/महीना" },
      { en: "15 legal notices/month", hi: "15 कानूनी नोटिस/महीना" },
      { en: "10 GST playbooks/month", hi: "10 GST प्लेबुक/महीना" },
      { en: "10 recovery plans/month", hi: "10 वसूली योजनाएं/महीना" },
      { en: "PDF export", hi: "PDF डाउनलोड" },
      { en: "Priority support", hi: "प्राथमिकता सपोर्ट" },
    ],
  },
  {
    id: "professional",
    name: "Professional",
    nameHi: "प्रोफेशनल",
    price: 249900,
    priceLabel: "₹2,499",
    popular: true,
    features: [
      { en: "Unlimited contract scans", hi: "असीमित अनुबंध स्कैन" },
      { en: "Unlimited legal notices", hi: "असीमित कानूनी नोटिस" },
      { en: "Unlimited GST playbooks", hi: "असीमित GST प्लेबुक" },
      { en: "Unlimited recovery plans", hi: "असीमित वसूली योजनाएं" },
      { en: "Database save & history", hi: "डेटाबेस सेव और इतिहास" },
      { en: "PDF export", hi: "PDF डाउनलोड" },
      { en: "Dedicated support", hi: "समर्पित सपोर्ट" },
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    nameHi: "एंटरप्राइज़",
    price: 0,
    priceLabel: "Custom",
    features: [
      { en: "Everything in Professional", hi: "प्रोफेशनल की सभी सुविधाएं" },
      { en: "Multi-user access", hi: "बहु-उपयोगकर्ता एक्सेस" },
      { en: "Custom templates", hi: "कस्टम टेम्पलेट" },
      { en: "API access", hi: "API एक्सेस" },
      { en: "SLA guarantee", hi: "SLA गारंटी" },
    ],
  },
] as const;

import type { CustomerReviewsSectionViewModel } from "./customer-reviews.types";

export const customerReviewsData: CustomerReviewsSectionViewModel = {
  headingId: "customer-reviews-title",
  eyebrow: "CUSTOMER REVIEWS",
  title: "Loved by Thousands of Customers",
  subtitle:
    "Real feedback from customers who shop with confidence, fast delivery and trusted product quality.",
  averageRating: "4.8",
  totalReviews: "12,500+",
  trustLabel: "Verified customer feedback",
  reviews: [
    {
      id: "review-nahid-hasan",
      name: "Nahid Hasan",
      role: "Regular Customer",
      location: "Dhaka, Bangladesh",
      rating: 5,
      title: "Fast delivery and original product",
      comment:
        "I ordered a wireless headphone and received it very quickly. The product quality was exactly as described and the packaging felt premium.",
      avatarFallback: "NH",
      verifiedLabel: "Verified Purchase",
    },
    {
      id: "review-sadia-islam",
      name: "Sadia Islam",
      role: "Online Shopper",
      location: "Chattogram, Bangladesh",
      rating: 5,
      title: "Smooth shopping experience",
      comment:
        "The website is easy to use and checkout was simple. I liked the product details, secure payment option and quick order update.",
      avatarFallback: "SI",
      verifiedLabel: "Verified Purchase",
    },
    {
      id: "review-arif-rahman",
      name: "Arif Rahman",
      role: "Tech Buyer",
      location: "Khulna, Bangladesh",
      rating: 4.8,
      title: "Good price and reliable service",
      comment:
        "I compared prices before buying a smart watch and found a better deal here. Customer support also responded quickly when I had a question.",
      avatarFallback: "AR",
      verifiedLabel: "Verified Purchase",
    },
    {
      id: "review-mehjabin-akter",
      name: "Mehjabin Akter",
      role: "Home Appliance Buyer",
      location: "Sylhet, Bangladesh",
      rating: 4.9,
      title: "Very satisfied with the quality",
      comment:
        "I bought a kitchen appliance for daily use. The item arrived safely, looked premium and worked perfectly from the first day.",
      avatarFallback: "MA",
      verifiedLabel: "Verified Purchase",
    },
    {
      id: "review-tanvir-ahmed",
      name: "Tanvir Ahmed",
      role: "Gadget Lover",
      location: "Rajshahi, Bangladesh",
      rating: 4.7,
      title: "Trusted store for gadgets",
      comment:
        "The product images, price and features were clear. I received the right product and the delivery process was smooth.",
      avatarFallback: "TA",
      verifiedLabel: "Verified Purchase",
    },
    {
      id: "review-nusrat-jahan",
      name: "Nusrat Jahan",
      role: "Fashion & Lifestyle Buyer",
      location: "Barishal, Bangladesh",
      rating: 4.8,
      title: "Easy return and helpful support",
      comment:
        "I had a small issue with my order and the support team helped me quickly. The return process was simple and professional.",
      avatarFallback: "NJ",
      verifiedLabel: "Verified Purchase",
    },
  ],
};
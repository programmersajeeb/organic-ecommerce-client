import type { ShopByCategorySectionViewModel } from "./shop-by-category.types";

export const shopByCategoryData: ShopByCategorySectionViewModel = {
  headingId: "shop-by-category-heading",
  heading: "Shop by Category",
  ariaLabel: "Browse product categories",

  viewAllLabel: "View All",
  viewAllHref: "/categories",

  items: [
    {
      id: "mobile-accessories",
      title: "Mobile & Accessories",
      href: "/categories/mobile-accessories",
      image: {
        src: "/images/categories/electronics.png",
        alt: "Mobile phones and accessories",
      },
    },
    {
      id: "headphones",
      title: "Headphones",
      href: "/categories/headphones",
      image: {
        src: "/images/categories/headphones.png",
        alt: "Wireless and wired headphones",
      },
    },
    {
      id: "smart-watch",
      title: "Smart Watch",
      href: "/categories/smart-watch",
      image: {
        src: "/images/categories/smart-watch.png",
        alt: "Smart wearable watches",
      },
    },
    {
      id: "computers-accessories",
      title: "Computers & Accessories",
      href: "/categories/computers-accessories",
      image: {
        src: "/images/categories/electronics.png",
        alt: "Laptops and computer accessories",
      },
    },
    {
      id: "home-kitchen",
      title: "Home & Kitchen",
      href: "/categories/home-kitchen",
      image: {
        src: "/images/categories/home-kitchen.png",
        alt: "Home and kitchen appliances",
      },
    },
    {
      id: "camera-photo",
      title: "Camera & Photo",
      href: "/categories/camera-photo",
      image: {
        src: "/images/categories/electronics.png",
        alt: "Cameras and photography equipment",
      },
    },
    {
      id: "bags-luggage",
      title: "Bags & Luggage",
      href: "/categories/bags-luggage",
      image: {
        src: "/images/categories/bags-luggage.png",
        alt: "Travel bags and luggage",
      },
    },
    {
      id: "electronics",
      title: "Electronics",
      href: "/categories/electronics",
      image: {
        src: "/images/categories/electronics.png",
        alt: "Electronic devices and accessories",
      },
    },
  ],
};
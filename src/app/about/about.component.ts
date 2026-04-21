import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  missionStatement = "At GymGear Pro, we're not just selling equipment—we're fueling your journey to a stronger, healthier you. Founded in 2018 by a team of passionate fitness enthusiasts, our mission is to provide high-quality, affordable gym products that empower everyday people to achieve their fitness goals, whether you're a beginner hitting the weights for the first time or a seasoned athlete pushing limits.";

  story = "It all started in a small garage in Austin, Texas, where our founder, Alex Rivera, a former college athlete turned personal trainer, realized the gap in the market for reliable, budget-friendly gym gear. Frustrated by overpriced, low-quality products that broke after a few uses, Alex decided to create FitGear Pro. What began as a side hustle selling custom dumbbells and resistance bands has grown into a thriving online community of over 50,000 satisfied customers worldwide. We've expanded to include everything from premium treadmills and yoga mats to protein supplements and smart fitness trackers, all sourced from trusted manufacturers and rigorously tested for durability.";

  values = [
    { title: "Quality First", description: "Every product undergoes strict quality control to ensure it withstands intense workouts and lasts for years." },
    { title: "Inclusivity", description: "Fitness is for everyone—our gear is designed for all body types, skill levels, and lifestyles, promoting diversity in the gym." },
    { title: "Sustainability", description: "We're committed to eco-friendly practices, using recycled materials in our packaging and partnering with suppliers who prioritize the planet." },
    { title: "Customer-Centric", description: "Your feedback drives us. We offer a 100% satisfaction guarantee and free shipping on orders over $50." },
    {
      title: "Innovation",
      description: "We continuously innovate by adopting the latest fitness technology to deliver smarter, more effective workout solutions."
    },
    {
      title: "Trust & Transparency",
      description: "We believe in honest pricing, clear communication, and building long-term trust with our customers."
    }
  ];

  team = [
    { name: "Sohel Shaikh", role: "Founder & CEO", bio: "With a background in kinesiology and 15 years as a certified trainer, Alex leads our vision. He's competed in national bodybuilding events and believes fitness transforms lives." },

  ];

  achievements = [
    "Over 100,000 products sold since launch.",
    "Featured in Fitness Magazine as 'Top Online Gym Supplier 2023'.",
    "Partnerships with 20+ gyms and influencers like @FitFamPro.",
    "4.9-star average rating on customer reviews."
  ];

  ngOnInit(): void {
    // Optional: Fetch dynamic data from an API, e.g., latest testimonials
  }
}
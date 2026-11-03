// ─── SHARED MOCK DATA (demo mode & showcase fallback) ───────────────────────
// Matches the TurfBook Showcase design

export interface TurfImage {
  public_url: string | null;
  sort_order: number;
}

export interface TurfFacility {
  facilities: { name: string };
}

export interface TurfSport {
  sports: { name: string };
}

export interface TurfReview {
  rating: number;
  comment: string;
  created_at: string;
  profiles?: { full_name?: string };
}

export interface MockTurf {
  id: string;
  name: string;
  slug: string;
  city: string;
  address: string;
  distance: string;
  description: string;
  hourly_price: number;
  rating: number;
  review_count: number;
  status: string;
  owner_id: string;
  phone: string;
  cancellation_hours: number;
  turf_images: TurfImage[];
  turf_sports: TurfSport[];
  turf_facilities: TurfFacility[];
  operating_hours: string[];
  reviews: TurfReview[];
}

export const MOCK_TURFS: MockTurf[] = [
  {
    id: "turf-001",
    name: "GreenLeaf Turf",
    slug: "greenleaf-turf",
    city: "Kochi",
    address: "Marine Drive, Kochi, Kerala",
    distance: "2.5 km",
    description: "Premium quality artificial turf with excellent facilities, FIFA-grade shock-absorbing turf, and professional high-intensity floodlighting. Perfect for evening 5-a-side football matches, cricket tournaments, and corporate friendlies.",
    hourly_price: 800,
    rating: 4.6,
    review_count: 1240,
    status: "approved",
    owner_id: "owner-001",
    phone: "9876543210",
    cancellation_hours: 24,
    turf_images: [
      { public_url: "/images/turfs/greenleaf.jpg", sort_order: 0 },
      { public_url: "/images/turfs/hero_stadium.jpg", sort_order: 1 },
    ],
    turf_sports: [
      { sports: { name: "Football" } },
      { sports: { name: "Cricket" } },
    ],
    turf_facilities: [
      { facilities: { name: "Football" } },
      { facilities: { name: "Cricket" } },
      { facilities: { name: "Floodlights" } },
      { facilities: { name: "Parking" } },
      { facilities: { name: "Locker rooms" } },
      { facilities: { name: "Drinking water" } },
    ],
    operating_hours: ["06:00 - 23:00"],
    reviews: [
      { rating: 5, comment: "Top class pitch! The floodlights are brilliant for evening matches.", created_at: "2026-10-20T18:00:00Z", profiles: { full_name: "Rahul Nair" } },
      { rating: 5, comment: "Best turf in Kochi. Ample parking and clean changing rooms.", created_at: "2026-10-15T17:00:00Z", profiles: { full_name: "Fahad Varghese" } },
      { rating: 4, comment: "Great bounce on the ball and friendly staff. Highly recommended.", created_at: "2026-10-10T16:00:00Z", profiles: { full_name: "Anas K." } },
    ],
  },
  {
    id: "turf-002",
    name: "SkySports Arena",
    slug: "skysports-arena",
    city: "Kochi",
    address: "Kaloor Stadium Link Rd, Kochi, Kerala",
    distance: "3.8 km",
    description: "Multi-sport facility featuring international standard cricket nets, enclosed safety netting, and dual multi-purpose pitches with laser-level turf.",
    hourly_price: 900,
    rating: 4.7,
    review_count: 850,
    status: "approved",
    owner_id: "owner-002",
    phone: "9765432109",
    cancellation_hours: 12,
    turf_images: [
      { public_url: "/images/turfs/cricket.jpg", sort_order: 0 },
      { public_url: "/images/turfs/greenleaf.jpg", sort_order: 1 },
    ],
    turf_sports: [
      { sports: { name: "Cricket" } },
      { sports: { name: "Football" } },
    ],
    turf_facilities: [
      { facilities: { name: "Cricket" } },
      { facilities: { name: "Floodlights" } },
      { facilities: { name: "Cafeteria" } },
      { facilities: { name: "Equipment rental" } },
      { facilities: { name: "Parking" } },
    ],
    operating_hours: ["06:00 - 24:00"],
    reviews: [
      { rating: 5, comment: "Great multi-sport setup. The box cricket pitch is unmatched.", created_at: "2026-10-18T12:00:00Z", profiles: { full_name: "Vishnu Pillai" } },
      { rating: 4, comment: "Cricket nets are excellent with automated bowling machines.", created_at: "2026-10-12T14:00:00Z", profiles: { full_name: "Midhun Mohan" } },
    ],
  },
  {
    id: "turf-003",
    name: "Arena 360",
    slug: "arena-360",
    city: "Kochi",
    address: "Edappally, Kochi, Kerala",
    distance: "4.2 km",
    description: "Air-conditioned indoor badminton complex with BWF-approved synthetic court matting, glare-free LED lighting, and electronic scoreboards.",
    hourly_price: 700,
    rating: 4.5,
    review_count: 620,
    status: "approved",
    owner_id: "owner-001",
    phone: "9654321098",
    cancellation_hours: 6,
    turf_images: [
      { public_url: "/images/turfs/badminton.jpg", sort_order: 0 },
      { public_url: "/images/turfs/hero_stadium.jpg", sort_order: 1 },
    ],
    turf_sports: [
      { sports: { name: "Badminton" } },
      { sports: { name: "Tennis" } },
    ],
    turf_facilities: [
      { facilities: { name: "Badminton" } },
      { facilities: { name: "Air conditioning" } },
      { facilities: { name: "Locker rooms" } },
      { facilities: { name: "Drinking water" } },
      { facilities: { name: "Parking" } },
    ],
    operating_hours: ["05:00 - 23:00"],
    reviews: [
      { rating: 5, comment: "Excellent court grip and no glare from lights. Love playing here.", created_at: "2026-10-22T09:00:00Z", profiles: { full_name: "Sneha Menon" } },
    ],
  },
  {
    id: "turf-004",
    name: "Urban Kick Rooftop",
    slug: "urban-kick-rooftop",
    city: "Mumbai",
    address: "Bandra West, Mumbai, Maharashtra",
    distance: "1.8 km",
    description: "Iconic rooftop football arena overlooking Mumbai's illuminated skyline. 5-a-side artificial pitch with high-tension perimeter nets and evening music.",
    hourly_price: 1500,
    rating: 4.9,
    review_count: 1420,
    status: "approved",
    owner_id: "owner-002",
    phone: "9543210987",
    cancellation_hours: 24,
    turf_images: [
      { public_url: "/images/turfs/rooftop.jpg", sort_order: 0 },
      { public_url: "/images/turfs/hero_stadium.jpg", sort_order: 1 },
    ],
    turf_sports: [
      { sports: { name: "Football" } },
    ],
    turf_facilities: [
      { facilities: { name: "Football" } },
      { facilities: { name: "Floodlights" } },
      { facilities: { name: "Cafeteria" } },
      { facilities: { name: "Skyline view" } },
      { facilities: { name: "Locker rooms" } },
    ],
    operating_hours: ["06:00 - 02:00"],
    reviews: [
      { rating: 5, comment: "The rooftop skyline vibe is unreal! Best turf experience in Mumbai.", created_at: "2026-10-25T19:00:00Z", profiles: { full_name: "Aditya Roy" } },
      { rating: 5, comment: "Super premium feel and crisp astroturf surface.", created_at: "2026-10-20T20:00:00Z", profiles: { full_name: "Natasha Sen" } },
    ],
  },
  {
    id: "turf-005",
    name: "The Green Arena",
    slug: "the-green-arena",
    city: "Bangalore",
    address: "Indiranagar, Bangalore, Karnataka",
    distance: "3.1 km",
    description: "Pro-level multisport ground catering to football, box cricket, and basketball. Equipped with ultra-lumen floodlights and spectator seating dugout.",
    hourly_price: 1100,
    rating: 4.8,
    review_count: 980,
    status: "approved",
    owner_id: "owner-001",
    phone: "9432109876",
    cancellation_hours: 12,
    turf_images: [
      { public_url: "/images/turfs/hero_stadium.jpg", sort_order: 0 },
      { public_url: "/images/turfs/greenleaf.jpg", sort_order: 1 },
    ],
    turf_sports: [
      { sports: { name: "Football" } },
      { sports: { name: "Cricket" } },
      { sports: { name: "Basketball" } },
    ],
    turf_facilities: [
      { facilities: { name: "Parking" } },
      { facilities: { name: "Floodlights" } },
      { facilities: { name: "Dugout seating" } },
      { facilities: { name: "First aid" } },
    ],
    operating_hours: ["06:00 - 23:30"],
    reviews: [
      { rating: 5, comment: "Spacious and perfectly maintained grass surface.", created_at: "2026-10-19T11:00:00Z", profiles: { full_name: "Gautam Rao" } },
    ],
  },
  {
    id: "turf-006",
    name: "Summit Sports Hub",
    slug: "summit-sports-hub",
    city: "Hyderabad",
    address: "Gachibowli, Hyderabad, Telangana",
    distance: "5.0 km",
    description: "Modern climate-controlled multi-court facility with indoor badminton, table tennis, and mini football arena near HITEC City.",
    hourly_price: 800,
    rating: 4.6,
    review_count: 590,
    status: "approved",
    owner_id: "owner-001",
    phone: "9321098765",
    cancellation_hours: 6,
    turf_images: [
      { public_url: "/images/turfs/badminton.jpg", sort_order: 0 },
      { public_url: "/images/turfs/cricket.jpg", sort_order: 1 },
    ],
    turf_sports: [
      { sports: { name: "Badminton" } },
      { sports: { name: "Tennis" } },
    ],
    turf_facilities: [
      { facilities: { name: "Air conditioning" } },
      { facilities: { name: "Parking" } },
      { facilities: { name: "Changing rooms" } },
      { facilities: { name: "Cafeteria" } },
    ],
    operating_hours: ["06:00 - 23:00"],
    reviews: [
      { rating: 5, comment: "Air conditioned courts make summer playing effortless!", created_at: "2026-10-21T15:00:00Z", profiles: { full_name: "Tarun Varma" } },
    ],
  },
];

export const MOCK_CUSTOMER_BOOKINGS = [
  {
    id: "booking-001",
    turf_id: "turf-001",
    customer_id: "customer-001",
    starts_at: "2026-04-30T19:00:00+05:30",
    ends_at: "2026-04-30T20:00:00+05:30",
    date_display: "Wed, Apr 30, 2026",
    time_display: "7:00 PM – 8:00 PM (1 hour)",
    amount: 800,
    status: "confirmed",
    reservation_expires_at: null,
    created_at: "2026-04-28T10:00:00Z",
    turfs: {
      name: "GreenLeaf Turf",
      city: "Kochi, Kerala",
      image: "/images/turfs/greenleaf.jpg",
    },
  },
  {
    id: "booking-002",
    turf_id: "turf-002",
    customer_id: "customer-001",
    starts_at: "2026-05-02T18:00:00+05:30",
    ends_at: "2026-05-02T19:00:00+05:30",
    date_display: "Sat, May 2, 2026",
    time_display: "6:00 PM – 7:00 PM (1 hour)",
    amount: 900,
    status: "upcoming",
    reservation_expires_at: null,
    created_at: "2026-04-29T11:00:00Z",
    turfs: {
      name: "SkySports Arena",
      city: "Kochi, Kerala",
      image: "/images/turfs/cricket.jpg",
    },
  },
  {
    id: "booking-003",
    turf_id: "turf-003",
    customer_id: "customer-001",
    starts_at: "2026-05-05T20:00:00+05:30",
    ends_at: "2026-05-05T21:00:00+05:30",
    date_display: "Tue, May 5, 2026",
    time_display: "8:00 PM – 9:00 PM (1 hour)",
    amount: 700,
    status: "cancelled",
    reservation_expires_at: null,
    created_at: "2026-04-25T09:00:00Z",
    turfs: {
      name: "Arena 360",
      city: "Kochi, Kerala",
      image: "/images/turfs/badminton.jpg",
    },
  },
  {
    id: "booking-004",
    turf_id: "turf-004",
    customer_id: "customer-001",
    starts_at: "2026-04-20T21:00:00+05:30",
    ends_at: "2026-04-20T22:00:00+05:30",
    date_display: "Mon, Apr 20, 2026",
    time_display: "9:00 PM – 10:00 PM (1 hour)",
    amount: 1500,
    status: "completed",
    reservation_expires_at: null,
    created_at: "2026-04-18T14:00:00Z",
    turfs: {
      name: "Urban Kick Rooftop",
      city: "Mumbai, Maharashtra",
      image: "/images/turfs/rooftop.jpg",
    },
  },
];

export const MOCK_OWNER_BOOKINGS = [
  {
    id: "booking-004",
    turf_id: "turf-001",
    turf_name: "GreenLeaf Turf",
    starts_at: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(),
    ends_at: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    amount: 800,
    status: "confirmed",
    customer: { full_name: "Arjun Mehta", phone: "9876543200" },
  },
  {
    id: "booking-001",
    turf_id: "turf-001",
    turf_name: "GreenLeaf Turf",
    starts_at: "2026-11-05T18:00:00+05:30",
    ends_at: "2026-11-05T20:00:00+05:30",
    amount: 1600,
    status: "confirmed",
    customer: { full_name: "Demo Player", phone: "9876543210" },
  },
];

export const MOCK_ADMIN_STATS = {
  customers: 3480,
  owners: 312,
  bookings_today: 242,
  platform_revenue: 524000,
  pending_approvals: 3,
  active_turfs: 248,
};

export const MOCK_DEMO_USER = {
  id: "customer-001",
  email: "demo@turfbook.com",
  full_name: "Nanda Kishore",
  role: "customer",
  city: "Kochi",
};

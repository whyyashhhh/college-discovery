import { CollegeType, PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set");
}

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString }),
});

async function main() {
  await prisma.savedCollege.deleteMany();
  await prisma.review.deleteMany();
  await prisma.account.deleteMany();
  await prisma.session.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.course.deleteMany();
  await prisma.placement.deleteMany();
  await prisma.examCutoff.deleteMany();
  await prisma.college.deleteMany();
  await prisma.user.deleteMany();

  const colleges = [
    {
      name: "IIT Bombay",
      slug: "iit-bombay",
      location: "Powai, Mumbai, Maharashtra",
      city: "Mumbai",
      state: "Maharashtra",
      type: CollegeType.ENGINEERING,
      rating: 4.8,
      totalFees: 800000,
      establishedYear: 1958,
      imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=80",
      description: "Premier engineering institution known for research, innovation, and strong placements.",
      website: "https://www.iitb.ac.in",
      accreditation: "NAAC A++",
      courses: {
        create: [
          { name: "B.Tech Computer Science", degree: "B.Tech", duration: 4, fees: 200000, seats: 120 },
          { name: "B.Tech Electrical Engineering", degree: "B.Tech", duration: 4, fees: 200000, seats: 100 },
          { name: "M.Tech Data Science", degree: "M.Tech", duration: 2, fees: 150000, seats: 60 },
        ],
      },
      placements: {
        create: [
          {
            year: 2024,
            avgSalary: 2200000,
            highestSalary: 8000000,
            placementRate: 95.5,
            topRecruiters: ["Google", "Microsoft", "Amazon", "Goldman Sachs"],
          },
        ],
      },
      examCutoffs: {
        create: [
          { examName: "JEE Advanced", category: "General", cutoffRank: 500, year: 2024 },
          { examName: "JEE Advanced", category: "OBC", cutoffRank: 800, year: 2024 },
        ],
      },
    },
    {
      name: "IIT Delhi",
      slug: "iit-delhi",
      location: "Hauz Khas, New Delhi, Delhi",
      city: "New Delhi",
      state: "Delhi",
      type: CollegeType.ENGINEERING,
      rating: 4.9,
      totalFees: 780000,
      establishedYear: 1961,
      imageUrl: "https://images.unsplash.com/photo-1564981797816-1043664bf78d?auto=format&fit=crop&w=1200&q=80",
      description: "Top-tier public engineering institute with excellent research output and placements.",
      website: "https://home.iitd.ac.in",
      accreditation: "NAAC A++",
      courses: {
        create: [
          { name: "B.Tech Computer Engineering", degree: "B.Tech", duration: 4, fees: 195000, seats: 110 },
          { name: "B.Tech Mechanical Engineering", degree: "B.Tech", duration: 4, fees: 190000, seats: 90 },
          { name: "M.Tech Artificial Intelligence", degree: "M.Tech", duration: 2, fees: 155000, seats: 40 },
        ],
      },
      placements: {
        create: [
          {
            year: 2024,
            avgSalary: 2050000,
            highestSalary: 7200000,
            placementRate: 94.2,
            topRecruiters: ["Adobe", "Apple", "BCG", "Microsoft"],
          },
        ],
      },
      examCutoffs: {
        create: [
          { examName: "JEE Advanced", category: "General", cutoffRank: 650, year: 2024 },
          { examName: "JEE Advanced", category: "SC", cutoffRank: 1400, year: 2024 },
        ],
      },
    },
    {
      name: "NIT Trichy",
      slug: "nit-trichy",
      location: "Tiruchirappalli, Tamil Nadu",
      city: "Tiruchirappalli",
      state: "Tamil Nadu",
      type: CollegeType.ENGINEERING,
      rating: 4.5,
      totalFees: 600000,
      establishedYear: 1964,
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=80",
      description: "One of the best NITs, known for engineering programs, campus life, and placements.",
      website: "https://www.nitt.edu",
      accreditation: "NAAC A++",
      courses: {
        create: [
          { name: "B.Tech Electronics and Communication", degree: "B.Tech", duration: 4, fees: 150000, seats: 120 },
          { name: "B.Tech Civil Engineering", degree: "B.Tech", duration: 4, fees: 145000, seats: 90 },
          { name: "M.Tech VLSI Design", degree: "M.Tech", duration: 2, fees: 120000, seats: 30 },
        ],
      },
      placements: {
        create: [
          {
            year: 2024,
            avgSalary: 1450000,
            highestSalary: 4200000,
            placementRate: 91.8,
            topRecruiters: ["TCS", "Infosys", "Qualcomm", "Wipro"],
          },
        ],
      },
      examCutoffs: {
        create: [
          { examName: "JEE Main", category: "General", cutoffRank: 6500, year: 2024 },
          { examName: "JEE Main", category: "OBC", cutoffRank: 9000, year: 2024 },
        ],
      },
    },
    {
      name: "BITS Pilani",
      slug: "bits-pilani",
      location: "Pilani, Rajasthan",
      city: "Pilani",
      state: "Rajasthan",
      type: CollegeType.ENGINEERING,
      rating: 4.6,
      totalFees: 2200000,
      establishedYear: 1964,
      imageUrl: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
      description: "Private institution with strong industry connections, flexible academics, and active research.",
      website: "https://www.bits-pilani.ac.in",
      accreditation: "NAAC A++",
      courses: {
        create: [
          { name: "B.E. Computer Science", degree: "B.E.", duration: 4, fees: 550000, seats: 150 },
          { name: "B.E. Electronics and Instrumentation", degree: "B.E.", duration: 4, fees: 530000, seats: 120 },
          { name: "M.E. Embedded Systems", degree: "M.E.", duration: 2, fees: 260000, seats: 45 },
        ],
      },
      placements: {
        create: [
          {
            year: 2024,
            avgSalary: 1850000,
            highestSalary: 6500000,
            placementRate: 93.1,
            topRecruiters: ["Amazon", "Dell", "Oracle", "SAP"],
          },
        ],
      },
      examCutoffs: {
        create: [
          { examName: "BITSAT", category: "General", cutoffRank: 280, year: 2024 },
          { examName: "BITSAT", category: "OBC", cutoffRank: 450, year: 2024 },
        ],
      },
    },
    {
      name: "IIM Ahmedabad",
      slug: "iim-ahmedabad",
      location: "Vastrapur, Ahmedabad, Gujarat",
      city: "Ahmedabad",
      state: "Gujarat",
      type: CollegeType.MANAGEMENT,
      rating: 4.9,
      totalFees: 2500000,
      establishedYear: 1961,
      imageUrl: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=80",
      description: "India's top management institute with elite consulting and leadership outcomes.",
      website: "https://www.iima.ac.in",
      accreditation: "AACSB, EQUIS, AMBA",
      courses: {
        create: [
          { name: "MBA", degree: "MBA", duration: 2, fees: 1250000, seats: 400 },
          { name: "Post Graduate Programme in Management", degree: "PGP", duration: 2, fees: 1250000, seats: 380 },
        ],
      },
      placements: {
        create: [
          {
            year: 2024,
            avgSalary: 3400000,
            highestSalary: 12000000,
            placementRate: 100,
            topRecruiters: ["McKinsey", "Bain", "BCG", "Deloitte"],
          },
        ],
      },
      examCutoffs: {
        create: [
          { examName: "CAT", category: "General", cutoffRank: 99, year: 2024 },
          { examName: "CAT", category: "OBC", cutoffRank: 95, year: 2024 },
        ],
      },
    },
  ];

  for (const college of colleges) {
    await prisma.college.create({ data: college });
  }

  const users = await Promise.all([
    prisma.user.create({
      data: {
        name: "Aarav Mehta",
        email: "aarav.mehta@example.com",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      },
    }),
    prisma.user.create({
      data: {
        name: "Diya Sharma",
        email: "diya.sharma@example.com",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
      },
    }),
  ]);

  const [iitBombay, iitDelhi, nitTrichy, bitsPilani, iimAhmedabad] = await Promise.all([
    prisma.college.findUniqueOrThrow({ where: { slug: "iit-bombay" } }),
    prisma.college.findUniqueOrThrow({ where: { slug: "iit-delhi" } }),
    prisma.college.findUniqueOrThrow({ where: { slug: "nit-trichy" } }),
    prisma.college.findUniqueOrThrow({ where: { slug: "bits-pilani" } }),
    prisma.college.findUniqueOrThrow({ where: { slug: "iim-ahmedabad" } }),
  ]);

  await prisma.review.createMany({
    data: [
      {
        collegeId: iitBombay.id,
        userId: users[0].id,
        rating: 4.9,
        title: "Excellent research and placements",
        content: "Strong peer group, impressive placement stats, and great opportunities for projects.",
        pros: "Placements, research, campus culture",
        cons: "Competitive academics and high workload",
      },
      {
        collegeId: iimAhmedabad.id,
        userId: users[1].id,
        rating: 5,
        title: "Best-in-class management education",
        content: "Rigorous case-based learning with unmatched alumni and recruiter network.",
        pros: "Brand value, consulting roles, alumni network",
        cons: "Intense schedule",
      },
      {
        collegeId: bitsPilani.id,
        userId: users[0].id,
        rating: 4.7,
        title: "Flexible academics and strong industry links",
        content: "Great choice for students who want a private institute with broad opportunities.",
        pros: "Flexibility, placements, campus life",
        cons: "High fees",
      },
    ],
  });

  await prisma.savedCollege.createMany({
    data: [
      { userId: users[0].id, collegeId: iitBombay.id },
      { userId: users[0].id, collegeId: iitDelhi.id },
      { userId: users[0].id, collegeId: bitsPilani.id },
      { userId: users[1].id, collegeId: iimAhmedabad.id },
      { userId: users[1].id, collegeId: nitTrichy.id },
    ],
  });

  console.log("Seeded successfully");
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
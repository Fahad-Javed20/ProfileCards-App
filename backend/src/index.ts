import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

type UserType = {
  id: number;
  name: string;
  image: string;
  description: string;
  profession: string;
  rating: number;
};

const users: UserType[] = [
  {
    id: 1,
    image:
      "https://plus.unsplash.com/premium_photo-1663054774427-55adfb2be76f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGVvcGxlfGVufDB8fDB8fHww",
    name: "Aiden Walker",
    description: "Creative thinker who loves solving complex problems.",
    profession: "UI/UX Designer",
    rating: 4.8,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGVvcGxlfGVufDB8fDB8fHww",
    name: "Sophia Martinez",
    description: "Passionate about helping brands grow.",
    profession: "Digital Marketer",
    rating: 4.6,
  },
  {
    id: 3,
    image:
      "https://plus.unsplash.com/premium_photo-1675791188810-3a01768c1e2f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVvcGxlfGVufDB8fDB8fHww",
    name: "Ethan Williams",
    description: "Full-stack developer with 5+ years of experience.",
    profession: "Software Engineer",
    rating: 4.9,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGVvcGxlfGVufDB8fDB8fHww",
    name: "Mia Johnson",
    description: "Capturing moments through creative storytelling.",
    profession: "Photographer",
    rating: 4.7,
  },
  {
    id: 5,
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cGVvcGxlfGVufDB8fDB8fHww",
    name: "Noah Brown",
    description: "Loves experimenting with world cuisines.",
    profession: "Chef",
    rating: 4.5,
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Olivia Davis",
    description: "Helping students achieve academic success.",
    profession: "Teacher",
    rating: 4.8,
  },
  {
    id: 7,
    image:
      "https://plus.unsplash.com/premium_photo-1673957923985-b814a9dbc03d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Liam Miller",
    description: "Creating expressive illustrations and designs.",
    profession: "Artist",
    rating: 4.9,
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1488161628813-04466f872be2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Emma Wilson",
    description: "Dedicated to improving patient wellbeing.",
    profession: "Doctor",
    rating: 4.6,
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "James Anderson",
    description: "Engineering innovative solutions for modern challenges.",
    profession: "Mechanical Engineer",
    rating: 4.7,
  },
  {
    id: 10,
    image:
      "https://plus.unsplash.com/premium_photo-1682681907111-c13bc10b1587?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Ava Thomas",
    description: "Writer who loves crafting compelling stories.",
    profession: "Content Writer",
    rating: 4.8,
  },
  {
    id: 11,
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Benjamin Moore",
    description: "Creates music that inspires and uplifts.",
    profession: "Musician",
    rating: 4.5,
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Isabella Clark",
    description: "Helping people achieve fitness goals.",
    profession: "Fitness Trainer",
    rating: 4.9,
  },
  {
    id: 13,
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Lucas Rodriguez",
    description: "Researching innovative scientific breakthroughs.",
    profession: "Scientist",
    rating: 4.8,
  },
  {
    id: 14,
    image:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Harper Lewis",
    description: "Curious learner with a passion for tech.",
    profession: "Student",
    rating: 4.4,
  },
  {
    id: 15,
    image:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzV8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Henry Walker",
    description: "Fashion model with a unique style.",
    profession: "Model",
    rating: 4.7,
  },
  {
    id: 16,
    image:
      "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzZ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Grace Young",
    description: "Frontend developer crafting clean user interfaces.",
    profession: "Frontend Developer",
    rating: 4.9,
  },
  {
    id: 17,
    image:
      "https://plus.unsplash.com/premium_photo-1675791727728-f829fde51f70?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Daniel King",
    description: "Entrepreneur building scalable startups.",
    profession: "Business Owner",
    rating: 4.6,
  },
  {
    id: 18,
    image:
      "https://images.unsplash.com/photo-1542596594-649edbc13630?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Chloe Scott",
    description: "Committed to delivering justice and fairness.",
    profession: "Lawyer",
    rating: 4.9,
  },
  {
    id: 19,
    image:
      "https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Njd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Matthew Green",
    description: "Designing minimalistic and clean experiences.",
    profession: "Product Designer",
    rating: 4.8,
  },
  {
    id: 20,
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjJ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D",
    name: "Ella Harris",
    description: "Making people smile with confidence.",
    profession: "Dentist",
    rating: 4.7,
  },
];

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/users", (req, res) => {
  res.send(users);
});

app.listen(PORT, () => {
  console.log(`server is listining at port ${PORT}`);
});

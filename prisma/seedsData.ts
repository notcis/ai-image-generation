import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

const users = [
  {
    name: "test",
    username: "test",
    email: "test@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "john",
    username: "john",
    email: "john@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

async function main() {
  console.log("Start seeding ...");
  const newUsers = await prisma.user.createMany({
    data: users,
  });
  console.log(`Created ${newUsers.count} users`);
}

main().then(async () => {
  await prisma.$disconnect();
  console.log("Seeding finished.");
});

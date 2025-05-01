import { ContentType } from "@/app/store/contentState";
import { prisma } from "@/app/utils/prisma";

async function main() {
  const users = await prisma.user.create({
    data: {
      email: "test@gmail.com",
      username: "Tester",
      password: "12345678",
    },
  });

  await prisma.content.create({
    data: {
      title: "15 Times Opening Laps in F1 Were Pure Chaos",
      type: ContentType.YOUTUBE,
      userId: users.id,
      link: "https://www.youtube.com/watch?v=WtlHPTO0VDM",
      ContentTags: {
        create: [
          {
            tags: {
              create: {
                title: "Tag1",
              },
            },
          },
          {
            tags: {
              create: {
                title: "Tag2",
              },
            },
          },
          {
            tags: {
              create: {
                title: "Tag3",
              },
            },
          },
        ],
      },
    },
  });

  await prisma.content.create({
    data: {
      title: "15 Times Opening Laps in F1 Were Pure Chaos",
      type: ContentType.YOUTUBE,
      userId: users.id,
      link: "https://www.youtube.com/watch?v=WtlHPTO0VDM",
      ContentTags: {
        create: [
          {
            tags: {
              create: {
                title: "Tag1",
              },
            },
          },
          {
            tags: {
              create: {
                title: "Tag2",
              },
            },
          },
          {
            tags: {
              create: {
                title: "Tag3",
              },
            },
          },
        ],
      },
    },
  });
}

main().finally(async () => await prisma.$disconnect());

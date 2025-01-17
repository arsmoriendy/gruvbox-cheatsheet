import { test } from "vitest";
import { highlightJson } from "~/lib/highlighter";

test("Highlighter transcribes JSON code to HTML with no errors", () => {
  const jsonData = {
    name: "John Doe",
    age: 30,
    isEmployed: true,
    skills: ["JavaScript", "Python", "HTML"],
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    },
    projects: [
      {
        title: "Portfolio Website",
        year: 2023,
        description:
          "A personal portfolio showcasing my web development skills.",
      },
      {
        title: "Data Analysis Toolkit",
        year: 2022,
        description: "A Python toolkit for performing advanced data analysis.",
      },
    ],
  };

  highlightJson(JSON.stringify(jsonData));
});

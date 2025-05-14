import { useCallback, useState } from "react";
import { faker } from "@faker-js/faker";

import { ContentBlock } from "./ContentBlock";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState([
    faker.lorem.paragraph(),
    faker.lorem.paragraph(),
    {
      text: "This is a bullet list",
      items: [
        faker.lorem.sentence(),
        faker.lorem.sentence(),
        faker.lorem.sentence(),
      ],
    },
    faker.lorem.paragraph(),
  ]);

  const generateContent = useCallback(() => {
    setIsLoading(true);
    setTimeout(() => {
      setContent([
        faker.lorem.paragraph(),
        faker.lorem.paragraph(),
        {
          text: "This is a bullet list",
          items: [
            faker.lorem.sentence(),
            faker.lorem.sentence(),
            faker.lorem.sentence(),
          ],
        },
        faker.lorem.paragraph(),
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="p-8 w-screen">
      <ContentBlock
        header="Auto Generated Block Heading"
        summary="Summary about this block and content generated below"
        content={content}
        actions={["Create additional content", faker.lorem.word()]}
        regenerate={generateContent}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;

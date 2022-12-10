import {
  ChakraProvider,
  Heading,
  Container,
  Text,
  Input,
  Button,
  Wrap,
  Stack, 
  Image,
  Link,
  SkeletonCircle,
  SkeletonText,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [image, updateImage] = useState();
  const [prompt, updatePrompt] = useState();
  const [loading, updateLoading] = useState();

  const generate = async (prompt) => {
    updateLoading(true);
    const result = await axios.get(`https://4c12-83-243-172-53.eu.ngrok.io/?prompt=${prompt}`);
    updateImage(result.data);
    updateLoading(false);
  };
  return (
     <ChakraProvider>
      <Container>
        <Heading>Diffusion Image Generation App </Heading>
        <Text marginBottom={"10px"}>
          <h1> Enter a short description of whatever you want to see in your Image and hit Generate</h1>
          <code>This is swapnil, I want to test this concept I am trying , Help me by using it as much as possible </code>
          USE IT WITH CAUTION. Try again if doesnt work in the first try.
        </Text>

        <Wrap marginBottom={"10px"}>
          <Input
            value={prompt}
            onChange={(e) => updatePrompt(e.target.value)}
            width={"350px"}
          ></Input>
          <Button onClick={(e) => generate(prompt)} colorScheme={"yellow"}>
            Generate
          </Button>
        </Wrap>

        {loading ? (
          <Stack>
            <SkeletonCircle />
            <SkeletonText />
          </Stack>
        ) : image ? (
          <Image src={`data:image/png;base64,${image}`} boxShadow="lg" />
        ) : null}
      </Container>
    </ChakraProvider>
  )
}
